import Player from './player/index';
import Enemy from './npc/enemy';
import BackGround from './runtime/background';
import GameInfo from './runtime/gameinfo';
import Music from './runtime/music';
import DataBus from './databus';
import Steering from './player/steering';
import Monster from './npc/monster';
import {
  isCollideWith
} from './utils/index';
import {
  goldArr,
  monsterArr
} from './const';
import {
  wallArr,
  WALL_WIDTH,
  WALL_HEIGHT
} from './runtime/wall';

let ctx = canvas.getContext('2d');
let databus = new DataBus();

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

wx.cloud.init({
  // env 参数说明：
  //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
  //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
  //   如不填则使用默认环境（第一个创建的环境）
  // env: 'my-env-id',
});
const db = wx.cloud.database();

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0;
    this.personalHighScore = 0;
    this.isTouchEnd = false;
    this.steeringTimer = null;
    this.goldArr = goldArr;
    this.initGoldLength = goldArr.length;
    this.restart();
    this.login();
  }

  login() {
    // 获取 openid
    wx.cloud.callFunction({
      name: 'login',
      success: (res) => {
        window.openid = res.result.openid;
        this.prefetchHighScore();
      },
      fail: (err) => {
        console.error('get openid failed with error', err);
      },
    });
  }

  prefetchHighScore() {
    // 预取历史最高分
    db.collection('score')
      .doc(`${window.openid}-score`)
      .get()
      .then((res) => {
        if (this.personalHighScore) {
          if (res.data.max > this.personalHighScore) {
            this.personalHighScore = res.data.max;
          }
        } else {
          this.personalHighScore = res.data.max;
        }
      })
      .catch((err) => {
        console.error('db get score catch error', err);
        this.prefetchHighScoreFailed = true;
      });
  }

  restart() {
    databus.reset();
    this.goldArr = goldArr;
    this.initGoldLength = goldArr.length;

    canvas.removeEventListener('touchstart', this.touchHandler);

    canvas.removeEventListener('touchstart', this.touchSteeringHandler);
    canvas.removeEventListener('touchend', this.touchEndSteeringHandler);

    this.bg = new BackGround(ctx);
    databus.bg = this.bg;
    this.player = new Player(ctx);
    this.gameinfo = new GameInfo();
    this.music = new Music();
    this.steering = new Steering();

    this.bindLoop = this.loop.bind(this);
    this.hasEventBind = false;

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    // this.steering.renderSteering(ctx)
    this.touchSteeringHandler = this.touchSteeringEventHandler.bind(this);
    this.touchEndSteeringHandler = this.touchEndSteeringEventHandler.bind(this);
    canvas.addEventListener('touchstart', this.touchSteeringHandler);
    canvas.addEventListener('touchend', this.touchEndSteeringHandler);

    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas);
  }

  delGoldByIndex(index) {
    this.goldArr.splice(index, 1);
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    if (databus.frame % 30 === 0) {
      let enemy = databus.pool.getItemByClass('enemy', Enemy);
      enemy.init(6);
      databus.enemys.push(enemy);
    }
  }
  generateMonster() {
    const isInit = databus.monsters.length === 0;
    if (isInit) {
      databus.monsterArr.forEach((item) => {
        let monster = databus.pool.getItemByClass('monster', Monster);
        monster.init(item[0], item[1]);
        databus.monsters.push(monster);
      });
    } else {
      databus.monsters.forEach((item) => item.update());
    }
  }

  // 检查得分情况
  scoreDetection() {
    let that = this;
    databus.score = this.initGoldLength - this.goldArr.length;
  }
  // 全局碰撞检测
  collisionDetection() {
    let that = this;
    for (let i = 0, il = databus.monsters.length; i < il; i++) {
      let monster = databus.monsters[i];
      // 检查monster碰到墙的情况
      that.bg.wallPositions.forEach(item=>{
        if(isCollideWith({x:item[0],y:item[1],width:WALL_WIDTH,height:WALL_HEIGHT},monster)){
          monster.setDeactive()
        }
      })
      if (isCollideWith(this.player, monster)) {
        monster.playAnimation()
        that.music.playExplosion()
        this.player.visible=false
        databus.gameOver = true;
        // 获取历史高分
        if (this.personalHighScore) {
          if (databus.score > this.personalHighScore) {
            this.personalHighScore = databus.score;
          }
        }

        // 上传结果
        // 调用 uploadScore 云函数
        wx.cloud.callFunction({
          name: 'uploadScore',
          // data 字段的值为传入云函数的第一个参数 event
          data: {
            score: databus.score,
          },
          success: (res) => {
            if (this.prefetchHighScoreFailed) {
              this.prefetchHighScore();
            }
          },
          fail: (err) => {
            console.error('upload score failed', err);
          },
        });

        break;
      }
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault();

    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;

    let area = this.gameinfo.btnArea;

    if (
      x >= area.startX &&
      x <= area.endX &&
      y >= area.startY &&
      y <= area.endY
    )
      this.restart();
  }
  // 方向盘 和加速器 事件处理
  touchSteeringEventHandler(e) {
    e.preventDefault();

    clearInterval(this.steeringTimer);
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;

    let areaUp = this.steering.upBtnArea;
    let areaDown = this.steering.downBtnArea;
    let areaLeft = this.steering.leftBtnArea;
    let areaRight = this.steering.rightBtnArea;
    let areaSpeed = this.steering.speedBtnArea;

    if (
      x >= areaUp.startX &&
      x <= areaUp.endX &&
      y >= areaUp.startY &&
      y <= areaUp.endY
    ) {
      this.steeringTimer = setInterval(() => {
        if (databus.gameOver) {
          clearInterval(this.steeringTimer);
        } else {
          this.player.setPositionUp(this);
        }
      }, 50);
    } else if (
      x >= areaDown.startX &&
      x <= areaDown.endX &&
      y >= areaDown.startY &&
      y <= areaDown.endY
    ) {
      this.steeringTimer = setInterval(() => {
        if (databus.gameOver) {
          clearInterval(this.steeringTimer);

        } else {
          this.player.setPositionDown(this);

        }
      }, 50);
    } else if (
      x >= areaLeft.startX &&
      x <= areaLeft.endX &&
      y >= areaLeft.startY &&
      y <= areaLeft.endY
    ) {
      this.steeringTimer = setInterval(() => {
        if (databus.gameOver) {
          clearInterval(this.steeringTimer);

        } else {
          this.player.setPositionLeft(this);

        }
      }, 50);
    } else if (
      x >= areaRight.startX &&
      x <= areaRight.endX &&
      y >= areaRight.startY &&
      y <= areaRight.endY
    ) {
      this.steeringTimer = setInterval(() => {
        if (databus.gameOver) {
          clearInterval(this.steeringTimer);

        } else {
          this.player.setPositionRight(this);

        }
      }, 50);
    } else if (
      x >= areaSpeed.startX &&
      x <= areaSpeed.endX &&
      y >= areaSpeed.startY &&
      y <= areaSpeed.endY
    ) {
      this.player.setSpeed();
    }
  }
  //
  touchEndSteeringEventHandler(e) {
    e.preventDefault();
    clearInterval(this.steeringTimer);
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(
      -canvas.width,
      -canvas.height,
      3 * canvas.width,
      3 * canvas.height
    );

    this.bg.render(ctx, this.goldArr, databus.monsterArr);

    this.steering.renderSteering(ctx);

    databus.monsters.forEach((item) => {
      item.drawToCanvas(ctx);
    });

    this.player.drawToCanvas(ctx);

    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx);
      }
    });

    this.gameinfo.renderGameScore(ctx, databus.score);

    // 游戏结束停止帧循环
    if (databus.gameOver) {
      canvas.removeEventListener('touchstart', this.touchSteeringHandler);
      canvas.removeEventListener('touchend', this.touchEndSteeringHandler);
      this.gameinfo.renderGameOver(ctx, databus.score, this.personalHighScore);

      if (!this.hasEventBind) {
        this.hasEventBind = true;
        this.touchHandler = this.touchEventHandler.bind(this);
        canvas.addEventListener('touchstart', this.touchHandler);
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver) return;
    this.generateMonster();
    this.scoreDetection();
    this.collisionDetection();

    if (databus.frame % 20 === 0) {
      // this.player.shoot()
      // this.music.playShoot()
    }
  }

  // 实现游戏帧循环
  loop(timestamp) {
    databus.frame++;
    this.update();
    this.render();

    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas);
  }
}
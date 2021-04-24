import Sprite from '../base/sprite';
import Bullet from './bullet';
import DataBus from '../databus';
import Wall, { WALL_WIDTH, WALL_HEIGHT } from '../runtime/wall';
import { isCollideWith } from '../utils/index';
import { GOLD_WIDTH, GOLD_HEIGHT } from '../npc/gold';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const MIN_DISTANCE = 200;

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/hero.png';
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;

let databus = new DataBus();

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT);

    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2;
    this.y = screenHeight - this.height - 200;

    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false;

    this.bullets = [];
    this.speed = 10;

    // 初始化事件监听
    // this.initEvent()
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30;

    return !!(
      x >= this.x - deviation &&
      y >= this.y - deviation &&
      x <= this.x + this.width + deviation &&
      y <= this.y + this.height + deviation
    );
  }

  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2;
    let disY = y - this.height / 2;

    if (disX < 0) disX = 0;
    else if (disX > screenWidth - this.width) disX = screenWidth - this.width;

    if (disY <= 0) disY = 0;
    else if (disY > screenHeight - this.height)
      disY = screenHeight - this.height;

    this.x = disX;
    this.y = disY;
  }

  setSpeed(speed = 15) {
    if (this.speed === speed) {
      return;
    }
    this.speed = speed;
    setTimeout(() => {
      this.speed = 10;
    }, 5000);
  }
  setPosition(x, y) {
    let disX = x;
    let disY = y;

    if (disX < 0) disX = 0;
    else if (disX > screenWidth - this.width) disX = screenWidth - this.width;

    if (disY <= 0) disY = 0;
    else if (disY > screenHeight - this.height)
      disY = screenHeight - this.height;

    this.x = disX;
    this.y = disY;
  }

  isPlayerCollisionWall(wallPositions, x, y, width, height) {
    const one = wallPositions.find((wall) => {
      return isCollideWith(
        { x: wall[0], y: wall[1], width: WALL_WIDTH, height: WALL_HEIGHT },
        { x, y, width, height }
      );
    });
    return one ? true : false;
  }

  getPlayerCollisionGoldIndex(positions, x, y, width, height) {
    const index = positions.findIndex((position) => {
      return isCollideWith(
        {
          x: position[0],
          y: position[1],
          width: GOLD_WIDTH,
          height: GOLD_HEIGHT,
        },
        { x, y, width, height }
      );
    });
    return index;
  }

  setPositionUp(App) {
    if (
      this.isPlayerCollisionWall(
        App.bg.wallPositions,
        this.x,
        this.y - this.speed,
        this.width,
        this.height
      )
    ) {
      return;
    }

    const goldIndex = this.getPlayerCollisionGoldIndex(
      App.bg.goldPositions,
      this.x,
      this.y - this.speed,
      this.width,
      this.height
    );
    if (goldIndex !== -1) {
      App.delGoldByIndex(goldIndex);
      App.music.playShoot();
    }

    this.setMonsterInAreaActive(App,0,-this.speed);

    if (this.y > screenHeight / 3 || App.bg.top >= screenHeight) {
      this.setPosition(this.x, this.y - this.speed);
    } else {
      App.bg.updateUp(this.speed);
    }
  }
  setPositionDown(App) {
    if (
      this.isPlayerCollisionWall(
        App.bg.wallPositions,
        this.x,
        this.y + this.speed,
        this.width,
        this.height
      )
    ) {
      return;
    }
    const goldIndex = this.getPlayerCollisionGoldIndex(
      App.bg.goldPositions,
      this.x,
      this.y + this.speed,
      this.width,
      this.height
    );
    if (goldIndex !== -1) {
      App.delGoldByIndex(goldIndex);
      App.music.playShoot();
    }
    this.setMonsterInAreaActive(App,0,this.speed);
    if (this.y > (screenHeight * 2) / 3 && App.bg.top > -screenHeight) {
      App.bg.updateDown(this.speed);
    } else {
      this.setPosition(this.x, this.y + this.speed);
    }
  }
  setPositionLeft(App) {
    if (
      this.isPlayerCollisionWall(
        App.bg.wallPositions,
        this.x - this.speed,
        this.y,
        this.width,
        this.height
      )
    ) {
      return;
    }
    const goldIndex = this.getPlayerCollisionGoldIndex(
      App.bg.goldPositions,
      this.x - this.speed,
      this.y,
      this.width,
      this.height
    );
    if (goldIndex !== -1) {
      App.delGoldByIndex(goldIndex);
      App.music.playShoot();
    }
    this.setMonsterInAreaActive(App,-this.speed,0);
    if (this.x < screenWidth / 3 && App.bg.left < screenWidth) {
      App.bg.updateLeft(this.speed);
    } else {
      this.setPosition(this.x - this.speed, this.y);
    }
  }
  setPositionRight(App) {
    if (
      this.isPlayerCollisionWall(
        App.bg.wallPositions,
        this.x + this.speed,
        this.y,
        this.width,
        this.height
      )
    ) {
      return;
    }
    const goldIndex = this.getPlayerCollisionGoldIndex(
      App.bg.goldPositions,
      this.x + this.speed,
      this.y,
      this.width,
      this.height
    );
    if (goldIndex !== -1) {
      App.delGoldByIndex(goldIndex);
      App.music.playShoot();
    }
    this.setMonsterInAreaActive(App,this.speed,0);
    if (this.x > screenWidth / 2 && App.bg.left > -screenWidth) {
      App.bg.updateRight(this.speed);
    } else {
      this.setPosition(this.x + this.speed, this.y);
    }
  }

  // 判获取与玩家的位置距离小于200px的monster，后面让monster追着player跑,也就是将该monster置为激活状态
  setMonsterInAreaActive(App,x,y) {
    databus.monsters.forEach((item) => {
      let isMonsterCollisionWall = false;
      //碰到墙的话就不往下setActive
      for(let i=0;i<App.bg.wallPositions.length;i++){
        const wall = App.bg.wallPositions[i]
        if(isCollideWith({x:wall[0],y:wall[1],width:WALL_WIDTH,height:WALL_HEIGHT},{x:item.x+x,y:item.y+y,width:item.width,height:item.height})){
          isMonsterCollisionWall=true;
          break;
        }
      }
      if(isMonsterCollisionWall){
        return
      }
      const disX = this.x - item.x;
      const disY = this.y - item.y;
      const sum = Math.pow(disX, 2) + Math.pow(disY, 2);
      const distance = Math.sqrt(sum);
      if (distance < MIN_DISTANCE) {
        item.setActive(disX / distance, disY / distance);
      }
    });
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener(
      'touchstart',
      ((e) => {
        e.preventDefault();

        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;

        //
        if (this.checkIsFingerOnAir(x, y)) {
          this.touched = true;

          this.setAirPosAcrossFingerPosZ(x, y);
        }
      }).bind(this)
    );

    canvas.addEventListener(
      'touchmove',
      ((e) => {
        e.preventDefault();

        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;

        if (this.touched) this.setAirPosAcrossFingerPosZ(x, y);
      }).bind(this)
    );

    canvas.addEventListener(
      'touchend',
      ((e) => {
        e.preventDefault();

        this.touched = false;
      }).bind(this)
    );
  }

  /**
   * 玩家射击操作
   * 射击时机由外部决定
   */
  shoot() {
    let bullet = databus.pool.getItemByClass('bullet', Bullet);

    bullet.init(this.x + this.width / 2 - bullet.width / 2, this.y - 10, 10);

    databus.bullets.push(bullet);
  }
}

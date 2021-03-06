import Pool from './base/pool'
import {goldArr,monsterArr} from './const'


let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.frame      = 0
    this.score      = 0
    this.bullets    = []
    this.enemys     = []
    this.animations = []
    this.walls = []
    this.gameOver   = false
    this.gameWin   = false
    this.monsterArr = monsterArr
    this.monsters = []
    this.bg = null
    // this.goldArr = goldArr
    this.speeding = false
    //使用加速按钮的次数
    this.speedTimes = 0
     //使用加速按钮的次数,不延时 用来上传数据
    this.realSpeedTimes = 0
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
    let temp = this.enemys.shift()

    temp.visible = false

    this.pool.recover('enemy', enemy)
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    let temp = this.bullets.shift()

    temp.visible = false

    this.pool.recover('bullet', bullet)
  }
}

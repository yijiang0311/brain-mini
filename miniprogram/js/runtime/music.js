let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    //背景音乐
    this.bgmAudio = new Audio()
    this.bgmAudio.loop = true
    this.bgmAudio.src  = 'audio/bgm.mp3'

    //加速音效
    this.speedAudio     = new Audio()
    this.speedAudio.loop = true
    this.speedAudio.src = 'audio/bullet.mp3'

    //捡到金币音效
    this.shootAudio     = new Audio()
    this.shootAudio.src = 'audio/bullet.mp3'

    //碰到怪兽虫子音效
    this.boomAudio     = new Audio()
    this.boomAudio.src = 'audio/boom.mp3'

    this.playBgm()
  }

  playBgm() {
    this.bgmAudio.play()
  }

  playSpeed() {
    this.speedAudio.currentTime = 0
    this.speedAudio.play()
  }
  
  stopSpeed(){
    this.speedAudio.pause()
  }

  playShoot() {
    this.shootAudio.currentTime = 0
    this.shootAudio.play()
  }

  playExplosion() {
    this.boomAudio.currentTime = 0
    this.boomAudio.play()
  }
}

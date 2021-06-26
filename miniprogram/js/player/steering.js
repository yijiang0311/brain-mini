import DataBus from '../databus';
import {
  sumSpeedTimes
} from '../const'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let steering = new Image()
steering.src = 'images/steering.png'
let speed = new Image()
speed.src = 'images/speed.png'
let speedDisabled = new Image()
speedDisabled.src = 'images/speed_disabled.png'
let databus = new DataBus();

export default class Steering {
  renderSteering(ctx) {
    const speedImg = databus.speedTimes >= sumSpeedTimes || databus.speeding ? speedDisabled : speed
    ctx.drawImage(steering, 0, screenHeight - 220, 220, 220)
    ctx.drawImage(speedImg, screenWidth - 125, screenHeight - 125, 125, 125)

    this.upBtnArea = {
      startX: 80,
      startY: screenHeight - 220,
      endX: 80 + 70,
      endY: screenHeight - 220 + 80
    }
    this.downBtnArea = {
      startX: 80,
      startY: screenHeight - 140 + 70,
      endX: 80 + 70,
      endY: screenHeight,
    }
    this.leftBtnArea = {
      startX: 0,
      startY: screenHeight - 140,
      endX: 80,
      endY: screenHeight - 140 + 70

    }
    this.rightBtnArea = {
      startX: 80 + 70,
      startY: screenHeight - 220 + 80,
      endX: 220,
      endY: screenHeight - 70,
    }
    this.speedBtnArea = {
      startX: screenWidth - 125,
      startY: screenHeight - 125,
      endX: screenWidth,
      endY: screenHeight
    }
  }
}
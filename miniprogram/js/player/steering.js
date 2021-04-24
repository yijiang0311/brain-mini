const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let steering = new Image()
steering.src = 'images/steering.jpeg'
let speed = new Image()
speed.src = 'images/speed.jpeg'

export default class Steering {
  renderSteering(ctx) {
    
   ctx.drawImage(steering,0,screenHeight-200,200,200)
   ctx.drawImage(speed,screenWidth-100,screenHeight-100,100,100)

   this.upBtnArea = {
      startX: 66,
      startY: screenHeight -170,
      endX  : 66  + 66,
      endY  : screenHeight -170 + 66
    }
   this.downBtnArea = {
      startX: 66,
      startY: screenHeight -170+70,
      endX  : 66  + 66,
      endY  : screenHeight -170+70 + 66
    }
   this.leftBtnArea = {
      startX: 0,
      startY: screenHeight -170+70,
      endX  : 66,
      endY  : screenHeight -170+70 + 66
    }
   this.rightBtnArea = {
      startX: 66+66,
      startY: screenHeight -170+70,
      endX  : 66  + 66 +66,
      endY  : screenHeight -170+70 + 66
    }
   this.speedBtnArea = {
      startX: screenWidth-100,
      startY: screenHeight -100,
      endX  : screenWidth,
      endY  : screenHeight
    }
  }
}


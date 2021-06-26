const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/Common.png'

export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      score,
      10,
      30
    )
  }

  renderGameExplain(ctx) {
    
    ctx.drawImage(atlas, 266, 125, 121, 83, screenWidth / 2 - 160, screenHeight / 2 - 200, 320, 400)

    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"

    const title = '游戏规则'

    ctx.fillText(
      title,
      screenWidth / 2 - 50,
      screenHeight / 2 - 200 + 60
    )
    ctx.font    = "16px Arial"
    ctx.fillText(
      '任务：到达地图中间旗帜[🚩]处获得' ,
      screenWidth / 2 - 130,
      screenHeight / 2 - 200 + 130
    )
    ctx.fillText(
      '胜利，期间收集苹果🍎越多得分越高。' ,
      screenWidth / 2 - 130,
      screenHeight / 2 - 200 + 130 + 24
    )
    ctx.fillText(
      '左下角【方向盘】控制人物移动。' ,
      screenWidth / 2 - 130,
      screenHeight / 2 - 200 + 130 + 68
    )
    ctx.fillText(
      '右下角【人型按钮】为加速按钮：点' ,
      screenWidth / 2 - 130,
      screenHeight / 2 - 200 + 130 + 68+24
    )
    ctx.fillText(
      '击之后人物的速度将会提升；最多有' ,
      screenWidth / 2 - 130,
      screenHeight / 2 - 200 + 130 + 68+24*2
    )
    ctx.fillText(
      '【3次】点击加速的机会；每次加速的' ,
      screenWidth / 2 - 130,
      screenHeight / 2 - 200 + 130 + 68+24*3
    )
    ctx.fillText(
      '持续时间为【5秒钟】。' ,
      screenWidth / 2 - 130,
      screenHeight / 2 - 200 + 130 + 68+24*4
    )

    
    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 + 200 - 60,
      120, 40
    )
    ctx.font    = "20px Arial"
    ctx.fillText(
      '开始游戏',
      screenWidth / 2 - 40,
      screenHeight / 2 + 200 - 36
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.startBtnArea = {
      startX: screenWidth / 2 - 60,
      startY: screenHeight / 2 +200 - 60,
      endX  : screenWidth / 2  + 60,
      endY  : screenHeight / 2 +200 - 20
    }
  }
  renderGameOver(ctx, score, personalHighScore,isSucceed=false) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"

    const title = isSucceed ? '成功通关' : '游戏结束'

    ctx.fillText(
      title,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )

    if (personalHighScore) {
      ctx.fillText(
        '最高分: ' + personalHighScore,
        screenWidth / 2 - 40,
        screenHeight / 2 - 100 + 160
      )
    }
    
    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 255
    }
  }
}


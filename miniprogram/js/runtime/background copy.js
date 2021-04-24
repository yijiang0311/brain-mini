import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg.jpg'
const BG_WIDTH = 512
const BG_HEIGHT = 512

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.top = 0
    this.left = 0

    this.render(ctx)
  }

  update() {
    // this.top += 2
    // this.left += 2

    if (this.top >= screenHeight)
      this.top = 0

    // if(this.left>=screenWidth){
    //   this.left=0
    // }  
  }

  updateUp(x) {
    if (this.top < screenHeight - x)
      this.top += x
    else 
      this.top=screenHeight  
  }
  updateDown(x) {
    if (this.top > -screenHeight + x)
      this.top -= x
    else 
      this.top = -screenHeight  
  }
  updateLeft(x) {
    if (this.left < screenWidth - x)
      this.left += x
    else
      this.left = screenWidth
  }
  updateRight(x) {
    if (this.left > -screenWidth + x)
      this.left -= x
    else
      this.left = -screenWidth
  }


  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {
    // 上
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.left,
      -screenHeight + this.top,
      screenWidth,
      screenHeight
    )
    
    // 中间
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.left,
      this.top,
      screenWidth,
      screenHeight
    )
    //下面
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.left,
      this.top + screenHeight,
      screenWidth,
      screenHeight
    )
    //左边
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      -screenWidth + this.left,
      this.top,
      screenWidth,
      screenHeight
    )
    //右边
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.left + screenWidth,
      this.top,
      screenWidth,
      screenHeight
    )
    //左上边
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      -screenWidth + this.left,
      -screenHeight + this.top,
      screenWidth,
      screenHeight
    )
    //右上边
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.left + screenWidth,
      -screenHeight + this.top,
      screenWidth,
      screenHeight
    )
    //左下边
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      -screenWidth + this.left,
      this.top + screenHeight,
      screenWidth,
      screenHeight
    )
    //右下边
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.left + screenWidth,
      this.top + screenHeight,
      screenWidth,
      screenHeight
    )
  }
}
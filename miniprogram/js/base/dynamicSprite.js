import Sprite  from './sprite'


/**
 * 游戏基础的精灵类
 */
export default class DynamicSprite extends Sprite{
  constructor(imgList, width = 0, height = 0, x = 0, y = 0) {
    super('',width,height)
    this.imgList=[]
    this.initImgs(imgList)

    this.index = 0
    this.count = 0
  }

  initImgs(imgList) {
    imgList.forEach((imgSrc) => {
      let img = new Image()
      img.src = imgSrc

      this.imgList.push(img)
    })
    // 总帧数
    this.imgLen = imgList.length
  }

  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if (!this.visible)
      return

    //切换三只小鸟的速度
    const speed = 0.1;
    this.count = this.count + speed;
    //0,1,2
    if (this.index >= this.imgLen-1) {
      this.count = 0;
    }
    //减速器的作用
    this.index = Math.floor(this.count);


    ctx.drawImage(
      this.imgList[this.index],
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

}
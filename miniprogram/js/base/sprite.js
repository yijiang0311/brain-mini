/**
 * 游戏基础的精灵类
 */
export default class Sprite {
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {

    if (imgSrc &&  imgSrc instanceof Array) {
      this.dynamic = true
      this.dynamicImgList = []
      this.initImgs(imgSrc)

      this.dynamicIndex = 0
      this.dynamicCount = 0
    } else {
      this.dynamic = false
      this.img = new Image()
      this.img.src = imgSrc

    }

    this.width = width
    this.height = height

    this.x = x
    this.y = y

    this.visible = true
  }

  initImgs(dynamicImgList) {
    dynamicImgList.forEach((imgSrc) => {
      let img = new Image()
      img.src = imgSrc

      this.dynamicImgList.push(img)
    })
  }
  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx,speed=0.1) {
    if (!this.visible)
      return

    if (this.dynamic) {
      //切换的速度
      // const speed = 0.1;
      this.dynamicCount = this.dynamicCount + speed;
      //0,1,2
      if (this.dynamicIndex >= this.dynamicImgList.length - 1) {
        this.dynamicCount = 0;
      }
      //减速器的作用
      this.dynamicIndex = Math.floor(this.dynamicCount);

      ctx.drawImage(
        this.dynamicImgList[this.dynamicIndex],
        this.x,
        this.y,
        this.width,
        this.height
      )
    } else {
      
      ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }

  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let spX = sp.x + sp.width / 2
    let spY = sp.y + sp.height / 2

    if (!this.visible || !sp.visible)
      return false

    return !!(spX >= this.x &&
      spX <= this.x + this.width &&
      spY >= this.y &&
      spY <= this.y + this.height)
  }
}
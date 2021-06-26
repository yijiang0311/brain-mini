import Sprite from '../base/sprite'
import Wall from './wall'
import Gold from '../npc/gold'
import Monster from '../npc/monster'
import DataBus from '../databus'
import Flag from '../npc/flag'
import {
  geneWallData
} from './wall'
import {getWinPoint} from '../const'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg.png'
const BG_WIDTH = 414
const BG_HEIGHT = 616
const WALL_IMG_SRC = 'images/wall.png'
const WALL_WIDTH = 50
const WALL_HEIGHT = 50



const wallImg = new Image()
wallImg.src = WALL_IMG_SRC

const databus = new DataBus()
const wall = new Wall()
const gold = new Gold()
const monster = new Monster()
export const flag = new Flag()
/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.top = 0
    this.left = 0
    this.wallArr = geneWallData()
    this.wallPositions = []
    this.goldPositions = []

    // this.render(ctx,[])
  }


  update() {

  }

  updateUp(x) {
    if (this.top < screenHeight - x){
      this.top += x
      this.updateMonsters(0,x)
    }else
      this.top = screenHeight
    
  }
  updateDown(x) {
    if (this.top > -screenHeight + x){
      this.top -= x
      this.updateMonsters(0,-x)
    }
    else
      this.top = -screenHeight
  }
  updateLeft(x) {
    if (this.left < screenWidth - x){
      this.left += x
      this.updateMonsters(x,0)
    }
    else
      this.left = screenWidth
  }
  updateRight(x) {
    if (this.left > -screenWidth + x){
      this.left -= x
      this.updateMonsters(-x,0)
    }
    else
      this.left = -screenWidth
  }

  updateMonsters(x,y){
    databus.monsters.forEach(item=>{
      item.update(x,y)
    })
  }
  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx,goldArr=[],monsterArr=[],rand) {

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      -screenWidth + this.left,
      -screenHeight + this.top,
      screenWidth * 3,
      screenHeight * 3
    )

    //渲染旗帜
    const flagPoint = getWinPoint(rand)
    // console.log('flagPoint......');
    // console.log(flagPoint);
    // console.log(-screenWidth);
    // console.log(-screenWidth+this.left+flagPoint[0]);
    // console.log(flagPoint[0]);
    
    flag.render(ctx,-screenWidth+this.left+flagPoint[0],-screenHeight+this.top+flagPoint[1])

    this.goldPositions = []
    goldArr.forEach((item) => {
      const x = -screenWidth + this.left + item[0]
      const y = -screenHeight + this.top + item[1]
      this.goldPositions.push([x, y])
      gold.render(ctx, x, y)
    })

    //
    // this.monsterPositions = []
    // monsterArr.forEach((item) => {
    //   const x = -screenWidth + this.left + item[0]
    //   const y = -screenHeight + this.top + item[1]
    //   this.monsterPositions.push([x, y])
    //   monster.render(ctx, x, y)
    // })



    this.wallPositions = []
    this.wallArr.forEach((item) => {
      // ctx.drawImage(wallImg,-screenWidth+ this.left+ item[0],-screenHeight+this.top+item[1],WALL_WIDTH,WALL_HEIGHT)
      // ctx.drawImage(wallImg,-screenWidth+ this.left+ item[0],-screenHeight+this.top+item[1],WALL_WIDTH,WALL_HEIGHT)

      // let wall = databus.pool.getItemByClassWithParams('wall', Wall,-screenWidth+ this.left+ item[0],-screenHeight+this.top+item[1])
      // databus.walls.push(wall)
      // wall.drawToCanvas(ctx)
      const x = -screenWidth + this.left + item[0]
      const y = -screenHeight + this.top + item[1]
      this.wallPositions.push([x, y])
      wall.render(ctx, x, y)
    })

   

    
  }
}
import Sprite from '../base/sprite'
import {isCollideWith} from '../utils/index'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const WALL_IMG_SRC = 'images/wall.png'
export const WALL_WIDTH = 50
export const WALL_HEIGHT = 50

export const wallArr = [[50,50],[100,100],[200,200],[300,300],[400,400],[500,500],[600,600],[600,700],
[300,400],[350,400],[400,400],[450,400],[500,400],[560,400]]

export default class Wall extends Sprite {
  constructor(x,y) {
    super(WALL_IMG_SRC, WALL_WIDTH, WALL_HEIGHT,x,y)
    this.positions = []
  }
  render(ctx,x,y){
    ctx.drawImage(this.img,x,y,WALL_WIDTH,WALL_HEIGHT)

  }

}
import Sprite from '../base/sprite'
import {isCollideWith} from '../utils/index'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const WALL_IMG_SRC = 'images/wall.png'
export const WALL_WIDTH = 50
export const WALL_HEIGHT = 50


const startXArr=[[100,100],[600,200],[2.5*screenWidth,600],[150,1.5*screenHeight],[1.3*screenWidth,1.3*screenHeight],[200,2.5*screenHeight],[1.1*screenWidth,2.2*screenHeight],[2.2*screenWidth,2.5*screenHeight]]
const startYArr=[[0.5*screenWidth,0.5*screenHeight],[600,200],[150,1.3*screenHeight],[1.2*screenWidth,1.3*screenHeight],[200,1.8*screenHeight],[2.6*screenWidth,1.6*screenHeight]]
/**
 * 
 * @param {*} start 起点
 * @param {*} type x,y,xy
 */
const generateData = (wallArr,start,type,len=4)=>{
  for(let i=0;i<len;i++){
    const x = start[0]+i*WALL_WIDTH;
    const y = start[1]+i*WALL_HEIGHT;
    switch(type){
      case 'x':
        wallArr.push([x,start[1]]);
        break;
      case 'y':
        wallArr.push([start[0],y]);
        break;
      case 'xy':
        wallArr.push([x,y])
        break;
      default:
        wallArr.push([x,start[1]]);  

    }
  }
}

export const geneWallData = ()=>{
  const wallArr=[]
  for(let [index,item] of startXArr.entries()){
    const len = index<4 ? 4 : index-1
    generateData(wallArr,item,'x',len)
  }
  for(let [index,item] of startYArr.entries()){
    const len2 = index<4 ? 5 : index+1
    generateData(wallArr,item,'y',len2)
  }
  return wallArr;
}


export default class Wall extends Sprite {
  constructor(x,y) {
    super(WALL_IMG_SRC, WALL_WIDTH, WALL_HEIGHT,x,y)
    this.positions = []
  }
  render(ctx,x,y){
    ctx.drawImage(this.img,x,y,WALL_WIDTH,WALL_HEIGHT)
  }

}
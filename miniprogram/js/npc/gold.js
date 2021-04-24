import Animation from '../base/animation'
import DataBus   from '../databus'

const GOLD_SRC = 'images/gold.png'
export const GOLD_WIDTH   = 30
export const GOLD_HEIGHT  = 30

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()


export default class Enemy extends Animation {
  constructor() {
    super(GOLD_SRC, GOLD_WIDTH, GOLD_HEIGHT)
  }
  render(ctx,x,y){
    ctx.drawImage(this.img,x,y,GOLD_WIDTH,GOLD_HEIGHT)
  }

}

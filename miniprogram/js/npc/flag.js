import Animation from '../base/animation'

const FLAG_IMG_SRC = 'images/flag.png'
export const FLAG_WIDTH = 40
export const FLAG_HEIGHT = 40



export default class Flag extends Animation {
  constructor() {
    super(FLAG_IMG_SRC, FLAG_WIDTH, FLAG_HEIGHT)
  }
  render(ctx,x,y){
    // console.log(x,y);
    this.x = x;
    this.y = y;
    ctx.drawImage(this.img,x,y,this.width,this.height)
  }

}

import Animation from '../base/animation';
import DataBus from '../databus';
import { startPoint } from '../const';

const MONSTER_IMG_LIST = ['images/monster/monster0.png','images/monster/monster1.png','images/monster/monster2.png','images/monster/monster3.png','images/monster/monster4.png'];
const MONSTER_WIDTH = 50;
const MONSTER_HEIGHT = 50;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const __ = {
  speed: Symbol('speed'),
};

let databus = new DataBus();

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

export default class Enemy extends Animation {
  constructor() {
    super(MONSTER_IMG_LIST, MONSTER_WIDTH, MONSTER_HEIGHT);
    this.x = 0;
    this.y = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.active = false;
    this.speed = 0.8;
    this.speedX = 0;
    this.speedY = 0;
    this.initExplosionAnimation()
  }
  init(x, y) {
    this.offsetX = startPoint[0] + x;
    this.offsetY = startPoint[1] + y;
    this.x = this.offsetX;
    this.y = this.offsetY;
    // console.log(this.x,this.y);
    
    this.visible = true;
  }
// 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/explosion/explosion'
    const EXPLO_FRAME_COUNT = 19

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }
  setActive(rateX, rateY) {
    this.active = true;
    this.speedX = this.speed * rateX;
    this.speedY = this.speed * rateY;
  }
  setDeactive(){
    this.active=false;
    this.speedX=0;
    this.speedY=0;
    // console.log('this.active......');
    // console.log(this.active);
    
  }
  // render(ctx,x,y){
  //   ctx.drawImage(this.img,x,y,MONSTER_WIDTH,MONSTER_HEIGHT)
  // }

  update(x = 0, y = 0) {
    const addX = this.speedX +x;
    const addY = this.speedY + y;
    const rightX = this.x+addX+this.width
    const bottomY = this.y+addY+this.height
    if(rightX>2*screenWidth+databus.bg.left||this.x+addX<-screenWidth+databus.bg.left||bottomY>2*screenHeight+databus.bg.top||this.y+addY<-screenHeight+databus.bg.top){
      // console.log('bianjie.......');
      // console.log(rightX,2*screenWidth+databus.bg.left);
      // console.log(this.x+addX,-screenWidth+databus.bg.left);
      // console.log(bottomY,2*screenHeight+databus.bg.top);
      // console.log(this.y+addY,-screenHeight+databus.bg.top);
      this.setDeactive()
      return
    }
    
    this.x += x +this.speedX;
    this.y += y + this.speedY;
    // if (this.active) {
      // this.x += this.speedX;
      // this.y += this.speedY;
    // }
  }

  
}

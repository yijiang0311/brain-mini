import Sprite from '../base/sprite'

const IMG_SRC = 'images/wind.png'
const IMG_LIST = ['images/wind/wind0.png','images/wind/wind1.png','images/wind/wind2.png']
 const WIDTH = 80
 const HEIGHT = 80

 const screenWidth  = window.innerWidth
 const screenHeight = window.innerHeight
 

/**
 * 加速时的特效，飓风
 */
export default class Flag extends Sprite {
  constructor() {
    super(IMG_LIST, WIDTH, HEIGHT,screenWidth-90,screenHeight-190)
  }
}

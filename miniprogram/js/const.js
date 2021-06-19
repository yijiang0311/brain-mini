const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


//最多使用加速次数
export const sumSpeedTimes = 3;

export const startPoint = [-window.innerWidth,-window.innerHeight]
export const goldArr = [
  [100,0.5*screenHeight],
  [1.2*screenWidth,0.4*screenHeight],
  [2*screenWidth,0.4*screenHeight],
  [0.9*screenWidth,1.4*screenHeight],
  [2.5*screenWidth,screenHeight],
  [2.8*screenWidth,1.5*screenHeight],
  [0.8*screenWidth,1.7*screenHeight],
  [0.8*screenWidth,2.3*screenHeight],
  [2.5*screenWidth,2.3*screenHeight],
  [1.5*screenWidth,2.8*screenHeight],
]

export const monsterArr = [
  [120,0.5*screenHeight+100],
  [1*screenWidth,0.5*screenHeight],
  [2.2*screenWidth,0.5*screenHeight],
  [0.7*screenWidth,1.2*screenHeight],
  [2.3*screenWidth,1.1*screenHeight],

  // [2.8*screenWidth,1.5*screenHeight],
  // [0.8*screenWidth,1.7*screenHeight],
  [0.7*screenWidth,2.1*screenHeight],
  [2.3*screenWidth,2.1*screenHeight],
  [1.2*screenWidth,2.5*screenHeight],
]

export const getWinPoint = (rand)=>{
  // return rand<0.5 ? [0.3*screenWidth,0.5*screenHeight] : [250,2.7*screenHeight]
  return [0.8*screenWidth,0.4*screenHeight]
}
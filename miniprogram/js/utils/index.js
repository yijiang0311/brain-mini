export function isCollideWith(a,b){
  if(a.y+a.width*2/3>b.y&&a.y<b.y+b.height*2/3&&a.x+a.width*2/3>b.x&&a.x<b.x+b.width*2/3){
    return true
  }
  return false
}
// export function isCollideWith(a,b){
//   if(a.y+a.width>b.y&&a.y<b.y+b.height&&a.x+a.width>b.x&&a.x<b.x+b.width){
//     return true
//   }
//   return false
// }
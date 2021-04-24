export function isCollideWith(a,b){
  if(a.y+a.width>b.y&&a.y<b.y+b.height&&a.x+a.width>b.x&&a.x<b.x+b.width){
    return true
  }
  return false
}
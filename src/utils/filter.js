/* 路由切换动画 */
export function routerTransition (to, from, slideDrection) {
  let transitionName
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  const homeArr = ['/works', '/shop/home', '/member/home']
  if (homeArr.indexOf(to.path) !== -1 && homeArr.indexOf(from.path) !== -1) {
    transitionName = 'pageTransition'
  } else if (slideDrection === 'left') {
    transitionName = 'slide-left'
  } else if (slideDrection === 'right' || toDepth < fromDepth) {
    transitionName = 'slide-right'
  } else {
    transitionName = 'slide-left'
  }
  return transitionName
}

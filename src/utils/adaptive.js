(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth > 415) {
      docEl.style.fontSize = 45 + 'px'
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'    // 设计稿宽度是750px
    }
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

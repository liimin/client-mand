// (function (window, document) {
//   function resize () {
//     var ww = window.innerWidth
//     if (ww > window.screen.width) {
//       window.requestAnimationFrame(resize)
//     } else {
//       if (ww > 720) {
//         ww = 720
//       }
//       console.log(ww)
//       document.documentElement.style.fontSize = ww * 0.13333333333333333 + 'px'
//       document.body.style.opacity = 1
//     }
//   }

//   if (document.readyState !== 'loading') {
//     resize()
//   } else {
//     document.addEventListener('DOMContentLoaded', resize)
//   }

//   window.addEventListener('resize', resize)
// })(window, document)
(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))

/* ********** Menu ********** */
;((d) => {
  const $btnMenu = d.querySelector('.menu-btn'),
    $menu = d.querySelector('.menu')

  $btnMenu.addEventListener('click', (e) => {
    $btnMenu.firstElementChild.classList.toggle('none')
    $btnMenu.lastElementChild.classList.toggle('none')
    $menu.classList.toggle('is-active')
  })

  d.addEventListener('click', (e) => {
    if (!e.target.matches('.menu a')) return false

    $btnMenu.firstElementChild.classList.remove('none')
    $btnMenu.lastElementChild.classList.add('none')
    $menu.classList.remove('is-active')
  })
})(document)
/* ********** Menu ***************** */
/* ********** language and flags ************* */
;((d) => {
  var form_dictionary = {
    en: {
      username: 'Your full name',
      email: 'Your contact email *',
      message: 'Leftme your message, please *',
    },
    es: {
      username: 'Tu nombre',
      email: 'Tu mejor email *',
      message: 'Déjame tu mensaje... *',
    },
  }
  var username = d.querySelector('.username-input')
  var email = d.querySelector('.email-input')
  var message = d.querySelector('.message-input')

  var lang = d.getElementById('selected_lang')

  function selectedOption() {
    var options_array = Array.from(d.querySelector('#selected_lang').options)
    console.log(options_array)
    var index_selected = d.querySelector('#selected_lang').selectedIndex
    console.log(index_selected)

    updateSelect(options_array, index_selected)
  }

  function updateSelect(options_array, index_selected) {
    let languages = ['en', 'es']
    let flags = d.querySelectorAll('.flag')
    // let flag_selected = flags.querySelector('.flag--' + languages[index_selected]);
    let optionSelected =
      d.querySelector('#selected_lang').options[index_selected]
    options_array.forEach(function (item) {
      item.removeAttribute('selected')
    })
    optionSelected.setAttribute('selected', 'selected')

    // $('.item-lang[lang=en]').fadeIn(1500);
    // $('.item-lang[lang=es').hide();
    switch (languages[index_selected]) {
      case 'en':
        // banderas remove .active
        flags.forEach(function (item) {
          item.classList.remove('active')
        })
        // banderas add .active
        d.querySelector('.flag--en').classList.add('active')
        // ocultar idiomas que no han sido seleccionados
        let allOthersItemsEn = d.querySelectorAll(".item-lang[lang='es']")
        fadeOut(allOthersItemsEn, 10)
        // mostrar los que si
        let allItemsLanguageEn = d.querySelectorAll(".item-lang[lang='en']")
        fadeIn(allItemsLanguageEn, 10)
        // inputs y textarea changes
        username.setAttribute('placeholder', form_dictionary.en.username)
        email.setAttribute('placeholder', form_dictionary.en.email)
        message.setAttribute('placeholder', form_dictionary.en.message)

        break

      case 'es':
        // banderas remove .active
        flags.forEach(function (item) {
          item.classList.remove('active')
        })
        // banderas add .active
        d.querySelector('.flag--es').classList.add('active')
        // ocultar idiomas que no han sido seleccionados
        let allOthersItemsEs = d.querySelectorAll(".item-lang[lang='en']")
        fadeOut(allOthersItemsEs, 10)
        // mostrar los que si
        let allItemsLanguageEs = d.querySelectorAll(".item-lang[lang='es']")
        fadeIn(allItemsLanguageEs, 10)
        // inputs y textarea changes
        username.setAttribute('placeholder', form_dictionary.es.username)
        email.setAttribute('placeholder', form_dictionary.es.email)
        message.setAttribute('placeholder', form_dictionary.es.message)

        break
    }
  }

  function fadeOut(elements, time) {
    var op = 1 // initial opacity
    var timer = setInterval(function () {
      if (op <= 0.1) {
        clearInterval(timer)
        elements.forEach(function (item) {
          item.style.display = 'none'
        })
      }
      elements.forEach(function (item) {
        item.style.opacity = op
        item.style.filter = 'alpha(opacity=' + op * 100 + ')'
        op -= op * 0.1
      })
    }, time)
  }

  function fadeIn(elements, time) {
    var op = 0.1 // initial opacity
    elements.forEach(function (item) {
      item.style.display = 'block'
    })
    var timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer)
      }
      elements.forEach(function (item) {
        item.style.opacity = op
        item.style.filter = 'alpha(opacity=' + op * 100 + ')'
        op += op * 0.1
      })
    }, time)
  }

  selectedOption()

  lang.addEventListener('change', function () {
    selectedOption()
  })
})(document)
/* ********** language ************* */
/* ********** ContactForm ********** */
;((d) => {
  const $form = d.querySelector('.contact-form'),
    $loader = d.querySelector('.contact-form-loader'),
    $response = d.querySelector('.contact-form-response')

  $form.addEventListener('submit', (e) => {
    e.preventDefault()
    $loader.classList.remove('none')
    fetch('https://formsubmit.co/ajax/9fa64cbc853657c2e0b040d5f45ada8a', {
      method: 'POST',
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json)
        location.hash = '#gracias'
        $form.reset()
      })
      .catch((err) => {
        console.log(err)
        let message =
          err.statusText || 'Ocurrió un error al enviar, intenta nuevamente'
        $response.querySelector(
          'h3',
        ).innerHTML = `Error ${err.status}: ${message}`
      })
      .finally(() => {
        $loader.classList.add('none')
        setTimeout(() => {
          location.hash = '#close'
        }, 3000)
      })
  })
})(document)
/* ********** ContactForm ********** */
/* ********** 3d cloud tags ******** */
const myTags = [
  'TypeScript',
  'CSS',
  'HTML',
  'Angular',
  'Nodejs',
  'Web3',
  'VanillaJS',
  'express',
  'TDD',
  'scrum',
  'git',
  'MongoDB',
  'solidity',
]
var tagCloud = TagCloud('.cloudtag', myTags, {
  // radius in px
  radius: 150,
  // animation speed
  // slow, normal, fast
  maxSpeed: 'normal',
  initSpeed: 'normal',
  // 0 = top
  // 90 = left
  // 135 = right-bottom
  direction: 135,

  // interact with cursor move on mouse out
  keep: true,
})
console.log(tagCloud)
/* ********** 3d cloud tags ******** */
/* ********** dial percentage ****** */
// var Dial = function (container) {
//   this.container = container
//   this.size = this.container.dataset.size
//   this.strokeWidth = this.size / 8
//   this.radius = this.size / 2 - this.strokeWidth / 2
//   this.value = this.container.dataset.value
//   this.direction = this.container.dataset.arrow
//   this.svg
//   this.defs
//   this.slice
//   this.overlay
//   this.text
//   this.arrow
//   this.create()
// }

// Dial.prototype.create = function () {
//   this.createSvg()
//   this.createDefs()
//   this.createSlice()
//   this.createOverlay()
//   this.createText()
//   this.createArrow()
//   this.container.appendChild(this.svg)
// }

// Dial.prototype.createSvg = function () {
//   var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
//   svg.setAttribute('width', this.size + 'px')
//   svg.setAttribute('height', this.size + 'px')
//   this.svg = svg
// }

// Dial.prototype.createDefs = function () {
//   var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
//   var linearGradient = document.createElementNS(
//     'http://www.w3.org/2000/svg',
//     'linearGradient',
//   )
//   linearGradient.setAttribute('id', 'gradient')
//   var stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
//   stop1.setAttribute('stop-color', 'var(--third-color)') // Color oscuro para la barra del dial
//   stop1.setAttribute('offset', '0%')
//   linearGradient.appendChild(stop1)
//   var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
//   stop2.setAttribute('stop-color', 'var(--fourth-color)') // Color más claro para la barra del dial
//   stop2.setAttribute('offset', '100%')
//   linearGradient.appendChild(stop2)
//   var linearGradientBackground = document.createElementNS(
//     'http://www.w3.org/2000/svg',
//     'linearGradient',
//   )
//   linearGradientBackground.setAttribute('id', 'gradient-background')
//   var stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
//   stop1.setAttribute('stop-color', 'rgba(0, 0, 0, 0.6)') // fondo oscuro
//   stop1.setAttribute('offset', '0%')
//   linearGradientBackground.appendChild(stop1)
//   var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
//   stop2.setAttribute('stop-color', 'rgba(0, 0, 0, 0.1)') // fondo claro
//   stop2.setAttribute('offset', '100%')
//   linearGradientBackground.appendChild(stop2)
//   defs.appendChild(linearGradient)
//   defs.appendChild(linearGradientBackground)
//   this.svg.appendChild(defs)
//   this.defs = defs
// }

// Dial.prototype.createSlice = function () {
//   var slice = document.createElementNS('http://www.w3.org/2000/svg', 'path')
//   slice.setAttribute('fill', 'none')
//   slice.setAttribute('stroke', 'url(#gradient)')
//   slice.setAttribute('stroke-width', this.strokeWidth)
//   slice.setAttribute(
//     'transform',
//     'translate(' + this.strokeWidth / 2 + ',' + this.strokeWidth / 2 + ')',
//   )
//   slice.setAttribute('class', 'animate-draw')
//   this.svg.appendChild(slice)
//   this.slice = slice
// }

// Dial.prototype.createOverlay = function () {
//   var r = this.size - this.size / 2 - this.strokeWidth / 2
//   var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
//   circle.setAttribute('cx', this.size / 2)
//   circle.setAttribute('cy', this.size / 2)
//   circle.setAttribute('r', r)
//   circle.setAttribute('fill', 'url(#gradient-background)') // gradiente oscuro
//   this.svg.appendChild(circle)
//   this.overlay = circle
// }

// Dial.prototype.createText = function () {
//   var fontSize = this.size / 3.5
//   var text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
//   text.setAttribute('x', this.size / 2 + fontSize / 7.5)
//   text.setAttribute('y', this.size / 2 + fontSize / 4)
//   text.setAttribute('font-family', 'Century Gothic, Lato')
//   text.setAttribute('font-size', fontSize)
//   text.setAttribute('fill', 'var(--white-color)') // blanco
//   text.setAttribute('text-anchor', 'middle')
//   var tspanSize = fontSize / 3
//   text.innerHTML =
//     0 +
//     '<tspan font-size="' +
//     tspanSize +
//     '" dy="' +
//     -tspanSize * 1.2 +
//     '">%</tspan>'
//   this.svg.appendChild(text)
//   this.text = text
// }

// Dial.prototype.createArrow = function () {
//   var arrowSize = this.size / 10
//   var arrowYOffset, m
//   if (this.direction === 'up') {
//     arrowYOffset = arrowSize / 2
//     m = -1
//   } else if (this.direction === 'down') {
//     arrowYOffset = 0
//     m = 1
//   }
//   var arrowPosX = this.size / 2 - arrowSize / 2
//   var arrowPosY = this.size - this.size / 3 + arrowYOffset
//   var arrowDOffset = m * (arrowSize / 1.5)
//   var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path')
//   arrow.setAttribute(
//     'd',
//     'M 0 0 ' +
//       arrowSize +
//       ' 0 ' +
//       arrowSize / 2 +
//       ' ' +
//       arrowDOffset +
//       ' 0 0 Z',
//   )
//   arrow.setAttribute('fill', '#ff6f61')
//   arrow.setAttribute('opacity', '0.6')
//   arrow.setAttribute(
//     'transform',
//     'translate(' + arrowPosX + ',' + arrowPosY + ')',
//   )
//   this.svg.appendChild(arrow)
//   this.arrow = arrow
// }

// Dial.prototype.animateStart = function () {
//   var v = 0
//   var self = this
//   var intervalOne = setInterval(function () {
//     var p = +(v / self.value).toFixed(2)
//     var a = p < 0.95 ? 2 - 2 * p : 0.05
//     v += a
//     // Stop
//     if (v >= +self.value) {
//       v = self.value
//       clearInterval(intervalOne)
//     }
//     self.setValue(v)
//   }, 10)
// }

// Dial.prototype.animateReset = function () {
//   this.setValue(0)
// }

// Dial.prototype.polarToCartesian = function (
//   centerX,
//   centerY,
//   radius,
//   angleInDegrees,
// ) {
//   var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
//   return {
//     x: centerX + radius * Math.cos(angleInRadians),
//     y: centerY + radius * Math.sin(angleInRadians),
//   }
// }

// Dial.prototype.describeArc = function (x, y, radius, startAngle, endAngle) {
//   var start = this.polarToCartesian(x, y, radius, endAngle)
//   var end = this.polarToCartesian(x, y, radius, startAngle)
//   var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
//   var d = [
//     'M',
//     start.x,
//     start.y,
//     'A',
//     radius,
//     radius,
//     0,
//     largeArcFlag,
//     0,
//     end.x,
//     end.y,
//   ].join(' ')
//   return d
// }

// Dial.prototype.setValue = function (value) {
//   var c = (value / 100) * 360
//   if (c === 360) c = 359.99
//   var xy = this.size / 2 - this.strokeWidth / 2
//   var d = this.describeArc(xy, xy, xy, 180, 180 + c)
//   this.slice.setAttribute('d', d)
//   var tspanSize = this.size / 3.5 / 3
//   this.text.innerHTML =
//     Math.floor(value) +
//     '<tspan font-size="' +
//     tspanSize +
//     '" dy="' +
//     -tspanSize * 1.2 +
//     '">%</tspan>'
// }

// //
// // Usage
// //

// // Obtiene todos los elementos con la clase 'chart'
// var containers = document.getElementsByClassName('chart')

// // Recorre cada contenedor y crea un dial para cada uno
// Array.from(containers).forEach(function (container) {
//   var dial = new Dial(container)
//   dial.animateStart()
// })

// /* ********** dial percentage ****** */

// class Dial {
//   constructor(container) {
//     this.container = container
//     this.size = this.container.dataset.size
//     this.strokeWidth = this.size / 8
//     this.radius = this.size / 2 - this.strokeWidth / 2
//     this.value = this.container.dataset.value
//     this.direction = this.container.dataset.arrow
//     this.colorFrom =
//       this.container.dataset.colorDialFrom || 'var(--third-color)'
//     this.colorTo = this.container.dataset.colorDialTo || 'var(--fourth-color)'

//     this.svg = null
//     this.defs = null
//     this.slice = null
//     this.overlay = null
//     this.text = null
//     this.arrow = null

//     this.create()
//   }

//   create() {
//     this.createSvg()
//     this.createDefs()
//     this.createSlice()
//     this.createOverlay()
//     this.createText()
//     this.createArrow()
//     this.container.appendChild(this.svg)
//   }

//   createSvg() {
//     const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
//     svg.setAttribute('width', `${this.size}px`)
//     svg.setAttribute('height', `${this.size}px`)
//     this.svg = svg
//   }

//   createDefs() {
//     const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')

//     // Gradient for the dial's progress
//     const linearGradient = document.createElementNS(
//       'http://www.w3.org/2000/svg',
//       'linearGradient',
//     )
//     linearGradient.setAttribute('id', 'gradient')
//     const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
//     stop1.setAttribute('stop-color', this.colorFrom)
//     stop1.setAttribute('offset', '0%')
//     linearGradient.appendChild(stop1)

//     const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
//     stop2.setAttribute('stop-color', this.colorTo)
//     stop2.setAttribute('offset', '100%')
//     linearGradient.appendChild(stop2)

//     // Background gradient
//     const linearGradientBackground = document.createElementNS(
//       'http://www.w3.org/2000/svg',
//       'linearGradient',
//     )
//     linearGradientBackground.setAttribute('id', 'gradient-background')
//     const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
//     stop3.setAttribute('stop-color', 'rgba(0, 0, 0, 0.6)')
//     stop3.setAttribute('offset', '0%')
//     linearGradientBackground.appendChild(stop3)

//     const stop4 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
//     stop4.setAttribute('stop-color', 'rgba(0, 0, 0, 0.1)')
//     stop4.setAttribute('offset', '100%')
//     linearGradientBackground.appendChild(stop4)

//     defs.appendChild(linearGradient)
//     defs.appendChild(linearGradientBackground)
//     this.svg.appendChild(defs)
//     this.defs = defs
//   }

//   createSlice() {
//     const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path')
//     slice.setAttribute('fill', 'none')
//     slice.setAttribute('stroke', 'url(#gradient)')
//     slice.setAttribute('stroke-width', this.strokeWidth)
//     slice.setAttribute(
//       'transform',
//       `translate(${this.strokeWidth / 2}, ${this.strokeWidth / 2})`,
//     )
//     slice.setAttribute('class', 'animate-draw')
//     this.svg.appendChild(slice)
//     this.slice = slice
//   }

//   createOverlay() {
//     const r = this.size - this.size / 2 - this.strokeWidth / 2
//     const circle = document.createElementNS(
//       'http://www.w3.org/2000/svg',
//       'circle',
//     )
//     circle.setAttribute('cx', this.size / 2)
//     circle.setAttribute('cy', this.size / 2)
//     circle.setAttribute('r', r)
//     circle.setAttribute('fill', 'url(#gradient-background)')
//     this.svg.appendChild(circle)
//     this.overlay = circle
//   }

//   createText() {
//     const fontSize = this.size / 3.5
//     const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
//     text.setAttribute('x', this.size / 2 + fontSize / 7.5)
//     text.setAttribute('y', this.size / 2 + fontSize / 4)
//     text.setAttribute('font-family', 'Century Gothic, Lato')
//     text.setAttribute('font-size', fontSize)
//     text.setAttribute('fill', 'var(--white-color)')
//     text.setAttribute('text-anchor', 'middle')

//     const tspanSize = fontSize / 3
//     text.innerHTML = `${0}<tspan font-size="${tspanSize}" dy="${
//       -tspanSize * 1.2
//     }">%</tspan>`

//     this.svg.appendChild(text)
//     this.text = text
//   }

//   createArrow() {
//     const arrowSize = this.size / 10
//     let arrowYOffset, m
//     if (this.direction === 'up') {
//       arrowYOffset = arrowSize / 2
//       m = -1
//     } else if (this.direction === 'down') {
//       arrowYOffset = 0
//       m = 1
//     }

//     const arrowPosX = this.size / 2 - arrowSize / 2
//     const arrowPosY = this.size - this.size / 3 + arrowYOffset
//     const arrowDOffset = m * (arrowSize / 1.5)

//     const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path')
//     arrow.setAttribute(
//       'd',
//       `M 0 0 ${arrowSize} 0 ${arrowSize / 2} ${arrowDOffset} 0 0 Z`,
//     )
//     arrow.setAttribute('fill', '#ff6f61')
//     arrow.setAttribute('opacity', '0.6')
//     arrow.setAttribute('transform', `translate(${arrowPosX}, ${arrowPosY})`)

//     this.svg.appendChild(arrow)
//     this.arrow = arrow
//   }

//   animateStart() {
//     let v = 0
//     const intervalOne = setInterval(() => {
//       const p = +(v / this.value).toFixed(2)
//       const a = p < 0.95 ? 2 - 2 * p : 0.05
//       v += a
//       // Stop
//       if (v >= +this.value) {
//         v = this.value
//         clearInterval(intervalOne)
//       }
//       this.setValue(v)
//     }, 10)
//   }

//   animateReset() {
//     this.setValue(0)
//   }

//   polarToCartesian(centerX, centerY, radius, angleInDegrees) {
//     const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
//     return {
//       x: centerX + radius * Math.cos(angleInRadians),
//       y: centerY + radius * Math.sin(angleInRadians),
//     }
//   }

//   describeArc(x, y, radius, startAngle, endAngle) {
//     const start = this.polarToCartesian(x, y, radius, endAngle)
//     const end = this.polarToCartesian(x, y, radius, startAngle)
//     const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
//     const d = [
//       'M',
//       start.x,
//       start.y,
//       'A',
//       radius,
//       radius,
//       0,
//       largeArcFlag,
//       0,
//       end.x,
//       end.y,
//     ].join(' ')
//     return d
//   }

//   setValue(value) {
//     let c = (value / 100) * 360
//     if (c === 360) c = 359.99
//     const xy = this.size / 2 - this.strokeWidth / 2
//     const d = this.describeArc(xy, xy, xy, 180, 180 + c)
//     this.slice.setAttribute('d', d)

//     const tspanSize = this.size / 3.5 / 3
//     this.text.innerHTML = `${Math.floor(
//       value,
//     )}<tspan font-size="${tspanSize}" dy="${-tspanSize * 1.2}">%</tspan>`
//   }
// }

// // Usage

// const containers = document.getElementsByClassName('chart')

// Array.from(containers).forEach((container) => {
//   const dial = new Dial(container)
//   dial.animateStart()
// })

// class Dial {
//   constructor(container) {
//     this.container = container
//     this.size = this.container.dataset.size
//     this.strokeWidth = this.size / 8
//     this.radius = this.size / 2 - this.strokeWidth / 2
//     this.value = this.container.dataset.value
//     this.direction = this.container.dataset.arrow
//     this.colorProgress =
//       this.container.dataset.colorProgress || 'var(--third-color)' // Color del progreso
//     this.colorBackground =
//       this.container.dataset.colorBackground || 'rgba(0, 0, 0, 0.6)' // Color del fondo
//     this.colorArrow = this.container.dataset.colorArrow || '#ff6f61' // Color de la flecha

//     this.svg = null
//     this.defs = null
//     this.slice = null
//     this.overlay = null
//     this.text = null
//     this.arrow = null

//     this.create()
//   }

//   create() {
//     this.createSvg()
//     this.createDefs()
//     this.createSlice()
//     this.createOverlay()
//     this.createText()
//     this.createArrow()
//     this.container.appendChild(this.svg)
//   }

//   createSvg() {
//     const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
//     svg.setAttribute('width', `${this.size}px`)
//     svg.setAttribute('height', `${this.size}px`)
//     this.svg = svg
//   }

//   createDefs() {
//     const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')

//     // Gradient for the dial's progress
//     const linearGradient = document.createElementNS(
//       'http://www.w3.org/2000/svg',
//       'linearGradient',
//     )
//     linearGradient.setAttribute('id', 'gradient')
//     const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
//     stop1.setAttribute('stop-color', this.colorProgress)
//     stop1.setAttribute('offset', '0%')
//     linearGradient.appendChild(stop1)

//     const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
//     stop2.setAttribute('stop-color', this.colorProgress)
//     stop2.setAttribute('offset', '100%')
//     linearGradient.appendChild(stop2)

//     // Background gradient
//     const linearGradientBackground = document.createElementNS(
//       'http://www.w3.org/2000/svg',
//       'linearGradient',
//     )
//     linearGradientBackground.setAttribute('id', 'gradient-background')
//     const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
//     stop3.setAttribute('stop-color', this.colorBackground)
//     stop3.setAttribute('offset', '0%')
//     linearGradientBackground.appendChild(stop3)

//     const stop4 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
//     stop4.setAttribute('stop-color', 'rgba(0, 0, 0, 0.1)')
//     stop4.setAttribute('offset', '100%')
//     linearGradientBackground.appendChild(stop4)

//     defs.appendChild(linearGradient)
//     defs.appendChild(linearGradientBackground)
//     this.svg.appendChild(defs)
//     this.defs = defs
//   }

//   createSlice() {
//     const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path')
//     slice.setAttribute('fill', 'none')
//     slice.setAttribute('stroke', 'url(#gradient)')
//     slice.setAttribute('stroke-width', this.strokeWidth)
//     slice.setAttribute(
//       'transform',
//       `translate(${this.strokeWidth / 2}, ${this.strokeWidth / 2})`,
//     )
//     slice.setAttribute('class', 'animate-draw')
//     this.svg.appendChild(slice)
//     this.slice = slice
//   }

//   createOverlay() {
//     const r = this.size - this.size / 2 - this.strokeWidth / 2
//     const circle = document.createElementNS(
//       'http://www.w3.org/2000/svg',
//       'circle',
//     )
//     circle.setAttribute('cx', this.size / 2)
//     circle.setAttribute('cy', this.size / 2)
//     circle.setAttribute('r', r)
//     circle.setAttribute('fill', 'url(#gradient-background)')
//     this.svg.appendChild(circle)
//     this.overlay = circle
//   }

//   createText() {
//     const fontSize = this.size / 3.5
//     const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
//     text.setAttribute('x', this.size / 2 + fontSize / 7.5)
//     text.setAttribute('y', this.size / 2 + fontSize / 4)
//     text.setAttribute('font-family', 'Century Gothic, Lato')
//     text.setAttribute('font-size', fontSize)
//     text.setAttribute('fill', 'var(--white-color)')
//     text.setAttribute('text-anchor', 'middle')

//     const tspanSize = fontSize / 3
//     text.innerHTML = `${0}<tspan font-size="${tspanSize}" dy="${
//       -tspanSize * 1.2
//     }">%</tspan>`

//     this.svg.appendChild(text)
//     this.text = text
//   }

//   createArrow() {
//     const arrowSize = this.size / 10
//     let arrowYOffset, m
//     if (this.direction === 'up') {
//       arrowYOffset = arrowSize / 2
//       m = -1
//     } else if (this.direction === 'down') {
//       arrowYOffset = 0
//       m = 1
//     }

//     const arrowPosX = this.size / 2 - arrowSize / 2
//     const arrowPosY = this.size - this.size / 3 + arrowYOffset
//     const arrowDOffset = m * (arrowSize / 1.5)

//     const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path')
//     arrow.setAttribute(
//       'd',
//       `M 0 0 ${arrowSize} 0 ${arrowSize / 2} ${arrowDOffset} 0 0 Z`,
//     )
//     arrow.setAttribute('fill', this.colorArrow) // Use the dynamic color for the arrow
//     arrow.setAttribute('opacity', '0.6')
//     arrow.setAttribute('transform', `translate(${arrowPosX}, ${arrowPosY})`)

//     this.svg.appendChild(arrow)
//     this.arrow = arrow
//   }

//   animateStart() {
//     let v = 0
//     const intervalOne = setInterval(() => {
//       const p = +(v / this.value).toFixed(2)
//       const a = p < 0.95 ? 2 - 2 * p : 0.05
//       v += a
//       // Stop
//       if (v >= +this.value) {
//         v = this.value
//         clearInterval(intervalOne)
//       }
//       this.setValue(v)
//     }, 10)
//   }

//   animateReset() {
//     this.setValue(0)
//   }

//   polarToCartesian(centerX, centerY, radius, angleInDegrees) {
//     const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
//     return {
//       x: centerX + radius * Math.cos(angleInRadians),
//       y: centerY + radius * Math.sin(angleInRadians),
//     }
//   }

//   describeArc(x, y, radius, startAngle, endAngle) {
//     const start = this.polarToCartesian(x, y, radius, endAngle)
//     const end = this.polarToCartesian(x, y, radius, startAngle)
//     const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
//     const d = [
//       'M',
//       start.x,
//       start.y,
//       'A',
//       radius,
//       radius,
//       0,
//       largeArcFlag,
//       0,
//       end.x,
//       end.y,
//     ].join(' ')
//     return d
//   }

//   setValue(value) {
//     let c = (value / 100) * 360
//     if (c === 360) c = 359.99
//     const xy = this.size / 2 - this.strokeWidth / 2
//     const d = this.describeArc(xy, xy, xy, 180, 180 + c)
//     this.slice.setAttribute('d', d)

//     const tspanSize = this.size / 3.5 / 3
//     this.text.innerHTML = `${Math.floor(
//       value,
//     )}<tspan font-size="${tspanSize}" dy="${-tspanSize * 1.2}">%</tspan>`
//   }
// }

// // Usage

// const containers = document.getElementsByClassName('chart')

// Array.from(containers).forEach((container) => {
//   const dial = new Dial(container)
//   dial.animateStart()
// })

class Dial {
  constructor(container) {
    this.container = container
    this.size = this.container.dataset.size
    this.strokeWidth = this.size / 8
    this.radius = this.size / 2 - this.strokeWidth / 2
    this.value = this.container.dataset.value
    this.direction = this.container.dataset.arrow
    this.colorFrom =
      this.container.dataset.colorDialFrom || 'var(--third-color)'
    this.colorTo = this.container.dataset.colorDialTo || 'var(--fourth-color)'

    // Generar IDs únicos para los gradientes
    this.gradId = 'gradient-' + Math.random().toString(36).substring(2, 15)
    this.bgGradId =
      'gradient-background-' + Math.random().toString(36).substring(2, 15)

    this.svg = null
    this.defs = null
    this.slice = null
    this.overlay = null
    this.text = null
    this.arrow = null

    this.create()
  }

  create() {
    this.createSvg()
    this.createDefs()
    this.createSlice()
    this.createOverlay()
    this.createText()
    this.createArrow()
    this.container.appendChild(this.svg)
  }

  createSvg() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', `${this.size}px`)
    svg.setAttribute('height', `${this.size}px`)
    this.svg = svg
  }

  createDefs() {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')

    // Gradient for the dial's progress (colores independientes para cada dial)
    const linearGradient = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'linearGradient',
    )
    linearGradient.setAttribute('id', this.gradId)
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    stop1.setAttribute('stop-color', this.colorFrom)
    stop1.setAttribute('offset', '0%')
    linearGradient.appendChild(stop1)
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    stop2.setAttribute('stop-color', this.colorTo)
    stop2.setAttribute('offset', '100%')
    linearGradient.appendChild(stop2)

    // Gradient for the dial's background (se podría usar también colores dinámicos si se requiere)
    const linearGradientBackground = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'linearGradient',
    )
    linearGradientBackground.setAttribute('id', this.bgGradId)
    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    stop3.setAttribute('stop-color', 'rgba(0, 0, 0, 0.6)')
    stop3.setAttribute('offset', '0%')
    linearGradientBackground.appendChild(stop3)
    const stop4 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    stop4.setAttribute('stop-color', 'rgba(0, 0, 0, 0.1)')
    stop4.setAttribute('offset', '100%')
    linearGradientBackground.appendChild(stop4)

    defs.appendChild(linearGradient)
    defs.appendChild(linearGradientBackground)
    this.svg.appendChild(defs)
    this.defs = defs
  }

  createSlice() {
    const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    slice.setAttribute('fill', 'none')
    // Usamos el gradiente único para este dial
    slice.setAttribute('stroke', `url(#${this.gradId})`)
    slice.setAttribute('stroke-width', this.strokeWidth)
    slice.setAttribute(
      'transform',
      `translate(${this.strokeWidth / 2}, ${this.strokeWidth / 2})`,
    )
    slice.setAttribute('class', 'animate-draw')
    this.svg.appendChild(slice)
    this.slice = slice
  }

  createOverlay() {
    const r = this.size - this.size / 2 - this.strokeWidth / 2
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle',
    )
    circle.setAttribute('cx', this.size / 2)
    circle.setAttribute('cy', this.size / 2)
    circle.setAttribute('r', r)
    // Usamos el gradiente único de fondo para este dial
    circle.setAttribute('fill', `url(#${this.bgGradId})`)
    this.svg.appendChild(circle)
    this.overlay = circle
  }

  createText() {
    const fontSize = this.size / 3.5
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', this.size / 2 + fontSize / 7.5)
    text.setAttribute('y', this.size / 2 + fontSize / 4)
    text.setAttribute('font-family', 'Century Gothic, Lato')
    text.setAttribute('font-size', fontSize)
    text.setAttribute('fill', 'var(--white-color)')
    text.setAttribute('text-anchor', 'middle')
    const tspanSize = fontSize / 3
    text.innerHTML = `${0}<tspan font-size="${tspanSize}" dy="${
      -tspanSize * 1.2
    }">%</tspan>`
    this.svg.appendChild(text)
    this.text = text
  }

  createArrow() {
    const arrowSize = this.size / 10
    let arrowYOffset, m
    if (this.direction === 'up') {
      arrowYOffset = arrowSize / 2
      m = -1
    } else if (this.direction === 'down') {
      arrowYOffset = 0
      m = 1
    }
    const arrowPosX = this.size / 2 - arrowSize / 2
    const arrowPosY = this.size - this.size / 3 + arrowYOffset
    const arrowDOffset = m * (arrowSize / 1.5)
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    arrow.setAttribute(
      'd',
      `M 0 0 ${arrowSize} 0 ${arrowSize / 2} ${arrowDOffset} 0 0 Z`,
    )
    // Cada dial tendrá su propio color definido en data-colorDialFrom / data-colorDialTo (o podrías definir otro atributo)
    arrow.setAttribute('fill', this.colorFrom)
    arrow.setAttribute('opacity', '0.6')
    arrow.setAttribute('transform', `translate(${arrowPosX}, ${arrowPosY})`)
    this.svg.appendChild(arrow)
    this.arrow = arrow
  }

  animateStart() {
    let v = 0
    const intervalOne = setInterval(() => {
      const p = +(v / this.value).toFixed(2)
      const a = p < 0.95 ? 2 - 2 * p : 0.05
      v += a
      if (v >= +this.value) {
        v = this.value
        clearInterval(intervalOne)
      }
      this.setValue(v)
    }, 10)
  }

  animateReset() {
    this.setValue(0)
  }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  describeArc(x, y, radius, startAngle, endAngle) {
    const start = this.polarToCartesian(x, y, radius, endAngle)
    const end = this.polarToCartesian(x, y, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
    const d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ')
    return d
  }

  setValue(value) {
    let c = (value / 100) * 360
    if (c === 360) c = 359.99
    const xy = this.size / 2 - this.strokeWidth / 2
    const d = this.describeArc(xy, xy, xy, 180, 180 + c)
    this.slice.setAttribute('d', d)
    const tspanSize = this.size / 3.5 / 3
    this.text.innerHTML = `${Math.floor(
      value,
    )}<tspan font-size="${tspanSize}" dy="${-tspanSize * 1.2}">%</tspan>`
  }
}

// Uso

const containers = document.getElementsByClassName('chart')
Array.from(containers).forEach((container) => {
  const dial = new Dial(container)
  dial.animateStart()
})

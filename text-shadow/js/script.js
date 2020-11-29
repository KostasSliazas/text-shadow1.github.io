/* jshint esversion: 6 */
/* jshint expr: true */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    const startp1 = document.getElementById('startp1')
    const startp2 = document.getElementById('startp2')
    const startp3 = document.getElementById('startp3')
    const howfar = document.getElementById('howfar')
    const hexcol = document.getElementById('hexcol')
    const texts = document.getElementById('txtstring')
    const inputs = document.getElementsByTagName('input')
    const randcheck = document.getElementById('randomchek')

    function string () {
      let string = ''
      for (let i = 0; i < howfar.value; i++) {
        const randomColor = '#000000'.replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16) })
        const color = randcheck.checked ? randomColor : hexcol.value
        string += `${Number(startp1.value) === 0 ? 0 : +startp1.value - i}px ${Number(startp2.value) === 0 ? 0 : +startp2.value + i}px ${Number(startp3.value) === 0 ? 0 : +startp3.value + i}px ${color}`
        if (i + 1 < howfar.value) string += ', '
      }
      return string
    }

    function appe () {
      texts.innerText = 'text-shadow:' + string() + ';'
      texts.style.textShadow = `${string()}`
    }

    function Arrows (number) {
      this.number = number
    }
    Arrows.prototype.up = function up (y) {
      return (this.number = y + 1)
    }
    Arrows.prototype.dn = function dn (y) {
      return (this.number = y - 1)
    }
    const lg = new Arrows(0)

    function updateArrows (e) {
      if (e.target.classList.contains('darrow') || e.target.classList.contains('uarrow')) {
        const g = Number(e.target.parentElement.getElementsByTagName('input')[0].value) || 0
        e.target.className === 'uarrow' && (e.target.parentElement.getElementsByTagName('input')[0].value = lg.up(g))
        e.target.className === 'darrow' && (e.target.parentElement.getElementsByTagName('input')[0].value = lg.dn(g))
      }
      appe()
    }
    document.addEventListener('click', updateArrows)
    const le = [...inputs]
    le.forEach(e => e.addEventListener('input', appe))

    texts.addEventListener('click', function (e) {
      e.preventDefault()
      texts.select()
      document.execCommand('copy')
    })
    appe()
  })
})()

import store from '@/store'
import { $, on, off, addClass } from '@/utils/dom'

// 创建高分辨率画布
const createCanvas = (el, width, height, ratio) => {
  const canvas = el ?? document.createElement('canvas')
  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  }
  return canvas
}

// 计算指示线位置
const getLinePos = (wp, el, options, cx, cy) => {
  const { height, scale, offset } = options
  let dist
  if (options.direction === 'TB') {
    dist = cx - (el.parentElement?.offsetLeft || 0) + wp.scrollLeft
  } else {
    dist = cy - (el.parentElement?.offsetTop || 0) + wp.scrollTop
  }
  dist = dist - height + options.indicatorLineWidth
  const coor = Math.floor((dist - offset) / scale)
  return { coor, dist }
}

// 通过坐标计算指示线位置
const getPosByCoor = (coor, options) => {
  const { scale, offset } = options
  return { coor, dist: parseFloat((coor * scale + offset).toFixed(3)) }
}

class GuideLine {
  wp
  el
  options
  guideLine
  coor

  constructor(wp, el, options, ev, coor) {
    this.wp = wp
    this.el = el
    this.options = options
    this.constructGuide(ev, coor)
  }

  // 创建参考线
  constructGuide(ev, coor) {
    const { el } = this
    const guideLine = document.createElement('div')
    guideLine.title = '双击删除参考线'
    addClass(guideLine, 'ruler-line')
    this.guideLine = guideLine

    const { coor: oldCoor } = this
    this.setLine(ev, coor)

    if (ev) {
      this.coorChange('add', this.coor, oldCoor)
    }

    let guideWp = el.querySelector('.lines-wrapper')
    if (!guideWp) {
      guideWp = document.createElement('div')
      addClass(guideWp, 'lines-wrapper')
      el.appendChild(guideWp)
    }

    guideWp.appendChild(guideLine)

    on(guideLine, 'mousedown', this.moving.bind(this))
    on(guideLine, 'dblclick', this.dblclick.bind(this))
  }
  moving(ev) {
    const { options } = this
    if (ev.clientX < 220 || ev.clientY < 70) {
      return
    }
    ev.preventDefault()
    ev.stopPropagation()

    const { coor: oldCoor } = this
    const move = (e) => {
      if (options.direction === 'TB') {
        document.body.style.cursor = 'col-resize'
      } else {
        document.body.style.cursor = 'row-resize'
      }
      this.setLine(e)
    }

    const up = () => {
      document.body.style.cursor = ''
      off(document, 'mousemove', move)
      off(document, 'mouseup', up)

      const { coor } = this

      const min = 0 - store.state.canvasConfig.padding
      if (coor < min) {
        this.destroy()
        this.coorChange('delete', oldCoor, oldCoor)
      } else {
        this.coorChange('update', coor, oldCoor)
      }
    }

    on(document, 'mousemove', move)
    on(document, 'mouseup', up)
  }
  setLine(e, coor = 0) {
    const { wp, el, options, guideLine } = this
    const pos = e ? getLinePos(wp, el, options, e.clientX, e.clientY) : getPosByCoor(coor, options)
    if (options.direction === 'TB') {
      guideLine.style.left = `${pos.dist}px`
    } else {
      guideLine.style.top = `${pos.dist}px`
    }
    guideLine.innerHTML = `
      <div class="line-action">
        <span class="line-value">${pos.coor}</span>
      </div>`
    this.coor = pos.coor
  }
  dblclick(e) {
    e.preventDefault()
    e.stopPropagation()
    this.destroy()
  }
  coorChange(action, nCoor, oCoor) {
    const { options } = this
    options.coorChange && options.coorChange(action, nCoor, oCoor)
  }
  show() {
    this.guideLine.style.display = 'block'
  }
  hide() {
    this.guideLine.style.display = 'none'
  }
  destroy() {
    const { guideLine, coor } = this
    this.coorChange('delete', coor, coor)
    off(guideLine, 'mousedown', this.moving.bind(this))
    off(guideLine, 'dblclick', this.dblclick.bind(this))
    guideLine.remove()
  }
}

export class RulerBuilder {
  wp
  el
  canvas
  ctx

  ruler = {
    width: 0,
    height: 0
  }

  indicator
  indicatorValue

  guideLines = []

  options = {
    direction: 'TB',
    width: 1000,
    height: 20,
    bgColor: '#0e1013',
    fontFamily: 'arial',
    fontSize: '10px',
    fontColor: '#90a0ae',
    strokeStyle: 'rgba(161, 174, 179, 0.8)',
    lineWidth: 0.5,
    indicatorLineWidth: 1,
    scale: 1,
    offset: 44,
    ratio: 2
  }

  constructor(container, options) {
    this.wp = $('#screenWrapper')
    this.el = container
    this.options = { ...this.options, ...options }

    this.constructRuler()
  }

  setSize(w, h, s) {
    const { el, options } = this
    options.width = w
    options.height = h
    options.scale = s
    const { direction, width, height, ratio } = options

    const deltaW = direction === 'TB' ? Math.max(el.offsetWidth, width) : Math.max(el.offsetHeight, width)
    const deltaH = height

    this.ruler.width = deltaW
    this.ruler.height = deltaH

    createCanvas(this.canvas, deltaW, deltaH, ratio)
    this.drawRuler()
    this.guideLines.forEach(g => g.setLine(null, g.coor))
  }

  constructRuler() {
    const { el, options } = this
    const { direction, width, height, ratio } = options
    const deltaW = direction === 'TB' ? Math.max(el.offsetWidth, width) : Math.max(el.offsetHeight, width)
    const deltaH = height
    this.ruler.width = deltaW
    this.ruler.height = deltaH

    const canvas = createCanvas(null, deltaW, deltaH, ratio)
    addClass(canvas, 'canvas-ruler')
    el.appendChild(canvas)

    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    this.drawRuler()

    on(canvas, 'mouseenter', this.constructIndicator.bind(this))
    on(canvas, 'mousedown', this.createGuideLine.bind(this))
  }

  // 画标尺
  drawRuler() {
    const { ctx, options, ruler } = this
    const { width, height } = ruler

    ctx.beginPath()
    ctx.fillStyle = options.bgColor
    ctx.fillRect(0, 0, width, height)
    ctx.closePath()

    ctx.beginPath()
    ctx.font = `${options.fontSize} ${options.fontFamily}`
    ctx.textAlign = 'left'
    ctx.fillStyle = options.fontColor
    ctx.strokeStyle = options.strokeStyle
    ctx.lineWidth = options.lineWidth
    this.drawPoints()
    ctx.stroke()
  }

  // 画刻度
  drawPoints() {
    const { ctx, options, ruler } = this
    const { width, height } = ruler
    const { offset, scale } = options

    const maxTickLen = 0
    const medTickLen = height / 1.5
    const minTickLen = height / 1.2

    for (let pos = 0; pos <= width; pos += 1) {
      const delta = pos - offset
      if (delta < 0) continue

      let label = -1
      let tickLen = -1
      if (delta % 50 === 0) {
        label = Math.floor(delta / scale)
        tickLen = maxTickLen
      } else if (delta % 25 === 0) {
        tickLen = medTickLen
      } else if (delta % 5 === 0) {
        tickLen = minTickLen
      }

      if (tickLen >= 0) {
        ctx.moveTo(pos + 0.5, height + 0.5)
        ctx.lineTo(pos + 0.5, tickLen)
        if (label > -1) {
          ctx.fillText(`${label}`, pos + 2.5, height / 1.5)
        }
      }
    }
  }

  // 画指示线
  constructIndicator() {
    const { wp, el, options, canvas } = this
    const indicator = document.createElement('div')
    const indicatorValue = document.createElement('span')
    addClass(indicator, 'ruler-indicator')
    addClass(indicatorValue, 'indicator-value')
    indicator.appendChild(indicatorValue)

    this.indicator = indicator
    this.indicatorValue = indicatorValue
    el.appendChild(indicator)

    const move = (e) => {
      const pos = getLinePos(wp, el, options, e.clientX, e.clientY)
      indicator.style.left = `${pos.dist}px`
      indicatorValue.textContent = `${pos.coor}`
    }

    const out = () => {
      off(canvas, 'mousemove', move)
      off(canvas, 'mouseout', out)
      indicator.remove()
    }

    on(canvas, 'mousemove', move)
    on(canvas, 'mouseout', out)
  }

  // 创建参考线
  createGuideLine(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    const { wp, el, options } = this
    this.guideLines.push(new GuideLine(wp, el, options, ev))
  }

  // 切换参考线
  toggleGuide(visible) {
    if (visible) {
      this.guideLines.forEach(g => g.show())
    } else {
      this.guideLines.forEach(g => g.hide())
    }
  }
}


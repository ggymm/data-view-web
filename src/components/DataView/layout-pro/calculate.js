// 角度转弧度
// Math.PI = 180 度
function angleToRadian(angle) {
  return angle * Math.PI / 180
}

/**
 * 计算根据圆心旋转后的点的坐标
 * @param   {Object}  point  旋转前的点坐标
 * @param   {Object}  center 旋转中心
 * @param   {Number}  rotate 旋转的角度
 * @return  {Object}         旋转后的坐标
 * https://www.zhihu.com/question/67425734/answer/252724399 旋转矩阵公式
 */
export function calculateRotatedPointCoordinate(point, center, rotate) {
  /**
   * 旋转公式：
   *  点a(x, y)
   *  旋转中心c(x, y)
   *  旋转后点n(x, y)
   *  旋转角度θ                tan ??
   * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
   * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
   */

  return {
    x: (point.x - center.x) * Math.cos(angleToRadian(rotate)) - (point.y - center.y) * Math.sin(angleToRadian(rotate)) + center.x,
    y: (point.x - center.x) * Math.sin(angleToRadian(rotate)) + (point.y - center.y) * Math.cos(angleToRadian(rotate)) + center.y
  }
}

// 求两点之间的中点坐标
export function getCenterPoint(p1, p2) {
  return {
    x: p1.x + ((p2.x - p1.x) / 2),
    y: p1.y + ((p2.y - p1.y) / 2)
  }
}

export function sin(rotate) {
  return Math.abs(Math.sin(angleToRadian(rotate)))
}

export function cos(rotate) {
  return Math.abs(Math.cos(angleToRadian(rotate)))
}

export function mod360(deg) {
  return (deg + 360) % 360
}

export function changeStyleWithScale(value, scale) {
  return value * parseInt(scale) / 100
}

const initialDirectionAngle = [
  { direction: 'lt', angle: 0 },
  { direction: 't', angle: 45 },
  { direction: 'rt', angle: 90 },
  { direction: 'r', angle: 135 },
  { direction: 'rb', angle: 180 },
  { direction: 'b', angle: 225 },
  { direction: 'lb', angle: 270 },
  { direction: 'l', angle: 315 }
]

const angleToCursor = [
  { start: 338, end: 23, cursor: 'nwse-resize' },
  { start: 23, end: 68, cursor: 'ns-resize' },
  { start: 68, end: 113, cursor: 'nesw-resize' },
  { start: 113, end: 158, cursor: 'ew-resize' },
  { start: 158, end: 203, cursor: 'nwse-resize' },
  { start: 203, end: 248, cursor: 'ns-resize' },
  { start: 248, end: 293, cursor: 'nesw-resize' },
  { start: 293, end: 338, cursor: 'ew-resize' }
]

export function getCursors(rotate) {
  rotate = mod360(rotate)
  const result = {}
  let lastMatchIndex = -1
  initialDirectionAngle.forEach(point => {
    const angle = (point.angle + rotate) % 360
    for (; ;) {
      lastMatchIndex = (lastMatchIndex + 1) % angleToCursor.length
      const angleLimit = angleToCursor[lastMatchIndex]
      if (angle < 23 || angle >= 338) {
        result[point.direction] = 'nwse-resize'
        break
      }
      if (angleLimit.start <= angle && angle < angleLimit.end) {
        result[point.direction] = angleLimit.cursor
        break
      }
    }
  })
  return result
}

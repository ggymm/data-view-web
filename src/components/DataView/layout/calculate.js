/**
 * 角度转弧度
 * Math.PI = 180 度
 * @param angle
 * @returns {number}
 */
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

/**
 * 计算缩放后位置大小（无旋转的情况）
 * @param direction
 * @param currPosition
 * @param startPoint
 * @param endPoint
 */
export function calcResizeSimple(direction, currPosition, startPoint, endPoint) {
  const disX = endPoint.x - startPoint.x
  const disY = endPoint.y - startPoint.y
  const hasT = /t/.test(direction)
  const hasB = /b/.test(direction)
  const hasL = /l/.test(direction)
  const hasR = /r/.test(direction)

  const newHeight = Math.round(currPosition.height + (hasT ? -disY : hasB ? disY : 0) / currPosition.scale)
  const newWidth = Math.round(currPosition.width + (hasL ? -disX : hasR ? disX : 0) / currPosition.scale)

  const position = {}
  position.x = Math.round(currPosition.x + (hasL ? disX : 0) / currPosition.scale)
  position.y = Math.round(currPosition.y + (hasT ? disY : 0) / currPosition.scale)
  position.height = newHeight > 0 ? newHeight : 0
  position.width = newWidth > 0 ? newWidth : 0
  return position
}

/**
 * 计算缩放后位置大小（有旋转的情况）
 * @param direction 拖拽方向
 * @param currPosition 当前坐标和大小
 * @param startPoint 拖拽起始点坐标
 * @param symmetricPoint 对称点坐标
 * @param endPoint 拖拽终止点坐标
 * @returns {{}|any}
 */
export function calcResizeWithRotate(direction, currPosition, startPoint, symmetricPoint, endPoint) {
  const position = {}
  // 拖拽角上的点
  if (direction.length === 2) {
    const centerPoint = getCenterPoint(endPoint, symmetricPoint)
    // 对角点坐标
    const diagonalPoint = calculateRotatedPointCoordinate(symmetricPoint, centerPoint, -currPosition.rotate)
    // 当前点坐标
    const currentPoint = calculateRotatedPointCoordinate(endPoint, centerPoint, -currPosition.rotate)
    // 判断: 左或者右
    if (direction[0] === 'l') {
      position.x = Math.round(currentPoint.x / currPosition.scale)
      position.width = Math.round((diagonalPoint.x - currentPoint.x) / currPosition.scale)
    } else if (direction[0] === 'r') {
      position.x = Math.round(diagonalPoint.x / currPosition.scale)
      position.width = Math.round((currentPoint.x - diagonalPoint.x) / currPosition.scale)
    }
    // 判断: 上或者下
    if (direction[1] === 't') {
      position.y = Math.round(currentPoint.y / currPosition.scale)
      position.height = Math.round((diagonalPoint.y - currentPoint.y) / currPosition.scale)
    } else if (direction[1] === 'b') {
      position.y = Math.round(diagonalPoint.y / currPosition.scale)
      position.height = Math.round((currentPoint.y - diagonalPoint.y) / currPosition.scale)
    }
    return position
  }

  // 拖拽边上的点
  // 当前点坐标
  const currentPoint = calculateRotatedPointCoordinate(endPoint, startPoint, -currPosition.rotate)
  // 拖拽上下两边
  if (direction === 't' || direction === 'b') {
    // 对角点坐标
    const diagonalPoint = calculateRotatedPointCoordinate({ x: startPoint.x, y: currentPoint.y }, startPoint, currPosition.rotate)
    const height = Math.sqrt((diagonalPoint.x - symmetricPoint.x) ** 2 + (diagonalPoint.y - symmetricPoint.y) ** 2)
    if (height > 0) {
      const centerPoint = {
        x: diagonalPoint.x - (diagonalPoint.x - symmetricPoint.x) / 2,
        y: diagonalPoint.y + (symmetricPoint.y - diagonalPoint.y) / 2
      }
      position.width = currPosition.width
      position.height = Math.round(height / currPosition.scale)
      position.x = Math.round(centerPoint.x / currPosition.scale - currPosition.width / 2)
      position.y = Math.round((centerPoint.y - height / 2) / currPosition.scale)
    }
  }

  // 拖拽左右两边
  if (direction === 'l' || direction === 'r') {
    // 对角点坐标
    const diagonalPoint = calculateRotatedPointCoordinate({ x: currentPoint.x, y: startPoint.y }, startPoint, currPosition.rotate)
    const width = Math.sqrt((diagonalPoint.x - symmetricPoint.x) ** 2 + (diagonalPoint.y - symmetricPoint.y) ** 2)
    if (width > 0) {
      const centerPoint = {
        x: diagonalPoint.x - (diagonalPoint.x - symmetricPoint.x) / 2,
        y: diagonalPoint.y + (symmetricPoint.y - diagonalPoint.y) / 2
      }
      position.width = Math.round(width / currPosition.scale)
      position.height = currPosition.height
      position.x = Math.round((centerPoint.x - width / 2) / currPosition.scale)
      position.y = Math.round(centerPoint.y / currPosition.scale - currPosition.height / 2)
    }
  }
  return position
}

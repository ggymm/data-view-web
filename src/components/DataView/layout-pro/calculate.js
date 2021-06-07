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

// noinspection JSUnusedGlobalSymbols
export function getItemRotatedStyle(position) {
  position = { ...position }
  if (position.rotate !== 0) {
    const newWidth = position.width * cos(position.rotate) + position.height * sin(position.rotate)
    const diffX = (position.width - newWidth) / 2 // 旋转后范围变小是正值，变大是负值
    position.left += diffX
    position.right = position.left + newWidth

    const newHeight = position.height * cos(position.rotate) + position.width * sin(position.rotate)
    const diffY = (newHeight - position.height) / 2 // 始终是正
    position.top -= diffY
    position.bottom = position.top + newHeight

    position.width = newWidth
    position.height = newHeight
  } else {
    position.bottom = position.top + position.height
    position.right = position.left + position.width
  }
  return position
}

/**
 * 计算缩放后位置大小
 * @param direction 拖拽方向
 * @param style 当前位置和大小
 * @param startPoint 拖拽起始点位置
 * @param symmetricPoint 对称点坐标
 * @param endPoint 当前拖拽位置
 * @returns {{}|any}
 */
export function calcResizeInfo(direction, style, startPoint, symmetricPoint, endPoint) {
  // 拖拽角上的点
  if (direction.length === 2) {
    const newCenter = getCenterPoint(endPoint, symmetricPoint)
    const thatPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenter, -style.rotate)
    const thisPoint = calculateRotatedPointCoordinate(endPoint, newCenter, -style.rotate)
    const newStyle = {}
    // 判断: 左或者右
    if (direction[0] === 'l') {
      newStyle.x = Math.round(thisPoint.x / style.scale)
      newStyle.width = Math.round((thatPoint.x - thisPoint.x) / style.scale)
    } else if (direction[0] === 'r') {
      newStyle.x = Math.round(thatPoint.x / style.scale)
      newStyle.width = Math.round((thisPoint.x - thatPoint.x) / style.scale)
    }
    // 判断: 上或者下
    if (direction[1] === 't') {
      newStyle.y = Math.round(thisPoint.y / style.scale)
      newStyle.height = Math.round((thatPoint.y - thisPoint.y) / style.scale)
    } else if (direction[1] === 'b') {
      newStyle.y = Math.round(thatPoint.y / style.scale)
      newStyle.height = Math.round((thisPoint.y - thatPoint.y) / style.scale)
    }
    return newStyle
  }

  // 拖拽边上的点
  if (direction.length === 1) {
    const newStyle = JSON.parse(JSON.stringify(style))
    const thisPoint = calculateRotatedPointCoordinate(endPoint, startPoint, -style.rotate)

    // 拖拽上下两边
    if (direction === 't' || direction === 'b') {
      const thatPoint = calculateRotatedPointCoordinate({ x: startPoint.x, y: thisPoint.y }, startPoint, style.rotate)
      const height = Math.sqrt((thatPoint.x - symmetricPoint.x) ** 2 + (thatPoint.y - symmetricPoint.y) ** 2)
      if (height > 0) {
        const center = { x: thatPoint.x - (thatPoint.x - symmetricPoint.x) / 2, y: thatPoint.y + (symmetricPoint.y - thatPoint.y) / 2 }
        newStyle.width = Math.round(style.width / style.scale)
        newStyle.height = Math.round(height / style.scale)
        newStyle.x = Math.round((center.x - (style.width / 2)) / style.scale)
        newStyle.y = Math.round((center.y - (height / 2)) / style.scale)
      }
    }

    // 拖拽左右两边
    if (direction === 'l' || direction === 'r') {
      const thatPoint = calculateRotatedPointCoordinate({ x: thisPoint.x, y: startPoint.y }, startPoint, style.rotate)
      const width = Math.sqrt((thatPoint.x - symmetricPoint.x) ** 2 + (thatPoint.y - symmetricPoint.y) ** 2)
      if (width > 0) {
        const center = { x: thatPoint.x - (thatPoint.x - symmetricPoint.x) / 2, y: thatPoint.y + (symmetricPoint.y - thatPoint.y) / 2 }
        newStyle.width = Math.round(width / style.scale)
        newStyle.height = Math.round(style.height / style.scale)
        newStyle.x = Math.round((center.x - (width / 2)) / style.scale)
        newStyle.y = Math.round((center.y - (style.height / 2)) / style.scale)
      }
    }
    return newStyle
  }
}

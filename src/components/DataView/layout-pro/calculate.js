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

export function calcResizeInfo(direction, position, currentPosition, proportion, resizeInfo) {
  // 拖拽角上的点
  if (direction.length === 2) {
    const { symmetricPoint } = resizeInfo
    const newCenter = getCenterPoint(currentPosition, symmetricPoint)
    const thatPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenter, -position.rotate)
    const thisPoint = calculateRotatedPointCoordinate(currentPosition, newCenter, -position.rotate)
    const newPosition = {}
    // 判断: 左或者右
    if (direction[0] === 'l') {
      newPosition.x = Math.round(thisPoint.x / position.scale)
      newPosition.width = Math.round((thatPoint.x - thisPoint.x) / position.scale)
    } else if (direction[0] === 'r') {
      newPosition.x = Math.round(thatPoint.x / position.scale)
      newPosition.width = Math.round((thisPoint.x - thatPoint.x) / position.scale)
    }
    // 判断: 上或者下
    if (direction[1] === 't') {
      newPosition.y = Math.round(thisPoint.y / position.scale)
      newPosition.height = Math.round((thatPoint.y - thisPoint.y) / position.scale)
    } else if (direction[1] === 'b') {
      newPosition.y = Math.round(thatPoint.y / position.scale)
      newPosition.height = Math.round((thisPoint.y - thatPoint.y) / position.scale)
    }
    return newPosition
  }

  // 拖拽边上的点
  if (direction.length === 1) {
    const newPosition = JSON.parse(JSON.stringify(position))
    const { symmetricPoint, currentPoint } = resizeInfo
    const _this = calculateRotatedPointCoordinate(currentPosition, currentPoint, -position.rotate)

    // 拖拽上下两边
    if (direction === 't' || direction === 'b') {
      const _that = calculateRotatedPointCoordinate({ x: currentPoint.x, y: _this.y }, currentPoint, position.rotate)
      const height = Math.sqrt((_that.x - symmetricPoint.x) ** 2 + (_that.y - symmetricPoint.y) ** 2)
      if (height > 0) {
        const center = { x: _that.x - (_that.x - symmetricPoint.x) / 2, y: _that.y + (symmetricPoint.y - _that.y) / 2 }
        newPosition.width = Math.round(position.width / position.scale)
        newPosition.height = Math.round(height / position.scale)
        newPosition.x = Math.round((center.x - (position.width / 2)) / position.scale)
        newPosition.y = Math.round((center.y - (height / 2)) / position.scale)
      }
    }

    // 拖拽左右两边
    if (direction === 'l' || direction === 'r') {
      const _that = calculateRotatedPointCoordinate({ x: _this.x, y: currentPoint.y }, currentPoint, position.rotate)
      const width = Math.sqrt((_that.x - symmetricPoint.x) ** 2 + (_that.y - symmetricPoint.y) ** 2)
      if (width > 0) {
        const center = { x: _that.x - (_that.x - symmetricPoint.x) / 2, y: _that.y + (symmetricPoint.y - _that.y) / 2 }
        newPosition.width = Math.round(width / position.scale)
        newPosition.height = Math.round(position.height / position.scale)
        newPosition.x = Math.round((center.x - (width / 2)) / position.scale)
        newPosition.y = Math.round((center.y - (position.height / 2)) / position.scale)
      }
    }
    return newPosition
  }
}

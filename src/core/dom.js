export const on = function(element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}

export const off = function(element, event, handler) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false)
  }
}

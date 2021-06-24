/**
 * 数字格式化
 * @param number 数字
 * @param decimal 小数位数
 * @param dec_sep 小数分隔符
 * @param thousands_sep 千分位分隔符
 * @returns {string}
 */
export function formatNumber(number, decimal, dec_sep, thousands_sep) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  // 数字
  const n = !isFinite(+number) ? 0 : +number
  // 保留小数位数
  const p = !isFinite(+decimal) ? 0 : Math.abs(decimal)

  // 千分位分隔符
  const t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep
  // 小数分隔符
  const d = (typeof dec_sep === 'undefined') ? '.' : dec_sep

  // 执行保留小数
  const toFixedFix = function(n, p) {
    return n.toString().replace(new RegExp(`^(.*\\..{${p}}).*$`), '$1')
  }
  const s = (p ? toFixedFix(n, p) : '' + Math.round(n)).split('.')

  // 执行千分位分割
  const re = /(-?\d+)(\d{3})/
  if (t) {
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + t + '$2')
    }
  }
  if ((s[1] || '').length < p) {
    s[1] = s[1] || ''
    s[1] += new Array(p - s[1].length + 1).join('0')
  }
  return s.join(d)
}


const digitsRE = /(\d{3}(?=\d))/g

export function currency (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringifyied = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringifyied.slice(0, -1 - decimals)
    : stringifyied
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringifyied.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + value + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}

import numeral from 'numeral'

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

export function getUuid() {
  return s4() + s4() + s4() + s4() + s4()
}

export function toDatetimeString(timestamp) {
  const dt = new Date(timestamp)
  return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString()
}

export function toEditDatetimeString(timestamp) {
  const dt = new Date(timestamp)
  return numeral(dt.getFullYear()).format('0000') + '-' +
    numeral(dt.getMonth() + 1).format('00') + '-' +
    numeral(dt.getDate()).format('00') + 'T' +
    numeral(dt.getHours()).format('00') + ':' +
    numeral(dt.getMinutes()).format('00')
}

export function toTimestamp(dtString) {
  var matches = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(dtString)
  return (matches && matches.length === 6 &&
    (new Date(numeral(matches[1]).value(),
      numeral(matches[2]).value() - 1,
      numeral(matches[3]).value(),
      numeral(matches[4]).value(),
      numeral(matches[5]).value())).getTime()) || undefined
}
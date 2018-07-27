const formatTime = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const week = date.getDay()
  const weekArr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
  return {date:month+"月"+day+"日",week:weekArr[week]}
}

module.exports = {
  formatTime,
}

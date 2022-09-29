$.ajaxPrefilter(function (options) {
  // console.log(options.url)
  // 将key=value形式的数据，转成json格式的字符串
  const format2Json = (source) => {
    let target = {}
    source.split('&').forEach((el) => {
      let kv = el.split('=')
      target[kv[0]] = kv[1]
    })
    return JSON.stringify(target)
  }
  options.url = 'http://big-event-vue-api-t.itheima.net' + options.url
  options.contentType = 'application/json'
  options.data = format2Json(options.data)
})
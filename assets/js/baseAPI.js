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
  options.data = options.data && format2Json(options.data)
  // 如果请求路径里面有/my 这样的字符串 就需要添加headers
  // indexOf startsWith endsWith  includes 包含 包括
  // if (options.url.includes('my')) 
  if (options.url.indexOf('/my/'!==-1)) {
    // options.headers['Authorization'] = localStorage.getItem('big_news_token') || ''
    options.headers={
      'Authorization':localStorage.getItem('big_news_token') || ''
    }
  }
  // 统一添加错误回调
  options.error=function(err){
    if (err.responseJSON?.code==1&&err.responseJSON?.message==='身份认证失败！') {
      localStorage.clear()
      location.href='./login.html'
    }
  }
})
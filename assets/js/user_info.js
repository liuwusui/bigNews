$(function () {
  const form = layui.form
  const layer = layui.layer
  form.verify({
    nikename: function (value) {
      if (value.length > 6) {
        return '昵称必须是1-6的非空字符'
      }
    }
  })

  const initinfo = () => {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success(res) {
        if (res.code !== 0) return layer.msg('请求用户信息失败')
        // console.log(res)
        form.val("userForm", res.data)
      }
    })
  }
  initinfo()

  $('#btnReset').on('click', function (e) {
    // 阻止默认重置行为
    e.preventDefault()
    initinfo()
  })


  $('.layui-form').on('submit', function (e) {
    // 阻止默认重置行为
    e.preventDefault()
    // initinfo()

    // 快速收集表单数据
    // 1. jQuery中： $(this).serialize()  得到的格式是：key=value&key=value
    // 2. form.val('userForm')---> {key:value,key:value}
    $.ajax({
      method: 'PUT',
      url: '/my/userinfo',
      data: form.val('userForm'),
      success(res) {
        console.log(res)
        if (res.code !== 0) {
          return layer.msg('更新用户信息失败')
        }
        window.parent.getUserInfo()
        layer.msg('更新用户信息成功')
      }
    })
  })
})

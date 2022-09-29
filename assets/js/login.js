$(function () {
  $('#go2Reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#go2Login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  const form = layui.form
  const layer = layui.layer
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      // 属性选择器：$('[name=xxxx]')
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })



  $('#formReg').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reg',
      // contentType: 'application/json',
      // data: JSON.stringify({
      //   username: $('#formReg [name=username]').val(),
      //   password: $('#formReg [name=password]').val(),
      //   repassword: $('#formReg [name=repassword]').val(),
      // }),
      data: $(this).serialize(),
      success(res) {
        if (res.code !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        // 模拟点击事件
        // 1.click 2. trigger('操作类型')  trigger('click')   3.
        $('#go2Login').click()
      }
    })
  })


  $('#formLogin').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // contentType: 'application/json',
      // data: JSON.stringify({
      //   username: $('#formReg [name=username]').val(),
      //   password: $('#formReg [name=password]').val(),
      //   repassword: $('#formReg [name=repassword]').val(),
      // }),
      data:$(this).serialize(),
      success(res) {
        if (res.code !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        // 模拟点击事件
        // 1.click 2. trigger('操作类型')  trigger('click')   3.
        $('#go2Login').click()
        localStorage.setItem('big_news_token', res.token)
        location.href = './home.html'
      }
    })
  })
  // http://big-event-api-t.itheima.net
})
$(function () {
  const form = layui.form
  const layer = layui.layer
  form.verify({
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
      if (value === $('[name=old_pwd]').val()) {
        return '新旧密码不能一样'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=new_pwd]').val()) {
        return '两次输入的密码不一致'
      }
    }
  })
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'PATCH',
      url: '/my/updatepwd',
      data: form.val('pwdForm'),
      success(res) {
        if (res.code !== 0) {
          console.log(res)
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        console.log(res)

        // 清空表单
        // $('#btnReset').click() //调用 type=reset 
        $('.layui-form')[0].reset()
      }
    })
  })
})
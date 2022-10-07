let layer = layui.layer
$(function () {
  getUserInfo()
})

// var const的区别
// 由 var 声明的变量会默认存在window全局变量上，但是let/const不会
// 由关键字声明的函数也会默认在window全局变量上

// const getUserInfo = function() {
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // url: 'http://big-event-vue-api-t.itheima.net/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('big_news_token') || ''
    // },
    success: function (res) {
      console.log(res)
      if (res.code !== 0) return layer.msg(res.message)
      renderAvatar(res)
    },
    // complete:function(){
    // }

  })
}
const renderAvatar = function (res) {
  if (res.data.user_pic) {
    $('.text-avater').hide()
    $('.userinfo img').attr('src', res.data.user_pic).show()
  } else {
    $('.userinfo img').hide()
    const name = res.data.nickname || res.data.username
    const chat = name.charAt(0).toUpperCase()
    $('.text-avater').html(chat).show()
  }
  $('.userinfo .text').html(`欢迎&nbsp;&nbsp;${res.data.username}`)
}
$('#btnLogout').on('click',function(){
  layer.confirm('你确定要退出吗?', {icon: 3, title:'提示'}, function(index){
    localStorage.removeItem('big_news_token')
    location.href='./login.html'
    
    layer.close(index);
  });
})
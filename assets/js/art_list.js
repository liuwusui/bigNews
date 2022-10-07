$(function () {
  let layer = layui.layer
  let qs = {
    pagenum: 1, //当前页码数
    pagesize: 2, //当前页面需要的数据条数
    cate_id: '', //文章分类id(注意不是文章id)
    state: '', //文章状态("已发布"和"草稿")2种值
  }
  // 加载文章列表
  loadArticleList()
  function loadArticleList(){
    $.ajax({
      method:'GET',
      url:'/my/article/list',
      data:qs,
      success(res){
        console.log(res)

        if (res.code!==0) {
          return layer.msg("获取文章列表失败")
        }
        console.log(res)
        
      }
    })
  }
})
$(function () {
  const layer = layui.layer
  const form = layui.form
  loadCateList()
  function loadCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      success(res) {
        console.log(res)

        if (res.code !== 0) {
          return layer.msg('获取信息失败！')
        }
        let htmlStr = template('tpl-cate', res)
        $('tbody').empty().append(htmlStr)
      }
    })
  }
  let index
  $('#btnAdd').on('click', function () {
    index = layer.open({
      type: 1,
      title: '添加分类名称',
      area: ['500px', '300px'],
      content: $('#addDialog').html(),
    })
  })
  let isEdit = false
  // 需要通过代理的形式(你要监听的元素，是后来动态添加的)
  $('body').on('submit', '#addForm', function (e) {
    e.preventDefault()
    if (isEdit) {
      $.ajax({
        method: 'PUT',
        url: '/my/cate/info',
        data: $(this).serialize(),
        success(res) {
          console.log(res)

          if (res.code !== 0) {
            return layer.msg('修改失败')
          }
          layer.msg('修改分类成功')
          loadCateList()
        }
      })
    } else {
      $.ajax({
        method: 'POST',
        url: '/my/cate/add',
        data: $(this).serialize(),
        success(res) {
          // console.log(res)
          if (res.code !== 0) {
            return layer.msg('添加分类失败！')
          }
          layer.msg('添加分类成功')
          // layer.close(index)
          loadCateList()
        }
      })
    }

    isEdit = false
    layer.close(index)
    loadCateList()
  })
  $('tbody').on('click', '.btnEdit', function () {
    // console.log($(this).attr('data-id'))
    isEdit = true
    index = layer.open({
      type: 1,
      title: '修改分类名称',
      area: ['500px', '300px'],
      content: $('#addDialog').html(),
    })
    const id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: `/my/cate/info?id=${id}`,
      success(res) {
        if (res.code !== 0) {
          return layer.msg('获取分类详情失败')
        }
        form.val('addFormFilter', res.data)
      }
    })
  })
  // 添加删除逻辑
  $('tbody').on('click', '.btnDelete', function () {
    const result = confirm('你确定要删除该分类嘛？')
    const id = $(this).attr('data-id')
    if (result) {
      $.ajax({
        method: 'DELETE',
        url: `/my/cate/del?id=${id}`,
        success(res) {
          if (res.code !== 0) {
            return layer.msg('删除失败！')
          }
          layer.msg('删除分类成功')
          loadCateList()
        }
      })
    }
  })
})
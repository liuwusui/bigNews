$(function(){
  const layer =layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
    }
  
    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChoose').on('click',function(){
      // file.click()
      $('#file').trigger('click')
    })
    $('#file').on('change',function(e){
      console.log(e)
      const fileList=e.target.files//伪数组
      if (fileList.length==0) {
        return layer.msg('请选择图片')
      }
      const blobUrl=URL.createObjectURL(fileList[0])
      $image.cropper('destroy').attr('src',blobUrl).cropper(options)
    })

    $('#btnConfirm').on('click',function(){
      var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    
      $.ajax({
        method:'PATCH',
        url:'/my/update/avatar',
        data:{
          avatar:dataURL
        },
        success(res){
          if (res.code!==0) {
            return layer.msg(res.message)
          }
          layer.msg(res.message)
          window.parent.getUserInfo()
        }
      })
    })
})
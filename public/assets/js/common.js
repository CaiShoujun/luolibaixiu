// 当用户点击退出时，触发点击事件
$('#logout').on('click', function () {
    // 弹出确认退出框
    var isConfirm = confirm('您真的要退出么？');
    // 发送请求
    if (isConfirm) {
      $.ajax({
        type: 'post',
        url: '/logout',
        success: function () {
          location.href = 'index.html';
        },
        error: function () {
          alert('退出失败！');
        }
      })
    }
  });


  // 处理模板中日期时间格式
function formateDate(date) {
  // 将日期时间字符串转换成日期对象
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 向服务器端发送请求  所有登录用户的详细信息
$.ajax({
  type: 'get',
  url: '/users/' + userId,
  success:function(response){
    console.log(response);
    $('.profile .avatar').attr('src',response.avatar)
    $('.profile .name').html(response.nickName)
  }
})
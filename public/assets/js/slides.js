// 当管理员选择文件的时候
$('#file').on('change',function(){
    // 用户选择到的文件
    var file = this.files[0]
    // 创建formData对象实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择到的文件添加到formData对象中
    formData.append('image',file);
    // 向服务器端发送请求 实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType:false,
        success: function(response){
            console.log(response[0].image);
            $('#image').val(response[0].image);

        }
    });
});

// 当表单发送提交行为的时候
$('#slidesForm').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type:'post',
        url: '/slides',
        data: formData,
        success: function(response){
            location.reload();
        }
    })
    // 阻止表单默认提交行为
    return false
})

// 向服务器索要图片轮播图数据
$.ajax({
    type:'get',
    url: '/slides',
    success: function(response){
        console.log(response);
       var html =  template('slidesTpl',{data : response})
        $('#slidesBox').html(html);
    }
})

// 轮播图删除功能
$('#slidesBox').on('click','.delete',function(){
    // 获取管理员要删除的轮播图id
    var id = $(this).attr('data-id');
    if(confirm('您真的要删除次轮播图吗?')){
        // 向服务器发送请求 实现删除功能
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function(response){
                location.reload();
            }
        })
    }
});
// 发送ajax请求  向服务器请求文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // 将服务器返回的数据和html模板进行拼接
        var html = template('categoryTpl', { data: response });
        // 将拼接好的页面显示在页面中
        $('#category').html(html);
    }
});

// 当管理员选择文件的时候 触发事件
$('#feature').on('change', function () {
    // 获取到管理员选择的文件
    var file = this.files[0]
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择到的文件追加到formData对象中
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要处理data属性对应的参数
        processData: false,
        // 告诉$.ajax方法不要设置参数类型
        contentType: false,
        success: function (response) {
            console.log(response);
            $('#thumbnail').val(response[0].cover);
        }
    })
});

// 当管理员选择文件的时候  触发事件
$('#addForm').on('submit', function () {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求实现文章创建功能
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function (response) {
            // 文章添加成功，跳转到文章列表页面
            location.href = '/admin/posts.html';
        }
    })
    // 阻止表单默认提交行为
    return false;
})

// 获取地址栏中的id
var id = fetUrlParams('id');
// 当前管理员事在做修改该文章操作
if (id != -1) {
    // 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            // 发送ajax请求  向服务器请求文章分类数据
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    response.categories = categories;
                    console.log(response)
                    var html = template('modifyTpl', response)
                    $('#parentBox').html(html);
                }
            });
        }
    })
}

// 从浏览器的地址栏中获取查询参数
function fetUrlParams(name) {
    var paramsArry = location.search.substr(1).split('&')
    // 循环数据
    for (var i = 0; i < paramsArry.length; i++) {
        var tmp = paramsArry[i].split('=')
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1
};

// 当修改文章信息表单发生提交行为的时候
$('#parentBox').on('submit','#modifyForm',function(){
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 获取管理员正在修改的文章id值
    var id = $(this).attr('data-id');

    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function(response){
            location.href = '/admin/posts.html';
        }
    })
    // 阻止表单默认提交行为
    return false;
});
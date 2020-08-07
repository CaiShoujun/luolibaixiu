// 向服务器端发发送请求 获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        console.log(response);
        var html = template('postsTpl', { data: response })
        $('#postsBox').html(html);
        var page = template('pageTpl', response)
        $('#page').html(page);
    }
});

// 分页
function changePage(data) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: data
        },
        success: function (response) {
            console.log(response);
            var html = template('postsTpl', { data: response })
            $('#postsBox').html(html);
            var page = template('pageTpl', response)
            $('#page').html(page);
        }
    });

}

// 向服务器端发送请求 索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        console.log(response);
        var html = template('categoryTp', { data: response })
        $('#categoryBox').html(html);
    }
});

$('#filterForm').on('submit', function () {
    var formData = $(this).serialize();
    // 向服务器端发发送请求 获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (response) {
            console.log(response);
            var html = template('postsTpl', { data: response })
            $('#postsBox').html(html);
            var page = template('pageTpl', response)
            $('#page').html(page);
        }
    });
    // 阻止浏览器默认提交行为
    return false;
});

// 当删除按钮被点击的时候
$('#postsBox').on('click','.delete',function(){
    // 获取被删除文章的id
    var id = $(this).attr('data-id');
    // 向服务器发送请求 执行删除操作
    if(confirm('您确定要删除此文章吗？')){
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function(response){
                location.reload();
            }
        })
    }
})
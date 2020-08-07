// 请求评论数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        console.log(response);
        // 将服务器端返回得评论数据和html模板进行拼接
        var html = template('commentsTpl', response);
        $('#commentsBox').html(html);
        // 将分页数据和分页模板进行拼接
        var pagehtml = template('pageTpl', response);
        $('#pagesBox').html(pagehtml);
    }
});

// 实现分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: { page: page },
        success: function (response) {
            console.log(response);
            // 将服务器端返回得评论数据和html模板进行拼接
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            // 将分页数据和分页模板进行拼接
            var pagehtml = template('pageTpl', response);
            $('#pagesBox').html(pagehtml);
        }
    });
};

// 实现评论审核和评论驳回功能
$('#commentsBox').on('click', '.status', function () {
    // 获取当前评论的状态
    var status = $(this).attr('data-status');
    // 获取当前评论的id
    var id = $(this).attr('data-id');
    // 向服务器端发送请求
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: { state: status == 0 ? 1 : 0 },
        success: function (response) {
            location.reload();
        }
    })
});

// 删除评论功能
$('#commentsBox').on('click', '.delete', function () {
    if (confirm('您确定要删除此评论吗？')) {
        // 获取当前评论的id
        var id = $(this).attr('data-id');
        // 向服务器端发送请求
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function (response) {
                location.reload();
            }
        })
    }
});
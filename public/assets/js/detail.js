// 从地址栏中获取文章id
var postId = fetUrlParams('id');
// 评论是否经过人工审核
var review;

// 向服务器发送请求 根据文章id获取文章详细信息
$.ajax({
    type: 'get',
    url: '/posts/' + postId,
    success: function (response) {
        console.log('文章详细信息：', response);
        var html = template('postsTpl', response);
        $('#postsBox').html(html);
    }
});


// 当点赞按钮发生点击事件时
$('#postsBox').on('click', '#like', function () {
    // 向服务器器发送请求  执行点赞操作
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + postId,
        success: function (response) {
            alert('点赞成功！')
        }
    })
})

// 获取网站配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        review = response.review;
        console.log('网站配置信息：', response);
        // 判断管理员是否开启了评论功能 渲染评论模板
        if (response.comment) {
            // 管理员开启了评论功能  渲染模板
            var html = template('commentTpl')
            $('#comment').html(html)
        }

    }
});

// 当评论表单发生提交行为的时候
$('#comment').on('submit', 'form', function () {
    // 获取用户输入的评论内容
    var content = $(this).find('textarea').val();
    // 代表评论的状态
    var state;
    if (review) {
        // 要经过人工审核
        state = 0;
    } else {
        //不需要经过人工审核
        state = 1;
    }

    //向服务器端发送请求  执行添加评论操作
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content: content,
            post: postId,
            state: state,
        },
        success: function(){
            alert('评论成功！');
            location.reload();
        },
        error: function(){
            alert('评论失败！');
            location.href = "/admin/login.html";
        }
    })

    // 阻止表单默认行为
    return false;
})
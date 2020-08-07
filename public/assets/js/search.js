// 获取到浏览器地址栏中的搜索关键字
var key = fetUrlParams('key');
if (key == '') {
    $('#listBox').html('<h4>什么也没有！！！</h4>');
} else {
    // 根据搜索关键字调用搜索接口获取搜索结果
    $.ajax({
        type: 'get',
        url: '/posts/search/' + key,
        success: function (response) {
            console.log('搜索结果：', response);
            if (response.length == 0) {
                $('#listBox').html('<h4>没有相关内容！！！</h4>');
            } else {
                var html = template('searchTpl', { data: response });
                $('#listBox').html(html);
            }

        }
    })
}

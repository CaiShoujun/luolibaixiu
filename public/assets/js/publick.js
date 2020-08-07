// 向服务器发送请求 索要随机推荐数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(response){
        console.log('随机推荐：',response);
        var randmoTpl = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                <p class="title">{{$value.title}}</p>
                <p class="reading">阅读({{$value.meta.views}})</p>
                <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                </div>
                </a>
            </li>
            {{/each}}
        `;
        var html = template.render(randmoTpl,{data : response});
        $('#randmoBox').html(html);
    }
});

// 向服务器端发送请求  索要最新评论数据
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(response) {
        console.log('最新评论：',response);
        var commentTpl = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value.post}}">
                <div class="avatar">
                    <img src="{{$value.author.avatar}}" alt="">
                </div>
                <div class="txt">
                    <p>
                    <span>{{$value.author.nickName}}</span>{{$value.createAt.split('T')[0]}}说:
                    </p>
                    <p>{{$value.content}}</p>
                </div>
                </a>
            </li>
            {{/each}}
        `;
        var html = template.render(commentTpl,{data : response});
        $('#commentBox').html(html);
    }
});

// 向服务器发送请求  分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response){
        console.log('分类列表',response);
        var categoryTpl = `
            {{each data}}
            <li>
                <a href="list.html?categoryId={{$value._id}}">
                    <i class="fa {{$value.className}}">
                    </i>{{$value.title}} 
                </a>
            </li>
            {{/each}}
        `;
        var html = template.render(categoryTpl,{data : response});
        $('#navBox').html(html);
        $('#topNavBox').html(html);
    }
});


// 处理模板中日期时间格式
function formateDate(date) {
// 将日期时间字符串转换成日期对象
date = new Date(date);
return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
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

// 获取搜索表单 并为其添加表单提交事件
$('.search form').on('submit',function(){
    // 获取到用户在表单中输入的关键字
    var keys = $(this).find('.keys').val();
    // 跳转到搜索结果页面 并且将用户输入的搜索关键字传递到搜索结果页
    location.href = "/search.html?key=" + keys;
    // 阻止浏览器默认提交事件
    return false;
})
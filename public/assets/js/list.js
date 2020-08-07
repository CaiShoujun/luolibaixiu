// 获取地址栏中的categoryId
var categoryId = fetUrlParams('categoryId');

// 根据分类id获取文章列表
$.ajax({
    type:'get',
    url: '/posts/category/' + categoryId,
    success:function(response){
        console.log('根据分类获取的文章：',response);
        var html = template('listTpl',{data : response});
        $('#listBox').html(html);
    }
});

// 根据分类id获取分类信息
$.ajax({
    type: 'get',
    url: '/categories/' + categoryId,
    success: function(category){
        console.log('分类信息:',category);
        $('#categoryTitle').html(category.title);
    }
})
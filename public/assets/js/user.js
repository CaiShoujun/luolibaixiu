// 当表单发生提交行为的hi后
$('#userForm').on('submit', function () {
    // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器端发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            // 刷新页面
            location.reload();
        },
        error: function () {
            alert('用户添加失败！');
        }
    })
    // 阻止表单默认提交行为
    return false;
});

// 当用户选择文件的时候
$('#modifybox').on('change', ('#avatar'), function () {
    // 用户选择到的文件
    // console.log(this.files[0]);

    var formData = new FormData()
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response);
            // 实现图片预览
            $('#preview').attr('src', response[0].avatar);
            // 为隐藏域设置value值为图片地址  用于上传数据库
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
});

// 向服务器端发送请求 获取用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        console.log(response);
        // 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('userTpl', { data: response });
        $('#userbox').html(html);
    }
});

// 通过事件委托的方式为编辑按钮添加点击事件
$('#userbox').on('click', '.edit', function () {
    // 获取被点击用户的id值
    var id = $(this).attr('data-id');

    // 根据id获取用户的详细信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            console.log(response);
            var html = template('modifyTpl', response);
            $('#modifybox').html(html);
        }
    })
});

// 为修改表单添加表单提交事件
$('#modifybox').on('submit', '#modifyForm', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的哪个用户的id值
    var id = $(this).attr('data-id')
    // 发送请求 修改用户信息
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            // 修改信息成功 重新加载页面
            location.reload();
        }
    })
    // 阻止表单默认提交事件
    return false;
});

// 为删除按钮添加点击事件
$('#userbox').on('click', '.delete', function () {
    // 如果管理员确认要删除用户
    if (confirm('您确定要删除此用户吗？')) {
        // 获取到即将要删除的用户id
        var id = $(this).attr('data-id');
        // 向服务器端发送请求 删除用户
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (response) {
                location.reload();
            }
        });
    }
});


// 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany')
// 当全选按钮的状态发生改变时
selectAll.on('change', function () {
    // 获取到全选按钮当前的状态
    var status = $(this).prop('checked');
    if (status) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }
    // 获取到所有的用户并将用户的状态和全选按钮保持一致
    $('#userbox').find('input').prop('checked', status);
});

// 当用户前面的复选框状态发生改变时
$('#userbox').on('change', '.userStatus', function () {
    // 获取到所有用户 在所有用户中过滤出选中的用户
    // 判断选中用户的数量和所有用户的数量是否一致
    // 如果一直  就说明所有的用户都是选中的
    // 否则 就是有用户没有被选中
    var inputs = $('#userbox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        // 所有用户都是选中的
        selectAll.prop('checked', true);
    } else {
        // 不是所有用户都是被选中的
        selectAll.prop('checked', false);
    };

    if (inputs.filter(':checked').length > 0) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }
});

// 为批量删除按钮添加点击事件
deleteMany.on('click', function () {
    var ids = [];
    // 获取选中的用户
    var checkedUser = $('#userbox').find('input').filter(':checked');
    // 循环复选框 从复选框zho
    checkedUser.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    });

    if(confirm('您确定要进行批量删除操作吗？')){
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function (response) {
                location.reload();
            }
        });
    }
});
// 向服务器端发送请求 索要轮播图数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        console.log('轮播图：',response)
        var html = template('slideTpl', { data: response })
        $('#slidesBox').html(html);

        //实现轮播图效果
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;
                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
});

// 向服务器发送请求 获取最新发布数据
$.ajax({
    type:'get',
    url:'/posts/lasted',
    success: function(response){
        console.log('最新发布：',response);
        var html = template('lastedTpl',{data : response});
        $('#lastedBox').html(html);
    }
});
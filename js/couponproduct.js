$(function () {
  var arr = []; // 用于存储图片地址
  var width = 8; // 每个li宽度为8rem

  // 功能一: 1.根据传入id,发送ajax请求,获取对应优惠券信息渲染到页面
  //        2.获取全部图片src地址,点击商品列表,显示模态框,切换照片,当前图片为当前li对应图片,并实现滑动轮播
  $('.mm-header .center p').text(getSearch('couponTitle') + '优惠券');
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getcouponproduct",
    data: { couponid :  getSearch('couponid')},
    dataType: "json",
    success: function (info) {
      $('.mm-main ul').html(template('tpl', info));

      // 2.1 获取全部图片地址存储在arr中
      info.result.forEach(function (v, i) {
        arr.push(v.couponProductImg);
      })

      // 2.2 根据arr中图片地址将图片渲染到模态框
      $('#modal ul').html(template('modalTpl', { arr : arr }));
      $('#modal ul')[0].style.width = arr.length * width + 'rem';
    }
  });

  // 2.3 点击商品列表显示模态框
  $('.mm-main ul').on('click', 'a', function () {
    var index = $(this).data('index'); // 当前图片索引
    var ul = $('#modal ul')[0]; // 获取ul

    $('#modal').show(); // 显示模态框

    // 2.4 展示图片为当前索引对应图片
    
    
    ul.style.transform = 'translateX(' + (-index * width) + 'rem)';

    // 2.5 监听手指滑动事件实现轮播
    var startX = 0;
    var startTime = 0;
    var timer; // 定时器
    document.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startTime = new Date();
      // 开始清除定时器
      clearInterval(timer);
    });
    document.addEventListener('touchmove', function (e) {
      var distance = e.changedTouches[0].clientX - startX;
      ul.style.transform = 'translateX(' + -(index * width - distance / 50) + 'rem)';
    });
    document.addEventListener('touchend', function (e) {
      var distance = e.changedTouches[0].clientX - startX;
      var time = new Date() - startTime;
      // 判断滑动距离如果大于图片1/3或者滑动时间小于200ms且距离大于1rem就切换上一张图片
      if (distance > width * 50 / 3 || time < 200 && distance > 50) {
        if (index >= 1) {
          index--;
        }
      }
      if (distance < -width * 50 / 3 || time < 200 && distance < -50) {
        if (index < $('.mm-main ul li').length - 1) {
          index++;
        }
      }
      ul.style.transition = 'all 0.5s';
      ul.style.transform = 'translateX(' + -(index * width) + 'rem)';

      
      // 2.6 点击当前图片跳转到照片对应的商品信息
      var totalTop = 0;
      $('.mm-main ul li:nth-child(-n + ' + index + ')').each(function (i, v) {
        totalTop += $(v).outerHeight(true);
      })
      $('html, body').scrollTop(totalTop); // 展示当前选中
       
      timer = setInterval(function () {
        $('.mm-main ul li:nth-child(' + (index + 1) + ')').toggleClass('current').siblings().removeClass('current');   
      }, 300) // 用于高亮显示当前
      
      $('#modal ul img:eq(' + index + ')').on('click', function () {

        $('#modal').hide();

        setTimeout(function () {
          clearInterval(timer);
          $('.mm-main ul li:nth-child(' + (index + 1) + ')').removeClass('current');
        }, 1500)
      })
    })
  })

});
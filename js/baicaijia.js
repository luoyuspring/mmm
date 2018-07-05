$(function () {
  
  // 功能一: 发送ajax请求获取标题数据,渲染到页面
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getbaicaijiatitle',
    dataType : 'json',
    success : function (info) {
      console.log(info);
      $('.main-title .tab ul').html(template('tabTpl', info));
      // 实现水平区域滚动
      var width = 0;
      $('.main-title .tab li').each(function (i, v) {
        width += $(this).width();
      })
      $('.main-title .tab ul').width(width);
      var myScroll = new IScroll('.main-title .tab', {
        scrollX : true,
        scrollY : false,
      });

      // 加载默认页
      render(0);
    }
  })

  // 封装发送ajax,获取数据渲染列表方法
  function render(titleId) {
    $.ajax({
      type : 'get',
      url : 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
      data : {titleid : titleId},
      dataType : 'json',
      success : function (info) {
        console.log(info);
        $('.main-content ul').html(template('listTpl', info));
      }
    })
  }

  // 功能二: 通过事件委托给tab每个li注册点击事件
  //           1.切换tab栏高亮
  //           2.发送ajax请求,获取对应产品数据渲染到页面
  $('.tab').on('click', 'li', function () {
    // 切换tab栏高亮
    $(this).addClass('current').siblings().removeClass('current');

    render($(this).data('id'));
  })

});
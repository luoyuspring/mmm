$(function () {
  
  // 功能一: 1.进入页面发送ajax请求,获取分类数据,渲染到页面
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getcategorytitle',
    dataType : 'json',
    success : function (info) {
      $('.mm-main ul').html(template('titleTpl', info));

       // 2.进入页面发送ajax请求,获取分类列表数据,渲染到页面
      $('.mm-main .main-list ul').each(function (i, v) {
        var id = $(this).data('id');
        $.ajax({
          type : 'get',
          url : 'http://127.0.0.1:9090/api/getcategory',
          data : { titleid : id},
          dataType : 'json',
          success : function (info) {
            $(v).html(template('listTpl', info)).hide();
          }
        })
      });
    }
  })

  // 功能二: 点击title分类,切换显示隐藏商品名列表
  $('.mm-main').on('click', '.main-title', function () {
    $(this).siblings('.main-list').find('ul').slideToggle();
  })

  // 功能三: 点击分类列表项,跳转到产品列表页,并携带当前商品id
  $('.mm-main').on('click', '.main-list a', function () {
    location.href = 'productList.html?categoryId=' + $(this).data('id');
  })

});
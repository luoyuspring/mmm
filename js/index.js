$(function () {
  
  // 功能一: 进入页面发送ajax请求,获取菜单数据并渲染到页面  
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getindexmenu',
    dataType : 'json',
    success : function (info) {
      $('.mm-nav ul').html(template('navTpl', info));
      $('.mm-nav li:eq(7)').nextAll().hide();
    }
  })

  // 功能二: 进入页面发送ajax请求,获取折扣数据并渲染到页面
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getmoneyctrl',
    dataType : 'json',
    success : function (info) {
      $('.mm-recommend .product ul').html(template('productTpl', info));
    }
  })

  // 功能三: 点击更多按钮显示更多,再次点击隐藏
  $('.mm-nav').on('click', 'li:eq(7)', function () {
    $(this).find('a').attr('href', 'javascript:;');    
    $(this).nextAll().slideToggle();
  })

  // 功能三: 点击返回顶部按钮返回顶部
  $('#back').on('click', function(){
    $('html,body').animate({
      scrollTop : 0
    }, 500)
  })
});
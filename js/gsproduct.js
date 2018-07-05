$(function () {
  
  // 功能一: 进入页面.发送ajax请求获取店铺和地区数据,渲染到页面
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getgsshop",
    dataType: "json",
    success: function (info) {
      $('.shop').html(template('shopTpl', info)).hide();

       // 将info.result[0].areaName赋值给nav的京东
       $('.nav-shop span:first-child').text(info.result[0].shopName);

      // 点击京东切换下拉框显示与隐藏
      $('.nav-shop').on('click', function () {
        $('.area').hide();
        $('.shop').stop().slideToggle();
      })
    }
  });
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getgsshoparea",
    dataType: "json",
    success: function (info) {
      $('.area').html(template('areaTpl', info)).hide();

      // 将info.result[0].areaName赋值给nav的华北
      $('.nav-area span:first-child').text(info.result[0].areaName.slice(0, 2));

      // 点击华北切换下拉框显示与隐藏
      $('.nav-area').on('click', function () {
        $('.shop').hide();
        $('.area').stop().slideToggle();
      })
    }
  });

  // 功能二: 封装通过ajax请求获取商品信息并渲染到页面的方法
  function render(shopId, areaId) {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getgsproduct",
      data: {
        shopid : shopId || 0,
        areaid : areaId || 0
      },
      dataType: "json",
      success: function (info) {
        $('.main-list ul').html(template('productTpl', info));
      }
    });
  }
  render();

  // 功能三: 1.点击shop或area切换当前选中
  //         2.将点击的当前a中文本赋值给对应nav
  //         3.获取当前a中保存的id,发送ajax请求,获取商品信息重新渲染页面
  $('.main-title').on('click', 'a', function () {
    // 1.切换a选中状态
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');

    // 2.将当前a中的文本赋值给对应nav
    if ($(this).parents('ul').hasClass('shop')) {
      $('.nav-shop span:first-child').text($(this).text());
    } else {
      $('.nav-area span:first-child').text($(this).text().slice(0, 2));
    }

    // 4.获取shop和area id,调用render,渲染页面
    var shopId = $('.shop a.current').data('id');
    var areaId = $('.area a.current').data('id');
    render(shopId, areaId);

    // 5.隐藏列表
    $('.area,.shop').hide();
  })

});
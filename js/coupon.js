$(function () {

  // 发送ajax请求,获取优惠券数据,渲染到页面
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getcoupon",
    dataType: "json",
    success: function (info) {
      $('.mm-main ul').html(template('tpl', info));
    }
  });

});
$(function () {
  
  // 功能一: 发送ajax请求获取折扣数据,渲染到页面
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getinlanddiscount',
    dataType : 'json',
    success : function (info) {
      $('.mm-main ul').html(template('tpl', info));
    }
  })

});
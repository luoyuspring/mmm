$(function () {
  
  // 功能一: 根据传入id,发送ajax请求获取对应产品信息,渲染到页面
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getdiscountproduct',
    data : {productid : getSearch('productId')},
    dataType : 'json',
    success : function (info) {
      $('.mm-main').html(template('tpl', info));
    }
  })

});
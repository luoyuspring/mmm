$(function () {
  
  // 发送ajax,获取分类数据,渲染到页面
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getbrandtitle",
    dataType: "json",
    success: function (info) {
      console.log(info);
      $('.main-list ul').html(template('listTpl', info));
    }
  });

});
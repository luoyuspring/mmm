$(function () {
  
  // 发送ajax,获取网站导航数据,渲染页面
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getsitenav",
    dataType: "json",
    success: function (info) {
      console.log(info);
      
      $('.mm-main ul').html(template('navTpl', info));
    }
  });

});
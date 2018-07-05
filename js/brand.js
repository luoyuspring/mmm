$(function () {
  
  // 功能一: 根据传入分类id发送ajax请求,获取品牌数据,渲染到页面
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getbrand",
    data: { brandtitleid : getSearch('brandTitleId') },
    dataType: "json",
    success: function (info) {
      $('.main-brand ul').html(template('brandTpl', info));

      // 让1-3li里面的left改变背景色
      $('.main-brand li:eq(0) .left').css('background', '#f10e0e');
      $('.main-brand li:eq(1) .left').css('background', '#ff841d');
      $('.main-brand li:eq(2) .left').css('background', '#8adf5b');
    }
  });

  // 功能二: 获取url中品牌信息添加给main-title
  $('.main-title span').text(getSearch('brandTitle').slice(0, getSearch('brandTitle').indexOf('十')));

  // 功能三: 根据传入分类id发送ajax请求,获取销量数据,渲染到页面
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getbrandproductlist",
    data: { 
      brandtitleid : getSearch('brandTitleId'),
      pagesize : 4
    },
    dataType: "json",
    success: function (info) {
      $('.main-sell ul').html(template('sellTpl', info));

      // 功能三: 根据销量id发送ajax请求,获取评论数据,渲染到页面
      var productId = info.result[0].productId;
      var productName = info.result[0].productName;
      var productImg =  info.result[0].productImg;
      $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getproductcom",
        data: { productid : productId },
        dataType: "json",
        success: function (info) {
          info.productName = productName;
          info.productImg = productImg;
          console.log(info);
          
          $('.main-comment ul').html(template('commentTpl', info));
        }
      });
    }
  });

 

  

});
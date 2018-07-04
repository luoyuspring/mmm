$(function () {
  
  // 功能一: 获取传入地址栏中的信息赋值给main-nav对应位置
  $('.main-nav .category').text(getSearch('category'));
  $('.main-nav .brandName').text(getSearch('brandName'));
  
  // 功能二: 根据传入产品id发送ajax请求,获取产品详情渲染到页面
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getproduct',
    data : {productid : getSearch('productId')},
    dataType : 'json',
    success : function (info) {
      $('.main-defult .top').html(template('productTpl', info));
      $('.main-nav .category').attr('href', 'productList.html?categoryId=' + info.result[0].categoryId)
    }
  })

  // 功能三: 根据传入产品id发送ajax请求,获取产品评论渲染到页面
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getproductcom',
    data : {productid : getSearch('productId')},
    dataType : 'json',
    success : function (info) {
      console.log(info);
      $('.main-comment .content').html(template('commentTpl', info));
    }
  })
  


});
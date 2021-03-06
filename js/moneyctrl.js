$(function () {
    
  var pageId = 1; // 页码
  var page = 0; // 总页数

  // 功能二: 根据传入id,发送ajax请求,获取对应商品列表数据
  function render() {
    $.ajax({
      type : 'get',
      url : 'http://127.0.0.1:9090/api/getmoneyctrl',
      data : {
        pageid : pageId
      },
      dataType : 'json',
      success : function (info) {
        console.log(info);
        
        // 商品列表渲染
        $('.mm-product ul').html(template('listTpl', info));
        // 分页渲染
        page = Math.ceil(info.totalCount / info.pagesize);
        var arr = [];
        for (var i = 1; i <= page; i++) {
          arr.push(i);
        }
        $('#select').html(template('selectTpl', {page : page, pageId : pageId, arr : arr}));      
      }
    })
  }
  render();

  // 功能三: 1.点击上一页渲染上一页
  //         2.点击下一页渲染下一页
  //         3.选择下拉框选项渲染对应页
  // 点击上一页
  $('.prev').on('click', function () {
    if (pageId > 0) {
      pageId--;
      render();
    }
  })
  // 点击下一页
  $('.next').on('click', function () {
    if (pageId < page) {
      pageId++;
      render();
    }
  })
  // 通过下拉列表change事件获取选中的值,设置为页码
  $('#select').on('change', function () {
    pageId = +$(this).val();
    render();
  })


  // 功能四: 点击商品列表项跳转商品详情页
  $('.mm-product').on('click', 'a', function () {
    var productId = $(this).data('id');
    location.href = 'moneyproduct.html?productId=' + productId;
  })

});
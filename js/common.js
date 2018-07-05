// $(function () {

  // 功能一: 定义rem根字体大小
  var base = 50;
  var design = 750;
  function responsive() {
    var pageWidth = window.innerWidth;
    if ( pageWidth <= 320 ) {
      pageWidth = 320;
    }
    if ( pageWidth >= 750 ) {
      pageWidth = 750;
    }
    var size = base / design * pageWidth;
    document.documentElement.style.fontSize = size + "px";
  }
  responsive();
  window.addEventListener("resize", responsive);

  // 功能二: 点击返回顶部按钮返回顶部
  $('#back').on('click', function(){
    $('html,body').animate({
      scrollTop : 0
    }, 500)
  })

// });

// 功能三: 解析地址栏字符串方法封装
function getSearch(name) {
  var arr = decodeURI(location.search).slice(1).split('&');
  var obj = {};
  arr.forEach(function (v, i) {
    obj[v.split('=')[0]] = v.split('=')[1];
  })
  return obj[name];
}
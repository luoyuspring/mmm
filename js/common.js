$(function () {

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


  // 功能二: 

});
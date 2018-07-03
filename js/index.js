$(function () {
  
  // 功能一:   
  $.ajax({
    type : 'get',
    url : 'http://192.168.16.68:9090/api/getindexmenu',
    dataType : 'json',
    success : function (info) {
      console.log(info);
    }
  })

});
var showItem = function(item){
  clearClassItem();
  var group = item.parentElement.parentElement.querySelectorAll("a")[0];
  group = group.getAttribute("href").replace("#","");
  item = item.innerHTML.replace(/<[^>]*>/g, "")
  var itens = document.querySelectorAll(".options.active .item-menu");
  [].forEach.call(itens, function(el) {
      var attr = el.getAttribute("class");
      usingClass = attr.indexOf("active") >= 0;
      if(el.innerHTML.replace(/<[^>]*>/g, "") == item && !usingClass){
        el.setAttribute("class", attr + " active");
      }
  });
  var content = document.querySelectorAll('.doc-content [option="'+group+'"][item="'+item+'"]');
  if(content){
      contentPosition = content[0].offsetTop;
      window.scrollTo(0,contentPosition - 90);
  }
}

var clearClass = function(){
  var elems = document.querySelectorAll(".options");
  [].forEach.call(elems, function(el) {
      el.className = el.className.replace(/\bactive\b/, "");
  });
}

var clearClassItem = function(){
  var itens = document.querySelectorAll(".options .item-menu");
  [].forEach.call(itens, function(el) {
      el.setAttribute("class", el.getAttribute("class").replace("active",""));
  });
}

var activeOptions = function(){
  clearClass();
  var hash = location.hash.replace("#","");
  if(hash){
      var e = document.getElementById("options-"+hash);
      var attr = e.getAttribute("class");
      attr += " active";
      e.setAttribute("class", attr);
      clearClassItem();
      var fistItem = document.querySelectorAll(".options.active .item-menu");
      if(location.search){
        var found = false;
        [].forEach.call(fistItem, function(el) {
            if( el.innerHTML.replace(/<[^>]*>/g, "") == location.search.replace("?","")){
              fistItem = el;
              found=true;
            }
        });
        if(!found){
            fistItem = fistItem[0];
        }
      } else {
        fistItem = fistItem[0];
      }
      fistItem.click();
  }
}
// var visibleOption = "";
// var visibleItem = "";
// window.addEventListener("scroll", function(){
//   var scroll = document.body.scrollTop;
//   var bodyHeight = document.body.offsetHeight;
//   var elements = document.querySelectorAll(".doc-content-item");
//   [].forEach.call(elements, function(el) {
//     var elPosition = el.offsetTop;
//     var elHeight = el.clientHeight;
//       if(scroll >= elPosition - 90 && scroll <= elHeight + elPosition){
//         if(visibleOption != el.getAttribute("option") || visibleItem != el.getAttribute("item")){
//           visibleOption = el.getAttribute("option");
//           visibleItem = el.getAttribute("item");
//           console.log(visibleOption, visibleItem);
//           var options = document.querySelectorAll(".doc-content-item");
//         }
//       }
//   });
// });
var basePreview = '<link rel="stylesheet" href="/icons/materialdesign.css"><link rel="stylesheet" href="/lib/mockapp-colors.css"><link rel="stylesheet" href="/lib/mockapp.css">';
var bindPreview = function(){
  var elements = document.querySelectorAll(".preview");
  [].forEach.call(elements, function(el) {
    var code = el.querySelectorAll("textarea");
    var codeHTML = code[0].value;
    var iframePreview = el.querySelectorAll("iframe");
    iframePreview = iframePreview[0];
    iframePreview.contentDocument.body.innerHTML = basePreview + codeHTML;
    el.querySelectorAll("button")[0].addEventListener("click", function(){
      var newCodeHTML = this.parentElement.parentElement.querySelectorAll("textarea")[0].value
      iframePreview.contentDocument.body.innerHTML = basePreview + newCodeHTML;
    }, false);
  });
}

window.onload = function(){
  bindPreview();
  activeOptions();
  if(location.hash === ""){
    location.hash = "#start";
  }

  window.addEventListener("hashchange", activeOptions, false);

  var bindCodes = document.querySelectorAll(".code-bind");
  [].forEach.call(bindCodes, function(el) {
    var mycm = CodeMirror.fromTextArea(el);
    setTimeout(function(){
      var sizeCode = el.parentElement.offsetHeight;
      el.parentElement.parentElement.querySelectorAll(".box-mobile")[0].style.height=sizeCode+"px";
    },1)
    mycm.on('change',function(cMirror){
      el.value = cMirror.getValue();
      var asizeCode = el.parentElement.offsetHeight;
      el.parentElement.parentElement.querySelectorAll(".box-mobile")[0].style.height=asizeCode+"px";
    });
  });
}

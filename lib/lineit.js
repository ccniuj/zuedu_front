window.LineIt=window.LineIt||{};
(function(){
  var IMG_SIZE={
    "share-a":{
      ja:[82,20],
      en:[68,20],
      "zh-Hant":[84,20]},
      "share-b":{
        ja:[20,20],
        en:[20,20],
        "zh-Hant":[20,20]
      },
      "share-c":{
        ja:[30,30],
        en:[30,30],
        "zh-Hant":[30,30]
      },
      "share-d":{
        ja:[40,40],
        en:[40,40],
        "zh-Hant":[40,40]
      },
      "share-e":{
        ja:[36,60],
        en:[36,60],
        "zh-Hant":[36,60]
      }
    };
  var loadButton=function(){
    var entries=document.querySelectorAll(".line-it-button");
    var params;
    var forEach=Array.prototype.forEach;
    forEach.call(entries,function(entry){
      if(entry.tagName.toLowerCase()!=="div"){
        return
      }
      var button=document.createElement("iframe");
      var params=[];
      var lang="en";
      var type="share-a";
      var env="real";
      params.push("url="+encodeURIComponent(location.href));
      forEach.call(entry.attributes,function(attribute){
        var m=attribute.name.match(/^data\-(.+)$/);
        if(m!=null){
          params.push(m[1]+"="+encodeURIComponent(attribute.value));
          if(m[1]==="lang"){
            lang=attribute.value
          }
          if(m[1]==="type"){
            type=attribute.value
          }
          if(m[1]==="env"&&(attribute.value==="alpha"||attribute.value==="beta")){
            env=attribute.value
          }
          button.setAttribute(attribute.name,attribute.value)
        }
      });
      params.push("title="+encodeURIComponent(document.title));
      if(env==="real"){
        button.src="//lineit.line.me/share/button?"+params.join("&")
      }else if(env==="beta"){
        button.src="//lineit.line-beta.me/share/button?"+params.join("&")
      }else{
        button.src="//lineit.line-"+env+".me/share/button?"+params.join("&")
      }button.className="line-it-button";
      if(IMG_SIZE[type]==null||IMG_SIZE[type][lang]==null){
        console.error("LINE it!: invalid data-type or data-lang")
      }else{
        button.style.width=IMG_SIZE[type][lang][0]+"px";
        button.style.height=IMG_SIZE[type][lang][1]+"px";
        button.style.visibility="visible";
        button.style.position="static";
        button.setAttribute("scrolling","no");
        button.setAttribute("frameborder","0");
        button.setAttribute("allowtransparency","true");
        entry.parentNode.replaceChild(button,entry)}})};
    if(window.LineIt.loadButton==null){
      window.LineIt.loadButton=loadButton;
      window.addEventListener("message",function(event){
        if(/^https?\:\/\/lineit.line(\-[a-z]+)?\.me\/?/.test(event.origin)){
          var data=event.data;
          if(/^\/\/line(\-beta)?\.me\/R\/msg\/text\/\?/.test(data)){
            location.href=data}
          }}
          )}
      var readyState=document.readyState;
      if(readyState==="interactive"||readyState==="complete"){
        window.addEventListener("load",loadButton,false);
        loadButton()
      }else{
        document.addEventListener("DOMContentLoaded",loadButton,false)
      }
    })();



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request == "drop")
      var url = document.URL;
      sendResponse({link: url, title: document.title, description: getMetaContent("description"), image: getImage(url)});
  });



function getMetaContent(propName){
    var metas = document.getElementsByTagName('meta');
    for (i = 0; i < metas.length; i++){
        if (metas[i].getAttribute("name") == propName) {
            return metas[i].getAttribute("content");
        }
    }
    return "";
}

function getContentByMetaTagName(c){
        for (var b = document.getElementsByTagName('meta'), a = 0; a < b.length; a++){
          if (c == b[a].name || c == b[a].getAttribute('property')) { return b[a].content; }
        } return false;
 }

function getImage(url){
 	var thumbnail = '';

  	var suffix = /[^.]+$/.exec(url);

  	if(suffix == 'jpg' || suffix == 'jpeg' || suffix == 'gif' || suffix == 'png'){
     	image = url;
     	title = ''; 
  	}

  	thumbnail = getContentByMetaTagName('og:image');

  	if(!thumbnail){
     	var imgs = document.images;
     	for(var i =0; i < imgs.length; i++){
        	img = imgs[i];
        if((img.height > 40 && img.width > 40) && (img.height < 250 && img.width < 250)){
            thumbnail = img.src;
            return thumbnail; 
        } 
     }
    }else{
  		return thumbnail;
  	}

  	return "";
}
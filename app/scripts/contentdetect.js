chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request == "drop")

      sendResponse({link: document.URL, title: document.title, description: getMetaContent("description")});
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

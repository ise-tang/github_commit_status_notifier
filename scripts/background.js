var commitUrl = "";
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    commitUrl = request.url;
  }
);
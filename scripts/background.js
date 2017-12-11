// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  console.log("checkForValidUrl");
    if (/https:\/\/github\.com\/.*\/pull\//.test(tab.url)) {
      chrome.pageAction.show(tabId);
    }
  };

  // Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

var commitUrl = "";
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    commitUrl = request.url;
  }
);
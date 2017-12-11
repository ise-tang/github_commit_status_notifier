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

chrome.pageAction.onClicked.addListener(function(){
  notify('Pull Request CI Status', "start checking");

  console.log(commitUrl);
  var org_repo_re = /\/(.*?\/.*?)\/pull/;
  var org_repo = org_repo_re.exec(commitUrl)[1];

  var commits_re = /.*commits\/(.*?)$/;
  var commit = commits_re.exec(commitUrl)[1];
  
  var id = setInterval(function(){
    var xhr = new XMLHttpRequest();
    var url = "https://api.github.com/repos/" + org_repo + "/commits/" + commit + "/status?access_token=" + localStorage.getItem('token');
    xhr.open("GET", url)
    xhr.onload = function(){
      console.log(xhr.response["state"]);
      if (xhr.response["state"] != 'pending'){
        notify('Pull Request CI Status', "Result: " + xhr.response["state"]);
        clearInterval(id);
      }
    }
    xhr.responseType = 'json';
    xhr.send();
  }, 5 * 1000);
});

function notify(title, message) {
  var nid = "hoge";
  var notifier = chrome.notifications.create(
    nid,
    {
      type: "basic",
      iconUrl: "./images/info.png",
      title: title,
      message: message
      }, function(){}
  );

  setTimeout(function() {
    chrome.notifications.clear(nid);
  }, 3000);

  chrome.notifications.onClicked.addListener(function(nid){
    chrome.notifications.clear(nid);
  })
}
// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  console.log("checkForValidUrl");
  if (/https:\/\/github\.com\/.*\/pull\//.test(tab.url)) {
    chrome.pageAction.show(tabId);
  }
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

var commitUrl = "";
chrome.pageAction.onClicked.addListener(function(){
  var interval = 0;
  if (localStorage.getItem("interval") != undefined) {
    interval = Number(localStorage.getItem("interval")) * 1000;
  } else {
    interval = 10 * 1000;
  }

  // request commit url to content script
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {
      console.log(response.url);
      commitUrl = response.url;

      notify("Pull Request CI Status", "start checking");

      console.log(commitUrl);
      var org_repo_re = /\/(.*?\/.*?)\/pull/;
      var org_repo = org_repo_re.exec(commitUrl)[1];

      var commits_re = /.*commits\/(.*?)$/;
      var commit = commits_re.exec(commitUrl)[1];

      var id = setInterval(function(){
        var xhr = new XMLHttpRequest();
        var url = "https://api.github.com/repos/" + org_repo + "/commits/" + commit + "/status?access_token=" + localStorage.getItem("token");
        xhr.open("GET", url);
        xhr.onload = function(){
          console.log(xhr.response["state"]);
          if (xhr.response["state"] != "pending"){
            notify("Pull Request CI Status", "Result: " + xhr.response["state"]);
            clearInterval(id);
          }
        };
        xhr.responseType = "json";
        xhr.send();
      }, interval);
    });
  });


});

function notify(title, message) {
  var nid = Math.random().toString(36).slice(-16);
  chrome.notifications.create(
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
  }, 7000);

  chrome.notifications.onClicked.addListener(function(){
    var prUrl = /\/(.*?\/.*?\/pull\/.*?\/)/.exec(commitUrl)[1];
    chrome.tabs.create({"url": "https://github.com/" + prUrl});
  });
}

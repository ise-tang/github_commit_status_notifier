document.addEventListener('DOMContentLoaded', function(){
  var button = document.getElementById('button');
  button.addEventListener('click', function() {
    var commitUrl = chrome.extension.getBackgroundPage().commitUrl;
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
          notify('Pull Request Status', xhr.response["state"]);
          clearInterval(id);
        }
      }
      xhr.responseType = 'json';
      xhr.send();
    }, 5 * 1000);
  });
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

  chrome.notifications.onClicked.addListener(function(nid){
    chrome.notifications.clear(nid);
  })
}
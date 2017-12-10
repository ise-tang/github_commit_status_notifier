var commmitUrls = document.getElementsByClassName('commit-id');
var commmitUrl = commmitUrls[commmitUrls.length - 1].getAttribute('href');

chrome.runtime.sendMessage(
  { "url": commmitUrl },
  function(response) {
    console.log('sent message');
  }
);

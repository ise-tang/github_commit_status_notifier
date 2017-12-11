chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var commitUrls = document.getElementsByClassName('commit-id');
    var commitUrl = commitUrls[commitUrls.length - 1].getAttribute('href');
    console.log(commitUrl);

    sendResponse({'url': commitUrl});
  }
)
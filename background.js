chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({running: true}, function() {
    console.log("Extension is now running.")
  });
})

let isRunning = true;

chrome.storage.sync.get("running", function(data) {
  console.log("isRunning", data.running);
  isRunning = data.running;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log("isRunning", changes['running'].newValue);
  isRunning = changes['running'].newValue;
});

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {  // changes URL before render (way faster)
  if (isRunning && details.url.startsWith("https://www.youtube.com") && !details.url.endsWith("disable_polymer=1")) {
    let myUrl = details.url.indexOf("?") > -1 ? details.url.concat("&disable_polymer=1") : details.url.concat("?disable_polymer=1");
    chrome.tabs.update(details.tabId, {url: myUrl});
  }
})
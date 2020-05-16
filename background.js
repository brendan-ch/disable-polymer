chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({running: true}, function() {
    console.log("Extension is now running.")
  });
})

let isSecondLoad = false;
let originalUrl = "";

let isRunning = true;

// chrome.storage.sync.get("running", (data) => {
//   isRunning = data.running;
// })

chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log(changes['running'].newValue);
  isRunning = changes['running'].newValue;
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (isRunning) {
    const tabUrl = tab.url;
    let isVideo = tabUrl.startsWith("https://www.youtube.com/watch") ? true : false;
    // console.log("isVideo", isVideo);
    // console.log("isSecondLoad", isSecondLoad);
    // console.log("originalUrl", originalUrl);
    
    if (tabUrl.startsWith("https://www.youtube.com") && !tabUrl.endsWith("disable_polymer=1")) {
      // console.log("tabUrl", tabUrl);
      let myUrl = tabUrl.indexOf("?") > -1 ? tabUrl.concat("&disable_polymer=1") : tabUrl.concat("?disable_polymer=1");

      if (!isVideo || originalUrl !== tabUrl) {
        isSecondLoad = false;
        originalUrl = "";
      }

      if (!isSecondLoad) {
        console.log("Performing refresh");
        chrome.tabs.update(tabId, {url: myUrl});
      }

      if (isVideo) {
        console.log("Running second load");
        isSecondLoad = true;
        originalUrl = tabUrl
      }
    };
  }
})
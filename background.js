chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({running: true}, function() {
    console.log("Extension is now running.")
  });
})

// let isSecondLoad = false;
// let originalUrl = "";

let isRunning = true;

chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log(changes['running'].newValue);
  isRunning = changes['running'].newValue;
});

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {  // changes URL before render (way faster)
  if (isRunning && details.url.startsWith("https://www.youtube.com") && !details.url.endsWith("disable_polymer=1")) {
    let myUrl = details.url.indexOf("?") > -1 ? details.url.concat("&disable_polymer=1") : details.url.concat("?disable_polymer=1");
    chrome.tabs.update(details.tabId, {url: myUrl});
  }
})

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {  // nightmare nightmare nightmare nightmare nightmare nightmare nightmare nightmare nightmare nightmare 
//   console.log("tabId", tabId)
//   console.log("changeInfo status", changeInfo.status);
//   if (isRunning) {
//     const tabUrl = tab.url;
//     let isVideo = tabUrl.startsWith("https://www.youtube.com/watch") ? true : false;
//     // console.log("isVideo", isVideo);
//     // console.log("isSecondLoad", isSecondLoad);
//     // console.log("originalUrl", originalUrl);
    
//     if (tabUrl.startsWith("https://www.youtube.com") && !tabUrl.endsWith("disable_polymer=1")) {
//       // console.log("tabUrl", tabUrl);
//       let myUrl = tabUrl.indexOf("?") > -1 ? tabUrl.concat("&disable_polymer=1") : tabUrl.concat("?disable_polymer=1");

//       if (!isVideo || originalUrl !== tabUrl) {
//         isSecondLoad = false;
//         originalUrl = "";
//       }

//       if (changeInfo.status !== "complete" && isSecondLoad === false) {
//         // console.log("Performing refresh");
//         chrome.tabs.update(tabId, {url: myUrl});
//       }

//       if (isVideo) {
//         // console.log("Running second load");
//         isSecondLoad = true;
//         originalUrl = tabUrl
//       }
//     };
//   }
// })
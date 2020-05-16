chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({running: true}, function() {
    console.log("Extension is now running.")
  });

  chrome.storage.sync.set({videoPage: {isVideo: false, isSecondLoad: false}}, () => null)

  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostEquals: 'www.youtube.com'},
  //     })
  //     ],
  //         actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });
})

let isSecondLoad = false;
let originalUrl = "";

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  const tabUrl = tab.url;
  let isVideo = tabUrl.startsWith("https://www.youtube.com/watch") ? true : false;
  console.log("isVideo", isVideo);
  console.log("isSecondLoad", isSecondLoad);
  console.log("originalUrl", originalUrl);

  // chrome.storage.sync.get("videoPage", (data) => {
  //   // console.log(data.videoPage.isVideo);
  //   // console.log(data.videoPage.isSecondLoad);

  //   isVideo = data.videoPage.isVideo;
  //   isSecondLoad = data.videoPage.isSecondLoad;
  // })

  // if (tabUrl.startsWith("https://www.youtube.com/watch")) {
  //   isVideo = true;
  // } else {
  //   isVideo = false;
  // }
  
  if (tabUrl.startsWith("https://www.youtube.com") && !tabUrl.endsWith("disable_polymer=1")) {
    console.log("tabUrl", tabUrl);
    let myUrl = tabUrl.indexOf("?") > -1 ? tabUrl.concat("&disable_polymer=1") : tabUrl.concat("?disable_polymer=1");
    // if (tabUrl.indexOf("?") > -1) {
    //   myUrl = tabUrl.concat("&disable_polymer=1");
    // } else {
    //   myUrl = tabUrl.concat("?disable_polymer=1");
    // }

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
})
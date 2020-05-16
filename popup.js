let button = document.getElementById('toggleButton');
let text = document.getElementById('text');

chrome.storage.sync.get("running", (data) => {
  if (data.running) {
    button.innerText = "Turn off";
    text.innerText = "This extension is currently running.";
  } else {
    button.innerText = "Turn on";
    text.innerText = "This extension is currently disabled.";
  }
})

button.onclick = () => {
  chrome.storage.sync.get("running", (data) => {
    if (data.running) {
      button.innerText = "Turn on";
      text.innerText = "This extension is currently disabled.";
      chrome.storage.sync.set({running: false}, function () {
        console.log("Extension is no longer running.")
      })
    } else {
      button.innerText = "Turn off";
      text.innerText = "This extension is currently running.";
      chrome.storage.sync.set({running: true}, function () {
        console.log("Extension is currently running.")
      })
    }
  });
}
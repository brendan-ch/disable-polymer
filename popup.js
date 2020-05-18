let polymer = document.getElementById('polymer-button');
let classic = document.getElementById('classic-button');

chrome.storage.sync.get("running", (data) => {
  classic.style.backgroundColor = data.running ? "#c4d9ff" : "#ffffff";
  polymer.style.backgroundColor = data.running ? "#ffffff" : "#c4d9ff";

  // classic.style.borderColor = data.running ? "#005bff" : '#ffffff';
  // polymer.style.borderColor = data.running ? "#ffffff" : "#005bff";
})

chrome.storage.onChanged.addListener(function(changes, namespace) {
  classic.style.backgroundColor = changes["running"].newValue ? "#c4d9ff" : "#ffffff";
  polymer.style.backgroundColor = changes["running"].newValue ? "#ffffff" : "#c4d9ff";
})

polymer.onclick = () => {
  chrome.storage.sync.set({running: false}, function () {
    console.log("Polymer mode saved.")
  })
}

classic.onclick = () => {
  chrome.storage.sync.set({running: true}, function () {
    console.log("Classic mode saved.")
  })
}

// button.onclick = () => {
//   chrome.storage.sync.get("running", (data) => {
//     if (data.running) {
//       button.innerText = "Turn on";
//       text.innerText = "This extension is currently disabled.";
//       chrome.storage.sync.set({running: false}, function () {
//         console.log("Extension is no longer running.")
//       })
//     } else {
//       button.innerText = "Turn off";
//       text.innerText = "This extension is currently running.";
//       chrome.storage.sync.set({running: true}, function () {
//         console.log("Extension is currently running.")
//       })
//     }
//   });
// }
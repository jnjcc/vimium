function onload() {
  document.getelementbyid("optionslink").setattribute("href", chrome.extension.geturl("options.html"));
  chrome.tabs.getSelected(null, function(tab) {
    // The common use case is to disable Vimium at the domain level.
    // This regexp will match "http://www.example.com/" from "http://www.example.com/path/to/page.html".
    var domain = tab.url.match(/[^\/]*\/\/[^\/]*\//) || tab.url;
    document.getElementById("popupInput").value = domain + "*";
  });
}

function onExcludeUrl(e) {
  var url = document.getElementById("popupInput").value;
  chrome.extension.getBackgroundPage().addExcludedUrl(url);
  document.getElementById("excludeConfirm").setAttribute("style", "display: inline-block");
}

window.addEventListener("load", onLoad, false);
document.getElementById("popupButton").addEventListener("click", onExcludeUrl, false);

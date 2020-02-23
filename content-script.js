var browser = chrome;
// 拷贝到剪贴板
function CopyLinkNameandurlToClipboard(text) {
  function oncopy(event) {
    document.removeEventListener("copy", oncopy, true);
    // Hide the event from the page to prevent tampering.
    event.stopImmediatePropagation();

    // Overwrite the clipboard content.
    event.preventDefault();
    event.clipboardData.setData("text/plain", text);
  }
  document.addEventListener("copy", oncopy, true);

  // Requires the clipboardWrite permission, or a user gesture:
  document.execCommand("copy");
}


// 在链接上右键菜单激活时通知后台这个链接的信息，后台能获得url但是得不到text
function notifyClnuExtensionBackgroudjs(e) {
  var ele = e.target;
  if (ele.tagName == "A") {
    browser.runtime.sendMessage({"url": ele.href, "name":ele.textContent});
  } else if (ele.tagName == "IMG" ) {
    var url = ele.parentNode.href;
    var name = ele.alt || ele.src;
    browser.runtime.sendMessage({"url": url, "name":name});
  }
}

browser.runtime.onMessage.addListener(CopyLinkNameandurlToClipboard);
window.addEventListener("contextmenu", notifyClnuExtensionBackgroudjs);


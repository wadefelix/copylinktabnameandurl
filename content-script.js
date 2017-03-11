
// 拷贝到剪贴板
function CopyLinkNameandurlToClipboard(msg)
{
    var txtToCopy = document.createElement('input');
    txtToCopy.style.left = '-300px';
    txtToCopy.style.position = 'absolute';
    txtToCopy.value = msg;
    document.body.appendChild(txtToCopy);
    txtToCopy.select();
    document.execCommand('copy');
    txtToCopy.parentNode.removeChild(txtToCopy);
}

// 在链接上右键菜单激活时通知后台这个链接的信息，后台能获得url但是得不到text
function notifyClnuExtensionBackgroudjs(e) {
  if (e.target.tagName == "A") {
    var ele = e.target;
    browser.runtime.sendMessage({"url": ele.href, "name":ele.innerHTML});
  } else if (e.target.tagName == "IMG" ) {
    var ele = e.target;
    var name = "";
    var url = ele.parentNode.href;
    if (ele.alt) {
      name = ele.alt;
    } else {
      name = ele.src;
    }
    browser.runtime.sendMessage({"url": url, "name":name});
  }
}

browser.runtime.onMessage.addListener(CopyLinkNameandurlToClipboard);
window.addEventListener("contextmenu", notifyClnuExtensionBackgroudjs);


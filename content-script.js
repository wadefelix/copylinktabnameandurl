

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

browser.runtime.onMessage.addListener(CopyLinkNameandurlToClipboard);

window.addEventListener("contextmenu", notifyClnuExtensionBackgroudjs);

function notifyClnuExtensionBackgroudjs(e) {
  if (e.target.tagName != "A") {
    return;
  }
  var ele = e.target;
  browser.runtime.sendMessage({"url": ele.href, "name":ele.innerHTML});
}
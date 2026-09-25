/*
Create all the context menu items.
*/

chrome.storage.local.get("formats", (result) => {
  var formats;
  if (!result || !result["formats"]) {
    formats = Array({ name: "markdown", format: "[%T](%U)" });
  } else {
    formats = JSON.parse(result["formats"]);
  }

  var prefix = chrome.i18n.getMessage("contextMenuItemOnLink") + " - ";
  if (formats.length > 1) {
    prefix = "";
  }
  for (var i in formats) {
    chrome.contextMenus.create({
      id: "clnu-link-context-n" + i,
      title: prefix + formats[i].name,
      contexts: ["link"],
    });
    chrome.contextMenus.create({
      id: "clnu-tab-context-n" + i,
      title: prefix + formats[i].name,
      contexts: ["page"],
    });
  }
});

//保存contentjs发送来的链接信息
chrome.runtime.onMessage.addListener(function (info) {
  chrome.storage.local.set({ _linkinfo: info });
});

function formatMsgAndSend(formatid, tabid, url, title) {
  chrome.storage.local.get("formats", (result) => {
    var formats;
    if (!result || !result["formats"]) {
      formats = Array({ name: "markdown", format: "[%T](%U)" });
    } else {
      formats = JSON.parse(result["formats"]);
    }
    formatvalue = formats[formatid].format || "%U %T";
    chrome.tabs.sendMessage(
      tabid,
      formatvalue.replace("%U", url).replace("%T", title),
    );
  });
}

function CopyOnLink(info, tab, id) {
  chrome.storage.local.get(["_linkinfo"], function (result) {
    var _linkinfo = result["_linkinfo"];
    if (
      _linkinfo != undefined &&
      _linkinfo != null &&
      _linkinfo.url != undefined
    ) {
      formatMsgAndSend(id, tab.id, _linkinfo.url, _linkinfo.name);
    }
  });
}
function CopyOnTab(tab, id) {
  formatMsgAndSend(id, tab.id, tab.url, tab.title);
}

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith("clnu-link-context-n")) {
    var id = Number(info.menuItemId.substr(19));
    CopyOnLink(info, tab, id);
  } else if (info.menuItemId.startsWith("clnu-tab-context-n")) {
    var id = Number(info.menuItemId.substr(18));
    CopyOnTab(tab, id);
  }
});

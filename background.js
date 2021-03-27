/*
Create all the context menu items.
*/
var browser=chrome;


browser.storage.local.get("formats",(result)=>{
    var formats;
    if (!result || !result["formats"]) {
        formats = Array({"name": "markdown", "format": "[%T](%U)"})
    } else {
        formats = JSON.parse(result["formats"])
    }
    
    var prefix = browser.i18n.getMessage("contextMenuItemOnLink") + ' - ';
    if (formats.length>1) {
        prefix = ""
    }
    for (var i in formats) {
        browser.contextMenus.create({
            id: "clnu-link-context-n"+i,
            title: prefix+formats[i].name,
            contexts: ["link"]
        });
        browser.contextMenus.create({
            id: "clnu-tab-context-n"+i,
            title: prefix+formats[i].name,
            contexts: ["page"]
        });
    }
})



var _linkinfo; //保存contentjs发送来的链接信息
browser.runtime.onMessage.addListener(function (info) {
  _linkinfo = info;
});

function formatMsgAndSend(formatid, tabid, url, title) {
  browser.storage.local.get('formats',(result) => {
    var formats;
    if (!result || !result["formats"]) {
        formats = Array({"name": "markdown", "format": "[%T](%U)"})
    } else {
        formats = JSON.parse(result["formats"])
    }
    formatvalue = formats[formatid].format || '%U %T';
    browser.tabs.sendMessage(tabid, formatvalue.replace('%U',url).replace('%T', title));
  });
}

function CopyOnLink(info,tab,id)
{
  if (_linkinfo!=undefined && _linkinfo != null && _linkinfo.url != undefined) {
    formatMsgAndSend(id, tab.id, _linkinfo.url, _linkinfo.name);
  }
}
function CopyOnTab(tab,id)
{
  formatMsgAndSend(id, tab.id, tab.url, tab.title);
}

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.contextMenus.onClicked.addListener((info, tab)=>{
  if (info.menuItemId.startsWith("clnu-link-context-n")) {
    var id = Number(info.menuItemId.substr(19))
    CopyOnLink(info,tab, id);
  } else if (info.menuItemId.startsWith("clnu-tab-context-n")) {
    var id = Number(info.menuItemId.substr(18))
    CopyOnTab(tab, id);
  }
});



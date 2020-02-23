/*
Create all the context menu items.
*/
var browser=chrome;

browser.contextMenus.create({
  id: "clnu-link-context-n",
  title: browser.i18n.getMessage("contextMenuItemOnLink"),
  contexts: ["link"]
});

browser.contextMenus.create({
  id: "clnu-tab-context-n",
  title: browser.i18n.getMessage("contextMenuItemOnTab"),
  contexts: ['page']
});



var _linkinfo; //保存contentjs发送来的链接信息
browser.runtime.onMessage.addListener(function (info) {
  _linkinfo = info;
});

function CopyOnLink(info,tab)
{
  browser.storage.local.get('format', (res) => {
    if (_linkinfo!=undefined && _linkinfo != null && _linkinfo.url != undefined) {
    formatvalue = res.format || '%U %T';
    browser.tabs.sendMessage(tab.id, formatvalue.replace('%U',_linkinfo.url).replace('%T',_linkinfo.name));
    }
  });
    //browser.tabs.sendMessage(tab.id, _linkinfo.url+ ' '+ _linkinfo.name);
}
function CopyOnTab(tab)
{
  browser.storage.local.get('format',(res) => {
    formatvalue = res.format || '%U %T';
    browser.tabs.sendMessage(tab.id, formatvalue.replace('%U',tab.url).replace('%T', tab.title));
  });
    //browser.tabs.sendMessage(tab.id,tab.url+ ' '+ tab.title);
}

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "clnu-link-context-n":
      CopyOnLink(info,tab);
      break;
    case "clnu-tab-context-n":
      CopyOnTab(tab);
      break;
  }
});



/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated(n) {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create all the context menu items.
*/
browser.contextMenus.create({
  id: "clnu-link-context-n",
  title: browser.i18n.getMessage("contextMenuItemOnLink"),
  contexts: ["link"]
}, onCreated);
browser.contextMenus.create({
  id: "clnu-tab-context-n",
  title: browser.i18n.getMessage("contextMenuItemOnTab"),
  contexts: ["all"]
}, onCreated);

function CopyOnLink(info,tab)
{
    browser.tabs.sendMessage(tab.id,info.linkUrl+ ' '+ 'link');
}
function CopyOnTab(tab)
{
    browser.tabs.sendMessage(tab.id,tab.url+ ' '+ tab.title);
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

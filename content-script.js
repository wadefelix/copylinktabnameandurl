

function CopyLinkNameandurlToClipboard(msg)
{
    var txtToCopy = document.createElement('input');
    txtToCopy.style.left = '-300px';
    txtToCopy.style.position = 'absolute';
    txtToCopy.value = msg;
    document.body.appendChild(txtToCopy);
    txtToCopy.select();

    console.log(txtToCopy.value);
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);

    //txtToCopy.parentNode.removeChild(txtToCopy);
}

browser.runtime.onMessage.addListener(CopyLinkNameandurlToClipboard);
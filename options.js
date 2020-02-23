function saveOptions(e) {
  browser.storage.local.set({
    format: document.querySelector("#format").value
  });
  e.preventDefault();
}

function restoreOptions() {
  browser.storage.local.get('format', (res) => {
    document.querySelector("#format").value = res.format || '%U %T';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

var browser=chrome;

document.getElementById("optionslegend").innerText = browser.i18n.getMessage("stringOptionsLegend");
document.getElementById("Options").innerText = browser.i18n.getMessage("stringOptions");
document.getElementById("btnsave").innerText = browser.i18n.getMessage("stringSave");
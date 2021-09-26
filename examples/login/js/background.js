window.account = null;
function loadJson() {
	fetch(chrome.runtime.getURL('data/a.json')).then((response) => response.json()).then((json) => window.account = json);
}
loadJson();

function getAccount(url) {
	var domain = url.split("/");
	var account = (window.account)[domain[2]]
	return account;
}
var lock = false;
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
	if (info.status == "complete" && !lock) {
		lock = true;
		setTimeout(function() {
			lock = false
		}, "1500");
		var data = getAccount(tab.url);
		if (data == null) {
			return;
		}
		chrome.tabs.sendMessage(tabId, {
			data: data
		});	
	}
})


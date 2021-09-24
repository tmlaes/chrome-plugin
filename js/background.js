window.data = null;
//加载本地数据
function loadLocalData() {
	fetch(chrome.runtime.getURL('data/data.json')).then((response) => response.json()).then((json) => window.data =
		json);
}

//当标签页属性更新时
var lock = false
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
	if (info.status == "complete" && !lock) {
		lock = true;
		// alert(tabId + "===" + JSON.stringify(info) + "===" + JSON.stringify(tab))
		setTimeout(function() {
			chrome.tabs.sendMessage(tabId, {
				data: data
			});
			lock = false;
		}, "1000");
	}
})

function reddenPage() {
	var getPixelRatio = function(context) { // 获取设备的PixelRatio
		var backingStore = context.backingStorePixelRatio ||
			context.webkitBackingStorePixelRatio ||
			context.mozBackingStorePixelRatio ||
			context.msBackingStorePixelRatio ||
			context.oBackingStorePixelRatio ||
			context.backingStorePixelRatio || 1;
		return (window.devicePixelRatio || 1) / backingStore;
	};
	var shareContent = document.body;
	var width = shareContent.offsetWidth;
	var height = shareContent.offsetHeight;
	var canvas = document.createElement("canvas");
	var context = canvas.getContext('2d');
	var scale = getPixelRatio(context);
	canvas.width = width * scale;
	canvas.height = height * scale;
	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';
	context.scale(scale, scale);
	
	var opts = {
		scale: scale,
		canvas: canvas,
		width: width,
		height: height,
		dpi: window.devicePixelRatio
	};
	html2canvas(shareContent, opts).then(function(canvas) {
		context.mozImageSmoothingEnabled = false;
		context.webkitImageSmoothingEnabled = false;
		context.msImageSmoothingEnabled = false;
		context.imageSmoothingEnabled = false;
		var dataUrl = canvas.toDataURL('image/png', 1.0);
		var newImg = document.createElement("img");
		newImg.src = dataUrl;
		newImg.width = width;
		newImg.height = height;
	
		// 生成一个a元素
		var a = document.createElement('a')
		// 创建一个单击事件
		var event = new MouseEvent('click')
		// 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
		a.download = name || '下载图片名称'
		// 将生成的URL设置为a.href属性
		a.href = newImg.src
		// 触发a的单击事件
		a.dispatchEvent(event)
	});
}

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: {
			tabId: tab.id
		},
		function: reddenPage
	});
});

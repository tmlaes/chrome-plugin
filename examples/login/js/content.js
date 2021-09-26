chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		setTimeout(function() {
			var user_input = request.data.user_input;
			var pwd_input = request.data.pwd_input;
			var login_input = request.data.login_input;
			var userName = document.querySelectorAll(user_input);
			var password = document.querySelectorAll(pwd_input);
			if (userName.length<1 || password.length<1) {
				return
			}
			userName[0].value = request.data.name;
			password[0].value = request.data.pwd;
			// vue触发刷新内存值
			userName[0].dispatchEvent(new Event('input'));
			password[0].dispatchEvent(new Event('input'));
			//querySelector默认选择第一个元素  querySelectorAll选择所有元素
			// document.querySelector(login_input).click();
			$(login_input).trigger("click");
			// jQuery触发事件 $("#test").trigger("click");

		}, 100);
	}
);

var dailoghtml = `
	<div class="wzz_dialog">
		<div class="wzz_content">
			<span>关键词：<input id="wzz_key_word" AUTOCOMPLETE="off" /></span>
			<span>服务：<input id="wzz_service" AUTOCOMPLETE="off" /></span>
			<span>trackNumber：<input id="wzz_trackNumber" AUTOCOMPLETE="off" /></span>
		</div>
		<div class="wzz_handler">
			<button id="wzz_search">搜&nbsp;&nbsp;索</button>
		</div>
	</div>
`;


setTimeout(function() {
	var style = document.createElement('link');
	style.href = chrome.extension.getURL('css/custom.css');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	document.head.appendChild(style);

	var div = document.createElement('div');
	div.setAttribute('class', 'wzz_box');
	div.innerHTML = dailoghtml
	document.body.appendChild(div)
	bind()
}, 1500)


function bind() {
	$("#wzz_search").click(function() {		
		search()
	})
}

$(document).keypress(function(e){
	let eCode = e.keyCode?e.keyCode:e.which?e.which:e.charCode;
	if(eCode==13) {
		if ($(".wzz_box").css('display') == 'none') {
			isShow=true;
			$(".wzz_box").show();
		}else{
			search()
		}	
	}
})

function search() {
	let search_word ="";
	let key_word = $("#wzz_key_word").val();
	let service = $("#wzz_service").val();
	let trackNumber = $("#wzz_trackNumber").val();
	if(service !=null && service !='') {
		search_word = "appName:"+service
	}
	if(trackNumber !=null && trackNumber !='') {
		search_word = search_word+ " AND trackNumber:"+trackNumber
	}
	
	if(key_word !=null && key_word !='') {
		search_word = search_word+" AND \""+key_word+"\""
	}
	if (search_word.indexOf("AND") < 4 && search_word.indexOf("AND") >-1) {
		search_word = search_word.substring(search_word.indexOf("AND")+3)
	}
	
	if(search_word !=null && search_word !='') {
		let input = document.querySelector(".ng-valid-query-input")
		input.value = search_word
		input.dispatchEvent(new Event('input'));
		$("button[type=submit]").trigger("click");
	}
	$(".wzz_box").hide();
}

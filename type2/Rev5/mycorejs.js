
var jsversion = "2503.v08";
var dat = null;

function refresh() {
	let elemContent = "";
	if(!dat) {
		dat = getJsonData();
	}
	for(var i = 0; i < dat.length; i++) {
		elemContent = elemContent + getHtmlContent(dat[i]);
		elemContent = elemContent + ' <b>End</b> (cleanup)<br /><br />';
	}
	elemContent = elemContent + '<p><u>Possible items to buy:</u></p>';
	for(var i = 0; i < dat.length; i++) {
		elemContent = elemContent + findAndGetBuyLikeContent(dat[i]);
	}
	elemContent = elemContent + '<br /><br />';
	document.getElementById("contentarea").innerHTML = elemContent;
	let footerAreaDiv = document.getElementById("footerarea");
	let footerAreaDivContent = ' End of action | <button onclick="resetAllCheckbox();"> Reset </button> Ver: ' + jsversion; 
	footerAreaDiv.innerHTML = footerAreaDivContent;
};

function getHtmlContent(obj) {
	let content = "";
	let line = null;
	for(var i = 0; i < obj.length; i++) {
		line = obj[i];
		content = content + "<span id = 'span_" + line.id + "'><input type='checkbox' onclick='updateObj(this);'" + setIfChecked(line) + " id='cbx_" + line.id + "' /><b> " + line.hd + " </b> (" + line.params + ") "+ getLink("lnk", line.link); + "</span>";
	}
	return content;
};

function getLink(label, url) {
	if(url) {
		return "<a href='https://" + url + "/' target='_blank'>" + label + "</a> ---";
	} else {
		return " ---";
	}
}

function setIfChecked(jsonline) {
	if(jsonline.checked) {
		return " checked ";
	} else {
		return "";
	}
	
}

function findAndGetBuyLikeContent(obj) {
	let content = "";
	let line = null;
	for(var i = 0; i < obj.length; i++) {
		line = obj[i];
		if(isKeywordMatch(line.hd)) {
			content = content + "<br/><span id = 'span_buy_" + line.id + "'><input type='checkbox' id='cbx_buy_" + line.id + "' /><b> " + line.hd + " </b> (" + line.params + ") </span>";
		}
	}
	return content;
};

function isKeywordMatch(str) {
	const keywords = ["buy","Buy","Pick","pick","Return","return"];
	for(var i=0; i < keywords.length; i++) {
		if(str.includes(keywords[i])) {
			return true;
		}
	}
	return false;
};

function contentRefresh(obj) {
	//document.getElementById("startBtn").style.display = 'none';
	//document.getElementById("minmaxBtn").style.display = 'block';
	var content = "";
	var line = null;
	var hasPendingTask = false;
	let ctr = 0;
	for(var i = 0; i < obj.length; i++) {
		line = obj[i];
		if(!line.checked) {
			content = content + "<input type='checkbox' onclick='updateObj(this);' id='cbx" 
			+ line.id + "' /><span class='task-time'> " + line.time + " </span><span class='task-word'>" + line.task + "</span> (<span class='task-params'>" + line.params + "</span>) <a href='https://" + line.link + "/' target='_blank'>link</a><br />";
			hasPendingTask = true;
			if(ctr == 4) {
				ctr = 0;
				content = content + '<br/>';				
			}
			ctr++;
		}
	}
	for(var i = 0; i < obj.length; i++) {
		line = obj[i];
		if(line.checked) {
			content = content + "<input type='checkbox' onclick='updateObj(this);' id='cbx" 
			+ line.id + "' checked /><span style='color:#aaaaaa'> " + line.time + " <b>" + line.task + "</b> (" + line.params + ") done </span><br />";
		}
	}
	let footerAreaDiv = document.getElementById("footerarea");
	let footerAreaDivContent = ' End of action | <button onclick="resetAllCheckbox();"> Reset </button> Ver: ' + jsversion; 
	footerAreaDiv.innerHTML = footerAreaDivContent;
	if(!hasPendingTask) {
		content = content + "<hr /> Hurray! All tasks completed. Have a nice day";
	}
	if(content) {
		document.getElementById("contentarea").innerHTML = content;
	}
}

function c_updateObj(thiz) {
	
};

function updateObj(thiz) {
	for(var i = 0; i < dat.length; i++) {
		for(var j = 0; j < dat[i].length; j++) {
			if(thiz.id == 'cbx_' + dat[i][j].id) {
				dat[i][j].checked = thiz.checked;
			}
		}
	}
	refresh();
}

function resetAllCheckbox() {
	dat = getJsonData();
	refresh();
}	
	
function _resetAllCheckbox() {
	for(var i = 0; i < dat.length; i++) {
		for(var j = 0; j < dat[i][j].length; j++) {
			dat[i][j].checked = false;
		}
	}
	refresh();
}

function minmax() {
	let contentAreaDiv = document.getElementById("contentarea");
	let minmaxBtnElem = document.getElementById("minmaxBtn");
	let headerareaDivElem = document.getElementById("headerarea");
	if(contentAreaDiv.style.display == 'none') {
		contentAreaDiv.style.display = 'block';
		minmaxBtnElem.innerHTML = "minimize";
		headerareaDivElem.setAttribute('class', 'window-title-active');
		headerareaDivElem.classList.remove('window-title-inactive');
	} else {
		contentAreaDiv.style.display = 'none';
		minmaxBtnElem.innerHTML = "maximize";
		headerareaDivElem.setAttribute('class', 'window-title-inactive');
		headerareaDivElem.classList.remove('window-title-active');
	}
}

function toggleST(elem) {	
  if (elem.classList.contains('strikethrough')) {
      elem.classList.remove("strikethrough");
  } else {
      elem.setAttribute('class', 'strikethrough');
  }	
}

var dat = null;

function contentRefresh(obj) {
	var content = "";
	var line = null;
	var hasPendingTask = false;
	if(!obj) {
		obj = dat;
	}
	for(var i = 0; i < obj.length; i++) {
		line = obj[i];
		if(!line.checked) {
			content = content + "<input type='checkbox' onclick='updateObj(this);' id='cbx" 
			+ line.id + "' /> " + line.time + " <b>" + line.task + "</b> (" + line.params + ") <a href='https://" + line.link + "/' target='_blank'>link</a><br />";
			hasPendingTask = true;
		}
	}
	for(var i = 0; i < obj.length; i++) {
		line = obj[i];
		if(line.checked) {
			content = content + "<input type='checkbox' onclick='updateObj(this);' id='cbx" 
			+ line.id + "' checked /><span style='color:#aaaaaa'> " + line.time + " <b>" + line.task + "</b> (" + line.params + ") done </span><br />";
		}
	}
	if(!hasPendingTask) {
		content = content + "<hr /> Hurray! All tasks completed. Have a nice day";
	}
	if(content) {
		document.getElementById("contentarea").innerHTML = content;
	}
}


function updateObj(thiz) {
	for(var i = 0; i < dat.length; i++) {
		if(thiz.id == 'cbx' + dat[i].id) {
			dat[i].checked = thiz.checked;
		}
	}
	contentRefresh();
}


function toggleST(elem) {	
  if (elem.classList.contains('strikethrough')) {
      elem.classList.remove("strikethrough");
  } else {
      elem.setAttribute('class', 'strikethrough');
  }	
}
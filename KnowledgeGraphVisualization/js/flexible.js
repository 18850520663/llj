(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 24;
    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function(e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);

const optionNum = [];
var linkNum = 7;
function addNode(index) {
	if(optionNum[index] == undefined) {
		optionNum[index] = 5;
	}else if(++optionNum[index] > 9) {
		alert("已超出最大链数！");
		return;
	}
	let lable = $('.p1')[index];
	let image = document.createElement('img');
	image.setAttribute('src', 'img/link_point.png');
	image.setAttribute('class', "link");
	image.setAttribute("style","margin-right: 0px;margin-left: 0px;");
	lable.appendChild(image);
	let selector = document.createElement('select');
	for(let i = 1;i <= 5;i++) {
		selector.add(new Option(i));
	}
	lable.appendChild(selector);
}

function addLink() {
	if(linkNum === 11) {       // 在此修改最大问题链数（需要+1）
		alert("已达到最大数量！");
		return;
	}
	let div = document.getElementById('prediction1');
	let lable = document.createElement('lable');
	lable.classList.add('p1');
	lable.innerText = '预测问题链' + linkNum + " ";
	div.appendChild(lable);
	let selector1 = document.createElement('select');
	for(let i = 1;i<=5;i++) {
		selector1.add(new Option(i));
	}
	lable.appendChild(selector1);
	for(let i = 0;i<4;i++) {
		let image = document.createElement('img');
		let selector = document.createElement('select');
		image.setAttribute('src', 'img/link_point.png');
		image.setAttribute("style","margin-right: 1px;margin-left: 0px;");
		image.classList.add('link');
		lable.appendChild(image);
		for(let i = 1;i<=5;i++) {
			selector.add(new Option(i));
		}
		lable.appendChild(selector);
	}
	let button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('value', '添加节点');
	let br = document.createElement('br');
	button.setAttribute('onclick', 'addNode(' + (linkNum - 1) + ')');
	lable.appendChild(button);
	lable.appendChild(br);
	linkNum++;
}


function reduceLink(){
	if(linkNum === 1) {       // 在此修改最大问题链数（需要+1）
		alert("已达到最大数量！");
		return;
	}
	let div = document.getElementById('prediction1');
	
}
//function loadContent() {
	//let content = document.getElementById('content');
	//content.innerHTML = window.localStorage.getItem('content');
//}

//loadContent();
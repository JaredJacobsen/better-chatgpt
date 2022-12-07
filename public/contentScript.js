/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/contentScript.js ***!
  \******************************/
if (window.location.href === 'https://chat.openai.com/chat') {
	let textArea;
	let transcript = '';
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = false;
	recognition.interimResults = false;

	let recognizing = false;
	recognition.onstart = function () {
		textArea.parentElement.style.borderColor = 'red';
		//textArea.value = '';
		recognizing = true;
		transcript = '';
	};
	recognition.onresult = function (event) {
		// Get the current value of the text area
		var enteredText = textArea.value;
		transcript = '';
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			transcript += event.results[i][0].transcript;
		}
		textArea.focus();
		textArea.value = transcript;
		let ev = new Event('input', { bubbles: true});
        	textArea.dispatchEvent(ev);
		textArea.value = enteredText + " " + transcript;
	};
	recognition.onend = function () {
		textArea.parentElement.style.borderColor = 'lightgray';
		recognizing = false;
		transcript = '';
		//textArea.parentElement.querySelector('button').click();
	};
	recognition.onerror = function (event) {
		console.log('error', event);
		textArea.parentElement.style.borderColor = 'lightgray';
	};

	document.addEventListener(
		'keydown',
		(e) => {
			if (e.code === 'Tab') {
				e.preventDefault();
				e.stopImmediatePropagation();
				textArea = document.querySelector('textarea');
				if (recognizing) {
					recognizing = false;
					recognition.stop();
				} else recognition.start();
			}
		},
		true
	);
} else {
	let iframe = document.getElementById('ext-iframe');
	if (iframe) {
		iframe.style.width = iframe.style.width === '0px' ? '500px' : '0px';
	} else {
		iframe = document.createElement('iframe');
		iframe.id = 'ext-iframe';
		iframe.allow = 'microphone;';
		iframe.src = chrome.runtime.getURL('index.html');
		iframe.style.background = 'transparent';
		iframe.style.height = '100%';
		iframe.style.width = '500px';
		iframe.style.overflow = 'hidden';
		iframe.style.position = 'fixed';
		iframe.style.top = '0px';
		iframe.style.right = '0px';
		iframe.style.zIndex = '90000000';
		iframe.style.border = '0px';
		iframe.style.borderLeft = 'lightgray 1px solid';
		document.body.appendChild(iframe);
	}
}

/******/ })()
;
//# sourceMappingURL=contentScript.js.map

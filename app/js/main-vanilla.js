'use strict';

// General functions
function log(logText) {
	console.log(logText);
}
function hasClass(element, cls) {
	return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function addClass(element, cls) {
	if (!hasClass(element, cls)) {
		var empty = '';
		if (element.classList.value != "") empty = ' ';
		element.className += empty + cls;
	}
}

function removeClass(element, cls) {
	if (hasClass(element, cls)) {
		element.classList.remove(cls);
	}
}

function toggleClass(element, cls) {
	if (hasClass(element, cls)) {
		removeClass(element, cls);
	} else {
		addClass(element, cls);
	}
}

function exists(element) {
	return typeof element != 'undefined' && element != null;
}

(function () {
	document.addEventListener("DOMContentLoaded", function () {
		var _this = this;

		var d = document;
		var classes = {
			active: 'active',
			menuActive: 'v-nav__menu_active'

			// Anchors links
		};function scrollTo(element, to, duration) {
			if (duration <= 0) return;
			var difference = to - element.scrollTop - 75;
			var perTick = difference / duration * 10;
			setTimeout(function () {
				element.scrollTop = element.scrollTop + perTick;
				if (element.scrollTop === to) return;
				scrollTo(element, to, duration - 10);
			}, 10);
		}

		// Anchors
		var anchors = d.getElementsByClassName('anchor');

		for (var _i = 0; _i < anchors.length; _i++) {
			anchors[_i].addEventListener('click', function (e) {
				e.preventDefault();
				var href = _this.getAttribute("href").replace("#", "");
				var scrollAnchor = document.getElementById(href);
				scrollTo(document.body, scrollAnchor.offsetTop, 600);
			});
		}

		// Navigation
		var jsNav = d.getElementById('navigation');

		// Navigation links
		var jsNavLinks = d.querySelectorAll('.nav__menu a[href*="#"]');

		for (var i = 0; i < jsNavLinks.length; i++) {
			jsNavLinks[i].addEventListener('click', function (e) {
				e.preventDefault();

				var vnavhref = _this.getAttribute("href").replace("#", "");
				var vnavscrollAnchor = document.getElementById(vnavhref);

				removeClass(jsNavBtn, classes.active);
				removeClass(jsNav, classes.menuActive);

				scrollTo(document.body, vnavscrollAnchor.offsetTop, 600);
			});
		}

		// Button menu
		var jsNavBtn = d.getElementById('js-vnav__btn');

		if (exists(jsNavBtn)) {
			jsNavBtn.addEventListener('click', function () {
				toggleClass(this, classes.active);
				toggleClass(jsNav, classes.menuActive);
			});
		}

		// Click on toggle element in navigation
		var jsNavText = d.getElementById('js-nav-text');
		if (exists(jsNavText)) {
			jsNavText.addEventListener('click', function () {
				toggleClass(this, classes.active);
			});
		}

		// Modal Window initialization
		var themeModal = 'vmodal';
		var modalBtn = d.querySelectorAll('[data-action="' + themeModal + '"]');
		var modalBtnL = modalBtn.length;

		var modal = d.querySelectorAll('.' + themeModal);
		var modalL = modal.length;

		var modalBtnClose = d.querySelectorAll('[data-close="' + themeModal + '"]');
		var modalBtnCloseL = modalBtnClose.length;

		function modalClose(el) {
			removeClass(el, themeModal + '_showing_in');
			removeClass(document.body, themeModal + '-open');
			// if(el.getElementsByClassName('vmodal__video')[0]){
			// 	el.getElementsByClassName('vmodal__video')[0].innerHTML = '';
			// }
		}
		function getEventTarget(e) {
			var targ;

			if (e.target) {
				// W3C
				targ = e.target;
			} else if (e.srcElement) {
				// IE6-8
				targ = e.srcElement;
			} else if (e.originalTarget) {
				targ = e.originalTarget;
			}
			if (targ.nodeType == 3) {
				// Safari
				targ = targ.parentNode;
			}
			return targ;
		}
		function bodyClick(e) {
			var target = getEventTarget(e);
			for (var _i2 = 0; _i2 < modalL; _i2++) {
				if (target == modal[_i2]) {
					modalClose(modal[_i2]);
				}
			}
		}
		for (var i = 0; i < modalBtnL; i++) {
			modalBtn[i].addEventListener('click', function () {

				// Get button data-attributes
				var modalData = this.dataset;

				// Get attribute data-open and replace # with empty line
				var modalID = modalData.open.replace("#", "");

				if (exists(document.getElementById(modalID))) {

					var modalCurrent = document.getElementById(modalID);

					addClass(document.body, themeModal + '-open');
					addClass(modalCurrent, themeModal + '_showing_in');

					// if(modalData.video != undefined){
					// 	let videoSRC = modalData.video;
					// 	let videoWrapper = modalCurrent.getElementsByClassName('v-modal__video')[0];

					// 	videoWrapper.innerHTML = '';

					// 	let videoIframe = d.createElement('iframe');

					// 	addClass(videoIframe, 'v-modal__iframe');
					// 	videoIframe.setAttribute('src', videoSRC);
					// 	videoWrapper.appendChild(videoIframe);
					// }
				} else {
					console.error('No element with ID: ' + modalID);
				}
			});
		}

		for (var _i3 = 0; _i3 < modalBtnCloseL; _i3++) {
			modalBtnClose[_i3].addEventListener('click', function () {
				modalClose(this.closest('.' + themeModal));
			});
		}

		var bodyEvents = ['click', 'touchstart'];
		var bodyEventsL = bodyEvents.length;

		for (var _i4 = 0; _i4 < bodyEventsL; _i4++) {
			document.body.addEventListener(bodyEvents[_i4], function (e) {
				bodyClick(e);
			}, false);
		}
	});
})();
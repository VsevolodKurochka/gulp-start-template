// General functions
	function log(logText){
		console.log(logText);
	}
	function hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	function addClass(element,cls){
		if( !hasClass(element, cls) ){
			let empty = '';
			if(element.classList.value != "")
				empty = ' ';
			element.className += empty + cls;
		}
	}

	function removeClass(element, cls){
		if(hasClass(element, cls)){
			element.classList.remove(cls);
		}
	}

	function toggleClass(element, cls){
		if( hasClass(element, cls) ){
			removeClass(element, cls)
		}else{
			addClass(element, cls);
		}
	}

	function exists(element){
		return typeof(element) != 'undefined' && element != null;
	}

(function(){
	document.addEventListener("DOMContentLoaded", function(){

		const d = document;
		const classes = {
			active: 'active',
			menuActive: 'v-nav__menu_active'
		}

		// Anchors links
			function scrollTo(element, to, duration) {
				if (duration <= 0) return;
				var difference = to - element.scrollTop - 75;
				var perTick = difference / duration * 10;
				setTimeout(function() {
					element.scrollTop = element.scrollTop + perTick;
					if (element.scrollTop === to) return;
					scrollTo(element, to, duration - 10);
				}, 10);
			}
			
			// Anchors
				const anchors = d.getElementsByClassName('anchor');

				for(let i = 0; i < anchors.length; i++){
					anchors[i].addEventListener('click', (e) => {
						e.preventDefault();
						let href = this.getAttribute("href").replace("#", "");
						let scrollAnchor = document.getElementById(href);
						scrollTo(document.body, scrollAnchor.offsetTop, 600);
					});
				}
			
		// Navigation
			const jsNav = d.getElementById('navigation');

			// Navigation links
				const jsNavLinks = d.querySelectorAll('.nav__menu a[href*="#"]');

				for(var i = 0; i < jsNavLinks.length; i++){
					jsNavLinks[i].addEventListener('click', (e) => {
						e.preventDefault();

						let vnavhref = this.getAttribute("href").replace("#", "");
						let vnavscrollAnchor = document.getElementById(vnavhref);

						removeClass(jsNavBtn, classes.active);
						removeClass(jsNav, classes.menuActive);

						scrollTo(document.body, vnavscrollAnchor.offsetTop, 600);

					});
				}

			// Button menu
				const jsNavBtn = d.getElementById('js-vnav__btn');

				if(exists(jsNavBtn)){
					jsNavBtn.addEventListener('click', function(){
						toggleClass(this, classes.active);
						toggleClass(jsNav, classes.menuActive);
					});
				}


			// Click on toggle element in navigation
				const jsNavText = d.getElementById('js-nav-text');
				if(exists(jsNavText)){
					jsNavText.addEventListener('click', function() {
						toggleClass(this, classes.active);
					});	
				}


		// Modal Window initialization
		let themeModal = 'vmodal';
		let modalBtn = d.querySelectorAll(`[data-action="${themeModal}"]`);
		let modalBtnL = modalBtn.length;

		const modal = d.querySelectorAll(`.${themeModal}`);
		const modalL = modal.length;

		const modalBtnClose = d.querySelectorAll(`[data-close="${themeModal}"]`);
		const modalBtnCloseL = modalBtnClose.length;

		
		function modalClose(el){
			removeClass(el, `${themeModal}_showing_in`);
			removeClass(document.body, `${themeModal}-open`);
			// if(el.getElementsByClassName('vmodal__video')[0]){
			// 	el.getElementsByClassName('vmodal__video')[0].innerHTML = '';
			// }
		}
		function getEventTarget(e){
			var targ;
	
			if (e.target) { // W3C
				targ = e.target;
			}else if (e.srcElement) { // IE6-8
				targ = e.srcElement;
			}else if(e.originalTarget){
				targ = e.originalTarget;
			}
			if (targ.nodeType == 3) { // Safari
				targ = targ.parentNode;
			}
			return targ;
		}
		function bodyClick(e){
			let target = getEventTarget(e);
			for(let i = 0; i < modalL; i++){
				if (target == modal[i]) {
					modalClose(modal[i]);
				}
			}
		}
		for(var i = 0; i < modalBtnL; i++){
			modalBtn[i].addEventListener('click', function(){

				// Get button data-attributes
				var modalData = this.dataset;

				// Get attribute data-open and replace # with empty line
				var modalID = modalData.open.replace("#", "");
				
				
				if( exists(document.getElementById(modalID) ) ){

					let modalCurrent = document.getElementById(modalID);

					addClass(document.body, `${themeModal}-open`);
					addClass(modalCurrent, `${themeModal}_showing_in`);

					// if(modalData.video != undefined){
					// 	let videoSRC = modalData.video;
					// 	let videoWrapper = modalCurrent.getElementsByClassName('v-modal__video')[0];

					// 	videoWrapper.innerHTML = '';

					// 	let videoIframe = d.createElement('iframe');

					// 	addClass(videoIframe, 'v-modal__iframe');
					// 	videoIframe.setAttribute('src', videoSRC);
					// 	videoWrapper.appendChild(videoIframe);
					// }

				}else{
					console.error('No element with ID: ' + modalID);
				}

			});
		}
		
		for(let i = 0; i < modalBtnCloseL; i++){
			modalBtnClose[i].addEventListener('click', function(){
				modalClose(this.closest(`.${themeModal}`));
			});
		}
		
		let bodyEvents = ['click', 'touchstart'];
		let bodyEventsL = bodyEvents.length;

		for(let i = 0; i < bodyEventsL; i++){
			document.body.addEventListener(bodyEvents[i], function(e) {
				bodyClick(e);
			}, false);
		}
	});
}());
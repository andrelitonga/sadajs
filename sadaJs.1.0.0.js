//@Script Name : sadaJs.1.0.0.js
//@Author : Andreas Silitonga
//@Created : 30 Jul 2015
//@Version : 1.0.0
//@ChangeLog : Nothing. This is the first build of the script
(function(window) {
	var document = window.document, location = window.location, href = window.href, navigator = window.navigator;
	
	var sadaJs = {
		objects: [],
		init: function(selector) {
			var obj = [];
			if(selector.nodeType) {
			}
			if(selector === "body" && document.body) {
			}
			if(this.isString(selector)) {
				if(selector.charAt(0) === "#") {
					obj.push(document.getElementById(selector.substring(1, selector.length)));
				}
				else if(selector.charAt(0) === ".") {
					obj = this.getByClass(selector.substring(1, selector.length));
				}
				else if((selector).indexOf(".") > 0) {
					var selectorSplit = selector.split(".");
					if(this.isEleRendered(selectorSplit[0])) {
						var tmpObjs = document.querySelectorAll(selector);
						for(i = 0; i < tmpObjs.length; i++) {
							obj.push(tmpObjs[i]);
						}
					}
				}
				else if((selector).indexOf("#") > 0) {
					var selectorSplit = selector.split("#");
					if(this.isEleRendered(selectorSplit[0])) {
						var tmpObjs = document.querySelectorAll(selector);
						for(i = 0; i < tmpObjs.length; i++) {
							obj.push(tmpObjs[i]);
						}
					}
				}
				else if(this.isEleRendered(selector)) {
					//document.querySelector(selector);
					var tmpObjs = document.getElementsByTagName(selector);
					for(var i = 0; i < tmpObjs.length; i++) {
						obj.push(tmpObjs[i]);
					}
				}
			}
			if(this.isObject(selector)) {
				obj = selector;
			}
			this.objects = obj;
			return this;
		},
		isString: function(selector) {
			return typeof selector === "string" ? true : false;
		},
		isNumber: function(selector) {
			return typeof selector === "number" ? true : false;
		},
		isObject: function(selector) {
			return (typeof selector === "object" && !(selector instanceof Array)) ? true : false;
		},
		isArray: function(selector) {
			return selector instanceof Array ? true : false;
		},
		isFunction: function(selector) {
			return Object.prototype.toString.call(selector) === "[object Function]" ? true : false;
		},
		getByClass: function(matchClass) {
			var elems = document.getElementsByTagName("*"), i;
			var objClass = [];
			for(i in elems) {
				if((" "+elems[i].className+" ").indexOf(" "+matchClass+" ") > -1) {
					objClass.push(elems[i]);
				}
			}
			return objClass;
		},
		show: function() {
			for(var i = 0; i < this.objects.length; i++) {
				this.objects[i].style["display"] = "block";
			}
		},
		hide: function() {
			for(var i = 0; i < this.objects.length; i++) {
				this.objects[i].style["display"] = "none";
			}
		},
		width: function() {
			for(var i = 0; i < this.objects.length; i++) {
				if(this.objects[i].innerWidth) {
					return this.objects[i].innerWidth;
				}
				else if(this.objects[i].clientWidth) {
					return this.objects[i].clientWidth;
				}
			}
		},
		height: function() {
			for(var i = 0; i < this.objects.length; i++) {
				if(this.objects[i].innerHeight) {
					return this.objects[i].innerHeight;
				}
				else if(this.objects[i].clientHeight) {
					return this.objects[i].clientHeight;
				}
			}
		},
		text: function(strValue) {
			for(var i = 0; i < this.objects.length; i++) {
				if(null == strValue) {
					return this.objects[i].innerHTML;
				}
				else {
					if(this.isString(strValue) || this.isNumber(strValue)) {
						var txt = document.createTextNode(strValue);
						this.objects[i].innerHTML = "";
						this.objects[i].appendChild(txt);
					}
				}
			}
		},
		val: function(strValue) {
			for(var i = 0; i < this.objects.length; i++) {
				if(null == strValue) {
					return this.objects[i].value;
				}
				else {
					if(this.isString(strValue) || this.isNumber(strValue)) {
						this.objects[i].value = strValue;
					}
				}
			}
		},
		css: function() {
			for(var i = 0; i < this.objects.length; i++) {
				if(arguments.length > 1) {
					this.objects[i].style[arguments[0]] = arguments[1];
				}
				else if(arguments.length == 1) {
					var scrap = arguments[0];
					for(prop in scrap) {
						this.objects[i].style[prop] = scrap[prop];
					}
				}
			}
		},
		click: function() {
			for(var i = 0; i < this.objects.length; i++) {
				if(this.objects[i].addEventListener) {
					this.objects[i].addEventListener("click", arguments[0], false);
				}
				else if(this.objects[i].attachEvent) {
					this.objects[i].attachEvent("onclick", arguments[0]);
				}
			}
		},
		each: function(callback) {
			for(var i = 0; i < this.objects.length; i++) {
				apply.callback(this.objects[i], arguments[i]);
			}
		},
		html: function(strValue) {
			for(var i = 0; i < this.objects.length; i++) {
				this.objects[i].innerHTML = "";
				if(this.isString(strValue) || this.isNumber(strValue)) {
					this.objects[i].innerHTML = strValue;
				}
			}
		},
		addClass: function(name) {
			var clsName = "";
			for(var i = 0; i < this.objects.length; i++) {
				if(this.isString(name)) {
					clsName = name;
				}
				else if(this.isArray(name)) {
					for(var j = 0; j < name.length; j++) {
						clsName += name[j] + " ";
					}
					clsName = clsName.substring(0, clsName.length - 1);
				}
				if(!this.objects[i].className) {
					this.objects[i].className = clsName;
				}
				else {
					var tmpClass = this.objects[i].className;
					this.objects[i].className = "";
					this.objects[i].className = tmpClass + " " + clsName;
				}
			}
		},
		removeClass: function(name) {
			var tmpClass = [], splitCls, newClass = "";
			for(var i = 0; i < this.objects.length; i++) {
				if(!this.objects[i].className) {
					return;
				}
				else {
					splitCls = this.objects[i].className.split(" ");
					for(var j = 0; j < splitCls.length; j++) {
						if(name != splitCls[j]) {
							tmpClass.push(splitCls[j]);
						}
					}
					this.objects[i].className = "";
					for(var k = 0; k < tmpClass.length; k++) {
						newClass += tmpClass[k] + " ";
					}
					this.objects[i].className = newClass.substring(0, newClass.length - 1);
				}
			}
		},
		fadeIn: function(motion, display) {
			for(var i = 0; i < this.objects.length; i++) {
				if(this.objects[i].style["display"] === "none") {
					this.objects[i].style["display"] = "block";
					fIn(this.objects[i], motion, display);
				}
			}
		},
		fadeOut: function(motion) {
			for(var i = 0; i < this.objects.length; i++) {
				if(this.objects[i].style["display"] != "none") {
					fOut(this.objects[i], motion);
				}
			}
		},
		slideDown: function(motion) {
			var minHeight = 0;
			var maxHeight = 10;
			var time = motion || 1000;
			var timer = null;
			var toggled = false;
			
			for(var i = 0; i < this.objects.length; i++) {
				var slider = this.objects[i];
				if(slider.style.display === "none") {
					var strHeight = slider.style.height;
					maxHeight = parseInt(strHeight.substring(0, strHeight.length - 2));
					slider.style.height = minHeight + "px";
					
					clearInterval(timer);
					var instanceHeight = parseInt(slider.style.height);
					var init = (new Date()).getTime();
					var height = (toggled = !toggled) ? maxHeight : minHeight;
					var disp = height - parseInt(slider.style.height);
					
					timer = setInterval(function() {
						slider.style.display = "block";
						var instance = (new Date()).getTime() - init;
						if(instance <= time) {
							var pos = instanceHeight + Math.floor(disp * instance / time);
							slider.style.height = pos + "px";
						}
					}, 1);
				}
			}
		},
		version: "1.0.0",
		left: function() {
			for(var i = 0; i < this.objects.length; i++) {
				return this.screenSize()[0] - this.objects[i].clientWidth;
			}
		},
		top: function() {
			for(var i = 0; i < this.objects.length; i++) {
				return this.screenSize()[1] - this.objects[i].clientHeight;
			}
		},
		screenSize: function() {
			var scrWidth = 0, scrHeight = 0;
			if(window.innerWidth) {
				scrWidth = window.innerWidth; scrHeight = window.innerHeight;
			}
			else if(document.document.clientWidth) {
				scrWidth = document.documentElement.clientWidth; scrHeight = document.documentElement.clientHeight;
			}
			else if(document.body.clientWidth) {
				scrWidth = document.body.clientWidth; scrHeight = document.body.clientHeight;
			}
			return [scrWidth, scrHeight];
		},
		windowSize: function() {
			return this.screenSize()[0] + " x "+ this.screenSize()[1];
		},
		appNavigator: {
			name: navigator.appName,
			codeName: navigator.appCodeName,
			version: navigator.appVersion,
			platform: navigator.platform,
			product: navigator.product,
			language: navigator.language,
			fullName: navigator.userAgent
		},
		eleRendered: [
			"p", "h1", "h2", "h3", "h4", "h5", "h6", "div", "span"
		],
		isEleRendered: function(selector) {
			var eleMatch = false;
			for(var i = 0; i < this.eleRendered.length; i++) {
				if(selector == this.eleRendered[i])
					eleMatch = true;
			}
			return eleMatch;
		},
		XML: {
			parsingDoc: function(xmlDoc, eleRoot) {
				if(this.isXMLDoc(xmlDoc)) {
					var list = xmlDoc.getElementsByTagName(eleRoot);
					var objRet = [];
					var objTest = list[0].childNodes;
					for(var i = 0; i < list.length; i++) {
						if(objTest.length < 1) {
							var itemData = list[i];
							var itemAttr = itemData.attributes;
							for(j = 0; j < itemAttr.length; j++) {
								var currItem = itemAttr[j];
								var itemValue = currItem.nodeValue == null || currItem.nodeValue == "" ? "&nbsp;" : currItem.nodeValue;
							}
						}
						else {
							var itemData = list[i];
							var itemAttr = itemData.childNodes;
							var pattern = "itemData.firstChild.";
							var suffix = "nextSibling.";
							for(j = 0; j < (itemAttr.length / 2) - 1; j++) {
								if(j < 1)
									suffix = suffix;
								else
									suffix = "nextSibling.nextSibling.";
									
								retPattern = pattern + suffix;
								retPattern += "firstChild";
								var retValue = eval("("+ retPattern +")") == null ? "&nbsp;" : eval("("+ retPattern + ")").nodeValue;
								
							}
						}
					}
				}
				
			}
		},
		isXMLDoc: function(selector) {
			if(this.isString(selector)) {
				return ((" "+selector+" ").indexOf(" <?xml ") > -1) ? true : false;
			}
		}
	};
	
	function fIn(el, speed, display) {
		el.style.opacity = 0;
		el.style.display = display || "block";
		
		(function fade() {
			var val = parseFloat(el.style.opacity);
			if(!((val += (1 / speed)) > 1)) {
				el.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();
	}
	function fOut(el, speed) {
		el.style.opacity = 1;
		
		(function fade() {
			if((el.style.opacity -= (1 / speed)) < 0) {
				el.style.display = "none";
			}
			else {
				requestAnimationFrame(fade);
			}
		})();
	}
	
	if(!window.$) window.$ = sadaJs;

})(window);

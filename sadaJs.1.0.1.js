//@Script Name : sadaJs.1.0.1.js
//@Author : Andreas Silitonga
//@Created : 31 Jul 2015
//@Version : 1.0.1
//@ChangeLog : Add ready function to load all DOM Content exclude Image and script
if(typeof window.sadaJs == "undefined") {
	window.undefined = window.undefined;
	
	var sadaJs = function(selector) {
		//if(window == this)
			//return new sadaJs(selector);
		
		selector = selector || document;
		
		var objects = [];
		
		var isDOMReady = false;
		
		var fn = {
			//objects: [],
			
			text: function(str) {
				for(var i = 0; i < objects.length; i++) {
					if(null == str) {
						return objects[i].innerHTML;
					}
					else {
						var txt = document.createTextNode(str);
						objects[i].innerHTML = "";
						objects[i].appendChild(txt);
					}
				}
			},
			windowSize: function() {
				return this.element.screenSize()[0] + " x " + this.element.screenSize()[1];
			},
			ready: function() {
				if(selector == document) {
					if(isDOMReady) {
						document.removeEventListener("DOMContentLoaded", arguments[0], false);
					}
					else {
						if(selector.addEventListener) {
							selector.addEventListener("DOMContentLoaded", arguments[0], false);
						}
						else if(selector.attachEvent) {
							selector.attachEvent("DOMContentLoaded", arguments[0]);
						}
					}
				}
			},
			show: function() {
				for(var i = 0; i < objects.length; i++) {
					objects[i].style["display"] = "block";
				}
			},
			hide: function() {
				for(var i = 0; i < objects.length; i++) {
					objects[i].style["display"] = "none";
				}
			},
			width: function() {
				for(var i = 0; i < objects.length; i++) {
					if(objects[i].innerWidth) {
						return objects[i].innerWidth;
					}
					else if(objects[i].clientWidth) {
						return objects[i].clientWidth;
					}
				}
			},
			height: function() {
				for(var i = 0; i < objects.length; i++) {
					if(objects[i].innerHeight) {
						return objects[i].innerHeight;
					}
					else if(objects[i].clientHeight) {
						return objects[i].clientHeight;
					}
				}
			},
			left: function() {
				for(var i = 0; i < objects.length; i++) {
					return this.element.screenSize()[0] - objects[i].clientWidth;
				}
			},
			top: function() {
				for(var i = 0; i < objects.length; i++) {
					return this.element.screenSize()[1] - objects[i].clientHeight;
				}
			},
			val: function(iValue) {
				for(var i = 0; i < objects.length; i++) {
					if(null == iValue) {
						return objects[i].value;
					}
					else {
						if(this.general.isString() || this.general.isNumber()) {
							objects[i].value = iValue;
						}
					}
				}
			},
			css: function() {
				for(var i = 0; i < objects.length; i++) {
					if(arguments.length > 1) {
						objects[i].style[arguments[0]] = arguments[1];
					}
					else if(arguments.length == 1) {
						var scrap = arguments[0];
						for(prop in scrap) {
							objects[i].style[prop] = scrap[prop];
						}
					}
				}
			},
			click: function() {
				for(var i = 0; i < objects.length; i++) {
					if(objects[i].addEventListener) {
						objects[i].addEventListener("click", arguments[0], false);
					}
					else if(objects[i].attachEvent) {
						objects[i].attachEvent("onclick", arguments[0]);
					}
				}
			},
			each: function(callback) {
				for(var i = 0; i < objects.length; i++) {
					callback.apply(objects[i], arguments);
				}
			},
			html: function(str) {
				for(var i = 0; i < objects.length; i++) {
					if(null == str) {
						return objects[i].innerHTML;
					}
					else {
						objects[i].innerHTML = "";
						objects[i].innerHTML = str;
					}
				}
			},
			addClass: function(clsName) {
				return this.element.eleClass.add(clsName);
			},
			removeClass: function(clsName) {
				return this.element.eleClass.remove(clsName);
			},
			fadeIn: function(motion, display) {
				for(var i = 0; i < objects.length; i++) {
					if(objects[i].style["display"] == "none") {
						objects[i].style["display"] = "block";

						fIn(objects[i], motion, display);
					}
				}
			},
			fadeOut: function(motion) {
				for(var i = 0; i < objects.length; i++) {
					if(objects[i].style["display"] != "none") {
						fOut(objects[i], motion);
					}
				}
			},
			slideDown: function(motion) {
				var minHeight = 0;
				var maxHeight = 10;
				var time = motion || 1000;
				var timer = null;
				var toggled = false;
				
				for(var i = 0; i < objects.length; i++) {
					var slider = objects[i];
					if(slider.style["display"] == "none") {
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
		};
		
		var document = window.document, location = window.location, href = window.href, navigator = window.navigator;
		
		fn.general = fn.prototype = {
			init: function() {
				var obj = [];
				if(selector.nodeType) {
				}
				if(selector == "body" && document.body) {
				}
				if(this.isString()) {
					if(selector.charAt(0) == "#") {
						obj.push(document.getElementById(selector.substring(1, selector.length)));
					}
					else if(selector.charAt(0) == ".") {
						obj = this.getByClass(selector.substring(1, selector.length));
					}
					else if((selector).indexOf("#") > 0) {
						var selectorSplit = selector.split("#");
						if(fn.element.isEleRendered(selectorSplit[0])) {
							var tmpObj = document.querySelectorAll(selector);
							for(i = 0; i < tmpObj.length; i++) {
								obj.push(tmpObj[i]);
							}
						}
					}
					else if((selector).indexOf(".") > 0) {
						var selectorSplit = selector.split(".");
						if(fn.element.isEleRendered(selectorSplit[0])) {
							var tmpObj = document.querySelectorAll(selector);
							for(i = 0; i < tmpObj.length; i++) {
								obj.push(tmpObj[i]);
							}
						}
					}
					else if(fn.element.isEleRendered(selector)) {
						var tmpObj = document.getElementsByTagName(selector);
						for(var i = 0; i < tmpObj.length; i++) {
							obj.push(tmpObj[i]);
						}
					}
				}
				objects = obj;
				//return this;
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
			isString: function(value) {
				var objValue = value || selector;
				return typeof objValue == "string" ? true : false;
			},
			isNumber: function(value) {
				var objValue = value || selector;
				return typeof objValue == "number" ? true : false;
			},
			isObject: function(value) {
				var objValue = value || selector;
				return typeof objValue == "object" && !(selector instanceof Array) ? true : false;
			},
			isArray: function() {
				var objValue = value || selector;
				return objValue instanceof Array ? true : false;
			},
			isFunction: function() {
				var objValue = value || selector;
				return Object.prototype.toString.call(objValue) == "[object Function]" ? true : false;
			},
			version: "1.0.1"
		};
		
		fn.element = fn.prototype = {
			screenSize: function() {
				var scrWidth = 0, scrHeight = 0;
				if(window.innerWidth) {
					scrWidth = window.innerWidth; scrHeight = window.innerHeight;
				}
				else if(document.documentElement.clientWidth) {
					scrWidth = document.documentElement.clientWidth; scrHeight = document.documentElement.clientHeight;
				}
				else if(document.body.clientWidth) {
					scrWidth = document.body.clientWidth; scrHeight = document.body.clientHeight;
				}
				return [scrWidth, scrHeight];
			},
			eleClass: {
				add: function(name) {
					for(var i = 0; i < objects.length; i++) {
						if(!objects[i].className) {
							objects[i].className = name;
						}
						else {
							var tmpCls = objects[i].className;
							objects[i].className = "";
							objects[i].className = tmpCls + " "+name;
						}
					}
				},
				remove: function(name) {
					var splitCls, tmpCls = [], newCls = "";
					for(var i = 0; i < objects.length; i++) {
						if(!objects[i].className) {
							return;
						}
						else {
							splitCls = objects[i].className.split(" ");
							for(var j = 0; j < splitCls.length; j++) {
								if(name != splitCls[j])
									tmpCls.push(splitCls[j]);	
							}
							objects[i].className = "";
							for(var k = 0; k < tmpCls.length; k++) {
								newCls += tmpCls[k] + " ";
							}
							newCls = newCls.substring(0, newCls.length - 1);
							objects[i].className = newCls;
						}
					}
				}
			},
			eleRendered: [
				"p", "h1", "h2", "h3", "h4", "h5", "h6", "div", "span"
			],
			isEleRendered: function(selObj) {
				var eleMatch = false;
				for(var i = 0; i < this.eleRendered.length; i++) {
					if(selObj == this.eleRendered[i])
						eleMatch = true;
				}
				return eleMatch;
			},
			appNavigator: {
				userAgent: navigator.userAgent,
				name: navigator.appName,
				codeName: navigator.appCodeName,
				version: navigator.appVersion,
				product: navigator.product,
				platform: navigator.platform,
				language: navigator.language
			}
		};
		
		fn.xmlDOM = fn.prototype = {
			isXMLDoc: function(selector) {
				return ((" "+selector+" ").indexOf(" <?xml ") > -1) ? true : false;
			},
			parsingDoc: function(xmlDoc, eleRoot) {
				if(this.isXMLDoc(xmlDoc)) {
					var list = xmlDoc.getElementsByTagName(eleRoot);
					var objRet = [];
					var objTest = list[0].childNodes;
					for(var i = 0; i < list.length; i++) {
						//Fisrt way to render XML Document
						if(objTest.length < 1) {
							var itemData = list[i];
							var itemAttr = itemData.attributes;
							for(j = 0; j < itemAttr.length; j++) {
								var currItem = itemAtrr[j];
								var itemValue = currItem.nodeValue == null || currItem.nodeValue == "" ? "&nbsp;" : currItem.nodeValue;
							}
						}
						//The second way to render with the differend style formatting
						else {
							var itemData = list[i];
							var itemAttr = itemData.childNodes;
							var pattern = "itemData.firstChild";
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
		};
		//return operasi.isString();
		//return selector;
		//return new sadaJs(selector, window);
		
		fn.general.init();
		
		//return objects.length;
		return fn;
	};
	
	if(typeof $$ != "undefined")
	sadaJs._$$ = $$;
	
	var $$ = sadaJs;

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
	
	if(!window.sadaJs) window.sadaJs = sadaJs;
}

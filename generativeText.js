/* Copyright (c) 2014 Emiliano Martínez Luque - http://www.metonymie.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

"use strict";

var generativeText = function(params, options) {
	//initialize
	this.params = params;
	this.opts = options;

	this.totalSteps = 0;
	this.currentStep = 0;
	this.memory = [];

}

generativeText.prototype = {
	defs: {
		/* Filter */
		filterGrayScale: ['filter', '%'],
		filterSepia: ['filter', '%'],
		filterSaturate: ['filter', '%'],
		filterHueRotate: ['filter', 'deg'],
		filterInvert: ['filter', '%'],
		filterOpacity: ['filter', '%'],
		filterBrightness: ['filter', '%'],
		filterContrast: ['filter', '%'],
		filterBlur: ['filter', 'px'],
		filterDropShadow: ['filterDropShadow'],
		/* Transform */
		transformRotate: ['Transform', "deg"],
		transformRotateX: ['Transform', "deg"],
		transformRotateY: ['Transform', "deg"],
		transformRotateZ: ['Transform', "deg"],
		transformSkewX: ['Transform', "deg"],
		transformSkewY: ['Transform', "deg"],
		transformTranslateX: ['Transform', "px"],
		transformTranslateY: ['Transform', "px"],
		transformTranslateZ: ['Transform', "px"],
		transformScaleX: ['Transform', "float"],
		transformScaleY: ['Transform', "float"],
		boxShadow: ['BoxShadow'],
		textShadow: ['TextShadow'],
		fontSize: ['Numeric'],
		left: ['Numeric'],
		right: ['Numeric'],
		top: ['Numeric'],
		bottom: ['Numeric' ],
		padding: ['Numeric'],
		paddingLeft: ['Numeric'],
		paddingRight: ['Numeric'],
		paddingTop: ['Numeric'],
		paddingBottom: ['Numeric'],
		margin: ['Numeric'],
		marginLeft: ['Numeric'],
		marginRight: ['Numeric'],
		marginTop: ['Numeric'],
		marginBottom: ['Numeric'],
		borderRadius: ['Numeric', "%"],
		borderTopLeftRadius: ['Numeric', "%"],
		borderTopRightRadius: ['Numeric', "%"],
		borderBottomLeftRadius: ['Numeric', "%"],
		borderBottomRightRadius: ['Numeric', "%"],
		borderWidth: ['Numeric'],
		borderLeftWidth: ['Numeric'],
		borderRightWidth: ['Numeric'],
		borderTopWidth: ['Numeric'],
		borderBottomWidth: ['Numeric'],
		height: ['Numeric'],
		maxHeight: ['Numeric'],
		minHeight: ['Numeric'],
		width: ['Numeric'],
		maxWidth: ['Numeric'],
		minWidth: ['Numeric'],
		opacity: ['Numeric', ";", "float"],
		letterSpacing: ['Numeric'],
		wordSpacing: ['Numeric'],
		lineHeight: ['Numeric'],
		color: ['Color'],
		backgroundColor: ['Color'],
		borderColor: ['Color'],
		borderLeftColor: ['Color'],
		borderRightColor: ['Color'],
		borderTopColor: ['Color'],
		borderBottomColor: ['Color'],
		fontFamily: ['List'],
		backgroundImage: ['List'],
		borderStyle: ['List'],
		borderLeftStyle: ['List'],
		borderRightStyle: ['List'],
		borderTopStyle: ['List'],
		borderBottomStyle: ['List'],
		textAlign: ['List'],
		verticalAlign: ['List'],
		textDecoration: ['List'],
		textTransform: ['List'],
		fontWeight: ['List'],
		clear: ['List']
	},
	applyToElementById: function (id) {

		var elem = document.getElementById(id);
		if(!elem) {
			throw ("generativeText Error - Not a valid ID: " + id);
			return;
		}

		this.applyToElement(elem);

	},
	applyToElementsByClassName: function(className) {

		var elems = document.getElementsByClassName(className);
		if(elems.length === 0) {
			throw ("generativeText Error - Not a valid className: " + className);
			return;
		}

		for(var i=0; i < elems.length; i++) {
            this.applyToElement(elems[i]);
		}
	},
    applyToElement: function(elem) {
        this.currentStep = 0;
        this.memory = [];

		//Set opts.applyTo default
        if(!this.opts) this.opts = {};
		if(!this.opts.applyTo) this.opts.applyTo = "text";

		switch(this.opts.applyTo) {
			case "words":
				this.applyToWords(elem);
				break;
			case "wrapped":
				this.applyToWrapped(elem);
				break;
			case "text":
			default:
				this.applyToText(elem);
				break;
		}
		//Clean up Unused References
		this.freepObj();
    },
	applyToElementsSequentially: function(elems) {

		this.currentStep = 0;
		this.memory = [];
		//Set opts.applyTo default
		if(!this.opts) this.opts = {};

		if(!elems.length) {
			throw ("generativeText Error - Not a collection of elements.");
			return;
		}

		//Set total steps
		this.totalSteps = elems.length;

		for(var i=0; i<elems.length; i++) {
			var elem = elems[i];

			//remove
			if( typeof this.opts.removeSpaceDups == 'undefined') this.opts.removeSpaceDups = true;

			this.initializePObj();

			//Pre Function
			if(!!this.opts && !!this.opts.pObj && !!this.opts.pObj.preFunc && this.opts.pObj.preFunc instanceof Function) {
				this.applyPFunc(this.opts.pObj, 'preFunc');
			}

			this.generateStyle( this.params, elem );

			if(!!this.opts && !!this.opts.memory) this.memory.push( elem );

			//Post Function
			if(!!this.opts && !!this.opts.pObj && !!this.opts.pObj.posFunc && this.opts.pObj.posFunc instanceof Function) {
				this.applyPFunc(this.opts.pObj, 'posFunc');
			}

			this.currentStep++;
		}
	},
	getElementText: function(elem) {
		var text;

		if(!!elem.textContent) {
			text = elem.textContent;
		} else {
			text = elem.innerText;
		}
		if(typeof text == "undefined") text = "";
		return text;
	},
	appendTextElement: function(elem, ne) {
		if(!!this.opts && !!this.opts.memory) this.memory.push( ne );
		elem.appendChild( ne );
	},
	cleanUp: function() {
			this.freepObj();
			if(this.opts.memory == true) {
				delete this.memory;
			}
	},
	freepObj: function() {
		//Clean up references that were used temporarily
		if(!!this.opts.pObj) {
			delete this.opts.pObj.memory;
			delete this.opts.pObj.container;
		}

	},
	initializePObj: function(elem) {
		if(!!this.opts.pObj) {
			this.opts.pObj.totalSteps = this.totalSteps;
			this.opts.pObj.memory = this.memory;
			if(!!elem) this.opts.pObj.container = elem;
		}
	},
	initializeApplyToText: function(text) {

		//style is default
		if( typeof this.opts.textSpaces == 'undefined') this.opts.textSpaces = 'style';

		var length = text.length;

		//Set total steps
		this.totalSteps = length;

		if(this.opts.textSpaces == 'nostyleorcount' || this.opts.textSpaces == 'remove') {
			var countTextSpaces = text.split(" ").length - 1;
			this.totalSteps = this.totalSteps - countTextSpaces;
		}
	},
	applyToText: function(elem) {

		var text = this.getElementText(elem);

		//Empty element
		elem.innerHTML = "";

		//remove
		if( typeof this.opts.removeSpaceDups == 'undefined') this.opts.removeSpaceDups = true;

		if(this.opts.removeSpaceDups) {
			text = text.replace(/\s+/g, ' ');
		}

		this.initializeApplyToText(text);
		this.initializePObj(elem);

		var length = text.length;

		//Add new elements
		for(var i=0; i<length; i++) {

			//Pre Function
			if(!!this.opts && !!this.opts.pObj && !!this.opts.pObj.preFunc && this.opts.pObj.preFunc instanceof Function) {
				this.applyPFunc(this.opts.pObj, 'preFunc');
			}

			var t = text[i];
			var newElement = document.createElement('span');

			if( /\s/.test(t) ) {

				newElement.innerHTML = '&nbsp;';

				switch(this.opts.textSpaces) {
					case 'style':
						this.generateStyle( this.params, newElement );
						this.appendTextElement(elem, newElement);
					break;
					case 'nostyle':
						this.appendTextElement(elem, newElement);
					break;
					case 'nostyleorcount':
						this.appendTextElement(elem, newElement);
						this.currentStep--;
					break;
					case 'remove':
						this.currentStep--;
					break;
				}				
			} else {
				newElement.innerHTML = t;
				this.generateStyle( this.params, newElement );
				this.appendTextElement(elem, newElement);
			}
			
			//Post Function
			if(!!this.opts && !!this.opts.pObj && !!this.opts.pObj.posFunc && this.opts.pObj.posFunc instanceof Function) {
				this.applyPFunc(this.opts.pObj, 'posFunc');
			}

			this.currentStep++;
		}
	},
	applyToWrapped: function(elem) {

		var text = this.getElementText(elem);

		//Empty element
		elem.innerHTML = "";

		//remove
		if( typeof this.opts.removeSpaceDups == 'undefined') this.opts.removeSpaceDups = true;

		if(this.opts.removeSpaceDups) {
			text = text.replace(/\s+/g, ' ');
		}

		this.initializeApplyToText(text);
		this.initializePObj(elem);

		var length = text.length;

		var wrapper = document.createElement('span');
		wrapper.style.whiteSpace = "nowrap";
		wrapper.setAttribute("class", "gt-nowrap");

		//Add new elements
		for(var i=0; i<length; i++) {

			//Pre Function
			if(!!this.opts && !!this.opts.pObj && !!this.opts.pObj.preFunc && this.opts.pObj.preFunc instanceof Function) {
				this.applyPFunc(this.opts.pObj, 'preFunc');
			}

			var t = text[i];
			var newElement = document.createElement('span');

			if( /\s/.test(t) ) {

				this.appendTextElement(elem, wrapper);
				var wrapper = document.createElement('span');
				wrapper.style.whiteSpace = "nowrap";
				wrapper.setAttribute("class", "gt-nowrap");

				newElement.innerHTML = '&nbsp;';

				switch(this.opts.textSpaces) {
					case 'style':
						this.generateStyle( this.params, newElement );
						this.appendTextElement(elem, newElement);
						break;
					case 'nostyle':
						this.appendTextElement(elem, newElement);
						break;
					case 'nostyleorcount':
						this.appendTextElement(elem, newElement);
						this.currentStep--;
						break;
					case 'remove':
						this.currentStep--;
						break;
				}
			} else {
				newElement.innerHTML = t;
				this.generateStyle( this.params, newElement );
				this.appendTextElement(wrapper, newElement);
			}

			//Post Function
			if(!!this.opts && !!this.opts.pObj && !!this.opts.pObj.posFunc && this.opts.pObj.posFunc instanceof Function) {
				this.applyPFunc(this.opts.pObj, 'posFunc');
			}

			this.currentStep++;
		}
		this.appendTextElement(elem, wrapper);
	},
	initializeApplyToWords: function(length) {

		//style is default
		if( typeof this.opts.textSpaces == 'undefined') this.opts.textSpaces = 'remove';

		if(this.opts.textSpaces == 'style' || this.opts.textSpaces == 'nostyle') {
			this.totalSteps = (length*2) - 1;
		} else {
			this.totalSteps = length;
		}
	},
	applyToWords: function( elem ) {

		var text = this.getElementText(elem);

		//Empty element
		elem.innerHTML = "";

		text = text.replace(/(&nbsp;)+/g, ' ');
		text = text.replace(/\s+/g, ' ');
		if(this.opts.textSpaces == 'odd' || this.opts.textSpaces == 'even'  || this.opts.textSpaces == 'all'  || this.opts.textSpaces == 'remove' ) {
			text = text.trim();
		}

		var words = text.split(/\s+/);

		var length = words.length;

		this.initializeApplyToWords(this.opts, length);
		this.initializePObj(elem);

		for(var i=0; i<length; i++) {

			//Pre Function
			if(this.opts && this.opts.pObj && this.opts.pObj.preFunc && this.opts.pObj.preFunc instanceof Function) {
				this.applyPFunc(this.opts.pObj, 'preFunc');
			}

			var newElement = document.createElement('span');

			switch(this.opts.textSpaces) {
				case 'style':
					newElement.innerHTML = words[i];
					this.generateStyle( this.params, newElement );
					this.appendTextElement(elem, newElement, this.opts);

					if(i!=(length-1)) {
						this.currentStep++;
						var spaceElement = document.createElement('span');
						spaceElement.innerHTML = '&nbsp;';
						this.generateStyle( this.params, spaceElement);
						this.appendTextElement(elem, spaceElement);
					}
				break;
				case 'nostyle':
					newElement.innerHTML = words[i];
					this.generateStyle( this.params, newElement );
					this.appendTextElement(elem, newElement);

					if(i!=(length-1)) {
						this.currentStep++;
						var spaceElement = document.createElement('span');
						spaceElement.innerHTML = '&nbsp;';
						this.appendTextElement(elem, spaceElement);
					}
				break;
				case 'nostyleorcount':
					newElement.innerHTML = words[i];
					this.appendTextElement(elem, newElement);
					this.generateStyle( this.params, newElement );

					if(i!=(length-1)) {
						var spaceElement = document.createElement('span');
						spaceElement.innerHTML = '&nbsp;';
						this.appendTextElement(elem, spaceElement);
					}
				break;
				case 'remove':
					newElement.innerHTML = words[i];
					this.generateStyle( this.params, newElement );
					this.appendTextElement(elem, newElement);
				break;
				case 'even':
					if( (i % 2) != 0) {
						newElement.innerHTML = ((i!=0)?'&nbsp;':'') + words[i] + ((i<(length-1))?'&nbsp;':'');
						this.generateStyle( this.params, newElement);
					} else {
						newElement.innerHTML = words[i];
						this.generateStyle( this.params, newElement);
					}
					this.appendTextElement(elem, newElement);
				break;
                case 'odd':
                    if( (i % 2) == 0) {
                        newElement.innerHTML = ((i!=0)?'&nbsp;':'') + words[i] + ((i<(length-1))?'&nbsp;':'');
                        this.generateStyle( this.params, newElement);
                    } else {
                        newElement.innerHTML = words[i];
                        this.generateStyle( this.params, newElement);
                    }
                    this.appendTextElement(elem, newElement);
                    break;
                case 'all':
                    newElement.innerHTML = ((i!=0)?'&nbsp;':'') + words[i] + ((i<(length-1))?'&nbsp;':'');
                    this.generateStyle( this.params, newElement);
                    this.appendTextElement(elem, newElement);
                    break;
			}

			//Post Function
			if(!!this.opts && !!this.opts.pObj && !!this.opts.pObj.posFunc && this.opts.pObj.posFunc instanceof Function) {
				this.applyPFunc(this.opts.pObj, 'posFunc');
			}

			this.currentStep++;
		}

	},
	generateStyle: function( params, el) {
		for(var p in params) {
			//Check if definition exists
			if(typeof this.defs[ p ] == 'undefined') {
				throw ("generativeText Error - rule name is not supported: '" + p + "'");
				return;
			}

			var styleName = p.replace(/([A-Z])/g, function(m){ return '-' + m.toLowerCase(); } );

			switch( this.defs[ p ][0] ) {
				case 'Numeric':
					el.style[styleName] = this.generateNumericStyle(params[p], this.defs[p][1]);
				break;
				case 'Color':
					el.style[styleName] = this.generateColorStyle( params[p]);
				break;
				case 'List':
					if(styleName == 'background-image') {
						el.style[styleName] = "url('" + this.generateListStyle( params[p] ) + "')";
					} else {
						el.style[styleName] = this.generateListStyle( params[p] );
					}
				break;
				case 'Transform':
					var unit = "";
					if( this.defs[p][1] == "deg") {
						unit = "deg";
					} else {
						if(params[p].unit) {
							unit = params[p].unit;
						} else {
							unit = this.defs[p][1];
						}
					}
					var val = this.generateNumericStyle(params[p], unit);

					var transformName = p.replace("transform", "");
					var transformName = transformName.charAt(0).toLowerCase() + transformName.slice(1);

					var strVal = transformName + "(" + val + ")";
					this.setBrowserStyle(el, "transform", strVal);
					this.setBrowserStyle(el, "-ms-transform", strVal);
					this.setBrowserStyle(el, "-webkit-transform", strVal);
				break;
				case 'BoxShadow':
					var strVal = "";
					if(params[p].constructor === Array) {
						for(var i=0; i<params[p].length; i++) {
							strVal += (i==0? "":", ") + this.generateBoxShadowStyle(params[p][i]);
						}
					} else {
						strVal += this.generateBoxShadowStyle(params[p]);
					}
					this.setBrowserStyle(el, "box-shadow", strVal);
					this.setBrowserStyle(el, "-moz-box-shadow", strVal);
					this.setBrowserStyle(el, "-webkit-box-shadow", strVal);
					break;
				case 'TextShadow':
					var strVal = "";
					if(params[p].constructor === Array) {
						for(var i=0; i<params[p].length; i++) {
							strVal += (i==0? "":", ") + this.generateTextShadowStyle(params[p][i]);
						}
					} else {
						strVal += this.generateTextShadowStyle(params[p]);
					}
					this.setBrowserStyle(el, "text-shadow", strVal);
					this.setBrowserStyle(el, "-moz-text-shadow", strVal);
					this.setBrowserStyle(el, "-webkit-text-shadow", strVal);
					break;
				case 'filter':
					var unit = "";
					if( this.defs[p][1] == "deg") {
						unit = "deg";
					} else {
						if(params[p].unit) {
							unit = params[p].unit;
						} else {
							unit = this.defs[p][1];
						}
					}
					var val = this.generateNumericStyle(params[p], unit);
					var filterName = p.replace("filter", "").toLowerCase();
					if(filterName == 'huerotate') filterName = 'hue-rotate';

					var strVal = filterName + "(" + val + ")";
					this.setBrowserStyle(el, "filter", strVal);
					this.setBrowserStyle(el, "-webkit-filter", strVal);
					break;
				case 'filterDropShadow':
					var strVal = "drop-shadow(" + this.generateTextShadowStyle(params[p]) + ")";
					this.setBrowserStyle(el, "filter", strVal);
					this.setBrowserStyle(el, "-webkit-filter", strVal);
					break;
			}
		}
	},
	generateBoxShadowStyle: function(param) {
		if(typeof param.hShadow == "undefined" || typeof param.vShadow == "undefined" || typeof param.blur == "undefined" || typeof param.spread == "undefined" || typeof param.color == "undefined") {
			throw ("generativeText Error - BoxShadow without either hShadow, vShadow, blur, spread or color.");
			return;
		}
		var strVal = "";
		if(!!param.inset && param.inset) strVal = "inset";
		strVal += " " + this.generateNumericStyle(param.hShadow, 'px');
		strVal += " " + this.generateNumericStyle(param.vShadow, 'px');
		strVal += " " + this.generateNumericStyle(param.blur, 'px');
		strVal += " " + this.generateNumericStyle(param.spread, 'px');
		strVal += " " + this.generateColorStyle(param.color);
		return strVal;
	},
	generateTextShadowStyle: function(param) {
		if(typeof param.hShadow == "undefined" || typeof param.vShadow == "undefined" || typeof param.blurRadius == "undefined" || typeof param.color == "undefined") {
			throw ("generativeText Error - TextShadow without either hShadow, vShadow, blurRadius or color.");
			return;
		}
		var strVal = "";
		strVal += " " + this.generateNumericStyle(param.hShadow, 'px');
		strVal += " " + this.generateNumericStyle(param.vShadow, 'px');
		strVal += " " + this.generateNumericStyle(param.blurRadius, 'px');
		strVal += " " + this.generateColorStyle(param.color);
		return strVal;
	},
	setBrowserStyle: function(elem, style, val) {
		var old = elem.style[style];
		//nothing on transform
		if(typeof old == "undefined" || old == "") {
			elem.style[style] = val;
			return;
		}
		var tmp = old.split(" ");
		for(var i=0; i<tmp.length; i++) {
			//it was set somehow
			if(tmp[i].trim() == val.trim()) return;
		}
		console.log(old + "::" + val)
		//does not exist on transform list
		elem.style[style] = old + ' ' + val.trim();
	},
	generateColorStyle: function(param) {
		var tr = this.generateColorVariation(param);
		if(tr.charAt(0) === "#") return tr;
		return "#" + tr;
	},
	generateColorVariation: function(param) {
		param.unit = "";
		switch(param.type) {
			case 'list':
				return this.generateListVariation(param);
				break;
			case 'random':
				var rgb = { min:'00', max:'FF'};
				return this.generateRGBHex(rgb) + this.generateRGBHex(rgb) + this.generateRGBHex(rgb);
				break;
			case 'generate':
			default:
				var rgbHex = "";
				if(typeof param.r == 'undefined' || typeof param.g == 'undefined' || typeof param.b == 'undefined'){
					throw ("generativeText Error - Color without either r, g or b. You need to have them all, remember you can use fixed.");
					return;
				}
				rgbHex += this.generateRGBHex(param.r);
				rgbHex += this.generateRGBHex(param.g);
				rgbHex += this.generateRGBHex(param.b);
				return rgbHex;
				break;
		}
	},
	generateRGBHex: function(c) {
		if(!!c.fixed) {
			return c.fixed;
		} else if(typeof c.min != 'undefined' && typeof c.max != 'undefined') {
			var range = parseInt(c.max, 16) - parseInt(c.min, 16);
			if(typeof c.steps != 'undefined' && c.steps == true) {
				if(!!c.stepFunction && c.stepFunction instanceof Function) {

					var stepFuncObj = {};
					stepFuncObj.totalSteps = this.totalSteps;
					stepFuncObj.currentStep = this.currentStep;
					stepFuncObj.range = range;
					stepFuncObj.min = parseInt(c.min, 16);
					stepFuncObj.max = parseInt(c.max, 16);

					return this.rgbCheck(Math.floor( c.stepFunction.apply( stepFuncObj )).toString(16));
				} else {
					var colorStep = range / this.totalSteps;
					return this.rgbCheck((parseInt(c.min, 16) + Math.floor(colorStep * this.currentStep) ).toString(16));
				}
			} else {
				return this.rgbCheck((parseInt(c.min, 16) + Math.floor((Math.random()*range)) ).toString(16));
			}
		} else {
			throw ("generativeText Error - Color Parameter without either fixed or (min and max) value: (" + c.fixed + ", " + c.min + ", " + c.max + ")" );
			return;
		}
	},
	generateNumericStyle: function(param, unit) {
		if(!!unit) param.unit = unit;
		return this.generateNumericVariation(param);
	},
	generateNumericVariation: function( param ) {
		//Pixels is default unit
		if(typeof param.unit == 'undefined') param.unit = "px";

		switch(param.type) {
			case "list":
				return this.generateListVariation(param);
				break;
			case "generate":
			default:
				if(typeof param.min == 'undefined' || typeof param.max == 'undefined') {
					throw ("generativeText Error - Numeric Parameter without min or max value: (" + param.min + ", " + param.max + ")" );
					return;
				}

				var range = param.max - param.min;
				if( !!param.steps && param.steps == true) {
					if(!!param.stepFunction && param.stepFunction instanceof Function) {

						var stepFuncObj = {};
						stepFuncObj.totalSteps = this.totalSteps;
						stepFuncObj.currentStep = this.currentStep;
						stepFuncObj.range = range;
						stepFuncObj.min = param.min;
						stepFuncObj.max = param.max;

						return this.roundUnit( param.stepFunction.apply(stepFuncObj), param.unit );
					} else {
						return this.roundUnit( (param.min + (( range/this.totalSteps)*this.currentStep)), param.unit );
					}
				} else {
					return this.roundUnit( ((Math.random()*range) + param.min), param.unit);
				}
				break;

		}
	},
	generateListStyle: function(param, unit) {
		if(!!unit) param.unit = unit;
		return this.generateListVariation(param);
	},
	generateListVariation: function(param) {
		if(!param.values || !(param.values.constructor === Array) || (param.values.constructor === Array && param.values.length < 1)) {
			throw ("generativeText Error - List Parameter without values.");
			return;
		}

		if(typeof param.unit === 'undefined') param.unit = "";

		if( !!param.steps && param.steps == true) {
			if(!!param.stepFunction && param.stepFunction instanceof Function) {

				var stepFuncObj = {};
				stepFuncObj.totalSteps = this.totalSteps;
				stepFuncObj.currentStep = this.currentStep;
				stepFuncObj.valuesLength = param.values.length;

				return param.values[ Math.floor( param.stepFunction.apply(stepFuncObj) ) ] + param.unit;
			} else {
				return param.values[ this.currentStep %  param.values.length] + param.unit;
			}
		} else {
			var randomIndex = Math.floor((Math.random()*param.values.length));
			return param.values[ randomIndex ] + param.unit;
		}
	},
	applyPFunc: function(pObj, funcName) {
		pObj.currentStep = this.currentStep;

		pObj[ funcName ]();
	},
	roundUnit: function(val, unit) {
		switch(unit) {
			case "float":
			//treat as float but with no unit
				return this.removeTrailingZeros(val.toFixed(2));
			case "em":
			case "%":
				return this.removeTrailingZeros(val.toFixed(2)) + unit;
			break;
			case "px":
			default:
				return Math.round(val) + unit;
			break;
		}
	},
	removeTrailingZeros: function(val) {
		if(val.indexOf(".") > 0) {
			while(val.charAt(val.length - 1) === "0") {
				val = val.slice(0, val.length -1);
			}
			if(val.charAt(val.length - 1) === ".") {
				val = val.slice(0, val.length -1);
			}
		}
		return val;
	},
	rgbCheck: function(s) {
		if(s.length == 1) s = "0" + s;
		return s;
	},
	styleToJSON: function( style ) {
		var strJSON = "{";
		var cssDirectives = style.split(";");
		var length = cssDirectives.length-1;
		for(var i=0; i < length; i++) {
			var cssDirective = cssDirectives[i].split(":");
			strJSON += '"' + cssDirective[0] + '":"' + cssDirective[1] + '"';
			strJSON += (i == length-1)?"":",";
		}
		strJSON += "}";
		return strJSON;
	},

};

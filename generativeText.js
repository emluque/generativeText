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

	this.inferAndValidateParams();

}

generativeText.prototype = {
	defs: {

		animation: { type: "List" }, //Exp
		animationDirection: { type: "List" }, //Exp
		animationDuration: { type: "Numeric", unit: "s" }, //Exp
		animationFillMode: { type: "List" }, //Exp
		animationIterationCount: { type: "Numeric" }, //Exp
		animationName: { type: "List" }, //Exp
		animationPlayState: { type: "List" }, //Exp
		animationTimingFunction: { type: "List" }, //Exp

		backfaceVisibility: { type: "List" }, //UAYOR

		background: { type: "List" }, //USP
		backgroundAttachment: { type: "List" }, //UAYOR
		backgroundBlendMode: { type: "List" }, //UAYOR
		backgroundClip: { type: "List" }, //UAYOR
		backgroundOrigin: { type: "List" }, //UAYOR
		backgroundColor: { type: "Color" },
		backgroundImage: { type: "List" },
		backgroundPosition: { type: "TwoNumeric", unit: "px" },
		backgroundRepeact: { type: "List" },
		backgroundSize: { type: "TwoNumeric", unit: "%" },

		border: { type: "List" }, //USP
		borderBottom: { type: "List" }, //USP
		borderBottomColor: { type: "Color" },
		borderBottomLeftRadius: { type: "Numeric", unit: "%" },
		borderBottomRightRadius: { type: "Numeric", unit: "%" },
		borderBottomStyle: { type: "List" },
		borderBottomWidth: { type: "Numeric" },
		borderCollapse: { type: "List" }, //UAYOR
		borderColor: { type: "Color" },

		borderImage: { type: "List" }, //USP
		borderImageOutset: { type: "List" }, //UAYOR
		borderImageRepeat: { type: "List" }, //UAYOR
		borderImageSlice: { type: "List" }, //UAYOR
		borderImageSource: { type: "List" }, //UAYOR
		borderImageWidth: { type: "Numeric", unit: "px" }, //UAYOR

		borderLeft: { type: "List" }, //USP
		borderLeftColor: { type: "Color" },
		borderLeftStyle: { type: "List" },
		borderLeftWidth: { type: "Numeric" },

		borderRadius: { type: "Numeric", unit: "%" },

		borderRight: { type: "List" }, //USP
		borderRightColor: { type: "Color" },
		borderRightStyle: { type: "List" },
		borderRightWidth: { type: "Numeric" },

		borderStyle: { type: "List" },

		borderTop: { type: "List" }, //USP
		borderTopColor: { type: "Color" },
		borderTopLeftRadius: { type: "Numeric", unit: "%" },
		borderTopRightRadius: { type: "Numeric", unit: "%" },
		borderTopStyle: { type: "List" },
		borderTopWidth: { type: "Numeric" },

		borderWidth: { type: "Numeric" },

		bottom: { type: "Numeric" },

		borderDecorationBreak: { type: "List" }, //UAYOR

		boxShadow: { type: "BoxShadow" },

		boxSizing: { type: "List" }, //UAYOR

		clear: { type: "List" },
		clipPath: { type: "List" }, //UAYOR

		color: { type: "Color" },
		columns: { type: "List" }, //UAYOR

		cursor: { type: "List" }, //UAYOR
		display: { type: "List" }, //UAYOR

		filterBlur: { type: "Filter", unit: "px" },
		filterBrightness: { type: "Filter", unit: "%" },
		filterContrast: { type: "Filter", unit: "%" },
		filterDropShadow: { type: "FilterDropShadow" },
		filterGrayScale: { type: "Filter", unit: "%" },
		filterHueRotate: { type: "Filter", unit: "deg" },
		filterInvert: { type: "Filter", unit: "%" },
		filterOpacity: { type: "Filter", unit: "%" },
		filterSaturate: { type: "Filter", unit: "%" },
		filterSepia: { type: "Filter", unit: "%" },

		float: { type: "List" }, //UAYOR

		font: { type: "List" }, //USP
		fontFamily: { type: "List" },
		fontSize: { type: "Numeric" },
		fontStretch: { type: "List" },
		fontStyle: { type: "List" },
		fontVariant: { type: "List" },
		fontWeight: { type: "List" },

		height: { type: "Numeric" },

		left: { type: "Numeric" },
		letterSpacing: { type: "Numeric" },
		lineHeight: { type: "Numeric" },

		listStyle: { type: "List" }, //USP
		listStyleImage: { type: "List" }, //UAYOR
		listStylePosition: { type: "List" }, //UAYOR
		listStyleType: { type: "List" }, //UAYOR

		margin: { type: "Numeric" },
		marginBottom: { type: "Numeric" },
		marginLeft: { type: "Numeric" },
		marginRight: { type: "Numeric" },
		marginTop: { type: "Numeric" },

		maxHeight: { type: "Numeric" },
		maxWidth: { type: "Numeric" },
		minHeight: { type: "Numeric" },
		minWidth: { type: "Numeric" },

		mixBlendMode: { type: "List" }, //UAYOR

		opacity: { type: "Numeric", unit: "float" },

		outline: { type: "List" }, //USP
		outlineColor: { type: "Color" },
		outlineOffset: { type: "Numeric", unit: "px" },
		outlineStyle: { type: "List" },
		outlineWidth: { type: "Numeric", unit: "px" },

		perspective: { type: "Numeric", unit: "px" }, //UAYOR
		perspectiveOrigin: { type: "TwoNumeric", unit: "%" },

		padding: { type: "Numeric" },
		paddingBottom: { type: "Numeric" },
		paddingLeft: { type: "Numeric" },
		paddingRight: { type: "Numeric" },
		paddingTop: { type: "Numeric" },

		right: { type: "Numeric" },

		textAlign: { type: "List" },
		textDecoration: { type: "List" },
		textDecorationColor: { type: "Color" },
		textDecorationLine: { type: "List" },
		textDecorationStyle: { type: "List" },

		textShadow: { type: "TextShadow" },
		textTransform: { type: "List" },

		top: { type: "Numeric" },

		transformRotate: { type: "Transform", unit: "deg" },
		transformRotateX: { type: "Transform", unit: "deg" },
		transformRotateY: { type: "Transform", unit: "deg" },
		transformRotateZ: { type: "Transform", unit: "deg" },
		transformScaleX: { type: "Transform", unit: "float" },
		transformScaleY: { type: "Transform", unit: "float" },
		transformSkewX: { type: "Transform", unit: "deg" },
		transformSkewY: { type: "Transform", unit: "deg" },
		transformTranslateX: { type: "Transform", unit: "px" },
		transformTranslateY: { type: "Transform", unit: "px" },
		transformTranslateZ: { type: "Transform", unit: "px" },

		transformOrigin: { type: "ThreeNumeric", unit: "%" },

		transition: { type: "List" }, //UAYOR


		verticalAlign: { type: "List" },
		visibility: { type: "List" },

		width: { type: "Numeric" },
		wordSpacing: { type: "Numeric" },
		zIndex: { type: "Numeric"}
	},

	/* Params Validation and Inference */
	inferAndValidateParams: function() {
		var errors = [];

		for(var p in this.params){
			switch(this.defs[p].type) {
				case "List":
					this.params[p] = this.paramTypeInferenceAndValidation(this.params[p], p, "List", errors);
					break;
				case "Numeric":
				case "Filter":
				case "Transform":
					this.params[p] = this.paramTypeInferenceAndValidation(this.params[p], p, "Numeric", errors);
					break;
				case "Color":
					this.params[p] = this.paramTypeInferenceAndValidation(this.params[p], p, "Color", errors);
					break;
				case "FilterDropShadow":
				case "TextShadow":
					var param = this.compoundParamTypeInferenceAndValidation(this.params[p], p, true, errors);
					switch (param.type) {
						case "compound":
							this.params[p].hShadow = this.paramTypeInferenceAndValidation(this.params[p].hShadow, p + ".hShadow", "Numeric", errors);
							this.params[p].vShadow = this.paramTypeInferenceAndValidation(this.params[p].vShadow, p + ".vShadow", "Numeric", errors);
							this.params[p].blurRadius = this.paramTypeInferenceAndValidation(this.params[p].blurRadius, p + ".blurRadius", "Numeric", errors);
							this.params[p].color = this.paramTypeInferenceAndValidation(this.params[p].color, p + ".color", "Color", errors);
							break;
						case "array":
							for (var j = 0; j < this.params[p].length; j++) {
								this.params[p][j].hShadow = this.paramTypeInferenceAndValidation(this.params[p][j].hShadow, p + ".hShadow", "Numeric", errors);
								this.params[p][j].vShadow = this.paramTypeInferenceAndValidation(this.params[p][j].vShadow, p + ".vShadow", "Numeric", errors);
								this.params[p][j].blurRadius = this.paramTypeInferenceAndValidation(this.params[p][j].blurRadius, p + ".blurRadius", "Numeric", errors);
								this.params[p][j].color = this.paramTypeInferenceAndValidation(this.params[p][j].color, p + ".color", "Color", errors);
							}
							break;
						case "fixed":
						case "list":
							this.params[p] = param;
							break;
					}
					break;
				case "BoxShadow":
					var param = this.compoundParamTypeInferenceAndValidation(this.params[p], p, true, errors);
					switch (param.type) {
						case "compound":
							this.params[p].hShadow = this.paramTypeInferenceAndValidation(this.params[p].hShadow, p + ".hShadow", "Numeric", errors);
							this.params[p].vShadow = this.paramTypeInferenceAndValidation(this.params[p].vShadow, p + ".vShadow", "Numeric", errors);
							this.params[p].blur = this.paramTypeInferenceAndValidation(this.params[p].blur, p + ".blur", "Numeric", errors);
							this.params[p].spread = this.paramTypeInferenceAndValidation(this.params[p].spread, p + ".spread", "Numeric", errors);
							this.params[p].color = this.paramTypeInferenceAndValidation(this.params[p].color, p + ".color", "Color", errors);
							break;
						case "array":
							for(var j=0; j<this.params[p].length; j++) {
								this.params[p][j].hShadow = this.paramTypeInferenceAndValidation(this.params[p][j].hShadow, p + ".hShadow", "Numeric", errors);
								this.params[p][j].vShadow = this.paramTypeInferenceAndValidation(this.params[p][j].vShadow, p + ".vShadow", "Numeric", errors);
								this.params[p][j].blur = this.paramTypeInferenceAndValidation(this.params[p][j].blur, p + ".blur", "Numeric", errors);
								this.params[p][j].spread = this.paramTypeInferenceAndValidation(this.params[p][j].spread, p + ".spread", "Numeric", errors);
								this.params[p][j].color = this.paramTypeInferenceAndValidation(this.params[p][j].color, p + ".color", "Color", errors);
							}
							break;
						case "fixed":
						case "list":
							this.params[p] = param;
							break;
					}
					break;
					break;
				case "TwoNumeric":
					var param = this.compoundParamTypeInferenceAndValidation(this.params[p], p, false, errors);
					switch (param.type) {
						case "compound":
							this.params[p].x = this.paramTypeInferenceAndValidation(this.params[p].x, p + ".x", "Numeric", errors);
							this.params[p].y = this.paramTypeInferenceAndValidation(this.params[p].y, p + ".y", "Numeric", errors);
							break;
						case "fixed":
						case "list":
							this.params[p] = param;
							break;
					}
					break;
				case "ThreeNumeric":
					var param = this.compoundParamTypeInferenceAndValidation(this.params[p], p, false, errors);
					switch (param.type) {
						case "compound":
							this.params[p].x = this.paramTypeInferenceAndValidation(this.params[p].x, p + ".x", "Numeric", errors);
							this.params[p].y = this.paramTypeInferenceAndValidation(this.params[p].y, p + ".y", "Numeric", errors);
							if(!!this.params[p].z) this.params[p].z = this.paramTypeInferenceAndValidation(this.params[p].z, p + ".z", "Numeric", errors);

							break;
						case "fixed":
						case "list":
							this.params[p] = param;
							break;
					}
					break;
					break;
			}
		}
		if(errors.length > 0) {
			for(var i=0; i < errors.length; i++) {
				console.log(errors[i]);
			}
			throw "-- generativeText params validation Error. For a description of the error look at the console log. --";
		}

	},
	paramTypeInferenceAndValidation: function(param, name, defType, errors) {
		if(typeof param == "undefined") {
			errors.push(name + " : not defined");
			return param;
		} else if(typeof param === "string") {
			param = { value: param, type: "fixed"};
			return param;
		} else if(!!param.values) {
			if(! (param.values instanceof Array) ) {
				errors.push(name + " : values not an Array.");
			} else if( param.values.length == 0 ) {
				errors.push(name + " : values has length 0.");
			} else {
				param = this.stepFunctionCheck(param, name, errors);
                 if(!!param.stepFunction ) {
					param.listType = "function";
				} else if(param.steps) {
                     param.listType = "sequential";
                 } else {
					param.listType = "random";
				}
				param.type = "list";
				return param;
			}
		} else {
			if(! (param instanceof Object) ) {
				errors.push(name + " : not an object, list or fixed value.");
				return param;
			}
			switch(defType) {
				case "List":
					errors.push(name + " : can only take Fixed or List values.");
					return param;
				case "Numeric":
					if(typeof param.min == "undefined") {
						errors.push(name + ".min not defined.");
					} else if( ! (typeof param.min == "number") ) {
						errors.push(name + ".min is not a number.");
					}
					if(typeof param.max == "undefined") {
						errors.push(name + ".max not defined.");
					} else if( ! (typeof param.max == "number") ) {
						errors.push(name + ".max is not a number.");
					}
					param = this.stepFunctionCheck(param, name, errors);
					if(param.steps) {
						param.numericType = "sequential";
					} else if(!!param.stepFunction ) {
						param.numericType = "function";
					} else {
						param.numericType = "random";
					}
					param.type = "numeric";
					return param;
				case "Color":
					param.r = this.cTypeInferenceAndValidation(param.r, name + ".r", errors);
					param.g = this.cTypeInferenceAndValidation(param.g, name + ".g", errors);
					param.b = this.cTypeInferenceAndValidation(param.b, name + ".b", errors);
					param.type = "color";
					return param;
					break;
			}
		}
	},
	compoundParamTypeInferenceAndValidation: function(param, name, allowsArray, errors) {
		if (typeof param == "undefined") {
			errors.push(name + " : not defined");
			return param;
		} else if (typeof param === "string") {
			param = {value: param, type: "fixed"};
			return param;
		} else if (!!param.values) {
			if (!(param.values instanceof Array)) {
				errors.push(name + " : values not an Array.");
			} else if (param.values.length == 0) {
				errors.push(name + " : values has length 0.");
			} else {
				param = this.stepFunctionCheck(param, name, errors);
				if (!!param.stepFunction) {
					param.listType = "function";
				} else if (param.steps) {
                    param.listType = "sequential";
                } else {
					param.listType = "random";
				}
				param.type = "list";
				return param;
			}
		} else {
			if (param instanceof Array) {
				if(allowsArray) {
					param.type = "array";
					return param;
				} else {
					errors.push(name + " : cannot be an array.");
					return param;
				}
			}
			if (!(param instanceof Object)) {
				errors.push(name + " : not an object, list or fixed value.");
				return param;
			}
			param.type = "compound";
			return param;
		}
	},
	cTypeInferenceAndValidation: function(c, name, errors) {
		if(typeof c == "undefined") {
			errors.push(name + " : is not defined.");
			return c;
		} else if(typeof c === "string") {
			c = {value: c, type: "fixed"};
			return c;
		} else {
			if(! (c instanceof Object) ) {
				errors.push(name + " : is not an object or fixed value.");
				return c;
			}
			if(typeof c.min == "undefined") {
				errors.push(name + " : min not defined.");
			} else {
				if(/^[0-9a-f]{2}$/.test(c.min)) {
					c.min = parseInt(c.min, 16);
				} else {
					errors.push(name + ".min not a valid value (00-ff).");
				}
			}
			if(typeof c.max == "undefined") {
				errors.push(name + " : max not defined.");
			} else {
				if(/^[0-9a-f]{2}$/.test(c.max)) {
					c.max = parseInt(c.max, 16);
				} else {
					errors.push(name + ".max not a valid value (00-ff).");
				}
			}
			c = this.stepFunctionCheck(c, name, errors);
			if(!!c.stepFunction) {
				c.rgbType = "function";
			} else if(c.steps) {
                c.rgbType = "sequential";
            } else {
				c.rgbType = "random"
			}
			c.type = "rgb";
			return c;
		}
	},

	stepFunctionCheck: function(param, name, errors) {
		if(!!param.stepFunction) {
			if( !(param.stepFunction instanceof Function) ) {
				errors.push(name + " : stepFunction is not a function.");
			}
		}
		return param;
	},
	/* //Params Validation and Inference */


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
		//For browser compatibility
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
		//ltr is default
		if( typeof this.opts.direction == 'undefined') this.opts.direction = 'ltr';

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

		if(this.opts.direction == "rtl") {
			var i = length-1;
			var istop = -1;
			var iadd = -1;
		} else {
			var i = 0;
			var istop = length;
			var iadd = 1;
		}

		//Add new elements
		while(i != istop) {

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
			i = i + iadd;
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

		if(this.opts.direction == "rtl") {
			var i = length-1;
			var istop = -1;
			var iadd = -1;
		} else {
			var i = 0;
			var istop = length;
			var iadd = 1;
		}

		//Add new elements
		while(i != istop) {


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
			i = i + iadd;
		}
		this.appendTextElement(elem, wrapper);
	},
	initializeApplyToWords: function(length) {

		//style is default
		if( typeof this.opts.textSpaces == 'undefined') this.opts.textSpaces = 'remove';
		//ltr is default
		if( typeof this.opts.direction == 'undefined') this.opts.direction = 'ltr';


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

		this.initializeApplyToWords(length);
		this.initializePObj(elem);

		if(this.opts.direction == "rtl") {
			var i = length-1;
			var istop = -1;
			var iadd = -1;
		} else {
			var i = 0;
			var istop = length;
			var iadd = 1;
		}

		//Add new elements
		while(i != istop) {

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
			i = i + iadd;
		}

	},
	generateStyle: function( params, el) {
		for(var p in params) {
			this.currentParameter = p;
			//Check if definition exists
			if(typeof this.defs[ p ] == 'undefined') {
				throw ("generativeText Error - rule name is not supported: '" + p + "'");
				return;
			}

			var styleName = p.replace(/([A-Z])/g, function(m){ return '-' + m.toLowerCase(); } );

			switch( this.defs[ p].type ) {
				case 'Numeric':
					el.style[styleName] = this.generateNumericStyle(params[p], this.defs[p].unit);
					break;
				case 'Color':
					el.style[styleName] = this.generateColorStyle( params[p]);
					break;
				case 'List':
					if(styleName == 'background-image' || styleName == 'border-image-source' || styleName == 'list-style-image') {
						el.style[styleName] = "url('" + this.generateListStyle( params[p] ) + "')";
					} else {
						el.style[styleName] = this.generateListStyle( params[p] );
					}
					break;
				case 'Transform':
					var unit = "";
					if( this.defs[p].unit == "deg") {
						unit = "deg";
					} else {
						if(params[p].unit) {
							unit = params[p].unit;
						} else {
							unit = this.defs[p].unit;
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
				case 'Filter':
					var unit = "";
					if( this.defs[p].unit == "deg") {
						unit = "deg";
					} else {
						if(params[p].unit) {
							unit = params[p].unit;
						} else {
							unit = this.defs[p].unit;
						}
					}
					var val = this.generateNumericStyle(params[p], unit);
					var filterName = p.replace("filter", "").toLowerCase();
					if(filterName == 'huerotate') filterName = 'hue-rotate';

					var strVal = filterName + "(" + val + ")";
					this.setBrowserStyle(el, "filter", strVal);
					this.setBrowserStyle(el, "-webkit-filter", strVal);
					break;
				case 'FilterDropShadow':
					var strVal = "drop-shadow(" + this.generateTextShadowStyle(params[p]) + ")";
					this.setBrowserStyle(el, "filter", strVal);
					this.setBrowserStyle(el, "-webkit-filter", strVal);
					break;
				case 'BoxShadow':
					var strVal = this.generateBoxShadowStyle(params[p]);
					this.setBrowserStyle(el, "box-shadow", strVal);
					this.setBrowserStyle(el, "-moz-box-shadow", strVal);
					this.setBrowserStyle(el, "-webkit-box-shadow", strVal);
					break;
				case 'TextShadow':
					var strVal = this.generateTextShadowStyle(params[p]);
					this.setBrowserStyle(el, "text-shadow", strVal);
					this.setBrowserStyle(el, "-moz-text-shadow", strVal);
					this.setBrowserStyle(el, "-webkit-text-shadow", strVal);
					break;
				case 'TwoNumeric':
					var unit;
					if(params[p].unit) {
						unit = params[p].unit;
					} else {
						unit = this.defs[p].unit;
					}
					el.style[styleName] = this.generateTwoNumericStyle( params[p], unit);
					break;
				case 'ThreeNumeric':
					var unit;
					if(params[p].unit) {
						unit = params[p].unit;
					} else {
						unit = this.defs[p].unit;
					}
					el.style[styleName] = this.generateThreeNumericStyle( params[p], unit);
					break;
			}
		}
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
		//does not exist on transform list
		elem.style[style] = old + ' ' + val.trim();
	},
	generateColorStyle: function(param) {
		var tr = "";
		switch(param.type) {
			case 'fixed':
				tr = param.value;
				break;
			case 'list':
				tr = this.generateListVariation(param);
				break;
			case 'color':
				tr = this.generateColorVariation(param);
				break
		}
		if(tr.charAt(0) === "#") return tr;
		return "#" + tr;
	},
	generateColorVariation: function(param) {
		var rgbHex = "";
		rgbHex += this.generateRGBHex(param.r);
		rgbHex += this.generateRGBHex(param.g);
		rgbHex += this.generateRGBHex(param.b);
		return rgbHex;
	},
	generateRGBHex: function(c) {
		switch(c.type) {
			case 'fixed':
				return c.value;
				break;
			case 'rgb':
				switch (c.rgbType) {
					case 'random':
						var range = c.max - c.min;
						return this.rgbCheck((c.min + Math.floor(Math.random() * range) ).toString(16));
						break;
					case 'sequential':
						var range = c.max - c.min;
						var colorStep = range / this.totalSteps;
						return this.rgbCheck((c.min + Math.floor(colorStep * this.currentStep) ).toString(16));
						break;
					case 'function':
						var range = c.max - c.min;

						var stepFuncObj = {};
						stepFuncObj.totalSteps = this.totalSteps;
						stepFuncObj.currentStep = this.currentStep;
						stepFuncObj.range = range;
						stepFuncObj.min = c.min;
						stepFuncObj.max = c.max;

						return this.rgbCheck(Math.floor(c.stepFunction.apply(stepFuncObj)).toString(16));
						break;
				}
				break;
		}
	},
	generateNumericStyle: function(param, unit) {
		if(!!unit) param.unit = unit;
		switch(param.type) {
			case 'fixed':
				return param.value;
			case "list":
				return this.generateListVariation(param);
				break;
			case "numeric":
				return this.generateNumericVariation(param);
				break;
		}
	},
	generateNumericVariation: function( param ) {
		//Pixels is default unit
		if(typeof param.unit == 'undefined') param.unit = "px";

		var range = param.max - param.min;
		switch(param.numericType) {
			case "random":
				return this.roundUnit( ((Math.random()*range) + param.min), param.unit);
				break;
			case "sequential":
				return this.roundUnit( (param.min + (( range/this.totalSteps)*this.currentStep)), param.unit );
				break;
			case "function":
				var stepFuncObj = {};
				stepFuncObj.totalSteps = this.totalSteps;
				stepFuncObj.currentStep = this.currentStep;
				stepFuncObj.range = range;
				stepFuncObj.min = param.min;
				stepFuncObj.max = param.max;

				return this.roundUnit( param.stepFunction.apply(stepFuncObj), param.unit );
				break;
		}
	},
	generateListStyle: function(param, unit) {
		if(!!unit) param.unit = unit;
		switch(param.type) {
			case 'fixed':
				return param.value;
			case "list":
				return this.generateListVariation(param);
				break;
		}
	},
	generateListVariation: function(param) {
		if(typeof param.unit === 'undefined') param.unit = "";
		switch(param.listType) {
			case "random":
				var randomIndex = Math.floor((Math.random() * param.values.length));
				return param.values[randomIndex] + param.unit;
				break;
			case "sequential":
				return param.values[this.currentStep % param.values.length] + param.unit;
				break;
			case "function":
				var stepFuncObj = {};
				stepFuncObj.totalSteps = this.totalSteps;
				stepFuncObj.currentStep = this.currentStep;
				stepFuncObj.valuesLength = param.values.length;

				return param.values[Math.floor(param.stepFunction.apply(stepFuncObj))] + param.unit;
				break;
		}
	},
	generateBoxShadowStyle: function(param) {
		switch(param.type) {
			case 'fixed':
				return param.value;
			case "list":
				return this.generateListVariation(param);
				break;
			case "array":
				var strVal = "";
				for(var i=0; i<param.length; i++) {
					strVal += (i==0? "":", ") + this.generateBoxShadowVariation(param[i]);
				}
				return strVal;
				break;
			case "compound":
				return this.generateBoxShadowVariation(param);
				break;
		}
	},
	generateBoxShadowVariation: function(param) {
		var strVal = "";
		if (!!param.inset && param.inset) strVal = "inset";
		strVal += " " + this.generateNumericStyle(param.hShadow, 'px');
		strVal += " " + this.generateNumericStyle(param.vShadow, 'px');
		strVal += " " + this.generateNumericStyle(param.blur, 'px');
		strVal += " " + this.generateNumericStyle(param.spread, 'px');
		strVal += " " + this.generateColorStyle(param.color);
		return strVal;
	},
	generateTextShadowStyle: function(param) {
		switch(param.type) {
			case 'fixed':
				return param.value;
			case "list":
				return this.generateListVariation(param);
				break;
			case "array":
				var strVal = "";
				for(var i=0; i<param.length; i++) {
					strVal += (i==0? "":", ") + this.generateTextShadowVariation(param[i]);
				}
				return strVal;
				break;
			case "compound":
				return this.generateTextShadowVariation(param);
				break;
		}
	},
	generateTextShadowVariation: function(param) {
		var strVal = "";
		strVal += " " + this.generateNumericStyle(param.hShadow, 'px');
		strVal += " " + this.generateNumericStyle(param.vShadow, 'px');
		strVal += " " + this.generateNumericStyle(param.blurRadius, 'px');
		strVal += " " + this.generateColorStyle(param.color);
		return strVal;
	},
	generateTwoNumericStyle: function(param, unit) {
		switch(param.type) {
			case 'fixed':
				return param.value;
			case "list":
				return this.generateListVariation(param);
				break;
			case "compound":
				var strVal = "";
				strVal += " " + this.generateNumericStyle(param.x, unit);
				strVal += " " + this.generateNumericStyle(param.y, unit);
				return strVal;
				break;
		}
	},
	generateThreeNumericStyle: function(param, unit) {
		switch(param.type) {
			case 'fixed':
				return param.value;
			case "list":
				return this.generateListVariation(param);
				break;
			case "compound":
				var strVal = "";
				strVal += " " + this.generateNumericStyle(param.x, unit);
				strVal += " " + this.generateNumericStyle(param.y, unit);
				if(!!param.z) strVal += " " + this.generateNumericStyle(param.z, unit);
				return strVal;
				break;
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
			case "s":
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

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

var generativeText = function(rules, options) {
	//initialize
	this.rules = rules;
	this.opts = options;

	this.totalSteps = 0;
	this.currentStep = 0;
	this.memory = [];

	this.inferAndValidateRules();

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
		backgroundRepeat: { type: "List" },
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

	/* Rules Validation and Inference */
	inferAndValidateRules: function() {
		var errors = [];

		for(var r in this.rules){
			switch(this.defs[r].type) {
				case "List":
					this.rules[r] = this.ruleTypeInferenceAndValidation(this.rules[r], r, "List", errors);
					break;
				case "Numeric":
				case "Filter":
				case "Transform":
					this.rules[r] = this.ruleTypeInferenceAndValidation(this.rules[r], r, "Numeric", errors);
					break;
				case "Color":
					this.rules[r] = this.ruleTypeInferenceAndValidation(this.rules[r], r, "Color", errors);
					break;
				case "FilterDropShadow":
				case "TextShadow":
					this.rules[r] = this.compoundRuleTypeInferenceAndValidation(this.rules[r], r, true, errors);
					switch (this.rules[r].type) {
						case "compound":
							this.rules[r].hShadow = this.ruleTypeInferenceAndValidation(this.rules[r].hShadow, r + ".hShadow", "Numeric", errors);
							this.rules[r].vShadow = this.ruleTypeInferenceAndValidation(this.rules[r].vShadow, r + ".vShadow", "Numeric", errors);
							this.rules[r].blurRadius = this.ruleTypeInferenceAndValidation(this.rules[r].blurRadius, r + ".blurRadius", "Numeric", errors);
							this.rules[r].color = this.ruleTypeInferenceAndValidation(this.rules[r].color, r + ".color", "Color", errors);
							break;
						case "array":
							for (var j = 0; j < this.rules[r].array.length; j++) {
								this.rules[r].array[j].hShadow = this.ruleTypeInferenceAndValidation(this.rules[r].array[j].hShadow, r + ".hShadow", "Numeric", errors);
								this.rules[r].array[j].vShadow = this.ruleTypeInferenceAndValidation(this.rules[r].array[j].vShadow, r + ".vShadow", "Numeric", errors);
								this.rules[r].array[j].blurRadius = this.ruleTypeInferenceAndValidation(this.rules[r].array[j].blurRadius, r + ".blurRadius", "Numeric", errors);
								this.rules[r].array[j].color = this.ruleTypeInferenceAndValidation(this.rules[r].array[j].color, r + ".color", "Color", errors);
							}
							break;
						case "fixed":
						case "list":
							break;
					}
					break;
				case "BoxShadow":
					this.rules[r] = this.compoundRuleTypeInferenceAndValidation(this.rules[r], r, true, errors);
					switch (this.rules[r].type) {
						case "compound":
							this.rules[r].hShadow = this.ruleTypeInferenceAndValidation(this.rules[r].hShadow, r + ".hShadow", "Numeric", errors);
							this.rules[r].vShadow = this.ruleTypeInferenceAndValidation(this.rules[r].vShadow, r + ".vShadow", "Numeric", errors);
							this.rules[r].blur = this.ruleTypeInferenceAndValidation(this.rules[r].blur, r + ".blur", "Numeric", errors);
							this.rules[r].spread = this.ruleTypeInferenceAndValidation(this.rules[r].spread, r + ".spread", "Numeric", errors);
							this.rules[r].color = this.ruleTypeInferenceAndValidation(this.rules[r].color, r + ".color", "Color", errors);
							break;
						case "array":
							for(var j=0; j<this.rules[r].array.length; j++) {
								this.rules[r].array[j].hShadow = this.ruleTypeInferenceAndValidation(this.rules[r].array[j].hShadow, r + ".hShadow", "Numeric", errors);
								this.rules[r].array[j].vShadow = this.ruleTypeInferenceAndValidation(this.rules[r].array[j].vShadow, r + ".vShadow", "Numeric", errors);
								this.rules[r].array[j].blur = this.ruleTypeInferenceAndValidation(this.rules[r].array[j].blur, r + ".blur", "Numeric", errors);
								this.rules[r].array[j].spread = this.ruleTypeInferenceAndValidation(this.rules[r].array[j].spread, r + ".spread", "Numeric", errors);
								this.rules[r].array[j].color = this.ruleTypeInferenceAndValidation(this.rules[r].array[j].color, r + ".color", "Color", errors);
							}
							break;
						case "fixed":
						case "list":
							break;
					}
					break;
					break;
				case "TwoNumeric":
					var rule = this.compoundRuleTypeInferenceAndValidation(this.rules[r], r, false, errors);
					switch (rule.type) {
						case "compound":
							this.rules[r].x = this.ruleTypeInferenceAndValidation(this.rules[r].x, r + ".x", "Numeric", errors);
							this.rules[r].y = this.ruleTypeInferenceAndValidation(this.rules[r].y, r + ".y", "Numeric", errors);
							break;
						case "fixed":
						case "list":
							this.rules[r] = rule;
							break;
					}
					break;
				case "ThreeNumeric":
					var rule = this.compoundRuleTypeInferenceAndValidation(this.rules[r], r, false, errors);
					switch (rule.type) {
						case "compound":
							this.rules[r].x = this.ruleTypeInferenceAndValidation(this.rules[r].x, r + ".x", "Numeric", errors);
							this.rules[r].y = this.ruleTypeInferenceAndValidation(this.rules[r].y, r + ".y", "Numeric", errors);
							if(!!this.rules[r].z) this.rules[r].z = this.ruleTypeInferenceAndValidation(this.rules[r].z, r + ".z", "Numeric", errors);

							break;
						case "fixed":
						case "list":
							this.rules[r] = rule;
							break;
					}
					break;
			}
		}
		if(errors.length > 0) {
			if(!!this.opts.fromGui) {
				var textError = "";
				for(var i=0; i < errors.length; i++) {
					textError += errors[i] + "\n";
				}
				throw textError;
			} else {
				for(var i=0; i < errors.length; i++) {
					console.log(errors[i]);
				}
				throw "-- generativeText rules validation Error. For a description of the error look at the console log. --";
			}
		}

	},
	ruleTypeInferenceAndValidation: function(rule, name, defType, errors) {
		if(typeof rule == "undefined") {
			errors.push(name + " : not defined");
			return rule;
		} else if(typeof rule === "string") {
			rule = { value: rule, type: "fixed"};
			return rule;
		} else if(!!rule.values) {
			if(! (rule.values instanceof Array) ) {
				errors.push(name + " : values not an Array.");
			} else if( rule.values.length == 0 ) {
				errors.push(name + " : values has length 0.");
			} else {
				rule = this.stepFunctionCheck(rule, name, errors);
				if(!!rule.stepFunction ) {
					rule.listType = "function";
				} else if(rule.steps) {
					rule.listType = "sequential";
				} else {
					rule.listType = "random";
				}
				rule.type = "list";
				return rule;
			}
		} else {
			if(! (rule instanceof Object) ) {
				errors.push(name + " : not an object, list or fixed value.");
				return rule;
			}
			switch(defType) {
				case "List":
					errors.push(name + " : can only take Fixed or List values.");
					return rule;
				case "Numeric":
					if(typeof rule.min == "undefined") {
						errors.push(name + ".min not defined.");
					} else if( ! (typeof rule.min == "number") ) {
						errors.push(name + ".min is not a number.");
					}
					if(typeof rule.max == "undefined") {
						errors.push(name + ".max not defined.");
					} else if( ! (typeof rule.max == "number") ) {
						errors.push(name + ".max is not a number.");
					}
					rule = this.stepFunctionCheck(rule, name, errors);
					if(rule.steps) {
						rule.numericType = "sequential";
					} else if(!!rule.stepFunction ) {
						rule.numericType = "function";
					} else {
						rule.numericType = "random";
					}
					rule.type = "numeric";
					return rule;
				case "Color":
					rule.r = this.cTypeInferenceAndValidation(rule.r, name + ".r", errors);
					rule.g = this.cTypeInferenceAndValidation(rule.g, name + ".g", errors);
					rule.b = this.cTypeInferenceAndValidation(rule.b, name + ".b", errors);
					rule.type = "color";
					return rule;
					break;
			}
		}
	},
	compoundRuleTypeInferenceAndValidation: function(rule, name, allowsArray, errors) {
		if (typeof rule == "undefined") {
			errors.push(name + " : not defined");
			return rule;
		} else if (typeof rule === "string") {
			rule = {value: rule, type: "fixed"};
			return rule;
		} else if (!!rule.values) {
			if (!(rule.values instanceof Array)) {
				errors.push(name + " : values not an Array.");
			} else if (rule.values.length == 0) {
				errors.push(name + " : values has length 0.");
			} else {
				rule = this.stepFunctionCheck(rule, name, errors);
				if (!!rule.stepFunction) {
					rule.listType = "function";
				} else if (rule.steps) {
					rule.listType = "sequential";
				} else {
					rule.listType = "random";
				}
				rule.type = "list";
				return rule;
			}
		} else {
			if (rule instanceof Array) {
				if(allowsArray) {
					var newRule = { type: "array", array: rule};
					rule = newRule;
					return rule;
				} else {
					errors.push(name + " : cannot be an array.");
					return rule;
				}
			}
			if (!(rule instanceof Object)) {
				errors.push(name + " : not an object, list or fixed value.");
				return rule;
			}
			rule.type = "compound";
			return rule;
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

	stepFunctionCheck: function(rule, name, errors) {
		if(!!rule.stepFunction) {
			if( !(rule.stepFunction instanceof Function) ) {
				errors.push(name + " : stepFunction is not a function.");
			}
		}
		return rule;
	},
	/* //Rules Validation and Inference */


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

		//Set opts.split default
		if(!this.opts) this.opts = {};
		if(!this.opts.split) this.opts.split = "text";

		switch(this.opts.split) {
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

			this.generateStyle( this.rules, elem );

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

		if(this.opts.textSpaces == 'remove' || this.opts.textSpaces == 'nostylenocount' || this.opts.textSpaces == 'nostyleorwrap') {
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
						this.generateStyle( this.rules, newElement );
						this.appendTextElement(elem, newElement);
						break;
					case 'nostyle':
						this.appendTextElement(elem, newElement);
						break;
					case 'nostylenocount':
						this.appendTextElement(elem, newElement);
						this.currentStep--;
						break;
					case 'nostyleorwrap':
						var textNode = document.createTextNode(" ");
						elem.appendChild(textNode);
						this.currentStep--;
						break;
					case 'remove':
						this.currentStep--;
						break;
				}
			} else {
				newElement.innerHTML = t;
				this.generateStyle( this.rules, newElement );
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
		wrapper.setAttribute("class", "gt-word");

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

				elem.appendChild( wrapper );

				newElement.innerHTML = '&nbsp;';

				switch(this.opts.textSpaces) {
					case 'style':
						this.generateStyle( this.rules, newElement );
						var wrapper = document.createElement('span');
						wrapper.style.whiteSpace = "nowrap";
						wrapper.setAttribute("class", "gt-word");
						this.appendTextElement(wrapper, newElement);
						elem.appendChild(wrapper);
						break;
					case 'nostyle':
						var wrapper = document.createElement('span');
						wrapper.style.whiteSpace = "nowrap";
						wrapper.setAttribute("class", "gt-word");
						this.appendTextElement(wrapper, newElement);
						elem.appendChild(wrapper);
						break;
					case 'nostylenocount':
						var wrapper = document.createElement('span');
						wrapper.style.whiteSpace = "nowrap";
						wrapper.setAttribute("class", "gt-word");
						this.appendTextElement(wrapper, newElement);
						elem.appendChild(wrapper);
						this.currentStep--;
						break;
					case 'nostyleorwrap':
						var textNode = document.createTextNode(" ");
						this.appendTextElement(elem, textNode);
						this.currentStep--;
						break;
					case 'remove':
						this.currentStep--;
						break;
				}

				var wrapper = document.createElement('span');
				wrapper.style.whiteSpace = "nowrap";
				wrapper.setAttribute("class", "gt-word");

			} else {
				newElement.innerHTML = t;
				this.generateStyle( this.rules, newElement );
				this.appendTextElement(wrapper, newElement);
			}

			//Post Function
			if(!!this.opts && !!this.opts.pObj && !!this.opts.pObj.posFunc && this.opts.pObj.posFunc instanceof Function) {
				this.applyPFunc(this.opts.pObj, 'posFunc');
			}

			this.currentStep++;
			i = i + iadd;
		}
		elem.appendChild(wrapper);
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
					this.generateStyle( this.rules, newElement );
					this.appendTextElement(elem, newElement, this.opts);

					if(i!=(length-1)) {
						this.currentStep++;
						var spaceElement = document.createElement('span');
						spaceElement.innerHTML = '&nbsp;';
						this.generateStyle( this.rules, spaceElement);
						this.appendTextElement(elem, spaceElement);
					}
					break;
				case 'nostyle':
					newElement.innerHTML = words[i];
					this.appendTextElement(elem, newElement);
					this.generateStyle( this.rules, newElement );

					if(i!=(length-1)) {
						var spaceElement = document.createElement('span');
						spaceElement.innerHTML = '&nbsp;';
						this.appendTextElement(elem, spaceElement);
					}
					break;
				case 'remove':
					newElement.innerHTML = words[i];
					this.generateStyle( this.rules, newElement );
					this.appendTextElement(elem, newElement);
					break;
				case 'all':
					newElement.innerHTML = ((i!=0)?'&nbsp;':'') + words[i] + ((i<(length-1))?'&nbsp;':'');
					this.generateStyle( this.rules, newElement);
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
	generateStyle: function( rules, el) {
		for(var r in rules) {
			this.currentRuleeter = r;
			//Check if definition exists
			if(typeof this.defs[ r ] == 'undefined') {
				throw ("generativeText Error - rule name is not supported: '" + r + "'");
				return;
			}

			var styleName = r.replace(/([A-Z])/g, function(m){ return '-' + m.toLowerCase(); } );

			switch( this.defs[ r ].type ) {
				case 'Numeric':
					el.style[styleName] = this.generateNumericStyle(rules[r], this.defs[r].unit);
					break;
				case 'Color':
					el.style[styleName] = this.generateColorStyle( rules[r]);
					break;
				case 'List':
					if(styleName == 'background-image' || styleName == 'border-image-source' || styleName == 'list-style-image') {
						el.style[styleName] = "url('" + this.generateListStyle( rules[r] ) + "')";
					} else {
						el.style[styleName] = this.generateListStyle( rules[r] );
					}
					break;
				case 'Transform':
					var unit = "";
					if( this.defs[r].unit == "deg") {
						unit = "deg";
					} else {
						if(rules[r].unit) {
							unit = rules[r].unit;
						} else {
							unit = this.defs[r].unit;
						}
					}
					var val = this.generateNumericStyle(rules[r], unit);

					var transformName = r.replace("transform", "");
					var transformName = transformName.charAt(0).toLowerCase() + transformName.slice(1);

					var strVal = transformName + "(" + val + ")";
					this.setBrowserStyle(el, "transform", strVal);
					this.setBrowserStyle(el, "-ms-transform", strVal);
					this.setBrowserStyle(el, "-webkit-transform", strVal);
					break;
				case 'Filter':
					var unit = "";
					if( this.defs[r].unit == "deg") {
						unit = "deg";
					} else {
						if(rules[r].unit) {
							unit = rules[r].unit;
						} else {
							unit = this.defs[r].unit;
						}
					}
					var val = this.generateNumericStyle(rules[r], unit);
					var filterName = r.replace("filter", "").toLowerCase();
					if(filterName == 'huerotate') filterName = 'hue-rotate';

					var strVal = filterName + "(" + val + ")";
					this.setBrowserStyle(el, "filter", strVal);
					this.setBrowserStyle(el, "-webkit-filter", strVal);
					break;
				case 'FilterDropShadow':
					var strVal = "drop-shadow(" + this.generateTextShadowStyle(rules[r]) + ")";
					this.setBrowserStyle(el, "filter", strVal);
					this.setBrowserStyle(el, "-webkit-filter", strVal);
					break;
				case 'BoxShadow':
					var strVal = this.generateBoxShadowStyle(rules[r]);
					this.setBrowserStyle(el, "box-shadow", strVal);
					this.setBrowserStyle(el, "-moz-box-shadow", strVal);
					this.setBrowserStyle(el, "-webkit-box-shadow", strVal);
					break;
				case 'TextShadow':
					var strVal = this.generateTextShadowStyle(rules[r]);
					this.setBrowserStyle(el, "text-shadow", strVal);
					this.setBrowserStyle(el, "-moz-text-shadow", strVal);
					this.setBrowserStyle(el, "-webkit-text-shadow", strVal);
					break;
				case 'TwoNumeric':
					var unit;
					if(rules[r].unit) {
						unit = rules[r].unit;
					} else {
						unit = this.defs[r].unit;
					}
					el.style[styleName] = this.generateTwoNumericStyle( rules[r], unit);
					break;
				case 'ThreeNumeric':
					var unit;
					if(rules[r].unit) {
						unit = rules[r].unit;
					} else {
						unit = this.defs[r].unit;
					}
					el.style[styleName] = this.generateThreeNumericStyle( rules[r], unit);
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
	generateColorStyle: function(rule) {
		var tr = "";
		switch(rule.type) {
			case 'fixed':
				tr = rule.value;
				break;
			case 'list':
				tr = this.generateListVariation(rule);
				break;
			case 'color':
				tr = this.generateColorVariation(rule);
				break
		}
		if(tr.charAt(0) === "#") return tr;
		return "#" + tr;
	},
	generateColorVariation: function(rule) {
		var rgbHex = "";
		rgbHex += this.generateRGBHex(rule.r);
		rgbHex += this.generateRGBHex(rule.g);
		rgbHex += this.generateRGBHex(rule.b);
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
	generateNumericStyle: function(rule, unit) {
		if(!!unit) rule.unit = unit;
		switch(rule.type) {
			case 'fixed':
				return rule.value;
                break;
			case "list":
				return this.generateListVariation(rule);
				break;
			case "numeric":
				return this.generateNumericVariation(rule);
				break;
		}
	},
	generateNumericVariation: function( rule ) {
		//Pixels is default unit
		if(typeof rule.unit == 'undefined') rule.unit = "px";

		var range = rule.max - rule.min;
		switch(rule.numericType) {
			case "random":
				return this.roundUnit( ((Math.random()*range) + rule.min), rule.unit);
				break;
			case "sequential":
				return this.roundUnit( (rule.min + (( range/this.totalSteps)*this.currentStep)), rule.unit );
				break;
			case "function":
				var stepFuncObj = {};
				stepFuncObj.totalSteps = this.totalSteps;
				stepFuncObj.currentStep = this.currentStep;
				stepFuncObj.range = range;
				stepFuncObj.min = rule.min;
				stepFuncObj.max = rule.max;

				return this.roundUnit( rule.stepFunction.apply(stepFuncObj), rule.unit );
				break;
		}
	},
	generateListStyle: function(rule, unit) {
		if(!!unit) rule.unit = unit;
		switch(rule.type) {
			case 'fixed':
				return rule.value;
                break;
			case "list":
				return this.generateListVariation(rule);
				break;
		}
	},
	generateListVariation: function(rule) {
		if(typeof rule.unit === 'undefined') rule.unit = "";
		switch(rule.listType) {
			case "random":
				var randomIndex = Math.floor((Math.random() * rule.values.length));
				return rule.values[randomIndex] + rule.unit;
				break;
			case "sequential":
				return rule.values[this.currentStep % rule.values.length] + rule.unit;
				break;
			case "function":
				var stepFuncObj = {};
				stepFuncObj.totalSteps = this.totalSteps;
				stepFuncObj.currentStep = this.currentStep;
				stepFuncObj.valuesLength = rule.values.length;

				return rule.values[Math.floor(rule.stepFunction.apply(stepFuncObj))] + rule.unit;
				break;
		}
	},
	generateBoxShadowStyle: function(rule) {
		switch(rule.type) {
			case 'fixed':
				return rule.value;
                break;
			case "list":
				return this.generateListVariation(rule);
				break;
			case "array":
				var strVal = "";
				for(var i=0; i<rule.array.length; i++) {
					strVal += (i==0? "":",") + this.generateBoxShadowVariation(rule.array[i]);
				}
				return strVal;
				break;
			case "compound":
				return this.generateBoxShadowVariation(rule);
				break;
		}
	},
	generateBoxShadowVariation: function(rule) {
		var strVal = "";
		if (!!rule.inset && rule.inset) strVal = "inset";
		strVal += " " + this.generateNumericStyle(rule.hShadow, 'px');
		strVal += " " + this.generateNumericStyle(rule.vShadow, 'px');
		strVal += " " + this.generateNumericStyle(rule.blur, 'px');
		strVal += " " + this.generateNumericStyle(rule.spread, 'px');
		strVal += " " + this.generateColorStyle(rule.color);
		return strVal;
	},
	generateTextShadowStyle: function(rule) {
		switch(rule.type) {
			case 'fixed':
				return rule.value;
                break;
			case "list":
				return this.generateListVariation(rule);
				break;
			case "array":
				var strVal = "";
				for(var i=0; i<rule.array.length; i++) {
					strVal += (i==0? "":", ") + this.generateTextShadowVariation(rule.array[i]);
				}
				return strVal;
				break;
			case "compound":
				return this.generateTextShadowVariation(rule);
				break;
		}
	},
	generateTextShadowVariation: function(rule) {
		var strVal = "";
		strVal += " " + this.generateNumericStyle(rule.hShadow, 'px');
		strVal += " " + this.generateNumericStyle(rule.vShadow, 'px');
		strVal += " " + this.generateNumericStyle(rule.blurRadius, 'px');
		strVal += " " + this.generateColorStyle(rule.color);
		return strVal;
	},
	generateTwoNumericStyle: function(rule, unit) {
		switch(rule.type) {
			case 'fixed':
				return rule.value;
                break;
			case "list":
				return this.generateListVariation(rule);
				break;
			case "compound":
				var strVal = "";
				strVal += " " + this.generateNumericStyle(rule.x, unit);
				strVal += " " + this.generateNumericStyle(rule.y, unit);
				return strVal;
				break;
		}
	},
	generateThreeNumericStyle: function(rule, unit) {
		switch(rule.type) {
			case 'fixed':
				return rule.value;
                break;
			case "list":
				return this.generateListVariation(rule);
				break;
			case "compound":
				var strVal = "";
				strVal += " " + this.generateNumericStyle(rule.x, unit);
				strVal += " " + this.generateNumericStyle(rule.y, unit);
				if(!!rule.z) strVal += " " + this.generateNumericStyle(rule.z, unit);
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
                break;
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

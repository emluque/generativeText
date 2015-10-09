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
	this.params = params;
	this.opts = options;
}

generativeText.prototype = {
	defs: {
		rotate: ['Rotate'],
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
		opacity: ['Numeric', ";", "opacity"],
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
	totalSteps: 0,
	currentStep: 0,
	memory: [],
	stepFuncObj: {},
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
	applyToElementById: function (id) {

		var elem = document.getElementById(id);
		if(!elem) {
			throw ("generativeText Error - Not a valid ID: " + id);
			return;
		}

        this.applyToElement(elem);

	},
    applyToElement: function(elem) {
        this.currentStep = 0;
        this.memory = [];
        this.container = elem;

        if(!!this.opts) {
            if(this.opts.applyTo == "words") {
                this.applyToWords(elem);
                return;
            }
        } else {
            this.opts = {};
        }

        this.applyToText(elem);
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

		if(!!this.opts.pObj) {
			this.opts.pObj.totalSteps = this.totalSteps;
            this.opts.pObj.memory = this.memory;
            this.opts.pObj.container = this.container;
		}

	},
	getElementText: function(elem) {
		var text;

		if(!!elem.textContent) {
			text = elem.textContent;
		} else {
			text = elem.innerText;
		}
		return text;
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

		var length = text.length;

		//Add new elements
		for(var i=0; i<length; i++) {

			//Pre Function
			if(!!this.opts && !!this.opts.pObj && !!this.opts.pObj.preFunc && this.opts.pObj.preFunc instanceof Function) {
				this.applyPFunc(this.opts.pObj, elem, 'preFunc');
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
				this.applyPFunc(this.opts.pObj, elem, 'posFunc');
			}

			this.currentStep++;
		}
	},
	appendTextElement: function(elem, ne) {
				if(!!this.opts && !!this.opts.memory) this.memory.push( ne );
				elem.appendChild( ne );
	},
	initializeApplyToWords: function(length) {

		//style is default
		if( typeof this.opts.textSpaces == 'undefined') this.opts.textSpaces = 'remove';

		if(this.opts.textSpaces == 'style' || this.opts.textSpaces == 'nostyle') {
			this.totalSteps = (length*2) - 1;
		} else {
			this.totalSteps = length;
		}

		if(!!this.opts.pObj) {
            this.opts.pObj.totalSteps = this.totalSteps;
            this.opts.pObj.memory = this.memory;
            this.opts.pObj.container = this.container;
		}
		
	},
	applyToWords: function( elem ) {

		var text = this.getElementText(elem);

		//Empty element
		elem.innerHTML = "";

		text = text.replace(/(&nbsp;)+/g, ' ');
		text = text.replace(/\s+/g, ' ');

		var words = text.split(/\s+/);

		var length = words.length;

		this.initializeApplyToWords(this.opts, length);

		for(var i=0; i<length; i++) {

			//Pre Function
			if(this.opts && this.opts.pObj && this.opts.pObj.preFunc && this.opts.pObj.preFunc instanceof Function) {
				this.applyPFunc(this.opts.pObj, elem, 'preFunc');
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
						spaceElement.innerHTML = ' ';
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
                case 'both':
                    newElement.innerHTML = ((i!=0)?'&nbsp;':'') + words[i] + ((i<(length-1))?'&nbsp;':'');
                    this.generateStyle( this.params, newElement);
                    this.appendTextElement(elem, newElement);
                    break;
			}

			//Post Function
			if(!!this.opts && !!this.opts.pObj && !!this.opts.pObj.posFunc && this.opts.pObj.posFunc instanceof Function) {
				this.applyPFunc(this.opts.pObj, elem, 'posFunc');
			}

			this.currentStep++;
		}

	},
	generateStyle: function( params, el) {
		var styleDefinition = "";

		for(var p in params) {
			//Check if definition exists
			if(typeof this.defs[ p ] == 'undefined') continue;

			var styleName = p.replace(/([A-Z])/g, function(m){ return '-' + m.toLowerCase(); } );

			switch( this.defs[ p ][0] ) {
				case 'Numeric':
					el.style[styleName] = this.generateNumericStyle(params[p], this.defs[p][1]);
				break;
				case 'Color':
					el.style[styleName] = "#" + this.generateColorStyle( params[p]);
				break;
				case 'List':
					if(styleName == 'background-image') {
						el.style[styleName] = "url('" + this.generateListStyle( params[p] ) + "')";
					} else {
						el.style[styleName] = this.generateListStyle( params[p] );
					}
				break;
				case 'Rotate':
					params[p].unit = "";
					var val = this.generateNumericVariation(params[p]);
					el.style["transform"] = "rotate(" + val + "deg)";
					el.style["-ms-transform"] = "rotate(" + val + "deg)";
					el.style["-webkit-transform"] = "rotate(" + val + "deg)";
				break;
			}
		}
		return styleDefinition;
	},
	generateColorStyle: function(params) {
		return this.generateColorVariation(params);
	},
	generateColorVariation: function(params) {
		params.unit = "";
		switch(params.type) {
			case 'list':
				return this.generateListVariation(params);
			break;
			case 'random':
				var rgb = { min:'00', max:'FF'};
				return this.generateRGBHex(rgb) + this.generateRGBHex(rgb) + this.generateRGBHex(rgb);
			break;
			case 'generate':
			default:
				var rgbHex = "";
				if(typeof params.r != 'undefined') rgbHex += this.generateRGBHex(params.r);
				if(typeof params.g != 'undefined') rgbHex += this.generateRGBHex(params.g);
				if(typeof params.b != 'undefined') rgbHex += this.generateRGBHex(params.b);
				return rgbHex;
			break;
		}
	},
	generateRGBHex: function(c) {
		if(!!c.fixed) {
			return c.fixed;
		} else if(!!c.min && !!c.max) {
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
		}
	},
	rgbCheck: function(s) {
		if(s.length == 1) s = "0" + s;
		return s;
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
					console.log("Aca puto");
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
		console.log()
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
	roundUnit: function(val, unit) {
		switch(unit) {
			case "opacity":
			//opacity is .2 but has no unit
				return val.toFixed(2);
			break;
			case "em":
			case "%":
				return val.toFixed(2) + unit;
			break;
			case "px":
			default:
				return Math.round(val) + unit;
			break;
		}
	},
	applyPFunc: function(pObj, elem, funcName) {
		pObj.currentStep = this.currentStep;
		pObj.elem = elem;

		pObj[ funcName ]();
	}
};

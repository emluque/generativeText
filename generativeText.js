var generativeText = {
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
		fontWeight: ['List']
	},
	totalSteps: 0,
	currentStep: 0,
	memory: [],
	stepFuncObj: {},
	applyToElems: function(elems, params, opts) {
		this.currentStep = 0;
		this.memory = [];

		//Set total steps
		this.totalSteps = elems.length;

		for(var i=0; i < elems.length; i++) {
			jel = jQuery(elems[i]);
			this.generateStyle(params, jel);
			if(!!opts && !!opts.memory) this.memory.push(jel);
			this.currentStep++;
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
	applyToElem: function (elem, params, opts) {
		this.currentStep = 0;
		this.memory = [];

		if(!!opts) {
			if(opts.applyTo == "words") {
				this.applyToWords(elem, params, opts);
				return;
			}
		} else {
			opts = {};
		}

		this.applyToText(elem, params, opts);				
	},
	initializeApplyToText: function(text, params, opts) {

		if(!!opts.removeSpaceDups) {
			text.replace(/\s+/g, ' ');
		}

		var length = text.length;

		//Set total steps
		this.totalSteps = length;

		if(opts.textSpaces == 'nostyleorcount' || opts.textSpaces == 'remove') {
			var countTextSpaces = text.split(" ").length - 1;
			this.totalSteps = this.totalSteps - countTextSpaces;
		}
	},
	applyToText: function( elem, params, opts ) {

		//style is default
		if( typeof opts.textSpaces == 'undefined') opts.textSpaces = 'style';
		//remove
		if( typeof opts.removeSpaceDups == 'undefined') opts.removeSpaceDups = true;

		var text = elem.text();

		//Empty element
		elem.empty();

		this.initializeApplyToText(text, params, opts);

		var length = text.length;

		//Add new elements
		for(var i=0; i<length; i++) {

			//Pre Function
			if(!!opts && !!opts.pObj && !!opts.pObj.preFunc && opts.pObj.preFunc instanceof Function) {
				this.applyPreFunc(opts.pObj, elem);
			}

			var t = text[i];
			if( /\s/.test(t) ) {

				newElement = jQuery('<span>&nbsp;</span>');

				switch(opts.textSpaces) {
					case 'style':
						this.generateStyle( params, newElement );
						this.appendTextElement(elem, newElement, opts);
					break;
					case 'nostyle':
						this.appendTextElement(elem, newElement, opts);
					break;
					case 'nostyleorcount':
						this.appendTextElement(elem, newElement, opts);
						this.currentStep--;
					break;
					case 'remove':
						this.currentStep--;
					break;
				}				
			} else {
				newElement = jQuery('<span>' + t + '</span>');
				this.generateStyle( params, newElement );
				this.appendTextElement(elem, newElement, opts);
			}
			
			//Post Function
			if(!!opts && !!opts.pObj && !!opts.pObj.posFunc && opts.pObj.posFunc instanceof Function) {
				this.applyPosFunc(opts.pObj, elem);
			}

			this.currentStep++;
		}
	},
	appendTextElement: function(elem, ne, opts) {
				if(!!opts && !!opts.memory) this.memory.push( ne );
				elem.append( ne );
	},
	applyToWords: function( elem, params, opts ) {

		//style is default
		if( typeof opts.textSpaces == 'undefined') opts.textSpaces = 'remove';

		var text = elem.text();

		//Empty element
		elem.empty();

		text = text.replace(/(&nbsp;)+/g, ' ');
		text = text.replace(/\s+/g, ' ');

		var words = text.split(/\s+/);

		var length = words.length;

		if(opts.textSpaces == 'style' || opts.textSpaces == 'nostyle') {
			this.totalSteps = (length*2) - 1;
		} else {
			this.totalSteps = length;
		}

		for(var i=0; i<length; i++) {

			//Pre Function
			if(opts && opts.pObj && opts.pObj.preFunc && opts.pObj.preFunc instanceof Function) {
				this.applyPreFunc(opts.pObj, elem);
			}

			switch(opts.textSpaces) {
				case 'style':
					newElement = jQuery('<span>' + words[i] + '</span>');
					this.generateStyle( params, newElement );
					this.appendTextElement(elem, newElement, opts);

					if(i!=(length-1)) {
						this.currentStep++;
						newElement = jQuery('<span>&nbsp;</span>');
						this.generateStyle( params, newElement );
						this.appendTextElement(elem, newElement, opts);
					}
				break;
				case 'nostyle':
					newElement = jQuery('<span>' + words[i] + '</span>');
					this.generateStyle( params, newElement );
					this.appendTextElement(elem, newElement, opts);

					if(i!=(length-1)) {
						this.currentStep++;
						newElement = jQuery('<span>&nbsp;</span>');
						this.appendTextElement(elem, newElement, opts);
					}
				break;
				case 'nostyleorcount':
					newElement = jQuery('<span>' + words[i] + '</span>');
					this.appendTextElement(elem, newElement, opts);
					this.generateStyle( params, newElement );

					if(i!=(length-1)) {
						newElement = jQuery('<span>&nbsp;</span>');
						this.appendTextElement(elem, newElement, opts);
					}
				break;
				case 'remove':
					newElement = jQuery('<span>' + words[i] + '</span>');
					this.generateStyle( params, newElement );
					this.appendTextElement(elem, newElement, opts);
				break;
				case 'even':
					if( (i % 2) != 0) {
						newElement = jQuery('<span>' + ((i!=0)?'&nbsp;':'') + words[i] + ((i<(length-1))?'&nbsp;':'') + '</span>');
						this.generateStyle( params, newElement );
					} else {
						newElement = jQuery('<span>' + words[i] + '</span>');						
						this.generateStyle( params, newElement );
					}
					this.appendTextElement(elem, newElement, opts);
				break;
				case 'odd':
					if( (i % 2) == 0) {
						newElement = jQuery('<span>' + ((i!=0)?'&nbsp;':'') + words[i] + ((i<(length-1))?'&nbsp;':'') + '</span>');
						this.generateStyle( params, newElement );
					} else {
						newElement = jQuery('<span>' + words[i] + '</span>');						
						this.generateStyle( params, newElement );
				}
					this.appendTextElement(elem, newElement, opts);
				break;
			}		

			//Post Function
			if(!!opts && !!opts.pObj && !!opts.pObj.posFunc && opts.pObj.posFunc instanceof Function) {
				this.applyPosFunc(opts.pObj, elem);
			}

			this.currentStep++;
		}

	},
	generateStyle: function( params, el ) {
		var styleDefinition = "";

		for(var p in params) {
			//Check if definition exists
			if(typeof this.defs[ p ] == 'undefined') continue;

			var styleName = p.replace(/([A-Z])/g, function(m){ return '-' + m.toLowerCase(); } );

			switch( this.defs[ p ][0] ) {
				case 'Numeric':
					el.css(styleName, this.generateNumericStyle(params[p], this.defs[p][1]) );
				break;
				case 'Color':
					el.css(styleName, '#' + this.generateColorStyle( params[p]) );
				break;
				case 'List':
					if(styleName == 'background-image') {
						el.css(styleName, "url('" + this.generateListStyle( params[p] ) + "')");
					} else {
						el.css(styleName, this.generateListStyle( params[p] ));
					}
				break;
				case 'Rotate':
					params[p].unit = "";
					var val = this.generateNumericVariation(params[p]);
					el.css({ 	"transform" : "rotate(" + val + "deg)",
								"-ms-transform" : "rotate(" + val + "deg)",
								"-webkit-transform" : "rotate(" + val + "deg)" });
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

					this.stepFuncObj.totalSteps = this.totalSteps;
					this.stepFuncObj.currentStep = this.currentStep;
					this.stepFuncObj.range = range;
					this.stepFuncObj.min = parseInt(c.min, 16);
					this.stepFuncObj.max = parseInt(c.max, 16);

					return this.rgbCheck(Math.floor( c.stepFunction.apply(this.stepFuncObj)).toString(16));
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
	generateNumericStyle: function(params, unit) {
		if(!!unit) params.unit = unit;
		return this.generateNumericVariation(params);
	},
	generateNumericVariation: function( params ) {

		//Pixels is default unit
		if(typeof params.unit == 'undefined') params.unit = "px";

		switch(params.type) {
			case "list":
				return this.generateListVariation(params);
			break;
			case "generate":
			default:
				var range = params.max - params.min;
				if( !!params.steps && params.steps == true) {
					if(!!params.stepFunction && params.stepFunction instanceof Function) {

						this.stepFuncObj.totalSteps = this.totalSteps;
						this.stepFuncObj.currentStep = this.currentStep;
						this.stepFuncObj.range = range;
						this.stepFuncObj.min = params.min;
						this.stepFuncObj.max = params.max;

						return this.roundUnit( params.stepFunction.apply(this.stepFuncObj), params.unit );
					} else {
						return this.roundUnit( (params.min + (( range/this.totalSteps)*this.currentStep)), params.unit );
					}
				} else {
					return this.roundUnit( ((Math.random()*range) + params.min), params.unit);
				}
			break;

		}
	},
	generateListStyle: function(params, unit) {
		if(!!unit) params.unit = unit;
		return this.generateListVariation(params);
	},
	generateListVariation: function(params) {
		if(typeof params.unit === 'undefined') params.unit = ""; 

		if( !!params.steps && params.steps == true) {
			if(!!params.stepFunction && params.stepFunction instanceof Function) {

				this.stepFuncObj.totalSteps = this.totalSteps;
				this.stepFuncObj.currentStep = this.currentStep;
				this.stepFuncObj.valuesLength = params.values.length;

				return params.values[ Math.floor( params.stepFunction.apply(this.stepFuncObj) ) ] + params.unit;
			} else {
				return params.values[ this.currentStep %  params.values.length] + params.unit;
			}
		} else {
			var randomIndex = Math.floor((Math.random()*params.values.length));		
			return params.values[ randomIndex ] + params.unit;
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
	applyPreFunc: function(pObj, elem) {
		f = {
			totalSteps: this.totalSteps,
			currentStep: this.currentStep,
			memory: this.memory,
			elem: elem
		};
		pObj.preFunc( f );
	},
	applyPosFunc: function(pObj, elem) {
		f = {
			totalSteps: this.totalSteps,
			currentStep: this.currentStep,
			memory: this.memory,
			elem: elem
		};
		pObj.posFunc( f );
	}

};

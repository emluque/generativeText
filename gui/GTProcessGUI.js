var GTProcessGUI = {

	processParams: function() {
		var params = {};

		var p = jQuery('.the-params');

		for(var i=0; i<p.length; i++) {
			var paramName = p[i].id;
			params[ paramName ] = {};
			console.log(paramName);

			switch( generativeText.defs[ paramName ][0]) {
				case 'List':
					GTProcessGUI.processParamList(paramName, params);
				break;
				case 'Numeric':
				case 'Rotate':
					GTProcessGUI.processParamNumeric(paramName, params);
				break;
				case 'Color':
					GTProcessGUI.processParamColor(paramName, params);
				break;
			}
		}
		return params;
	},

	processParamList: function( paramName, params ) {
		params[ paramName ]['values'] = jQuery('#' + paramName + 'Values').val().split(',');
		GTProcessGUI.processSteps(paramName, params);
	},

	processSteps: function( paramName, params ) {
		var steps = jQuery('#' + paramName + 'Steps').val();
		switch(steps) {
			case 'no':
			break;
			case 'yes':
				params[ paramName ]['steps'] = true;
			break;
			case 'function':
				params[ paramName ]['steps'] = true;
				try {
					eval('var stepFunction = ' + jQuery('#' + paramName + 'StepFunction').val() + ';');
					params[ paramName ]['stepFunction'] = stepFunction;
				} catch(err) {

				}		
			break;			
		}
	},

	processParamNumeric: function( paramName, params) {
		params[ paramName ]['type'] =  jQuery('#' + paramName + 'Type').val();
		switch( params[ paramName ]['type'] ) {
			case 'list':
				GTProcessGUI.processParamList( paramName, params );
			break;
			case 'generate':
				GTProcessGUI.processParamNumericGenerate( paramName, params);
			break;
		}
	},

	processParamNumericGenerate: function( paramName, params) {
		if(jQuery('#' + paramName + 'Unit').length != 0) params[ paramName ]['unit'] = jQuery('#' + paramName + 'Unit').val();
		params[ paramName ]['min'] = parseInt( jQuery('#' + paramName + 'Min').val() );
		params[ paramName ]['max'] = parseInt( jQuery('#' + paramName + 'Max').val() );
		GTProcessGUI.processSteps(paramName, params);
	},

	processParamColor: function( paramName, params) {
		params[ paramName ]['type'] =  jQuery('#' + paramName + 'Type').val();
		switch( params[ paramName ]['type'] ) {
			case 'list':
				GTProcessGUI.processParamList( paramName, params );
			break;
			case 'generate':
				GTProcessGUI.processParamColorGenerate( paramName, params);
			break;
			case 'random':
				return;
			break;
		}		
	},

	processParamColorGenerate: function( paramName, params) {
		GTProcessGUI.processParamColorGenerateColor( paramName, params, 'r');
		GTProcessGUI.processParamColorGenerateColor( paramName, params, 'g');
		GTProcessGUI.processParamColorGenerateColor( paramName, params, 'b');
	},

	processParamColorGenerateColor: function(paramName, params, c) {
		params[ paramName ][c] = {};
		switch( jQuery('#' + paramName + '-' + c + '-Type').val() ) {
			case 'fixed':
				params[ paramName ][c]['fixed'] = jQuery('#' + paramName + '-' + c + '-fixedValue').val();
			break;
			case 'range':
				params[ paramName ][c]['min'] = jQuery('#' + paramName + '-' + c + '-min').val();
				params[ paramName ][c]['max'] = jQuery('#' + paramName + '-' + c + '-max').val();
				var steps = jQuery('#' + paramName + '-' + c + 'Steps').val();
				switch(steps) {
					case 'no':
					break;
					case 'yes':
					params[ paramName ][c]['steps'] = true;
					break;
					case 'function':
					params[ paramName ][c]['steps'] = true;
					try {
						eval('var stepFunction = ' + jQuery('#' + paramName + '-' + c + 'StepFunction').val() + ';');
						params[ paramName ][c]['stepFunction'] = stepFunction;
					} catch(err) {

					}					
					break;
				}
			break;
		}

	},

	processOpts: function() {
		var opts = {};

		opts['applyTo'] = jQuery("#opts-applyTo").val();
		opts['textSpaces'] = jQuery("#opts-textspaces").val();

		if(opts['applyTo'] == 'text') opts['removeSpaceDups'] = !!jQuery("#opts-removeSpaceDups").prop('checked');

		return opts;
	}
}
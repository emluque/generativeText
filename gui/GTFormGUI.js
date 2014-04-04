var GTFormGUI = {

	populateAddParams:  function() {
		var select = jQuery("#select-param-name");
		for(var k in generativeText.defs) {
			select.append('<option value="' +  k + '">' + k + '</option>');
		}
	},

	addParamFields: function() {
		var selectedParam = jQuery("#select-param-name").val();
		var containerDiv = jQuery("#params-tab");
		if( jQuery('#div-' + selectedParam).length == 0 ) {
			switch(generativeText.defs[ selectedParam ][0]) {
				case 'Numeric':	
				case 'Rotate':
					containerDiv.append( GTFormGUI.addNumericParam( selectedParam ) );
				break;
				case 'List':
					containerDiv.append( GTFormGUI.addListParam( selectedParam ) );
				break;
				case 'Color':
					containerDiv.append( GTFormGUI.addColorParam( selectedParam ) );
				break;
			}
		}
	},

	addNumericParam: function(paramName) {
		var html = '<div class="form-group div-param" id="div-' + paramName + '">';
		html += '<h2>' + paramName + '</h2><input type="hidden" id="' + paramName + '" class="the-params">';
		html += '<div class="form-group">'; 
		html += '	<label for="' + paramName + 'Type" class="col-sm-2 control-label">Type</label>'; 
		html += '		<div class="col-sm-10">'; 
		html += '			<select class="form-control" id="' + paramName + 'Type">'; 
		html += '				<option value="generate">Generate</option>'; 
		html += '				<option value="list">List</option>'; 
		html += '			</select>'; 
		html += '		</div>'; 
		html += '</div>';;
		html += '</div>';
		var mainh = jQuery(html);
		mainh.append( GTFormGUI.addNumericGenerateFields( paramName ) );

		//Add select control
		jQuery('#' + paramName + 'Type', mainh).click( function() {
			switch(jQuery(this).val()) {
				case 'list':
					jQuery('#div-' + paramName + '-numeric-fields').remove();
					if(jQuery('#div-' + paramName + '-list-fields').length == 0) mainh.append( GTFormGUI.addListFields( paramName ) );
				break;
				case 'generate':
					jQuery('#div-' + paramName + '-list-fields').remove();
					if(jQuery('#div-' + paramName + '-numeric-fields').length == 0) mainh.append( GTFormGUI.addNumericGenerateFields( paramName ) );
				break;
			}
		})
		return mainh;
	},

	addListParam: function(paramName) {
		var html = '<div class="form-group div-param" id="div-' + paramName + '">';
		html += '<h3>' + paramName + '</h3><input type="hidden" id="' + paramName + '" class="the-params">';
		html += '</div>';
		var mainh = jQuery(html);
		mainh.append( GTFormGUI.addListFields( paramName ) );
		return mainh;
	},

	addListFields: function(paramName) {
		var html='<div id="div-' + paramName + '-list-fields">'; 
		html+='	<div class="form-group">'; 
		html+='		<label for="' + paramName + 'Values" class="col-sm-2 control-label">Values</label>'; 
		html+='		<div class="col-sm-10">'; 
		html+='			<textarea class="form-control" id="' + paramName + 'Values"></textarea>'; 
		html+='		</div>'; 
		html+='	</div>'; 
		html+='</div>';
		var lfh = jQuery(html);
		lfh.append( GTFormGUI.addStepFields(paramName) );
		lfh.append( GTFormGUI.addRemoveButton(paramName) );
		return lfh;
	},

	addStepFields: function( paramName ) {
		var html ='<div>';
		html+='	<div class="form-group">'; 
		html+='		<label for="' + paramName + 'Steps" class="col-sm-2 control-label">Steps?</label>'; 
		html+='		<div class="col-sm-10">'; 
		html += '			<select class="form-control" id="' + paramName + 'Steps">'; 
		html += '				<option value="no">No</option>'; 
		html += '				<option value="yes">Yes</option>'; 
		html += '				<option value="function">Step Function</option>'; 
		html += '			</select>'; 
		html+='		</div>'; 
		html+='	</div>';
		html+='</div>'; 
		var sh = jQuery(html);
		jQuery('#' + paramName + 'Steps', sh).change( function() {
			switch(jQuery(this).val()) {
				case 'no':
				case 'yes':
					jQuery('#div-' + paramName +  '-stepFunction').remove();
				break;
				case 'function':
					if( jQuery('#div-' + paramName +  '-stepFunction').length == 0 ) sh.append( GTFormGUI.addStepFunctionField( paramName ) );
				break;
			}
		});
		return sh;
	},

	addStepFunctionField: function( paramName ) {
		var html ='	<div class="form-group" id="div-' + paramName +  '-stepFunction">'; 
		html+='		<label for="' + paramName + 'StepFunction" class="col-sm-2 control-label">Step Function</label>'; 
		html+='		<div class="col-sm-10">'; 
		html+='			<textarea class="form-control" id="' + paramName + 'StepFunction"></textarea>'; 
		html+='		</div>'; 
		html+='	</div>'; 
		return jQuery(html);
	},

	addRemoveButton: function( paramName ) {
		var html = '<div class="form-group">';
		html += '	<div class="col-sm-10">&nbsp;</div>';
		html += '	<button type="button" class="btn btn-primary  col-sm-2" id="btn-remove-param-' + paramName + '">';
		html += '			<span class="glyphicon glyphicon-minus"></span> Remove';
		html += '	</button>';
		html += '</div>';
		var bh = jQuery(html);
		jQuery('#btn-remove-param-' + paramName, bh).click( function() {
			jQuery('#div-' + paramName).remove();
		});
		return bh;
	},

	addNumericGenerateFields: function( paramName ) {
		var html  = '<div id="div-' + paramName + '-numeric-fields"><div class="form-group">';
		html += '	<label for="' + paramName +'-unit" class="col-sm-2 control-label">Unit</label>';
		html += '	<div class="col-sm-10">';

		//Decide Type of unit based on paramName
		switch(paramName) {
			case 'rotate':
				html += '		degrees';
			break;
			case 'borderRadius':
			case 'borderTopLeftRadius':
			case 'borderTopRightRadius':
			case 'borderBottomLeftRadius':
			case 'borderBottomRightRadius':
				html += '		%';
			break;
			case 'opacity':
				html += '		(0.00 to 1.00)';
			break;
			default:
			html += '<select class="form-control" id="' + paramName +'Unit">';
			html += '	<option value="em">em</option>';
			html += '	<option value="px">px</option>';
			html += '</select>';
		}
		html += '	</div>';
		html += '</div>';
		html += '<div class="form-group">';
		html += '	<label class="col-sm-2 control-label" for="' + paramName +'Min">Min</label>';
		html += '	<div class="col-sm-1">';
		html += '		<input type="text" class="form-control" id="' + paramName +'Min"/>';
		html += '	</div>';
		html += '	<div class="col-sm-9">&nbsp;</div>';
		html += '</div>';
		html += '<div class="form-group">';
		html += '	<label class="col-sm-2 control-label" for="' + paramName +'Max">Max</label>';
		html += '	<div class="col-sm-1">';
		html += '		<input type="text" class="form-control" id="' + paramName +'Max"/>';
		html += '	</div>';
		html += '	<div class="col-sm-9">&nbsp;</div>';
		html += '</div></div>';

		var ngh = jQuery(html);
		ngh.append( GTFormGUI.addStepFields( paramName ) );
		ngh.append( GTFormGUI.addRemoveButton( paramName ) );
		return ngh;
	},

	addColorParam: function(paramName) {
		var html = '<div class="form-group div-param" id="div-' + paramName + '">';
		html += '<h3>' + paramName + '</h3><input type="hidden" id="' + paramName + '" class="the-params">';
		html += '<div class="form-group">'; 
		html += '	<label for="' + paramName + 'Type" class="col-sm-2 control-label">Type</label>'; 
		html += '		<div class="col-sm-10">'; 
		html += '			<select class="form-control" id="' + paramName + 'Type">'; 
		html += '				<option value="generate">Generate</option>'; 
		html += '				<option value="list">List</option>'; 
		html += '				<option value="random">Random</option>'; 
		html += '			</select>'; 
		html += '		</div>'; 
		html += '</div>';;
		html += '</div>';
		var mainh = jQuery(html);
		mainh.append( GTFormGUI.addColorGenerateFields( paramName ) );

		//Add select control
		jQuery('#' + paramName + 'Type', mainh).click( function() {
			switch(jQuery(this).val()) {
				case 'list':
					jQuery('#div-' + paramName + '-color-fields').remove();
					if(jQuery('#div-' + paramName + '-list-fields').length == 0) mainh.append( GTFormGUI.addListFields( paramName ) );
				break;
				case 'generate':
					jQuery('#div-' + paramName + '-list-fields').remove();
					if(jQuery('#div-' + paramName + '-color-fields').length == 0) mainh.append( GTFormGUI.addColorGenerateFields( paramName ) );
				break;
				case 'random':
					jQuery('#div-' + paramName + '-list-fields').remove();
					jQuery('#div-' + paramName + '-color-fields').remove();
				break;
			}
		});
		return mainh;
	},

	addColorGenerateFields: function( paramName ) {
		var html  = '<div id="div-' + paramName + '-color-fields">';
		html += '</div>';

		var ngh = jQuery(html);
		ngh.append( GTFormGUI.addColorField(paramName, "r"));
		ngh.append( GTFormGUI.addColorField(paramName, "g"));
		ngh.append( GTFormGUI.addColorField(paramName, "b"));
		ngh.append( GTFormGUI.addRemoveButton( paramName ) );
		return ngh;
	},

	addColorField: function( paramName, c) {
		var html = '<div>';
		html += "<h3>" + c + "</h3>";
		html += '<div class="form-group">';
		html += '	<label class="col-sm-2 control-label" for="' + paramName + '-' + c + '-Type">Type</label>';
		html += '	<div class="col-sm-10">';
		html += '			<select class="form-control" id="' + paramName + '-' + c + '-Type">'; 
		html += '				<option value="range">Range</option>'; 
		html += '				<option value="fixed">Fixed</option>'; 
		html += '			</select>'; 
		html += '	</div>';
		html += '</div>';
		html += '</div>';
		var ch = jQuery( html);
		ch.append( GTFormGUI.addColorRangeFields(paramName, c));
		jQuery('#' + paramName + '-' + c + '-Type', ch).change( function() {
			switch(jQuery(this).val()) {
				case 'range':
					jQuery('#div-' + paramName + '-' + c + '-fixed-fields').remove();
					if(jQuery('#div-' + paramName + '-' + c + '-range-fields').length == 0) ch.append( GTFormGUI.addColorRangeFields( paramName, c ) );
				break;
				case 'fixed':
					jQuery('#div-' + paramName + '-' + c + '-range-fields').remove();
					if(jQuery('#div-' + paramName + '-' + c + '-fixed-fields').length == 0) ch.append( GTFormGUI.addColorFixedFields( paramName, c ) );
				break;
			}
		});
		return ch;
	},

	addColorRangeFields: function( paramName, c) {
		var html = '<div id="div-' + paramName + '-' + c + '-range-fields">';
		html += '<div class="form-group">';
		html += '	<label class="col-sm-2 control-label" for="' + paramName + '-' + c + '-min"> Min</label>';
		html += '	<div class="col-sm-1">';
		html += '		<input type="text" class="form-control" id="' + paramName + '-' + c + '-min"/>';
		html += '	</div>';
		html += '	<div class="col-sm-9">&nbsp;</div>';
		html += '</div>';
		html += '<div class="form-group">';
		html += '	<label class="col-sm-2 control-label" for="' + paramName + '-' + c + '-max"> Max</label>';
		html += '	<div class="col-sm-1">';
		html += '		<input type="text" class="form-control" id="' + paramName + '-' + c + '-max"/>';
		html += '	</div>';
		html += '	<div class="col-sm-9">&nbsp;</div>';
		html += '</div>';
		html += '</div>';
		var crh = jQuery( html );
		crh.append( GTFormGUI.addStepFields( paramName + '-' + c ) );
		return crh;
	},

	addColorFixedFields: function( paramName, c) {
		var html = '<div id="div-' + paramName + '-' + c + '-fixed-fields">';
		html += '<div class="form-group">';
		html += '	<label class="col-sm-2 control-label" for="' + paramName + '-' + c + '-fixedValue"> Value</label>';
		html += '	<div class="col-sm-1">';
		html += '		<input type="text" class="form-control" id="' + paramName + '-' + c + '-fixedValue"/>';
		html += '	</div>';
		html += '	<div class="col-sm-9">&nbsp;</div>';
		html += '</div>';
		html += '</div>';
		var cfh = jQuery( html );
		return cfh;
	},

	addOptsTextFields: function() {
		var html = '<div id="div-opts-text">';
		html += '<div class="form-group">';
		html += '	<label class="col-sm-2 control-label" for="opts-textspaces">Text Spaces</label>';
		html += '	<div class="col-sm-10">';
		html += '			<select class="form-control" id="opts-textspaces">'; 
		html += '				<option value="style">style</option>'; 
		html += '				<option value="nostyle">nostyle</option>'; 
		html += '				<option value="nostyleorcount">nostyleorcount</option>'; 
		html += '				<option value="remove">remove</option>'; 
		html += '			</select>'; 
		html += '	</div>';
		html += '<div class="form-group">';
		html += '	<div class="col-sm-10 col-sm-offset-2">';
		html += '		<div class="checkbox" style="margin-left: 1em;">';
		html += '			<label>'
		html += '				<input type="checkbox"> Remove Space Duplicates';
		html += '			</label>';
		html += '		</div>'; 
		html += '	</div>';
		html += '</div>';

		var oth = jQuery(html);
		jQuery('#options-tab').append( oth );
	},

	addOptsWordsFields: function() {
		var html = '<div id="div-opts-words">';
		html += '<div class="form-group">';
		html += '	<label class="col-sm-2 control-label" for="opts-textspaces">Text Spaces</label>';
		html += '	<div class="col-sm-10">';
		html += '			<select class="form-control" id="opts-textspaces">'; 
		html += '				<option value="style">style</option>'; 
		html += '				<option value="nostyle">nostyle</option>'; 
		html += '				<option value="nostyleorcount">nostyleorcount</option>';
		html += '				<option value="remove">remove</option>'; 
		html += '				<option value="even">even</option>'; 
		html += '				<option value="odd">odd</option>'; 
		html += '			</select>'; 
		html += '	</div>';
		html += '</div>';

		var owh = jQuery(html);
		jQuery('#options-tab').append( owh );
	},

	applyToChange: function() {
		switch( jQuery(this).val() ) {
			case 'text':
				jQuery('#div-opts-words').remove();
				if(jQuery('#div-opts-text').length == 0) GTFormGUI.addOptsTextFields();
			break;
			case 'words':
				jQuery('#div-opts-text').remove();
				if(jQuery('#div-opts-words').length == 0) GTFormGUI.addOptsWordsFields();
			break;
		}
	}
}
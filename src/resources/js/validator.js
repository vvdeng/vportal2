// Title: Tigra Form Validator
// URL: http://www.softcomplex.com/products/tigra_form_validator/
// Version: 1.3
// Date: 08/25/2005 (mm/dd/yyyy)
// Notes: This script is free. Visit official site for further details.

// regular expressions or function to validate the format
var re_dt = /^(\d{4})\-(\d{2})\-(\d{2})$/,
re_tm = /^(\d{1,2})\:(\d{1,2})\:(\d{1,2})$/,
full_re_dt_tm = /^(\d{4})\-(\d{2})\-(\d{2})\s(\d{1,2})\:(\d{1,2})\:(\d{1,2})$/,
re_short_tm = /^(\d{2})\:(\d{2})$/,
a_formats = {
	'alpha'   : /^[a-zA-Z\.\-]*$/,
	'lowercase_pure_alpha'   : /^[a-z]*$/,
	'english_name_multiline'   : /^([a-zA-Z]{2,20}|[1-9]\d{4,9}\s*)+$/,
	'english_name'   : /^[a-zA-Z]{2,20}$/,
	'alphanum': /^\w+$/,
	'alphanum_underscore': /^[\u4e00-\u9fa5\w\d\s\-\_]+$/,
	'unsigned': /^\d+$/,
	'integer' : /^\d*$/,
	'batch_qq' : /^([1-9]\d{4,9},?)*$/,
	'batch_qq_multiline' : /^([1-9]\d{4,9}(\r\n)?)*$/,
	'qq' : /^[1-9]\d{4,9}$/,
	'any_batch_qq' : /^([1-9]\d{4,9},?(\r\n)?)*$/,
	'batch_email'   : /^((([\w-\.]+\@[\w\.-]+\.[a-z]{2,4})|([1-9]\d{4,9})),?)*$/,
	'percent' : /^(100|([1-9]?[0-9]{1}))(\.[0-9]{1}[0-9]{0,1})?$/,
	'real'    : /^[\+\-]?\d*\.?\d*$/,
	'unsigned_real'    : /^[\+]?\d*\.?\d*$/,
	'email'   : /^[\w-\.]+\@[\w\.-]+\.[a-z]{2,4}$/,
	'rich_email'   : /^[\u4e00-\u9fa5\w\d\s\-\_]*\<?[\w-\.]+\@[\w\.-]+\.[a-z]{2,4}\>?$/,
	'qq_email': /^[1-9]\d{4,9}(\,[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+)?$/,
	'phone'   : /^[\d\.\s\-\+]+$/,
	'ip':/^((1?\d?\d|(2([0-4]\d|5[0-5])))\.){3}(1?\d?\d|(2([0-4]\d|5[0-5])))$/,
	'date'    : function (s_date) {
		// check format
		if (!re_dt.test(s_date)) {
			return false; 
		}
		// check allowed ranges	
		if (RegExp.$3 > 31 || RegExp.$2 > 12) {
			return false;
		}
		// check number of day in month
		var dt_test = new Date(RegExp.$1, Number(RegExp.$2-1), RegExp.$3);
		if (dt_test.getMonth() != Number(RegExp.$2-1)) {
			return false;
		}
		return true;
	},
	'time'    : function (s_time) {
		// check format
		if (!re_tm.test(s_time))
			return false;
		// check allowed ranges	
		if (RegExp.$1 > 23 || RegExp.$2 > 59 || RegExp.$3 > 59)
			return false;
		return true;
	},
	'full_date_time'    : function (s_time) {
		// check format
		if (!full_re_dt_tm.test(s_time))
			return false;
		// check allowed ranges	
		if (RegExp.$3 > 31 || RegExp.$2 > 12) {
			return false;
		}
		// check number of day in month
		var dt_test = new Date(RegExp.$1, Number(RegExp.$2-1), RegExp.$3);
		if (dt_test.getMonth() != Number(RegExp.$2-1)) {
			return false;
		}
		// check allowed ranges	
		if (RegExp.$4 > 23 || RegExp.$5 > 59 || RegExp.$6 > 59)
			return false;
		return true;
	},
	'short_time'    : function (s_time) {
		// check format
		if (!re_short_tm.test(s_time))
			return false;
		// check allowed ranges	
		if (RegExp.$1 > 23 || RegExp.$2 > 59)
			return false;
		return true;
	}
},
a_messages = [
	'No form name passed to validator construction routine',
	'No array of "%form%" form fields passed to validator construction routine',
	'Form "%form%" can not be found in this document',
	'Incomplete "%n%" form field descriptor entry. "label" attribute is missing',
	'Can not find form field "%n%" in the form "%form%"',
	'Can not find label tag (id="%tagId%")',
	'Can not verify match. Field "%match%" was not found',
	'"%label%" is a required field',
	'Value for "%label%" must be %minLength% characters or more',
	'Value for "%label%" must be no longer than %maxLength% characters',
	'"%v%" is not valid value for "%label%"',
	'"%label%" must match "%ml%"'
]

// validator counstruction routine
function validator(s_form, a_fields, o_cfg) {
	this.f_error = validator_error;
	this.f_alert = o_cfg && o_cfg.alert
		? function(s_msg) { alert(s_msg); return false }
		: function() { return false };
		
	// check required parameters
	if (!s_form)	
		return this.f_alert(this.f_error(0));
	this.s_form = s_form;
	
	if (!a_fields || typeof(a_fields) != 'object')
		return this.f_alert(this.f_error(1));
	this.a_fields = a_fields;

	this.a_2disable = o_cfg && o_cfg['to_disable'] && typeof(o_cfg['to_disable']) == 'object'
		? o_cfg['to_disable']
		: [];
		
	this.exec = validator_exec;
}

// validator execution method
function validator_exec() {
	var o_form = document.forms[this.s_form];
	if (!o_form)	
		return this.f_alert(this.f_error(2));
		
	b_dom = document.body && document.body.innerHTML;
	
	// check integrity of the form fields description structure
	for (var n_key in this.a_fields) {
		// check input description entry
		this.a_fields[n_key]['n'] = n_key;
		if (!this.a_fields[n_key]['label'])
			return this.f_alert(this.f_error(3, this.a_fields[n_key]));
		o_input = o_form.elements[n_key];
		if (!o_input)
			return this.f_alert(this.f_error(4, this.a_fields[n_key]));
		this.a_fields[n_key].o_input = o_input;
	}

	// reset labels highlight
	if (b_dom)
		for (var n_key in this.a_fields) 
			if (this.a_fields[n_key]['tagId']) {
				var s_labeltag = this.a_fields[n_key]['tagId'], e_labeltag = get_element(s_labeltag);
				if (!e_labeltag)
					return this.f_alert(this.f_error(5, this.a_fields[n_key]));
				this.a_fields[n_key].o_tag = e_labeltag;
				
				// normal state parameters assigned here
				//e_labeltag.className = 'tfvNormal';
				e_labeltag.style.color = 'black';
			}

	// collect values depending on the type of the input
	for (var n_key in this.a_fields) {
		var s_value = '';
		o_input = this.a_fields[n_key].o_input;
		if (o_input.type == 'checkbox') // checkbox
			s_value = o_input.checked ? o_input.value : '';
		else if (o_input.value) // text, password, hidden
			s_value = o_input.value;
		else if (o_input.options) // select
			s_value = o_input.selectedIndex > -1
				? o_input.options[o_input.selectedIndex].value
				: null;
		else if (o_input.length > 0) // radiobuton
			for (var n_index = 0; n_index < o_input.length; n_index++)
				if (o_input[n_index].checked) {
					s_value = o_input[n_index].value;
					break;
				}
		this.a_fields[n_key]['v'] = s_value.replace(/(^\s+)|(\s+$)/g, '');
	}
	
	// check for errors
	var n_errors_count = 0,
		n_another, o_format_check;
	for (var n_key in this.a_fields) {
		o_format_check = this.a_fields[n_key]['format'] && a_formats[this.a_fields[n_key]['format']]
			? a_formats[this.a_fields[n_key]['format']]
			: null;

		// reset previous error if any
		this.a_fields[n_key].n_error = null;

		// check reqired fields
		if (this.a_fields[n_key]['required'] && !this.a_fields[n_key]['v']) {
			this.a_fields[n_key].n_error = 1;
			n_errors_count++;
		}
		// check length
		else if (this.a_fields[n_key]['minLength'] && this.a_fields[n_key]['v'] != '' && String(this.a_fields[n_key]['v']).length < this.a_fields[n_key]['minLength']) {
			this.a_fields[n_key].n_error = 2;
			n_errors_count++;
		}
		else if (this.a_fields[n_key]['maxLength'] && String(this.a_fields[n_key]['v']).length > this.a_fields[n_key]['maxLength']) {
			this.a_fields[n_key].n_error = 3;
			n_errors_count++;
		}
		// check format
		else if (this.a_fields[n_key]['v'] && this.a_fields[n_key]['format'] && (
			(typeof(o_format_check) == 'function'
			&& !o_format_check(this.a_fields[n_key]['v']))
			|| (typeof(o_format_check) != 'function'
			&& !o_format_check.test(this.a_fields[n_key]['v'])))
			) {
			this.a_fields[n_key].n_error = 4;
			n_errors_count++;
		}
		// check match	
		else if (this.a_fields[n_key]['match']) {
			for (var n_key2 in this.a_fields)
				if (n_key2 == this.a_fields[n_key]['match']) {
					n_another = n_key2;
					break;
				}
			if (n_another == null)
				return this.f_alert(this.f_error(6, this.a_fields[n_key]));
			if (this.a_fields[n_another]['v'] != this.a_fields[n_key]['v']) {
				this.a_fields[n_key]['ml'] = this.a_fields[n_another]['label'];
				this.a_fields[n_key].n_error = 5;
				n_errors_count++;
			}
		}

		// check value
		else if (this.a_fields[n_key]['minValue'] && parseInt(this.a_fields[n_key]['v']) < this.a_fields[n_key]['minValue']) {
			this.a_fields[n_key].n_error = 6;
			n_errors_count++;
		}
		else if (this.a_fields[n_key]['maxValue'] && parseInt(this.a_fields[n_key]['v']) > this.a_fields[n_key]['maxValue']) {
			this.a_fields[n_key].n_error = 7;
			n_errors_count++;
		}
	}

	// collect error messages and highlight captions for errorneous fields
	var s_alert_message = '',
		e_first_error;

	if (n_errors_count) {
		for (var n_key in this.a_fields) {
			var n_error_type = this.a_fields[n_key].n_error,
				s_message = '';
				
			if (n_error_type)
				s_message = this.f_error(n_error_type + 6, this.a_fields[n_key]);

			if (s_message) {
				if (!e_first_error)
					e_first_error = o_form.elements[n_key];
				s_alert_message += s_message + "\n";
				// highlighted state parameters assigned here
				if (b_dom && this.a_fields[n_key].o_tag)
					//this.a_fields[n_key].o_tag.className = 'tfvHighlight';
					this.a_fields[n_key].o_tag.style.color = 'red';
			}
		}
		alert(s_alert_message);
		// set focus to first errorneous field
		if (e_first_error.focus && e_first_error.type != 'hidden'  && !e_first_error.disabled)
			eval("e_first_error.focus()");
		// cancel form submission if errors detected
		return false;
	}
	
	for (n_key in this.a_2disable)
		if (o_form.elements[this.a_2disable[n_key]])
			o_form.elements[this.a_2disable[n_key]].disabled = true;

	return true;
}

function validator_error(n_index) {
	var s_ = a_messages[n_index], n_i = 1, s_key;
	for (; n_i < arguments.length; n_i++)
		for (s_key in arguments[n_i])
			s_ = s_.replace('%' + s_key + '%', arguments[n_i][s_key]);
	s_ = s_.replace('%form%', this.s_form);
	return s_
}

function get_element (s_id) {
	return (document.all ? document.all[s_id] : (document.getElementById ? document.getElementById(s_id) : null));
}
//单行去除空格
function trimValue(thisObj) {
	thisObj.value = (thisObj.value).replace(/^\s*|\s*$/g,"");
}
//多行去除空格
function trimValueMultiLine(thisObj) {
	var inputValue = thisObj.value ;
	var valueArray = inputValue.split('\r\n');
	thisObj.value = '';
	for (var i = 0; i < valueArray.length; i++) {
		if (thisObj.value != '') {
			thisObj.value += '\r\n';
		}
		thisObj.value += valueArray[i].replace(/\s*/g,"");
	}

}

//结束时间必须大于或等于开始时间
function compareDateValueInGroup(startValueId, endValueId) {
	if (document.getElementById(startValueId) == null) {
		alert("找不到id为" + startValueId + "的字段");
		return false;
	}
	if (document.getElementById(endValueId) == null) {
		alert("找不到id为" + endValueId + "的字段");
		return false;
	}
	var startTimeValue = document.getElementById(startValueId).value;
	var endTimeValue = document.getElementById(endValueId).value;
	if (startTimeValue == '' || endTimeValue == '') return true;
	
	if (startTimeValue <= endTimeValue) {
		return true;
	} else {
		alert("结束时间必须大于或等于开始时间");
		return false;
	}
}
    a_messages = [
    	'No form name passed to validator construction routine',
    	'No array of "%form%" form fields passed to validator construction routine',
    	'Form "%form%" can not be found in the page',
    	'Definition of field "%n%" is incomplete, no "label" attribute',
    	'Field "%n%" can not be found in form "%form%"',
    	'Can not find label tag (id="%tagId%")',
    	'Can not verify match. Field "%match%" was not found',
    	'"%label%" 是必填字段',
    	'"%label%"的值至少要 %minLength% 个字符',
    	'"%label%"的值不能超过%maxLength%个字符',
    	'"%v%"对于"%label%"字段不是一个有效数据',
    	'"%label%" 必须匹配"%ml%"',
    	'"%label%"允许的最小值为 %minValue%',
    	'"%label%"允许的最大值为 %maxValue%'
    ];

     
 
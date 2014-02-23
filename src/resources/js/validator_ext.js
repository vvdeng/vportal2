var date_time_re_dt_tm = /^(\d{4})\-(\d{2})\-(\d{2})\s(\d{1,2})\:(\d{1,2})$/;
a_formats['price'] = /^(([1-9]\d*)|0)(\.\d{1,2})?$/;
a_formats['random']=/[\s\S]*$/;
a_formats['date_time']=function (s_time) {
		// check format
		if (!date_time_re_dt_tm.test(s_time))
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
		if (RegExp.$4 > 23 || RegExp.$5 > 59)
			return false;
		return true;
	};
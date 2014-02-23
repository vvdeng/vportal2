$namespace("PP.vfui.tag");
PP.vfui.tag.alert=window.alert;
PP.vfui.tag.init = function() {
	$$(document).ready(function() {
	//	PP.vfui.tag.procPanel();
	//	PP.vfui.tag.procTabHeader();	
		PP.vfui.category.procCategory();
		PP.vfui.tag.procIframe();
	});
};

			
PP.vfui.tag.procIframe = function() {
	function reinitIframe(src){
				var iframe = src;
				
				try{
					var bHeight = iframe.contentWindow.document.body.scrollHeight;
					var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
					var height = Math.max(bHeight, dHeight);
					iframe.height =  height;				//	checkHeight(src);
				}catch (ex){}
			}
			function _reinitIframe(src){
				return function(){
					reinitIframe(src);
				}
			}	
	$$("iframe[tag='auto_height_iframe']").each(function() {			
			window.setInterval(_reinitIframe(this), 1000);
	});
}
PP.vfui.tag.procPanel = function() {
	$$("a[tag='collapsible_panel']").toggle(function() {
		$$(this).parent().attr("class", "box_title close");
		$$(this).parent().next().attr("class", "box_content h");
	}, function() {
		$$(this).parent().attr("class", "box_title");
		$$(this).parent().next().attr("class", "box_content");
	});
}

PP.vfui.tag.procTabHeader = function procTabHeader() {
	
	$$("li[tag='tab_header']").click(function() {
		var name = "[name='" + $$(this).attr("name") + "']";
		$$(this).parent().children('[class="c"]').attr("class", "");
		$$(this).parent().children(name).attr("class", "c");
		$$(this).parent().next().children().hide();
		$$(this).parent().next().children(name).show();
		$$(this).children().blur();
	});
	$$("li[tag='collapsible_tab_container']").toggle(function() {
		$$(this).parent().next().hide();
		$$(this).children().attr("class", "bt_open");
		$$(this).children().blur();
	}, function() {
		$$(this).parent().next().show();
		$$(this).children().attr("class", "bt_close");
		$$(this).children().blur();
	});
}
PP.vfui.tag.panelCollaps= function(src){
		if(!src.collFlag){
			src.collFlag=1;
			$$(src).parent().attr("class", "box_title close");
			$$(src).parent().next().attr("class", "box_content h");
		}
		else{
			src.collFlag=0;
			$$(src).parent().attr("class", "box_title");
			$$(src).parent().next().attr("class", "box_content");
		}
		
}
PP.vfui.tag.tabHeaderClick= function(src){
		
		var name = "[name='" + $$(src).attr("name") + "']";
	
		$$(src).parent().children('[class="c"]').attr("class", "");
		$$(src).parent().children(name).attr("class", "c");
		$$(src).parent().next().children().hide();
		$$(src).parent().next().children(name).show();
		$$(src).children().blur();
}
PP.vfui.tag.tabHeaderCollaps= function(src){
		if(!src.collFlag){
		
			src.collFlag=1;
			$$(src).parent().next().hide();
			$$(src).children().attr("class", "bt_open");
			$$(src).children().blur();
		}
		else{
		
			src.collFlag=0;
			$$(src).parent().next().show();
			$$(src).children().attr("class", "bt_close");
			$$(src).children().blur();
		}
		
}
PP.vfui.tag.procImage = function(src) {
	$$(src).mouseover(function() {
		PP.vfui.imgDetail=$float({html:'<img src="'+$$(this).attr("alt_image")+'" onmouseover="PP.vfui.isShowingDetail=true;" onmouseout="PP.vfui.imgDetail.destruct();"></img>',cssUrl:'http://static.paipaiimg.com/life_v2/boss/boss_model.css',top:$getY(this),left:$getX(this)+this.width,style:'none',cover:false});
	});
	$$(src).mouseout(function(){
		PP.vfui.isShowingDetail=false;
		setTimeout(callBack,200);
	});
	function callBack(){
		if(!PP.vfui.isShowingDetail){
		PP.vfui.imgDetail.destruct();
		}
	}
}
$namespace("PP.vfui.ui.qq");
// /启动qq聊天窗口,参数：目标qq，商品id，会话key，场景key
PP.vfui.ui.qq.talk = function(uin, tid, sigT, sigP) {
	var url = (tid) ? ("tencent://message/?uin=" + uin + "&fromuserid="
			+ tid.substring(0, 32) + "&touserid=" + tid.substring(0, 32)
			+ "&unionid=72000106&WebSiteName=拍拍网&Service=19&sigT=" + sigT
			+ "&sigU=" + sigP)
			: "tencent://message/?uin="
					+ uin
					+ "&fromuserid=no&touserid=no&unionid=72000106&WebSiteName=拍拍网&Service=19&sigT="
					+ sigT + "&sigU=" + sigP;
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.indexOf("msie") != -1) {
		try {
			var imObj = new ActiveXObject("TimwpDll.TimwpCheck");
			if (parseInt(imObj.GetVersion()) < 2.1) {
				return showError(2);
			}
			window.location.href = url;
		} catch (e) {
			return showError(3);
		}
		return true;
	} else if (/(firefox|safari|opera|chrome)/i.test(ua) || window.opera) {
		window.location.href = url;
	} else {
		showError(1);
	}
	function showError(type) {
		switch (type) {
		case 1:
			PP.vfui.js.dialog.alert("拍拍网温馨提示：\r\n　　您使用的浏览器不支持QQ临时会话功能，建议您加对方为好友，或使用IE/TT浏览器访问。");
			break;
		case 2:
			PP.vfui.js.dialog.alert("拍拍网温馨提示：\r\n　　请您访问http://im.qq.com/下载新版的QQ/TM以支持与拍拍店主在线交流！");
			window.open("http://im.qq.com/");
			break;
		case 3:
			PP.vfui.js.dialog.alert("拍拍网温馨提示：\r\n　　您没有安装QQ或者您的IE设置禁止了QQ临时会话功能，请点击查看操作方法。");
			window.target = "_top";
			window.open("http://help.paipai.com/learn/aqkj/");
			break;
		}
		return;
	}
	;
};

PP.vfui.ui.qq.talkTo = function(uin, url) {
	jQuery.ajax( {
		cache : false,
		type : "POST",
		url : url,
		data : {
			"uin" : uin
		},
		success : function(response) {
			var obj = eval("(" + response + ")");
			var tid = "";
			var sigT = obj.SIG_TENCENT;
			var sigP = obj.SIG_UI;
			PP.vfui.ui.qq.talk(uin, tid, sigT, sigP);
		}
	});
}

/*
 * 对话框 -------------------------------------------- 修订记录： 20101109 raywu
 * Ajax请求直接支持json格式 20101108 sunniyang 提交
 * --------------------------------------------
 */
$namespace("PP.vfui.dialog");
/**
 * 点击【确定】按钮后由框架调用，onAccept作为acceptHandler参数传入
 * 
 * @author : sunniyang
 * @level : private
 */
PP.vfui.dialog.accept = function(dialog, acceptHandler) {
	if (acceptHandler) {
		if (typeof acceptHandler == "function") {
			if (!acceptHandler())
				PP.vfui.dialog.close(dialog);
		}
	}
};
/**
 * 点击【取消】按钮后由框架调用，onCancel作为cancelHandler参数传入
 * 
 * @author : sunniyang
 * @level : private
 */
PP.vfui.dialog.cancel = function(dialog, cancelHandler) {
	if (cancelHandler) {
		if (typeof cancelHandler == "function") {
			if (!cancelHandler())
				PP.vfui.dialog.close(dialog);
		}
	} else {
		PP.vfui.dialog.close(dialog);
	}
};
/**
 * 关闭对话框
 * 
 * @author : sunniyang
 * @level : private
 */
PP.vfui.dialog.close = function(dialog) {
	var d = dialog;
	if (typeof d != "object") {
		d = $id(dialog);
	}
	if (d.style.visibility != "hidden") {
		d.style.visibility = "hidden";
	}
};
/**
 * funs和Endrag两个方法都是用来支持dialog拖拽的
 * 
 * @author : sunniyang
 * @level : private
 */
PP.vfui.dialog.funs = {
	index : 100,
	getFocus : function(target) {
		if (target.style.zIndex != this.index) {
			this.index += 2;
			var idx = this.index;
			target.style.zIndex = idx;
		}
	},
	abs : function(element) {
		var result = {
			x : element.offsetLeft,
			y : element.offsetTop
		};
		element = element.offsetParent;
		while (element) {
			result.x += element.offsetLeft;
			result.y += element.offsetTop;
			element = element.offsetParent;
		}
		return result;
	}
};
/**
 * funs和Endrag两个方法都是用来支持dialog拖拽的
 * 
 * @author : sunniyang
 * @level : private
 */
PP.vfui.dialog.Endrag = function(source, target, offSetX, offSetY) {
	source = typeof (source) == "object" ? source : $id(source);
	target = typeof (target) == "object" ? target : $id(target);
	var x0 = 0, y0 = 0, x1 = 0, y1 = 0, moveable = false, index = 100, NS = (navigator.appName == 'Netscape');
	offSetX = typeof offSetX == "undefined" ? 0 : offSetX;
	offSetY = typeof offSetY == "undefined" ? 0 : offSetY;
	source.onmousedown = function(e) {
		e = e ? e : (window.event ? window.event : null);
		PP.vfui.dialog.funs.getFocus(target);
		if (e.button == (NS) ? 0 : 1) {
			if (!NS) {
				this.setCapture();
			}
			x0 = e.clientX;
			y0 = e.clientY;
			x1 = parseInt(PP.vfui.dialog.funs.abs(target).x);
			y1 = parseInt(PP.vfui.dialog.funs.abs(target).y);
			moveable = true;
		}
	};
	source.onmousemove = function(e) {
		e = e ? e : (window.event ? window.event : null);
		if (moveable) {
			target.style.left = (x1 + e.clientX - x0 - offSetX) + "px";
			target.style.top = (y1 + e.clientY - y0 - offSetY) + "px";
		}
	};
	source.onmouseup = function(e) {
		if (moveable) {
			if (!NS) {
				this.releaseCapture();
			}
			moveable = false;
		}
	};
};
$namespace("PP.vfui.js.dialog");
/**
 * 显示对话框，由页面事件负责调用
 * 
 * @author : sunniyang
 * @level : public
 */
PP.vfui.js.dialog.show = function(dialog, title) {
	var d = dialog;
	if (typeof d != "object") {
		d = $id(dialog);
	}
	if (d.style.visibility != "visible") {
		d.style.visibility = "visible";
	}
	if (title)
		$id(d.id + "_title").getElementsByTagName("h4")[0].innerText = title;
	d.style.left = "50%";
	d.style.top = (document.body.scrollTop + document.body.offsetHeight / 2);
};
/**
 * 关闭对话框，由页面事件负责调用
 * 
 * @author : sunniyang
 * @level : public
 */
PP.vfui.js.dialog.close = function(dialog) {
	PP.vfui.dialog.close(dialog);
};
/**
 * 弹出确认框
 * 
 * @author : raywu
 * @level : public
 */
PP.vfui.js.dialog.confirm = function(msg) {
	return confirm(msg);
}
/**
 * 弹出信息框
 * 
 * @author : raywu
 * @level : public
 */
PP.vfui.js.dialog.alert = function(msg) {
	PP.vfui.js.dialog.uiAlert=$float({title:'提示',autoResize:true,width:'250',cssUrl:'http://static.paipaiimg.com/life_v2/boss/boss_model.css',html:'<div style="text-align:center;">'+msg+'<span  style="text-align:center;margin-top:10px;display:block;"><input type="button" value="确定"  onclick="PP.vfui.js.dialog.uiAlert.close();"></span></div>'});
}

/**
 * 把alert设置为格式更友好的提示
 * 
 * @author : raywu
 * @level : public
 */
window.alert = PP.vfui.js.dialog.alert;

/**
 * 修改面板标题
 * 
 * @author : bevisdeng
 * @level : public
 */
$namespace("PP.vfui.js.panel");
PP.vfui.js.panel.setTitle =function(id,title)
{
	$id(id).childNodes[0].innerHTML="<h4>"+title+"</h4>";
}
/*
 * 表单 -------------------------------------------- 修订记录： 20101102 sunniyang 提交
 * --------------------------------------------
 */
$namespace("PP.vfui.form");
PP.vfui.form.o_config = {
	'to_disable' : [ 'Submit' ],
	'alert' : 1
};
/**
 * 将页面上的form注册js中，由框架调用
 * 
 * @author : sunniyang
 * @level : private
 */
PP.vfui.form.setForm = function(id) {
	if (!PP.vfui.form.content)
		PP.vfui.form.content = new Object();
	PP.vfui.form.content[id] = new Object();
};
/**
 * 对各个form中的validator注册到js中，并和form关联，由框架调用
 * 
 * @author : sunniyang
 * @level : private
 */
PP.vfui.form.addItemValidator = function(formId, field) {
	if (!PP.vfui.form.content)
		PP.vfui.form.content = new Object();
	var formFields = PP.vfui.form.content[formId];
	if (!formFields)
		formFields = new Object();
	if (field.targetId == null)
		return;
	var fieldInfo = new Object();
	fieldInfo.tagId = field.labelId;
	fieldInfo.label = field.label;
	if (field.format != null && field.format != "" && field.format != "null")
		fieldInfo.format = field.format;
	fieldInfo.required = field.required;
	if (field.minLength >= 0)
		fieldInfo.minLength = field.minLength;
	if (field.maxLength >= 0)
		fieldInfo.maxLength = field.maxLength;
	if (field.minValue >= 0)
		fieldInfo.minValue = field.minValue;
	if (field.maxValue >= 0)
		fieldInfo.maxValue = field.maxValue;
	fieldInfo.trim = field.trim;
	formFields[field.targetId] = fieldInfo;
};
/**
 * 页面form结束时，由框架调用。给必输字段添加标识
 * 
 * @author : sunniyang
 * @level : private
 */
PP.vfui.form.formEnd = function(id) {
	if (!PP.vfui.form.content)
		return;
	var formFields = PP.vfui.form.content[id];
	for ( var fieldId in formFields) {
		if (formFields[fieldId].required) {
			var labelTag = $id(formFields[fieldId].tagId);
			if (labelTag)
				labelTag.innerHTML = "<font color='red'>*</font>"
						+ $(labelTag).text();
		}
	}
};
$namespace("PP.vfui.js.form");
/**
 * form校验，一般在表单提交前调用。校验成功返回true；否则返回false。
 * 
 * @author : sunniyang
 * @level : public
 */
PP.vfui.js.form.validate = function(form) {
	var f = form;
	if (typeof f == "object") {
		f = form.id;
	}
	if (!PP.vfui.form.content) {
		return true;
	}
	var formFields = PP.vfui.form.content[f];
	for ( var fieldId in formFields) {
		var field = $id(fieldId);
		if (!field) {
			var f1 = $id(fieldId + "1");
			var f2 = $id(fieldId + "2");
			var f3 = $id(fieldId + "3");
			var f4 = $id(fieldId + "4");
			if (f1 && f2 && f3 && f4) {
				if (!f1.value && !f2.value && !f3.value && !f4.value) {
					formFields[f1.id] = formFields[fieldId];
					delete formFields[fieldId];
					fieldId = f1.id;
				}
			}
			else {
				var fp = $id(fieldId + "_province");
				var fc = $id(fieldId + "_city");
				if (!fp) {
					delete formFields[fieldId];
					continue;
				}
				var pFieldInfo = formFields[fieldId];
				var cFieldInfo = new Object();
				for (var p in pFieldInfo)
					cFieldInfo[p] = pFieldInfo[p];
				pFieldInfo['label'] = pFieldInfo['label'] + "-省";
				cFieldInfo['label'] = cFieldInfo['label'] + "-市";
				formFields[fp.id] = pFieldInfo;
				if (fc)
					formFields[fc.id] = cFieldInfo;
				delete formFields[fieldId];
				fieldId = fp.id;
			}
		}
		if (formFields[fieldId].trim && field) {
			trimValue(field);
		}
	}
	var v = new validator(f, formFields, PP.vfui.form.o_config);
	var vResult = v.exec();
	if (!vResult)
		return vResult;
	// 文件上传下限校验
	for (var upField in PP.vfui.fileupload.uploader) {
		var uploader = PP.vfui.fileupload.uploader[upField];
		if (uploader._options.params.fileCount < uploader._options.params.minFiles) {
			PP.vfui.js.dialog.alert("至少上传" + uploader._options.params.minFiles + "个文件");
			return false;
		}
	}
	return vResult;
};
/**
 * 填充form，传入要填充的form和一个json格式的对象。json属性名对应到表单元素name
 * 
 * @author : sunniyang
 * @level : public
 */
PP.vfui.js.form.fill = function(form, jsonObject) {
	PP.vfui.js.form.clear(form);
	if (jsonObject == null) {
		return;
	}
	if (typeof form != "object") {
		form = $id(form);
	}
	if (form == null) {
		return;
	}
	for ( var propName in jsonObject) {
		var propValue = jsonObject[propName];
		var elements = document.getElementsByName(propName);
		if (Object.prototype.toString.apply(propValue) === '[object Array]') {
			// array -> checkbox
			for ( var i = 0; i < elements.length; i++) {
				var element = elements[i];
				if (!form.contains(element))
					continue;
				if (element.nodeName != "INPUT" || element.type != "checkbox")
					continue;
				element.checked = false;
				for ( var j = 0; j < propValue.length; j++) {
					if (element.value == propValue[j]) {
						element.checked = true;
						break;
					}
				}
			}
		} else {
			// single value
			for ( var i = 0; i < elements.length; i++) {
				var element = elements[i];
				if (!form.contains(element))
					continue;
				if (element.type == "checkbox") {
					element.checked = false;
					if (element.value == propValue) {
						element.checked = true;
					}
				} else if (element.type == "radio") {
					if (element.value == propValue) {
						element.checked = true;
						break;
					}
				} else {
					// file, hidden, password, text, calendar, select
					element.value = propValue;
					break;
				}
			}
		}
	}
};
/**
 * 清空form，返回到原始状态
 * 
 * @author : sunniyang
 * @level : public
 */
PP.vfui.js.form.clear = function(form) {
	if (typeof form == "object") {
		form = form.id;
	}
	var resetButton = $id("reset" + form);
	if (resetButton) {
		resetButton.click();
	}
};
/**
 * 从一个或多个form收集数据，返回一个json格式的对象返回
 * 
 * @author : sunniyang
 * @level : public
 */
PP.vfui.js.form.collect = function() {
	if (arguments.length == 0)
		return null;
	var result = new Object();
	for (var iform = 0; iform < arguments.length; iform++) {
		var form = arguments[iform];
		if (typeof form != "object") {
			form = $id(form);
		}
		if (form == null) {
			continue;
		}
		var inputs = form.getElementsByTagName("INPUT");
		var checkboxs = new Object();
		var radios = new Object();
		for ( var i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			if (input.type == "reset" || input.type == "submit")
				continue;
			if (input.type == "checkbox") {
				if (checkboxs[input.name] == undefined) {
					checkboxs[input.name] = new Array();
				}
				checkboxs[input.name].push(input);
			} else if (input.type == "radio") {
				if (radios[input.name] == undefined) {
					radios[input.name] = new Array();
				}
				radios[input.name].push(input);
			} else {
				result[input.name] = input.value;
			}
		}
		for ( var name in checkboxs) {
			var checkboxGroup = checkboxs[name];
			var values = new Array();
			for ( var i = 0; i < checkboxGroup.length; i++) {
				if (checkboxGroup[i].checked) {
					values.push(checkboxGroup[i].value);
				}
			}
			result[name] = values;
		}
		for ( var name in radios) {
			var radioGroup = radios[name];
			for ( var i = 0; i < radioGroup.length; i++) {
				if (radioGroup[i].checked) {
					result[name] = radioGroup[i].value;
					break;
				}
			}
		}
		var selects = form.getElementsByTagName("SELECT");
		for ( var i = 0; i < selects.length; i++) {
			result[selects[i].name] = selects[i].value;
		}
		var textAreas = form.getElementsByTagName("TEXTAREA");
		for (var i = 0; i < textAreas.length; i++) {
			result[textAreas[i].name] = textAreas[i].value;
		}
	}
	return result;
};

/**
 * 针对checkboxs，如果目前是全选中，则全部不选中，否则全部选中
 * 
 * @author : raywu
 * @level : public
 */
PP.vfui.js.form.selectAllOrNone = function(name) {
	var checkboxs = document.getElementsByName(name);
	if (checkboxs != null) {
		var selectAll = true;
		for (var i=0; i<checkboxs.length; i++) {
			if (!checkboxs[i].checked) {
				selectAll = false;
				break;
			}
		}
		for (var i=0; i<checkboxs.length; i++) {
			checkboxs[i].checked = !selectAll;
		}
	}
}

/**
 * 日历选择组件”的相关代码
 */
$namespace('PP.vfui.component')
PP.vfui.component.calendar = function(opt) {
	var option = {
		input : "", // 日历控件关联的表单,jquery语法
		action : "", // 触发器的id列表，jquery语法
		float : true, // 浮窗显示
		time : true, // 使用时间
		format : "%y-%m-%d %h:%M", // 格式化字符串
		x : 0,
		y : 0,
		startYear : 2000, // 起始年
		endYear : 2010, // 结束年
		defaultVar : '', // 默认值
		haveZero : true, // 是否补零
		autoXY : false, // 每次点击时自动计算位置
		zeroHour : false, // 是否从零点开始
		defaultHour : '00-00', // 如果zeroHour为false，可以设置初始化的小时和分钟
		css : '' // 自定义css
	};
	$$.extend(option, opt);
	if ($$(option.input).length == 0) {
		return;
	}
	

	if (!$id("calendarFrame")) {
		try {
			$$("head")
					.append(
							"<style type='text/css'>.calender {width:170px;color:#000000	height:183px;font-size:12px;	margin-right:14px;background:url('') no-repeat right center #fff;border:1px solid #397EAE;padding:1px;}.calender ul,.calender li{list-style-type:none;margin:0;padding:0;}.day li,.date li{float:left;clear:none;}.calender .day {background-color:#EDF5FF;	height:20px;}.calender .day li,.calender .date li{float:left;width:14%;height:20px;line-height:20px;text-align:center}.calender li a {	text-decoration:none;font-family:Tahoma;font-size:11px;color:#333}.calender li a:hover{color:#f30;text-decoration:underline;}.calenderTitle a {text-decoration:none;margin:0 2px;color:#000;font-weight:bold}.today {background-color:#ffffaa;border:1px solid #f60;padding:2px}.today a {color:#f30;}.calenderBottom {clear:both;border-top:1px solid #ddd;padding: 3px 0;text-align:left}.calenderBottom a {text-decoration:none;margin:2px !important;font-weight:bold;color:#000;}.closeCalenderBox {	float:right;border:1px solid #000;background:#fff;font-size:9px;width:11px;height:11px;line-height:11px;text-align:center;overflow:hidden;font-weight:normal !important}</style>");
			// 输出浮窗框架
			var cc = document.createElement('span');
			cc.style.position = 'absolute';
			cc.style.zIndex = 99999;
			cc.style.display = "none";
			cc.className = "calendarFrame";
			cc.id = "calendarFrame";
			cc.innerHTML = '<iframe width="165" height="170" frameborder="0" style="width:165px;height:170px;position:absolute;top:1px;left:1px;border:0;z-index:-100000;FILTER: Alpha(Opacity=110,Style=0)" ></iframe><div class="calender"><div class="calenderTitle" style="text-align:center;height:20px;line-height:20px;clear:both;"><A class="NextMonth" title="下一年" style="float:right;font-size:18px;" caction="nextYear">&raquo;</A><A class="LastMonth" title="上一年" style="float:left;font-size:18px;" caction="lastYear">&laquo;</A><A class="NextMonth" title="下一月" style="float:right;font-size:18px;" caction="nextMonth">&#8250;</A><A class="LastMonth" title="上一月" style="float:left;font-size:18px;" caction="lastMonth">&#8249;</A><span class="selectThisYear" faction="yearFrame"><A title="点击选择其他的年份" caction="years" ></A></span>年<span class="selectThisMonth" faction="monthFrame"><A title="点击选择其他的月份" caction="months"></A></span>月</div><div class="calenderBody" style="clear:both"><UL class="day"><LI style="clear:none;">日</LI><LI style="clear:none;">一</LI><LI style="clear:none;">二</LI><LI style="clear:none;">三</LI><LI style="clear:none;">四</LI><LI style="clear:none;">五</LI><LI style="clear:none;">六</LI></UL><UL class="date" faction="dayFrame"></UL></div>'+'<div faction="timeFrame" class="calenderBottom" style="text-align:center;" ><span ><span faction="hourFrame"><A title="点击选择其他的时间" caction="hours"></A></span>点<span faction="minuteFrame"><A title="点击选择其他的时间" caction="minutes"></A></span>分</span></div>'+'<div class="calenderBottom" style="text-align:center;" ><A  style="float:right;" caction="close">×</A><span><A title="回到今天的日期" caction="goToday" >回到今天</A></span></div>'+'<div faction="timeTips" class="calenderBottom" style=" background-color: rgb(221, 221, 221); text-align: center; ">请先选择时间，再点击日期确认</div>'+'</div>';
			document.body.appendChild(cc);
			var cal = $$("#calendarFrame");
			// 阻止冒泡
			cal.click(function(event) {
				if (event.preventDefault) {
					event.preventDefault();
					event.stopPropagation();
				} else {
					event.cancelBubble = true;
				}
			}).find("[caction]").css("cursor", "pointer");
			cal.find("[caction='close']").add($$("body")).click(function() {
				$$("#calendarFrame").hide();
			});
			cal
					.find(
							"[caction='nextMonth'],[caction='lastMonth'],[caction='nextYear'],[caction='lastYear'],[caction='goToday']")
					.click(
							function() {
								PP.vfui.component.calendar.change(this, $$(this).attr(
										"caction"));
							});
			//点击上一月、下一月、上一年、下一年、今天的事件
			cal
					.find(
							"[faction='yearFrame'],[faction='monthFrame'],[faction='hourFrame'],[faction='minuteFrame']")
					.each(function() {
						$$(this).attr("oldCode", $$(this).html());
					}).click(function() {
						if ($$(this).attr("select")) {
							return;
						}
						PP.vfui.component.calendar.select(this);
					});
		} catch (e) {
		}
	}
	// 阻止组件冒泡
	try {
		$$(option.input).add($$(option.action)).click(function(event) {
			if (event.preventDefault) {
				event.preventDefault();
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		});
	} catch (e) {
	}
	var _input = $$(option.action);
	var _attr = option.float + "$" + option.time + "$" + option.format + "$"
			+ $getX(_input.get(0)) + "$" + (parseInt($getY(_input.get(0))) + 5)
			+ "$" + option.startYear + "$" + option.endYear + "$"
			+ option.haveZero + "$" + option.autoXY + "$" + option.zeroHour
			+ "$" + option.defaultHour;
	// 绑定点击事件
	var _inputBox = $$(option.input)[0];
	_input.attr("_attr", _attr).click(function() {
		PP.vfui.component.calendar.init(_inputBox);
	});
};
PP.vfui.component.calendar.easy = function(it, zero) {
	var _id = (typeof (it) == "object") ? it.id : it;
	var _it = $$("#" + _id).get();
	if (_it.length < 1) {
		return;
	}
	var opt = {
		input : "#" + _id,
		action : "#" + _id,
		format : "%y-%m-%d",
		startYear : 2000,
		endYear : 2010,
		time : false,
		autoXY : true,
		zeroHour : (zero ? true : false)
	};
	PP.vfui.component.calendar(opt);
};
PP.vfui.component.calendar.easyLong = function(it, zero, hour) {
	var _id = (typeof (it) == "object") ? it.id : it;
	var _it = $$("#" + _id).get();
	if (_it.length < 1) {
		return;
	}
	var opt = {
		input : "#" + _id,
		action : "#" + _id,
		format : "%y-%m-%d %h:%M",
		startYear : 2000,
		endYear : 2010,
		time : true,
		autoXY : true,
		zeroHour : (zero ? true : false),
		defaultHour : (hour ? hour : "00-00")
	};
	PP.vfui.component.calendar(opt);
};
// /////////////功能代码定义区域//////////////////////////////////
// 显示日历
PP.vfui.component.calendar.init = function(it) {
	var cal = $$("#calendarFrame");
	var date = new Date();
	var _attr = $$(it).attr("_attr").split("$");
	var _time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
			+ date.getDate() + "-" + date.getHours() + "-" + date.getMinutes();
	if (_attr[9] == "true") {
		var _time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
				+ date.getDate() + "-" + "00" + "-" + "00";
	} else if (_attr[10]) {
		// 如果设置了默认时分
		var _time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
				+ date.getDate() + "-" + _attr[10];
	}
	// 显示日历
	cal.attr("_time", _time).attr("_attr", $$(it).attr("_attr")).attr("rid",
			it.id).show().css("left", $getX(it) + "px").css("top",
			(parseInt($getY(it)) + parseInt($$(it).height() + 5)) + "px");
	// 是否显示时间
	if (_attr[1] == "true") {
		cal.find("[faction='timeFrame']").show();
		cal.find("[faction='timeTips']").show();
	} else {
		cal.find("[faction='timeFrame']").hide();
		cal.find("[faction='timeTips']").hide();
	}
	// if(_attr[9]=="true"){
	// cal.find("[faction='timeFrame']").hide();
	// }
	// 初始化年，月
	PP.vfui.component.calendar.setTimeInfo(cal);
};
// 设置当前时间
PP.vfui.component.calendar.setTimeInfo = function(cal) {
	var _time = cal.attr("_time").split("-");
	cal.find("[caction='years']").html(_time[0].toString());
	cal.find("[caction='months']").html(_time[1].toString());
	cal.find("[caction='hours']").html(_time[3].toString());
	cal.find("[caction='minutes']").html(_time[4].toString());
	// 生成当月的日历列表
	cal.find("[faction='dayFrame']").html(setDayList(cal)).attr("curState",
			_time[0] + "-" + _time[1]);
	cal.find("[cDays]").css("cursor", "pointer").click(function() {
		PP.vfui.component.calendar.selectDay(this);
	});
	function setDayList(cal) {
		var _time = cal.attr("_time").split("-");
		// 以参数为当前日期
		var hc = "";
		// 上个月的最后一天的日，如30,31,29
		var lDay = dateAdd("d", "-1", _time[0] + "-" + _time[1] + "-01")
				.getDate();
		// 上个月补齐天数：本月1号是星期几，那么上个月需要显示几天来补齐日期，灰色显示
		var lDays = getWeekDay(_time[0] + "-" + (_time[1] - 1) + "-01");
		// 这个月最后一天
		var cDate = dateAdd("d", "-1", _time[0] + "-" + _time[1] + "-01");
		// 这个月总天数
		var cDays = cDate.getDate();
		// 下个月补齐天数：最后一天是星期几,如果最后一天不是星期天，那么输出的时候，就要用下个月的时间补齐6-n天
		var nDays = cDate.getDay();
		// 今天的日期
		var todayObj = new Date();
		// 今天的日期字符串
		today = todayObj.getFullYear() + "-" + todayObj.getMonth() + "-"
				+ todayObj.getDate();
		// 循环输出 上个月补齐的几天
		for (i = 0; i < lDays; i++) { // Last Month's Date
			hc = "<LI style='color:#bbb;font-size:11px;clear:none;' >" + lDay
					+ "</LI>" + hc;
			lDay--;
		}
		// 循环输出这个月的日期
		for (i = 1; i <= cDays; i++) { // Current Month's Date
			// 如果是今天的话就输出today样式
			if (today == _time[0] + "-" + (parseInt(_time[1]) - 1) + "-" + i) {
				hc += "<li style='clear:none;' ><a href='javascript:;' class='today' cDays="
						+ i
						+ " title='"
						+ _time[0]
						+ "-"
						+ _time[1]
						+ "-"
						+ i
						+ "'>" + i + "</a></li>";
			} else {
				hc += "<li style='clear:none;' ><a href='javascript:;' class='days' cDays="
						+ i
						+ " title='"
						+ _time[0]
						+ "-"
						+ _time[1]
						+ "-"
						+ i
						+ "'>" + i + "</a></li>";
			}
		}
		;
		// 补齐最后一个星期的几天
		for ( var i = 1; i < 7 - nDays; i++) { // Next Month's Date
			hc += "<LI style='color:#bbb;font-size:11px;clear:none;'>" + i
					+ "</LI>";
		}
		return hc;
	}
	;
	// 获取一某日是星期几，从0开始分别是（天，1，2，3，4，5，6）
	function getWeekDay(date) {
		var theDate;
		if (typeof (date) == "string") {
			theDate = new Date(date.split("-")[0], date.split("-")[1], date
					.split("-")[2]);
		}
		if (typeof (date) == "object") {
			theDate = date;
		}
		return theDate.getDay();
	}
	;
	// 日期运算，参数：单位,差值，基准日期
	function dateAdd(interval, number, date) {
		number = parseInt(number);
		// 判断各种格式的日期初始值，如果有内容就直接赋值
		if (typeof (date) == "string") {
			var date = new Date(date.split("-")[0], date.split("-")[1], date
					.split("-")[2]);
		}
		if (typeof (date) == "object") {
			var date = date;
		}
		switch (interval) {
		case "y":
			return new Date(date.getFullYear() + number, date.getMonth(), date
					.getDate());
			break;
		case "m":
			return new Date(date.getFullYear(), date.getMonth() + number,
					checkLastDate(date.getFullYear(), date.getMonth() + number,
							date.getDate()));
			break;
		case "d":
			return new Date(date.getFullYear(), date.getMonth(), date.getDate()
					+ number);
			break;
		case "w":
			return new Date(date.getFullYear(), date.getMonth(), 7 * number
					+ date.getDate());
			break;
		}
		;
	}
	;
	// 检查当月的最后一天是否正确，如果不正确就改成正确的
	function checkLastDate(year, month, date) {
		var enddate = [ "31", "28", "31", "30", "31", "30", "31", "31", "30",
				"31", "30", "31" ];
		var returnDate = "";
		enddate[1] = (year % 4 == 0) ? "29" : enddate[1];
		return (date > enddate[month]) ? enddate[month] : date;
	}
	;
};
// 修改当前日期，各种修改操作(修改对象，修改类型，目标数值)
PP.vfui.component.calendar.change = function(it, type, number) {
	var date = PP.vfui.component.calendar.getSelectedTime();
	var cal = $$("#calendarFrame");
	var _time = cal.attr("_time").split("-");
	date = new Date(_time[0], parseInt(_time[1]) - 1, _time[2], _time[3],
			_time[4]);
	if (type == "goToday") {
		date = new Date();
	}
	if (type == "nextYear") {
		date.setYear(date.getFullYear() + 1);
	}
	if (type == "lastYear") {
		date.setYear(date.getFullYear() - 1);
	}
	if (type == "nextMonth") {
		date.setMonth(date.getMonth() + 1);
	}
	if (type == "lastMonth") {
		date.setMonth(date.getMonth() - 1);
	}
	if (type == "yearFrame") {
		date.setYear(parseInt(number));
	}
	if (type == "monthFrame") {
		date.setMonth(parseInt(number) - 1);
	}
	if (type == "hourFrame") {
		date.setHours(parseInt(number));
	}
	if (type == "minuteFrame") {
		date.setMinutes(parseInt(number));
	}
	if (type == "day") {
		date.setDate(parseInt(number));
	}
	cal.attr("_time", date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
			+ date.getDate() + "-" + date.getHours() + "-" + date.getMinutes());
	// 初始化年,月
	PP.vfui.component.calendar.setTimeInfo(cal);
};
// 获取当前用户选择后的时间
PP.vfui.component.calendar.getSelectedTime = function() {
	var cal = $$("#calendarFrame");
	var _time = cal.attr("_time").split("-");
	return new Date(_time[0], parseInt(_time[1]) - 1, _time[2], _time[3],
			_time[4]);
};
// 下拉框日期修改操作
PP.vfui.component.calendar.select = function(it) {
	var cal = $$("#calendarFrame");
	var time = cal.attr("_time").split("-");
	var attr = cal.attr("_attr").split("$");
	var type = $$(it).attr("faction");
	var _frame = [ 0, 0 ];
	var _value = "";
	if (type == "yearFrame") {
		_frame = [ attr[5], attr[6] ];
		_value = time[0];
	}
	if (type == "monthFrame") {
		_frame = [ 1, 12 ];
		_value = time[1];
	}
	if (type == "hourFrame") {
		_frame = [ 0, 23 ];
		_value = time[3];
	}
	if (type == "minuteFrame") {
		_frame = [ 0, 59 ];
		_value = time[4];
	}
	var hc = '<select>';
	for ( var i = _frame[0]; i <= _frame[1]; i++) {
		hc += '<option value="' + i + '" >' + i + '</option>';
	}
	;
	hc += '</select>';
	$$(it).attr("select", "on").html(hc).find("select").val(_value).change(
			function() {
				_parent = $$(this).parent();
				var svalue = this.value;
				_parent.html(_parent.attr("oldCode")).removeAttr("select");
				PP.vfui.component.calendar.change(it, type, svalue);
			});
};
// 选择日期
PP.vfui.component.calendar.selectDay = function(it) {
	var cal = $$("#calendarFrame");
	var attr = cal.attr("_attr").split("$");
	PP.vfui.component.calendar.change(it, "day", $$(it).attr("cDays"));
	var date = PP.vfui.component.calendar.getSelectedTime();
	var year = date.getFullYear().toString();
	var month = (date.getMonth() + 1).toString();
	var day = date.getDate().toString();
	var hour = date.getHours().toString();
	var minute = date.getMinutes().toString();
	// 处理补零
	if (attr[7] == "true") {
		month = (month.length == 1) ? "0" + month : month;
		day = (day.length == 1) ? "0" + day : day;
		hour = (hour.length == 1) ? "0" + hour : hour;
		minute = (minute.length == 1) ? "0" + minute : minute;
	}
	var _value = attr[2];
	_value = _value.replace("%y", year);
	_value = _value.replace("%m", month);
	_value = _value.replace("%d", day);
	_value = _value.replace("%h", hour);
	_value = _value.replace("%M", minute);
	_value = _value+'00';  //补秒
	cal.find("[caction='close']").click();
	$$("#" + cal.attr("rid")).val(_value);
};

$namespace("PP.vfui.category");
var iMask = 0;
PP.vfui.category.option = {
	levels : "",
	id : "",
	name : "",
    type:"float",
	callBack : function() {
		return true;
	}
};
//PP.vfui.category.onload = function() {
//	$$(document).ready(function() {
//		PP.vfui.category.procCategory();	
//	});
//};
PP.vfui.category.init = function() {
	var defOption = {
		levels : "",
        type:"float",
		callBack : function() {
			return true;
		}
	};

	var option = jQuery.extend(defOption, PP.vfui.category.option);
	PP.vfui.category.option = option;
	PP.vfui.category.uploadInit(0, option.levels, option.callBack);
}

/*******************************************************************************
 * 发布页面初始化类目选择：只显示一级类目
 ******************************************************************************/
PP.vfui.category.uploadInit = function(_iMask, levels, callBack) {
	var j;
	var label = "";
	iMask = _iMask;
    if(LData["c1"][0]!=0){
        LData["c1"].unshift(0);
        arrData[0] = [ '大类目', 0, 0 ];
    }
	for (j = 0; j < LData["c1"].length; j++) {
		if (iMask == 0 && arrData[LData["c1"][j]][2] & 0x08)
			continue;
		if (arrData[LData["c1"][j]][2] & 0x01)
			continue;
		/*
		 * if (LData["c1"][j] == 3002 && _bMobileSeller == 1) { continue; } if
		 * ((arrData[LData["c1"][j]][2] & 0x8000) != 0 && _bMobileSeller != 1) {
		 * continue; }
		 */
		var nowClass = '';
		if (!PP.vfui.category.isLeaf(LData["c1"][j])) {
			nowClass = 'hasLeaf';
		}
		;
		if (callBack(1, LData["c1"][j], arrData[LData["c1"][j]][0]) == true) {
			label += "<div class='"
					+ nowClass
					+ "' id='"
					+ LData["c1"][j]
					+ "' onclick=\"PP.vfui.category.uploadChangeSort(1,this)\">"
					+ arrData[LData["c1"][j]][0] + "</div>";
		}
	}
	$id(PP.vfui.category.option.id + "_sortShowC1").innerHTML = label;
	$id(PP.vfui.category.option.id + "_sortShowC1").style.backgroundColor = "#ffffff";
	PP.vfui.category.showSortNote(1);

	/*
	 * var levels = new Array(); levels.push(1);
	 */
	PP.vfui.category.showDefaultSort(levels);
	// add by leywang 优化体验
	// showSortPath(0, 0);
	if (levels.length == 0) {
		$id(PP.vfui.category.option.id + "_sortPathShow").innerHTML = "";
		$id(PP.vfui.category.option.id + "_sortPathShowUp").innerHTML = "请选择类目";
		$id(PP.vfui.category.option.id + "FullDesc").value = "";
	}
	// $id("next").disabled = true;
}

/*******************************************************************************
 * 显示当前选择的类目提示 sortLevel：类目级别
 ******************************************************************************/
PP.vfui.category.showSortNote = function(sortLevel) {
	for ( var i = sortLevel; i < 5; i++) {
		$id(PP.vfui.category.option.id + "_sortNoteC" + i).className = "sortNote  hidden";
	}

	$id(PP.vfui.category.option.id + "_sortNoteC" + sortLevel).className = "sortNote";
	for (i = sortLevel + 1; i < 5; i++) {
		$id(PP.vfui.category.option.id + i).value = "";
		$id(PP.vfui.category.option.id + "_sortShowC" + i).innerHTML = "";
		$id(PP.vfui.category.option.id + "_sortShowC" + i).style.backgroundColor = "#f7f7f7";
	}
}

/*******************************************************************************
 * 组合显示路径以及类目说明
 ******************************************************************************/

PP.vfui.category.showDefaultSort = function(levels) {
	for ( var i = 0; i < levels.length; i++) {
		if (levels[i] != 0)
			PP.vfui.category.uploadChangeSort(i + 1, $id(levels[i]));
	}
}
/*******************************************************************************
 * 组合显示路径以及类目说明
 ******************************************************************************/
PP.vfui.category.showSortPath = function(sortLevel, sortId) {
	// add by wanglei ,ie 浏览器有bug，这里需要根据当前选择的类目，恢复全部父类目路径
	PP.vfui.category.setSortPath(sortLevel, sortId);
	$id(PP.vfui.category.option.id + sortLevel).value = sortId;

	var nowSortPath = "";
	for ( var i = 1; i <= sortLevel; i++) {
		if (i == 1) {
			nowSortPath += ""
					+ arrData[$id(PP.vfui.category.option.id + i).value][0];
		} else {
			nowSortPath += " >> "
					+ arrData[$id(PP.vfui.category.option.id + i).value][0];
		}
	}
	$id(PP.vfui.category.option.id + "_sortPathShow").innerHTML = nowSortPath;
	$id(PP.vfui.category.option.id + "_sortPathShowUp").innerHTML = nowSortPath;
	$id(PP.vfui.category.option.id + "FullDesc").value = nowSortPath;

}




/*******************************************************************************
 * 根据类目id设置父类目值，用于搜索得到的类目以及曾经用过的类目
 ******************************************************************************/
PP.vfui.category.setSortPath = function(sortLevel, sortId) {
	var lastLevel = sortLevel - 1;
	var nowSort = sortId;
	$id(PP.vfui.category.option.id + sortLevel).value = nowSort;
	while (arrData[nowSort][1] != 0) {
		$id(PP.vfui.category.option.id + lastLevel).value = arrData[nowSort][1];
		nowSort = arrData[nowSort][1];
		lastLevel--;
	}
}
/*******************************************************************************
 * 根据类目id找到类目级别
 ******************************************************************************/
PP.vfui.category.checkLevel = function(sortId) {
	var nowLevel = 1;
	while (arrData[sortId][1] != 0) {
		nowLevel++;
		sortId = arrData[sortId][1];
	}
	return nowLevel;
}
/*******************************************************************************
 * 根据类目id得到路径，用于搜索
 ******************************************************************************/
PP.vfui.category.getPathString = function(sortId) {
	var str = "";
	var index = 0;
	while (arrData[sortId] && (index < 10)) {
		if (arrData[sortId][1] == 0) {
			str = arrData[sortId][0] + str;
			break;
		}
		else {
			str = " >> " + arrData[sortId][0] + str;
		}
		sortId = arrData[sortId][1];
		index++;
	}
	return str;
}
/*******************************************************************************
 * 选择下一级类目 sortLevel：类目级别 objSort：当前选中的类目
 ******************************************************************************/
PP.vfui.category.uploadChangeSort = function(sortLevel, objSort) {
	if (!objSort) {
		PP.vfui.js.dialog.alert('所选类目可能已经更改，请重新选择！');
		return;
	}
	// displayVirtualOption(arrData[objSort.id][2]);
	// showJNetStock(objSort.id, sortLevel);
	// showGirlTips(objSort.id,sortLevel);
	/* 显示路径并存储当前选中值 */

	PP.vfui.category.showSortPath(sortLevel, objSort.id);
	PP.vfui.category.uploadChangeItem(sortLevel + 1, objSort);
	if (sortLevel == 1) {
		for ( var j = 0; j < LData["c1"].length; j++)
			if ($id(LData["c1"][j]))
				$id(LData["c1"][j]).className = $id(LData["c1"][j]).className
						.replace(" selectedSort", "");
	} else {
		var nowSort = arrData[objSort.id][1];
		for ( var j = 0; NData[nowSort] && j < NData[nowSort].length; j++) {
			if ($id(NData[nowSort][j])) {
				$id(NData[nowSort][j]).className = $id(NData[nowSort][j]).className
						.replace(" selectedSort", "");
			}
		}
	}
	objSort.className = objSort.className + " selectedSort";
	
}

/*******************************************************************************
 * 显示某个类目的项目 sortLevel：类目级别 objSort：当前选中的类目
 ******************************************************************************/
PP.vfui.category.uploadChangeItem = function(sortLevel, objSort) {
	var label = "";
	var nowSort = objSort.id;

	for ( var j = 0; NData[nowSort] && j < NData[nowSort].length; j++) {

		if (PP.vfui.category.option.callBack(sortLevel, NData[nowSort][j],
				arrData[NData[nowSort][j]][0]) == true) {
			if (!PP.vfui.category.isLeaf(NData[nowSort][j]))
				label += "<div class='hasLeaf' id='" + NData[nowSort][j]
						+ "' onclick=\"PP.vfui.category.uploadChangeSort("
						+ sortLevel + ",this);\">"
						+ arrData[NData[nowSort][j]][0] + "</div>";
			else
				label += "<div id='" + NData[nowSort][j]
						+ "' onclick=\"PP.vfui.category.uploadChangeSort("
						+ sortLevel + ",this);\">"
						+ arrData[NData[nowSort][j]][0] + "</div>";
		}

		// alert(arrData[NData[nowSort][j]][0]);
	}

	if (label != "") {
		$id(PP.vfui.category.option.id + "_sortShowC" + sortLevel).innerHTML = label;
		$id(PP.vfui.category.option.id + "_sortShowC" + sortLevel).style.backgroundColor = "#ffffff";
		PP.vfui.category.showSortNote(sortLevel);
	} else
		PP.vfui.category.showSortNote(sortLevel - 1);
}

/*******************************************************************************
 * 检查是否叶子节点
 ******************************************************************************/
PP.vfui.category.isLeaf = function(val) {
	try {
		if (!NData[val] || NData[val].length == 0)
			return true;
		for ( var i = 0; i < NData[val].length; i++) {
			/* 如果子类目有一个不是预删除，就不是叶子节点 */
			if (!(arrData[NData[val][i]][2] & 0x01))
				return false;
		}
		return true;
	} catch (e) {
		return true;
	}
}

/*******************************************************************************
 * 用于调试
 ******************************************************************************/
PP.vfui.category.debugShowPath = function(comment) {
	var s = comment + ":";
	for ( var i = 1; i <= 5; i++) {
		s += (" c" + i + ":" + $id("c" + i).value);
	}
	PP.vfui.js.dialog.alert(s);
}
// ********************jsfunction****************************
PP.vfui.category.afterHide = function() {

}
PP.vfui.category.procCategory = function() {
	$$("#" + PP.vfui.category.option.id + "_btn").click(
			function() {
                var offset  = $$("#" + PP.vfui.category.option.id + "_btn").offset();
				var left = offset.left;
				var top = offset.top;
				if ($$("#" + PP.vfui.category.option.id + "_category").attr(
						"class") == "module_box_normal box_life h") {
					$$("#" + PP.vfui.category.option.id + "_category").css(
							"left", left+20);
					$$("#" + PP.vfui.category.option.id + "_category").css(
							"top", top+20);
					$$("#" + PP.vfui.category.option.id + "_category").attr(
							"class", "module_box_normal box_life");
				} else {
					$$("#" + PP.vfui.category.option.id + "_category").attr(
							"class", "module_box_normal box_life h")
				}
				return false;
			});

	$$("#" + PP.vfui.category.option.id + "_select_btn").click(
			function() {
				$$("#" + PP.vfui.category.option.id + "_category").attr(
						"class", "module_box_normal box_life h");
				PP.vfui.category.afterHide();
				return false;
			});
}

PP.vfui.category.setCategoryValue = function(id, classId) {
	$id(id).innerHTML = PP.vfui.category.getPathString(classId);
}

/*
*简单类目组件，只
*/
$namespace("PP.vfui.simpleCategory");
var iMask = 0;
PP.vfui.simpleCategory.option = {
    defaults : "",
    id : "",
    name : "",
    type : "static",
    multiple:"multiple",
    size:1,
    callBack : function() {
        return true;
    }
};

PP.vfui.simpleCategory.init = function() {
    var defOption = {
        defaults : "",
        callBack : function() {
            return true;
        },
        type : "static",
        multiple:"multiple",
        size:1
    };

    var option = jQuery.extend(defOption, PP.vfui.simpleCategory.option);
    PP.vfui.simpleCategory.option = option;
    if(PP.vfui.simpleCategory.option.multiple=="multiple"){
        PP.vfui.simpleCategory.uploadInit();    
    }else{
        PP.vfui.simpleCategory.initSelect();
    }

    //PP.vfui.category.procCategory();
};

PP.vfui.simpleCategory.initSelect =function(){

    var categoryId = PP.vfui.simpleCategory.option.id;
    var label = "";
    if(LData["c1"][0]!=0){
        LData["c1"].unshift(0);
        arrData[0] = [ '大类目', 0, 0 ];
    }    
    for (j = 0; j < LData["c1"].length; j++) {
        if (arrData[LData["c1"][j]][2] & 0x08)
            continue;
        if (arrData[LData["c1"][j]][2] & 0x01)
            continue;
        if(PP.vfui.simpleCategory.option.defaults[0]==LData["c1"][j]){
            label += "<option value ="+categoryId+LData["c1"][j]+" selected=true" 
            +" onclick='PP.vfui.simpleCategory.selectCategory(this)'>"
            +arrData[LData["c1"][j]][0]+"</option>";
        }else{
            label += "<option value ="+categoryId+LData["c1"][j]
            +" onclick='PP.vfui.simpleCategory.selectCategory(this)'>"
            +arrData[LData["c1"][j]][0]+"</option>";
        }
        
       
    }    
    $$("#"+PP.vfui.simpleCategory.option.id+"_category").append(label);
}
//初始化一级类目
PP.vfui.simpleCategory.uploadInit = function(){
    var categoryId = PP.vfui.simpleCategory.option.id;
    var j;
    var label = "";
    if(LData["c1"][0]!=0){
        LData["c1"].unshift(0);
        arrData[0] = [ '大类目', 0, 0 ];
    }
    for (j = 0; j < LData["c1"].length; j++) {
        if (arrData[LData["c1"][j]][2] & 0x08)
            continue;
        if (arrData[LData["c1"][j]][2] & 0x01)
            continue;

        var nowClass = '';
        label += "<div class='"
                    + nowClass
                    + "' id='"
                    + categoryId+LData["c1"][j]
                    + "' onclick=\"PP.vfui.simpleCategory.uploadChangeSort(this)\">"
                    + arrData[LData["c1"][j]][0] + "</div>";
    }
    $id(PP.vfui.simpleCategory.option.id + "_sortShowC").innerHTML = label;
    $id(PP.vfui.simpleCategory.option.id + "_sortShowC").style.backgroundColor = "#ffffff";
    //PP.vfui.simpleCategory.showSortNote(1);

    PP.vfui.simpleCategory.showDefaultSort(PP.vfui.simpleCategory.option.defaults);

    if (PP.vfui.simpleCategory.option.defaults.length == 0) {
        $id(PP.vfui.simpleCategory.option.id + "_sortPathShowUp").innerHTML = "请选择类目";
        $id(PP.vfui.simpleCategory.option.id + "FullDesc").value = "";
    }
    // $id("next").disabled = true; 
};
//显示默认选择的一级类目
PP.vfui.simpleCategory.showDefaultSort = function(defaults){
    var categoryId = PP.vfui.simpleCategory.option.id;
    $id(categoryId).value="";
    $id(categoryId+"FullDesc").value = "";
    $id(categoryId+"_sortPathShowUp").innerHTML = "";
    params = new Array();
    paramsId = new Array();
    for(var i=0;i<defaults.length;i++){
        for(var j=0;j<LData["c1"].length;j++){
            if(LData["c1"][j]==defaults[i]){
                $id(categoryId+LData["c1"][j]).className+=" selectedSort";
                params.push(arrData[LData["c1"][j]][0]);
                paramsId.push(defaults[i]);
                $id(categoryId).value = paramsId.join("||");
                $id(categoryId+"FullDesc").value=params.join("||");
                $id(categoryId+"_sortPathShowUp").innerHTML=params.join("||");
                break;
            }
        }       
    }

};
PP.vfui.simpleCategory.selectCategory =function(obj){
    var categoryId = PP.vfui.simpleCategory.option.id;
    $id(categoryId).value=obj.value.replace(categoryId,"");
    $id(categoryId+"FullDesc").value=obj.innerHTML;
}
//选择类目以及反选类目
PP.vfui.simpleCategory.uploadChangeSort = function(obj){
    var categoryId = PP.vfui.simpleCategory.option.id;
    if(PP.vfui.simpleCategory.option.size!=1){
        params = new Array();
        paramsId = new Array();
        if($id(categoryId).value != ""){
            params=$id(categoryId+"FullDesc").value.split("||");
            paramsId = $id(categoryId).value.split("||");
        }
        //反选
        if(obj.className.indexOf("selectedSort")!=-1){
            for(var i=0;i<params.length;i++){
                if(params[i]==obj.innerHTML){
                    params.splice(i, 1);
                }
            }
            
            for(var i=0;i<paramsId.length;i++){
                if(paramsId[i]==obj.id.replace(categoryId,"")){
                    paramsId.splice(i, 1);
                }
            }
            $id(categoryId).value = paramsId.join("||");
            $id(categoryId+"FullDesc").value=params.join("||");
            $id(categoryId+"_sortPathShowUp").innerHTML=params.join("||");
            obj.className = obj.className.replace(" selectedSort","");
        }else{
            params.push(obj.innerHTML);
            paramsId.push(obj.id.replace(categoryId,""));
            $id(categoryId).value = paramsId.join("||");
            $id(categoryId+"FullDesc").value=params.join("||");
            $id(categoryId+"_sortPathShowUp").innerHTML=params.join("||");
            obj.className+=" selectedSort";
        }
    }else{
        for ( var j = 0; j < LData["c1"].length; j++){
            if ($id(categoryId+LData["c1"][j])){
                $id(categoryId+LData["c1"][j]).className = $id(categoryId+LData["c1"][j]).className
                        .replace(" selectedSort", "");
            }
        }
        obj.className = obj.className + " selectedSort";
        $id(categoryId).value=obj.id.replace(categoryId,"");
        $id(categoryId+"FullDesc").value=obj.innerHTML;
        $id(categoryId+"_sortPathShowUp").innerHTML=obj.innerHTML;
        
    }
};

PP.vfui.simpleCategory.reset = function(obj){
    var categoryId = PP.vfui.simpleCategory.option.id;
    $id(categoryId).value="";
    $id(categoryId+"FullDesc").value = "";
    $id(categoryId+"_sortPathShowUp").innerHTML = "";
    
    for ( var j = 0; j < LData["c1"].length; j++){
        if ($id(categoryId+LData["c1"][j])){
            $id(categoryId+LData["c1"][j]).className = $id(categoryId+LData["c1"][j]).className.replace(" selectedSort", ""); 
        }       
    }
    $id(categoryId+0).className = $id(categoryId+0).className.replace(" selectedSort", "");   
    return false;

};

/*
 * ajax文件上传 20101207 sunniyang 提交
 * --------------------------------------------
 */
$namespace("PP.vfui.fileupload");
PP.vfui.fileupload.uploader = new Object();
PP.vfui.fileupload.uploadSubmit = function() {
	if (this.params.fileCount >= this.params.maxFiles) {
		PP.vfui.js.dialog.alert("最多允许上传" + this.params.maxFiles + "个文件");
		return false;
	}
};
// 文件上传后回调
PP.vfui.fileupload.uploadComplete = function(id, fileName, responseJSON) {
	if (!responseJSON.success) {
		PP.vfui.js.dialog.alert(responseJSON.msg);
		return;
	}
	PP.vfui.fileupload.addUploadedFile(responseJSON.data.token, fileName, this.params.fieldName);
	this.params.fileCount++;
};
// 页面上添加文件列表
PP.vfui.fileupload.addUploadedFile = function(realFileId, fileName, fieldName) {
	var listSpan = $id('uploadList_' + fieldName);
	var span = document.createElement('SPAN');
	span.style.width = '110px';
	listSpan.appendChild(span);
	span = document.createElement('SPAN');
	span.id = 'span_' + realFileId;
	var label = document.createElement('LABEL');
	label.style.marginRight = '8';
	label.innerText = fileName;
	span.appendChild(label);
	var a = document.createElement('A');
	a.href = "javascript:PP.vfui.fileupload.delUploadedFile('" + fieldName + "','" + realFileId + "');";
	a.innerText = '删除';
	span.appendChild(a);
	var input = document.createElement('INPUT');
	input.type = 'hidden';
	input.name = fieldName;
	input.value = realFileId;
	span.appendChild(input);
	var inputFN = document.createElement('INPUT');
	inputFN.type= 'hidden';
	inputFN.name = fieldName + "FileName";
	inputFN.value = fileName;
	span.appendChild(inputFN);
	listSpan.appendChild(span);
	listSpan.appendChild(document.createElement('BR'));
};
// 页面上删除文件列表
PP.vfui.fileupload.delUploadedFile = function(fieldName, realFileId) {
	if (!confirm('确认要删除吗？'))
		return;
	var fileSpan = $id('span_' + realFileId);
	fileSpan.parentElement.removeChild(fileSpan.previousSibling);
	fileSpan.parentElement.removeChild(fileSpan.nextSibling);
	fileSpan.parentElement.removeChild(fileSpan);
	PP.vfui.fileupload.uploader[fieldName]._options.params.fileCount--;
};

$namespace("PP.vfui.colspan");
PP.vfui.colspan.showOrHidden = function(targetId) {
	if ($id(targetId).style.display == 'none') {
		$id(targetId).style.display = 'block';
		return true;
	} else {
		$id(targetId).style.display = 'none';
		return false;
	}
};
PP.vfui.colspan.showOrHideText = function(id, targetId, hideLabel, showLabel) {
	var show = PP.vfui.colspan.showOrHidden(targetId);
	if (show) {
		$id(id).innerHTML = showLabel;
	} else {
		$id(id).innerHTML = hideLabel;
	}
};

$namespace("PP.vfui.region");
PP.vfui.region.regions = new Object();
PP.vfui.region.onChangeProv = function(pid, cid) {
	var region = PP.vfui.region.regions[pid];
	onChangeRegion(region.getProvinceBox(), region.getCityBox());
	var c = document.getElementById(cid);
	if (!c)
		return;
	if (c.options.length > 0) {
		c.options[0].value = '';
	}
	else {
		var opt = document.createElement('OPTION');
		c.options.add(opt);
		opt.value='';
		opt.innerHTML='';
	}
	if (!region.showAll)
		return;
	c.options[0].innerHTML = '<所有>';
};
PP.vfui.region.createRegion = function(pid, cid, level, showAll) {
	var region = new CRegionSelectBox(pid, cid);
	region.showAll = showAll;
	region.init();
	if (showAll) {
		document.getElementById(pid).options[0].innerHTML='<所有>';
	}
	document.getElementById(pid).value = '';
	if (level >=2) {
		var opt = document.createElement("OPTION");
		document.getElementById(cid).options.add(opt);
		opt.value='';
		opt.innerHTML=showAll ? '<所有>' : '';
	}
	PP.vfui.region.regions[pid] = region;
};

PP.vfui.tag.init();
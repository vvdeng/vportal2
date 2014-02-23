/*		
Ajax请求
--------------------------------------------
修订记录：
20101118 raywu 修复图片延迟加载bug
20101115 raywu 增加图片延迟加载
20101110 raywu Ajax提交Loading效果和AjaxAnywhere支持 
20101108 sunniyang	Ajax提交
--------------------------------------------
*/
function $namespace(str){
    var arr=str.split(',');
    for(var i=0,len=arr.length;i<len;i++){
        // 将命名空间切成N部分, 比如mini、common等
        var    arrJ=arr[i].split("."),parent={};
        for (var j = 0,jLen=arrJ.length; j < jLen; j++){
            var name = arrJ[j],child=parent[name];
            j===0?eval('(typeof '+name+')==="undefined"?('+name+'={}):"";parent='+name):(parent=parent[name]=(typeof child)==='undefined'?{}:child);
        };
    }
};
$namespace("PP.vfui.js.ajax");
/**
 * 显示加载的Loading图片，并在背景覆盖半透明层
 * @author : raywu
 * @level : public
 */
PP.vfui.js.ajax.showLoading = function () {
    //半透明层
	var div = document.getElementById("loadingDiv");
	if (div == null) {
		div = document.createElement("DIV");
		document.body.appendChild(div);
		div.id = "loadingDiv";
		div.style.position = "absolute";
		div.style.top = 0;
		div.style.left = 0;
		div.style.background = "black";
		div.style.filter = "alpha(opacity=5)";
		div.style.zIndex = "500";
		div.style.opacity = "0.05";
	}
	div.style.width = "100%";
	if (document.body.scrollHeight > document.body.offsetHeight) {
		div.style.height = document.body.scrollHeight + "px";
	} else {
		div.style.height = document.body.offsetHeight + "px";
	}
	div.style.display = "block";
	//Loading图片
	var imgDiv = document.getElementById("loadingImgDiv");
	if (imgDiv == null) {
		imgDiv = document.createElement("DIV");
		document.body.appendChild(imgDiv);
		imgDiv.id = "loadingImgDiv";
		imgDiv.innerHTML = "<img src='resources/loading3.gif' />";
		imgDiv.style.position = "absolute";
		imgDiv.style.filter = "alpha(opacity=100)";
		imgDiv.style.zIndex = "500";
		imgDiv.style.opacity = "1";
	}
	imgDiv.style.left = "50%";
	imgDiv.style.top = (document.body.scrollTop + document.body.offsetHeight / 2);
	imgDiv.style.display = "block";
};
/**
 * 隐藏Loading图片和半透明层
 * @author : raywu
 * @level : public
 */
PP.vfui.js.ajax.hideLoading = function () {
	var div = document.getElementById("loadingDiv");
	if (div != null) {
		div.style.display = "none";
	}
	var imgDiv = document.getElementById("loadingImgDiv");
	if (imgDiv != null) {
		imgDiv.style.display = "none";
	}
};
/**
 * 当对象滚动到显示窗口时调用回调方法
 * @author : raywu
 * @level : private
 */
(function(){
    var	isBind=false,
        heightList=[],
        funcList=[],
        optList=[],
        visibleH=0;//窗口高度
    PP.vfui.js.ajax.clearScroll=function() {
    	if (heightList.length > 0) {
	    	heightList.length = 0;
	    	funcList.length = 0;
	    	optList.length = 0;
        }
    }
    
    PP.vfui.js.ajax.scroll=function(opt){
    	  if (visibleH == 0) {
    	  	visibleH = document.body.offsetHeight;
    	  }
        var height=opt.height?opt.height:$getY($id(opt.id));
        if(visibleH<height){
            heightList.push(height*1);
            funcList.push(opt.func);
            optList.push(opt);
        }else{
            //如果设置的值本身就小于屏幕的值，那就没有必要压入了，直接执行
            opt.func(opt);
        };
        
        //如果已经绑定onscroll，无需重复绑定
        if(!isBind){
            $addEvent(window,'scroll',doScroll);
            $addEvent(window,'resize',doResize);
            isBind=true;
        };
        
		function doResize(){
			visibleH=document.body.offsetHeight;
			doScroll();
		};
		
        function doScroll(){
			var len=heightList.length;
			if(len===0){
				$delEvent(window,'scroll',doScroll);
            	$delEvent(window,'resize',doScroll);
            	isBind = false;
				return null;
			};
			
			var	dv 		= document.defaultView,
			 	y 		= (dv) ? dv.pageYOffset : 0,
				h 		= Math.max(document.body.scrollTop,document.documentElement.scrollTop,y) + visibleH,//可见范围
				arrHeight=[],
				arrFunc=[],
				arrOpt=[];
		    for(var i=0;i<len;i++){
                if(h > heightList[i]){
                    //无论是否需要，把传入进来的opt再传入调用函数
                   funcList[i](optList[i]);
				   //把已经操作完成的出栈
                }else{
					arrHeight.push(heightList[i]);
					arrFunc.push(funcList[i]);
					arrOpt.push(optList[i]);
				}
            };
			heightList=arrHeight;
			funcList=arrFunc;
			optList=arrOpt;
        }
    };
})()
/**
 * 延迟加载图片
 * @author : raywu
 * @level : private
 */
PP.vfui.js.ajax.loadImagesByScroll = function(){
	//先清除之前注册的scroll处理
	PP.vfui.js.ajax.clearScroll();
	
	//根据页面滚动状态按需请求需要的图片
	//初始化要加载的内容
	var bodyCache=document.body,
		domCache=(document.compatMode=='BackCompat')?bodyCache:document.documentElement,
		offsetH=(window.MessageEvent&&!$isBrowser('firefox'))?bodyCache.scrollTop:domCache.scrollTop,
		allImage=document.images,
		loadList={}//要加载的图片列表;//可见范围

	//遍历出需要按需加载的图片
	for(var i=0,len=allImage.length;i<len;i++){
		var oImg=allImage[i];
		if((typeof(oImg)=="object") && oImg.getAttribute("init_src") ){
			var _index=$getYP(oImg);
			_index=_index>offsetH?(_index-offsetH):0;
			(loadList[_index])?loadList[_index].push(oImg):loadList[_index]=[oImg];
		}
	}

	for(var i in loadList){
		PP.vfui.js.ajax.scroll({height:i,data:loadList[i],func:loadImg});
	}
	
	function loadImg(opt){
		for(var i=0,len=opt.data.length;i<len;i++){
			var oImg=opt.data[i];
			var src=oImg.getAttribute("init_src");
			if(src){
				oImg.setAttribute("src",src);
				oImg.removeAttribute("init_src");
			}
		}
	}
}

/**
 * 初始化
 * @author : raywu
 * @level : private
 */
PP.vfui.js.ajax.initCallback = function() {
	PP.vfui.js.ajax.loadImagesByScroll();
}
/********************AjaxAnywhere Begin***********************************/
AjaxAnywhere.prototype.showLoadingMessage = function () {
	PP.vfui.js.ajax.showLoading();
};
AjaxAnywhere.prototype.hideLoadingMessage = function () {
	PP.vfui.js.ajax.hideLoading();
};
/**
 * 提交form表单并刷新AjaxAnywhere区域
 * @param formName 要提交的form表单的名称
 * @param zoneNames 需要刷新的AjaxAnywhere区域区域，多个以","隔开
 * @param config 调用配置，目前支持onAfterResponseProcessing属性
 * @author : raywu
 * @level : public
 */
PP.vfui.js.ajax.refreshZone = function (formName, zoneNames, config) {
	ajaxAnywhere.getZonesToReload = function () {
		if (typeof (zoneNames) == "undefined" || zoneNames == null) {
			return "dataZone";
		} else {
			return zoneNames;
		}
	};
	ajaxAnywhere.onAfterResponseProcessing = function() {
		PP.vfui.js.ajax.initCallback();
		
		if (typeof (config) != "undefined" && config && config.onAfterResponseProcessing) {
			config.onAfterResponseProcessing();
		}
	};
	ajaxAnywhere.formName = formName;
	ajaxAnywhere.submitAJAX();
};
/**
 * 通过url提交请求并刷新AjaxAnywhere区域
 * @param url 要提交的url
 * @param zoneNames 需要刷新的AjaxAnywhere区域区域，多个以","隔开
 * @param config 调用配置，目前支持onAfterResponseProcessing属性
 * @author : bevisdeng
 * @level : public
 */
PP.vfui.js.ajax.refreshZoneByUrl = function (reqUrl, zoneNames, config) {
	var formName="cust_form_";
	var custForms=document.getElementsByName(formName);
	if(custForms){
		for(var i=0;i<custForms.length;i++){
			document.body.removeChild(custForms[i]);
		}
	}
	ajaxAnywhere.getZonesToReload = function () {
		if (typeof (zoneNames) == "undefined" || zoneNames == null) {
			return "dataZone";
		} else {
			return zoneNames;
		}
	};
	ajaxAnywhere.onAfterResponseProcessing = function() {
		PP.vfui.js.ajax.initCallback();
		
		if (typeof (config) != "undefined" && config && config.onAfterResponseProcessing) {
			config.onAfterResponseProcessing();
		}
	};
	if (typeof (reqUrl) == "string") {
		
		var url =/^([^#?]*)/.exec(reqUrl)?RegExp.$1:reqUrl;
		var postData = /.*\?([^#?]*)/.exec(reqUrl)?RegExp.$1:"";
		postData=postData.replace("undefined","");
	}
	else if(typeof (reqUrl) == "object"){
		var url=reqUrl.url;
		var postData=reqUrl.data;
	}	
	//ie不能设置name属性
	try{
		//ie
		var f = document.createElement('<form name="'+formName+'" action="'+url+'"></form>');
	}catch(e){
		//ff
		f=document.createElement('form');
		f.setAttribute('name',formName);
		f.setAttribute("action",url);
	}
	document.body.appendChild(f);
	
	ajaxAnywhere.formName = formName;
	ajaxAnywhere.submitAJAX("aaxmlrequest=true&"+postData);
};
/********************AjaxAnywhere End*************************************/
/********************Ajax提交 Begin***********************************/
/**
 * Ajax提交
 * 参数形式1：提交form表单(2个参数)
 * @param form表单名称
 * @param 参数
 * 参数形式2：提交Ajax请求(1个参数)
 * @param 参数
 *
 * 参数格式为 {param1 : value1 , ...,paramN : valuen}，允许的参数包括
 * data : 请求参数(json格式)，如果是参数形式1，则不需要设该值
 * method : Http请求方法(GET/POST)
 * url : 请求url
 * onSuccess : 提交成功回调
 * onFailed : 失败回调
 *
 * 成功和失败回调数据格式：
 * {
 *    errCode : 响应码,
 *    msg : 响应码说明,
 *    data : 结果数据
 * }
 * @author : raywu
 * @level : public
 */
PP.vfui.js.ajax.submit = function () {
	if (arguments.length == 0) {
		return;
	}
	var data = null;
	var url = null;
	var method = "post";
	var onSuccess = null;
	var onFailed = null;
	//解析参数
	if (arguments.length == 1) {
		var arg = arguments[0];
		if (arg.data) {
			data = arg.data;
		}
		if (typeof arg != "object") {
			throw new Error("bad argument. argument must be a json object.");
		}
		if (arg.url == undefined) {
			throw new Error("bad argument. argument must contain url property.");
		}
		url = arg.url;
		if (arg.method && arg.method.toLowerCase() != "post") {
			method = arg.method;
		}
		if (arg.onSuccess && typeof arg.onSuccess == "function") {
			onSuccess = arg.onSuccess;
		}
		if (arg.onFailed && typeof arg.onFailed == "function") {
			onFailed = arg.onFailed;
		}
	} else {
		var form = arguments[0];
		var realForm = form;
		if (typeof form != "object") {
			realForm = $id(form);
		}
		if (!realForm) {
			throw new Error("can not find form with id'" + form + "'.");
		}
		data = PP.vfui.js.form.collect(realForm);
		var arg = arguments[1];
		if (typeof arg != "object") {
			throw new Error("bad argument. argument must be a json object.");
		}
		if (arg.url == undefined) {
			throw new Error("bad argument. argument must contain url property.");
		}
		url = arg.url;
		if (arg.method && arg.method.toLowerCase() != "post") {
			method = arg.method;
		}
		if (arg.onSuccess && typeof arg.onSuccess == "function") {
			onSuccess = arg.onSuccess;
		}
		if (arg.onFailed && typeof arg.onFailed == "function") {
			onFailed = arg.onFailed;
		}
	}
	//开始请求，显示loading...
	PP.vfui.js.ajax.showLoading();
	jQuery.ajax({cache:false, url:url, type:method, dataType:"json", data:data, beforeSend:function (xhr) {
		xhr.setRequestHeader("isAjaxRequest", "true");
	}, success:function (responseJson, status) {
		//结束请求，隐藏loading...
		PP.vfui.js.ajax.hideLoading();
		if (responseJson.errCode == 0) {
			if (onSuccess) {
				onSuccess(responseJson);
			} else {
				PP.vfui.js.dialog.alert("\u64cd\u4f5c\u6210\u529f");
			}
		} else {
			if (onFailed) {
				onFailed(responseJson);
			} else {
				//-1 : 用户未登陆
				if (responseJson.errCode == -1) {
					PP.vfui.js.dialog.alert("\u60a8\u957f\u65f6\u95f4\u672a\u64cd\u4f5c\uff0c\u5df2\u88ab\u9000\u51fa\uff0c\u8bf7\u91cd\u65b0\u767b\u9646");
				} else {
					//-2 : 访问受限
					if (responseJson.errCode == -2) {
						PP.vfui.js.dialog.alert("\u6743\u9650\u53d7\u9650");
					} else {
						// -9 - -3 : 安全控制预留 
						if (responseJson.errCode > -10 && responseJson.errCode < -2) {
							PP.vfui.js.dialog.alert("\u6743\u9650\u68c0\u67e5\u9519\u8bef\uff0c\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458");
						} else {
						    // <= -10 : 系统错误
							if (responseJson.errCode <= -10) {
								PP.vfui.js.dialog.alert("\u7cfb\u7edf\u9519\u8bef");
							} else {
								//业务错误，直接显示业务信息
								PP.vfui.js.dialog.alert(responseJson.msg);
							}
						}
					}
				}
			}
		}
	}, error:function (xml, status) {
		//结束请求，隐藏loading...
		PP.vfui.js.ajax.hideLoading();
		if (onFailed) {
			onFailed({errCode:-10, msg:"\xcf\xb5\xcd\xb3\xb4\xed\xce\xf3", data:jQuery.httpData(xml)});
		} else {
			PP.vfui.js.dialog.alert("\u7cfb\u7edf\u9519\u8bef");
		}
	}});
};
/********************Ajax提交 End***********************************/


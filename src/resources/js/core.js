/*********** Begin Core Function ***********/

function $id(id){
	return document.getElementById(id)
};

function $extend(){
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, options;
	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target != "object" && typeof target != "function" )
		target = {};
	for ( ; i < length; i++ )
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null )
			// Extend the base object
			for ( var name in options ) {
				var copy = options[ name ];
				// Prevent never-ending loop
				if ( target === copy )
					continue;
				if ( copy !== undefined )
					target[ name ] = copy;
			}
	// Return the modified object
	return target;
};

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

function $initActiveMsg(){
	//初始化卖场相关的提示语
	//系统提示，请勿更改
	if(!window.activeErrMsg_text){
		window.activeErrMsg_text = [
			"对不起，活动尚未开始。", //活动未开始
			"对不起，活动已结束。", //活动已结束
			"对不起，您暂时不能参与该活动，详细情况请联系拍拍客服。", //买家正受处罚
			"对不起，服务器繁忙，请稍后再试。", //没法调用查询订单接口系统
			"对不起，请输入正确的订单号。", //订单号为空
			"对不起，您输入的订单号无效。", //查询不到订单信息
			"对不起，您输入的订单号无效。", //修改了订单时间
			"对不起，您的订单付款金额不满足活动要求，不能参与本活动", //订单金额是否满足活动要求
			"对不起，您的订单中商品不属于本活动指定类目，详情请参看活动规则！", //订单类目不满足活动要求
			"对不起，该订单没有完成财付通付款，不能使用该订单", //订单没有完成付款
			"对不起，当前订单支付方式不支持此次活动，详情请参看活动规则！", //订单不是通过财付通付款
			"对不起，您不是该订单的买家，不能使用该订单", //兑奖用户不是订单买家
			"对不起，您的订单卖家不满足活动要求，不能参与活动，详情请参看活动规则！", //卖家不满足活动要求
			"对不起，您的订单不是在指定的时间内完成付款，不能参与活动。", //订单没有在指定时间内完成付款
			"对不起，当日订单仅限当天参加活动，当晚24：00订单失效，详情请参看活动规则。", //订单不是在当日付款
			"对不起，您的信用等级不满足活动要求，不能参与活动。", //买家信用不满足活动要求
			"对不起，您尚未开通彩钻，不能参与活动。", //买家没开通彩钻
			"对不起，您的彩钻等级不满足活动要求，不能参与活动。", //用户彩钻等级不满足活动要求
			"对不起，您尚未选择奖品等级。", //用户未选择兑奖/抽奖的等级
			"对不起，该奖池暂无该奖品，请稍后再试。", //（某等级）奖品已经兑、抽完
			"对不起，今日奖品已发放完，请稍后再试。", //（某等级）当日奖品已经兑、抽完
			"对不起，本时段的奖品已发放完，请稍后再试。", //（某等级）当小时奖品已经兑、抽完
			"对不起，您在本活动中的参与次数已达到上限。", //已达到活动指定的兑、抽奖上限
			"对不起，您在本活动中单日的参与次数已达到上限。", //已达到活动单日指定的兑、抽奖上限
			"对不起，您兑换该奖品次数已达到上限", //兑换某等级奖品次数已达到上限
			"对不起，该订单已经参与过拍拍网活动了。", //订单重复使用
			"对不起，该QQ号码已经参与过拍拍网活动了。",//QQ号码重复使用
			"对不起，您在本活动的中奖次数已达到上限！"//中奖次数已达到上限
			
		];
	}
	if(!window.activeLeverMsg){
		window.activeLeverMsg = [
			"",
			"您好，您是拍拍彩钻lv2用户，您申领的5元红包，我们将在3个工作日发到您的财付通帐户，请注意查收。", 	//等级1
			"您好，您是拍拍彩钻lv3用户，您申领的10元红包，我们将在3个工作日发到您的财付通帐户，请注意查收。", //等级2
			"您好，您是拍拍彩钻lv4用户，您申领的10元红包，我们将在3个工作日发到您的财付通帐户，请注意查收。", //等级3
			"您好，您是拍拍彩钻lv5用户，您申领的20元红包，我们将在3个工作日发到您的财付通帐户，请注意查收。",	//等级4
		];
	}
	if(!window.activeLeverMsg){
		window.activeEndMsg="抱歉，红包已经领取完";
	}
	if(window.lvl_text){
		window.activeLeverMsg=window.lvl_text;
	}
	if(window.lv_end){
		window.activeEndMsg=lv_end;
	}
}

function $display(ids,state){
	var state=state||'';
	if(typeof(ids)=="string"){
		var arr=ids.split(',');
		
		for(var i=0,len=arr.length;i<len;i++){
			var o=$id(arr[i]);
			o?o.style.display=state:'';
		}	
	}else{ids.style.display=state}
};

function $isFloat(v){
	//浮点数
	return /^(([1-9]\d*)|(\d+\.\d+)|0)$/.test(v); 
};

function $isRange(v,min,max){
	//注意，这里的undefined不能加上引号
	if(min!=null&&max!=null){
		return v>=min&&v<=max;
	}else if(min!=null){
		return v>=min;
	}else if(max!=null){
		return v<=max;
	}else{return true}
}

function $strLenGB(v){
	//一个中文按照两个字节算，返回长度
	return v.replace(/[\u00FF-\uFFFF]/g,"  ").length;
};

function $val(findstr){
	var objs=$$(findstr);
	var returnvar=[];
	for(var i=0;i<objs.length;i++){
		var t=objs[i];
		if(t.tagName.toLowerCase()=="input"){
			if((t.type.toLowerCase()=="checkbox" || t.type.toLowerCase()=="radio") ){	//设置单选复选框的值
				if(t.checked==true){
					returnvar.push(t.value);
				}
			}else{
				returnvar.push($$(t).val());
			}
		}else if(t.tagName.toLowerCase()=="select"){
			returnvar=returnvar.concat($$(t).val());
		}else{
			returnvar.push($$(t).val());
		}
	}
	returnvar=$$.grep(returnvar,function(n,i){return n!=null;});
	return returnvar;
};

function $arrayUniq(arr){
	var returnArr=[];
	for (var i=0,len=arr.length;i<len;i++){
		((","+returnArr+",").indexOf(","+arr[i]+",")<0)?returnArr.push(arr[i]):'';
	};
	return returnArr;	
}

function $loadScript(url,id,obj){
	//创建一个script并加载script
	//参数：id:'放置script的id',url:'载入的地址'
	setTimeout(function(){
		var s = document.createElement("script"),
			time=new Date().getTime(),
			id= id?(id+time):time,
			o=obj||{},			
			charset=o.charset|| "gb2312";
		s.charset=charset;
		s.id = id;
		document.getElementsByTagName("head")[0].appendChild(s);
		s.src = $addToken(url);
		return s;
	},0);
};

function $loginRefresh(opt){
	//根据地址刷新用户登录时间（判断是否登录）
	var option={
		url:'',		//刷新地址
		time:'',	//默认刷新时间
		onBack:function(){return true},
		onLogin:function(){return true},
		onLoginOut:function(){return true}
	};
	for(var key in opt){
		option[key]=opt[i];
	};
	if(''==option.url){
		alert('请输入刷新的网址。');
		return false;
	};
	//动态刷新登陆时间,防止页面超时
	//t:间隔刷新时间,默认十分钟
	option.time?'':option.time=600000;
	window._loginRefreshOption=option;
	window._loginRefreshCallBack=_loginRefreshCallBack;

	/*******************************
	 http://sale.brand.paipai.com/isLoginCheck.xhtml?tag=10000 	 
	 //如果有tag会回传，如果没有就算了
	 try{
	   _loginRefreshCallBack(
	 	{isLogin:true,uin:6607580,tag:10000})
	 }catch(e){
	
	 }
	 *******************************/
	setTimeout(_loginRefreshLoad,option.time);
	
	function _loginRefreshLoad(){
		$loadScript(option.url,'loginRefreshLoad');
	};
	
	function _loginRefreshCallBack(obj){
		var opt=window.$loginRefreshOption;
		if(opt.onBack()){
			if(false==obj.isLogin){
				if(opt.onLogin()){
					alert('登录超时。');
					window.document.location.reload();
				};
			}else{
				if(opt.onLoginOut()){
					setTimeout(_loginRefreshLoad,opt.time)
				}
			}
		}
	}
};

function $loadCss(path){
	if(!window["_loadCss"+path]){
			var l = document.createElement('link');
			l.setAttribute('type', 'text/css');
			l.setAttribute('rel', 'stylesheet');
			l.setAttribute('href', path);
			l.setAttribute("id","loadCss"+Math.random());
			document.getElementsByTagName("head")[0].appendChild(l);
			window["_loadCss"+path]=true;
	}
	return true;
}

function $getPageScrollHeight(){
	var bodyCath=document.body;
	var doeCath=document.compatMode=='BackCompat'?bodyCath:document.documentElement;
	return (window.MessageEvent && navigator.userAgent.toLowerCase().indexOf('firefox')==-1)?bodyCath.scrollTop:doeCath.scrollTop;
}

function $getPageScrollWidth(){
	var bodyCath=document.body;
	var doeCath=document.compatMode=='BackCompat'?bodyCath:document.documentElement;
	return (window.MessageEvent&&navigator.userAgent.toLowerCase().indexOf('firefox')==-1)?bodyCath.scrollLeft:doeCath.scrollLeft;
}

function $getWindowHeight(){
	var bodyCath=document.body;
	return (document.compatMode=='BackCompat'?bodyCath:document.documentElement).clientHeight;
}

function $getWindowWidth(){
	var bodyCath=document.body;
	return (document.compatMode=='BackCompat'?bodyCath:document.documentElement).clientWidth;
}

function $getContentHeight(){
//获取页面内容的实际高度
var bodyCath=document.body;
var doeCath=document.compatMode=='BackCompat'?bodyCath:document.documentElement;
return (window.MessageEvent&&navigator.userAgent.toLowerCase().indexOf('firefox')==-1)?bodyCath.scrollHeight:doeCath.scrollHeight;
}

function $getContentWidth(){
//获取页面内容的实际宽度
	var bodyCath=document.body;
	var doeCath=document.compatMode=='BackCompat'?bodyCath:document.documentElement;
	return (window.MessageEvent&&navigator.userAgent.toLowerCase().indexOf('firefox')==-1)?bodyCath.scrollWidth:doeCath.scrollWidth;
}

function $floatTip(obj){
//显示浮窗,支持各种形态
	var option={
		title:"",
		html:"",
		left:"",
		top:"",
		width:'400',
		height:"",
		fix:false,	//是否固定居中随屏幕滚动，如果为true则left和top无效
		style:"",	//stand\none\poptip
		cover:true,	//显示覆盖背景
		onClose:function(){return true;}	//关闭事件
	};
	for(var i in obj){
		option[i]=obj[i];
	}
	$loadCss("http://static.paipaiimg.com/module/module_box.css");
	//关闭掉类似窗口
	if(window._tipsHandle){
		try{window._tipsHandle.close();window._tipsHandle="";}catch(e){}
	}
	//处理覆盖的半透明背景
	if(option.cover){
		var c=document.createElement("div");
		c.id="coverbg";
		c.style.display="none";
		c.style.width="0px";
		c.style.height="0px";
		c.style.backgroundColor ="#cccccc";
		c.style.filter="Alpha(Opacity=60)";
		c.style.opacity="0.60";
		c.style.zIndex=200;
		c.style.position="absolute";
		c.style.left="0px";
		c.style.top="0px";
		document.body.appendChild(c);
		var slist=document.getElementsByTagName("select");
		for(var i=0;i<slist.length;i++){
			if(slist[i].style.display!="none"){
				slist[i].style.display="none";
				slist[i].setAttribute("hideForCover","1");
			}
		}
		option.hideSelectList=slist;
		c.style.display="block";
		c.style.left="0px";
		c.style.top="0px";
		c.style.position="absolute";
		option.coverbg=c;
		window._floatTipTimer1=setInterval(function(){
			var c=document.getElementById("coverbg");
			if(c){
				if(c.style.display=="none"){return;}
				c.style.height=($getContentHeight()>$getWindowHeight()?$getContentHeight():$getWindowHeight())+"px";
				c.style.width=($getContentWidth()>$getWindowWidth()?$getContentWidth():$getWindowWidth())+"px";
			}else{
				clearInterval(window._floatTipTimer1);
				window._floatTipTimer1=null;
			}
		},30);
	}
	var c=document.createElement("div");
	c.id='float_box';
	//根据样式输出不同模板，有标题和关闭按钮的
	if(option.style=="stand"){
		c.className="module_box_normal";
		c.innerHTML='<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;filter:Alpha(Opacity=0);opacity:0;border:none;" id="float_iframe"></iframe><div class="box_title"><h4>'+option.title+'</h4><a href="javascript:;" class="bt_close" id="float_closer"></a></div><div class="box_content">'+option.html+'</div>';
	}
	//根据样式输出不同模板,无任何样式的时候输出一个空的div
	if(option.style==""){
		c.className="module_box_normal";
		c.innerHTML='<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;filter:Alpha(Opacity=0);border:none;" id="float_iframe"></iframe><div class="box_content">'+option.html+'</div>';
	}
	if(option.style=="none"){
		//完全空白，不含样式的模板
		c.className="";
		c.style.position="absolute";
		c.innerHTML='<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;filter:Alpha(Opacity=0);border:none;" id="float_iframe"></iframe><div class="box_content">'+option.html+'</div>';
	}	
	document.body.appendChild(c);
	//返回操作句柄
	option.frame=c;
	option.height?(option.frame.style.height=option.height+"px"):"";
	option.width?(option.frame.style.width=option.width+"px"):"";
	option.frame.style.zIndex=300;
	option.frame.style.position="absolute";
	option.closer=document.getElementById("float_closer");
	option.iframe=document.getElementById("float_iframe");
	//窗口定位，如果没有指定坐标则居中
	var p=[0,0];
	p[0]=(option.left?option.left:($getPageScrollWidth()+($getWindowWidth()-option.frame.scrollWidth)/2));
	p[1]=(option.top?option.top:($getPageScrollHeight()+($getWindowHeight()-option.frame.scrollHeight)/2));
	//如果超出屏幕则自动移入
	//超出右侧
	(p[0]+option.frame.scrollWidth)>($getPageScrollWidth()+$getWindowWidth())?(p[0]=$getPageScrollWidth()+$getWindowWidth()-option.frame.scrollWidth-10):"";
	//超出底部
	(p[1]+option.frame.scrollHeight)>($getPageScrollHeight()+$getWindowHeight())?(p[1]=$getPageScrollHeight()+$getWindowHeight()-option.frame.scrollHeight-10):"";
	//超出顶部
	p[1]<$getPageScrollHeight()?p[1]=$getPageScrollHeight():"";
	//超出左侧
	p[0]<$getPageScrollWidth()?p[0]=$getPageScrollWidth():"";
	//调整iframe的高度与浮窗一样大小
	option.iframe.height=option.frame.scrollHeight+"px";
	option.iframe.width=option.frame.scrollWidth+"px";
	option.frame.style.left=p[0]+"px";
	option.frame.style.top=p[1]+"px";
	//如果是fix则随屏幕滚动
	if(option.fix){
		if($isBrowser("ie6")){
			setInterval(function(){
				var c=document.getElementById("float_box");
				if(c){
				  c.style.left=($getPageScrollWidth()+($getWindowWidth()-c.scrollWidth)/2)+"px";
				  c.style.top=($getPageScrollHeight()+($getWindowHeight()-c.scrollHeight)/2)+"px";
				}
			},30);
		}else{
			var c=document.getElementById("float_box");
			c.style.position="fixed";
			c.style.left=($getWindowWidth()-c.scrollWidth)/2+"px";
			c.style.top=($getWindowHeight()-c.scrollHeight)/2+"px";
		}
	}
	//绑定关闭按钮的事件
	option.closer?option.closer.onclick=function(){
		option.close();
	}:"";
	//关闭方法
	option.close=function(){
		if(!option.onClose()){	return;	}
		option.frame?option.frame.style.display="none":"";
		option.frame.parentNode.removeChild(option.frame);
		if(option.coverbg){
			option.coverbg.style.display="none";
			option.coverbg.parentNode.removeChild(option.coverbg);
			var slist=option.hideSelectList;
			for(var i=0;i<slist.length;i++){
				if(slist[i].getAttribute("hideForCover")=="1"){
					slist[i].style.display="";
				}
			}
		}
	};
	window._tipsHandle=option;
	return option;
};

function $getX(e){
//获取页面中对象的绝对X位置
	var t=e.offsetLeft;
	while(e=e.offsetParent)t+=e.offsetLeft;
	return t;
}

function $getY(e){
//获取页面中对象的绝对Y位置
	var t=e.offsetTop;
	while(e=e.offsetParent){
		t+=document.body!=e?e.offsetTop:0;
	}
	return t;
}

function $getQuery(name,url){
//参数：变量名，url为空则表从当前页面的url中取
	var u  = arguments[1] || window.location.href;
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = u.substr(u.indexOf("\?")+1).match(reg);
	if (r!=null) {
		return r[2];
	} 
	return "";
};

//把商品加入购物车
function $addToShopcar(obj) {
    var option = {
        commlist: "",
        style: 0,
        left: "",
        top: "",
        checkIframe: false
    };
    option.template = '【添加成功】<div class="box_hint_normal"><span class="icon msg2-icon-right"></span><div class="hint_content"><p class="hint_title"><strong>已成功添加到购物车！</strong></p><p>购物车里已有 {#count#} 种商品。总价 {#total#} 元。</p><div class="hint_op"><button class="btn_normal" id="shopcar_b_watch">查看购物车</button> <button class="btn_normal" id="shopcar_b_goon">继续购物</button></div><div class="hint_other"><p><a href="http://shop.paipai.com/{#uin#}">查看该卖家的其他商品</a></p></div></div></div>【添加成功】【已经存在】<div class="box_hint_normal"><span class="icon msg2-icon-right"></span><div class="hint_content"><p class="hint_title"><strong>您之前添加过该商品，此次操作将会增加该商品的数量，确认吗？</strong></p><div class="hint_op"><button class="btn_normal" id="shopcar_b_cover">确 认</button> <button class="btn_normal" id="shopcar_b_cancel">不要添加</button></div><div class="hint_other"><p style="text-align:right; display:none;"><a href="##">不再显示该提示</a></p></div></div></div>【已经存在】【其他错误】<div class="box_hint_normal"><span class="icon msg2-icon-right"></span><div class="hint_content"><p class="hint_title"><strong>{#error#}</strong></p><div class="hint_op"> <button class="btn_normal" id="shopcar_b_cancel">取 消</button></div><div class="hint_other"></div></div></div>【其他错误】';
    for (var i in obj) {
        option[i] = obj[i];
    }
    window._shopcarOption = option;
    var s = $$("#shopCarHead");
    if (s.length > 0) {
        $animateFloat({
            startY: s.offset().top,
            startX: s.offset().left,
            startH: s.height(),
            startW: s.width(),
            endY: option.top,
            endX: option.left,
            endH: 130,
            endW: 400,
            callBack: function () {
                doShopcatAction();
                return true;
            }
        })
    } else {
        doShopcatAction();
    }

    function doShopcatAction(type) {
        var option = window._shopcarOption;
        var tips = $float({
            html: '<div class="loading"><img src="http://static.paipaiimg.com/assets/common/icon_loading_large.gif" /><strong>请稍候...</strong></div>',
            left: option.left,
            top: option.top,
            cover: false
        });
        window._shopcarOption.tipHandle = tips;
        $loadScript("http://auction.paipai.com/cgi-bin/shopcart/addcmdy?commlist=" + (option.commlist.replace(/\+/g, encodeURIComponent('+'))) + "&type=" + (type ? type : 0) + "&t=" + Math.random(), "addcmdy");
    }
    window.shopcarAddItemCallBack = function (obj) {
        var option = window._shopcarOption;
        if (obj.errorId == "0") {
            var html = ((new RegExp("【添加成功】(.*)【添加成功】", "ig")).exec(option.template)) ? RegExp.$1 : "";html = html.replace(/{#count#}/g, obj.itemCount);html = html.replace(/{#uin#}/g, obj.uin);html = html.replace(/{#total#}/g, (obj.priceSum / 100).toFixed(2));
        } else if (obj.errorId == "1") {
            var html = ((new RegExp("【已经存在】(.*)【已经存在】", "ig")).exec(option.template)) ? RegExp.$1 : "";html = html.replace(/{#count#}/g, obj.itemCount);html = html.replace(/{#uin#}/g, obj.uin);html = html.replace(/{#total#}/g, (obj.priceSum / 100).toFixed(2));
        } else if (obj.errorId == "2") {
            if (confirm('您的购物车已满！是否确定将本商品加入购物车？\n点击“确定”后，系统将帮您移除最早加入到购物车的商品。')) {
                doShopcatAction(1);
            } else {
                window._shopcarOption.tipHandle.close();
            }
            return;
        } else {
            var html = ((new RegExp("【其他错误】(.*)【其他错误】", "ig")).exec(option.template)) ? RegExp.$1 : "";html = html.replace(/{#error#}/g, obj.errorMsg);
        }
        var tips = $float({
            title: "提示",
            html: html,
            style: "stand",
            left: option.left,
            top: option.top,
            cover: false
        });
        window._shopcarOption.tipHandle = tips;
        document.getElementById("shopcar_b_watch") ? document.getElementById("shopcar_b_watch").onclick = function () {
            window._shopcarOption.tipHandle.close();
            if (window.parent && option.checkIframe) {
                window.parent.location.href = "http://auction.paipai.com/cgi-bin/shopcart/detail?style=" + window._shopcarOption.style;
            } else {
                location.href = "http://auction.paipai.com/cgi-bin/shopcart/detail?style=" + window._shopcarOption.style;
            }
        } : "";document.getElementById("shopcar_b_goon") ? document.getElementById("shopcar_b_goon").onclick = function () {
            showCloseAnimat();
            window._shopcarOption.tipHandle.close();
        } : "";document.getElementById("shopcar_b_cover") ? document.getElementById("shopcar_b_cover").onclick = function () {
            window._shopcarOption.tipHandle.close();
            doShopcatAction(1);
        } : "";document.getElementById("shopcar_b_cancel") ? document.getElementById("shopcar_b_cancel").onclick = function () {
            showCloseAnimat();
            window._shopcarOption.tipHandle.close();
        } : "";

        function showCloseAnimat() {
            var s = $$("#shopCarHead");
            var f = $$(window._shopcarOption.tipHandle.boxHandel);
            if (s.length > 0) {
                $animateFloat({
                    startY: f.offset().top,
                    startX: f.offset().left,
                    startH: f.height(),
                    startW: f.width(),
                    endY: s.offset().top,
                    endX: s.offset().left,
                    endH: s.height(),
                    endW: s.width(),
                    callBack: function () {
                        return true;
                    }
                });
            }
        }
    };
    return option;
};

function $displayHide(ids){
	$display(ids,'none');
};

function $getUserIcons(opt) {
    //输出用户的认证图标列表
    var option = {
        qq: "", //用户的QQ
        userPro: "", 	//296字节的01字符串,每一个位代表一个属性，当这个不为空的时候，其他的属性串的内容都无效
        auth: "", 	//用户认证串
        property1: "", //用户属性标记
        property2: "", //新属性位的0-31
        property3: "", //新属性位的32-63
        property4: "", //新属性位的64-95
        property5: "", //新属性位的96-127
        property6: "", //新属性位的128-159
        property7: "", //新属性位的160-191
        property8: "", //新属性位的192-223
        property9: "", //新属性位的224-255
        iconTag: "", //图标列表
        iconType: "default", 	//图标的输出样式，default为传统方式，txt为把短文字说明放前面输出的形式
        iconbg: "http://static.paipaiimg.com/assets/common/ppicons.png?t=20091210", //图标大图的地址
        //所有的icon列表，以及对应的取值标记，前面的是用户认证串中的
        //每一项的结构为图标名:[在字符串上对应的位置，标记位0，标记所在的变量1,"输出说明"2,“帮助链接”3,"x坐标"4,"y坐标"5,"高"6,"宽"7,"右边间距"8,"左边距"9,"上边距"10,"下边距"11,"链接目标12","短标题13"]
        icons: {
            "validmobile": [0, 0x1, "auth", "已通过手机认证", "http://help.paipai.com/content/help_10216.shtml?{#ptag#}", "-141", "-23", "20", "15", "3", "0", "0", "0", "_blank"],
            "tenpay": [10, 0x4, "property1", "该商品支持财付通，买家先付款到财付通，收货满意后卖家才拿到钱，安全可靠。 ", "https://www.tenpay.com/zft/qa/qa_1.shtml?{#ptag#}", "-120", "-23", "20", "16", "3", "0", "0", "0", "_blank"],
            "idcard": [1, 0x2, "auth", "该卖家已通过拍拍网个人实名认证，即代表已经过拍拍网严格的身份审核，可让买家购物更安全。", "http://help.paipai.com/content/help_10216.shtml?{#ptag#}", "-35", "-322", "20", "35", "3", "0", "0", "0", "_blank"],
            "athenbank": [3, 0x8, "auth", "该卖家已通过拍拍网个人实名认证，即代表已经过拍拍网严格的身份审核，可让买家购物更安全。", "http://help.paipai.com/content/help_10216.shtml?{#ptag#}", "-35", "-322", "20", "35", "3", "0", "0", "0", "_blank"],
            "patriarch": [16, 0x100, "property1", "该卖家拥有拍拍元勋特权身份，具有丰富经验和良好信誉，是拍拍网元老级卖家。", "http://help.paipai.com/2008/explain/?{#ptag#}#patriarch", "-100", "0", "16", "16", "5", "0", "0", "0", "_blank"],
            "helpangle": [19, 0x800, "property1", "该卖家拥有互助天使特权身份，多次参与帮助教程编写等活动，也积极解答新手买家问题，给买家提供帮助。", "http://help.paipai.com/2008/explain/?{#ptag#}#helpangle", "-122", "0", "16", "16", "5", "0", "0", "0", "_blank"],
            "freegoldmedal": [21, 0x2000, "property1", "该卖家拥有免费金牌特权身份，可完全免费的享有拍拍网的全部服务，在拍拍网有过突出贡献。", "http://help.paipai.com/2008/explain/?{#ptag#}#patriarch", "-145", "-1", "16", "16", "5", "0", "0", "0", "_blank"],
            "qccicon": [24, 0x10000, "property1", "该卖家已通过严格的QQ空间审核和拍拍网个人实名认证，可为买家提供优质的QQ空间个性化虚拟商品。", "http://help.paipai.com/content/help_30120.shtml?{#ptag#}", "-130", "-406", "16", "16", "5", "0", "0", "0", "_blank"],
            "athensafe": [36, 0x10000000, "property1", "该卖家已加入诚信保证计划，所出售的商品均支持先行赔付服务，保证购物更安全。", "http://help.paipai.com/content/help_208.shtml?{#ptag#}", "-100", "-344", "20", "36", "1", "0", "0", "0", "_blank"],
            "bigsage": [36, 0x10000000, "property1", "该卖家已加入诚信保证计划，所出售的商品均支持先行赔付服务，保证购物更安全。", "http://help.paipai.com/content/help_208.shtml?{#ptag#}", "0", "-365", "40", "179", "1", "0", "0", "5", "_blank"], //大的诚信保证图标
            "bigreally": [56, 0x200, "property2", "该卖家已通过诚信保证计划认证，该商品支持“假一赔三”，保证正品。", "http://www.paipai.com/mobile/help/index.shtml?{#ptag#}", "0", "-198", "40", "179", "1", "0", "0", "5", "_blank"],
            "bigwomen": [50, 0x400, "property2", "该商品为精品女装，经过人工严格审核并加入诚信保证计划，如有质量问题可先行赔付给买家，实物拍摄，品质保证。", "http://help.paipai.com/content/help_20119.shtml?{#ptag#}", "0", "-282", "40", "179", "1", "0", "0", "5", "_blank"],
            "shangpin": [50, 0x400, "property2", "该商品为精品女装，经过人工严格审核并加入诚信保证计划，如有质量问题可先行赔付给买家，实物拍摄，品质保证。", "http://help.paipai.com/content/help_20119.shtml?{#ptag#}", "-96", "-178", "17", "16", "1", "0", "0", "0", "_blank"],
            "licence": [55, 0x8000, "property2", "该卖家已通过拍拍网严格的商家营业执照认证，具有合法营业资格，可为买家提供优质的商品和服务。 ", "http://help.paipai.com/content/help_10226.shtml?{#ptag#}", "0", "-322", "20", "36", "1", "0", "0", "0", "_blank"],
            "legend-shop-1": [49, 0x200, "property2", "带有“官”字的商品，由拍拍网入户审核的卖家提供，买假拍拍包赔并享受7天包退换服务。24小时拍拍官方服务热线：0755-83762288-4-2", "http://www.paipai.com/promote/2009/05/guanzi/index.shtml?{#ptag#}", "-90", "-406", "16", "16", "1", "1", "0", "0", "_blank", "拍拍保障"],
            "shangpinhui": [53, 0x400000, "property1", "尚品会", "http://help.paipai.com/content/help_20122.shtml?{#ptag#}", "-151", "-406", "16", "16", "1", "0", "0", "0", "尚品会", "_blank"],
			"qqshop":[60,0x40000,"property2","QQ商城","#1","0","-365","16","94","10","0","0","0","QQ商城","_blank"]

        },
        ptag: "",
        ptagList: {
            "athensafe": "1020.4.5",
            "bigsage": "1020.4.5"
        }
    };
    for (var i in opt) {
        option[i] = opt[i];
    }
    var _return = "";
    ///////////这里处理图标之间的关联逻辑---start///////////////
    //如果是使用了新的01属性串的话就用新的方式处理
    if (option.userPro.length > 0) {
        //同时有身份证认证和银行卡认证的时候，只显示银行卡认证
        if (option.iconTag.indexOf("idcard") >= 0 && option.iconTag.indexOf("athenbank") >= 0) {
            //判断是否有身份证认证
            var hasIdCard = (option.userPro.substr(option.icons["idcard"][0], 1) == "1");
            //判断是否有银行卡认证
            var hasAthenbank = (option.userPro.substr(option.icons["athenbank"][0], 1) == "1");
            if (hasIdCard && hasAthenbank) {
                option.iconTag = option.iconTag.replace("idcard", "").replace(",,", ",");
            }
        }
    } else {//原的属性串处理方法
        //同时有身份证认证和银行卡认证的时候，只显示银行卡认证
        if (option.iconTag.indexOf("idcard") >= 0 && option.iconTag.indexOf("athenbank") >= 0) {
            var hasIdCard = option.icons["idcard"][1] & option[option.icons["idcard"][2]];
            var hasAthenbank = option.icons["athenbank"][1] & option[option.icons["athenbank"][2]];
            if (hasIdCard && hasAthenbank) {
                option.iconTag = option.iconTag.replace("idcard", "").replace(",,", ",");
            }
        }
    }
    ///////////这里处理图标之间的关联逻辑---end///////////////
    var iconList = option.iconTag.split(","), newPtag;
    //循环判断输出每个图标
    for (var i = 0; i < iconList.length; i++) {
        //分别确认每一个项目
        var _it = option.icons[iconList[i]];
        if (_it) {
            var hasThisIcon = false;
            if (option.userPro.length > 0) {
                hasThisIcon = (option.userPro.substr(_it[0], 1) == "1");
            } else {
                hasThisIcon = _it[1] & option[_it[2]];
            }
            newPtag = option.ptag != "" ? option.ptag : (option.ptagList[iconList[i]] ? option.ptagList[iconList[i]] : "");
            _it[4] = _it[4].replace("{#ptag#}", newPtag == "" ? "" : "PTAG=" + newPtag);
            //输出样式：default
            if (option.iconType == "default") {
                _return += ((hasThisIcon) ? '<a href="' + _it[4] + '" target="' + _it[13] + '" tag="' + iconList[i] + '" title="' + _it[3] + '" style="margin:0px;"><span style="display: -moz-inline-stack;display: inline-block;zoom:1;*display: inline;margin-right:' + _it[9] + 'px;margin-left:' + _it[10] + 'px;margin-top:' + _it[11] + 'px;margin-bottom:' + _it[12] + 'px;background:url(' + option.iconbg + ') no-repeat;outline:none;font-size:0px;vertical-align: middle;cursor:pointer;width:' + _it[8] + 'px;height:' + _it[7] + 'px;background-position:' + _it[5] + 'px ' + _it[6] + 'px;" class="' + iconList[i] + '"></span></a>' : "");
            }
            //输出样式：txt
            if (option.iconType == "txt") {
                _return += ((hasThisIcon) ? '<a href="' + _it[4] + '" target="' + _it[13] + '" tag="' + iconList[i] + '" title="' + _it[3] + '" style="margin:0px;">' + _it[14] + '<span style="display: -moz-inline-stack;display: inline-block;zoom:1;*display: inline;margin-right:' + _it[9] + 'px;margin-left:' + _it[10] + 'px;margin-top:' + _it[11] + 'px;margin-bottom:' + _it[12] + 'px;background:url(' + option.iconbg + ') no-repeat;outline:none;font-size:0px;vertical-align: middle;cursor:pointer;width:' + _it[8] + 'px;height:' + _it[7] + 'px;background-position:' + _it[5] + 'px ' + _it[6] + 'px;" class="' + iconList[i] + '" ></span></a>' : "");

            }
        }
    }
    return _return;
}

function $getCommIcons(opt) {
//输出商品的图标代码
var option = {
property: "", //商品属性串
iconTag: "", //图标列表
iconbg: "http://static.paipaiimg.com/assets/common/ppicons.png?t=20091210", //图标大图的地址
text: false, //是否在图标后面跟文字
//所有的icon列表，以及对应的取值标记，前面的是用户认证串中的
ptag: "",
ptagList: {
"reallyicon": "30072.4.8",
"sevenship": "30072.4.6",
"repayship":"30072.4.5",
"rapidship": "30072.4.7",
"chengbao": "1020.4.5"
},
//每一项的结构为图标名:[标记位，标记所在的变量,"输出说明",“帮助链接”3,"x坐标"4,"y坐标"5,"高"6,"宽"7,"右边间距"8,"左边距"9,"上边距"10,"下边距"11,"图标后面的文字，可选"12,"链接目标13"]
icons: {
"redicon": [0x4, "property", "该商品支持红包折价交易，只需使用一定面值的红包，即可按照红包优惠价购买。", "http://www.paipai.com/hongbao/help.shtml?{#ptag#}#1", "-110", "-406", "16", "16", "5", "0", "0", "0", "红包商品", "_blank"],
"othership": [0x8, "property", "该商品支持货到付款，请自行与卖家沟通。", "http://help.paipai.com/content/help_20318.shtml?{#ptag#}", "-80", "-50", "22", "18", "5", "0", "0", "0", "货到付款", "_blank"],
"qccicon": [0x100, "property", "该卖家已通过严格的QQ空间审核和拍拍网个人实名认证，可为买家提供优质的QQ空间个性化虚拟商品。", "http://help.paipai.com/content/help_30120.shtml?{#ptag#}", "-130", "-406", "16", "16", "5", "0", "0", "0", "", "_blank"],
"autoship": [0x200, "property", "该商品支持自动发货交易，付款后立即拿到卡号密码，安全又便捷。", "http://bbs1.paipai.com/g40048c0i4303s0p0.html?{#ptag#}", "-86", "-72", "22", "25", "5", "0", "0", "0", "自动发货", "_blank"],
"autosmallcard": [0x8000, "property", "该商品支持自动发货交易，付款后立即拿到卡号密码，安全又便捷。", "http://bbs1.paipai.com/g40048c0i4303s0p0.html?{#ptag#}", "-54", "-72", "22", "25", "5", "0", "0", "0", "自动发货", "_blank"],
"reallyicon": [0x2000000, "property", "已加入诚信保证计划，卖家承诺在买家收货后14天内如发现该商品不是正品，将会假一赔三给买家。", "http://www.paipai.com/trust/chengbao.shtml?tab=4&{#ptag#}#1", "-40", "-345", "16", "16", "5", "0", "0", "0", "正品 假一赔三", "_blank"],
"sevenship": [0x80000, "property", "已加入诚信保证计划，卖家承诺在买家收货后7天内可无理由退换货。", "http://www.paipai.com/trust/chengbao.shtml?tab=2&{#ptag#}#1", "-20", "-345", "16", "16", "5", "0", "0", "0", "7天包退", "_blank"],
"repayship": [0x40000, "property", "已加入诚信保证计划，卖家承诺在买家收货后14天内如该商品有质量问题，将会由拍拍网先行赔付给买家。", "http://www.paipai.com/trust/chengbao.shtml?{#ptag#}#1", "0", "-345", "16", "16", "5", "0", "0", "0", "先行赔付", "_blank"],
"vedioshow": [0x100000, "property", "商品含有视频", "#commodityvediolink", "-114", "-72", "22", "19", "5", "0", "0", "0", "视频商品", ""],
"rapidship": [0x800000, "property", "已加入诚信保证计划，卖家承诺如未在规定时间内代充到买家指定账户，将会赔付给买家。", "http://www.paipai.com/trust/chengbao.shtml?tab=3&{#ptag#}#1", "-60", "-345", "16", "16", "5", "0", "0", "0", "诚保代充", "_blank"],
"shangpin": [0x200000, "property", "该商品为精品女装，经过人工严格审核并加入诚信保证计划，如有质量问题可先行赔付给买家，实物拍摄，品质保证。", "http://help.paipai.com/content/help_20119.shtml?{#ptag#}", "-96", "-178", "16", "16", "10", "0", "0", "0", "女装裳品", "_blank"],
"chengbao": [0x1, "property", "已加入诚信保证计划", "http://help.paipai.com/content/help_208.shtml?{#ptag#}", "-80", "-345", "16", "16", "10", "0", "0", "0", "先行赔付", "_blank"], "caifutong": [0x1, "property", "财付通", "#1", "-122", "-25", "16", "13", "10", "0", "0", "0", "财付通", ""],
"tejia": [0x04000000, "property", "特价", "#1", "-110", "-425", "16", "16", "0", "0", "0", "0", "特价", ""],
"promotion": [0x1, "property", "带“满”字商品都为促销优惠商品。", "#1", "-130", "-425", "16", "16", "0", "0", "0", "0", "满立减，满立送", ""]
}
};
for (var i in opt) {
option[i] = opt[i];
}
var iconList = option.iconTag.split(","), newPtag;
var _return = "";
for (var i = 0; i < iconList.length; i++) {
//分别确认每一个项目
var _it = option.icons[iconList[i]];
newPtag = option.ptag != "" ? option.ptag : (option.ptagList[iconList[i]] ? option.ptagList[iconList[i]] : "");
_it[3] = _it[3].replace("{#ptag#}", newPtag == "" ? "" : "PTAG=" + newPtag);
if (_it) {
_return += (_it[0] & option[_it[1]]) ? '<a href="' + _it[3] + '" target="' + _it[13] + '" title="' + _it[2] + '" tag="' + iconList[i] + '" style="margin:0;' + ((option.text) ? 'margin-right:' + _it[8] + 'px;' : '') + '"><span class="' + iconList[i] + '" style="display: -moz-inline-stack;display: inline-block;zoom:1;*display: inline;margin-right:' + _it[8] + 'px;margin-left:' + _it[9] + 'px;margin-top:' + _it[10] + 'px;margin-bottom:' + _it[11] + 'px;background:url(' + option.iconbg + ') no-repeat;outline:none;font-size:0px;vertical-align: middle;cursor:pointer;width:' + _it[7] + 'px;height:' + _it[6] + 'px;background-position:' + _it[4] + 'px ' + _it[5] + 'px;"></span>' + ((option.text) ? _it[12] : '') + '</a>' : "";
}
}
return _return;
}

function $delCookie(name){
//删除cookie
	var exp = new Date(); 
	exp.setTime(exp.getTime() - 1);
	var cval=$getCookie(name);
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
};

function $getGradeIcons(opt) {
    //输出用户等级的图标
    var option = {
        qq: "",
        score: 0,
        type: "seller", //seller,buyer,frefer
        nolink: false,
		url:'',
        showScore: true,
        iconbg: "http://static.paipaiimg.com/assets/common/credit.gif?t=200908131", //图标大图的地址
        ptag:"",
        seller: {
            range: [1, 5, 11, 21, 41, 101, 301, 1001, 3001, 5001, 10001, 20001, 50001, 100001, 200001, 500001, 1000001, 2000001, 5000001, 10000001, 1900000000, 1901000000, 1902000000],
            url: "http://shop1.paipai.com/cgi-bin/credit_info?uin={#qq#}&{#ptag#}",
            //每一项的结构为图标名:["输出说明"0,"x坐标"1,"y坐标"2,"高"3,"宽"4,"右边间距"5,"左边距"6,"上边距"7,"下边距"8,"链接目标9"]
            g0: ["(0个信用积分)", "100", "100", "0", "0", "5", "0", "0", "0", "_blank"],
            g1: ["一星卖家(1-4个信用积分)", "0", "0", "16", "13", "0", "0", "0", "0", "_blank"],
            g2: ["二星卖家(5-10个信用积分)", "0", "0", "16", "28", "0", "0", "0", "0", "_blank"],
            g3: ["三星卖家(11-20个信用积分)", "0", "0", "16", "43", "0", "0", "0", "0", "_blank"],
            g4: ["四星卖家(21-40个信用积分)", "0", "0", "16", "58", "0", "0", "0", "0", "_blank"],
            g5: ["五星卖家(41-100个信用积分)", "0", "0", "16", "73", "0", "0", "0", "0", "_blank"],
            g6: ["一钻卖家(101-300个信用积分)", "0", "-20", "16", "18", "0", "0", "0", "0", "_blank"],
            g7: ["二钻卖家(301-1000个信用积分)", "0", "-20", "16", "36", "0", "0", "0", "0", "_blank"],
            g8: ["三钻卖家(1001-3000个信用积分)", "0", "-20", "16", "54", "0", "0", "0", "0", "_blank"],
            g9: ["四钻卖家(3001-5000个信用积分)", "0", "-20", "16", "72", "0", "0", "0", "0", "_blank"],
            g10: ["五钻卖家(5001-10000个信用积分)", "0", "-20", "16", "90", "0", "0", "0", "0", "_blank"],
            g11: ["一银冠卖家(10001-20000个信用积分)", "0", "-40", "16", "18", "0", "0", "0", "0", "_blank"],
            g12: ["二银冠卖家(20001-50000个信用积分)", "0", "-40", "16", "36", "0", "0", "0", "0", "_blank"],
            g13: ["三银冠卖家(50001-100000个信用积分)", "0", "-40", "16", "54", "0", "0", "0", "0", "_blank"],
            g14: ["四银冠卖家(100001-200000个信用积分)", "0", "-40", "16", "72", "0", "0", "0", "0", "_blank"],
            g15: ["五银冠卖家(200001-500000个信用积分)", "0", "-40", "16", "90", "0", "0", "0", "0", "_blank"],
            g16: ["一金冠卖家(500001-1000000个信用积分)", "0", "-60", "16", "18", "0", "0", "0", "0", "_blank"],
            g17: ["二金冠卖家(1000001-2000000个信用积分)", "0", "-60", "16", "36", "0", "0", "0", "0", "_blank"],
            g18: ["三金冠卖家(2000001-5000000个信用积分)", "0", "-60", "16", "54", "0", "0", "0", "0", "_blank"],
            g19: ["四金冠卖家(5000001-10000000个信用积分)", "0", "-60", "16", "72", "0", "0", "0", "0", "_blank"],
            g20: ["五金冠卖家(10000000分以上)", "0", "-60", "16", "90", "0", "0", "0", "0", "_blank"],
            g21: ["该卖家已拥有拍拍网官方信用保证，所开店铺为拍拍网QQ帐号5188开头、官方活动专用店铺，有信誉保证。", "0", "-240", "19", "77", "0", "0", "0", "0", "_blank"],
            g22: ["该卖家所开设的店铺为公益慈善机构专营店，该店铺销售收入均用于公益慈善事业。", "0", "-260", "19", "83", "0", "0", "0", "0", "_blank"],
            g23: ["该卖家已通过商家营业执照认证，即代表该卖家所开设的店铺为拍拍网合作企业店铺，店内销售的商品均由企业提供质量信誉保证。", "0", "-280", "19", "72", "0", "0", "0", "0", "_blank"]
        },
        buyer: {
            range: [1, 5, 11, 21, 41, 101, 201, 501, 1001, 2001, 5001, 10001, 30001, 50001, 80001, 100001, 150001, 200001, 250001, 300001],
            url: "http://shop1.paipai.com/cgi-bin/credit_info?uin={#qq#}&{#ptag#}",
            g0: ["(0个信用积分)", "100", "100", "0", "0", "0", "0", "0", "0", "_blank"],
            g1: ["一星买家(1-4个信用积分)", "0", "-80", "16", "13", "0", "0", "0", "0", "_blank"],
            g2: ["二星买家(5-10个信用积分)", "0", "-80", "16", "28", "0", "0", "0", "0", "_blank"],
            g3: ["三星买家(11-20个信用积分)", "0", "-80", "16", "43", "0", "0", "0", "0", "_blank"],
            g4: ["四星买家(21-40个信用积分)", "0", "-80", "16", "58", "0", "0", "0", "0", "_blank"],
            g5: ["五星买家(41-100个信用积分)", "0", "-80", "16", "73", "0", "0", "0", "0", "_blank"],
            g6: ["一钻买家(101-200个信用积分)", "0", "-100", "16", "18", "0", "0", "0", "0", "_blank"],
            g7: ["二钻买家(201-500个信用积分)", "0", "-100", "16", "36", "0", "0", "0", "0", "_blank"],
            g8: ["三钻买家(501-1000个信用积分)", "0", "-100", "16", "54", "0", "0", "0", "0", "_blank"],
            g9: ["四钻买家(1001-2000个信用积分)", "0", "-100", "16", "72", "0", "0", "0", "0", "_blank"],
            g10: ["五钻买家(2001-5000个信用积分)", "0", "-100", "16", "90", "0", "0", "0", "0", "_blank"],
            g11: ["一银冠买家(5001-10000个信用积分)", "0", "-120", "16", "18", "0", "0", "0", "0", "_blank"],
            g12: ["二银冠买家(10001-30000个信用积分)", "0", "-120", "16", "36", "0", "0", "0", "0", "_blank"],
            g13: ["三银冠买家(30001-50000个信用积分)", "0", "-120", "16", "54", "0", "0", "0", "0", "_blank"],
            g14: ["四银冠买家(50001-80000个信用积分)", "0", "-120", "16", "72", "0", "0", "0", "0", "_blank"],
            g15: ["五银冠买家(80001-100000个信用积分)", "0", "-120", "16", "90", "0", "0", "0", "0", "_blank"],
            g16: ["一金冠买家(100001-150000个信用积分)", "0", "-140", "16", "18", "0", "0", "0", "0", "_blank"],
            g17: ["二金冠买家(150001-200000个信用积分)", "0", "-140", "16", "36", "0", "0", "0", "0", "_blank"],
            g18: ["三金冠买家(200001-250000个信用积分)", "0", "-140", "16", "54", "0", "0", "0", "0", "_blank"],
            g19: ["四金冠买家(250001-3000000个信用积分)", "0", "-140", "16", "72", "0", "0", "0", "0", "_blank"],
            g20: ["五金冠买家(3000000分以上)", "0", "-140", "16", "90", "0", "0", "0", "0", "_blank"]
        },
        frefer: {
            range: [4, 11, 41, 91, 151, 251, 501, 1001, 2001, 5001, 10001, 20001, 50001, 100001, 200001, 500001, 1000001, 2000001, 5000001, 10000001],
            url: "http://help.paipai.com/content/help_50211.shtml?{#ptag#}",
            g0: ["分", "100", "100", "0", "0", "0", "0", "0", "0", "_blank"],
            g1: ["分", "0", "-160", "18", "18", "0", "0", "0", "0", "_blank"],
            g2: ["分", "0", "-160", "18", "36", "0", "0", "0", "0", "_blank"],
            g3: ["分", "0", "-160", "18", "54", "0", "0", "0", "0", "_blank"],
            g4: ["分", "0", "-160", "18", "72", "0", "0", "0", "0", "_blank"],
            g5: ["分", "0", "-160", "18", "90", "0", "0", "0", "0", "_blank"],
            g6: ["分", "0", "-180", "18", "18", "0", "0", "0", "0", "_blank"],
            g7: ["分", "0", "-180", "18", "36", "0", "0", "0", "0", "_blank"],
            g8: ["分", "0", "-180", "18", "54", "0", "0", "0", "0", "_blank"],
            g9: ["分", "0", "-180", "18", "72", "0", "0", "0", "0", "_blank"],
            g10: ["分", "0", "-180", "18", "90", "0", "0", "0", "0", "_blank"],
            g11: ["分", "0", "-200", "18", "18", "0", "0", "0", "0", "_blank"],
            g12: ["分", "0", "-200", "18", "36", "0", "0", "0", "0", "_blank"],
            g13: ["分", "0", "-200", "18", "54", "0", "0", "0", "0", "_blank"],
            g14: ["分", "0", "-200", "18", "72", "0", "0", "0", "0", "_blank"],
            g15: ["分", "0", "-200", "18", "90", "0", "0", "0", "0", "_blank"],
            g16: ["分", "0", "-220", "18", "18", "0", "0", "0", "0", "_blank"],
            g17: ["分", "0", "-220", "18", "36", "0", "0", "0", "0", "_blank"],
            g18: ["分", "0", "-220", "18", "54", "0", "0", "0", "0", "_blank"],
            g19: ["分", "0", "-220", "18", "72", "0", "0", "0", "0", "_blank"],
            g20: ["分", "0", "-220", "18", "90", "0", "0", "0", "0", "_blank"]
        }
    };
    for (var i in opt) {
        option[i] = opt[i];
    }
    if (option.qq == 0 || option.qq == "") {
        option.nolink = true;
    }
    //如果用户类型不对也什么不做  ,如果积分为空则什么也不做
    if (option.score.toString() == "" || !option[option.type]) {
        return "";
    }
    //参考信用的地方可能会出现字符串的情况
    if (option.type == "frefer" && option.score != "" && !parseInt(option.score)) {	//不为空并且不是数字的话就原样返回
        option.score = option.score.replace(/[^\d]/g, "");
        if (option.score == "") {
            return option.score;
        }
    }
    var _grade = 0;
    var _return = "";
    var _range = option[option.type].range;
    for (var i = 0; i < _range.length; i++) {
        //溢出最大范围时等级为最大
        if (option.score >= _range[_range.length - 1]) {
            _grade = _range.length;
            break;
        }
        //范围内的等级处理
        if (option.score >= _range[i] && option.score < _range[i + 1]) {

            _grade = i + 1;
            break;
        }
    }
	//替换调整url
	if(option.url!=''){
		option[option.type]['url']=option.url;
	}
    var _url = option.nolink ? "#nolink" : option[option.type]["url"].replace("{#qq#}", option.qq).replace("{#ptag#}", (option["ptag"] == "" ? "" : ("PTAG=" + option["ptag"])));
    var _target = option.nolink ? "" : ' target="_blank" ';
    var _conf = option[option.type]["g" + _grade.toString()];
    var _title = _conf[0].replace("", option.score);
    //积分为负分的情况
    if (option.score < 0) {
        _return = option.nolink ? ('<a ' + _target + ' href="#nolink">' + option.score + '</a> ') : ('<a ' + _target + ' href="' + _url + '">' + option.score + '</a> ');
        return _return;
    }
    if (_grade == 0) {
        _return = '<a href="' + _url + '" ' + _target + ' title="' + _title + '" style="margin:0px;"><span style="display: -moz-inline-stack;display: inline-block;zoom:1;*display: inline;margin-right:' + _conf[5] + 'px;margin-left:' + _conf[6] + 'px;margin-top:' + _conf[7] + 'px;margin-bottom:' + _conf[8] + 'px;background:url(' + option.iconbg + ') no-repeat;outline:none;vertical-align: middle;font-size:12px;cursor:pointer;background-position:' + _conf[1] + 'px ' + _conf[2] + 'px;">0</span></a>';
        return _return;
    }
    _return = '<a href="' + _url + '" ' + _target + ' title="' + _title + '" style="margin:0px;"><span style="display: -moz-inline-stack;display:inline-block;zoom:1;*display: inline;margin-right:' + _conf[5] + 'px;margin-left:' + _conf[6] + 'px;margin-top:' + _conf[7] + 'px;margin-bottom:' + _conf[8] + 'px;background:url(' + option.iconbg + ') no-repeat;outline:none;vertical-align: middle;font-size:0px;cursor:pointer;width:' + _conf[4] + 'px;height:' + _conf[3] + 'px;background-position:' + _conf[1] + 'px ' + _conf[2] + 'px;"></span></a>';
    //超级卖家以下的显示具体分数
    if (option.type == "seller" && option.score < 1900000000 && option.showScore) {
        _return = option.nolink ? ('<a ' + _target + ' href="#nolink">' + option.score + '</a> ' + _return) : ('<a ' + _target + ' href="' + _url + '">' + option.score + '</a> ' + _return);
    }
    //超级买家以下的显示具体分数
    if (option.type == "buyer" && option.showScore) {
        _return = option.nolink ? ('<a ' + _target + ' href="#nolink">' + option.score + '</a> ' + _return) : ('<a ' + _target + ' href="' + _url + '">' + option.score + '</a> ' + _return);
    }
    return _return;
}

function $showTip(opt){
	//显示黄色浮动提示条
	var option={
		title:'',
		content:'',
		height:200,
		width:50,
		left:'0',
		top:'0',
		type:'0'
	};
	for(var i in opt){option[i]=opt[i];}
	(!window._tipsHandle)?window._tipsHandle={}:"";
	window._tipsHandle.option=option;
	if(!window._tipsHandle.dom){
		var c=document.createElement("div");
		c.style.display="";
		c.style.opacity=1;
		c.style.position="absolute";
		c.style.left=0;
		c.style.top=0;
		c.className="hover_tips";
		c.style.zIndex=20;
		c.id="hoverTips";
//(option.type=="0")?"hover_tips_ztb":"hover_tips_zt"
		c.innerHTML='<span class="'+((option.type=="0")?"hover_tips_ztb":"hover_tips_zt")+'" id="hover_tips_ztb" style="left:25px"></span><div class="hover_tips_cont"><strong id="hoverTips_title"></strong><div id="hoverTips_content" style="display:block;overflow:hidden;"></div></div>';
		

		
		document.body.appendChild(c);
		window._tipsHandle.dom=document.getElementById("hoverTips");
		window._tipsHandle.ztb=document.getElementById("hover_tips_ztb");
		window._tipsHandle.content=document.getElementById("hoverTips_content");
		window._tipsHandle.title=document.getElementById("hoverTips_title");
		window._tipsHandle.dom.onmouseover=function(){
			if(window._tipsHandle.timer){
				window.clearInterval(window._tipsHandle.timer);
			}
			window._tipsHandle.dom.style.opacity=1;
			window._tipsHandle.dom.style.display="";
		};
		window._tipsHandle.dom.onmouseout=function(){
			window._tipsHandle.option.close();
		};
	}
	var _t=window._tipsHandle;
	_t.title.innerHTML=option.title;
	_t.content.innerHTML=option.content;
	option.height==0?"":_t.content.style.height=option.height+"px";
	_t.content.style.width=option.width+"px";
	_t.dom.style.display="";
	_t.dom.style.opacity=1;
	_t.dom.style.left=(_t.option.left)+"px";
	_t.dom.style.top=(_t.option.top)+"px";
	_t.ztb.style.left="25px";
	//防止溢出
	var p=[parseInt(option.left),parseInt(option.top)];
	//超出右侧
	leftOut=(parseInt(option.left)+_t.dom.scrollWidth-$getPageScrollWidth()-$getWindowWidth())
	if(leftOut>0){
		_t.dom.style.left=(parseInt(option.left)-leftOut)+"px";
		_t.ztb.style.left=(25+leftOut)+"px";
	}
	option.close=function(){
			if(window._tipsHandle.timer){
				window.clearInterval(window._tipsHandle.timer);
			}
			window._tipsHandle.timer=setInterval(function(){
			if(window._tipsHandle.dom.style.opacity>0){
				window._tipsHandle.dom.style.opacity=(window._tipsHandle.dom.style.opacity-0.1);
			}else{
				window.clearInterval(window._tipsHandle.timer);
				window._tipsHandle.dom.style.opacity=0;
				window._tipsHandle.dom.style.display="none";
			}
		},30);
	};
	return option;
}

function $onReady(fn) { 
	//document的ready事件
	var d = document;
	var done = false, 
	init = function () { 
		if (!done){
			done = true; 
			fn(); 
		} 
	};
	(function () { 
		try { 
			d.documentElement.doScroll('left'); 
		} catch (e) { 
			setTimeout(arguments.callee, 50); 
			return; 
		} 
		init(); 
	})(); 
	d.onreadystatechange = function() { 

		if (d.readyState == 4) { 
			d.onreadystatechange = null; 
			init(); 
		} 
	}; 
};

function $getScrollPosition(){
	//获取滚动条的位置
	var pos=[];
	if(typeof window.pageXOffset!="undefined"){
		pos=[window.pageXOffset,window.pageYOffset];
	}else if(document.body&&typeof document.body!="undefined"){
		pos=[document.body.scrollLeft,document.body.scrollTop];
	}else{
		pos=[document.documentElement.scrollLeft,document.documentElement.scrollTop];
	}
	return pos;
};

function $getMousePosition(e){
	//获取鼠标的位置
	var e=window.event?window.event:e.evt;
	var pos=[];
	if(typeof e.pageX!="undefined"){
		pos=[e.pageX,e.pageY];
	}else if(typeof e.clientX!="undefined"){
		pos=[e.clientX+$getScrollPosition()[0],e.clientY+$getScrollPosition()[1]];
	}
	return pos;
}

function $initDragItem(obj){
//控制组件拖动方法
	var option={
		barDom:"",	//拖动区域的dom对象
		targetDom:""	//被拖动区域的dom对象
	};
	for(var i in obj){
		option[i]=obj[i];
	}
	window._dragOption?"":window._dragOption={};
	//设置状态
	option.barDom.style.cursor='move';
	option.targetDom.style.position="absolute";
	option.barDom.onmousedown=function(e){
		var e=window.event?window.event:e;
		window._dragOption.barDom=this;
		window._dragOption.targetDom=option.targetDom;
		var currPostion=[parseInt(option.targetDom.style.left)?parseInt(option.targetDom.style.left):0,parseInt(option.targetDom.style.top)?parseInt(option.targetDom.style.top):0];
		window._dragOption.diffPostion=[$getMousePosition({evt:e})[0]-currPostion[0],$getMousePosition({evt:e})[1]-currPostion[1]];
		document.onselectstart=function(){return false};
		window.onblur=window.onfocus=function(){document.onmouseup()}; 
		return false;
	};
	option.targetDom.onmouseup=document.onmouseup=function(){ 
		if(window._dragOption.barDom){ 
			window._dragOption={};
			document.onselectstart=window.onblur=window.onfocus=null; 
		}
	};
	option.targetDom.onmousemove=document.onmousemove=function(e){
		try{
		var e=window.event?window.event:e;
		if(window._dragOption.barDom && window._dragOption.targetDom){ 
			window._dragOption.targetDom.style.left=($getMousePosition({evt:e})[0]-window._dragOption.diffPostion[0])+"px"; 
			window._dragOption.targetDom.style.top=($getMousePosition({evt:e})[1]-window._dragOption.diffPostion[1])+"px";
		} 
		}catch(e){}
	};
}

function $regionInit(obj){
//初始化并展示省市区选择框
	var option={
		id:Math.floor(Math.random()*1000),	//随机标记
		div:"",	//显示的div区域
		regionId:"",	//地区id
		currId:["","","","","","",false,""],	//当前选中的结果[省id，省名称，市id，市名称，地区id，地区名称，是否有效结果，最低一级的id]
		onChange:function(obj){return true;}
	};
	if(!window._regionZindex){
		window._regionZindex=100;
	}else{
		window._regionZindex-=1;
	}
	var regionMap=$getRegionMap();
	for(var i in obj){
		option[i]=obj[i];
	}
	if(option.div==""){
		return;
	}else{
		document.getElementById(option.div).innerHTML='<div class="area" style="z-index:'+_regionZindex+';"><span class="province" id="provinceName_'+option.id+'" >- 选择省 -</span><div class="provincelist" id="provinceList_'+option.id+'" style="display:none;z-index:10000"><iframe class="maskiframe" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe><a href="#pl">北京</a> <a href="#pl">天津</a> <a href="#pl">上海</a> <a href="#pl">重庆</a><br /><a href="#pl">广东</a> <a href="#pl">广西</a> <a href="#pl">海南</a> <a href="#pl">山东</a> <a href="#pl">江苏</a> <a href="#pl">安徽</a> <a href="#pl">浙江</a><br /><a href="#pl">福建</a> <a href="#pl">湖北</a> <a href="#pl">湖南</a> <a href="#pl">河南</a> <a href="#pl">江西</a> <a href="#pl">吉林</a> <a href="#pl">黑龙江</a><br /><a href="#pl">辽宁</a> <a href="#pl">四川</a> <a href="#pl">云南</a> <a href="#pl">贵州</a> <a href="#pl">西藏</a> <a href="#pl">陕西</a> <a href="#pl">青海</a><br /><a href="#pl">甘肃</a> <a href="#pl">宁夏</a> <a href="#pl">新疆</a> <a href="#pl">河北</a> <a href="#pl">山西</a> <a href="#pl">内蒙古</a><br /><a href="#pl">香港</a> <a href="#pl">澳门</a> <a href="#pl">台湾</a> <a href="#pl">海外</a></div><select name="cityId" id="cityId_'+option.id+'" style="width:90px;"><option style="color:#666" value="">- 选择市 -</option></select> <select name="areaId" id="areaId_'+option.id+'" style="width:90px;"><option style="color:#666" value="">- 选择区 -</option></select><input type="hidden" name="provinceId" id="provinceId_'+option.id+'" /></div>';
	}
	option.regionPath=$regionGetPath(option.regionId);
	var plist=document.getElementById("provinceList_"+option.id);
	//绑定省列表的浮出事件,并阻止点击操作的冒泡
	$addEvent(document.getElementById("provinceName_"+option.id),"click",function(event){
		try{
			plist.style.display=(plist.style.display=="none")?"":"none";
			event = (event)?event:window.event;
			event.cancelBubble=true;
		}catch(e){}
	}); 
	//鼠标在别出点击的时候关掉省列表
	$addEvent(document,"click",function(event){
		event = (event)?event:window.event;
		try{
			document.getElementById("provinceList_"+option.id).style.display="none";
		}catch(e){}
	});
	//地址选框范围内点击不冒泡
	$addEvent(document.getElementById("provinceList_"+option.id),"click",function(event){
		try{
			event = (event)?event:window.event;
			event.cancelBubble=true;
		}catch(e){}
	});
	//市列表的onchange事件
	$addEvent(document.getElementById("cityId_"+option.id),"change",function(event){
		try{
			var _this=event.srcElement||event.target;
			_this.onCityChange();
		}catch(e){}
	});
	//区列表的onchange事件
	$addEvent(document.getElementById("areaId_"+option.id),"change",function(event){
		var _this=event.srcElement||event.target;
		_this.onAreaChange();
	});
	//绑定链接的选择省的事件
	var alist=plist.getElementsByTagName("a");
	for(var i=0;i<alist.length;i++){
		$addEvent(alist[i],"click",function(event){
			var _this=event.srcElement||event.target;
			var _pname=_this.innerHTML;
			document.getElementById("provinceId_"+option.id).onProvinceChange($regionGetIdByProvinceName(_pname));
			document.getElementById("provinceList_"+option.id).style.display="none";
		});
	};
	//省id变更的事件，当省id触发的时候就开始进行市列表的填充
	document.getElementById("provinceId_"+option.id).onProvinceChange=function(pid){
		document.getElementById("provinceName_"+option.id).innerHTML=regionMap[pid][0];
		document.getElementById("provinceId_"+option.id).value=pid;
		var clist=regionMap[this.value][2];
		var cdom=document.getElementById("cityId_"+option.id);

		cdom.options.length=1;
		document.getElementById("areaId_"+option.id).options.length=1;
		document.getElementById("areaId_"+option.id).selectedIndex=0;
		for(var i in clist){
			cdom.options[cdom.options.length]=new Option(clist[i][0],i);
		}
		//抽查当前省的市是否有下级地区,只要有一个市有下级
		var hasAera=false;
		for(var i in regionMap[pid][2]){
			if(regionMap[pid][2][i].length>=3){
				hasAera=true;
			}
		}
		document.getElementById("areaId_"+option.id).style.display=hasAera?"":"none";
		getRegionEnd();
	};
	//市选择的变更事件，当市变更时间触发的时候就开始进行地区的填充
	document.getElementById("cityId_"+option.id).onCityChange=function(){
		if(document.getElementById("provinceName_"+option.id).innerHTML!=option.currId[1]){
			document.getElementById("provinceName_"+option.id).innerHTML=option.currId[1];
			document.getElementById("provinceId_"+option.id).value=option.currId[0];
		}
		var cdom=document.getElementById("areaId_"+option.id);
		cdom.options.length=1;
		if(document.getElementById("cityId_"+option.id).value!=""){
			var clist=regionMap[document.getElementById("provinceId_"+option.id).value][2][this.value][2];
			document.getElementById("areaId_"+option.id).style.display=(regionMap[document.getElementById("provinceId_"+option.id).value][2][this.value].length<3)?"none":"";
		}else{
			var clist={};
			document.getElementById("areaId_"+option.id).style.display="";
		}
		for(var i in clist){
			cdom.options[cdom.options.length]=new Option(clist[i][0],i);
		}
		getRegionEnd();
	};
	//地区选择的变更事件
	document.getElementById("areaId_"+option.id).onAreaChange=function(){
		if(document.getElementById("provinceName_"+option.id).innerHTML!=option.currId[1]){
			document.getElementById("provinceName_"+option.id).innerHTML=option.currId[1];
			document.getElementById("provinceId_"+option.id).value=option.currId[0];
		}
		getRegionEnd();
	};
	//如果表单有默认值，则自动给他选中
	if(option.regionPath[6] ){
		if(option.regionPath[0]!="" && option.regionPath[1]!=""){
			document.getElementById("provinceId_"+option.id).onProvinceChange(option.regionPath[0]);
		}
		if(option.regionPath[2]!="" && option.regionPath[3]!=""){
			document.getElementById("cityId_"+option.id).value=option.regionPath[2];
			document.getElementById("cityId_"+option.id).onCityChange();
		}
		if(option.regionPath[4]!="" && option.regionPath[5]!=""){
			document.getElementById("areaId_"+option.id).value=option.regionPath[4];
			document.getElementById("areaId_"+option.id).onAreaChange();
		}
	};
	//获取返回结果
	function getRegionEnd(){
		//省的数据
		option.currId=[document.getElementById("provinceId_"+option.id).value,document.getElementById("provinceName_"+option.id).innerHTML,"","","","",false,document.getElementById("provinceName_"+option.id).innerHTML];
		document.getElementById("provinceId_"+option.id).value=document.getElementById("provinceId_"+option.id).value;
		document.getElementById("provinceName_"+option.id).innerHTML=document.getElementById("provinceName_"+option.id).innerHTML;
		//市的数据
		var cityDom=document.getElementById("cityId_"+option.id);
		if(cityDom.value!=""){
			option.currId=[parseInt(option.currId[0]),option.currId[1],parseInt(cityDom.value),cityDom.options[cityDom.selectedIndex].text,"","",false,parseInt(cityDom.value)];
			//如果当前市没有地区信息，则返回有效地址：
			if(option.currId[2]){
				if(regionMap[option.currId[0]][2][option.currId[2]].length<3){
					option.currId[6]=true;
				}
			}
			//地区的信息
			var areaDom=document.getElementById("areaId_"+option.id);
			if(parseInt(areaDom.value)){
				option.currId=[option.currId[0],option.currId[1],option.currId[2],option.currId[3],parseInt(areaDom.value),areaDom.options[areaDom.selectedIndex].text,true,parseInt(areaDom.value)];
			}
		}
		option.onChange(option);
		return option.currId;
	};
	//返回对象
	return option;
};

function $loginFrame(obj){
	try {document.domain = "paipai.com";}catch (e){};
	$loadCss("http://static.paipaiimg.com/module/module_box.css");
	
	var option = {
		'float': true, //浮动模式，是否浮窗登录，【true/false】
		model: true, //是否模态登录，如果float为false的时候强制为模态，模态登录显示覆盖背景，不显示关闭窗口
		drag: true, //是否可以拖动，如果float为false时强制为false
		type: "self", //登录后的操作类型：parent/top/self/blank/func 默认top
		action: "", //登录后的转向地址或者执行的函数
		check: true, //是否需要检测用户登录状态?
		title: "腾讯拍拍网-请您登录后继续刚才的操作", //自定义标题
		close: true, //模态登录框和非浮动登录框的时候为false
		domId: "",//非浮窗显示时，输出登录框的div的 id
		quick: true, //是否使用快速登陆
		defaultId:"",//指定默认的登陆号码
		noChangeQQ:false,//登陆QQ号不可修改，跟默认登陆号码配合使用
		hideXieyi:false,//不显示协议相关内容
		checkReady: true, //检查页面加载ready后再显示,如果未加载完成的话就直接跳去登陆页面
		hostingId: "",//用于hosting项目登录
		x:0,//浮窗显示的时候x坐标
		y:0,//浮窗显示的时候y坐标
		onLogin: function(obj){
			//登录前的操作
			return true;
		},
		onReset: function(obj){
			//重置前的操作
			return true;
		},
		onClose: function(obj){
			//关闭窗口时的操作
			return true;
		},
		onResize: function(w, h, obj){
			//尺寸调整时的操作
			return true;
		},
		onSuccess: function(obj){
			//登录成功的操作
			return true;
		},
		onFailure: function(errId, obj){
			//登录失败时的操作
			return true;
		}
	};
	for (var i in obj){option[i] = obj[i];}
	option.hostingId = option.hostingId || $getQuery('hostingid');//设置hostingId，值不为空时表示hosting用户登录
	window._loginFrameOption = option; //设置全局变量
	option.closeLogin = closeLogin;//关闭
	option.doAction = doAction; //执行回调
	option.showLoginFrame = showLoginFrame; //显示框架
	//清除returnurl，referurlcookie
	$setCookie('returnurl', '', -1, '/', 'paipai.com');
	$setCookie('referurl', '', -1, '/', 'paipai.com');
	//如果遇到需要检查用户登录状态且用户已经登录的话就不显示登录框直接跳到登录成功后的操作
	if (option.check && $getCookie("skey") && $getCookie("hs") && $getCookie("uin")) {
		//登录成功后的操作
		option.doAction();
		return;
	}
	//需要检查页面加载完成，且页面没有加载完成的话，就跳到登陆页面
	if (!$isDocReady() && option.checkReady) {
		// setCookie('returnurl',location.href,1, '/', 'paipai.com');
		// location.href="http://member.paipai.com/cgi-bin/login_entry";
		return false;
	};
	option.showLoginFrame();
	initLoginCallBack();
	//显示登陆窗口框架
	function showLoginFrame(){
		//加载浮窗
		if (this['float']) {
			this.floatHandle = $float({
				width: "417",
				height: "336",
				cover: this.model,
				style: 'none',
				title: this.title,
				html: '<div id="altercontent"></div>',
				left: this.x,
				top: this.y
			});
			this.domId = "altercontent";
			this.dragId = "floatBox_" + this.floatHandle.id;
		}
		//加载css
		var hc = "";
		//加载界面
		hc += '<div class="' + (this['float'] ? "loginunit" : "loginunit2") + '" id="' + (this['float'] ? "loginUnit" : "loginUnit2") + '" style="position:relative;" > <h3 id="loginDragBar"><span id="loginCloser" style="' + (this.close ? "" : "display:none;") + '">关闭</span><strong>登录</strong><em>' + this.title + '</em></h3><iframe src="http://ui.ptlogin2.paipai.com/cgi-bin/login?appid=17000101&style=0&target=self&no_verifyimg=1&hide_title_bar=1&f_url=loginerroralert' + (this.quick ? "" : "&enable_qlogin=0") + '&bgcolor=' + (this['float'] ? "f2faff" : "eef5ff") + '&link_target=blank&uin='+this.defaultId+'&s_url=http://member.paipai.com/cgi-bin/ptlogin%3Floginfrom%3D18' + (this.hostingId ? ('%26hostingid%3D' + this.hostingId) : '') + '" id="login_frame" name="login_frame" scrolling="no" frameborder="0" onload="login_frame_load?login_frame_load():\'\';"></iframe><div id="loginXieyi"><input name="" id="loginxybox" type="checkbox" value="" checked="checked" /><label for="loginxybox">已阅读并同意<a class="blule" href="http://help.paipai.com/user_agreement.shtml" target="_blank">《拍拍用户协议》</a></label></div><div id="loginXyMask" onClick="alert(\'请先同意《拍拍用户协议》！\')" style="display:none;background-color:#000;position:absolute;left:3px;top:28px;filter:alpha(opacity=1);opacity:0.01;"></div></div>';
		$id(this.domId).innerHTML = hc;
		if(this.noChangeQQ){
			window.login_frame_load=function(t){
			  var uin = document.frames('login_frame').document.getElementById('u');
			  if(uin) uin.disabled='disabled';
			}
		}else{
			window.login_frame_load=function(t){return true};
		}
		if(this.hideXieyi){
			$id("loginXieyi").style.display="none";
		}
		//判断用户是否同意拍拍用户协议，如checkbox未勾选则用浮层遮盖登陆按钮，并提示用户
		window.showtLoginXyMask=function(){
			var a=document.getElementById("loginXyMask"),b=document.getElementById("login_frame");
			document.getElementById("loginxybox").onclick = function(){
				if(this.checked){
					a.style.display="none"
				}else{
					a.style.display="";
					a.style.height=b.style.height;
					a.style.width=b.style.width;
				}
			}
		}
		showtLoginXyMask();
		//绑定拖动事件
		(this['float'] && this.drag) ? $initDragItem({
			barDom: document.getElementById("loginDragBar"),
			targetDom: document.getElementById(this.dragId)
		}) : "";
		//绑定关闭事件
		if (this.close) {
			document.getElementById("loginCloser").onclick = function(){
				window._loginFrameOption.closeLogin();
			};
		}
	}
	//初始化回调函数
	function initLoginCallBack(){
		//回调，登录前的操作,检查是否选中协议
		window.ptlogin2_onLogin = function(){
			return (window._loginFrameOption.onLogin()) ? true : false;
		};
		//回调，重置前的操作
		window.ptlogin2_onReset = function(){
			return (window._loginFrameOption.onReset()) ? true : false;
		};
		//回调，关闭时的操作
		window.ptlogin2_onClose = function(){
			return (window._loginFrameOption.onClose()) ? true : false;
		};
		//回调,尺寸调整
		window.ptlogin2_onResize = function(width, height){
		if (!window._loginFrameOption.onResize(width, height)) {
			return false;
		}
		window._loginFrameOption.floatHandle?window._loginFrameOption.floatHandle.resize(parseInt(width) + 28, parseInt(height) + 75):"";
		var oFrame = $id("login_frame"), oUnit = $id("loginUnit"), oUnit2 = $id("loginUnit2");
		oFrame.style.height = height + "px";
		oFrame.style.width = width + "px";
		if (oUnit) {
			oUnit.style.height = (height + 75) + "px";
			oUnit.parentNode.parentNode.style.height = (height + 80) + "px";
		};
		if (oUnit2) {
			oUnit2.style.height = (height + 60) + "px";
			oUnit.parentNode.parentNode.style.height = (height + 60) + "px";
		};
			return true;
		};
		//回调，成功后的操作
		window.ptlogin2_onSuccess = function(){
		if (!window._loginFrameOption.onSuccess()) {
			return false;
		}
		//不同域同步登陆状态 addby lordchen 10-08-23
		(new Image()).src="http://ptlogin2.qq.com/jump?uin="+$getCookie("uin")+"&skey="+$getCookie("skey");
		//清除登录框
		window._loginFrameOption.closeLogin();
		//执行登录后的操作
		window._loginFrameOption.doAction();
			return true;
		};
		//回调，失败后的操作
		window.ptlogin2_onFailure = function(err){
			if (!window._loginFrameOption.onFailure(err)) {
				return false;
			}
		//执行登录失败后的操作,弹出错误，并重新尝试展示开对象
			if (err) {
				alert("登录失败！可能的错误原因：" + err);
			}
			$loginFrame(window._loginFrameOption);
				return true;
		};
	}
	//执行回调函数
	function doAction(){
		if (this.type == "func") {
			this.action();
		};
		if (this.type == "top") {
			window.top.location.href = this.action;
		};
		if (this.type == "parent") {
			window.parent.location.href = this.action;
		};
		if (this.type == "self") {
			window.location = this.action;
		};
		if (this.type == "blank") {
			window.open(this.action);
		};
	}
	//关闭登陆窗口
	function closeLogin(){
		try {
			window._loginFrameOption.floatHandle.close()
		}
		catch (e) {
		}
	}
}

function $shareToFriend(opt){
	$loadCss("http://static.paipaiimg.com/module/msg_tips.css");
	$loadCss("http://static.paipaiimg.com/module/module_box.css?t=20100719");
	$loadCss("http://static.paipaiimg.com/module/m_share.css");
	//基本配置
	var option = {
		limit : 20,		//好友选择上限
		cover : false,	//是否显示覆盖背景
		title : "邀请好友",
		actionId : "",	//好友选择提交功能
		validityId : "",
		detail : "#",
		status : "0"	//在线状态 0：全部;  1：在线;  2：离线; 3：离开;
	};
	for( var i in opt ){
		option[i]=opt[i];
	}
	//全局变量
	window.PP_core_stf_option = option;
	//校验登录
	if ( !$isLogin() ){
		//浮窗登录
		$loginFrame({
			type : 'func',
			check : false,
			model : false,
			action : function(){location.reload();},
			x : 0,
			y : 0
		});
		return;
	}
	//输出好友选择器框架
	var template=
	'<div id="shareTofriend" class="module_box_normal m_share">'+
	'<!--[if IE 6]><iframe frameBorder="0" style="position:absolute;left:-5px;top:-5px;z-index:-1;filter:Alpha(Opacity=0);border:solid;width:486px;height:580px;"></iframe><![endif]-->'+
	'<iframe style="display:none" name="iframe1" id="iframe1"></iframe><div class="box_title"><h4>{#title#}</h4><a href="#nogo" class="bt_close" id="close_frame"></a></div>'+
	'<div class="box_content m_scnt">'+
	'<div class="m_sabs"><span class="m_stit">邀请QQ好友参加此优惠活动</span><span class="m_sfaqs"><a href="{#detail#}" target="_blank"><span class="msg0-icon-help"></span>了解此活动详情</a></span></div>'+
	'<p class="m_snum">已选 <span>0</span> 人/上限 <span>20</span> 人</p>'+
	'<div class="m_sselecter"><dl class="m_sfriens">'+
	'<dt class="tit"><span>好友</span></dt><dd class="bd"><div class="m_slist">正在加载中。。。。</div></dd></dl>'+
	'<dl class="m_sinvite"><dt class="tit">选中的好友</dt><dd class="bd"><div class="m_slist"><ul></ul></div></dd></dl></div>'+
	'<p class="msg-para-warn" style="display:none"></p><div class="m_sbtn"><button>邀请</button><a href="javascript:;">取消</a></div>'+
	'<p class="m_snote">友情提醒：您一次最多只能邀请20位好友。</p></div></div>';
	template = $json2temp( option, template);
	
	if ($$("#shareTofriend").length>0){
		$$("#shareTofriend").show();
	}else{
		$$("body").append(template);
	}
	$$("#close_frame, .m_sbtn a").click(function(){
		$$("#shareTofriend").hide();
	});
	//加载好友信息
	$loadScript( "http://ext.paipai.com/buddy/RecommendFriend?status=" + option.status +"&t="+Math.random() );
	window.friendListCallBack = function( friends ){
		if(friends.ret=="1"){
			//浮窗登录
			//$$("#shareTofriend").hide();
			$loginFrame({
				type : 'func',
				check : false,
				model : false,
				action : function(){$loadScript( "http://ext.paipai.com/buddy/RecommendFriend?status=" + window.PP_core_stf_option.status );},
				x : 0,
				y : 0
			});
			return;
		}
		//处理返回信息，格式化输出
		var html=[];
		for ( var i = 0, len1 = friends.groups.length; i < len1 ; i++){
			var groups = friends.groups[i];
			//小组
			html.push('<dt><a href="#" class="m_sgroup">' + groups.name + '</a><a href="javascript:;" class="m_sadd">组选</a></dt>');
			html.push('<dd style="display:none"><ul>');
			//小组成员
			for ( var j = 0, len2 = groups.list.length; j < len2; j++ ){
				var list = groups.list[j];
				var state = list.onlineStatus==1?"m_soff":"";
				html.push("<li qq=" + list.qq + " time="+list.time+" checkKey="+list.checkKey+" class='"+state+"' style=''><a href='javascript:;' >" + list.nickName + "</a><span></span></li>");
			}
			html.push('</ul></dd>');
		}
		html = "<dl>" + html.join("") + "</dl>";
	
		//定义区域
		var oList = $$( ".m_sfriens .m_slist" );
		var oSelected = $$( ".m_sinvite .m_slist ul" );
		var ofsCount = $$(".m_snum");
		var oTips = $$( ".msg-para-warn" );
		var oSubmit = $$( ".m_sbtn button" );
		oList.html( html );
		oList.find(".m_sgroup").toggle(
			function(){
				$$(this).parent().next("dd").show();
			},
			function(){
				$$(this).parent().next("dd").hide();
			}
		);
		oList.find(".m_sadd").click(function(){
		
			//总人数限制
			if ( oSelected.find("li").length < window.PP_core_stf_option.limit ){
				var list = $$(this).parent().next("dd").find("ul li");
				var limit = window.PP_core_stf_option.limit - oSelected.find("li").length;
				limit = limit> list.length ? list.length : limit;
				for (var i = 0 ; i < limit; i++){
					var qq = $$(list[i]).attr("qq");
					if ( oSelected.find("[qq='"+qq+"']").length == 0 ){
					
						$$(list[i]).find("span").addClass("m_scur");
						$$(list[i]).clone().appendTo(oSelected);
						oSelected.find("li:last span").remove();
						oSelected.find("li:last").append('<a href="javascript:;" class="m_sdel" title="删除">删除</a>');
						ofsCount.html('已选 <span>'+oSelected.find("li").length+'</span> 人/上限 <span>'+window.PP_core_stf_option.limit+'</span> 人');
					}
				}
				if(oSelected.find("li").length == window.PP_core_stf_option.limit){
					oTips.html('<span class="msg0-icon-warn"></span>您选择的好友数已达上限');
					oTips.show();
				}
			}else{
				oTips.html('<span class="msg0-icon-warn"></span>您选择的好友数已达上限');
				oTips.show();
			}
		});
		oList.find("dd>ul>li").click(function(){
			if( oSelected.find("li").length < window.PP_core_stf_option.limit ){
				var qq = $$(this).attr("qq");
				if ( oSelected.find("[qq='"+qq+"']").length == 0 )
				{
					$$(this).find("span").addClass("m_scur");
					$$(this).clone().appendTo(oSelected);
					oSelected.find("li:last span").remove();
					oSelected.find("li:last").append('<a href="javascript:;" class="m_sdel" title="删除">删除</a>');
					ofsCount.html('已选 <span>'+oSelected.find("li").length+'</span> 人/上限 <span>'+window.PP_core_stf_option.limit+'</span> 人');
				}
			}
			else
			{
				oTips.html('<span class="msg0-icon-warn"></span>您选择的好友数已达上限');
				oTips.show();
			}
		});
		oSelected.find("li .m_sdel").live("click",function(){
			var qq = $$(this).parent().attr("qq");
			$$(this).parent().remove();
			oList.find("[qq='"+qq+"'] span").removeClass("m_scur");
			ofsCount.html('已选 <span>'+oSelected.find("li").length+'</span> 人/上限 <span>'+window.PP_core_stf_option.limit+'</span> 人');
			oTips.hide();
		});
		oSubmit.click(function(){
			var qqList = oSelected.find("li");
			if ( qqList.length > 0 )
			{
				var query = [];
				for (var i = 0, len = qqList.length; i < len; i++)
				{
					
					query.push("<input name='Fid' value='"+$$(qqList[i]).attr("qq")+","+$$(qqList[i]).attr("time")+","+$$(qqList[i]).attr("checkKey")+"' type='hidden'>");
				}
				var html = '<form target="iframe1" action="http://party.paipai.com/cgi-bin/comm_sendtips1" method="post" id="friendlist_form">'+
							'<input type="hidden" value="'+window.PP_core_stf_option.actionId+'" id="aid" name="aid">'+
							'<input type="hidden" value="'+window.PP_core_stf_option.validityId+'" id="vid" name="vid">'+
							query.join("")+
							'</form>';
				if($$("#friendlist_form").length==0)
				{
					$$("body").append(html);
				}
				else
				{
					$$("#friendlist_form").remove();
					$$("body").append(html);
				}
				
				$$("#shareTofriend").hide();
				$$("#friendlist_form").submit();
				
				var tips='<div class="box_hint_normal"><span class="icon msg2-icon-right"></span><div class="hint_content"><p class="hint_title"><strong>发送成功！</strong></p></div></div>';
				var float=$float({
					title:"提示",
					html:tips,
					fix:true,	//是否固定居中随屏幕滚动，如果为true则left和top无效
					cover:true	//显示覆盖背景
				});
				$$(".bt_close").click(function(){
					$$(".module_box_normal").hide();
				});
				
			}
			else
			{
				oTips.html('<span class="msg0-icon-warn"></span>请选择好友');
				oTips.show();
			}
		});
	};
};

//添加链接的带登录态
function $addLoginKey(clientuin,clientkey)
{
	var pvDoc=document;
	if(window!=top)
	{
		try{pvDoc=top.document;}
		catch(e){};
	}
	var req_url = pvDoc.URL; 
	var sUrl=req_url.split("\/\/")[1].split("\/")[0];
	if(sUrl==""){ 
		sUrl="paipai.com";
	}
	var login_prefix = "http://member.paipai.com/cgi-bin/qq_to_paipai?clientuin="+clientuin+"&clientkey="+clientkey+"&re="+sUrl+"&url=";
	var obj=document.getElementsByTagName("A");
	for(i=0,len = obj.length;i<len;i++)	{
		if (obj[i].href.indexOf("qq_to_paipai") != -1 || obj[i].href.indexOf("javascript:") == 0 || obj[i].getAttribute("login")=="no"){
			continue;
		}else{
			obj[i].href = login_prefix+escape(obj[i].href);
		}
	}
	obj=null;
};

function $submitToSearch(){
	/*
	//搜索表单提交
	//20100720 create by homerhuang 
	*/
	var frm = arguments[0],event = window.event,srcEls;
	if (typeof(frm) == "object" || !frm){
		if ($isBrowser("firefox")){event = frm}
		srcEls = event.target || event.srcElement;
		frm = srcEls.getAttribute("frm");
	}
	var objFrm = document.forms[frm];
	//如果存在表单，则进行提交逻辑判断
	if (objFrm){
		var t = objFrm.elements["searchType"].value,clsObj = objFrm.elements["sClassid"];
		var clsId = (!clsObj || clsObj.value == "")?0:clsObj.value;
		if(objFrm.elements['KeyWord'].value == '想找什么？输入商品名称试试'){
			objFrm.elements['KeyWord'].value = '';
		}
		
		if(objFrm.elements['KeyWord'].value == "" && clsId == "0"){
			window.location = "http://search.paipai.com/";
			return false;
		}else{
			if (t && t == "1"){
				objFrm.action="http://shopsearch.paipai.com/SearchShopAction.xhtml";
			}else{
				objFrm.action="http://search1.paipai.com/cgi-bin/comm_search1";
			}
			objFrm.submit();
			return false;
		}
	}
};

function $strReplace(str,re,rt){
	//同时支持json格式的批量替换和原始的全部替换
	if(rt!=undefined){
		replace(re,rt);
	}else{
		for(var key in re){
			replace(key,re[key]);
		};
	};
	
	function replace(a,b){
		var arr=str.split(a);
		str=arr.join(b);
	};

	return str;
};

function $isDocReady(){
	//判断页面是否ready
	if(navigator.userAgent.match(/MSIE/)){
		try{
			document.documentElement.doScroll('left');
			return true;              
		}catch(e){}
		return false;
	}else{
		return document.body?true:false;
	}
}

function $formatDate(date,formatStr){ 
	//格式化时间
	var	arrWeek=['日','一','二','三','四','五','六'],
		str=formatStr
			.replace(/yyyy|YYYY/,date.getFullYear())
			.replace(/yy|YY/,(date.getFullYear() % 100)>9?(date.getFullYear() % 100).toString():"0" + (date.getFullYear() % 100))
			.replace(/mm|MM/,date.getMonth()>8?(date.getMonth()+1).toString():"0" + (date.getMonth()+1))
			.replace(/m|M/g,date.getMonth()+1)
			.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():"0" + date.getDate())
			.replace(/d|D/g,date.getDate())
			.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():"0" + date.getHours())
			.replace(/h|H/g,date.getHours())
			.replace(/ii|II/,date.getMinutes()>9?date.getMinutes().toString():"0" + date.getMinutes())
			.replace(/i|I/g,date.getMinutes())
			.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():"0" + date.getSeconds())
			.replace(/s|S/g,date.getSeconds())
			.replace(/w|W/g,arrWeek[date.getDay()]); 
	return str; 
};

function $strTrim(str,code){
//删除字符串两端的空格或者指定内容
	var argus  = code || "\\s";
	var temp = new RegExp("(^"+argus+"*)|("+argus+"*$)","g");
	return str.replace(temp,"");
}

function $setCookie(name,value,expiresd,path,domain,secure){
	//写入COOKIES
	var expdate = new  Date(),
		expires = arguments[2] || null,
		path  	= arguments[3] || "/",
		domain  = arguments[4] || null,
		secure  = arguments[5] || false;		
	expires?expdate.setMinutes(expdate.getMinutes() + parseInt(expires)):"";		
	var cookietemp =escape(name) + '=' + escape(value) + (expires ? '; expires=' + expdate.toGMTString() : '') + (path ? '; path=' + path : '')+ (domain ? '; domain=' + domain : '')+(secure ? '; secure' : '');
	document.cookie=cookietemp;
};

function $addEvent(obj,type,handle){
	//事件绑定，兼容ff，ie
	if (window.addEventListener){
		obj.addEventListener(type, handle, false);
	}else if (window.attachEvent){
		obj.attachEvent("on"+type, handle);
	}else{
		obj["on" + type] = handle; 
	}
};

function $regionGetIdByProvinceName(Prov){
//根据省的名字获取省的id
	var regionMap=$getRegionMap();
	for(var i in regionMap){
		if(Prov==regionMap[i][0]){
			return i;
		}
	}
	return "";
}

function $regionGetPath(rid){
//根据地址id获取地址的省市区的路径,返回对象结构:[省id，省名称，市id，市名称，地区id，地区名称，是否是一个完整有效的地址结果]
	var regionMap=$getRegionMap();
	var regionPath=["","","","","","",false];
	if(!(parseInt(rid)>=0)){
		return regionPath;
	}
	for(var i in regionMap){
		if(i.toString()==rid.toString()){
			//如果直接在省一级找到了，就直接返回路径结果
			regionPath=[i,regionMap[i][0],"","","","",true];
			return regionPath;
		}else{
			//把省的id放入数组，并从这个省开始查找所有市的匹配
			regionPath[0]=i;
			regionPath[1]=regionMap[i][0];
			//匹配当前省里面的所有市
			for(var j in regionMap[i][2] ){
				//如果匹配到了市，就返回新的路径
				if(j.toString()==rid.toString()){
					regionPath=[regionPath[0],regionPath[1],j,regionMap[i][2][j][0],"","",true];
					return regionPath;
				}else{
					//当前市写入路径，做记忆
					regionPath[2]=j;
					regionPath[3]=regionMap[i][2][j][0];
					//如果匹配不到就到这个市的地区信息里面匹配
					for(var k in regionMap[i][2][j][2]){
						//如果匹配到了地区，就返回新的路径,匹配不到就什么也不做
						if(k.toString()==rid.toString()){
							regionPath=[regionPath[0],regionPath[1],regionPath[2],regionPath[3],k,regionMap[i][2][j][2][k][0],true];
							return regionPath;
						}
					}
					//如果走到这里就表示当前市的地区都不合适，要返回上一级循环去匹配下一个市。我们清空路径中当前市的id
					regionPath[2]="";
					regionPath[3]="";
				}
			}
			//如果走到这里，但当前省里面的所有市里都找不目标地址的配置，要返回上一级循环，去匹配下一个省，我们清空路径中的当前省
			regionPath[0]="";
			regionPath[1]="";
		}
	}
	//如果走到这里，则标识从整个地址信息中都匹配不到目标地址，数据是无效的，我们直接返回空路径
	return regionPath;
};

function $formatPrix(prix,formatStr){
	//格式化价格，注意JS是没有四舍五入的，只能直接截取
	//formatStr:x.x,x.xx,x.xxx……
	var arrPrix=[];
	
	prix=prix+"";//转为字符串
	var arr=prix.split(".");
	arr[1]=arr[1]||"";//如果没有传入小数后面的值，也保证arr[1]存在。
	var arrLen=arr[1].length;
	
	var arrFormat=formatStr.split(".");
	arrFormat[1]=arrFormat[1]||"";
	var formatLen=arrFormat[1].length;
	
	if(formatLen==0){return [arr[0]]};
	
	if(formatLen<=arrLen){
		arr[1]=arr[1].substr(0,formatLen);
	}else{
		var lessLen=formatLen-arrLen;
		for(var i=0;i<lessLen;i++){		
			arr[1]+="0";
		}
	};
	
	return [arr[0]+"."+arr[1],arr[0],arr[1]];
};

function $regionGetPathByStr(rstr){
//根据地址描述（如：湖北省武汉市黄陂区）获取地址的省市区的路径,返回对象结构同$regionGetPath
	var regionMap=$getRegionMap();
	var regionArr=["","","","","","",false,""];
	if(!rstr) return;
	if(rstr.indexOf("省", 0) != -1){
		rstr = rstr.replace("省", "");
	}
	var special=[[0,"北京北京市",40000,"北京","北京市"],[1,"天津天津市",100,"天津","天津市"],[2,"上海上海市",200,"上海","上海市"],[3,"重庆重庆市",300,"重庆","重庆市"]];
	for(var i=0;i<special.length;i++){
		var data=special[i];
		if(regionMap[data[0]][0]==rstr.substring(0,2)){
			rstr=rstr.replace(data[1],"");
			for(var s in regionMap[data[0]][2][data[2]][2]){
				if(regionMap[data[0]][2][data[2]][2][s]==rstr){
					return [data[0],data[3],data[2],data[4],s,rstr,true,s];
				}
			}
		}
	}
		
	if(regionMap[42245][0] == rstr.substring(0,2)){
		regionArr = [42245, "海外", 42246, "海外", "", "", true, 42246];
	}
	special=[[32,"香港"],[33,"澳门"],[31,"台湾"]];
	for(var i=0;i<special.length;i++){
		var data=special[i];
		if(regionMap[data[0]][0]==rstr.substring(0,2)){
			rstr=rstr.replace(data[1],"");
			for(var s in regionMap[data[0]][2]){
				if(regionMap[data[0]][2][s][0]==rstr){
					return regionArr=[data[0],data[1],s,rstr,"","",true,s]
				}
			}
		}
	}
	if((rstr.substring(0,3) === (regionMap[10][0]) || (rstr.substring(0,3) === regionMap[6][0]))){
			regionArr[0] = index =  (rstr.substring(0,3) === "黑龙江") ?  6 : 10;
			regionArr[1] = (rstr.substring(0,3) === "黑龙江") ? regionMap[6][0] : regionMap[10][0];
			rstr = rstr.replace(rstr.substring(0,3), "");
			for(var s in regionMap[index][2]){
				if(rstr.substring(0, 2) === (regionMap[index][2][s][0]).substring(0, 2) ){
					regionArr[2] = s;
					regionArr[3] = regionMap[index][2][s][0];
					rstr = rstr.replace(regionMap[index][2][s][0], "");
					for(var k in regionMap[index][2][s][2]){
						if(regionMap[index][2][s][2][k][0] === rstr){
							regionArr[4] = k;
							regionArr[5] = regionMap[index][2][s][2][k][0];
							regionArr[6] = true;
							regionArr[7] = k;
						}
					}
				}
			}
	}
	for(var i in regionMap){
		if((regionMap[i][0]).substring(0,2) === rstr.substring(0,2)){
			regionArr[0] = i;
			regionArr[1] = regionMap[i][0];
			rstr = rstr.replace(rstr.substring(0,2), "");
			for(var j in regionMap[i][2]){
				if(rstr.substring(0,2) === (regionMap[i][2][j][0]).substring(0, 2)){
					regionArr[2] = j;
					regionArr[3] = regionMap[i][2][j][0];
					rstr = rstr.replace(regionMap[i][2][j][0], "");
					for(var k in regionMap[i][2][j][2]){
						if(regionMap[i][2][j][2][k][0] === rstr){
							regionArr[4] = k;
							regionArr[5] = rstr;
							regionArr[6] = true;
							regionArr[7] = k;
							return regionArr;
						}
					}
				}
			}
		}
	}
	return regionArr;
};

function $regionGetStr(rid){
//根据地址id来取地址的描述字符串，如果是直辖市则不写省名称
	var regionMap=$getRegionMap();
	if(rid==""){
		return "";
	}
	var path=$regionGetPath(rid);
	//如果省的类别标记为1，则不加省后缀,表示是不需要加省描述的省，如新疆
	var pStr=(path[1])?path[1]+((regionMap[path[0]][1]==1)?"":"省"):"";
	var cStr=(path[3])?path[3]:"";
	//选中了市的话，判断是否直辖市，如果是的话就不显示省
	if(path[2]){
		if(regionMap[path[0]][2][path[2]][1]==1){
			pStr="";
		}
		//如果省的类别标记为2的话，标识不显示省名称，类似于直辖市的处理，如海外
		if((regionMap[path[0]][1]==2)){
			pStr="";
		}
	}
	var aStr=(path[5])?path[5]:"";
	return pStr+cStr+aStr;
};

function $wordRestrict(words,len,cnStrict,flag){
//进行字符长度验证，如果超过长度则返回截断后的字符串
	if(cnStrict){
		var totleWords = words.replace(/[\u00FF-\uFFFF]/g, "  ").length;
		if(totleWords > len){
			var enw=words.replace(/[\u00FF-\uFFFF]/g, "@-").substr(0,len);
			var sublen=enw.match(/@-/g)?enw.match(/@-/g).length:0;
                        var flag=flag||"";
			return words.substring(0,  len-sublen)+flag;
		}
		return words;
	}else{
		return words.length>len?words.substring(0,len):words;
	}
}

function $stringSplitByLength(str,l,cuter){
//按照指定字节数把字符串分行,参数:字符串，切割长度（单位字节），用来分隔的代码
	if(str.length<=l){return str}
	cuter=cuter?cuter:"<br/>"
	var returnVar=[];
	var cutString="";
	var start=0;
	for(var i=0;i<str.length;i++){
		cutString=str.substr(start,i-start);
		if(cutString.replace(/[\u00FF-\uFFFF]/g,"  ").length>=l){
			returnVar.push(cutString)
			cutString="";
			start=i;
		}
	}
	(cutString)?returnVar.push(cutString):"";
	return returnVar.join(cuter);
}

function $address(obj){
//收货地址组件,返回处理后的obj对象，用obj.getAddress()来获取用户选择的结果，如果返回一个数组则表示有错，数组是所有的错误列表，如果返回true则表示取值成功。
	var option={
		uin:"",			//用户QQ号
		dom:"",			//显示地址列表的dom id
		addressId:"",	//返回收货地址id的表单inputid
		regionId:"",	//返回地区id的表单inputid
		addressStr:"",	//返回收货地址的内容串的表单inputid
		referProvince:"",	//推荐的省，用于新增地址的时候默认帮用户选中一个省
		showAll:false,	//是否展开所有,默认显示3个，其余的折叠起来
		autoInput:false,//当用户没有收货地址的时候是否默认展开收货地址输入窗
		defAddrId:"",//需要默认被选中的一个地址id（数据库id）
		defAddrIndex:0,//需要默认被选中的地址索引，前端排序id
		tipTxt:'请填写该商品的收货地址。',	//添加、新增时的提示文字
		dataSource:'',	//默认数据源，如果有这个数据源的话则直接显示列表，不去拉取异步数据,用于异步数据比较慢的情况
		list:[],		//用户的地址列表数据，拉取数据回来后，会把数据存储在这里
		curIdx:-1,		//当前选中的收货地址索引，默认没有选中
		float:"",		//跟收货地址组件相关的浮窗对象，重新展示前先清空一下这个
		oneAfterShow:function(obj){//展示列表后只执行一次的方法，执行后会自己清除掉，一般用于提交新地址后自动执行的一些事情
			return true;
		},
		onListShow:function(obj){
			return true;
		},//地址列表渲染完成
		onSelectItem:function(obj){
			return true;
		},//选择一个地址
		onLogout:function(obj){
			$setCookie("returnurl",location.href,1,"/","paipai.com");
			location.href="http://member.paipai.com/cgi-bin/login_entry";
		},	//登陆超时时的操作,刷新当前页面
		tp:'【none】<div id="addressFrame" class="addresslist"><dl><dt >收货地址</dt><dd >您还没有收货地址，请填写收货地址以保证您购买的商品能顺利送达。<input type="button" value="填写收货地址" class="subbtn bw8" onclick="showAddressEditor(\'\')"/></dd></dl></div>【none】【start】<div  id="addressFrame" class="addresslist" ><dl><dt>收货地址</dt>【start】【list】<dd style="display: {#hideThis#}" id="addressItem_{#index#}"><input name="addressCheckList" id="addressCheckList_{#index#}" autocomplete="off" type="radio" iserror="0"  value="{#addressId#}" listIndex="{#index#}" addressStr="{#address#}，邮编：{#addCode#}，收货人：{#name#}，联系电话：{#phone#}"> <label class="nostyle" isSelected="0" for="addressCheckList_{#index#}" listIndex="{#index#}" id="addressLabel_{#index#}" >{#addressCut#}  <br/>收货人：{#name#}，联系电话：{#phone#}{#addCodeStr#}<span class="editbutton" id="addressEditButton_{#index#}" listIndex="{#index#}" >[<a href="javascript:var  editAddress=showAddressEditor({#index#});" listIndex="{#index#}" >修改</a>] [<a listIndex="{#index#}" href="javascript:var editAddress=deleteAddress({#addressId#});" >删除</a>]</span></label></dd>【list】【error】<dd id="addressItem_{#index#}" class="erroraddressitem" style="display: {#hideThis#}" > <input name="addresschecklist" id="addressCheckList_{#index#}" iserror="1" disabled="disabled" type="radio" value="{#addressId#}" addressStr="{#address#}，邮编：{#addCode#}，收货人：{#name#}，联系电话：{#phone#}"/> <label  for="addressCheckList_{#index#}" iserror="1" listIndex="{#index#}">{#addressCut#}  <br/>收货人：{#name#}，联系电话：{#phone#}，邮编：{#addCode#}<div class="errorinfo">您的收货地址因缺少必要信息，现已不能选择使用，请及时<a href="javascript:var  editAddress=showAddressEditor({#index#})">更新</a>或者<a listIndex="{#index#}" href="javascript:var editAddress=deleteAddress({#addressId#});" >删除</a>。</div></label></dd>【error】【add】<dd class="linkother"><label><a href="javascript:var addNewAddress=showAddressEditor(\'\')" class="linkother">增加新的地址</a></label></dd>【add】【show】<dd id="addressListShowAll" class="linkother"><label><a href="javascript:;" class="linkother">显示全部地址<em></em></a></label></dd>【show】【end】</dl></div>【end】【edit】<form action="" onsubmit="return false;"><div class="tipswarn" id="tipswarn">{#tipTxt#}</div><div class="bcontentlist"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr id="address_regionId_tr"><th>所在地区：</th><td><div class="area" id="regionArea"></div><input type="hidden" name="address_regionId" id="address_regionId"><input type="hidden" name="address_regionStr" id="address_regionStr"></td><td class="txterror" id="address_regionId_error">请选择所在地区。</td></tr><tr id="address_street_tr"><th>街道地址：</th><td><input name="address_street" type="text" id="address_street" size="40" maxlength="255" /><span class="remark">(请填写您的详细地址，不需要重复填写省、市、地区)</span></td><td class="txterror"  id="address_street_error">请填写街道地址。</td></tr><tr id="address_code_tr"><th>邮编：</th><td><input name="address_code" type="text" id="address_code" maxlength="6" style="ime-mode:disabled;text-transform: lowercase;" /><span class="remark" ></span></td><td class="txterror" id="address_code_error">请填写邮编。</td></tr><tr id="address_name_tr"><th>收货人姓名：</th><td><input name="address_name"  type="text" id="address_name" maxlength="30" /><span class="remark"></span></td><td class="txterror" id="address_name_error">请填写收货人姓名。</td></tr><tr id="address_mobile_tr"><th>手机号码：</th><td><input name="address_mobile" type="text" id="address_mobile" maxlength="11" style="ime-mode:disabled;text-transform: lowercase;" /><span class="remark">(手机和电话至少填写一项)</span></td><td rowspan="2" class="txterror" id="address_mobile_error">请填写手机或电话。</td></tr><tr id="address_phone_tr"><th>电话号码：</th><td><input name="address_phone0" type="text" id="address_phone0" size="5" maxlength="4" style="ime-mode:disabled;text-transform: lowercase;" /> - <input name="address_phone1" type="text" id="address_phone1" size="10" maxlength="9" style="ime-mode:disabled;text-transform: lowercase;" /> - <input name="address_phone2" type="text" id="address_phone2" size="5" maxlength="6" style="ime-mode:disabled;text-transform: lowercase;" /><span class="remark" >(格式：区号-电话号码-分机，分机可不填)</span></td></tr></table><p class="operate"><input name="address_ok" type="submit" class="subbtn bw2" id="address_ok" value="确 定"/><input name="address_cancel" type="button" class="subbtn bw2" id="address_cancel" value="取 消"/><input type="hidden" name="address_id" id="address_id"><input type="hidden" name="address_type" id="address_type" value="0"><input type="hidden" name="address_uin" id="address_uin" value=""><input type="hidden" name="address_var" id="address_var" value=""></p></div></form>【edit】'//模板编码串，用正则来取相应的内容
	};
	for(var i in obj){
		option[i]=obj[i];
	}
	var regionMap=$getRegionMap();
	//检查用户选择的结果，如果返回一个数组则表示有错，数组是所有的错误列表，如果返回true则表示取值成功，结果值已经写入指定的表单中
	option.tp=option.tp.replace("{#tipTxt#}",option.tipTxt);
	option.check=getCheckedAddress;
	//设置选中第i条地址的方法
	option.selectAddress=selectAddress;
	//收货地址组件的全局存储变量,创建收货地址组件后，组件把自身存入全局变量addressOption中
	window.addressOption=option;
	//设置全局方法：请求用户地址的回调函数
	window.userAddressCallBack=userAddressCallBack;
	//设置全局方法：显示收货地址列表、自己从全局变量中取出地址信息并展示到页面中去
	window.showAddressList=showAddressList;
	//设置全局方法：显示编辑修改窗口,并设置初始值
	window.showAddressEditor=showAddressEditor;
	//设置全局方法：删除收货地址
	window.deleteAddress=deleteAddress;
	//正式开始加载数据，如果有默认数据源的时候就直接显示默认数据源，否则异步加载数据
	if(option.dataSource){
		userAddressCallBack(option.dataSource);
	}else{
		//期待回调函数：userAddressCallBack(obj)
		document.getElementById(option.dom).innerHTML='<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle" style="font-size:13px; color:#333333; text-align:center;vertical-align: middle; " width="100%" height="100%"><img src="http://static.paipaiimg.com/assets/common/loading2.gif" /><br />收货地址列表信息加载中……<a href="javascript:var addressload=$address(addressOption);">点击重试</a></td></tr></table>';
		$loadScript("http://my.paipai.com/cgi-bin/recvaddress_asyncprocess?action=list&actionid=null&attrtype=0&t="+Math.random(),"userAddressList");
		
	}
	return addressOption;
	//////-----------------初始化结束，将处理后的数据返回----------//////
	//选中第i项地址
	function selectAddress(id){
		if(id>2){
			showHideAddress();
		}
		var temp=document.getElementById("addressFrame").getElementsByTagName("input");
		var radios=[];
		for(var i=0;i<temp.length;i++){
			if(temp[i].type=="radio" && temp[i].getAttribute("iserror")!="1"){
				radios.push(temp[i]);
				if((parseInt(id)+1)==radios.length){
					temp[i].checked=true;
					document.getElementById(temp[i].id.replace("addressCheckList_","addressLabel_")).className="selected";
					if(!option.onSelectItem(option)){
						return false;
					}
				}else{
					temp[i].checked=false;
					document.getElementById(temp[i].id.replace("addressCheckList_","addressLabel_")).className="nostyle";
				}
			}
		}
	}
	//检查用户选择的结果,如果返回一个数组则表示有错，数组是所有的错误列表，如果返回true则表示取值成功，结果值已经写入指定的表单中。
	function getCheckedAddress(onceFunc){
		var option=addressOption;
		var error=[];
		var returnVar="";
		//如果用户没有收货地址则直接弹出新增地址的逻辑
		if(option.list.length<1){
			if(onceFunc){
				option.oneAfterShow=onceFunc;
			}
			option.addressId?document.getElementById(option.addressId).value="":"";
			option.addressStr?document.getElementById(option.addressStr).value="":"";
			option.regionId?document.getElementById(option.regionId).value=""	:"";
			showAddressEditor();
			return false;	
		}
		//如果地址列表没有展开，并且前三条中没有选中项，则把所有的选中都取消，免得出现被隐藏的项被选中的情况出现
		var temp=document.getElementById("addressFrame").getElementsByTagName("input");
		var radios=[];
		for(var i=0;i<temp.length;i++){
			if(temp[i].type=="radio" && temp[i].getAttribute("iserror")!="1"){
				radios.push(temp[i]);
				if(temp[i].checked){
					checkIndex=radios.length;
					returnVar=temp[i].getAttribute("listIndex");
				}
			}
		}
		//有选中，但是第3个以上，且没有展开,就让他没选中
		if(returnVar!="" && !option.showAll && checkIndex>3){
			returnVar="";
		}
		//如果所有的地址列表中，没有一条被选中，则返回false
		if(!returnVar){
			error.push("请选择一条收货地址！");
			return error;
		}
		option.curIdx = returnVar;
		option.addressId?document.getElementById(option.addressId).value=option.list[returnVar].Id:"";
		option.addressStr?document.getElementById(option.addressStr).value=document.getElementById("addressCheckList_"+returnVar).getAttribute("addressStr"):"";
		option.regionId?document.getElementById(option.regionId).value=option.list[returnVar].RegionId:"";
		return true;
	}
	//请求用户地址的回调函数
	function userAddressCallBack(obj){
		//错误处理
		if(obj.isError>0){
			if(obj.isError==13){	//13标识登陆超时
				window.addressOption.onLogout();
				return;
			}
			alert(obj.msg);
			return false;
		}
		//处理接收到的数据,清理掉数据中的前后空格以及null的数据元素
		var aList=[];
		for(var i=0;i<obj.list.length;i++){
			if(obj.list[i]!=null){
				aList[i]=obj.list[i];
				for(var j in aList[i]){
					aList[i][j]=(aList[i][j].toString()).replace(new RegExp("(^ *)|( *$)","g"),"");
				}
			}
		}
		window.addressOption.list=aList;
		//显示收货地址列表
		showAddressList();
	};
	//显示收货地址列表、自己从全局变量中取出地址信息并展示到页面中去
	function showAddressList(){
		var option=window.addressOption;
		var hc=[];
		//尝试关闭任何时候可能打开的浮窗对象
		try{
			option.float.onClose?option.float.onClose=function(){return true;}:"";
			option.float.close();
		}catch(e){}
		//用户没有收货地址时的展示
		if(option.list.length<1){
			hc.push(((new RegExp("【none】(.*)【none】","ig")).exec(option.tp))?RegExp.$1:"");
			document.getElementById(option.dom).innerHTML=hc.join("");
			if(!option.onListShow(option)){return false;}
			if(option.addressId){
				if(document.getElementById(option.addressId).value!=""){
					if(!option.onSelectItem(option)){return false;}
				}
			}
			if(option.autoInput){
				showAddressEditor();
			}
			return;
		}
		//有收货地址的时候，循环输出
		hc.push(((new RegExp("【start】(.*)【start】","ig")).exec(option.tp))?RegExp.$1:"");
		var thc={};
		thc.list=((new RegExp("【list】(.*)【list】","ig")).exec(option.tp))?RegExp.$1:"";
		thc.error=((new RegExp("【error】(.*)【error】","ig")).exec(option.tp))?RegExp.$1:"";
		for(var i=0;i<option.list.length;i++){
			var temp=(option.list[i].RegionId && option.list[i].RegionId!="0")?(thc.list):(thc.error);
			temp=temp.replace(/{#index#}/ig,option.list[i].Index);
			temp=temp.replace(/{#name#}/ig,option.list[i].Name);
			temp=temp.replace(/{#addCode#}/ig,option.list[i].Code);
			temp=temp.replace(/{#addCodeStr#}/ig,option.list[i].Code?("，邮编："+option.list[i].Code):"");
			temp=temp.replace(/{#phone#}/ig,(option.list[i].Mobile&&option.list[i].Phone)?(option.list[i].Mobile+"、"+option.list[i].Phone):(option.list[i].Mobile?option.list[i].Mobile:option.list[i].Phone));
			var addr=$regionGetStr(option.list[i].RegionId)+option.list[i].Address;
			var addrCut=$stringSplitByLength(addr,75,"<br />");
			temp=temp.replace(/{#address#}/ig,addr);
			temp=temp.replace(/{#addressCut#}/ig,addrCut.replace("北京省",""));
			temp=temp.replace(/{#hideThis#}/ig,((!option.showAll && i>2)?"none":"block"));
			temp=temp.replace(/{#addressId#}/ig,option.list[i].Id);
			hc.push(temp);
		}
		hc.push((option.list.length>3 && !option.showAll)?(((new RegExp("【show】(.*)【show】","ig")).exec(option.tp))?RegExp.$1:""):"");
		hc.push(((new RegExp("【add】(.*)【add】","ig")).exec(option.tp))?RegExp.$1:"")
		hc.push(((new RegExp("【end】(.*)【end】","ig")).exec(option.tp))?RegExp.$1:"")
		//将生成的html输出出来
		document.getElementById(option.dom).innerHTML=hc.join("");
		//绑定相关事件
		var fdom=document.getElementById("addressFrame");
		if(!fdom){
			return;
		}
		//给所有的lable绑一个鼠标over、out事件用来设置颜色
		var llist=fdom.getElementsByTagName("label");
		for(var i=0;i<llist.length;i++){
			//错误的地址项或者不是地址项的时候跳过
			if(llist[i].getAttribute("iserror")=="1" || (llist[i]).id.indexOf("addressLabel_")<0){
				continue;
			}
			//out
			$addEvent(llist[i],"mouseout",function(event){
				var _this=event.srcElement||event.target;
				showItemEditor(_this.getAttribute("listIndex"),llist,0);
			});
			//over
			$addEvent(llist[i],"mouseover",function(event){
				var _this=event.srcElement||event.target;
				showItemEditor(_this.getAttribute("listIndex"),llist,1);
			});
			//选中时的事件
			$addEvent(document.getElementById(llist[i].htmlFor),"propertychange",function(event){
				var _this=event.srcElement||event.target;
				showItemEditor(_this.getAttribute("listIndex"),llist,1);
				if(_this.checked==true){
					if(!option.onSelectItem(option)){
						return false;
					}
				}
			});
			//选中时的事件-for firefox
			$addEvent(document.getElementById(llist[i].htmlFor),"click",function(event){
				var _this=event.srcElement||event.target;
				showItemEditor(_this.getAttribute("listIndex"),llist,1);
				if(_this.checked==true){
					if(!option.onSelectItem(option)){
						return false;
					}
				}
			});
			
		}
		//显示所有地址列表按钮的点击事件绑定
		if(document.getElementById("addressListShowAll")){
			$addEvent(document.getElementById("addressListShowAll"),"click",function(event){
				showHideAddress();
			});
		}
		if(!option.onListShow(option)){return false;}
		//当有默认的地址id时计算对应的索引id
		if(option.defAddrId!=""){
			for(var i=0;i<option.list.length;i++){
				if(option.list[i].Id==option.defAddrId){
					option.defAddrIndex=option.list[i].Index;
				}
			}
		}
		//页面刷新的时候清空选中状态的缓存
		$addEvent(window,"load",function(event){
			selectAddress(option.defAddrIndex);
		});
		//如果有oneAfterShow方法，则执行他，并把他清空，没有就跳过
		if(option.oneAfterShow){
			option.oneAfterShow();
			option.oneAfterShow="";
		}
		selectAddress(option.defAddrIndex);
	};
	//显示折叠起来的地址列表
	function showHideAddress(){
		var llist=document.getElementById("addressFrame").getElementsByTagName("dd");
		for(var i=0;i<llist.length;i++){
			llist[i].style.display="block";
			if(i>2 && llist[i].id.indexOf("addressItem_")==0){
				document.getElementById(llist[i].id.replace("addressItem_","addressCheckList_")).checked=false;
			}
		}
		document.getElementById("addressListShowAll").style.display="none";
		window.addressOption.showAll=true;
	}
	//显示编辑修改窗口,并设置初始值
	function showAddressEditor(id){
		var option=window.addressOption;
		//当用户收货地址等于10条时，点击“增加新的地址”时，弹出系统提示框
		if(option.list.length>=10 && id.toString()==""){
			alert("您最多可以保存10条收货地址。\n\r请点击确定返回，删除不用的收货地址后，再添加新的收货地址。");
			return false;
		}
		var float=$floatTip({
			cover:true,
			style:"stand",
			title:(parseInt(id)>=0)?"修改收货地址：":'请填写新的收货地址：',
			width:"580",
			html:(((new RegExp("【edit】(.*)【edit】","ig")).exec(option.tp))?RegExp.$1:""),
			onClose:function(){
				if(checkAddressEdit()){
					if(!confirm("您刚才修改的信息尚未保存。\n\r您确定不保存所做改动就离开吗？\n\r按“确定”离开，或按“取消”返回。")){
						return false;
					}
				}
				return true;
			}
		});
		option.float=float;
		//取默认值
		var initAddressId=initRegionId=initStreet=initCode=initName=initMobile=initPhone="";
		if(parseInt(id)>=0){
			for(var i=0;i<option.list.length;i++){
				if(parseInt(option.list[i].Index)==parseInt(id)){
					initAddressId=option.list[i].Id;
					initRegionId=option.list[i].RegionId;
					initStreet=option.list[i].Address;
					initCode=option.list[i].Code;
					initName=option.list[i].Name;
					initMobile=option.list[i].Mobile;
					initPhone=option.list[i].Phone;
				}
			}
		}
		//设置默认值
		var region=$regionInit({
			div:"regionArea",	//显示的div区域
			regionId:(parseInt(id)>=0)?initRegionId:$regionGetIdByProvinceName(option.referProvince),	//地区id
			onChange:function(obj){
				//地址选择变更的时候把结果值写入隐藏表单，否则设置为空
				var regionId="";
				if((obj.currId)[2]){
					regionId=(obj.currId)[2];
				}
				if((obj.currId)[6]){
					regionId=(obj.currId)[4]?(obj.currId)[4]:(obj.currId)[2];
				}
				document.getElementById("address_regionId").value=regionId;
				return true;
			}
		});
		document.getElementById("address_id").value=initAddressId;
		document.getElementById("address_street").value=initStreet;
		document.getElementById("address_code").value=initCode;
		document.getElementById("address_name").value=initName;
		document.getElementById("address_mobile").value=initMobile;
		try{
			var tempPhone=initPhone.split("-");
			document.getElementById("address_phone0").value=tempPhone[1]?tempPhone[0]:"";
			document.getElementById("address_phone1").value=tempPhone[1]?tempPhone[1]:"";
			document.getElementById("address_phone2").value=tempPhone[2]?tempPhone[2]:"";
		}catch(e){}
		//把当前的用户输入保存起来，在用户关闭内容的时候比较
		document.getElementById("address_var").value=getAddressString();
		//绑定检查事件
		$addEvent(document.getElementById("address_ok"),"click",function(event){
			var _this=event.srcElement||event.target;
			if(checkAddressForm()){
				var phone=document.getElementById("address_phone0").value+"-"+document.getElementById("address_phone1").value+(document.getElementById("address_phone2").value?("-"+document.getElementById("address_phone2").value):"");
				if(phone=="-"){
					phone="";
				}
				$loadScript("http://my.paipai.com/cgi-bin/recvaddress_asyncprocess?action=save&actionid=null&attrtype=0&dwRecvAddressID="+$id("address_id").value+"&sRecvPostCode="+$id("address_code").value+"&sRecvMobile="+$id("address_mobile").value+"&sRecvPhone="+phone+"&PRegionId="+$id("address_regionId").value+"&sRevcName="+$id("address_name").value+"&sRecvAddress="+$id("address_street").value+"&t="+Math.random(),"userAddressList");
							
			}
		});
		//绑定取消事件
		$addEvent(document.getElementById("address_cancel"),"click",function(event){
			var _this=event.srcElement||event.target;
			if(checkAddressEdit()){
				if(!confirm("您刚才修改的信息尚未保存。\n\r您确定不保存所做改动就离开吗？\n\r按“确定”离开，或按“取消”返回。")){
					return;
				}
			}
			float.close();
		});
	};
	//设置全局方法：删除收货地址
	function deleteAddress(id){
		if(confirm("您确定要删除该收货地址？")){
			$loadScript("http://my.paipai.com/cgi-bin/recvaddress_asyncprocess?action=delete&actionid=null&attrtype=0&dwRecvAddressID="+id+"&t="+Math.random(),"userAddressList");
		}else{
			return false;
		}
	}
	//处理地址列表中的编辑按钮的显示隐藏
	function showItemEditor(index,list,show){
		for(var i=0;i<list.length;i++){
			//无效地址的时候什么都不做
			if(list[i].getAttribute("iserror")=="1"){
				continue;
			}
			var cindex=list[i].getAttribute("listIndex");
			if(!cindex){
				continue;
			}
			//找到当前选中的radio的id
			if(document.getElementById("addressCheckList_"+cindex).checked){
				document.getElementById("addressLabel_"+cindex).className=(show&&(cindex==index))?"selectedover":"selected";
			}else if(cindex==index){
				document.getElementById("addressLabel_"+cindex).className=show?"mousestyle":"nostyle";
			}else{
				document.getElementById("addressLabel_"+cindex).className="nostyle";
			}
		}
	}
	//地址输入表单检查操作
	function checkAddressForm(){
		var checked=true;
		//地区选择
		if(document.getElementById("address_regionId").value==""){
			document.getElementById("address_regionId_tr").className ="list_error";
			document.getElementById("address_regionId_error").innerHTML ="请选择所在地区。";
			checked=false;
		}else{
			document.getElementById("address_regionId_tr").className ="";
			document.getElementById("address_regionId_error").innerHTML ="";
		}
		//地址检查（半角替换成全角）  //一堆替换的字符串    ? ？﹠&??~??~﹡﹩＇〞.~\∕\﹨∕
		//document.getElementById("address_street").value=document.getElementById("address_street").value.replace(/[\?\&\~\^*\%\$\"\']/g,"").replace(/^ *| *$/g,"").replace(/ +/g," ");
		document.getElementById("address_street").value=document.getElementById("address_street").value.replace(/^ *| *$/g,"").replace(/\?/g, "？").replace(/&/g, "﹠").replace(/~/g,"").replace(/\^/g, "").replace(/\$/g, "﹩").replace(/"/g, "〞").replace(/'/g, "＇").replace(/#/g, "﹟");
		if(document.getElementById("address_street").value.length<1){
			document.getElementById("address_street_tr").className ="list_error";
			document.getElementById("address_street_error").innerHTML ="街道地址错误。<em>您没有填写街道地址，请填写所在街道地址。</em>";
			checked=false;
		}else if(document.getElementById("address_street").value.replace(/[^\x00-\xff]/g,"aa").length<4){
			document.getElementById("address_street_tr").className ="list_error";
			document.getElementById("address_street_error").innerHTML ="街道地址错误。<em>您输入的街道地址过短，请填写正确的街道地址。</em>";
			checked=false;
		}else if(document.getElementById("address_street").value.replace(/[^\x00-\xff]/g,"aa").length>255){
			document.getElementById("address_street_tr").className ="list_error";
			document.getElementById("address_street_error").innerHTML ="街道地址错误。<em>您输入的街道地址过长，不能超过255字节。</em>";
			checked=false;
		}else{
			document.getElementById("address_street_tr").className ="";
			document.getElementById("address_street_error").innerHTML ="请填写街道地址。";
		}
		//邮编检查
		document.getElementById("address_code").value=document.getElementById("address_code").value.replace(/[^\d]/g,"");
		if(document.getElementById("address_code").value.length>1 && document.getElementById("address_code").value.length<6){
			document.getElementById("address_code_tr").className ="list_error";
			document.getElementById("address_code_error").innerHTML ="邮编错误。<em>邮政编码必须为6位数字。</em>";
			checked=false;
		}else{
			document.getElementById("address_code_tr").className ="";
			document.getElementById("address_code_error").innerHTML ="请填写邮编错误。";
		}
		//收货人姓名
		document.getElementById("address_name").value=document.getElementById("address_name").value.replace(/[\?\&\~\^*\%\$\"\']/g,"").replace(/^ *| *$/g,"").replace(/ +/g," ");
		var tempName=document.getElementById("address_name").value.replace(/[^\x00-\xff]/g,"aa")
		if(tempName.length==0){
			document.getElementById("address_name_tr").className ="list_error";
			document.getElementById("address_name_error").innerHTML ="填写的姓名错误。<em>您没有填写收货人姓名，请填写收货人姓名。</em>";
			checked=false;
		}else if(tempName.length>30 ){
			document.getElementById("address_name_tr").className ="list_error";
			document.getElementById("address_name_error").innerHTML ="填写的姓名错误。<em>姓名必须少于等于30个字节。</em>";
			checked=false;
		}else if(tempName.length<3 ){
			document.getElementById("address_name_tr").className ="list_error";
			document.getElementById("address_name_error").innerHTML ="您填写的收货人姓名过短。<em>请填写正确的收货人姓名。</em>";
			checked=false;
		}else if(tempName.length>0 && tempName.length<=30 && !(/^[A-Za-z ]{3,30}$/).test(tempName)){
			document.getElementById("address_name_tr").className ="list_error";
			document.getElementById("address_name_error").innerHTML ="填写的姓名错误。<em>请填写正确的收货人姓名,只能输入中文和字母。</em>";
			checked=false;
		}else{
			document.getElementById("address_name_tr").className ="";
			document.getElementById("address_name_error").innerHTML ="请填写收货人姓名。";
		}
		//手机号码,电话号码
		document.getElementById("address_mobile").value=document.getElementById("address_mobile").value.replace(/[ \?\&\~\^*\%\$\"\']/g,"");
		document.getElementById("address_phone0").value=document.getElementById("address_phone0").value.replace(/[ \?\&\~\^*\%\$\"\']/g,"");
		document.getElementById("address_phone1").value=document.getElementById("address_phone1").value.replace(/[ \?\&\~\^*\%\$\"\']/g,"");
		document.getElementById("address_phone2").value=document.getElementById("address_phone2").value.replace(/[ \?\&\~\^*\%\$\"\']/g,"");
		var tempMobile=document.getElementById("address_mobile").value;
		var tempPhone=document.getElementById("address_phone0").value+"-"+document.getElementById("address_phone1").value+(document.getElementById("address_phone2").value?("-"+document.getElementById("address_phone2").value):"");
		//不能都为空
		if(document.getElementById("address_mobile").value=="" && document.getElementById("address_phone0").value=="" && document.getElementById("address_phone1").value=="" && document.getElementById("address_phone2").value=="" ){
			document.getElementById("address_mobile_tr").className ="list_error";
			document.getElementById("address_phone_tr").className ="list_error exception";
			document.getElementById("address_mobile_error").innerHTML ="请填写手机或电话。<em>手机和电话号码至少填写一项</em>";
			checked=false;
		//手机验证通过时,如果电话不为空，并且验证不通过则报错
		}else if($isMobile(tempMobile)){
			if((document.getElementById("address_phone0").value!="" || document.getElementById("address_phone1").value!="" || document.getElementById("address_phone2").value!="") && !$isPhone(tempPhone)){
				document.getElementById("address_mobile_tr").className ="list_error";
				document.getElementById("address_phone_tr").className ="list_error exception";
				document.getElementById("address_mobile_error").innerHTML ="电话格式输入错误。<em>请按“区号-电话号码-分机号码”格式填写,分机可不填。</em>";
				checked=false;
			}else{
				document.getElementById("address_mobile_tr").className ="";
				document.getElementById("address_phone_tr").className ="";
				document.getElementById("address_mobile_error").innerHTML ="";
			}
		//电话验证通过时,如果手机不为空，并且验证不通过则报错
		}else if($isPhone(tempPhone)){
			if(document.getElementById("address_mobile").value!="" && !$isMobile(tempMobile)){
				document.getElementById("address_mobile_tr").className ="list_error";
				document.getElementById("address_phone_tr").className ="list_error exception";
				document.getElementById("address_mobile_error").innerHTML ="手机号码格式不正确。";
				checked=false;
			}else{
				document.getElementById("address_mobile_tr").className ="";
				document.getElementById("address_phone_tr").className ="";
				document.getElementById("address_mobile_error").innerHTML ="";
			}
		//验证都不通过时，直接报错
		}else{
			var eStr=""
			if(document.getElementById("address_mobile").value!=""){
				eStr+="手机号码格式不正确。<br/>"
			}
			if(document.getElementById("address_phone0").value!="" || document.getElementById("address_phone1").value!="" || document.getElementById("address_phone2").value!=""){
				eStr+="电话请按“区号-电话号码-分机号码”格式填写,分机可不填。<br/>"
			}
			document.getElementById("address_mobile_tr").className ="list_error";
			document.getElementById("address_phone_tr").className ="list_error exception";
			document.getElementById("address_mobile_error").innerHTML ="号码格式不正确。<em>"+eStr+"</em>";
			checked=false;
		}
		return checked;
	};
	//检查浮窗关闭操作，用户是否修改了内容，如果已经修改返回true
	function checkAddressEdit(){
		var edit=false;
		try{
			edit=(getAddressString()!=document.getElementById("address_var").value)?true:false;
		}catch(e){}
		return edit;
	}
	//根据用户输入获取编码字符串
	function getAddressString(){
		try{
			var phone=document.getElementById("address_phone0").value+"-"+document.getElementById("address_phone1").value+(document.getElementById("address_phone2").value?("-"+document.getElementById("address_phone2").value):"");
			var str= "AddrId="+escape(document.getElementById("address_id").value)+"&Uin="+escape(document.getElementById("address_uin").value)+"&PostCode="+escape(document.getElementById("address_code").value)+"&RecvName="+escape(document.getElementById("address_name").value)+"&RecvAddr="+escape(document.getElementById("address_street").value)+"&RecvPhone="+escape(phone)+"&RecvMobil="+escape(document.getElementById("address_mobile").value)+"&FRegionId="+escape(document.getElementById("address_regionId").value)+"&FAddrType="+escape(document.getElementById("address_type").value);
		}catch(e){}
		return str;
	};
};

function $formatXml(opt){
    var option={
        src:"",        //数据源路径
        template:'',    //模板内容
        contentId:"",    //jquery语法表示的用于显示商品列表的dom id
        lastCodes:"",    //最后的补齐商品的html代码
        page:false,        //是否显示分页
        pageId:"",        //jquery语法表示的用于显示分页控制条的dom id
        pageType:"full",    //分页显示的类型
        pTag:"",        //ptag标记
        firstPageId:1,    //默认显示第几页
        linkTag:"#none",
        showLength:0,    //只显示列表中的几个，如果为0的时候，显示所有
        startNum:0,    　　//从第几个开始
        interval:0,        //毫秒值，如果不为0，则定时刷新
        filter:'',        //过滤串，必须为‘{#itemCode#}==aaaaa’这种类型
		imagesType:'image',
		loadHtml:'<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle" style="font-size:13px; color:#333333; text-align:center;vertical-align: middle; " width="100%" height="100%"><img src="http://static.paipaiimg.com/assets/common/loading2.gif" /><br />数据加载中……</td></tr></table>',
        onShowed:function(obj){return true;},
        //组件内部运行数据
        data:{},        //存储数据值
        currentPage:0,    //要显示的页面
        pageCount:0,    //数据的总页数
        itemCount:0,    //数据总条数
        actionId:0,        //操作id
        content:"",        //显示列表对象
        pageBar:"",        //显示分页列表对象
        errorTag:false,     //是否有数据加载出错的情况
		isReverse:false		//是否逆序显示
    };
	$extend(option,opt);
    if(option.src==""){return;}
    option.content=$$(option.contentId);
    option.pageBar=$$(option.pageBar);
    if(window._docCache==undefined){
		window._docCache={};
	}
    if(opt.interval*1>0){
        if(!window._formatXml_interval){
            window._formatXml_intvFunc={};
            window._formatXml_interval=setInterval(function(){
                for(var key in window._formatXml_intvFunc){
                    window._formatXml_intvFunc[key]();
                }
            },opt.interval);
        };
    };
    //开始加载数据  
    getXml(option.firstPageId,option);
    function getXml(i,opt){
        //加载第i页数据
        //设置actionId
        opt.actionId=i;
        //显示loading状态
        opt.content.html(opt.loadHtml);
        //判断数据是否已经存在在数据中心，如果存在就直接显示，不加载，如果不存在就开始加载
        if(opt.data[opt.contentId.id+"_"+i]){
            opt.currentPage=parseInt(i);
            showXml(opt);
        }else{
            var dataUrl=opt.src.replace(/_2_\d+\./,"_2_" + i + ".");
            dataUrl=opt.src.replace(/_\d+\./,"_" + i + ".");
			var _showXml=function(doc){
				opt.currentPage=parseInt(doc.getElementsByTagName('currentPage')[0].firstChild.nodeValue);
				opt.data[opt.contentId.id+"_"+opt.currentPage]=doc;
				showXml(opt);
			};
            $$.ajax({
                cache:false,
                url:dataUrl,
                dataType: "xml",
                success :function(da){
                    opt.currentPage=parseInt(da.getElementsByTagName('currentPage')[0].firstChild.nodeValue);
                    opt.data[opt.contentId.id+"_"+opt.currentPage]=da;
                    showXml(opt);
                },
                error:function(da,b,er){
                    //加载失败后，转到第1页显示。如果是第一页加载出错的话就中断
                    if(i==1){
                        opt.errorTag=true;
                        if(arguments[0]+arguments[1]+arguments[2]){
                        }
                        return false;
                    }else{
                        getXml(1,opt);
                    };
                    return false;
                }
            }); 
        }
    };
    function showXml(opt){
        //检查当前要显示的页是否有数据，没有数据则说明操作混乱，不予理会该请求
        if(!opt.data[opt.contentId.id+"_"+opt.currentPage] || opt.errorTag){
            return false;
        }
        //如果actionid！=currentPage则说明是过期的内容显示请求，不予理会该请求
        if(opt.page &&opt.currentPage != opt.actionId ){
            return false;
        }
        var data=opt.data[opt.contentId.id+"_"+opt.currentPage];
        opt.currentPage=data.getElementsByTagName('currentPage')[0].firstChild.nodeValue*1;
        opt.pageCount=data.getElementsByTagName('pageCount')[0].firstChild.nodeValue*1;
        opt.itemCount=data.getElementsByTagName('itemCount')[0].firstChild.nodeValue*1;
        opt.domainId=data.getElementsByTagName('domainId')[0].firstChild.nodeValue*1;
        var ptagPageId=data.getElementsByTagName('pageId')[0].firstChild.nodeValue*1;
        var list=data.getElementsByTagName('item');
        var startNum=opt.startNum*1+opt.showLength*1;
        var hc=[];//商品列表的html代码
        for(var i=opt.startNum,len=list.length,startNum=(startNum>0)?startNum:len;(i<startNum && i<len) ;i++){
            var itemInfo={},temp=opt.template;
            for(var j=0;j<list[i].attributes.length;j++){
                itemInfo[list[i].attributes[j].name]=list[i].attributes[j].value;
            }
            var valueNodes=$$(list[i]).children();
            for(var j=0;j<valueNodes.length;j++){
                itemInfo[valueNodes[j].nodeName]=valueNodes[j].firstChild?valueNodes[j].firstChild.nodeValue:"";
            };
            itemInfo["discount"]=Math.round(parseFloat(itemInfo["newPrice"])-parseFloat(itemInfo["vouPrice"]));            //红包面值
            itemInfo["sysPtag"]=opt.pTag?opt.pTag:ptagPageId+"."+opt.domainId+"."+(parseInt(i)+1);
            itemInfo["cUrl"]=itemInfo["commodityUrl"];
            itemInfo["url"]=itemInfo["commodityUrl"]?(itemInfo["commodityUrl"]+(itemInfo["commodityUrl"].indexOf('?')==-1?"?":"&")+"PTAG="+itemInfo["sysPtag"]):"http://auction1.paipai.com/"+itemInfo["id"]+"?PTAG="+itemInfo["sysPtag"];//商品链接
            itemInfo["gradeIcon"]=$getGradeIcons({qq:itemInfo["qq"],showScore:false,score:itemInfo["userCredit"],type:"seller"});    //等级图标
            itemInfo["badEvalRate"]=(parseFloat(itemInfo["badEvalRate"])/10).toFixed(1)+"%";
            itemInfo["goodEvalRate"]=(parseFloat(itemInfo["goodEvalRate"])/10).toFixed(1)+"%";
            itemInfo["lawSuitRate"]=(parseFloat(itemInfo["lawSuitRate"])/10).toFixed(1)+"%";
			recmdReason=itemInfo["recmdReason"];
            itemInfo["costMoney"]=itemInfo["costMoney"]*1;
			itemInfo["discount"]=Math.round(parseFloat(itemInfo["newPrice"])-parseFloat(itemInfo["vouPrice"]));			//红包面值
            itemInfo["rec_title"]=recmdReason?recmdReason.split("#")[0]:"";
            itemInfo["rec_description"]=recmdReason?recmdReason.split("#")[1]:"";
            itemInfo["shopUrl"]="http://"+itemInfo["qq"]+".paipai.com/?PTAG="+itemInfo["sysPtag"];
			itemInfo["pic160x160"]=itemInfo["image"].replace(/(\.|\.\d{2,3}\x\d{2,3}\.)\jpg/,".160x160.jpg");
			itemInfo["pic120x120"]=itemInfo["image"].replace(/(\.|\.\d{2,3}\x\d{2,3}\.)\jpg/,".120x120.jpg");
			itemInfo["pic200x200"]=itemInfo["image"].replace(/(\.|\.\d{2,3}\x\d{2,3}\.)\jpg/,".200x200.jpg");
			itemInfo["pic100x100"]=itemInfo["image"].replace(/(\.|\.\d{2,3}\x\d{2,3}\.)\jpg/,".100x100.jpg");
			itemInfo["pic80x80"]=itemInfo["image"].replace(/(\.|\.\d{2,3}\x\d{2,3}\.)\jpg/,".80x80.jpg");
			itemInfo["realImage"]=itemInfo[opt.imagesType];
			itemInfo["nPrice"]=itemInfo["newPrice"]?"<ins><em class='n'>"+itemInfo["newPrice"].split(".")[0]+".</em><em class='n0'>"+itemInfo["newPrice"].split(".")[1]+"</em></ins>":"";
			itemInfo["oPrice"]=itemInfo["oldPrice"]?"<del><em class='o'>"+itemInfo["oldPrice"].split(".")[0]+".</em><em class='o0'>"+itemInfo["oldPrice"].split(".")[1]+"</em></del>":"";
			itemInfo["vPrice"]=itemInfo["vouPrice"]?"<em class='v'>"+itemInfo["vouPrice"].split(".")[0]+".</em><em class='v0'>"+itemInfo["vouPrice"].split(".")[1]+"</em>":"";
			itemInfo["aPrice"]=itemInfo["adSentence"]?"<em class='a'>"+itemInfo["adSentence"].split(".")[0]+".</em><em class='a0'>"+itemInfo["adSentence"].split(".")[1]+"</em>":"";
			itemInfo["uploadTimeSim"]=itemInfo['uploadTime']?itemInfo['uploadTime'].substr(11,5):"";
			itemInfo["price"]=$formatPrix(itemInfo['newPrice'],"x.x")[0];
			itemInfo["order"]=(i+1);
            if(opt.filter){
                var filter=opt.filter;
                for(var j in itemInfo){
                    filter=$strReplace(filter,"{#"+j+"#}","itemInfo['"+j+"']");
                };
                filter=eval(filter);
                if(!filter) continue;
            };

            for(var j in itemInfo){
				temp=temp.replace((new RegExp("{#"+j+"#}","g") ),itemInfo[j])
            }
    		hc.push(temp);
        };
        //填入商品列表的html代码
        opt.content[0].innerHTML=hc.join("")+opt.lastCodes;
        
        if(opt.interval*1>0&&!window._formatXml_intvFunc[opt.contentId.id]){
            window._formatXml_intvFunc[opt.contentId.id]=function(){
                var startNum=opt.startNum*1+opt.showLength*1,total=list.length;
                opt.startNum=startNum<total?startNum:0;
                showXml(opt);
            }
        };
		showPage(opt);
        if(!opt.onShowed(opt)){return false;};

    };
	function showPage(opt){
		if(!opt.pageId){
			return;
		}
		var dom=$$((opt.pageId.indexOf("#")>=0)?opt.pageId:("#"+opt.pageId))
		$page({
			pageCount:opt.pageCount,
			currentPage:opt.currentPage,
			domList:[dom.get()],
			type:"simple",
			action:"func",
			func:function(pid){
				getXml(pid,opt);
			}
		});
	}
}

function $shareUrl(option){
    var opt ={
        "tid":"44",//编号
        "wbg":"http://static.paipaiimg.com/assets/index/sale/invite_friend.jpg",
        'wname':escape('与好友分享'),
        "ptag":"211-3-3",
        "tp":150,
        "lft":150
    };
    for(p in option){ opt[p] = option[p]; }
    
    window.open('http://www.paipai.com/share2friends.shtml?tipsid='+opt["tid"]+'&wname='+opt["wname"]+'&wbg='+opt["wbg"]+'&ptag='+opt["ptag"],'shareWind','height=445,width=420,top='+opt["tp"]+',left='+opt["lft"]+',toolbar=no,menubar=no,scrollbars=yes, resizable=no, location=no, status=no');
    return false;
}

function $saveUrl(name,url){
	var name=name||document.title;
	var url	=url ||window.location.href;
	if (document.all){
		window.external.addFavorite(url,name);
	}else if(window.sidebar){
		window.sidebar.addPanel(name,url,"");
	};
	return false;
};

function $copyUrl(url){
	var url=url||window.location.href;
	try{
		window.clipboardData.setData('Text',url);
		alert("复制成功,请粘贴发给好友!");
	}catch(e){
		alert("您的浏览器不支持此功能，请直接复制网页地址!");
	}
};

function $initImtalk(){
	//让页面中支持imtak函数
	window.imTalk=imTalk;
	///启动qq聊天窗口,参数：目标qq，商品id，会话key，场景key
	function imTalk(uin,tid,sigT,sigP){  
		var url=(tid)?("tencent://message/?uin="+uin+"&fromuserid="+tid+"&touserid="+tid+"&unionid=72000106&WebSiteName=拍拍网&Service=19&sigT="+sigT+"&sigU="+sigP) : "tencent://message/?uin="+uin+"&fromuserid=no&touserid=no&unionid=72000106&WebSiteName=拍拍网&Service=19&sigT="+sigT+"&sigU="+sigP;
		var ua=window.navigator.userAgent.toLowerCase();
		if(ua.indexOf("msie") != -1){
			$countRd('1050.1.1');	//ie发起会话统计
			try{
				//var imObj=new ActiveXObject("TimwpDll.TimwpCheck");
				//if(parseInt(imObj.GetVersion()) < 2.1){
					//$countRd('1050.1.3');	//版本过低异常统计
					//return showError(2);
				//}
				window.location.href=url;
			}catch(e){
				$countRd('1050.1.2');	//激活控件失败异常统计
				return showError(3);
			}
		}else if(/(firefox|safari|opera|chrome)/i.test(ua)||window.opera){
			$countRd('1050.1.5');	//非ie浏览器加载统计
			window.location.href=url;
		}else{
			$countRd('1050.1.4');	//浏览器不支持临时会话功能异常统计
			showError(1);
		}
		function showError(type){
			switch(type){
				case 1:
				alert("拍拍网温馨提示：\r\n　　您使用的浏览器不支持QQ临时会话功能，请使用IE/TT浏览器访问。");
				break;
				case 2:
				alert("拍拍网温馨提示：\r\n　　您使用的QQ版本不支持临时会话功能，请您访问http://im.qq.com/下载最新版本QQ。");
				window.open("http://im.qq.com/");
				break;
				case 3:
				alert("拍拍网温馨提示：\r\n　　您没有安装QQ或您的浏览器设置禁止了QQ临时会话功能，请点击查看操作方法。");
				window.target="_top";
				window.open("http://help.paipai.com/learn/aqkj/");
				break;
			}
			return;
		};
	};
}

function $isBrowser(str){
	str=str.toLowerCase();
	var b=navigator.userAgent.toLowerCase();
	var arrB=[];
	arrB['firefox']=b.indexOf("firefox")!=-1;
	arrB['opera']=b.indexOf("opera")!=-1;
	arrB['safari']=b.indexOf("safari")!=-1;
	arrB['gecko']=!arrB['opera']&&!arrB['safari']&&b.indexOf("gecko")>-1;
	arrB['ie']=!arrB['opera']&&b.indexOf("msie")!=-1;
	arrB['ie6']=!arrB['opera']&&b.indexOf("msie 6")!=-1;
	arrB['ie7']=!arrB['opera']&&b.indexOf("msie 7")!=-1;
	return arrB[str];
};

function $remindQQ(Title,Content,CType,CPTime,CParam){
	window.get_Param2=function(){
		var sunday   =  parseInt("1",2);
		var monday   =  parseInt("11",2);
		var tuesday  =  parseInt("111",2);
		var wednesday=  parseInt("1111",2);
		var thursday =  parseInt("11111",2);
		var friday   =  parseInt("111111",2);
		var saturday =  parseInt("1111111",2);
		return (sunday|monday);
	}
	if (document.all){
		try{
			var xmlhttp=new ActiveXObject("TimwpDll.TimwpCheck");
			var  n = xmlhttp.GetHummerQQVersion();
			if (n < 2509){
				if (confirm("您未安装QQ或者当前使用的QQ版本过低，请重新安装最新版本QQ。\r\n\r\n安装成功后需要重新启动浏览器，才能正常使用。")){
					window.target="_top";
					window.open("http://im.qq.com/qq/#/");
				}
			}else{
				if (CType == 3){CParam = get_Param2();}
				var cpAdder = new ActiveXObject("QQCPHelper.CPAdder");
				var retVal = cpAdder.AddMemoNote(Title, Content, CType, CParam, CPTime,0);
			}
		}catch (e){
			if (confirm("您未安装QQ或者当前使用的QQ版本过低，请重新安装最新版本QQ。\r\n\r\n安装成功后需要重新启动浏览器，才能正常使用。")){
				window.target="_top";
				window.open("http://im.qq.com/qq/#/");
			}
		}
	}else{
		alert("您当前使用的浏览器不支持QQ备忘录提醒功能，目前QQ备忘录提醒功能仅支持IE、TT浏览器。");
		return false;
	}
}

function $remindSms(obj){
	var option={
		cid:"", //商品ID
		left:0, //当前位置离左边框的位移
		top:0	//当前位置离顶部的位移	
	};
	for(var i in obj){
		option[i]=obj[i];
	}
	window["remindSmsOption"]=option;
	
	//加载用户的超q状态,期待回调getMqqInfoCallBack
	$loadScript("http://ext.paipai.com/mqq/getmqqinfo?cid="+option.cid+"&t="+Math.random());
	window.getMqqInfoCallBack=function(obj){
		var title='';
		var template_noqq ='<div class="tipsinfobig"><p><span class="msg2-icon-info"></span>设置短信提醒需要开通超级QQ短信版！</p></div><div class="mq_box"><div class="mq_info"><p>开通超级QQ短信版，设置短信提醒，特价商品永不错过。</p><img src="http://static.paipaiimg.com/assets/index/sale/logo_mq.png" /> </div><div class="mq_vip"><dl><dt>您还可以拥有众多VIP特权：</dt><dd>·QQ升级更快</dd><dd>·24小时在线</dd><dd>·游戏送大礼</dd><dd>·音乐免费下</dd><dd>·消费享折扣</dd><dd>·手机QQ VIP</dd><dd>·任何手机都能聊QQ</dd></dl></div></div><div class="txt_op_tips"><p><a target="_blank"  id="openSQQ" href="http://service.paipai.com/cgi-bin/go?pageId=30340&domainId=108&linkId=1&url=http://member.paipai.com/cgi-bin/cross%3Furl%3Dhttp://mq.qq.com/open.shtml">现在就去开通超级QQ短信版</a></p><p>您可以开通超级QQ短信版后返回今日特价页面重新设置提醒。</p></div>';
		var template_nosms = '<div class="txt_msg_set"><p>提醒短信将会在设置的时间发送到您在超级QQ绑定的手机。</p><p class="txt_msg_setimportant">本月还可以设置 <strong>0</strong> 条短信提醒。</p><p>您在{#rtime#}可重新获得10条提醒额度。</p></div><div style="margin:15px;"><div class="tipserrorbig"><p><span class="msg2-icon-warn"></span>尊敬的用户，本月可使用的短信提醒额度已经用完。您可以选择其他提醒方式。</p></div></div><div class="txt_op_tips txt_op_pad"><p><a href="#nolink" id="remindClose">取消</a></p></div>'
		
		var template_sms = '<div class="box_tips"><p>尊敬的{#uname#}，您本月短信提醒还有 <strong>{#leftnum#}</strong> 条，<br />绑定手机{#phonenum#}，提醒短信将会在设置的时间发送到您绑定的手机。</p></div><div class="operate_settime"><p><span class="title">提醒时间：</span><span><select id="timeSelect"><option value="15">提前15分钟</option><option value="30">提前30分钟</option><option value="60">提前60分钟</option></select></span></p><p><span class="title">短信内容：</span><span>您关注的今日特价商品“{#cname#}”在<em id="timeSpan">15</em>分钟之后开始抢购，限量{#cleftnum#}件。马上去看看吧！</span></p></div><div class="txt_op_tips txt_op_pad"><p><input id="setRemind" name="" type="submit" value="设置提醒" /><a id="cancleRemind" href="#nolink">取消</a></p></div>'; 
		
		  var template_success = '<div class="tipsrightbig"><p><span class="msg2-icon-right"></span><strong>温馨提示：1个商品只能设置1次短信提醒，我们将以您最近设置的时间下发短信提醒。</strong></p></div><div class="txt_msg_tips"><p>我们将在您关注的今日特价商品“<strong>{#cname#}</strong>”开始抢购 <strong>{#remindtime#}分钟之前</strong> 发送短信到：</p><p><strong>{#phonenum#}</strong></p></div><div class="txt_op_tips"><p><input id="finishRemind" name="" type="submit" value="完　成" /></p></div>'; 
		 
		var theleft=$getPageScrollWidth()+($getWindowWidth()-399)/2;
		var thetop=$getPageScrollHeight()+($getWindowHeight()-356)/2;
		  		  
		if(obj.error=="很抱歉，使用者权限不正确，您不能继续当前操作。请您重新登录后再试。"){
			$loginFrame({
				type:'func',
				check:false,
				model:false,
				action:function(){
					$remindSms(window.remindSmsOption)
				},
				"x":theleft,
				"y":thetop
			});
			return false;
		}
		
		var nextMonth = new Date().getMonth()+1;
		if(nextMonth>11){
			nextMonth = 0; 
		}

		var hc = "";
		if(obj.leftNum==0){
			hc = template_nosms.replace(/{#rtime#}/g,(nextMonth+1)+"月1号"); 
			title ="设置短信提醒";
		}else if(obj.leftNum>0){
			hc = template_sms.replace(/{#leftnum#}/g,obj.leftNum).replace(/{#phonenum#}/g,obj.telephone).replace(/{#cname#}/g,obj.cName).replace(/{#uname#}/g,obj.nickname).replace(/{#cleftnum#}/g,obj.cNum);
			title="设置短信提醒（超级QQ短信版用户专享）";
		}else{
			hc = template_noqq;
            title="开通超级QQ短信版";
		}
		//展开浮窗 
		window.floatWindow=$floatTip({
			width:"500",
			cover:false,
            style:'stand',
			title:title,
			html:hc,
			left:window.remindSmsOption.left,
			top:window.remindSmsOption.top
		});
		
		$$("#remindClose,#cancleRemind,a[tag='closeFloat']").click(function(){
			floatWindow.close();
		});
		
		$$("#openSQQ").click(function(){
			//增加开通短信提醒按钮统计
			$countRd("1041.1.4");
		});
		
		$$("#remindClose").click(function(){
			//增加点击“取消”按钮统计
			$countRd("1041.1.5");
		});
		
		
		$$("#timeSelect").change( function() {				  
			$$("#timeSpan").text($$("#timeSelect").val());							  
  		// 这里可以写些验证代码
		}); 
		
		$$("#setRemind").click(function(){
			
			//增加成功设置提醒按钮统计
			$countRd("1041.1.6");	
			window.remainTimeSelect=$$("#timeSelect").val();
			
			//设置短信提醒，期待回调getMqqInfoCallBack
			$loadScript("http://ext.paipai.com/mqq/subscribeitem?cid="+option.cid+"&time="+remainTimeSelect);
			floatWindow.close();
			window.orderMqqRemindCallBack=function(obj){
				window.floatWindow=$floatTip({
					width:"500",
					cover:false,
					style:"stand",
					title:"设置短信提醒",
					html:template_success.replace(/{#cname#}/g,obj.cName).replace(/{#phonenum#}/g,obj.telephone).replace(/{#remindtime#}/g,remainTimeSelect),
					left:option.left,
					top:option.top
				});
				$$("#finishRemind,#remindClose,#cancleRemind,a[tag='closeFloat']").click(function(){
					floatWindow.close();
				});
			};
		});
		window.getMqqInfoCallBack="";
	};
};

function $tabChange(cid,cs,ev,n,lazy){
//容器id，当前tab头的样式名，事件(click, mouseover...), 第一次显示第几个tab，是否切换到某个tab之后再load那个tab内容里的图片(1加载，其余不加载，需在图片中处理src和rel属性)
	if(!$$("#"+cid)||n<1) return;

	var tabw = $$("#" + cid + " .tabcon"),
		tabh = $$("#" + cid + " .tabnav li"),
		tabhLen = tabh.length,
		toId = n <= tabhLen ? n-1 : tabhLen-1;
	for (var i=0;i<tabhLen;i++){ $$(tabh[i]).attr("rel",i);	}

	tabh.eq(toId).addClass(cs);
	tabw.hide().eq(toId).show();
	if(lazy===1){loadImg(n); }

	tabh.bind(ev,function(){
		var tId = $$(this).attr("rel");
		if(lazy===1){ loadImg(tId); }
		$$(tabh[toId]).removeClass(cs);
		$$(tabw[toId]).hide();
		$$(tabh[tId]).addClass(cs);
		$$(tabw[tId]).show();
		toId = tId;
	});

	function loadImg(c){
		$$(tabw[c]).find("img").each(function(){
			if($$(this).attr("src")=="") {
				$$(this).attr("src",$$(this).attr("rel")); 
				$$(this).css("background-image","none"); 
			}
		});
	}

}

function $remindTime(){
	//根据setRemind标记初始化抢购提醒功能	
	//<div tag="setRemind" cid="0E0A632F00000000000E38CC00001067" id="setmsg" cname="商品一" remindtime="2008-08-09 05:21:00" style="position:absolute;top:456px;right:8px;_right:18px;"></div>
	var s='<div class="itemtitle">到点提醒我<span>▼</span></div><div class="openset h" tag="setRemind_menu"><h6>设置提醒<span>▲</span></h6><ul><li cid="{#cid#}" tag="setRemind_sms"><img  src="http://pics.paipai.com/common/icon/mq.png" /><a href="#nolink">短信提醒</a></li><li cid="{#cid#}" cname="{#cname#}" remindtime="{#remindtime#}" tag="setRemind_qq"><img src="http://pics.paipai.com/common/icon/mark.png" /><a href="#nolink">QQ提醒</a></li></ul></div>';	 
	
	
	$$("div[tag='setRemind']").each(function(){
		
		var cid=$$(this).attr("cid");
		var cname=$$(this).attr("cname");
		var remindtime=$$(this).attr("remindtime"); 
		
		$$(this).html(s.replace(/{#cid#}/g,cid).replace(/{#cname#}/g,cname).replace(/{#remindtime#}/g,remindtime));
		$$(this).find("div:first").mouseover(function(){
			$$("div[tag='setRemind_menu']").addClass("h");
			$$(this).next("div").removeClass("h");
		});
		$$(this).find("div:first").mouseout(function(){
			$$(this).parent().next("div").addClass("h");
		});
		$$("div[tag='setRemind_menu']").mouseover(function(){
			$$(this).removeClass("h");															
	    });
		$$("div[tag='setRemind_menu']").mouseout(function(){
			$$(this).addClass("h");															
	    });
		//短信提醒
		$$(this).find("li[tag='setRemind_sms']").click(function(){
                            
                           //增加短信提醒按钮统计
			$countRd("1041.1.3");	

			var thecid=$$(this).attr("cid");
			$$("div[tag='setRemind_menu']").addClass("h");
			$$(this).parent().removeClass("h"); 
	
			$remindSms({cid:thecid}); 	 		
		}); 
		//QQ提醒
		$$(this).find("li[tag='setRemind_qq']").click(function(){
                         
                           //增加QQ提醒按钮统计
			$countRd("1041.1.2");
 
			var theCid=$$(this).attr("cid");
			var theCname=$$(this).attr("cname");
			var theTime=$$(this).attr("remindtime");
			//时间格式			
			//2008-08-09 05:21:00
			//调用QQ备忘接口
			var arrTemp=theTime.split(" ");
			var arrDate=arrTemp[0].split("-");
			var arrTime=arrTemp[1].split(":");
			var d=new Date(arrDate[0],arrDate[1]*1-1,arrDate[2],arrTime[0],arrTime[1]*1-5);
			var newTime=$formatDate(d,"YYYY-MM-DD hh:ii");
			var content='亲爱的QQ用户：您关注的“今日特价”商品“'+theCname+'”将在“'+theTime.substr(11,5)+'”准时开始抢购，点击下面地址进入抢购页面：http://auction2.paipai.com/'+theCid+'?PTAG=40026.2.3';
			$remindQQ(theCname,content,2,newTime,0);
		});
	});
};

function $displayShow(ids){
	$display(ids,'');
};

function $animateFloat(obj){
	//设置一个动画移动的浮层，可展开，可收起（从指定大小，坐标变化为指定大小、坐标，执行完后自动关闭）
	var option={
		startY:0,
		startX:0,
		startH:0,
		startW:0,
		endY:0,
		endX:0,
		endH:0,
		endW:0,
		speed:400,
		callBack:function(){return true;}
	}
	for(var i in obj){
		option[i]=obj[i];
	}
	if(!window._animateFloatHandle){
		var d=document.createElement("div");
		d.id="animateDiv";
		d.style.position="absolute";
		d.style.zIndex=500;
		d.style.background="#ffffff";
		d.style.border="1px solid #666666";
		document.body.appendChild(d);
		window._animateFloatHandle=document.getElementById("animateDiv");
	}
	var d=_animateFloatHandle;
	d.style.height=option.startH+"px";
	d.style.width=option.startW+"px";
	d.style.top=option.startY+"px";
	d.style.left=option.startX+"px";
	$$(d).show();
	$$(d).animate(
		{
			"left":option.endX+"px",
			"top":option.endY+"px",
			"height":option.endH+"px",
			"width":option.endW+"px"
		},
		option.speed,"",
		function(){
			$$(this).hide();
			return option.callBack();
		}
	);
}

function $getAbsoluteTop(dom){
//取dom对象与页面顶部的绝对偏移
	if(!dom){return null;}
	var offsetTop=dom.offsetTop;
	while(dom=dom.offsetParent){
		offsetTop+=dom.offsetTop;
	}
	return offsetTop;
}

function $loadImagesByScroll(offsetH){
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
		$scroll({height:i,data:loadList[i],func:loadImg});
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

function $execFuncByScroll(obj){
//根据页面滚动状态按需执行js函数
	//初始化要加载的内容
	if(!window._scriptExecMap){
		window._scriptExecMap={
			dCount:0,
			body_cache:document.body,
			doe_cache:document.compatMode=='BackCompat'?body_cache:document.documentElement,
			funcList:[]
		};
	}
	if(obj){
		var _o=window._scriptExecMap;
		(_o.funcList[obj.height])?_o.funcList[obj.height].push(obj.func):_o.funcList[obj.height]=[obj.func];
		_o.dCount++;
	}
	
	var _o=window._scriptExecMap;
	//判断是否需要继续监控	获取当前页面滚动的距离  可见高度+已经滚动的高度
	if(_o.dCount<1){return;}
	var offsetH=(window.MessageEvent&&!navigator.userAgent.toLowerCase().indexOf('firefox')==-1)?_o.body_cache.scrollTop:_o.doe_cache.scrollTop;//已经滚动的高度
	var visioH=offsetH+_o.doe_cache.clientHeight;
	for(var i in _o.funcList){
		if(visioH>i){
			for(var l=0;l<_o.funcList[i].length;l++){
                   	   setTimeout(_o.funcList[i][l],0);

			}
			delete _o.funcList[i];
			_o.dCount--;
		}
	}
	setTimeout($execFuncByScroll,100);
}

function $strSubGB(str,start,len,flag){
	//进行字符长度验证，如果超过长度则返回截断后的字符串
	var total = $strLenGB(str);
	if(total > (len-start)){
		var flag=flag||"";
		var strTemp=str.replace(/[\u00FF-\uFFFF]/g, "@-").substr(start,len);
		var subLen =strTemp.match(/@-/g)?strTemp.match(/@-/g).length:0;		
		return str.substring(0,len-subLen)+flag;
	}
	return str;
}

function $arraySelect(arr, iterator){
    var res = []; 
    $$.each(arr, function(index, value){
        if (iterator(value, index)){
	    res.push(value);
	}
    }); 
    return res; 
}

function $addClass(ids,cName){
	$setClass(ids,cName,"add");	
};

function $countRd(rd){
	$loadScript($makeRd(rd),"_PP_core_countRd_script");
	//用于uv统计,参数u，fu，resolution无意义但不能为空
	$loadScript("http://service.paipai.com/cgi-bin/ping?u=http://jsrd.paipai.com&fu=http://jsrd.paipai.com%3FPTAG%3D"+rd+"&resolution=1024*768","_PP_core_countRd_Ping_script");
}

function $delClass(ids,cName){	
	$setClass(ids,cName,"remove");
};

function $getCookie(name){
//读取COOKIE
	var reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"),
		val=document.cookie.match(reg);//如果获取不到会提示null
	return val?unescape(val[2]):null;
};

function $float(obj){
	//显示浮窗,支持各种形态
	var option={
		id:"",	//	唯一id
		title:"",
		html:"",
		left:"",
		top:"",
		width:"400",
		showClose:true,
		height:"",
		leaver:2,	//浮层等级
		fix:false,	//是否固定居中随屏幕滚动，如果为true则left和top无效
		style:"stand",	//stand\none\poptip
		autoResize:false,	//自动调整高度
		cover:true,	//显示覆盖背景
		cssUrl:"http://static.paipaiimg.com/module/module_box.css",
		onInit:function(o){return true;},//显示完成事件
		onClose:function(o){return true;}	//关闭事件
	};
	for(var i in obj)option[i]=obj[i];
	//初始化
	window._PP_core_float_data?"":floatInit(option.cssUrl);
	//获得唯一标记
	window._PP_core_float_data.zIndex++;
	option.id=option.id?option.id:window._PP_core_float_data.zIndex;
	//关闭浮层的方法
	option.close=closeFloat;
	//销毁浮层的方法
	option.destruct=destructFloat;
	//关闭同等级或者低等级的浮层
	option.closeOther=closeOther;
	//保持浮层随屏幕滚动
	option.keepBoxFix=keepBoxFix;
	//调整浮层大小
	option.resize=resize;
	//显示浮层内容
	option.show=showBox;
	//执行操作
	option.closeOther();
	option.show();
	window._PP_core_float_data.list.push(option);
	return option;
	//关闭浮层的方法
	function closeFloat(){
		if(!option.onClose(option)){return;}
		//关闭兄弟和子浮层
		option.closeOther();
		option.destruct();
		
	}
	//销毁浮层的方法
	function destructFloat(){
		//关闭低级浮层
		this.cover?window._PP_core_float_data.closeCover():"";
		if(this.sizeTimer){
			clearInterval(this.sizeTimer);
		}
		if(this.fixTimer){
			clearInterval(this.fixTimer);
		}
		this.boxHandel?document.body.removeChild(this.boxHandel):"";
		this.boxHandel=null;
		for(var i=0;i<window._PP_core_float_data.list.length;i++){
			if(!window._PP_core_float_data.list[i]){continue;}
			if(this.id==window._PP_core_float_data.list[i].id){
				window._PP_core_float_data.list[i]=null;
			}
		}
	}
	//关闭同等级或者低等级的浮层
	function closeOther(){
		for(var i=0;i<window._PP_core_float_data.list.length;i++){
			if(!window._PP_core_float_data.list[i]){continue;}
			if(window._PP_core_float_data.list[i].leaver>=this.leaver && this.id!=window._PP_core_float_data.list[i].id){
				window._PP_core_float_data.list[i].destruct();
			}
		}
	}
	//显示浮层内容
	function showBox(){
		this.cover?window._PP_core_float_data.showCover():"";
		var c=document.createElement("div");
		c.id='floatBox_'+this.id;
		this.boxId='floatBox_'+this.id;
		c.style.position="absolute";
		//根据样式输出不同模板，有标题和关闭按钮的
		if(option.style=="stand"){
			c.className="module_box_normal";
			c.innerHTML='<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;display:none;border:none;" id="float_iframe_'+this.id+'"></iframe><div class="box_title"><h4>'+this.title+'</h4><a href="javascript:;" style="display:'+(this.showClose?'':'none')+';"  class="bt_close" id="float_closer_'+this.id+'"></a></div><div class="box_content">'+this.html+'</div>';
		}
		//根据样式输出不同模板,无任何样式的时候输出一个空的div
		if(option.style==""){
			c.className="module_box_normal";
			c.innerHTML='<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;display:none;border:none;" id="float_iframe_'+this.id+'"></iframe><div class="box_content">'+this.html+'</div>';
		}
		if(option.style=="none"){
			//完全空白，不含样式的模板
			c.className="";
			c.innerHTML='<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;display:none;border:none;" id="float_iframe_'+this.id+'"></iframe><div class="box_content">'+this.html+'</div>';
		}
		document.body.appendChild(c);
		this.boxHandel=document.getElementById('floatBox_'+this.id);
		this.boxIframeHandel=document.getElementById('float_iframe_'+this.id);
		this.boxCloseHandel=document.getElementById('float_closer_'+this.id);
		this.height?(this.boxHandel.style.height=(option.height=="auto"?option.height:option.height+"px")):"";
		this.width?(this.boxHandel.style.width=(option.width=="auto"?option.width:option.width+"px")):"";
		this.boxHandel.style.zIndex=window._PP_core_float_data.zIndex;
		this.sw=parseInt(this.boxHandel.offsetWidth);//窗口可见宽度
		this.sh=parseInt(this.boxHandel.offsetHeight);//窗口可见高度
		//窗口定位，如果没有指定坐标则居中
		var p=[0,0];
		p[0]=parseInt(this.left?this.left:($getPageScrollWidth()+($getWindowWidth()-this.sw)/2));
		p[1]=parseInt(this.top?this.top:($getPageScrollHeight()+($getWindowHeight()-this.sh)/2));
		//如果超出屏幕则自动移入
		//超出右侧
		(p[0]+this.sw)>($getPageScrollWidth()+$getWindowWidth())?(p[0]=$getPageScrollWidth()+$getWindowWidth()-this.sw-10):"";
		//超出底部
		(p[1]+this.sh)>($getPageScrollHeight()+$getWindowHeight())?(p[1]=$getPageScrollHeight()+$getWindowHeight()-this.sh-10):"";

		//超出顶部
		p[1]<$getPageScrollHeight()?p[1]=$getPageScrollHeight():"";
		//超出左侧
		p[0]<$getPageScrollWidth()?p[0]=$getPageScrollWidth():"";
		//调整iframe的高度与浮窗一样大小
		this.boxIframeHandel.height=this.sh+"px";
		this.boxIframeHandel.width=this.sw+"px";
		//显示iframe坐标
		this.boxHandel.style.left=p[0]+"px";
		this.boxHandel.style.top=p[1]+"px";
		var _this=this;
		this.boxCloseHandel?this.boxCloseHandel.onclick=function(){_this.close();}:"";
		this.keepBoxFix()
		if(!this.onInit()){return;}
	}
	//调整浮层大小
	function resize(w,h){
		this.sw=w;//窗口可见宽度
		this.sh=h;//窗口可见高度
		this.boxHandel.style.height=this.sh+"px";
		this.boxHandel.style.width=this.sw+"px";
		this.boxIframeHandel.height=this.sh+"px";
		this.boxIframeHandel.width=this.sw+"px";
	}
	//保持浮层随屏幕滚动
	function keepBoxFix(){
		if(this.fix){
			if($isBrowser("ie6")){
			//if(navigator.appVersion.split(";")[1].replace(/[ ]/g,"")=="MSIE6.0"){
				var _this=this;
				this.fixTimer=setInterval(function(){
					_this.boxHandel.style.left=($getPageScrollWidth()+($getWindowWidth()-_this.sw)/2)+"px";
					_this.boxHandel.style.top=($getPageScrollHeight()+($getWindowHeight()-_this.sh)/2)+"px";
				},30);
			}else{
				this.boxHandel.style.position="fixed";
				this.boxHandel.style.left=($getWindowWidth()-this.sw)/2+"px";
				this.boxHandel.style.top=($getWindowHeight()-this.sh)/2+"px";
			}
		}
	};
	//当内容的发生变化时自动调整窗口高度
	function autoResize(){
		if(this.autoResize){
			var _this=this;
			this.sizeTimer=setInterval(function(){
				this.sw=this.boxHandel.offsetWidth;//窗口可见宽度
				this.sh=this.boxHandel.offsetHeight;//窗口可见高度
				//调整iframe的高度与浮窗一样大小
				this.boxIframeHandel.height=this.sh+"px";
				this.boxIframeHandel.width=this.sw+"px";
			},50);
		}
	};
	//初始化全局浮层cache
	function floatInit(cssUrl){
		//加载css,如果cssUrl为空则不异步加载样式
		if (cssUrl){
			$loadCss(cssUrl);
		}
		window._PP_core_float_data={};
		//起始层号从255开始
		window._PP_core_float_data.zIndex=255;
		//浮层库列表
		window._PP_core_float_data.list=[];
		//增加一个覆盖的半透明浮层
		createCover();
		_PP_core_float_data.showCover=showCover;
		_PP_core_float_data.closeCover=closeCover;
		//创建浮层对象
		function createCover(){
			var c=document.createElement("div");
			c.id="floatCover";
			with(c.style){
				display="none";
				width="0px";
				height="0px";
				backgroundColor ="#cccccc";
				zIndex=250;
				position="fixed";
				hasLayout=-1;
				left="0px";
				top="0px";
				filter="alpha(opacity=50);";
				opacity="0.5";
			}
			document.body.appendChild(c);
			if($isBrowser("ie6")){
			//if(navigator.appVersion.split(";")[1].replace(/[ ]/g,"")=="MSIE6.0"){
				c.innerHTML='<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;border:none;" id="floatCover_iframe"></iframe>';
				c.style.position="absolute";
			}
			window._PP_core_float_data.cover=document.getElementById("floatCover");
			window._PP_core_float_data.coverIframe=document.getElementById("floatCover_iframe");
			window._PP_core_float_data.coverIsShow=false;
			window._PP_core_float_data.coverSize=[0,0];
		}
		//显示灰色浮层背景对象
		function showCover(){
			window._PP_core_float_data.cover.style.display="block";
			window._PP_core_float_data.coverIsShow=true;
			keepCoverShow();
			window._PP_core_float_data.coverTimer=setInterval(function(){
				keepCoverShow();
			},50);
			//保持浮层的全屏幕覆盖尺寸
			function keepCoverShow(){
				var _d=window._PP_core_float_data
				if(_d.coverIsShow){
					var ch=$getContentHeight(),wh=$getWindowHeight(),cw=$getContentWidth(),ww=$getWindowWidth();
					var newSize=[wh,ww];
					if($isBrowser("ie6")){
					//if(navigator.appVersion.split(";")[1].replace(/[ ]/g,"")=="MSIE6.0"){
						_d.cover.style.top=$getPageScrollHeight()+"px";
						newSize[0]+=600;
					};
					if(newSize.toString()!=window._PP_core_float_data.coverSize.toString()){

						_d.coverSize=newSize;
						_d.cover.style.height=newSize[0].toFixed(0)+"px";
						_d.cover.style.width=newSize[1].toFixed(0)+"px";
						if(_d.coverIframe){
							_d.coverIframe.style.height=newSize[0].toFixed(0)+"px";
							_d.coverIframe.style.width=newSize[1].toFixed(0)+"px";
						}
					}
				}
			}
		}
		//关闭灰色浮层背景对象
		function closeCover(){
			window._PP_core_float_data.cover.style.display="none";
			window._PP_core_float_data.coverIsShow=false;
			clearInterval(window._PP_core_float_data.coverTimer);
		}
	};
};

function $getUin(){
	//返回当前登陆用户的QQ号码 ,没有则返回""
	var uin=$getCookie("uin");
	return uin?uin.replace("o0",""):"";
};

function $getNick(){
	//获取COOKIES中保存的用户昵称 
	var nick=$getCookie("hs");
	return nick?nick.replace(/[0,1]\/\d+\/[0,1]\//,""):'';
};

function $isLogin(){
	return ($getCookie("skey") && $getCookie("uin"))?true:false;
};

function $arrayEach(arr,func){
    return $$.each(arr,func);
}

function $getGradeName(opt){
	var option={
		score:0,
		type:"buyer",
		buyer:{
			gradeList:[0,1,5,11,21,41,101,201,501,1001,2001,5001,10001,30001,50001,80001,100001,150001,200001,250001,300001],
			gradeName:["","一星买家","二星买家","三星买家","四星买家","五星买家","一钻买家","二钻买家","三钻买家","四钻买家","五钻买家","一银冠买家","二银冠买家","三银冠买家","四银冠买家","五银冠买家","一金冠买家","二金冠买家","三金冠买家","四金冠买家","五金冠卖家"]
		},
		seller:{
			gradeList:[0,1,5,11,21,41,101,301,1001,3001,5001,10001,20001,50001,100001,200001,500001,1000001,2000001,5000001,10000001,1900000000,1901000000,1902000000],
			gradeName:["","一星卖家","二星卖家","三星卖家","四星卖家","五星卖家","一钻卖家","二钻卖家","三钻卖家","四钻卖家","五钻卖家","一银冠卖家","二银冠卖家","三银冠卖家","四银冠卖家","五银冠卖家","一金冠卖家","二金冠卖家","三金冠卖家","四金冠卖家","五金冠卖家","","",""]
		}
	};
	
	for(var i in opt){
		option[i]=opt[i];
	}
	
	//如果用户类型不对也什么不做  ,如果积分为空则什么也不做
	if(option.score.toString()=="" || !option[option.type]){
		return "";	
	}
	
	//参考信用的地方可能会出现字符串的情况
	if(option.type=="frefer" && option.score!="" && !parseInt(option.score)){	//不为空并且不是数字的话就原样返回
		option.score=option.score.replace(/[^\d]/g,"");
		if(option.score==""){
			return option.score;
		}
	}
	
	var _grade=0;
	var _range=option[option.type].gradeList;
	for(var i=0;i<_range.length;i++){
		//溢出最大范围时等级为最大
		if(option.score>=_range[_range.length-1]){
			_grade=_range.length-1;
			break;
		}
		//范围内的等级处理
		if(option.score>=_range[i] && option.score<_range[i+1]){
			_grade=i;
			break;
		}
	}
	return option[option.type].gradeName[_grade];
};

function $isMail(v){
	return /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(v)
};

function $setClass(ids,cName,kind){	
	if(typeof(ids)=="string"){
		var arrDom=ids.split(",");
		for(var i=0,len=arrDom.length;i<len;i++){
			setClass($id(arrDom[i]),cName,kind);
		}
	}else{
		setClass(ids,cName,kind);
	};
	
	function setClass(obj,cName,kind){
		var oldName=obj.className,
			arrName=oldName.split(' ');
		if(kind=="add"){
			if(!$hasClass(oldName,cName)){
				arrName.push(cName);
				obj.className=arrName.join(' ');
			}
		}else if(kind=="remove"){
			var newName=[];
			for(var i=0,len=arrName.length;i<len;i++){
				if(cName!=arrName[i]&&' '!=arrName[i]){
					newName.push(arrName[i]);
				}
			};
			obj.className=newName.join(' ');
		}
	}	
};

function $formatJson(str, data){
	/* 模板替换 */
	var _formatJson_cache = window._formatJson_cache||{};
	var fn = !/\W/.test(str) ?
	  _formatJson_cache[str] = _formatJson_cache[str] ||
		$formatJson(document.getElementById(str).innerHTML) :
	  new Function("obj",
		"var p=[],print=function(){p.push.apply(p,arguments);};" +
		"with(obj){p.push('" +
		str
		  .replace(/[\r\t\n]/g, " ")
		  .split("<%").join("\t")
		  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
		  .replace(/\t=(.*?)%>/g, "',$1,'")
		  .split("\t").join("');")
		  .split("%>").join("p.push('")
		  .split("\r").join("\\'")
	  + "');}return p.join('');");
	window._formatJson_cache=_formatJson_cache;
	return data ? fn( data ) : fn;
};

function $getTarget(e) {
    var    e=window.event||e;
    return    e.srcElement||e.target;
}

function $page(opt){
	var option={
		keyId:Math.random(),	//当前对象的唯一标记码
		pageCount:0,	//总页码
		currentPage:0,	//当前页码
		itemCount:0,	//总记录条数
		more:false,	//是否有下五页存在
		domList:[],		//内容输出区域的id列表，jquery语法
		type:"full",	//控制条样式
		action:"url",	//点击分页的操作类型：url、func
		url:"http://www.paipai.com/?pid={#pageId#}",	//链接地址格式模板，当action=url时才有效，页码标签{#pageId#}
		func:function(pageId,opt){return true;},		//点击链接时的处理函数，参数为页码id和对象本身，当action=func时有效
		onInit:function(pageId,opt){return true;}	//初始化完成后的回调函数，
	};
	for(var i in opt){
		option[i]=opt[i];
	}
	//标准风格
	var standStyle=['','{#goto#}<a href="#nolink" pageTag="go" pageId="{#pageId#}" >{#pageId#}</a>{#goto/#}	{#current#}<span class="page-this">{#pageId#}</span>{#current/#}{#hide#}<span class="page-break">...</span>{#hide/#}{#next#}<a href="#nolink" class="page-next" pageTag="go" pageId="{#pageId#}"  >下一页</a>{#next/#}{#_next#}<span class="page-end">下一页</span>{#_next/#}{#previou#}<a href="#nolink" pageTag="go" pageId="{#pageId#}" class="page-prev">上一页</a>{#previou/#}{#_previou#}<span class="page-start">上一页</span>{#_previou/#}{#first#}{#first/#}{#_first#}{#_first/#}{#last#}{#last/#}{#_last#}{#_last/#}{#more#}<span class="page-break">...</span>{#more/#}{#_more#}{#_more/#}'];
	var templateList={
		full:[standStyle[0],standStyle[1],'<div class="paginator">{#previousPage#}{#pageList#}{#morePage#}{#nextPage#}<span class="page-skip"> 到第<input type="text" name="inputItem" pageTag="input" value="{#currentPageId#}"  maxlength="3" {#debugtag#} />页<button pageTag="jumper" value="go">确定</button></span></div>'],
		simple:[standStyle[0],standStyle[1],'<div class="paginator">{#previousPage#}{#pageList#}{#morePage#}{#nextPage#}</div>'],
		shortSimple:[standStyle[0],standStyle[1],'<div class="paginator">{#previousPage#}{#shortPageList#}{#morePage#}{#nextPage#}</div>'],
		miniSimple:[standStyle[0],standStyle[1],'<div class="paginator">{#previousPage#}{#miniPageList#}{#nextPage#}</div>']
	};
	
	var template=templateList[option.type][0]+templateList[option.type][1]+templateList[option.type][2];
	var pageCount=parseInt(option.pageCount);
	var currentPage=parseInt(option.currentPage);
	var itemCount=parseInt(option.itemCount);
	//错误参数情况处理
	currentPage=(currentPage>pageCount)?pageCount:currentPage;
	//模板组
	var pt={
		next:"",		//下一页的模板
		_next:"",	//无效下一页的模板
		previou:"",	//上一页的模板
		_previou:"",//无效上一页的模板
		first:"",		//首页的模板
		_first:"",	//无效首页的模板
		last:"",		//末页的模板
		_last:"",	//无效末页的模板
		more:"",		//下5页的模板
		_more:"",	//无效下5页的模板
		goto:"",			//普通页码列表的模板
		current:"",		//当前页码列表的模板
		hide:""		//省略区域的模板
	};
	//从模板中取出所有的子模板
	for(var i in pt){
		var r = (new RegExp("{#"+i+"#}(.*){#"+i+"/#}","ig")).exec(template);
		pt[i] = (r)?RegExp.$1:"";
	}
	//下一页的代码生成
	pt.nextPageHtml=(currentPage<pageCount)?(pt.next.replace(/{#pageId#}/g,(currentPage+1))):(pt._next);
	//上一页的代码生成
	pt.previousPageHtml=(currentPage>1)?(pt.previou.replace(/{#pageId#}/g,(currentPage-1))):(pt._previou);
	//首页的代码生成
	pt.firstPageHtml=(currentPage>1)?(pt.first.replace(/{#pageId#}/g,1)):(pt._first);

	//末页的代码生成
	pt.lastPageHtml=(currentPage<pageCount)?(pt.last.replace(/{#pageId#}/g,pageCount)):(pt._last);
	//下5页的代码生成
	pt.morePageHtml=(option.more)?(pt.more.replace(/{#pageId#}/g,(pageCount+1))):(pt._more);
	//页码列表
	pt.pagelistHtml="";
	//短页面列表
	pt.shortPageListHtml="";
	//mini列表
	pt.miniPageListHtml="<span>"+currentPage+"/"+pageCount+"</span>"
	//标准页码输出
	//10页之内直接输出所有页码
	if(pageCount<=10){
		for(var i=1;i<=pageCount;i++){
			pt.pagelistHtml+=(i==currentPage)?(pt.current.replace(/{#pageId#}/g,i)):(pt.goto.replace(/{#pageId#}/g,i));
		}
	}else{
		var prePage=currentPage-3;	//连续页码的起点
		var frePage=currentPage+3;	//连续页码的终点
		prePage=(prePage<=3)?1:prePage;
		frePage=(frePage>pageCount-3)?pageCount:frePage;
		//特殊情况处理，前6页的时候，就多显示一些页码
		if(currentPage<=6){
			frePage=8
		}
		//判断是否需要输出第一页及省略号,当前页跟第一页相差6页就输出
		pt.pagelistHtml+=(currentPage>6)?(pt.goto.replace(/{#pageId#}/g,1)+pt.hide):"";
		for(i=prePage;i<=frePage;i++){
			pt.pagelistHtml += (i==currentPage)?(pt.current.replace(/{#pageId#}/g,i)):(pt.goto.replace(/{#pageId#}/g,i));
		}
		//判断是否需要输出省略号及最后一页，当前页跟最后一页相差6页就输出
		pt.pagelistHtml += (currentPage<=pageCount-6)?(pt.hide + pt.goto.replace(/{#pageId#}/g,pageCount)):"";
	}
	//简短页码输出
	if(pageCount<=8){
		for(var i=1;i<=pageCount;i++){
			pt.shortPageListHtml+=(i==currentPage)?(pt.current.replace(/{#pageId#}/g,i)):(pt.goto.replace(/{#pageId#}/g,i));
		}
	}else{
		var prePage=currentPage-2;	//连续页码的起点
		var frePage=currentPage+2;	//连续页码的终点
		prePage=(prePage<=2)?1:prePage;
		frePage=(frePage>pageCount-2)?pageCount:frePage;
		//特殊情况处理，前4页的时候，就多显示一些页码
		if(currentPage<=4){
			frePage=6;
		}
		//判断是否需要输出第一页及省略号,当前页跟第一页相差6页就输出
		pt.shortPageListHtml+=(currentPage>4)?(pt.goto.replace(/{#pageId#}/g,1)+pt.hide):"";
		for(i=prePage;i<=frePage;i++){
			pt.shortPageListHtml += (i==currentPage)?(pt.current.replace(/{#pageId#}/g,i)):(pt.goto.replace(/{#pageId#}/g,i));
		}
		//判断是否需要输出省略号及最后一页，当前页跟最后一页相差6页就输出
		pt.shortPageListHtml += (currentPage<=pageCount-4)?(pt.hide + pt.goto.replace(/{#pageId#}/g,pageCount)):"";
	}
	//显示更多模式的情况下，直接列出所有列表
	if(option.more){
		//标准页码输出
		pt.pagelistHtml="";
		for(var i=1;i<=pageCount;i++){
			pt.pagelistHtml+=(i==currentPage)?(pt.current.replace(/{#pageId#}/g,i)):(pt.goto.replace(/{#pageId#}/g,i));
		}
		//简短页码输出
		pt.shortPageListHtml=pt.pagelistHtml;
	}
	
	//清除模板区代码、当前页码、总页码数、记录总条数、首页、上一页、下一页、末页、页码列表、下5页标记
	template=templateList[option.type][2].
			 replace(/{#currentPageId#}/g,currentPage).
			 replace(/{#pageCountNum#}/g,pageCount).
			 replace(/{#itemCountNum#}/g,itemCount).
			 replace(/{#firstPage#}/g,pt.firstPageHtml).
			 replace(/{#previousPage#}/g,pt.previousPageHtml).
			 replace(/{#nextPage#}/g,pt.nextPageHtml).
			 replace(/{#lastPage#}/g,pt.lastPageHtml).
			 replace(/{#pageList#}/g,pt.pagelistHtml).
			 replace(/{#shortPageList#}/g,pt.shortPageListHtml).
			 replace(/{#morePage#}/g,pt.morePageHtml).
			 replace(/{#miniPageList#}/g,pt.miniPageListHtml);
	
	//准备工作：把所有要操作的dom对象压入列表
	var frameList=[];	//最外部的div框dom列表
	var inputList=[];	//输入页码的文本框dom列表
	var buttomList=[];	//跳转按钮的dom列表
	var linkList=[];	//页码链接的dom列表
	//option.domList是一个很不稳定的变量（非常奇怪）,一旦操作就会不断的增长，所以转存到新的变量中，顺便清理掉无效的dom
	frameList=frameList.concat(getItemFromArray(option.domList));
	function getItemFromArray(arr){
		var array=[];
		for(var k=0;k<arr.length;k++){
			if(arr[k].length>0){
				array=array.concat(getItemFromArray(arr[k]));
			}else{
				array.push(arr[k]);
			}
		}
		return array;
	}
	var k=frameList.length;
	for(var i=0;i<frameList.length;i++){
		try{
			//填充代码、开始处理所有的操作对象上的方法
			frameList[i].innerHTML=template.replace(/{#debugtag#}/g,i);
			//获取文本框dom列表
			var temp=frameList[i].getElementsByTagName("input");
			for(var j=0;j<temp.length;j++){
				if(temp[j].getAttribute("pageTag")=="input"){
					inputList.push(temp[j]);
				}
			}
			//获取确定按钮的dom列表
			var temp=frameList[i].getElementsByTagName("button");
			for(var j=0;j<temp.length;j++){
				if(temp[j].getAttribute("pageTag")=="jumper"){
					buttomList.push(temp[j]);
				}
			}
			//获取页码链接的dom列表
			var temp=frameList[i].getElementsByTagName("a");
			for(var j=0;j<temp.length;j++){
				if(temp[j].getAttribute("pageTag")=="go"){
					linkList.push(temp[j]);
				}
			}
		}catch(e){
		}
	}
	//事件绑定
	//绑定文本框的相关blur,keydown事件
	for(var i=0;i<inputList.length;i++){
		inputList[i].onblur=function(){
			this.value=this.value.replace(/[^0-9]/g,'');
			if(this.value>pageCount || this.value<1){
				this.value="";
			}
			for(var j=0;j<inputList.length;j++){
				inputList[j].value=this.value;
			}
		};
		inputList[i].onfocus=function(){
			this.select();
		};
		inputList[i].onkeydown=function(e){
                        var e = window.event||e;
			if(e.keyCode!=13){
				return;
			}
			this.onblur();
			buttomList[0].onclick();
		};
	}
	//绑定确定按钮事件
	for(var i=0;i<buttomList.length;i++){
		buttomList[i].onclick=function(){
			var input=(this.parentElement||this.parentNode).getElementsByTagName("input")[0];
			var goPage=parseInt(input.value);
			input.onblur();
			if(goPage<1 || !goPage){
				input.focus();
				return;
			}else{
				goto(goPage,option);
			}
		};
	}
	//绑定链接上的事件
	for(var i=0;i<linkList.length;i++){
		if(option.action=="url"){
			linkList[i].href=option.url.replace("{#pageId#}",linkList[i].getAttribute("pageId"));
		}else{
			linkList[i].onclick=function(){
				goto(this.getAttribute("pageId"),option);
			};
		}
	}
	//跳转操作
	goto=function(pageId,opt){
		if(opt.action=="url"){
			location.href=opt.url.replace("{#pageId#}",pageId);
		}
		if(opt.action=="func"){
			return opt.func(pageId,opt);
		}
		return false;
	};
	option.onInit();
};

function $stockSelector(obj){
	//库存属性
	var option={
		stockStr:"",		//库存配置串
		stockItems:"",		//所有库存属性的对象列表
		css_disable:"disable",	//禁止选择元素时的样式
		css_select:"select",		//选中元素的样式
		checkedItems:"",	//系统参数，不可覆盖，表当前选中的属性
		checkedStr:"",	//选择结果编码串
		onCheckSuccess:function(obj){return true;},	//选择状态检查成功
		onCheckFail:function(obj){return true;},	//选择状态检查不合格
		onSelectChange:function(obj){return true;},	//当选择状态变更时的事件
		onSelectReady:function(obj){return true;},	//完整选择属性的事件
		onSelectNotReady:function(obj){return true;}	//未完整选择属性的事件
	};
	for(var i in obj){
		option[i]=obj[i];
	}
	//数据解码成可用数据对象
	option.stock=decodeStockStr(option.stockStr);
	//给所有的属性绑定点击事件
	option.stockItems.click(function(){
		var _this=$$(this);
		//如果当前是无任何库存的项目则不 做任何操作
		if(option.stock.attrCount[_this.attr("attrName")+":"+_this.attr("attrValue")]<1){
			return;
		}
		//判断当前的选择组合下本属性是否有库存,没有库存则为错误操作
		if(!checkSelectHasStock(option.stock,_this.attr("attrName"),_this.attr("attrValue"))){
			return;
		}
		//判断当前是否为选中，如果已经选中则去掉选择，否则选中之
		option.stock.selectVal[_this.attr("attrName")]=(option.stock.selectVal[_this.attr("attrName")]==_this.attr("attrValue"))?"":_this.attr("attrValue");
		//将库存信息的状态显示到页面上
		showStockSelectState(option);
	});
	option.decode=decodeStockStr;
	option.checkHaveStock=checkSelectHasStock;
	option.drawStock=showStockSelectState;
	option.check=checkStockSelect;
	option.getUnselectList=getUnselectList;
	//默认选择的状态设置
	if(option.checkedStr!=""){
		var t=option.checkedStr.split("|");
		for(var i=0;i<t.length;i++){
			t[i]=t[i].split(":");
			if(t[i][1]!="" && option.stock.selectVal[t[i][0]]==""){
				option.stock.selectVal[t[i][0]]=t[i][1];
			}
		}
		showStockSelectState(option);
	}
	//如果某种属性的可选属性值只有一个的话就自动给用户选中
	var autoChecked=false;
	for(var i in option.stock.attrs){
		var zeroattrs=0;
		var unZeroName=""
		for(var j=0;j<option.stock.attrs[i].length;j++){
			if(option.stock.attrCount[i+":"+option.stock.attrs[i][j]]<1){
				zeroattrs+=1;
			}else{
				unZeroName=option.stock.attrs[i][j];
			}
		}
		if(option.stock.attrs[i].length-zeroattrs==1){
			option.stock.selectVal[i]=unZeroName;
			autoChecked=true;
		}
	}
	if(autoChecked){
		showStockSelectState(option);
	}
	return option;
	//检查输入是否正常ok
	function checkStockSelect(){
		var str=[];
		var opt=this;
		for(var i in opt.stock.selectVal){
			if(opt.stock.selectVal[i]==""){
				//库存选择检查失败事件
				if(!opt.onCheckFail(opt)){return false;}
				return false;
			}
			str.push(i+":"+opt.stock.selectVal[i]);
		}
		
		if(opt.stock.values[str.join("|")][2]>0 ){
			opt.checkedStr=str.join("|");
			//库存选择检查成功事件
			if(!opt.onCheckSuccess(opt)){return false;}
			return true;
		}else{
			//库存选择检查失败事件
			if(!opt.onCheckFail(opt)){return false;}
			return false;
		}
	}
	//解码库存属性串，转换为一个可用大对象
	function decodeStockStr(str){
		//解码空串:属性map，值列表，构造串,所有属性值的列表（统计用）,已经选中的内容
		var stock={attrs:{},values:{},attrNum:0,encodeStr:"",attrCount:{},selectVal:{},zeroValues:{},zeroMap:{},zeroLength:0};
		if(str==""){return stock;}
		var tmp=str.split(";");
		var s=tmp[0].replace(/^\d.*#/,"").split("~")[0].split("|");
		//直接把第一条记录转换成一个属性map结构
		for(var j=0;j<s.length;j++){
			//切开s[i]，会得到2元素的数据，第一个是属性名，第2个是属性值的结构【属性值，该属性值对应的库存数，】
			stock.attrs[s[j].split(":")[0]]=[s[j].split(":")[1]];
			stock.attrNum+=1;	//统计已有的属性总数
			stock.selectVal[s[j].split(":")[0]]="";	//设置用户要选中的值
		}
		//遍历所有的数据分拆数据结构成一个大map
		for(var i=0;i<tmp.length;i++){
			//先去掉每条数据前面的编号
			tmp[i]=tmp[i].replace(/^\d.*#/,"");
			if(tmp[i]==""){continue;}
			//分析当前记录的属性值，如果不存在map里面就加入进去
			var s=tmp[i].split("~")[0].split("|");
			for(var j=0;j<s.length;j++){
				//统计所有属性的对应商品数
				if(stock.attrCount[s[j]]){
					stock.attrCount[s[j]]=parseInt(stock.attrCount[s[j]])+parseInt(tmp[i].split("~")[1].split(",")[2]);
				}else{
					stock.attrCount[s[j]]=parseInt(tmp[i].split("~")[1].split(",")[2]);
				}
				//取出当前属性的值列表，如果当前属性值不存在就加入到属性列表中
				if((","+stock.attrs[s[j].split(":")[0]].join(",")+",").indexOf(","+s[j].split(":")[1]+",")<0){
					stock.attrs[s[j].split(":")[0]].push(s[j].split(":")[1]);
				}
				
			}
			//分析当前的记录，解析并压入数据库
			stock.values[tmp[i].split("~")[0].toString()]=tmp[i].split("~")[1].split(",");
			//如果是0库存数据就再压一份到0库存表中,并把对象构入0库存属性map
			if(parseInt(tmp[i].split("~")[1].split(",")[2])<1){
				var s=tmp[i].split("~")[0].split("|");
				for(var j=0;j<s.length;j++){
					if(!stock.zeroMap[s[j].split(":")[0]]){
						stock.zeroMap[s[j].split(":")[0]]=[s[j].split(":")[1]];
					}
					if((","+stock.zeroMap[s[j].split(":")[0]].join(",")+",").indexOf(","+s[j].split(":")[1]+",")<0){
						stock.zeroMap[s[j].split(":")[0]].push(s[j].split(":")[1]);
					}
				}
				stock.zeroValues[tmp[i].split("~")[0].toString()]=tmp[i].split("~")[1].split(",");
				stock.zeroLength+=1;
			}
		}
		return stock;
	};
	//判断当前组合是否有库存
	function checkSelectHasStock(obj,aName,aValue){
		//如果当前属性名不在0库存map中，就直接返回真
		if(!obj.zeroMap[aName]){
			return true;
		}
		//如果当前属性不在0库存map中，就直接返回真
		if((","+obj.zeroMap[aName].join(",")+",").indexOf(","+aValue+",")<0){
			return true;
		}
		//求当前属性0库存数大于实际0库存数的时候（当某库存属性为0库存的时候，至少产生的0库存记录条数），则说明当前肯定是有库存的，返回真
		var minZeroCount=1;
		for(var i in obj.selectVal){
			if(obj.selectVal[i]=="" && i!=aName){
				minZeroCount=obj.attrs[i].length*minZeroCount;
			}
		}
		if(minZeroCount>obj.zeroLength){
			return true;
		}
		//遍历当前属性选择在0库存中匹配到的条数，如果匹配的条数小于属性零库存总条数，则表示还有库存，返回真
		var findCount=0;
		var newS={};	//深拷贝已选择状态
		for(var i in obj.selectVal){
			newS[i]=(i==aName)?aValue:obj.selectVal[i];
		}
		//遍历所有的库存记录，单某条记录中包括所有的选择状态时，就把这个记录的总数统计起来
		for(var i in obj.zeroValues){
			//遍历当前所有的选择，只要有一种选择没在当前库存记录里面就不匹配
			var isMatch=true;
			for(var j in newS){
				if(newS[j]!="" && ("|"+i+"|").indexOf("|"+j+":"+newS[j]+"|")<0){
					isMatch=false;
				}
			}
			//如果当前库存记录中存在
			findCount+=isMatch?1:0;
		}
		//如果记录总数小于0库存记录数，则标识还有库存，返回真
		if(findCount<minZeroCount){
			return true;
		}
		//其他情况返回无库存
		return false;
	}
//将库存信息的状态显示到页面上
	function showStockSelectState(opt){
		//把所有的状态还原
		var obj=opt.stock;
		var attrs=opt.stockItems;
		attrs.filter("."+opt.css_disable+","+"."+opt.css_select).removeClass(opt.css_disable).removeClass(opt.css_select);
		//去掉原始状态
		
		var selectList=[];	//已经选中元素的数组
		for(var i in obj.selectVal){
			//设置选中的对像的状态
			if(obj.selectVal[i]!=""){
				selectList.push(obj.selectVal[i]);
				attrs.filter("[attrValue='"+obj.selectVal[i]+"']").filter("[attrName='"+i+"']").addClass(opt.css_select);
			}
			//循环判断0库存map中当前属性中库存为空的值，灰掉
			if(!obj.zeroMap[i]){continue;}
			for(var j=0;j<obj.zeroMap[i].length;j++){
				if(!checkSelectHasStock(obj,i,obj.zeroMap[i][j])){
					attrs.filter("[attrName='"+i+"']").filter("[attrValue='"+obj.zeroMap[i][j]+"']").addClass(opt.css_disable);
				}
			}
		}
		//返回选择的属性列表
		opt.checkedItems=(selectList.length>0)?selectList:[];
		//触发选择选择变更事件
		if(!opt.onSelectChange(opt)){return false;}
		//如果选择了全部则修改当前库存数信息
		if(selectList.length==obj.attrNum){
			//构造选择对象的串
			var ids=[];
			for(var i in obj.selectVal){
				ids.push(i+":"+obj.selectVal[i]);
			}
			opt.checkedStr=ids.join("|");
			//触发属性选择完整事件
			if(!opt.onSelectReady(opt)){return false;}
		}else{
			//触发属性未选择完整事件
			if(!opt.onSelectNotReady(opt)){return false;	}
		}
	}
	//获取未选择属性的名称
	function getUnselectList(opt){
		var t=[];
		for(var i in opt.stock.selectVal){
			if(opt.stock.selectVal[i]==""){
				t.push(i);
			}
		}
		return t;
	}
}

function $makeUrl(data){
	//将json串组装成为url并返回
	var arr=[];
	for( var k in data) {
		arr.push(k+"="+data[k]);
	};
	return arr.join("&");
};

function $strTrimLeft(str,code){
	code = code||"\\s";
	return str.replace(new RegExp("(^"+ code + "*)","g"),""); 
}

function $strTrimRight(str,code){
	code = code||"\\s";
	return str.replace(new RegExp("(" + code + "*$)","g"),""); 
}

function $md5(){
	// md5加密
	var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
	var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
	var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */
	var option={};
	option.hexcase=hexcase;
	option.b64pad=b64pad;
	option.chrsz=chrsz;
	option.hex_md5=hex_md5;
	option.binl2hex=binl2hex;
	option.core_md5=core_md5;
	
	return option;
	function hex_md5(s){ 
		return binl2hex(core_md5(str2binl(s), s.length * option.chrsz));
	}
	function binl2hex(binarray){
		var hex_tab = option.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++)
		{
		  str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
				 hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
		}
		return str;
	}
	function core_md5(x, len){
		/* append padding */
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
		
		var a =  1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d =  271733878;
		
		for(var i = 0; i < x.length; i += 16){
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
		  
			a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
			d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
			b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
			d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
			c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
			d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
			d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
		  
			a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
			d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
			c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
			b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
			d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
			c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
			d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
			c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
			a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
			d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
			c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
			b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
		  
			a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
			d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
			b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
			d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
			c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
			d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
			a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
			d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
			b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
		  
			a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
			d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
			c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
			d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
			d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
			a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
			d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
			b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
		  
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return Array(a, b, c, d);
	}

	function md5_cmn(q, a, b, x, s, t){
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t){
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t){
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t){
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t){
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	function safe_add(x, y){
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
	function bit_rol(num, cnt){
		return (num << cnt) | (num >>> (32 - cnt));
	}

	function str2binl(str){
		var bin = Array();
		var mask = (1 << option.chrsz) - 1;
		for(var i = 0; i < str.length * option.chrsz; i += option.chrsz)
		  bin[i>>5] |= (str.charCodeAt(i / option.chrsz) & mask) << (i%32);
		return bin;
	}
}

function $focusInput(id,note){
	var o=$id(id);
	$addEvent(o,'focus',function(){
		o.style.color='#000000';
		if(note&&note!=''&&o.value==note){
			o.value='';
		}		
	});
	$addEvent(o,'blur',function(){
		if(note&&o.value==''){
			o.value=note;
			o.style.color='#999999';
		}	
	});	
};

function $addSelect(e,t,v){		
	//新增一个下拉框
	var o = new Option(t, v);
	e.options[e.options.length]=o;
	return o;
};

function $delEvent(obj,type,handle){
	if (window.removeEventListener){
		obj.removeEventListener(type, handle, false);
	}else if (window.detachEvent){
		obj.detachEvent("on"+type, handle);
	}
};

function $bindEvent(name,type,handle){
	//专用于批量绑定名字相同的事件,单独绑定直接写onclick等
	var objs=document.getElementsByName(name);
	for(var i=0,len=objs.length;i<len;i++){
		$addEvent(objs[i],type,handle);
	}
};

function $isPInt(v){
	//正整数
	return /^[1-9]\d*$/.test(v); 
};

function $isQQ(v){
	return /^[1-9]\d{4,9}$/.test(v); 
};

function $getValue(name){
	//专门用于check和radio取值，单独取值请直接写value
	var objs=document.getElementsByName(name),
		returnvar=[];
	for(var i=0,len=objs.length;i<len;i++){
		var t=objs[i];
		if(t.tagName.toLowerCase()=="input"){
			if((t.type.toLowerCase()=="checkbox" || t.type.toLowerCase()=="radio") ){	//设置单选复选框的值
				if(t.checked==true){
					returnvar.push(t.value);
				}
			}
		}
	};
	returnvar=returnvar.join(',');
	return returnvar;
};

function $doClick(id){
	var o = $id(id);        
	if($isBrowser('ie')){o.click()}        
	else{        
		var	e = document.createEvent('MouseEvents');        
		e.initEvent('click',true,true);        
		o.dispatchEvent(e);        
	}  
};

function $getSalePrice(sale,price){
//获取商品折扣价格，参数：折扣率（0.50），总价（单位元）
	if(sale>=1.0){
		return parseFloat(price).toFixed(2);
	}
	var memberprice=price*sale;
	if(price<=50){
		memberprice+=0.05; 
		memberprice=parseInt(memberprice*100/10)/10;
	}else{
		memberprice+=0.5;
		memberprice=parseInt(memberprice);
	}
	if(memberprice<=0.01){
		memberprice=0.01;
	}
	return parseFloat(memberprice).toFixed(2);
}

function $getTextLengthByByte(txt){
   if(txt==null){
	  return 0;  
   }
   var asc; 
   var txtLen=0; 
   for(var i=0;i<txt.length;i++)
   {
	  asc=txt.charCodeAt(i);  
	  if(asc>0&&asc<255){
	   txtLen+=1;   
	  }else{
	   txtLen+=2;   
	  }
   }
   return txtLen; 
}

function $getTextByByteLength(txt,getLen){

//根据字节长度截取字符串
//txt:文本
//getLen:字节长度
	 if(txt==null){
		 return "";
	 }
	 var asc;
	 //ASCII码
	 var txtLen=$getTextLengthByByte(txt);
	 //txt的实际长度
	 var txtNew="";
	 //获取新的字符串
	 var tempLen=0;
	 //临时变量
	 var txtTemp="";
	 //临时变量
   
	if(txtLen>getLen)//如果txt字符串的长度大于要截取的
	{  
	  for(var i=0;i<txt.length;i++){  
		   asc=txt.charCodeAt(i);   
		   if(asc>0&&asc<255){
			tempLen+=1;      
		   }else {
			tempLen+=2;    
		   }
		   if(tempLen>getLen){
			txtNew=txtTemp;
			//提取当前长度
		   }else {
			txtTemp+=txt.substr(i,1);
		   }
	  }
	}else {
	  txtNew=txt;
	}
    return txtNew; 
	 
}

function $shareComm(obj){
	var option={
		cname:"",
		cid:"",
		uid:"",
		left:0,
		top:0,
		tp:'',
		stype:'1',
		sreason:''
	};
	for(var i in obj)option[i]=obj[i];
	window._PP_core_shareComm_data=option;
	$loadCss("http://static.paipaiimg.com/module/share_to_friend.css");
	$loadScript("http://ext.paipai.com/qzone/IsLogin?comid="+option.cid+"&t="+Math.random(),"sharelogin");
	window.LoginInfoCallBack = function(obj){
		option=window._PP_core_shareComm_data;
		if(obj.retcode == "1"){
			$loginFrame({type:'func',check:false,model:false,action:function(){$shareComm(option)},"x":option.left,"y":option.top});
			return;
		}
		if(obj.retcode == "2"){
			var share_self = '<div class="class="share_to_friend"><div class="box_hint_normal"> <span class="icon msg2-icon-warn"></span> <div class="hint_content"> <p class="hint_title"><strong>您不能分享自己的商品！</strong></p> <p>您可以在“<a href="http://my.paipai.com/cgi-bin/feed_mgr?type=1&PTAG=6.6.9" target="_blank">我的拍拍—购物分享信息设置</a>”管理您已分享的商品。</p> <div class="hint_op"> <button id="closeShare">关闭窗口</button> </div> </div> </div> <div>';
			var floatSelf=$float({
				cover:false,
				style:"stand",
				title:"分享给好友",
				width:'420',
				html:share_self,
				left:option.left,
				top:option.top
			});
			$$("#closeShare").click(function(){floatSelf.close();})
			return;
		}
		var begin_share = '<div class="share_to_friend"><p class="share_des">您正在向QQ好友、拍拍用户分享此次商品 <a href="http://help.paipai.com/content/help_20123.shtml?PTAG=20030.1.10" target="_blank"><span class="icon msg0-icon-help" title="查看帮助"></span></a></p><p class="share_title"><label>分享标题：<input type="text" size="40" style="font-size:12px;" defaultVar="" id="shareTitle" maxlen="100" value="'+option.cname+'" /></label></p><p class="share_txt"><label>分享理由：<textarea cols="38" rows="5" style="font-size:12px;'+(option.sreason?"":"color:gray")+'" id="shareCont" maxlen="300" defaultVar="通过您的描述，您的好友更容易喜欢上您的分享">'+(option.sreason?option.sreason:'通过您的描述，您的好友更容易喜欢上您的分享')+'<\/textarea></label></p><div id="shareReason" style="display:none;color:#F00;padding:0 0 5px 60px;">请填写分享理由</div><div class="share_btn"><button id="doshare">分享</button> 　<a href="#nolink" id="cancelShare">取消</a></div></div>';
		var floatBeginShare=$float({
			cover:false,
			style:"stand",
			title:"分享给好友",
			html:begin_share,
			left:option.left,
			top:option.top
		});
		//标题的输入事件
		$$("#shareTitle,#shareCont").blur(function(){
			var _this=$$(this);
			var maxlen=parseInt(_this.attr("maxlen"));
			var str=_this.val();
			($getTextLengthByByte(str)>maxlen)?this.value=$getTextByByteLength(str,maxlen):"";	
			if(_this.attr("defaultVar")!="" && str==""){
				_this.css("color","gray");
				_this.val(_this.attr("defaultVar"));
			}
		}).focus(function(){
			var _this=$$(this);
			if(_this.val()==_this.attr("defaultVar")){
				_this.val("");
				_this.css("color","#000");
			}
		});
		$$("#cancelShare").click(function(){
			floatBeginShare.close();						  
		})
		//提交事件
		$$("#doshare").click(function(){
		
			
			var share_title = $$("#shareTitle").val()==""?option.cname:$$("#shareTitle").val();
			var share_content=$$("#shareCont").val();
			
			if(share_content==""||share_content=="通过您的描述，您的好友更容易喜欢上您的分享"){
						$$("#shareReason").show();
						$$("#shareCont").focus();
						return;
			}
		
			floatBeginShare.close();
			try{$loadScript("http://ext.paipai.com/qzone/AddShare?type="+option.stype+"&id="+option.cid+"&title="+encodeURIComponent(share_title)+"&reason="+encodeURIComponent(share_content)+"&t="+Math.random(),"qzshare");}catch(e){}
			var share_wait = '<div class="class="share_to_friend"><img src="http://pics.paipai.com/common/icon/loading.gif" align="absmiddle"/>正在分享，请稍候<div>';
			window.floatWait=$float({
				cover:false,
				style:"stand",
				title:"分享给好友",
				width:'420',
				html:share_wait,
				left:option.left,
				top:option.top,
				height:137
			});
			//收藏回调
			window.getShareInfoCallBack = function(obj){
				window.floatWait.close();
				if(obj.msg == "请登录后再分享"){
					$loginFrame({type:'func',check:false,model:false,action:function(){$shareComm(option)},"x":option.left,"y":option.top});
					return;
				}
				var finish_share = '<div class="class="share_to_friend"><!-- S 通用提示 --> <div class="box_hint_normal"> <span class="{#classname#}"></span> <div class="hint_content"> <p class="hint_title"><strong>{#username#}（{#uin#}）{#shareresult#}！</strong></p> <p class="hint_title"><a href="http://ext.paipai.com/uinfo/info?userid='+obj.uin+'" target="_blank">点击查看我所有的分享</a></p><div class="hint_op"> <button id="closeShare">关闭窗口</button> </div> </div> </div> <!-- E 通用提示 --><div>';
				if(obj.msg=="分享商品成功"){
					finish_share = finish_share.replace(/{#username#}/,obj.nickname).replace(/{#uin#}/,obj.uin).replace(/{#shareresult#}/,obj.msg).replace(/{#classname#}/,"icon msg2-icon-right");
				}else{
					finish_share = finish_share.replace(/{#username#}/,"").replace(/（{#uin#}）/,"").replace(/{#shareresult#}/,obj.msg).replace(/{#classname#}/,"icon msg2-icon-warn");
				}
				var floatFinish=$float({
					cover:false,
					style:"stand",
					title:"分享给好友",
					width:'420',
					html:finish_share,
					left:option.left,
					top:option.top
				});
				$$("#closeShare").click(function(){floatFinish.close();})
			};
		});
	};
};

function $isPhone(v){
	//有400或800电话这种情况
	return /^(\d{3,4}\-)?\d{3,9}(\-\d{1,5})?$/.test(v)
}

function $loadSellList(obj){
if(window._PP_core_selllist_sellLoaded) return;
var option = {
selllistDiv:$id("salesrecordsContent"), //展示div
isPreview:false, //是否预览
isGray:"1", //是否灰度
isHistory:false, //是否历史记录
payedNum:"0", //付款数量
isTodaySpec:"", //是否今日特价
commodityDealType:"", //商品交易类型
totalSoldNum:"", //商品售出数量
commodityCount:"", //商品剩余数量
commodityId:"", //商品ID
commoditySnapVersion:"",
commodityState:"2",
resetTime:""
}
for(var i in obj){
option[i] = obj[i];
}
if(option.isPreview){//预览逻辑
option.selllistDiv.innerHTML="预览中……";
return;
}else if(option.isHistory){ //历史商品逻辑
option.selllistDiv.innerHTML = "[ 您正在查看历史商品，购买/出价记录已被隐藏。 ] ";
option.selllistDiv.style.textAlign = "center";
return;
}
if((option.payedNum<=0 && !(option.isTodaySpec)&&!(option.commodityDealType ==2)) || ((option.totalSoldNum==0) &&(option.isTodaySpec))||(option.commodityDealType ==2&&option.commodityCount<=0)){
var nosellHtml = '<table width="100%" border="0" cellspacing="0" cellpadding="0"><thead><tr><th>买家</th><th width="225px">商品名称</th><th>出价</th><th> </th><th>购买数量</th><th>时间</th><th>状态</th></tr></thead><tbody><tr><td colspan="7" class="mask"><p>暂无相关信息</p></td></tr></tbody><tfoot><tr><td colspan="7"><span style="margin:3px; float:left ;text-align:right;"><a href="http://help.paipai.com/content/help_20210.shtml" title="买家确认购买至评价完成前，商品出价列表将默认帮您隐藏您的购买记录；待您对卖家做完评价时，您可以选择是否显示您的购买信息。" target="_blank">*隐私保护策略</a></span><span id="sellListPageBar" style="margin:3px;float:right;"></span></td></tr></tfoot></table>';
option.selllistDiv.innerHTML = nosellHtml;
return;
}
window._PP_core_selllist_params=[1,20,0];//[当前页码，每页条数,是否历史出价记录]
window.getOtherSellListPage=function(pageId){
window._PP_core_selllist_params[0]=pageId;
var url="http://auction.paipai.com/cgi-bin/sales/"+((option.commodityDealType==2)?"auction":"fixprice")+"?history="+window._PP_core_selllist_params[2]+"&itemid="+option.commodityId+"&pagesize="+window._PP_core_selllist_params[1]+"&currsnap="+option.commoditySnapVersion+"&page="+window._PP_core_selllist_params[0]+"&payed="+((option.isTodaySpec)?"0":"1")+"&payednum="+option.payedNum+"&resettime="+option.resetTime+"&gray="+option.isGray+"&actionid="+Math.random();
//加载首页数据,期待回调：commSellListCallBack
$loadScript(url,"loadSellList");
};
getOtherSellListPage(1);
window.commSellListCallBack=function(obj){
var template='<table width="100%" border="0" cellspacing="0" cellpadding="0"><thead><tr><th>买家</th><th width="225px">商品名称</th><th>出价</th><th> </th><th>购买数量</th><th>成交时间</th><th>状态</th></tr></thead><tbody>【list】<tr ><td>{#nickName#}</td><td width="225px" style="text-align:left"><a target="_blank" href="http://auction1.paipai.com/{#snapId#}">{#title#}</a></td><td>{#price#} 元</td><td>{#proxy#}</td><td>{#num#}件</td><td>{#time#}</td><td>{#state#}</td></tr>【list】【edit】<tr><td colspan="7" class="mask"><p>以下是商品该次修改之前产生的出价记录 <a href="http://auction1.paipai.com/{#snapId#}" target="_blank">查看修改前的商品信息</a></p></td></tr>【edit】【null】<tr><td colspan="7" class="mask"><p>{#nosaleshow#}</p></td></tr>【null】</tbody><tfoot><tr><td colspan="7"><span style="margin:3px; float:left ;text-align:right;"><a href="http://help.paipai.com/content/help_20210.shtml" title="买家确认购买至评价完成前，商品出价列表将默认帮您隐藏您的购买记录；待您对卖家做完评价时，您可以选择是否显示您的购买信息。" target="_blank">*隐私保护策略</a></span><span id="sellListPageBar" style="margin:3px;float:right;"></span></td></tr></tfoot></table>';
var hc_listItem=((new RegExp("【list】(.*)【list】","ig")).exec(template))?RegExp.$1:""
var hc_editItem=((new RegExp("【edit】(.*)【edit】","ig")).exec(template))?RegExp.$1:""
var hc_nullItem=((new RegExp("【null】(.*)【null】","ig")).exec(template))?RegExp.$1:""
var hc_a=[];
//错误处理
if(obj.errno!=0){
option.selllistDiv.innerHTML = obj.errmsg;
return;
}
//列表输出
for(var i=0;i<obj.list.length;i++){
if(!obj.list[i]){
continue;
}
if(obj.list[i].proxyBidding){
obj.list[i].proxyBidding='<a title="相同的出价是因为使用了系统自动加价，具体的规则，请参考出价帮助" href="http://help.paipai.com/content/help_20203.shtml" target="_blank"> 代理出价</a>';
}
obj.list[i].timeStr=$formatDate(new Date(parseInt(obj.list[i].time*1000)),"yyyy-MM-dd hh:ii:ss");
var h=(obj.list[i].type=="2")?hc_editItem:hc_listItem;
h=h.replace(/{#nickName#}/g,obj.list[i].nickName);
h=h.replace(/{#title#}/g,obj.list[i].title);
h=h.replace(/{#price#}/g,obj.list[i].price);
h=h.replace(/{#proxy#}/g,obj.list[i].proxyBidding);
h=h.replace(/{#time#}/g,obj.list[i].timeStr);
h=h.replace(/{#state#}/g,obj.list[i].state);
h=h.replace(/{#num#}/g,obj.list[i].num);
h=h.replace(/{#snapId#}/g,obj.list[i].snapId);
hc_a.push(h);
}
if(hc_a.length<1){
((option.totalSoldNum>0) && (option.isTodaySpec) && (option.commodityState == "2")) ? hc_a.push(hc_nullItem.replace(/{#nosaleshow#}/g, "正在生成销售记录，请稍候片刻 <a href='javascript:;' onclick='javascript:window.location.reload();'>刷新</a> 此页")) : hc_a.push(hc_nullItem.replace(/{#nosaleshow#}/g, "暂无相关信息"));
}
//输出
option.selllistDiv.innerHTML = template.replace(/【list】(.*)【null】/,hc_a.join(""));
if(obj.totalCount>0){
//分页条
$page({
pageCount:Math.floor(obj.totalCount/obj.pageSize)+((obj.totalCount % obj.pageSize)?1:0), //总页码
currentPage:obj.page, //当前页码
domList:[$id("sellListPageBar")], //内容输出区域的id列表，jquery语法
url:"javascript:getOtherSellListPage({#pageId#});location.href='#salesrecords';void(0);"
});
}
window._PP_core_selllist_sellLoaded = true;
};
};

function $tips(obj){
	var option={
		title:"",
		html:"",
		left:"",
		top:"",
		fix:false,	//是否固定居中随屏幕滚动，如果为true则left和top无效
		style:"stand",	//stand\none\poptip
		cover:true,	//显示覆盖背景
		onClose:function(){return true;}	//关闭事件
	};
	for(var i in obj){
		option[i]=obj[i];
	}
	//关闭掉类似窗口
	if(window._tipsHandle){
		try{window._tipsHandle.close();window._tipsHandle="";}catch(e){}
	}
	//处理覆盖的半透明背景
	if(option.cover){
		var c=document.createElement("div");
		c.id="coverbg";
		c.style.display="none";
		c.style.width="0px";
		c.style.height="0px";
		c.style.backgroundColor ="#cccccc";
		c.style.filter="Alpha(Opacity=60)";
		c.style.opacity="0.40";
		c.style.zindex="3";
		c.style.position="absolute";
		c.style.left="0px";
		c.style.top="0px";
		document.body.appendChild(c);
		var slist=document.getElementsByTagName("select");
		for(var i=0;i<slist.length;i++){
			if(slist[i].style.display!="none"){
				slist[i].style.display="none";
				slist[i].setAttribute("hideForCover","1");
			}
		}
		(function(){
			var c=$id("coverbg");
			if(!c){
				return;
			}
			if(c.style.display=="none"){
				return;
			}else{
				var h=(document.body.scrollHeight>document.body.offsetHeight)?document.body.scrollHeight:document.body.clientHeight;
				var w=(document.body.scrollWidth>document.body.clientWidth)?document.body.scrollWidth:document.body.clientWidth;
				c.style.height=document.body.scrollHeight+"px";
				c.style.width=document.body.scrollWidth+"px";
				c.style.position="absolute";
				c.style.left="0px";
				c.style.top="0px";
			}
		}).runEach(50);
		c.style.display="block";
		option.coverbg=c;
	}
	//显示可用框架
	//根据样式输出不同模板，目前只支持stand,none
	if(option.style=="stand"){
		var c=document.createElement("div");
		c.id='float_box1';
		c.className='box1';
		c.style.position="absolute";
		c.style.left="0px";
		c.style.top="0px";
		c.innerHTML='<h4><a onclick="" href="#nolink" id="float_closer"></a><span>'+option.title+'<span></h4><div class="bcontent" id="float_content">'+option.html+'</div>';
		document.body.appendChild(c);
		//返回操作句柄
		option.frame=c;
		option.closer=$id("float_closer");
	}
	//根据样式输出不同模板，目前只支持stand,none
	if(option.style=="none"){
		var c=document.createElement("div");
		c.id='float_box2';
		c.className='box2';
		c.style.position="absolute";
		c.style.left="0px";
		c.style.top="0px";
		c.innerHTML=option.html;
		document.body.appendChild(c);
		//返回操作句柄
		option.frame=c;
	}
	//用于收藏提示的
	if(option.style=="poptip"){
		var c=document.createElement("div");
		c.id='float_box1';
		c.className='boxfavorites';
		c.style.position="absolute";
		c.style.left="0px";
		c.style.top="0px";
		c.innerHTML='<h4><a onclick="" href="#nolink" id="float_closer"></a><span>'+option.title+'<span></h4><div class="bcontent" id="float_content">'+option.html+'</div>';
		document.body.appendChild(c);
		//返回操作句柄
		option.frame=c;
		option.closer=$id("float_closer");
	}
	//窗口定位，如果没有指定坐标则居中
	if(option.left!="" && option.top!=""){
		option.frame.style.left=option.left+"px";
		option.frame.style.top=option.top+"px";
	}else{
		option.frame.style.left=Number(document.documentElement.scrollLeft)+(Number(document.documentElement.clientWidth)-Number(option.frame.scrollWidth))/2+"px";
		option.frame.style.top=Number(document.documentElement.scrollTop)+(Number(document.documentElement.clientHeight)-Number(option.frame.scrollHeight))/2+"px";
	}
	//如果是fix则随屏幕滚动
	if(option.fix){
		if(navigator.appVersion.split(";")[1].replace(/[ ]/g,"")=="MSIE6.0"){
			(function(){
				if(!option.frame){
					return;
				}
				option.frame.style.left=Number(document.documentElement.scrollLeft)+(Number(document.documentElement.clientWidth)-Number(option.frame.scrollWidth))/2+"px";
				option.frame.style.top=Number(document.documentElement.scrollTop)+(Number(document.documentElement.clientHeight)-Number(option.frame.scrollHeight))/2+"px";
			}).runEach(50);
		}else{
			option.frame.style.position="fixed";
			option.frame.style.zindex="300";
			option.frame.style.left=(Number(document.documentElement.clientWidth)-Number(option.frame.scrollWidth))/2+"px";
			option.frame.style.top=(Number(document.documentElement.clientHeight)-Number(option.frame.scrollHeight))/2+"px";
		}
	}
	//绑定关闭按钮的事件
	if(option.closer){
		option.closer.onclick=function(){
			try{
				if(!option.onClose()){
					return;
				}
			}catch(e){}
			option.close();
		};
	}
	//关闭方法
	option.close=function(){
		option.frame.parentNode.removeChild(option.frame);
		if(option.cover){
			option.coverbg.parentNode.removeChild($id("coverbg"));
			var slist=document.getElementsByTagName("select");
			for(var i=0;i<slist.length;i++){
				if(slist[i].getAttribute("hideForCover")=="1"){
					slist[i].style.display="";
				}
			}
		}
		delete option;
	};
	window._tipsHandle=option;
	return option;
};

function $favoriteComm(obj){
	//商品收藏组件
	var option={
		autoShare:true,	//true收藏成功后展示分享提示，否则不展示
		cname:"",
		cid:"",
		uid:"",
		left:0,
		top:0,
		tp:'<div class="box_hint_normal"> <span class="icon msg2-icon-right"></span> <div class="hint_content"> <p class="hint_title"><strong>{#topinfo#}{#username#}（{#uin#}）{#title#}{#topinfo#}</strong>{#onshare#}<p>您是否愿意向QQ好友、拍拍用户分享此收藏？<a href="http://help.paipai.com/content/help_20117.shtml?PTAG=6.6.6" target="_blank"><span class="iconhelp"></span></a></p><div class="hint_op"><input type="button" value="愿意分享" id="favoriteDoshare"/> <input type="button" value="不愿意" id="favoriteNoshare" /></div>{#onshare#}{#errorLink#}<p>您可以在“<a href="http://my.paipai.com/cgi-bin/my_collect_list?isBuyLink=02&PTAG=6.6.7" target="_blank">我的拍拍-我的收藏夹</a>”管理您已收藏的商品</p><div class="hint_op"><input type="button" value="关闭窗口" id="favoriteCloser" /></div>{#errorLink#}{#shareLink#}<p>您可以在“<a href="http://my.paipai.com/cgi-bin/feed_mgr?type=1&PTAG=6.6.9" target="_blank">我的拍拍-购物分享信息设置</a>”管理您已分享的收藏</p><div class="hint_op"><input type="button" value="关闭窗口" id="favoriteCloser" /></div>{#shareLink#}</div></div>',
		template:'<div class="share_to_friend"> <div class="box_hint_normal"> <span class="icon msg2-icon-right"></span> <div class="hint_content"> <p class="hint_title"><strong>{#username#}（{#uin#}）收藏商品成功！</strong></p> <p>您是否愿意向QQ好友、拍拍用户分享此收藏商品？</p> <div class="hint_op"> <button id="favoriteDoshare">愿意分享</button> <button id="favoriteNoshare">暂不分享</button></div> </div> </div> </div> ',
		//不展示分享提示的模板
		noShareTemplate:'<div class="share_to_friend"> <div class="box_hint_normal"> <span class="icon msg2-icon-right"></span> <div class="hint_content"> <p class="hint_title"><strong>{#username#}（{#uin#}）收藏商品成功！</strong></p><p>您可以在“<a href="http://my.paipai.com/cgi-bin/my_collect_list?isBuyLink=02&PTAG=6.6.7" target="_blank">我的拍拍-我的收藏夹</a>”管理您已收藏的商品</p><div class="hint_op"><button type="button" value="关闭窗口" id="favoriteCloser">关闭窗口</button></div> </div> </div> </div> '
	};
	for(var i in obj){
		option[i]=obj[i];
	}
	if(!option.autoShare){
		//如果不展示分享，覆盖模板
		option.template=option.noShareTemplate;
	}
	window._PP_core_favoriteComm_data=option;
	//期待收藏成功回调：AddFavoriteItemCallback/失败回调：ErrAddFavoriteCallback
	$loadScript("http://my.paipai.com/cgi-bin/my_collect_add1?iType=1&sItemId="+option.cid+"&t="+Math.random(),"favorityCommodity");
	//商品收藏失败的回调函数
	window.ErrAddFavoriteCallback=function(msg,name){
		FavoriteCommCallback(1,msg,"");
	};
	//商品收藏成功的回调函数message:返回信息内容,有用户名是为用户的昵称		xiajiaMess:下架方面的状态值,		stype:收藏结果的类型}
	window.AddFavoriteItemCallback=function(msg,xjMess,stype){
		FavoriteCommCallback(0,msg.replace("$","＄"),stype);
	};
	//统一回调:回调结果、返回的信息，收藏结果
	function FavoriteCommCallback(type,msg,stype){
		var option=window._PP_core_favoriteComm_data;
		var hc=["",""];//浮层标题和内容
		//登陆超时
		if(type==1 && (msg.indexOf("登录超时")>=0||msg.indexOf("登录后再试")>=0||msg.indexOf("登陆超时")>=0)){
			$loginFrame({type:'func',check:false,model:false,action:function(){$favoriteComm(option)},"x":option.left,"y":option.top});
			return;
		}
		//其他错误
		if(type==1){
			hc=["提示",option.tp.replace(/{#topinfo#}.*?{#topinfo#}/,msg).replace(/{#onshare#}.*?{#onshare#}/,"").replace(/{#shareLink#}.*?{#shareLink#}/,"").replace(/{#errorLink#}/g,"")]
		}
		//正常
		if(type==0){
			if((stype>=10 && stype<100) || (stype>101)){
				hc=["提示",option.tp.replace(/{#username#}（{#uin#}）/,msg).replace(/{#title#}/,"您已收藏过此商品！").replace(/{#onshare#}.*?{#onshare#}/g,"").replace(/{#shareLink#}.*?{#shareLink#}/g,"").replace(/{#errorLink#}/g,"").replace(/{#topinfo#}/g,"")];
			}else{
				hc=["收藏商品",option.template.replace(/{#username#}（{#uin#}）/,msg)];
			}
		}
		option.userInfo=msg;
		option.float=$float({
			cover:false,
			style:"stand",
			title:hc[0],
			html:hc[1],
			left:option.left,
			top:option.top,
			onInit:function(){
				$$("#favoriteNoshare,#favoriteCloser").click(function(){
					window._PP_core_favoriteComm_data.float.close();
				});
				$$("#favoriteDoshare").click(function(){
					var option=window._PP_core_favoriteComm_data;
					option.float.close();
					$shareComm({
						cname:option.cname,
						cid:option.cid,
						left:option.left,
						top:option.top,
						stype:'2'
					});
				});
				return true;
			}
		});
	}
}

//商品留言列表加载
function $getLeaveMsg(opt){
	
	if(window._PP_core_msg_msgLoaded) return;
	
	var option={
		dom:"",//显示区DIV的id
		itemid:"",//商品id
		suin:"",//商家的id
		showall:"",//是否显示所有的留言
		pagenum:"",//当前的请求是否快照页面
		isSnap:"",//当前的请求是否快照页面
		version:0,//内容版本号
		maxWordNum:240,	//最多字数
		msgtype:1,//留言类型
		hasleavemsg:true//是否有留言
	};
	option=$extend(option,opt);
	window._PP_core_msg_option=option;
	
	//返回留言区的模板html,type包括: frame,item,more,input,code
	window.getTypeHtml = function(type){
		var hc="";
		//总体框架
		hc=(type=="frame")?'<div id="leaveMsgList"><font color="red">正在加载数据中,请稍候...</font></div><div class="comment" id="leaveMsgPost"></div><span id="hide_msg" style="display:none;"></span>':hc;
		//单条列表的结构的第一部分
		hc=(type=="item_start")?'<dl><dt>{$tp_msg_nickname$}<span>':hc;
		//单条列表的结构的答复按钮
		hc=(type=="item_edit")?'<a class="delreply" href="http:\/\/auction.paipai.com\/cgi-bin\/reply_leavemsg?msgid={$tp_msg_id$}&msgtype=1">答复留言</a>':hc;

		//单条列表的结构的删除按钮
		hc=(type=="item_del")?'<a class="reply" href="http:\/\/auction.paipai.com\/cgi-bin\/delete_leavemsg?msgid={$tp_msg_id$}&msgtype=1&relatesubjectid={$tp_itemid$}">删除留言</a>':hc;
		//单条列表的结构的提问部分的代码
		hc=(type=="item_ask")?'</span></dt><dd><span>问：{$tp_msg_ask$}</span><span class="time">[{$tp_msg_asktime$}]</span></dd>':hc;
		//单条列表的结构的回答部分的代码
		hc=(type=="item_answer")?'<dd class="answer"><span>答：{$tp_msg_answer$}</span><span class="time">[{$tp_msg_answertime$}]</span></dd>':hc;
		//单条列表的结构的结束部分的代码
		hc=(type=="item_end")?"</dl>":hc;
		//列表最后的更多链接
		hc=(type=="more")?'<p class="right"><a href="http:\/\/auction.paipai.com\/cgi-bin\/rd?pageId=10&domainId=1&linkId=63&url=http%3A\/\/auction.paipai.com\/cgi-bin\/commodity_note_list%3FsItemid%3D{$tp_itemid$}%26uin%3D{$tp_sellerqq$}">查看更多留言>></a></p>':hc;
		//验证码
		hc=(type=="code")?'请输入右侧所示验证码：<input class="ime" id="verifycode"  name="verifycode" value="" /><img id="leaveMsgImg" src="http://ptlogin2.paipai.com/getimage?aid=17000101&CacheTime=?0.6417980436799291" onclick=\'refreshMsgCode();\' /><a href="javascript:refreshMsgCode();">看不清楚，换一张</a>':hc;
		//留言输入区的代码
		hc=(type=="input")?'<FORM id="formLeaveMsg" name="formLeaveMsg" onSubmit="return checkSubmit()" action="http://auction.paipai.com/cgi-bin/login_post_item_leavemsg" method="post" target="_top"><input type="hidden" name="ADTAG" value="10.1.66"  \><input type="hidden" name="relatesubjectid"  value="{$tp_itemid$}" \><input type="hidden" name="msgtype" id="msgtype" value="{$tp_msgtype$}"  \><p><span class="lcomment">咨询或评论：<em>(字数在2-120之间)</em></span><span class="rcomment"><a href="#nolink" onclick="getHistoryLeaveMsg();return false;">点击找回之前所填文字</a></span></p><p><textarea id="leavemsgarea" onBlur="refreshMsgCode();" onKeyUp="countMsgInput()"  name="leavemsgarea" rows="7" cols="80" require="true"><\/textarea></p><p><input id="IsHidden" type="checkbox" align="" name="IsHidden" value="1" \>  <label for="c1"> 仅卖家可见</label><em>（选择后，您的留言只有卖家可以看到，建议您在询问价格等隐私信息时选择）</em></p><div class="valid"><span  id="leaveMsgCode"></span><span style="float:left"><button onClick="if(checkSubmit()){$id(\'formLeaveMsg\').submit()}">确　定</button><button onClick="$$(\'#leavemsgarea,#verifycode\').val(\'\');refreshMsgCode();">清　空</button></span></div></form>':hc;
		return hc;	
	};
	
	//更新验证码
	window.refreshMsgCode=function(){
		var dom=$$('#leaveMsgImg');
		dom.attr("src",dom.attr("src")+Math.random());
	};
	//文本框字数统计
	window.countMsgInput=function(){
		var dom=$$("#leavemsgarea");
		if($strLenGB(dom.val())>240){
			dom.val($strSubGB(dom.val(),0,($strLenGB($strSubGB(dom.val(),0,240))>240)?239:240));
		}
	};
	//找回历史文字
	window.getHistoryLeaveMsg=function(){
		$$("#leavemsgarea").val($getCookie("leaveMsg")?$getCookie("leaveMsg"):"");
	};
	
	//表单内容验证
	window.checkSubmit = function(){
		if(!$isLogin()){
			$loginFrame({
				type:'func',
				model:false,
				action:function(){
					if(!$isLogin()){
						return false;
					}
					if($getQQNum()==window._PP_core_msg_option.suin){
						alert("商家不能给自己留言.");
						$id("leaveMsgPost").innerHTML="<font color=\"red\">商家不能给自己留言</font>";	
						return false;
					}else{
						$id("leaveMsgCode").innerHTML=getTypeHtml("code");
					}
				},
				x:(document.documentElement.clientWidth-400)/2,

				y:document.documentElement.scrollTop + (document.documentElement.clientHeight-300)/2
			});
			return false;
		};
		if($strLenGB($strTrim($$("#leavemsgarea").val()))<4){
			alert("您输入的内容太短。两端的空格不计入字数！");
			return false;
		};
		if($strLenGB($strTrim($$("#leavemsgarea").val()))>240){
			alert("您输入的内容太长,规定不得超过120个汉字,240个字节。");
			return false;
		};

		//把留言信息保存到cookie中
		$setCookie("leaveMsg",$$("#leavemsgarea").val(),1*24*60*30,'/');
		if($strTrim($$("#verifycode").val()).length!=4){
			alert("您输入的验证码长度不对。");
			refreshMsgCode();
			return false;
		};
		return true;
	};
	
	
	//显示留言功能的结构frame
	$$(option.dom).append(getTypeHtml("frame"));


	//显示留言入口,不包括验证码	
	var hc=(getTypeHtml("input")).replace("{$tp_itemid$}",option.itemid).replace("{$tp_msgtype$}",option.msgtype);
	//发现当前商品是快照就不显示入口
	hc=(option.isSnap==1)?"<div style='text-align:center'>[ 您正在查看商品快照，不能再添加新的留言。 ]</div>":hc;
	//如果发现是商家自己就不显示入口
	hc=(option.suin==$getQQNum() && $isLogin())?"":hc;
	$$("#leaveMsgPost").html(hc);
	//显示验证码 
	if($isLogin() && $id("leaveMsgCode")){
		$id("leaveMsgCode").innerHTML=getTypeHtml("code");
	};	
	
	if(option.hasleavemsg){
		try{
			//开始加载商品留言列表,期待回调：showLeaveMsg
			$loadScript("http://auction.paipai.com/cgi-bin/show_item_leavemsg.js?sItemid="+option.itemid+"&uin="+option.suin+"&showAll=0&page=1"+"&t="+Math.random());
		}catch(e){}
	}else{
		$$("#leaveMsgList").hide();
		window._PP_core_msg_msgLoaded = true;		
	}
	//拉取留言数据的回调，显示留言列表，返回参数为一个不定长数组，结构如下：【是否出错，总页数，是否店长0表不是1表是，留言类型，从第四个开始每12个数据标识一条留言记录】
	window.showLeaveMsg=function(obj){
		var option=window._PP_core_msg_option;
		var dom=$$("#leaveMsgList");
		//快照页面，什么都不显示 或者  检查的数组中第一个数组标识是否有出错,出错全部返回
		if(option.isSnap==1 || obj[0]){
			dom.html((obj[0])?"网络传输数据错误,很抱歉... :)":"");
			return false;	
		}
		//设置留言类型
		$$("#msgtype").val(obj[3]);	//设置留言类型
		//显示留言列表,把返回的数据转换成便于操作的json数据开始构造留言输出的列表
		var i=4,msg=[];	//初始化新的留言数组
		while(obj[i+2]){
			msg.push({
				nickName:obj[i],	//留言者昵称,
				msgQQ:obj[i+1],		//留言者qq
				qqLink:obj[i+2],	//聊天的链接!!!1
				ask:obj[i+3],		//留言内容
				askTime:obj[i+4]+' '+obj[i+5],	//留言时间
				msgId:obj[i+6],		//留言编号
				itemId:obj[i+7],		//商品id
				isAnswer:obj[i+8],	//是否已经回复
				answer:obj[i+9],		//回复内容

				answerTime:obj[i+10]+' '+obj[i+11]	//回复时间
			});
			i+=12;//跳到下一条数据

		};	
		var hc="";
		//根据每条消息的情况生成代码
		for(var i=0;i<msg.length;i++){	
			var temp=getTypeHtml("item_start");
			//店长且没有回复就显示修改按钮
			temp+=(obj[2]==2 && !msg[i].isAnswer)?getTypeHtml("item_edit"):"";
			//店长就显示删除按钮
			temp+=(obj[2]==2)?getTypeHtml("item_del"):"";
			//留言内容
			temp+=getTypeHtml("item_ask");	
			//如果有回答则显示回答
			temp+=(msg[i].isAnswer)?getTypeHtml("item_answer"):"";
			//结束的代码
			temp+=getTypeHtml("item_end");	
			//替换标签内容
			temp=$strReplace(temp,'{$tp_msg_qq$}',msg[i].msgQQ);
			temp=$strReplace(temp,'{$tp_msg_qqlink$}',msg[i].qqLink);
			temp=$strReplace(temp,'{$tp_msg_nickname$}',msg[i].nickName.substr(0,msg[i].nickName.length-3)+"***");
			temp=$strReplace(temp,'{$tp_msg_id$}',msg[i].msgId);
			temp=$strReplace(temp,'{$tp_itemid$}',msg[i].itemId);
			temp=$strReplace(temp,'{$tp_msg_ask$}',msg[i].ask);
			temp=$strReplace(temp,'{$tp_msg_asktime$}',msg[i].askTime);
			temp=$strReplace(temp,'{$tp_msg_answer$}',msg[i].answer);
			temp=$strReplace(temp,'{$tp_msg_answertime$}',msg[i].answerTime);
			hc+=temp;
		};
		dom.html(hc).find("dl:odd").addClass("mask");
		//如果有超过一页的留言数据则显示更多链接
		if(obj[1]>1 && msg.length >0){
			dom.append(getTypeHtml("more").replace("{$tp_itemid$}",option.itemid).replace("{$tp_sellerqq$}",option.suin));
		};
		window._PP_core_msg_msgLoaded = true;
	};
};

function $favoriteShop(obj){
//店铺收藏组件
    var option={
        sid:"",
        uid:"",
        left:0,
        top:0,
        tp:'<div class="box_hint_normal"> <span class="icon {#iconClass#}"></span> <div class="hint_content"> <p class="hint_title"><strong>{#topinfo#}{#username#}（{#uin#}）{#title#}{#topinfo#}</strong>{#onshare#}<p>您可以在“<a href="http://ext.paipai.com/mini/index" target="_blank">购物信息中心</a> > <a href="http://ext.paipai.com/mini/review" target="_blank">关注店铺</a> > <a href="http://ext.paipai.com/mini/ManageConcernShop" target="_blank">管理关注店铺</a>”</p><p>查看和管理您所关注的店铺。</p><p style="margin: 10px -35px; padding: 10px 35px 0px;"><input type="button" value="关闭窗口" id="favoriteNoshare" /></p></div>{#onshare#}{#errorLink#}<p>您可以在“<a href="http://ext.paipai.com/mini/index" target="_blank">购物信息中心</a> > <a href="http://ext.paipai.com/mini/review" target="_blank">关注店铺</a> > <a href="http://ext.paipai.com/mini/review" target="_blank">关注店铺更新</a>”</p><p>查看您所关注的店铺及更新。</p><div class="hint_op"><input type="button" value="关闭窗口" id="favoriteCloser" /></div>{#errorLink#}{#shareLink#}<p>您可以在“<a href="http://ext.paipai.com/mini/index" target="_blank">购物信息中心</a> > <a href="http://ext.paipai.com/mini/friendpaper" target="_blank">购物分享</a> > <a href="http://ext.paipai.com/mini/MyEventList" target="_blank">我的分享</a>”</p><p>查看和管理您已分享的店铺</p><div class="hint_op"><input type="button" value="关闭窗口" id="favoriteCloser" /></div>{#shareLink#}</div> </div>'
    };
    //<p style="margin: 10px -35px; padding: 10px 35px 0px;border-top:1px solid #CCEAFF">您现在可以向您的好友、拍拍用户分享此关注啦！<a href="http://help.paipai.com/content/help_20117.shtml?PTAG=6.6.6" target="_blank"><span class="iconhelp"></span></a></p><div class="hint_op"><input type="button" value="分 享" id="favoriteDoshare"/> 
    for(var i in obj){
        option[i]=obj[i];
    }
//统计点击数	
$countRd("1038.3.3");

    //期待回调：ManageShopCallBack
    $loadScript('http://ext.paipai.com/concern/manageconcernshop?optype=1&shopid=' + option.sid+"&t="+Math.random(), 'doconcer_script');
    //店铺关注的回调函数obj:{ret//状态吗，msg//错误提示}
    window.ManageShopCallBack=function(obj){
        message=obj.msg;
        var hc=option.tp;
        if(obj.ret == "0"){
//统计关注成功数
$countRd("1038.3.4");

            hc=hc.replace(/{#username#}（{#uin#}）/,"").replace(/{#title#}/,"关注店铺成功！").replace(/{#onshare#}/g,"").replace(/{#shareLink#}.*?{#shareLink#}/,"").replace(/{#topinfo#}/g,"").replace(/{#errorLink#}.*?{#errorLink#}/,"").replace("{#iconClass#}","msg2-icon-right");
        }else{//其他异常情况
            if(obj.ret == "10"){//您已关注过此店铺
                hc=hc.replace(/{#username#}（{#uin#}）/,"").replace(/{#title#}/,"您已关注过此店铺！").replace(/{#onshare#}.*?{#onshare#}/g,"").replace(/{#shareLink#}.*?{#shareLink#}/,"").replace(/{#errorLink#}/g,"").replace(/{#topinfo#}/g,"").replace("{#iconClass#}","msg2-icon-right");
            }else if(obj.ret=="9"){//未登录
                $loginFrame({type:'func',check:false,model:false,action:function(){$favoriteShop(option)},"x":option.left,"y":option.top});
                return;
            }else{
                if(obj.ret == "22"){//添加关注达到上限的提示语特殊处理
                    message = "您关注的店铺数已达上限！";
                } else if(obj.ret == "40"){
					message = "对不起，您不能关注自己的店铺！";
				}else{
					message = "添加关注错误。"
				}
                hc = hc.replace(/{#topinfo#}.*?{#topinfo#}/,message).replace(/{#onshare#}.*?{#onshare#}/,"").replace(/{#shareLink#}.*?{#shareLink#}/,"").replace(/{#errorLink#}/g,"").replace("{#iconClass#}","msg2-icon-warn");
            }
        }
        var float=$float({
            cover:false,
            style:"stand",
            title:"关注店铺",
            html:hc,
            left:option.left,
            top:option.top
        });
        var favoriteNoshare = document.getElementById("favoriteNoshare"),favoriteCloser=document.getElementById("favoriteCloser"),favoriteDoshare=document.getElementById("favoriteDoshare");
        favoriteNoshare?favoriteNoshare.onclick=function(){float.close();}:"";
        favoriteCloser?favoriteCloser.onclick=function(){float.close();}:"";
        favoriteDoshare?favoriteDoshare.onclick=function(){
            try{$loadScript("http://member.paipai.com/cgi-bin/recommend_to_friend?Pshopid="+option.sid+"&Pitemid="+option.cid+"&Fshare=1&Ptype=5","shareMyfavorite");}catch(e){}
            float.close();
            var float2=$float({
                cover:false,
                style:"stand",
                title:"分享店铺",
                html:option.tp.replace(/{#username#}（{#uin#}）/,"").replace(/{#title#}/,"已分享此关注！").replace(/{#shareLink#}/g,"").replace(/{#onshare#}.*?{#onshare#}/g,"").replace(/{#errorLink#}.*?{#errorLink#}/,"").replace(/{#topinfo#}/g,"").replace("{#iconClass#}","msg2-icon-right"),
                left:option.left,
                top:option.top

            });
            document.getElementById("favoriteCloser").onclick=function(){float2.close();};
        }:"";
    };
}

function $getTimeInterval(st,et){
//返回两个时间之间的间隔的描述字符串
   var dateLeft = 0;
    var hourLeft = 0;
    var minuteLeft = 0;
    var secondLeft = 0;
	var timeLeft=[0,0,0,0];//结构：天、小时、分、秒
	var timeStr="";
	var ts=(et>st)?parseInt((et-st)/1000):0;
	timeLeft[0]=(ts>86400)?parseInt(ts/86400):0;
	ts=ts - timeLeft[0] * 86400;
	timeLeft[1]=(ts>3600)?parseInt(ts/3600):0;
	ts=ts - timeLeft[1] * 3600;
	timeLeft[2]=(ts>60)?parseInt(ts/60):0;
	timeLeft[3]=ts - timeLeft[2] * 60;
	timeStr=(timeLeft[0]>0)?timeLeft[0]+"天":"";
	timeStr+=(timeLeft[0]<=0 && timeLeft[1]<=0)?"":(timeLeft[1]+"小时");
	timeStr+=(timeLeft[0]<=0 && timeLeft[1]<=0 && timeLeft[2]<=0)?"":(timeLeft[2]+"分钟");
	timeStr+=(timeLeft[0]<=0 && timeLeft[1]<=0 && timeLeft[2]<=0 && timeLeft[3]<=0)?"":timeLeft[3]+"秒";
	return timeStr;
}

function $timeCountDown(obj){
//商品倒计时器，参数：输出时间字符串的dom，开始时间（单位毫秒）,结束时间,当前状态（默认为2才会计算）
	var option={
		dom:"",
		endTime:(new Date()).getTime(),
		startTime:(new Date()).getTime(),
		state:2		//默认在售
	};
	for(var i in obj){
		option[i]=obj[i];
	}
	switch(parseInt(option.state)){
		case 2:
			var str=$getTimeInterval(option.startTime,option.endTime);
			if(str){
				option.startTime+=1000;
				setTimeout(function(){$timeCountDown(option);},1000);
			}else{
				var str="成交结束";
			}
			break;
		case 4:
			var str="即将开始";
			break;
		default:
			var str="成交结束";
			break
	}
	option.dom.innerHTML=str;
}

function $scroller(opt){
//滚动器定义的代码
	var option={
		framer:"",		//滚动区的框架 div的id，框架内的内容就是要被滚动的区域，框架本身不滚动
		height:20,		//滚动区域的高度
		width:100,		//滚动区域的宽度
		viewtime:2000,		//每一屏停止时的展示时间,单位毫秒
		speed:40,		//滚动的速度，每次移动一个像素的等待时间。单位毫秒
		scrollHeight:0,	//每次滚屏的高度，如果不设置则等于滚动区域高度，即默认1屏1屏的滚动
		mouseControl:true,//鼠标控制开关，为true的时候，onmouserover的时候会增加停止开关,onmouserout的时候又会打开，这个状态控制的是stopScroll属性
		currentTop:0,	//代码中的状态机：已经滚动了多少？
		stopTime:0,		//代码中的状态机：处于停止状态时的计数器
		stopScroll:0	//代码中的状态机：是否停止状态
	};
	//合并参数
	$$.extend(option,opt);
	//获取外部框架的句柄，如果不存在就什么也不做
	option.div=$$("#"+option.framer);
	if(option.div.length<1){
		return;
	}
	//如果滚屏高度为0的时候就让他等于默认一屏的高度
	if(option.scrollHeight==0){
		option.scrollHeight=option.height;
	}
	//把框架内的内容复制几份，为连续滚动做准备,并设置框架的有效高度和宽度
	option.div.append(option.div.html()).append(option.div.html()).append(option.div.html()).append(option.div.html()).css("height",option.height+"px").css("width",option.width+"px").css("overflow","hidden").css("display","block").get(0).scrollTop=0;
	//绑定鼠标事件，鼠标在上面的时候把停止标记上打1
	if(option.mouseControl){
		option.div.mouseover(function(){
			option.stopScroll=1;;
		}).mouseout(function(){
			option.stopScroll=0;
		});
	}
	//每个单位时间启动一次滚动
	doScroll.runEach(option.speed,option);
	//辅助函数：执行一次滚动操作
	function doScroll(opt){
		if(opt.stopScroll==1) return;		//判断是否返回
		opt.currentTop +=1 ;			//滚动高度+1
		if(opt.currentTop == opt.scrollHeight+1){//这个时候应该是刚好滚动了一轮，就应该开始停止一段时间了
			opt.stopTime+=1;//停止的时间开始计数
			opt.currentTop -=1 ;	//倒退一个像素，让他始终停在同一个位置
			if(opt.stopTime*opt.speed >= opt.viewtime){//已经停止了指定的时间长度
				opt.currentTop=0;	//把滚动高度设置为0，就可以继续滚动了
				opt.stopTime=0;	//停止时间设置为0
			}
		}else{//这一块是符合向上滚动条件的时候逻辑，向上滚动一像素
			var preTop = opt.div.get(0).scrollTop;		//已经滚动的高度
			option.div.get(0).scrollTop += 1;//真正在视觉上像上滚动一个像素，如果已经到了底部的话这次滚动无效，数值不会变
			if(preTop==opt.div.get(0).scrollTop){//滚到底部则需要重新跳到头部去。
				opt.div.get(0).scrollTop=0; 
				opt.currentTop=0;
			}
		}
	}
};

function $getQQNum(){
         var QQNum=$getCookie("uin");
	if(QQNum){
		return QQNum.replace("o0","");
	}else{
		return "";
	};
}

function $adFloater(obj){
//页面右下角tips浮动广告组件
	var option={
		html:"",
		right:1,
		bottom:1,
		fix:true,
		closerId:"",
		id:"adFloater",				//id(默认)
		className:"adfloater"		//样式（默认）
	};
	for(var i in obj){
		option[i]=obj[i];
	}
	//关闭掉类似窗口
	if(window._adFloaterHandle){
		try{window._adFloaterHandle.close();window._adFloaterHandle="";}catch(e){}
	}
	var c=document.createElement("div");
	c.id=option.id;	
	c.className=option.className;
	c.style.position="absolute";
	c.innerHTML='<div id="'+option.id+'Content">'+option.html+'</div><div id="'+option.id+'Cover" style="width:0px; height:0px; position:absolute; top:0px; left:0px; z-index:-1;filter:Alpha(Opacity=0,Style=0);opacity:0;"><iframe id="'+option.id+'Iframe" frameborder="0" scrolling="no" style=" " height="0"   width="0"> </div>';
	document.body.appendChild(c);
	//返回操作句柄
	option.content=$id(option.id+"Content");
	option.cover=$id(option.id+"Cover");
	option.iframe=$id(option.id+"Iframe");
	option.cover.style.height=option.iframe.style.height=c.scrollHeight+"px";
	option.cover.style.width=option.iframe.style.width=c.scrollWidth+"px";
	option.frame=c;
	option.frame.style.zIndex ="11111";
	if(option.fix){
		if(navigator.appVersion.split(";")[1].replace(/[ ]/g,"")=="MSIE6.0"){
			//option.frame.style.display ="none";
			//option.frame.setAttribute("hideTag","0");
			setInterval(function(){
				if(option.frame){
					option.frame.style.left=Number(document.documentElement.scrollLeft)+(Number(document.documentElement.clientWidth)-Number(option.frame.scrollWidth)-option.right)+"px";
					option.frame.style.top=Number(document.documentElement.scrollTop)+(Number(document.documentElement.clientHeight)-Number(option.frame.scrollHeight)-option.bottom)+"px";
				}
				var c=parseInt(option.frame.style.top.replace("px",""));
				var o=parseInt(option.frame.getAttribute("oldTop"));
				//var t=parseInt(option.frame.getAttribute("hideTag"));
				(!o)?option.frame.setAttribute("oldTop",c):"";
				//隐藏标记自减或者初始化
				//option.frame.setAttribute("hideTag",o==c?(t-1):15);
				//设置新的原位置
				option.frame.setAttribute("oldTop",c);
				//设置显示隐藏状态
				//option.frame.style.display=(t>0)?"none":"";
			},40);
		}else{
			option.frame.style.position="fixed";
			option.frame.style.right=option.right+"px";
			option.frame.style.bottom=option.bottom+"px";
			option.frame.style.left="";
			option.frame.style.top="";
		}
	}
	option.close=function(){
		option.frame.parentNode.removeChild(option.frame);
		delete option;
	};
	window._adFloaterHandle=option;
	return option;
}

function $addHover(obj){
//标签后的箭头加上hover弹出下拉框效果
	var option = {
		outLiID:"",
		downListID:"",
		hoverSpanID:""
	}
	for(var i in obj){
		option[i] = obj[i];
	}
	var	oHover=$id(option.outLiID),
		oList=$id(option.downListID),
		oBind=option.hoverSpanID===""?oHover:$id(option.hoverSpanID);
	$mouseover(oBind,function(){
		oList.className = "now";
	});
	$mouseout(oHover,function(){
		oList.className = "now h";
	});
};

function $isMobile(v){
/*
　　中国移动号段 1340-1348 135 136 137 138 139 150 151 152 157 158 159 187 188 147 182
　　中国联通号段 130 131 132 155 156 185 186 145
　　中国电信号段 133 1349 153 180 189
*/	
	var cm="134,135,136,137,138,139,150,151,152,157,158,159,187,188,147,182",
		cu="130,131,132,155,156,185,186,145",
		ct="133,153,180,189",
		h1=v.substring(0,3),
		h2=v.substring(0,4),
		v=(/^1\d{10}$/).test(v)?(cu.indexOf(h1)>=0?"联通":(ct.indexOf(h1)>=0?"电信":(h2=="1349"?"电信":(cm.indexOf(h1)>=0?"移动":"未知")))):false;
	//首先找是否联通，然后查找是否电信，然后在移动中查找‘1349’为电信，最后在移动中查找
	return v; 
};

function $cutdownFloat(opt) {
    var option = {
        time: 0,
        title: "提示",
        html: "",
        left: "",
        top: "",
        width: '300',
        height: "",
        fix: false, //是否固定居中随屏幕滚动，如果为true则left和top无效
        style: "stand", //stand\none\poptip
        cover: false, //显示覆盖背景
        leaver: 2,
        showTime: false
    };
    option = $extend(option, opt);
    option.onClose = function () { clearInterval(window.cutdownInterval); return true; }  //关闭事件
    var autoClose = parseInt(option.time) == 0 ? false : true;
    option.html = '<table style="width:100%;height:100%"><tr><td style="vertical-align:top;width:32px;"><span class="msg3-icon-info"></span></td><td>' + option.html + '</td></tr><tr><td style="text-align:center;" colspan=2><br /><p><button id="__btn__ok">确　定</button><span id="__seconds__" style="margin-left:10px;display:none;">' + (autoClose ? parseInt(option.time) / 1000 : '') + '</span></p></td></tr></table>';
    var alertFloat = $float(option);
    if (option.showTime) {
        $$("#__seconds__").show();
    }
    if (autoClose) {
        window.cutdownInterval = setInterval(function () {
            var time = parseInt(option.time);
            if (time > 1000) {
                option.time -= 1000;
                $$("#__seconds__").html(time / 1000 - 1);
            } else {
                alertFloat.close();
            }
        }, 1000);
    }
    $$("#__btn__ok").click(function () {
        alertFloat.close();
    });
};

function $mouseScroller(opt){
  //鼠标拖动元素组件
  var option={
	  scrollerMin:0,			//有效范围
	  scrollerMax:100,
	  percent:0,				//postion在min，max的百分比
	  delta:0,				//position与min的偏差
	  scrollerPosition:0,		//最后有效的位置值
	  scrollerDrag:false,		//是否启用
	  scrollerRangeExtend:true,		//当超出范围时，是否当做极值并发送scroll事件
	  scrollType:"x",			//方向，支持"x"，"y"
	  onStart:function(obj){
	  },							//初始化完成，随时可以触发
	  onScroll:function(obj){
	  },
	  onInit:function(obj){
	  },						//触发开始，初始化document事件
	  onComplete:function(obj){
	  },
	  startScroll:function(){
	  }	//外部逻辑判断是否开始监听滚动，调用此函数
  };
  option.startScroll=goScroll;
  //合并参数
  for(var i in opt){
	  option[i]=opt[i];
  }
  return option;
  function goScroll(){
	  if(option.onInit)option.onInit(option);
	  document.onmousemove=function(e){
		  var evt=e||window.event;
		  if(!evt||!option.scrollerDrag)return false;
		  var mousex=evt.clientX;
		  var mousey=evt.clientY;
		  var position=0;
		  switch(option.scrollType){
			  case "x":
			  position=mousex;
			  break;
			  case "y":
			  position=mousey;
			  break;
		  }
		  if(position>=option.scrollerMin&&position<=option.scrollerMax){
			  option.scrollerPosition=position;
			  option.delta=option.scrollerPosition-option.scrollerMin;
			  option.percent=option.delta/(option.scrollerMax-option.scrollerMin);
			  if(option.onScroll)option.onScroll(option);
		  }else if(position<option.scrollerMin && option.scrollerRangeExtend){
			  option.scrollerPosition=option.scrollerMin;
			  option.delta=0;
			  option.percent=0;
			  if(option.onScroll)option.onScroll(option);
		  }else if(position>option.scrollerMax && option.scrollerRangeExtend){
			  option.scrollerPosition=option.scrollerMax;
			  option.delta=option.scrollerPosition-option.scrollerMin;
			  option.percent=1;
			  if(option.onScroll)option.onScroll(option);
		  }
		  return false;
	  }
	  document.onmouseup=function(){
		  if(option.scrollerDrag){
			  option.scrollerDrag=false;
			  document.onmousemove=null;
			  if(option.onComplete)option.onComplete(option);
		  }
	  }
	  option.scrollerDrag=true;
	  if(option.onStart)option.onStart(option);
  }
}

function $viewedGoods(showNum){
	var value=$getCookie("showView");
	var result="";
	if(value){
		var temp="";
		var goodsArr = value.split('{|}');
		var nowL = goodsArr.length;
		if(nowL > showNum) nowL = showNum;
		for (var i = 0; i < nowL; i++){
			if(i<4){
				temp = goodsArr[i].split('{:}'); 
				if(temp[1]){
					result += "<li><a target='_blank' href='http://auction1.paipai.com/"+temp[1]+"'><img src='http://img" + i + ".paipaiimg.com/7392e876/" + temp[3] + "' height='80' width='80' lg='11' alt='"+temp[0]+"' /></a><span><em>"+temp[4]+"</em></p></li>";
				}
			}
		}
	}
	return result;
}

function $getKeyCode(e) {
	var	e=e||window.event;
	return	e.keyCode||e.which;
}

//获取0-N之间的随机整数
function $randomInt(num){
	return Math.floor(Math.random()*num);
};

//店铺留言组件入口
function $shopLeaveMsg(opt){
    var option={
        dom:"",
        shopId:"",
        minLength:4,    //最少字符 数
        maxLength:250,    //最多字符数
        pageSize:0,        //每页条数，缺省时展示3条，非零时展示20条
        showType:"0",
        url:"http://shop1.paipai.com/cgi-bin/shop_leave_msg.js?shopId={$tp_shopId$}&page={$pageId$}&iPageSize={$tp_pageSize$}&t="+Math.random()
    };
    $extend(option,opt);
    ;
    option.frame=$$(option.dom);
    //显示留言的结构frame
    option.frame.append(getLeavemsgHtml("frame",option.shopId));    
    option.frame.find("[shopBbs='page']").hide();
    var postHTML="";
    
    if(option.showType!="1"){
        if($isLogin()){
            //显示留言入口,不包括验证码
 	    option.frame.find("[shopBbs='post']").html($strReplace(getLeavemsgHtml("post"),'{$tp_itemid$}',option.shopId));
        }else{
            //显示提示信息
            postHTML=getLeavemsgHtml("nologin",option.shopId);
            option.frame.find("[shopBbs='post']").html(postHTML);
        }
    }
    window._PP_shops_leavemsg_option=option
    
    loadList(1);        //开始加载数据
    
    //开始加载商品留言列表,构造指定串
    function loadList(pageId){
        var option=window._PP_shops_leavemsg_option;
        var url=option.url.replace("{$tp_shopId$}",option.shopId).replace("{$pageId$}",pageId).replace("{$tp_pageSize$}",option.pageSize);
        option.frame.find("[shopBbs='list']").html('<font color=\"red\">正在加载数据中,请稍候...</font>');
        window._PP_shops_leavemsg_option.curpage=pageId;
        $loadScript(url,"leavemsg.loadList");
    };
    //拉取留言的回调函数 显示留言列表,开始构造留言输出的列表
    window.showLeaveMsg=function(obj,sPageId){
        var option=window._PP_shops_leavemsg_option;
        if(obj[0]){
            option.frame.find("[shopBbs='list']").html("<font color=\"red\">网络传输数据错误,很抱歉... :)</font>");
            return false;    
        };
        //启动数据的转换函数,把返回的数据转换成便于操作的json数据
        exchangeData(obj);
        var cc="";
        //根据每条消息的情况生成代码
        for(var i=0;i<window._PP_shops_leavemsg.length;i++){    
            var msg=window._PP_shops_leavemsg[i];
            var vc="";
            vc+=msg.isSeller?getLeavemsgHtml("sellermess"):getLeavemsgHtml("mess");
            //替换标签内容
	    vc=$strReplace(vc,'{$tp_askTime$}',msg.askTime);
	    vc=$strReplace(vc,'{$tp_msg$}',msg.msg);
	    vc=$strReplace(vc,'{$tp_nickName$}',msg.nickName.substr(0,msg.nickName.length-3)+"***");
	    vc=$strReplace(vc,'{$tp_qqlink$}',msg.qqLink);
	    vc=$strReplace(vc,'{$tp_msgQQ$}',msg.msgQQ);
	    vc=$strReplace(vc,'{$tp_answerTime$}',msg.answerTime);
	    vc=$strReplace(vc,'{$tp_replyTitle$}',msg.replyTitle);
	    vc=$strReplace(vc,'{$tp_answer$}',msg.replyContent);
	    cc+=vc;
        };
        cc=(cc=="")?"<div class='shopnonemsg'>暂时没有留言。</div>":cc;
        
        option.frame.find("[shopBbs='list']").html(cc).find("li:even").addClass("odd");
        option.frame.find("[shopBbs='replyItem'][time=' ']").hide();
        //生成分页导航条
        if (!_PP_shops_leavemsg_option.hasMess){
            return false;
        }
        
        $page({
            pageCount:_PP_shops_leavemsg_option.totalpage,    //总页码
            currentPage:sPageId,    //当前页码
            domList:option.frame.find("[shopBbs='page']").get(),        //内容输出区域的id列表，jquery语法
            type:"simple",    //控制条样式
            action:"func",    //点击分页的操作类型：url、func
            func:function(pageId,opt){
                loadList(pageId);
                return true;
            }        //点击链接时的处理函数，参数为页码id和对象本身，当action=func时有效
        });

        
        option.frame.find("[shopBbs='page']").show();
    };
    //把返回的数据转换成便于操作的json数据
    function exchangeData(obj){
        window._PP_shops_leavemsg_option.haserror=obj[0];        //是否出错,true表示有错误
        window._PP_shops_leavemsg_option.islogin=obj[1];        //是否登陆
        window._PP_shops_leavemsg_option.totalpage=obj[2];        //总页数
        window._PP_shops_leavemsg_option.hasMess=(obj.length > 4); //本店铺是否有留言
        //从第四个开始,每10个数据标识一条留言记录
        var i=3;
        var msg=new Array();    //初始化新的留言数组
        while(obj[i+3]){
            var amsg={};
            amsg.hasReply = obj[i];        //是否店主留言
            amsg.msgName = obj[i+1];        //留言者昵称
            amsg.qqLink = obj[i+2];        //QQ聊天链接wpa
            amsg.msg = obj[i+3];        //留言内容
            amsg.askTime = obj[i+4]+' '+obj[i+5];    //留言时间
            amsg.replyTitle = obj[i+6];        //回复标题
            amsg.replyContent = obj[i+7];        //回复内容
            amsg.answerTime = obj[i+8]+' '+obj[i+9];    //回复时间
            
            if(amsg.msgName!="店主留言"){
                amsg.msgQQ=amsg.msgName.split(":")[0];
                if(amsg.msgName.indexOf(":")<0){
                    amsg.nickName=amsg.msgName;
                }else{
                    amsg.nickName=$strTrim(amsg.msgName.split(":")[1]);
                }
                amsg.isSeller=false;
            }else{
                amsg.msgQQ="";
                amsg.nickName=amsg.msgName;
                amsg.isSeller=true;
            }
            if ($strTrim(amsg.replyContent).length>1){
                amsg.showReply=true;    
            }
            msg.push(amsg);
            i+=10;//跳到下一条数据 
        };    
        window._PP_shops_leavemsg=msg;
    };
    //更新验证码图片
    window._PP_shops_leavemsg_refreshCodes = function(){
        $$('#loginImg').attr("src",$$('#loginImg').attr("src")+$randomInt(10000));
    };
    //文本框的输入控制
    window._PP_shops_leavemsg_countInput =function(){
        if($strLenGB($$("#leavemsgarea").val())>250){
            $$("#leavemsgarea").val($strSubGB($$("#leavemsgarea").val(),0,250));
            if($strLenGB($$("#leavemsgarea").val())>250){
                $$("#leavemsgarea").val($strSubGB($$("#leavemsgarea").val(),0,249));
            }
        }
    };
    //表单内容验证
    window._PP_shops_leavemsg_checkSubmit =function(){
        if($strLenGB($strTrim($$("#leavemsgarea").val()))<2){
            alert("您输入的内容太短。两端的空格不计入字数！");
            return false;
        }
        if($strLenGB($strTrim($$("#leavemsgarea").val()))>250){
            alert("您输入的内容太长,规定不得超过125个汉字,250个字节。");
            return false;
        }
        if($strTrim($$("#verifycode").val()).length!=4){
            alert("您输入的验证码长度不对。");
            _PP_shops_leavemsg_refreshCodes();
            return false;
        }
        return true;
    };
    
    
    
    //输出留言相关的html结构
    function getLeavemsgHtml(type,uin){
        var hc="";
        if(type=="frame"){        //总体框架
        
            if(option.pageSize==1){
                hc+='<div class="leavewordpage" shopBbs="page"></div><ul class="leavewordlist" shopBbs="list"></ul><div class="leavewordpage" shopBbs="page"></div><div class="leavewordcontent" id="leavewordcontent" shopBbs="post"></div>';
            }else{
                if(option.showType=="2"){
                    hc+='<div style="height:10px"></div><ul class="leavewordlist" shopBbs="list"></ul><div class="leavewordpage" shopBbs=""><a href="http://shop.paipai.com/'+option.shopId+'/leavemsg/index.shtml">更多留言</a></div><div class="leavewordcontent" id="leavewordcontent" shopBbs="post"></div>';
                }else if(option.showType=="1"){
                    hc+='<div style="height:10px"></div><ul class="leavewordlist" shopBbs="list"></ul><div class="leavewordpage" shopBbs=""><a href="http://shop.paipai.com/'+option.shopId+'/leavemsg/index.shtml">更多留言</a></div>';
                }else{
                    hc+='<div class="leavewordpage" shopBbs="page"></div><ul class="leavewordlist" shopBbs="list"></ul><div class="leavewordpage" shopBbs="page"></div><div class="leavewordcontent" id="leavewordcontent" shopBbs="post"></div>';
                }
            }            
        }
        if(type=="nologin"){        //总体框架
            hc+='<p class="shopnologinmsg">您要先<A href="http://member.paipai.com/cgi-bin/ptlogin?u1='+escape(location.href)+'">登录</A>才能给店主留言 :)</p>';
        }
        if(type=="post"){        //总体框架
            hc+='<form name="formLeaveMsg" id="formLeaveMsg" class="formleavemsg" onSubmit="return _PP_shops_leavemsg_checkSubmit()" action="http://shop1.paipai.com/cgi-bin/login_post_qshop_leavemsg" method="post" target="_top"><INPUT type="hidden" name="relatesubjectid" value="{$tp_itemid$}" /> <INPUT type="hidden" name="msgtype" value="4" /><ul><li><div class="hint">我要留言：</div><div class="input"><textarea cols="60" rows="5" onBlur="_PP_shops_leavemsg_refreshCodes();" onKeyUp="_PP_shops_leavemsg_countInput()" name="leavemsgarea" id="leavemsgarea" /><\/textarea></div><div class="des">字数在2～250之间</div></li><li><div class="btn"><input type="checkbox" align="left" value="1" name="IsHidden" id="IsHidden"/>隐藏我的留言，只让我的留言给店主看到。</div></li><li><div class="hint">验证码：</div><div class="input"><INPUT maxLength="4" size="16" name="verifycode" id="verifycode" msg="附加码长度为4字节" min="4" datatype="LimitB" require="true" value="" /><br /><a href="javascript:_PP_shops_leavemsg_refreshCodes();">看不清，换一张</a> </div><div class="checkcode"><IMG id="loginImg" src="http://ptlogin2.paipai.com/getimage?aid=17000101&CacheTime=" align="absMiddle" onclick=\'_PP_shops_leavemsg_refreshCodes();\' style="cursor:pointer;" /></div></li><li><div class="btn"><input type="submit" name="Submit" value="提交留言" /></div></li></ul></form>';
            
        }
        if(type=="sellermess"){        //店主留言的内容
            hc+='<li><div class="ask"><div class="name">{$tp_nickName$}： </div><div class="text">{$tp_msg$}</div><div class="time">[{$tp_askTime$}]</div></div></li>';
        }
        if(type=="mess"){        //留言的内容
            hc+='<li><div class="ask"><div class="name">{$tp_nickName$}： </div><div class="text">{$tp_msg$}</div><div class="time">[{$tp_askTime$}]</div></div><div class="respond" shopBbs="replyItem" time="{$tp_answerTime$}"><div class="name">{$tp_replyTitle$}： </div><div class="text" >{$tp_answer$}</div><div class="time">[{$tp_answerTime$}]</div></div></li>';
        }
        return hc;
    };

};

function $json2temp( json, temp )
{
	for( var i in json )
	{
		var reStr = i;
		var re = new RegExp( "{#"+reStr+"#}", "gi" );
		temp = temp.replace( re, json[i] )	;	
	}
	return temp;
};

function $checkIdcard(idcard){
  //var Errors=new Array("验证通过!","身份证号码位数不对!","身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!");
  var Errors=[true, "身份证号码位数不对!","身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!"];
  var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
  var idcard,Y,JYM;
  var S,M;
  var idcard_array = new Array();
  idcard_array = idcard.split("");
  if(area[parseInt(idcard.substr(0,2))]==null) return Errors[4];
  switch(idcard.length){
    case 15:
      if ((parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
      }
      else{
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
      }
      if(ereg.test(idcard))
        return Errors[0];
      else
        return Errors[2];
    break;
  case 18:
    if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
      ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
    }
    else{
    ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
    }
    if(ereg.test(idcard)){
      S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3 ;
      Y = S % 11;
      M = "F";
      JYM = "10X98765432";
      M = JYM.substr(Y,1);
      if(M == idcard_array[17].toUpperCase())
        return Errors[0];
      else
        return Errors[3];
    }
    else
      return Errors[2];
    break;
  default:
    return Errors[1];
    break;
  }
}

function $tabExchange(obj){
    var option={
        titleId:"",    //tab标题的id
        titleTag:"",    //tab的元素类型
        contentId:"",    //内容的id    
        contentTag:"",    //内容元素类型
		className:"current",
        initIndex:0,
        timeLag:0
    };
	
    for(var i in obj){
        option[i]=obj[i];
    }
    //遍历所有的标题tab，并绑定事件
    var tabs=$id(option.titleId).childNodes,
    	contents=$id(option.contentId).childNodes,
    	_cont=[],
		_tabs=[],
		conTentTag=option.contentTag.toLowerCase(),
		titleTag=option.titleTag.toLowerCase();
		
    for(var i=0,len=contents.length;i<len;i++){
        if(conTentTag==contents[i].nodeName.toLowerCase()){
            _cont.push(contents[i]);
        }
    }
	
    for(var i=0,len=tabs.length;i<len;i++){
        if(titleTag==tabs[i].nodeName.toLowerCase()){
            _tabs.push(tabs[i]);
        }
    }
	
    if(_tabs.length != _cont.length) return;
	
    //根据initIndex设置显示的tab页    
	for(var j=0,len=_cont.length;j<len;j++){
		_cont[j].style.display=(j==option.initIndex)?"block":"none";
	}
    
    if(_tabs[option.initIndex]){
		var images = _cont[option.initIndex].getElementsByTagName("IMG");
        _tabs[option.initIndex].className = option.className;        
        for(var i=0,len=images.length;i<len;i++){
			var oImg=images[i],
				oImgBack=oImg.getAttribute("back_src");
			if(''==oImg.src&&oImgBack){
				oImg.src = oImgBack;
			}
        }
    }
    
    for(var i=0,len=_tabs.length;i<len;i++){
		var oTab=_tabs[i];
       	oTab.setAttribute("tabIndex",i);
        oTab.onmouseover =function(){            
			var _i=parseInt(this.getAttribute("tabIndex"));
			window.activeHover = setTimeout(function(){            
				//把内容区域所有的指定类型子元素隐藏,把第i个子元素显示出来
				for(var j=0,len=_cont.length;j<len;j++){
					var images = _cont[j].getElementsByTagName("IMG");
					for(var i=0,lenI=images.length;i<lenI;i++){
						var oImg=images[i],
							oImgBack=oImg.getAttribute("back_src");
						if(''==oImg.src&&oImgBack){
							oImg.src = oImgBack;
						}
					}
					_cont[j].style.display=(j==_i)?"block":"none";
					_tabs[j].className=(j==_i)?option.className:"";
				}
			},option.timeLag);
        }
        
       oTab.onmouseout = function(){
            clearTimeout(window.activeHover);
        }
    }
};

function $storage(o){
//本地存储组件，必须先定义声明PP全局变量
	PP.storage = {
		//helper页面，用来解决userdata同一域名下共享数据
		helperUrl : "http://www.paipai.com/storage_helper.html",
		//helper页面回调
		ifrCallback : null,
		instance : null,
		//获取建立好的实例
		getInstance : function(){
			var _ins = this["instance"];
			if(_ins){
				return _ins;
			}
			return null;
		}
	};
	PP.storage.create = function(cb, opt){
		if(typeof cb != "function"){
			return;
		}
		opt = opt || {};
		for (var n in opt){PP.storage[n] = opt[n];}
		var db 				= null,									//实例引用
			dbname 			= opt.dbname || "paipai_data",		//数据库名称
			defaultDomain 	= opt.domain || location.hostname,			//主域名
			helperUrl		= opt.helper || PP.storage.helperUrl,
			share			= opt.share || false,
			_clientStore = ["globalStorage", "localStorage", "userData"];//openDatabase跨域也可以使用。不安全。放弃
			//提供不使用so的选项
			if(!opt.noSO){
				_clientStore = ["so"].concat(_clientStore);
			}
			if (share){
				defaultDomain = document.domain;
			}
		var _cs = PP.storage;
		
		var createHelper = function(th,type){
			//需要helper页面的情况
			var i = document.createElement("iframe");
			i.id = "userData_iframe_" + dbname;
			i.style.display = "none";
			i.src = helperUrl;
			//给helper页面的回调
			PP.storage.ifrCallback = function(){
				db = i.contentWindow.create(dbname, type);
				if (db) {
					cb(th);
				}
				else {
					cb(false);
				}
			};
			document.body.appendChild(i);
		};
		//各浏览器实现方式
		var _backend = {};
		// IE 的userData internet域下，一个document最大128k， 一个domain最大1024kb
		_backend.userData = {
			isSupport:!!window.ActiveXObject,
			get: function(key, cb){
				var val = db.getAttribute(key);
				(typeof cb == "function") && cb(val);
				return val;
			},
			set: function(key, value){
				try {
					var val = db.getAttribute(key);
					db.setAttribute(key, value);
					db.save(dbname);
					return true;
				} 
				catch (ex) {
					return false;
				}
			},
			remove: function(key){
				db.removeAttribute(key);
				db.save(dbname);
			},
			init: function(){
				//不需要helper页面
				if (share) {
					createHelper(this, "userData");
					return;
				}
				var el = document.createElement("div");
				el.id = dbname + "_userData";
				el.style.display = "none";
				el.addBehavior("#default#userdata");
				document.body.appendChild(el);
				_this = this
				setTimeout(function(){
					el.load(dbname);
					db = el;
					cb(_this);
				},1000);
			},
			clear: function(){
				db.expires = new Date(1234567890000).toUTCString();
				db.save(dbname);
			}
		};
		//firefox2+ 5000kb
		_backend.globalStorage = {
			isSupport:!!window.globalStorage,
			get: function(key, cb){
				var v = (v=db.getItem(key)) && v.value ? v.value : v;
				(typeof cb == "function") && cb(v);
				return v;
			},
			set: function(key, value){
				try {
					db.setItem(key, value);
					return true;
				} 
				catch (ex) {
					return false;
				}
			},
			remove: function(key){
				db.removeItem(key);
			},
			init: function(){
				if (db = window.globalStorage[share?defaultDomain:location.hostname]) {
					cb(this);
				}
				else {
					cb(false);
				}
			},
			clear: function(){
				for (var k in db) {
					db.removeItem(k);
				}
			}
		};
		//ie8+ 10 000kb safari4+ chrome4+ firefox3.5+ opera10.5+ 5000kb
		_backend.localStorage = {
			isSupport:!!window.localStorage,
			get: _backend.globalStorage.get,
			set: _backend.globalStorage.set,
			remove: _backend.globalStorage.remove,
			init: function(){
				if (share) {
					createHelper(this, "localStorage");
					return;
				}
				if (db = window.localStorage) {
					cb(this);
				}
				else {
					cb(false);
				}
			},
			clear: function(){
				var len = db.length;
				while (len--) {
					db.removeItem(db.key(len));
				}
			}
		};
		//shareObject 10kb - 10mb
		_backend.so = {
			isSupport:!!(PP.shareObject && PP.shareObject.getValidSO()),
			get : function(key, cb){
				var val = db.get(key);
				(typeof cb == "function") && cb(val);
				return val;
				
			},
			set : function(key, value){
				try {
					db.set(key, value);
					return true;
				} 
				catch (ex) {
					return false;
				}
			},
			remove : function(key){
				db.del(key);
			},
			clear : function(){
				db.clear();
			},
			init : function(){
				if(db = PP.shareObject.getValidSO()){
					cb(this);
				}
				else{
					cb(null);
				}
			}
		};
		(function(){
			for (var i = 0, len = _clientStore.length; i < len; i++) {
				if (_backend[_clientStore[i]].isSupport) {//看看支持哪种
					(_cs["instance"] = _backend[_clientStore[i]]).init();//来个初始化
					return;
				}
			}
			//不支持客户端存储
			cb(false);
		})();
	};

	//封装成PP.Storage.get的形式
	(function(qs){
		qs.init = function(){
			var args = arguments;
			PP.storage.create(function(ins){
				if(ins){
					qs.get 		= ins.get;
					qs.set 		= ins.set;
					qs.remove 	= ins.remove;
					qs.clear 	= ins.clear;
					ins[args[0]].apply(null, args[1]);
				}else{
					//不支持的话给个回调告诉人家
					if(args[0] == "get"){
						args[1][2](null);
					}
				}
			},{share:o["share"]});
		};
		qs.get = function(){
			qs.init("get", arguments);
		};
		qs.set = function(){
			qs.init("set", arguments);
		};
		qs.remove = function(){
			qs.init("remove", arguments);
		};
		qs.clear = function(){
			qs.init("clear", arguments);
		};
	})(PP.storage);
};

function $reSizeImg(obj, newW, newH){
//resize图片大小
	if(obj == null) return;
	var oImg = new Image();
	oImg.src = obj.src;
	var oldW = oImg.width;
	var oldH = oImg.height;
	if(oldW > newW || oldH > newH) {
		w = oldW/newW; 
		h = oldH/newH;
		if(h > w) w=h;
		oldW = oldW/w; 
		oldH = oldH/w;
	}
	if(oldW > 0 && oldH > 0){
		obj.width=oldW;
		obj.height=oldH;
	}
}

function $xmlHttpLoader(){
//创建xmlHttpRequest对象
	var cJ=null,i;
	if(window.fO){
		i=window.fO;
	}else{
		i=1;
	}
	do{
		try{
			switch(i){
				case 1:cJ=new ActiveXObject("Msxml2.XMLHTTP.4.0");
				break;
				case 2:cJ=new ActiveXObject("Msxml2.XMLHTTP");
				break;
				case 3:cJ=new ActiveXObject("Microsoft.XMLHTTP");
				break;
				case 4:cJ=new XMLHttpRequest();
				break;
				default:alert("很抱歉，您浏览器的ActiveX控件目前被设置为禁用，请修改浏览器的相关选项.");return null;
				break;
			}
		}catch(e){
		}
		if(cJ==null){
			i++;
		}else{
			window.fO=i;
			return cJ;
		}
	}
	while(true);
	return null;
}

function $showXmlListByTemplate(selector){
         var cssLoaded = [],cssBtnLoaded=[];
		 selector.each(function(){
             var xmlOpt={
                 src:getRightUrlForMarket($$(this).attr("dataUrl")),
                 contentId:this,
                 page:$$(this).attr("pageId")?true:false,
                 pageId:$$(this).attr("pageId"),
                 pTag:$$(this).attr("ptag")?$$(this).attr("ptag"):$$(this).attr("pTag"),
                 showLength:$$(this).attr("showNum")?$$(this).attr("showNum"):$$(this).attr("showLength"),
                 startNum:$$(this).attr("startNum"),
                 template:$$(this).attr("template")?$$(this).attr("template"):getRightTemplate($$(this).attr("class"),$$(this).attr("btn")),
                 loadHtml:templateList(0)
             };
             formatXml(xmlOpt);
         });

         function getRightUrlForMarket(url){
         var hosts=['promote1.paipai.com/promote','paipai.lady.qq.com/promote','paipai.digi.qq.com/promote','paipai.games.qq.com/promote'];
         var thisHost=location.hostname;
		 if(url.indexOf("/tjw/")<0){url="/tjw/"+url}
         for(var i=0;i<hosts.length;i++){ if (hosts[i].indexOf(thisHost)>=0){ url=url.replace("www.paipai.com",hosts[i]);}
}
         return url;
     }
     function getRightTemplate(className,btn){
         var btn=btn?btn:"btn_1_1"
		 var temp=templateList(1,btn);
         var classNameArry=['','pp_list_1','pp_list_2','pp_list_3','pp_list_4','pp_list_5','pp_list_6','pp_list_7','pp_list_8'];
         for(var i=1;i<classNameArry.length;i++){ if(className.indexOf(classNameArry[i])>=0){
			 temp=templateList(i,btn);			 
			 if(cssLoaded.join('-').indexOf(className)<0){			 
			 	$loadCss("http://static.paipaiimg.com/promote_v2/data/"+className+".css?t="+$randomInt(100));
			 	cssLoaded.push(className);
			 }
			 if(cssBtnLoaded.join('-').indexOf("ok")<0){	
			 $loadCss("http://static.paipaiimg.com/promote_v2/data/btn.css?t="+$randomInt(100));
			 cssBtnLoaded.push("ok");
			 }
} }
         return temp;
     }

     function templateList(n,btn){		  
         var template=[];        ;
         template[0]='<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle" style="font-size:13px; color:#333333; text-align:center;vertical-align: middle; " width="100%" height="100%"><img src="http://static.paipaiimg.com/assets/common/loading2.gif" /><br />数据加载中……</td></tr></table>'; //加载状态
      //1,2,3均为商品模板
         template[1]='<li><a target="_blank" href="{#url#}">'+
                     '        <img src="{#image#}" class="image"/>'+
        			 '     <span class="recmdRegName">{#recmdRegName#}</span>'+
                     '        <span class="oldPrice">市场价:<em class="o">{#oldPrice#}</em>元</span>'+
                     '        <span class="newPrice">拍拍价:<em class="n">{#newPrice#}</em>元</span>'+
                     '        <span class="'+btn+'"></span>'+
                     '</a></li>';
         template[2]='<li><a target="_blank" href="{#url#}">'+
                     '        <img src="{#image#}" class="image"/>'+
                     '        <span class="recmdRegName">{#recmdRegName#}</span>'+
                     '        <span class="oldPrice">市场价:<em class="o">{#oldPrice#}</em>元</span>'+
                     '        <span class="newPrice">拍拍价:<em class="n">{#newPrice#}</em>元</span>'+
					 '        <span class="discount">可使用:<em class="n">{#discount#}</em>元红包</span>'+					 
                     '        <span class="'+btn+'"></span>'+
					 '        <span class="icon_hb"></span>'+
                     '</a></li>';
         template[3]='<li><a target="_blank" href="{#url#}">'+
                     '        <img src="{#image#}" class="image"/>'+
                     '        <p class="pp_layer_1"><span class="goodsName">{#recmdRegName#}</span>'+
                     '        <span class="newPrice">￥<em class="n">{#newPrice#}</em></span>'+
                     '        <span class="text_link">查看详情>></span></p>'+
                     '</a></li>';
         //4,5为店铺模板
         template[4]='<li><a target="_blank" href="{#url#}">'+
                     '        <img src="{#image#}" class="image"/>'+
                     '        <span class="recmdRegName">{#recmdRegName#}</span>'+
                     '        <span class="newPrice">拍拍价:<em class="n">{#newPrice#}</em>元</span>'+
                     '        <span class="addfavNum">已有<em class="n">{#shopLeft#}</em>人收藏</span>'+
                     '        <span class="'+btn+'"></span>'+
                     '</a></li>';
         template[5]='<li><a target="_blank" href="{#shopUrl#}">'+
                     '        <img src="{#image#}" class="image"/></a>'+
                     '		  <p class="pp_layer_1"><span class="shopName">{#recmdRegName#}</span>'+
                     '        <span class="goodEvalRate">好评：<em class="n">{#goodEvalRate#}</em></span>'+
                     '        <span class="gradeIcon">信用：{#gradeIcon#}</span>'+
                     '        <a target="_blank" href="{#shopUrl#}"><span class="'+btn+'"></span></a>'+
                     '</p></li>';
         return template[n];
 }

function formatXml(opt){var option={src:"",template:'',contentId:"",lastCodes:"",page:false,pageId:'',pageType:"full",pTag:"",firstPageId:1,linkTag:"#none",showLength:0,startNum:0,　　
interval:0,filter:'',loadHtml:'<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle" style="font-size:13px; color:#333333; text-align:center;vertical-align: middle; " width="100%" height="100%"><img src="http://static.paipaiimg.com/assets/common/loading2.gif" /><br />数据加载中……</td></tr></table>',onShowed:function(obj){return true;},data:{},currentPage:0,pageCount:0,itemCount:0,actionId:0,content:"",pageBar:"",errorTag:false,reverse:false};$extend(option,opt);if(option.src==""){return;}
option.content=$$(option.contentId);option.pageBar=$$(option.pageBar);if(window._docCache==undefined){window._docCache={};}
if(opt.interval*1>0){if(!window._formatXml_interval){window._formatXml_intvFunc={};window._formatXml_interval=setInterval(function(){for(var key in window._formatXml_intvFunc){window._formatXml_intvFunc[key]();}
},opt.interval);};};getXml(option.firstPageId,option);function getXml(i,opt){opt.actionId=i;
var hc=opt.loadHtml;opt.content.html(hc);if(opt.data[opt.contentId.id+"_"+i]){opt.currentPage=parseInt(i);showXml(opt);}else{var dataUrl=opt.src.replace(/_2_\d+\./,"_2_"+i+".");
var _showXml=function(doc){opt.currentPage=parseInt(doc.getElementsByTagName('currentPage')[0].firstChild.nodeValue);opt.data[opt.contentId.id+"_"+opt.currentPage]=doc;showXml(opt);};if(opt.cacheID&&window._docCache[opt.cacheID]){_showXml(window._docCache[opt.cacheID]);}else{$$.ajax({cache:false,url:dataUrl,dataType:"xml",success:function(da){_showXml(da);if(opt.cacheID){window._docCache[opt.cacheID]=da;}
},error:function(da,b,er){if(i==1){opt.errorTag=true;if(arguments[0]+arguments[1]+arguments[2]){}
return false;}else{getXml(1,opt);};if(opt.cacheID){window._docCache[opt.cacheID]=undefined;}
return false;}
});}
}
};function showXml(opt){if(!opt.data[opt.contentId.id+"_"+opt.currentPage]||opt.errorTag){return false;}
if(opt.page&&opt.currentPage!=opt.actionId){return false;}
var data=opt.data[opt.contentId.id+"_"+opt.currentPage];opt.currentPage=data.getElementsByTagName('currentPage')[0].firstChild.nodeValue*1;opt.pageCount=data.getElementsByTagName('pageCount')[0].firstChild.nodeValue*1;opt.itemCount=data.getElementsByTagName('itemCount')[0].firstChild.nodeValue*1;opt.domainId=data.getElementsByTagName('domainId')[0].firstChild.nodeValue*1;
var ptagPageId=data.getElementsByTagName('pageId')[0].firstChild.nodeValue*1;
var list=data.getElementsByTagName('item');
var startNum=opt.startNum*1+opt.showLength*1;
var hc=[];for(var i=opt.startNum,len=list.length,startNum=(startNum>0)?startNum:len;(i<startNum&&i<len);i++){var itemInfo={};for(var j=0;j<list[i].attributes.length;j++){itemInfo[list[i].attributes[j].name]=list[i].attributes[j].value;}
var valueNodes=$$(list[i]).children();for(var j=0;j<valueNodes.length;j++){itemInfo[valueNodes[j].nodeName]=valueNodes[j].firstChild?valueNodes[j].firstChild.nodeValue:"";};
var discount=Math.round(parseFloat(itemInfo["newPrice"])-parseFloat(itemInfo["vouPrice"]));
var sysPtag=opt.pTag?opt.pTag:ptagPageId+"."+opt.domainId+"."+i;
var cUrl=itemInfo["commodityUrl"];
var url=cUrl?(cUrl+(cUrl.indexOf('?')==-1?"?":"&")+"PTAG="+sysPtag):"http://auction1.paipai.com/"+itemInfo["id"]+"?PTAG="+sysPtag;
var gradeIcon=PP.icons?PP.icons.grade({qq:itemInfo["qq"],showScore:false,score:itemInfo["userCredit"],type:"seller"}):"";
var badEvalRate=(parseFloat(itemInfo["badEvalRate"])/10).toFixed(1)+"%";
var goodEvalRate=(parseFloat(itemInfo["goodEvalRate"])/10).toFixed(1)+"%";
var lawSuitRate=(parseFloat(itemInfo["lawSuitRate"])/10).toFixed(1)+"%";
var recmdReason=itemInfo["recmdReason"];
var costMoney=itemInfo["costMoney"]*1;
var rec_title=recmdReason?recmdReason.split("#")[0]:"";
var rec_description=recmdReason?recmdReason.split("#")[1]:"";
var shopUrl="http://"+itemInfo["qq"]+".paipai.com/?PTAG="+sysPtag;
var pic160x160=itemInfo["image"].replace(/(\.|\.\d{2,3}\x\d{2,3}\.)\jpg/,".160x160.jpg");
var pic120x120=itemInfo["image"].replace(/(\.|\.\d{2,3}\x\d{2,3}\.)\jpg/,".120x120.jpg");
var pic200x200=itemInfo["image"].replace(/(\.|\.\d{2,3}\x\d{2,3}\.)\jpg/,".200x200.jpg");
var pic100x100=itemInfo["image"].replace(/(\.|\.\d{2,3}\x\d{2,3}\.)\jpg/,".100x100.jpg");
var pic80x80=itemInfo["image"].replace(/(\.|\.\d{2,3}\x\d{2,3}\.)\jpg/,".80x80.jpg");if(opt.filter){var filter=opt.filter;for(var j in itemInfo){filter=$strReplace(filter,
"{#"+j+"#}","itemInfo['"+j+"']");};filter=eval(filter);if(!filter)continue;};
var currHTML=opt.template;currHTML=$strReplace(currHTML,{"{#url#}":url,
	"{#shopUrl#}":shopUrl,
	"{#costMoney#}":costMoney,
	"{#discount#}":discount,
	"{#gradeIcon#}":gradeIcon,
	"{#rec_title#}":rec_title,
	"{#rec_description#}":rec_description,
	"{#badEvalRate#}":badEvalRate,
	"{#goodEvalRate#}":goodEvalRate,
	"{#lawSuitRate#}":lawSuitRate,
	"{#currentPage#}":opt.currentPage,
	"{#pageCount#}":opt.pageCount,
	"{#itemCount#}":opt.itemCount,
	"{#uploadTimeSim#}":itemInfo['uploadTime']?itemInfo['uploadTime'].substr(11,5):"",
	"{#pic80x80#}":pic80x80,
	"{#pic100x100#}":pic100x100,
	"{#pic120x120#}":pic120x120,
	"{#pic160x160#}":pic160x160,
	"{#pic200x200#}":pic200x200,
	"{#order#}":i+1,
	"{#price#}":$formatPrix(itemInfo['newPrice'],"x.x")[0]});for(var j in itemInfo){currHTML=$strReplace(currHTML,
	"{#"+j+"#}",itemInfo[j]);}
hc.push(currHTML);};opt.content[0].innerHTML=(opt.reverse?hc.reverse():hc).join("")+opt.lastCodes;if(typeof opt.afterXMLshow=="function"){opt.afterXMLshow();}
if(opt.interval*1>0&&!window._formatXml_intvFunc[opt.contentId.id]){window._formatXml_intvFunc[opt.contentId.id]=function(){var startNum=opt.startNum*1+opt.showLength*1,total=list.length;opt.startNum=startNum<total?startNum:0;showXml(opt);}
};showPage(opt);if(!opt.onShowed(opt)){return false};function getAttr(attr,xmlDom){for(var i=0;i<xmlDom.attributes.length;i++){if(xmlDom.attributes[i].name==attr){return xmlDom.attributes[i].value;}
}
return"";};
function getValue(attr,xmlDom){try{var returnVar=xmlDom.getElementsByTagName(attr)[0].firstChild.nodeValue;return returnVar;}catch(e){return"";}
};};
function showPage(opt){
	$page({pageCount:opt.pageCount,
		  currentPage:opt.currentPage,
		  domList:[$$(opt.pageId)],
		  type:"simple",
		  action:"func",
		  func:function(pid){getXml(pid,opt);}
			});
	}
  }
}

function $getUserPic(qq,size){
	var html='<img src="http://qlogo'+(parseInt(qq)%4+1)+'.store.qq.com/qzone/'+qq+'/'+qq+'/'+size+'" alt="" />';
	return html;
};

function $autoLoadImages(){
//卖场专用图片按需加载组件，图片把src改为init_src即可，可支持异步加载的数据
	window['_PP_core_autoLoadImages_data']={
		allNum:0,
		nosrcImages:[],
		ciguid:0		//临时分配的guid编号
	};
	setInterval(function(){
		doScroll()		 
	},100);
	function doScroll(){
		var data=window['_PP_core_autoLoadImages_data'],
		allImage=document.images;
		//如果有iguid属性的图片则说明这个图片已经处理过了。
		if(allImage.length>data.allNum){
			for(var i=0,j=allImage.length;i<j;i++){
				if(!allImage[i].getAttribute("iguid")){
					allImage[i].setAttribute("iguid",data.ciguid++);
					var src=allImage[i].getAttribute("init_src")
					if(src){
						data.nosrcImages.push([allImage[i],src,$getY(allImage[i])]);
					}
				}
			}
			data.allNum=allImage.length;
		}
		//如果没有图片可加载的话
		if(data.nosrcImages.length==0){return;};
		
		var bodyCache=document.body,
			domCache=(document.compatMode=='BackCompat')?bodyCache:document.documentElement,
			offsetH=(window.MessageEvent&&!$isBrowser('firefox'))?bodyCache.scrollTop:domCache.scrollTop,
			visibleH=offsetH + domCache.clientHeight;//可见范围
		
		for(var i=0,j=data.nosrcImages.length;i<j;i++){
			if(!data.nosrcImages[i]){continue;}
			if((visibleH+100)>data.nosrcImages[i][2]){
				//无论是否需要，把传入进来的opt再传入调用函数
				var _item=data.nosrcImages[i];
				_item[0].setAttribute("src",_item[1]);
				delete data.nosrcImages[i];
			}
		}		
	}
};

function $makeRd(rd,url){
	var url=url||'http://www.paipai.com/rd.html',
		arrRd=rd.split(".");
	return "http://service.paipai.com/cgi-bin/go?pageId="+arrRd[0]+"&domainId="+arrRd[1]+"&linkId="+arrRd[2]+ "&url=" + escape(url);
};

function $find(selector, context, results, seed){
/*!
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function(){
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, extra, prune = true, contextXML = Sizzle.isXML(context),
		soFar = selector, ret, cur, pop, i;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec("");
		m = chunker.exec(soFar);

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );
		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set );
			}
		}
	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ? Sizzle.filter( ret.expr, ret.set )[0] : ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
			set = ret.expr ? Sizzle.filter( ret.expr, ret.set ) : ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray(set);
			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}
		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}
		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function(results){
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort(sortOrder);

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[i-1] ) {
					results.splice(i--, 1);
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
	var set;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i], match;
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice(1,1);

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName("*");
	}

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
	var old = expr, result = [], curLoop = set, match, anyFound,
		isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var filter = Expr.filter[ type ], found, item, left = match[1];
				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;
					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;
								} else {
									curLoop[i] = false;
								}
							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},
	leftMatch: {},
	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},
	attrHandle: {
		href: function(elem){
			return elem.getAttribute("href");
		}
	},
	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part){
			var isPartStr = typeof part === "string",
				elem, i = 0, l = checkSet.length;

			if ( isPartStr && !/\W/.test(part) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}
			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];
					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck, nodeCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck, nodeCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
		}
	},
	find: {
		ID: function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context){
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [], results = context.getElementsByName(match[1]);

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		}
	},
	preFilter: {
		CLASS: function(match, curLoop, inplace, result, not, isXML){
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}
					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},
		ID: function(match){
			return match[1].replace(/\\/g, "");
		},
		TAG: function(match, curLoop){
			return match[1].toLowerCase();
		},
		CHILD: function(match){
			if ( match[1] === "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},
		ATTR: function(match, curLoop, inplace, result, not, isXML){
			var name = match[1].replace(/\\/g, "");
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},
		PSEUDO: function(match, curLoop, inplace, result, not){
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);
				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
					if ( !inplace ) {
						result.push.apply( result, ret );
					}
					return false;
				}
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},
		POS: function(match){
			match.unshift( true );
			return match;
		}
	},
	filters: {
		enabled: function(elem){
			return elem.disabled === false && elem.type !== "hidden";
		},
		disabled: function(elem){
			return elem.disabled === true;
		},
		checked: function(elem){
			return elem.checked === true;
		},
		selected: function(elem){
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			return elem.selected === true;
		},
		parent: function(elem){
			return !!elem.firstChild;
		},
		empty: function(elem){
			return !elem.firstChild;
		},
		has: function(elem, i, match){
			return !!Sizzle( match[3], elem ).length;
		},
		header: function(elem){
			return (/h\d/i).test( elem.nodeName );
		},
		text: function(elem){
			return "text" === elem.type;
		},
		radio: function(elem){
			return "radio" === elem.type;
		},
		checkbox: function(elem){
			return "checkbox" === elem.type;
		},
		file: function(elem){
			return "file" === elem.type;
		},
		password: function(elem){
			return "password" === elem.type;
		},
		submit: function(elem){
			return "submit" === elem.type;
		},
		image: function(elem){
			return "image" === elem.type;
		},
		reset: function(elem){
			return "reset" === elem.type;
		},
		button: function(elem){
			return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
		},
		input: function(elem){
			return (/input|select|textarea|button/i).test(elem.nodeName);
		}
	},
	setFilters: {
		first: function(elem, i){
			return i === 0;
		},
		last: function(elem, i, match, array){
			return i === array.length - 1;
		},
		even: function(elem, i){
			return i % 2 === 0;
		},
		odd: function(elem, i){
			return i % 2 === 1;
		},
		lt: function(elem, i, match){
			return i < match[3] - 0;
		},
		gt: function(elem, i, match){
			return i > match[3] - 0;
		},
		nth: function(elem, i, match){
			return match[3] - 0 === i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;
			} else {
				Sizzle.error( "Syntax error, unrecognized expression: " + name );
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}
					if ( type === "first" ) { 
						return true; 
					}
					node = elem;
				case 'last':
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 
						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;
					if ( first === 0 ) {
						return diff === 0;
					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},
		ATTR: function(elem, match){
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},
		POS: function(elem, match, i, array){
			var name = match[2], filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch(e){
	makeArray = function(array, results) {
		var ret = results || [], i = 0;

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );
		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}
			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.compareDocumentPosition ? -1 : 1;
		}

		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	sortOrder = function( a, b ) {
		if ( !a.sourceIndex || !b.sourceIndex ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.sourceIndex ? -1 : 1;
		}

		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	sortOrder = function( a, b ) {
		if ( !a.ownerDocument || !b.ownerDocument ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.ownerDocument ? -1 : 1;
		}

		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.setStart(a, 0);
		aRange.setEnd(a, 0);
		bRange.setStart(b, 0);
		bRange.setEnd(b, 0);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}

// Utility function for retreiving the text value of an array of DOM nodes
Sizzle.getText = function( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += Sizzle.getText( elem.childNodes );
		}
	}

	return ret;
};

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime();
	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
			}
		};

		Expr.filter.ID = function(elem, match){
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );
	root = form = null; // release memory in IE
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function(match, context){
			var results = context.getElementsByTagName(match[1]);

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";
	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {
		Expr.attrHandle.href = function(elem){
			return elem.getAttribute("href", 2);
		};
	}

	div = null; // release memory in IE
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle, div = document.createElement("div");
		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function(query, context, extra, seed){
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && context.nodeType === 9 && !Sizzle.isXML(context) ) {
				try {
					return makeArray( context.querySelectorAll(query), extra );
				} catch(e){}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		div = null; // release memory in IE
	})();
}

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	div = null; // release memory in IE
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

Sizzle.contains = document.compareDocumentPosition ? function(a, b){
	return !!(a.compareDocumentPosition(b) & 16);
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

Sizzle.isXML = function(elem){
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function(selector, context){
	var tmpSet = [], later = "", match,
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE

return Sizzle(selector, context, results, seed);

};

function $showRecommend(comid, mark, shopqq) {
    //抢购商品卖完后 加量加价推荐商品

    //加价模板temps[0]和推荐其他商品模板temps[1]
    var temps = ['<div class="oneaday" id="recommendInfo"><div class="hd"><h3>温馨提示</h3><p><a id="closeRecommend" href="">关闭</a></p></div><div class="bd"><p class="note">您下手晚了，以特价出售的商品已卖完！但该商品仍有少量以优惠价格出售，欲购从速。</p><h4>推荐原件商品</h4><dl class="original"><dt><a href="http://auction1.paipai.com/{#cid#}?PTAG=30340.72.1">{#cname#}</a></dt><dd class="pic"><a href="http://auction1.paipai.com/{#cid#}?PTAG=30340.72.1"><img src="{#img#}" alt="{#cname#}" /></a></dd><dd class="price">价格：<em>{#price#}</em>元</dd><dd class="relink"><a href="http://auction1.paipai.com/{#cid#}?PTAG=30340.72.1">查看商品详情</a></dd></dl></div></div>', '<div class="oneaday" id="recommendInfo"><div class="hd"><h3>温馨提示</h3><p><a 		id="closeRecommend" href="">关闭</a></p></div><div class="bd"><p class="note">	您下手晚了，特价商品已被抢完。卖家专门为您推荐另一款特价商品，也很超值哦。</p><h4>卖家特价推荐</h4><dl class="original"><dt><a href="http://auction1.paipai.com/{#cid#}?PTAG=30340.72.1">{#cname#}</a></dt><dd class="pic"><a href="http://auction1.paipai.com/{#cid#}?PTAG=30340.72.1"><img src="{#img#}" alt="{#cname#}" /></a></dd><dd class="price">价格：<em>{#price#}</em>元</dd><dd class="relink"><a href="http://auction1.paipai.com/{#cid#}?PTAG=30340.72.1">查看商品详情</a></dd></dl></div></div>'];

    window.commodityJsonInfoCallBack = function (commodityInfo) {
        //目标商品不是在售或者目标商品的卖家跟当前商品卖家不一样的话就不显示
        if (commodityInfo.state != "2" || commodityInfo.uin != shopqq) {
            return false;
        }

        var temp = temps[mark];
        temp = temp.replace(/{#cname#}/g, commodityInfo.name);
        temp = temp.replace(/{#cid#}/g, commodityInfo.sItemid);
        temp = temp.replace(/{#img#}/g, commodityInfo.pic);
        temp = temp.replace(/{#price#}/g, commodityInfo.price);

        var al = $float({
            title: "温馨提示",
            html: temp,
            fix: true,
            width: '565',
            height: "300",
            style: "none", //stand\none\poptip
            cover: true	//显示覆盖背景
        });
        $$("#alterframe").css("border", "").css("background", "");
        $$("#closeRecommend").click(function () {
            this.href = "#nolink";
            al.close();
            return;
        });
    };


    try {
        //返回json的商品信息，期待commodityJsonInfoCallBack回调 
        $loadScript("http://auction1.paipai.com/" + comid + ".1?t=" + Math.random(), "recommendItem");
    } catch (e) { }
}

function $addFlash(showId,flashSrc,flashW,flashH){
//显示flash
	$id(showId).innerHTML='<embed src="'+flashSrc+'" height="'+flashH+'" width="'+flashW+'" wmode="transparent" type="application/x-shockwave-flash"></embed>';
}

function $loadRateList(pid, tcount, shopqq, cid, restime, paynum){
/*-----------加载评价列表-----------*/
var p = pid ? pid : 1;
var c = tcount ? tcount : 0;
//暂时注释“查看商品的全部评价”，下个版本开放 --beanmao 20100708
var tp = '<p class="historylink"><a style="margin-right:50px;" target="_blank" href="http://shop1.paipai.com/cgi-bin/creditinfo/seo?p=1&id='+ cid +'">查看该商品的全部评价</a><a href="http://shop.paipai.com/' + shopqq + '/10/index.shtml?PTAG=10.1.101">查看卖家全部评价</a></p>{#loading#}<table width="100%" height="50" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle" style="font-size:12px; color:#333333; text-align:center;vertical-align: middle; " width="100%" height="100%"><img src="http://static.paipaiimg.com/assets/common/loading2.gif" /><br />评价数据加载中……</td></tr></table>{#loading#}{#none#}<p class="center">{#nonerate#}</p>{#none#}{#list#}<table width="100%" border="0" cellspacing="0" cellpadding="0"><colgroup><col class="ratetxt" /><col class="ratepeople" /></colgroup><thead><tr><th>评价</th><th>评价人</th></tr></thead><tbody>{#rate#}<tr><td>{#badreason#}<p class="badreason">差评原因：{#reasons#}。</p>{#badreason#}<p class="ratetxt">{#content#}</p><p class="ratetime">{#rateTime#}</p>{#reply#}<ul class="writeback">{#replyList#}<li>{#replyFrom#}：{#replyContent#}<span class="ratetime">{#replyTime#}</span></li>{#replyList#}</ul>{#reply#}</td><td>买家：{#nickname#}<br/>信用：{#credit#}</td></tr>{#rate#}</tbody></table><div id="ratePageBar"></div><div><p class="historylink"><a style="margin-right:50px;" target="_blank" href="http://shop1.paipai.com/cgi-bin/creditinfo/seo?p=1&id='+ cid +'">查看该商品的全部评价</a><a href="http://shop.paipai.com/' + shopqq + '/10/index.shtml?PTAG=10.1.101">查看卖家全部评价</a></p></div>{#list#}';
//var tp = '<p class="historylink"><a href="http://shop1.paipai.com/' + shopqq + '/credit.shtml?PTAG=10.1.101">查看卖家全部评价</a></p>{#loading#}<table width="100%" height="50" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle" style="font-size:12px; color:#333333; text-align:center;vertical-align: middle; " width="100%" height="100%"><img src="http://static.paipaiimg.com/assets/common/loading2.gif" /><br />评价数据加载中……</td></tr></table>{#loading#}{#none#}<p class="center">{#nonerate#}</p>{#none#}{#list#}<table width="100%" border="0" cellspacing="0" cellpadding="0"><colgroup><col class="ratetxt" /><col class="ratepeople" /></colgroup><thead><tr><th>评价</th><th>评价人</th></tr></thead><tbody>{#rate#}<tr><td>{#badreason#}<p class="badreason">差评原因：{#reasons#}。</p>{#badreason#}<p class="ratetxt">{#content#}</p><p class="ratetime">{#rateTime#}</p>{#reply#}<ul class="writeback">{#replyList#}<li>{#replyFrom#}：{#replyContent#}<span class="ratetime">{#replyTime#}</span></li>{#replyList#}</ul>{#reply#}</td><td>买家：{#nickname#}<br/>信用：{#credit#}</td></tr>{#rate#}</tbody></table><div id="ratePageBar"></div><div><p class="historylink"><a href="http://shop1.paipai.com/' + shopqq + '/credit.shtml?PTAG=10.1.101">查看卖家全部评价</a></p></div>{#list#}';
var hc = tp.replace(/{#none#}.*?{#none#}/, "").replace(/{#list#}.*?{#list#}/, "").replace(/{#loading#}/g, "");
//若1件都没卖出，则直接展示没有评价的信息，而不发异步请求
if(paynum<1){
$$("#rateListContent").html(emptyRates());//.find("p.historylink a").hide();
return false;
}
$$("#rateListContent").html(hc.replace(/{#commodityId#}/g, cid));
//期待回调函数：commodityRateListCallBack
$loadScript("http://shop1.paipai.com/cgi-bin/creditinfo/CmdyEval?sCmdyId=" + cid + "&nCurPage=" + pid + "&nTotal=" + c + "&resettime=" + restime + "&nActionId=" + Math.random());
window.commodityRateListCallBack = function (obj) {
if (obj.nErrNo > 0) { return; }
var hc = "";
if (obj.evalList.length <= 1) {
hc = emptyRates();
} else {
var t0 = ((new RegExp("{#rate#}(.*){#rate#}", "ig")).exec(tp)) ? RegExp.$1 : ""; //每条评价的
var t1 = ((new RegExp("{#badreason#}(.*){#badreason#}", "ig")).exec(tp)) ? RegExp.$1 : ""; //差评模板
var hc0 = ""
for (var i = 0; i < obj.evalList.length; i++) {
hc0 += (!obj.evalList[i]) ? "" : t0.replace(/{#badreason#}.*?{#badreason#}/, (obj.evalList[i].peerEvalLevel == 1) ? t1.replace("{#reasons#}", getBadReasons(obj.evalList[i].peerEvalReason)) : "").replace(/{#content#}/, obj.evalList[i].peerEvalContent).replace(/{#rateTime#}/, obj.evalList[i].peerTime).replace(/{#reply#}.*?{#reply#}/, getReplyList(obj.evalList[i].replyList)).replace(/{#nickname#}/g, obj.evalList[i].buyerName).replace(/{#credit#}/g, $getGradeIcons({ score: obj.evalList[i].buyerCredit, type: "buyer" }).replace(/<a.*?>/g, "").replace(/<\/a>/g, ""));
}
hc = tp.replace(/{#loading#}.*?{#loading#}/, "").replace(/{#none#}.*?{#none#}/, "").replace(/{#list#}.*?{#list#}/g, (((new RegExp("{#list#}(.*){#list#}", "ig")).exec(tp)) ? RegExp.$1 : "").replace(/{#rate#}.*?{#rate#}/, hc0));
}
$$("#rateListContent").html(hc.replace(/{#commodityId#}/g, cid));
$page({
pageCount: obj.nTotalPage, //总页码
currentPage: obj.nCurPage, //当前页码
domList: [$id("ratePageBar")], //内容输出区域的id列表，jquery语法
url: "javascript: $loadRateList({#pageId#},'" + obj.nTotalRecord + "','"+shopqq+"','"+cid+"','"+restime+"');void(0);"
});
function getBadReasons(ids) {
var _r = {
"1": "发货速度慢",
"2": "联系不到卖家",
"3": "临时涨价",
"4": "卖家缺货",
"5": "卖家发错货",
"6": "商品与描述不符",
"7": "虚拟点卡无效",
"8": "卖家使用不文明语言",
"9": "货品质量缺陷",
"10": "卖家拒绝退货",
"11": "物流送货慢",
"12": "物流服务差",
"128": "卖家退款速度慢",
"129": "卖家沟通态度差",
"130": "因为缺货才全额退款",
"131": "货品质量有问题",
"132": "联系不到卖家",
"133": "卖家发货速度慢",
"255": "其它原因",
"256": "长时间不确认收货",
"257": "同行恶意竞争",
"258": "买家使用不文明语言",
"259": "买家不付款",
"511": "其它原因"
};
var _t = ids.split(",");
var _n = [];
for (var i = 0; i < _t.length; i++) {
if (_r[_t[i]] && (("," + _n.join(",") + ",").indexOf("," + _r[_t[i]] + ",") < 0)) {
_n.push(_r[_t[i]]);
}
}
return _n.join(",") + "。";
}
function getReplyList(replyList) {
var hc = "";
var t1 = ((new RegExp("{#reply#}(.*){#reply#}", "ig")).exec(tp)) ? RegExp.$1 : "";
var t2 = ((new RegExp("{#replyList#}(.*){#replyList#}", "ig")).exec(tp)) ? RegExp.$1 : ""; //单条回复模板
for (var j = 0; j < replyList.length; j++) {
if (!replyList[j]) { continue; }
hc += t2.replace("{#replyFrom#}", (replyList[j].isBuyer) ? "买家回复" : "卖家回复").replace("{#replyContent#}", replyList[j].content).replace("{#replyTime#}", replyList[j].time);
}
if (replyList.length > 1) {
return (((new RegExp("{#reply#}(.*){#reply#}", "ig")).exec(tp)) ? RegExp.$1 : "").replace(/{#replyList#}.*?{#replyList#}/, hc);
} else {
return "";
}
}
};
//返回显示无评价的html
function emptyRates(){
return tp.replace(/{#loading#}.*?{#loading#}/, "").replace(/{#list#}.*?{#list#}/, "").replace(/{#none#}/g, "").replace(/{#nonerate#}/g, restime == "0" ? "暂时还没有买家进行评价" : "最近三个月无买家评价此商品");
}
};

function $getStrBetween(str,sBegin,sEnd){
	var bp=str.indexOf(sBegin);
	if(bp==-1){
		return("");
	}
	bp+=sBegin.length;
	var ep=str.indexOf(sEnd,bp);
	if(ep==-1){
		return("");
	}
	return str.substr(bp,ep-bp);
}

function $picPreview(picList, id, maxh, maxw) {
//商品图片大图查看功能
    var t = [];
    for (var i = 0; i < picList.length; i++) {
        (picList[i] != "") ? t.push(picList[i]) : "";
    }
    picList = t;
    //显示遮罩
    var page = (picList.length > 1) ? true : false;
    var cId = id; //当前图片编号

    var picHtml = '<table width="100%" height="' + maxh + '" border="0" cellpadding="0" cellspacing="0" style="background-color:#ffffff"><tr><td width="60" align="center" valign="top"  style="display:none;"><br /><br /><input id="pp1" type="button" value=" << " style="line-height:25px;"/></td><td align="center" valign="middle" ><div id="pp3" style="width:720px;overflow:hidden;"></div></td><td width="60" align="center" valign="top"   style="display:none;"><br /><br /><input id="pp2" type="button" style="line-height:25px;" value=" >> "/></td></tr></table>'

    var al = $float({
        title: "",
        html: picHtml,
        fix: true,
        width: maxw + (page ? 160 : 60),
        height: maxh + 80,
        style: "stand", //stand\none\poptip
        cover: true	//显示
    });

    $$("#floatCover").css("z-index", "3000");
    $$("#floatBox_" + al.id).css("z-index", "4000");

    var l1 = $$("#pp1"), l2 = $$("#pp2"), l3 = $$("#pp3");
    if (page) {
        l2.add(l1).click(function () {
            showPic((this.id == l1.attr("id")) ? parseInt(cId) - 1 : parseInt(cId) + 1);
        }).parent("td").show();
    }
    //显示首张图片，并resize
    showPic(id);
    //根据情况显示上一页等其他的相关控制信息，并resize
    function showPic(id) {
        //编号不正确的情况
        if (id < 0 || id > picList.length - 1) {
            return;
        }
        l3.html('<img src="' + picList[id] + '" alt="点击图片可关闭大图" id="pp4" />');
        $$("#pp4").click(function () {
            al.close();
        }).one("load", function () {
            $reSizeImg(this, maxw, maxh);
            al.width = this.width + (page ? 120 : 0);
            al.height = this.height + 25;
            al.width = (al.width < maxw + (page ? 120 : 0)) ? maxw + (page ? 120 : 0) : al.width;
            al.height = (al.height < maxh + 25) ? maxh + 25 : al.height;
            //al.resize();
        }).one("error", function () {
            al.width = maxw; al.height = maxh + 25;
        });
        cId = id;
        l1.attr("disabled", (cId == 0) ? "disabled" : "");
        l2.attr("disabled", (cId == picList.length - 1) ? "disabled" : "");
    }
};

function $showManlisong(activeObj) {
    //满立送逻辑,延时加载
    var option = {
        shopqq: "",
        cate: "",
        promotetype: '0', //0为店铺促销，1为商品促销，2为2级页面
		linktype:'0' //0普通尾部，1带2级页面链接，2不带链接，2级页面
		};
    for (var i in activeObj) option[i] = activeObj[i];

window.selfmarket_showactiveCallBack = function (obj) {

        var head = '<div class="ploy"><div class="ploy_icon"></div><div class="hd"><h4><span>商家促销</span>（活动时间：{#time#}）</h4></div><div class="bd">';

        var template = '<p class="ploy_list">{#nocond#}本店买就优惠：{#nocond#}{#condmoney#}{#firstsay#}满<em>{#cost#}{#condmoney#}{#hasFree#}{#free#}{#hasFree#}{#hassend#}，送<a href="{#sendLink#}" target="_blank">{#sendName#}</a>{#hassend#}{#hasExchange#}，加<em>{#exchangeMin#}</em>元换购<a href="{#exchangeLink#}" target="_blank">{#exchangeName#}</a>{#hasExchange#}{#hasExpress#}，免运费{#hasExpress#}！</p>';

        var tail = '<p class="ploy_reason">{#activeText#}<br/><span class="ploy_give">{#remark#}</span></p></div></div> ';
		
		
        var codes = "";
        head = head.replace("{#time#}", obj.beginTime + " - " + obj.endTime);
        tail = tail.replace("{#remark#}", obj.remark);
		switch(option.linktype){
			case "0":
			tail=tail.replace("{#activeText#}","<strong>本店指定商品参加促销活动。</strong>");
			break;
			case "1":
			tail=tail.replace("{#activeText#}", "<strong>此商品参与商家促销。</strong>");
			break;
			case "2":
			tail=tail.replace("{#activeText#}", '<strong>本店带有</strong>“'+'<span class="ico-span ico-man" title="此商品参加店铺促销，按照店铺制定规则，购满一定金额或数量，则可享受优惠。"></span>'+'”<strong>图标的商品参与商家促销，</strong><a href="http://shop.paipai.com/'+option.shopqq+'/0-0000000000-2-1-1-0-3-0-0-0/index.shtml">查看参与促销的所有商品 &raquo;</a>');
			break;
			case "3":
			tail=tail.replace("{#activeText#}", '<strong>此分类商品参与商家促销。</strong>');
			break;
		}
        var actives = obj.content;
        for (var i = 0; i < actives.length; i++) {
            var hc = template;
			hc = hc.replace("{#firstsay#}",i==0?"每笔订单":"");
            hc = hc.replace("{#cost#}", (actives[i].cond[0] == "0") ? actives[i].cond[1] + "</em>件" : actives[i].cond[1] + "</em>元");
            if (actives[i].favo1) {
                hc = hc.replace("{#free#}", (actives[i].favo1[0] == "0") ? "减<em>" + actives[i].favo1[1] + "</em>元" : "就打<em>" + actives[i].favo1[1] + "<\/em>折");
            }
            if (actives[i].favo2) {
                hc = hc.replace("{#sendLink#}", actives[i].favo2[1]);
                hc = hc.replace("{#sendName#}", actives[i].favo2[0]);
            }
            if (actives[i].favo3) {
                hc = hc.replace("{#exchangeMin#}", actives[i].favo3[0]);
                hc = hc.replace("{#exchangeName#}", actives[i].favo3[1]);
                hc = hc.replace("{#exchangeLink#}", actives[i].favo3[2]);
            }
            //判断是否有减xx元
            hc = hc.replace((!actives[i].favo1) ? /{#hasFree#}.*?{#hasFree#}/ : /{#hasFree#}/g, "");
            //判断是否有包快递
            if (actives[i].favo4) {
                hc = hc.replace((actives[i].favo4[0] == "0") ? /{#hasExpress#}.*?{#hasExpress#}/ : /{#hasExpress#}/g, "");
            }
            else {
                hc = hc.replace(/{#hasExpress#}.*?{#hasExpress#}/, "");
            }
            //判断是否有条件
            hc = hc.replace((!actives[i].cond) ? /{#nocond#}/g : /{#nocond#}.*?{#nocond#}/, "");
            //判断消费条件
            hc = hc.replace((!actives[i].cond) ? /{#condmoney#}.*?{#condmoney#}/ : /{#condmoney#}/g, "");
            //判断是有商品赠送
            if (actives[i].favo2) {
                hc = hc.replace((actives[i].favo2[0] == "") ? /{#hassend#}.*?{#hassend#}/ : /{#hassend#}/g, "");
            } else {
                hc = hc.replace(/{#hassend#}.*?{#hassend#}/, "");
            }
            //判断是有商品换购
            if (actives[i].favo3) {
                hc = hc.replace((actives[i].favo3[1] == "") ? /{#hasExchange#}.*?{#hasExchange#}/ : /{#hasExchange#}/g, "");
            } else {
                hc = hc.replace(/{#hasExchange#}.*?{#hasExchange#}/, "");
            }

            codes += hc;
        }

        var viewhtml = head + codes + tail;
		
		switch(option.promotetype){
			case '0':
				if($id("userContent")){
					$$("#userContent").after(viewhtml);
				}else{
					$$("#content").prepend(viewhtml);
				}
			break;	
			case '1':
			$$("#iteminfo").before(viewhtml);
			break;
	
			
			case '2':
				$$("div.fr_main").children().eq(0).after(viewhtml);
			break;
			case '3':
				$$("div.fr_main").prepend(viewhtml);
			break;
		}
    };

    $$(document).ready(function () {
        //期待回调函数：commPromotionListCallBack（obj）
        $loadScript("http://my.paipai.com/cgi-bin/selfmarket_show?uin=" + option.shopqq+ "&t=" + Math.random(), "manlisong");
    });
};

function $hasClass(old,cur){
	if(!old||!cur) return null;
	var arr=old.split(' ');
	for(var i=0,len=arr.length;i<len;i++){
		if(cur==arr[i]){
			return cur;
		}
	};
	return null;
}

(function(){
    var	isBind=false,
        heightList=[],
        funcList=[],
        optList=[],
        visibleH=document.documentElement.clientHeight;//浏览器高度
    
    $scroll=function(opt){
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
        if(isBind){
            isBind=true;
        }else{
            $addEvent(window,'scroll',doScroll);
            $addEvent(window,'resize',doResize);
        };
        
		function doResize(){
			visibleH=document.documentElement.clientHeight;
			doScroll();
		};
		
        function doScroll(){
			var len=heightList.length;
			if(len===0){
				$delEvent(window,'scroll',doScroll);
            	$delEvent(window,'resize',doScroll);
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

function $empty(){
//返回全局空函数，不做任何事情，返回true；
   if(!window["_PP_core_empty"]){
       window["_PP_core_empty"]=function(){return true;}
   }
   return window["_PP_core_empty"];
}

function $floatSub(arg1,arg2){
//浮点数减法运算   
 var r1,r2,m,n;  
 try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  
 try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  
 m=Math.pow(10,Math.max(r1,r2));  
 //动态控制精度长度  
 n=(r1>=r2)?r1:r2;  
 return ((arg1*m-arg2*m)/m).toFixed(n);  
}

function $mouseover(obj,func){
	obj.onmouseover=function(e){
		var e=window.event||e,
			target=e.fromElement || e.relatedTarget,
			parent=target;
		while ( parent && parent !== this ) {
			parent = parent.parentNode;
		}	
		if ( parent !== this ) {
			func(this);
		}
	}
}

function $mouseout(obj,func){
	obj.onmouseout=function(e){
		var e=window.event||e,
			target=e.toElement || e.relatedTarget,
			parent=target;
		while ( parent && parent !== this ) {
			parent = parent.parentNode;
		}	
		if ( parent !== this ) {
			func(this);
		}
	}
}

function $purge(d) {
    var a = d.attributes, i, l, n;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            n = a[i].name;
            if (typeof d[n] === 'function') {
                d[n] = null;
            }
        }
    }
    a = d.childNodes;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            purge(d.childNodes[i]);
        }
    }
}

function $destoryDomEvents(d) {
    var a = d.attributes, i, l, n;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            if (a[i]) {
                n = a[i].name;
                if (typeof d[n] === 'function') {
                    d[n] = null;
                }
            }
        }
    }
    a = d.childNodes;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            $destoryDomEvents(d.childNodes[i]);
        }
    }
};

function $ajax(opt) {
	/*本函数基于QZFL.XHR实现*/
	var o={
		url:'', 	//请求地址
		method:'GET', 	//发送方式，除非指明POST，否则全部为GET
		data:null, 		//hashTable形式的字典
		cache:false,	//是否缓存，默认不缓存
		onSuccess:$empty(),
		onError:$empty(),
                onComplete:$empty()
	};	
	//合并参数
	for(var key in opt){
		o[key]=opt[key]
	};

	o.method = (typeof(o.method) != "string" || o.method.toUpperCase() != "POST")?"GET":"POST";
	o.data   = $makeUrl(o.data);
	
	if(o.method == 'POST' && o.data == null) {
		return false;
	}	
	
	if(o.method == 'GET' && o.data){
		o.url += (o.url.indexOf("?") < 0 ? "?"  : "&") +  o.data;
	}	
	
	o.xhr = (function(){
		var xhr;
		try{// Firefox, Opera 8.0+, Safari
    		xhr=new XMLHttpRequest();
    	}catch(e){//Internet Explorer
   			try{
      			xhr=new ActiveXObject("Msxml2.XMLHTTP");
      		}catch(e){
      			try {
         			xhr=new ActiveXObject("Microsoft.XMLHTTP");
         		}catch (e){
        			xhr=null;
         		}
      		}
    	};
		return xhr;
	})();

	if(o.xhr===null){
		return false;
	}

	try {
		o.xhr.open(o.method, o.url, true);
	} catch (e) {
		return false;
	}
	
	if (o.method == 'POST') {
		o.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	
	if (!o.cache) {
		o.xhr.setRequestHeader('If-Modified-Since', 'Thu, 1 Jan 1970 00:00:00 GMT');
		o.xhr.setRequestHeader('Cache-Control', 'no-cache');
	}
	
	o.xhr.onreadystatechange = function() {
		try {
			if (o.xhr.readyState == 4) {
				if (o.xhr.status >= 200 && o.xhr.status < 300) {
					o.onSuccess({
						text : o.xhr.responseText,
						xml : o.xhr.responseXML
					});
				} else {
					o.onError(o.xhr.status);
				}
                                o.onComplete(o.xhr.status);
				delete o.xhr;
			}
		} catch (e) {}
	};

	o.xhr.send(o.method == 'POST' ? o.data : null);
};

function $formatTjw(opt){
	var o={
		src:"",			//数据源路径
		template:'',	//模板内容
		pageType:0,		//0:不分页;1:左右分页
		pTag:'',		//统计信息
        showLength:0,   //只显示列表中的几个，如果为0的时候，显示所有
        startNum:0,     //从第几个开始
		interval:0,     //毫秒值，如果不为0，则定时刷新
		filter:'',      //过滤串，必须为‘{#itemCode#}==aaaaa’这种类型
		content:null,	//数据展示的位置，dom形式
		/*以上是共用可配置，一下是系统生成的*/
		prev:0,			//上一个开始
		next:0,			//下一个开始
		total:0,		//总个数
		data:null,		//存储已获取的xml	
		intr:null,		//如果有分页，定时拉取数据
		isBindPage:false	//如果有分页，是否已经绑定上一页，下一页
	};
	for(var k in opt){
		o[k]=opt[k];
	}
	
	var id=o.content.id,
		hc='<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle" style="font-size:13px; color:#333333; text-align:center;vertical-align: middle; " width="100%" height="100%"><img src="http://static.paipaiimg.com/assets/common/loading2.gif" /><br />数据加载中……</td></tr></table>';//居中显示loading状态
	o.content.innerHTML=hc;
	//判断数据是否已经存在在数据中心，如果存在就直接显示，不加载，如果不存在就开始加载
	if(o.data){
		showXml();
	}else{
		$ajax({
			url:o.src,
			onSuccess :function(data){
				o.data=data.xml;
				o.total=o.data.getElementsByTagName('item').length;
				o.pTag=o.pTag?o.pTag:o.data.getElementsByTagName('domainId')[0].firstChild.nodeValue*1+"."+o.data.getElementsByTagName('pageId')[0].firstChild.nodeValue*1+".{#linkId#}";
				showXml();
			},
			onError:function(msg){
				//alert(msg);
				return false;
			}
		}); 
	}

	
	//根据opt的值输出data中的对应内容。
	function showXml(){
		//检查当前要显示的页是否有数据，没有数据则说明操作混乱，不予理会该请求
		if(!o.data){return false;}
		var arrHtml=[],
			data=o.data,
			list=data.getElementsByTagName('item'),
			startNum=o.startNum*1+o.showLength*1;

		for(var i=o.startNum,len=o.total,startNum=(startNum>0)?startNum:len;(i<startNum && i<len) ;i++){
			var itemInfo={};
			for(var j=0,jLen=list[i].attributes.length;j<jLen;j++){
				itemInfo[list[i].attributes[j].name]=list[i].attributes[j].value;
			}
			
			var valueNodes=list[i].childNodes;
			for(var j=0,jLen=valueNodes.length;j<jLen;j++){
				itemInfo[valueNodes[j].nodeName]=valueNodes[j].firstChild?valueNodes[j].firstChild.nodeValue:"";
			};
			
			if(o.filter){
				var filter=o.filter;
				for(var j in itemInfo){
					filter=$strReplace(filter,"{#"+j+"#}","itemInfo['"+j+"']");
				};
				filter=eval(filter);
				if(!filter) continue;
			};	
			
			var discount=Math.round(parseFloat(itemInfo["newPrice"])-parseFloat(itemInfo["vouPrice"])),	//红包面值
				sysPtag=o.pTag.replace('{#linkId#}',i),
				cUrl=itemInfo["commodityUrl"],
				url=cUrl?(cUrl+(cUrl.indexOf('?')==-1?"?":"&")+"PTAG="+sysPtag):"http://auction1.paipai.com/"+itemInfo["id"]+"?PTAG="+sysPtag,
				gradeIcon=PP.icons?PP.icons.grade({qq:itemInfo["qq"],showScore:false,score:itemInfo["userCredit"],type:"seller"}):"",//等级图标
				badEvalRate=(parseFloat(itemInfo["badEvalRate"])/10).toFixed(1)+"%",//差评
				goodEvalRate=(parseFloat(itemInfo["goodEvalRate"])/10).toFixed(1)+"%",//好评
				lawSuitRate=(parseFloat(itemInfo["lawSuitRate"])/10).toFixed(1)+"%",//店铺投诉率	
				recmdReason=itemInfo["recmdReason"],//推荐理由
				costMoney=itemInfo["costMoney"]*1,
				rec_title=recmdReason?recmdReason.split("#")[0]:"",
				rec_description=recmdReason?recmdReason.split("#")[1]:"",
				shopUrl="http://"+itemInfo["qq"]+".paipai.com/?PTAG="+sysPtag;

			//商品列表的html代码
			var html=$strReplace(o.template,{
				"{#url#}":url,
				"{#shopUrl#}":shopUrl,
				"{#costMoney#}":costMoney,
				"{#discount#}":discount,
				"{#gradeIcon#}":gradeIcon,
				"{#rec_title#}":rec_title,
				"{#rec_description#}":rec_description,
				"{#badEvalRate#}":badEvalRate,	 
				"{#goodEvalRate#}":goodEvalRate,
				"{#lawSuitRate#}":lawSuitRate,
				"{#uploadTimeSim#}":itemInfo['uploadTime'].substr(11,5),
				"{#price#}":$formatPrix(itemInfo['newPrice'],"x.x")[0],
				"{#priceToday#}":$formatPrix(itemInfo['todayPrice'],"x.x")[0]
	   		});
			for(var j in itemInfo){
				html=$strReplace(html,"{#"+j+"#}",itemInfo[j]);
			};
			arrHtml.push(html);
		};
		
		//填入商品列表的html代码
		o.content.innerHTML=arrHtml.join('');
				
		if(1==o.pageType&&o.total>o.showLength*1){	
			showPage();
		}
	};
	//翻页控件
	function showPage(){
		var oParent=o.content.parentNode,
			isIE=$isBrowser('ie'),
			oLeft=isIE?oParent.childNodes[0]:oParent.childNodes[1],
			oLeftLink=oLeft.childNodes[0],
			oRight=isIE?oParent.childNodes[1]:oParent.childNodes[3],
			oRightLink=oRight.childNodes[0];
		o.next = o.startNum*1+o.showLength*1;
		o.prev = o.startNum*1-o.showLength*1;

	
		if(!o.isBindPage){
			//第一次进入的时候绑定
			o.isBindPage=true;
			
			var	time=o.interval*1;
			if(time>0){
				//自动翻页，注册定时执行事件，仅循环一次
				o.intr=setInterval(function(){	
					if(o.next < o.total){		
						o.startNum=o.next;
						showXml();
					}else{
						clearInterval(o.intr);
					}
				},time)
			};			

			$display(oLeft);
			$display(oRight);
			
			oLeftLink.onclick=function(){
				clearInterval(o.intr);
				if(this.className!="end"){
					o.startNum=o.prev;
					showXml();
				}
			};
			
			oRightLink.onclick=function(){
				clearInterval(o.intr);
				if(this.className!="end"){
					o.startNum=o.next;
					showXml();
				}
			};
			
		}
		
		if(o.prev < 0){
			oLeftLink.className='end';
			oRightLink.className='';
		}else if(o.next >= o.total){
			oLeftLink.className='';
			oRightLink.className='end';
		}else{
			oLeftLink.className='';
			oRightLink.className='';
		}
	}
};

function $xmlPage(option){
	var opt = {
		dataUrl:"",			//数据源路径
        template:'',			//模板内容
        contentId:"",		//jquery语法表示的用于显示商品列表的dom id
        page:false,			//是否显示分页
        pageId:"",			//jquery语法表示的用于显示分页控制条的dom id
        pageType:"simple",	//分页显示的类型
        pTag:"",				//ptag标记
        firstPageId:1,		//默认显示第几页
        showLength:0,	//只显示列表中的几个，如果为0的时候，显示所有
        startNum:0,		//从第几个开始
        onShowed:$empty(),
        //组件内部运行数据
        data:[],				//存储数据值
        currentPage:1,	//要显示的页面
        pageCount:0,		//数据的总页数
        itemCount:0,		//数据总条数
        actionId:0,			//操作id
        content:"",			//显示列表对象
        pageBar:""			//显示分页列表对象
	};
	$extend(opt,option);
	opt.content = $$(opt.contentId);
	opt.pageBar = $$(opt.pageId);
	getXml(opt);
	
	function getXml(opt){
		//显示loading状态
		var hc='<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle" style="font-size:13px; color:#333333; text-align:center;vertical-align: middle; " width="100%" height="100%"><img src="http://static.paipaiimg.com/assets/common/loading2.gif" /><br />数据加载中……</td></tr></table>';
		opt.content.html(hc);
		$ajax({
			method:'get',
			url:opt.dataUrl,
			onSuccess :function(data){
				var itemList = data.xml.getElementsByTagName('item');
				opt.itemCount = itemList.length;
				opt.pageCount = parseInt(opt.itemCount/opt.showLength) + ((opt.itemCount % opt.showLength>0) ? 1 : 0) ;	
				var page = [];
				for ( var i = 0 , len = opt.itemCount; i < len ; i++)
				{
					page.push(itemList[i])
					if ( (i+1) % opt.showLength == 0)
					{
						opt.data.push( page );
						page = [];
					}
				}
				showXml(opt);
			},
			onError:function(da,b,er){
			}
		});
	}
	function showXml(opt){
		if (!opt.data[opt.currentPage-1]) return;
		var list = opt.data[opt.currentPage-1];
		var html = [];
		for(var i = 0, len = list.length; i < len; i++)
		{
            var itemInfo={};
            for(var j=0;j<list[i].attributes.length;j++)
			{
                itemInfo[list[i].attributes[j].name]=list[i].attributes[j].value;
            }
            var valueNodes=$$(list[i]).children();
            for(var j=0;j<valueNodes.length;j++)
			{
                itemInfo[valueNodes[j].nodeName]=valueNodes[j].firstChild?valueNodes[j].firstChild.nodeValue:"";
            };
			
			html.push( $json2temp( itemInfo, opt.template ));
		}
		opt.content.html( html.join("") );
		
		$page({
			pageCount:opt.pageCount,    //总页码
			currentPage:opt.currentPage,    //当前页码
			domList:[opt.pageBar],        //内容输出区域的id列表，jquery语法
			type:opt.pageType,
			action:'func',
			func:function(pid){
				opt.currentPage = pid;
				showXml(opt);
			}
		});
	}
}

function  $validator() {
    var validator = {
        Require: /.+/,
        Email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        Phone: /^(1[3584]\d{9})$|^(\d{3,4}\-)?\d{7,9}$|^\d{3,4}\-\d{3,9}\-\d{1,5}$/,
        Phone2: /^(\d{3,4}\-)?\d{7,9}(\-\d{1,5})?$/,
        Mobile: /^(1[3584]\d{9})$/,
        Url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
        IdCard: "this.IsIdCard(value)",
        IdCardAuth: "this.IsIdCardAuth(value,getAttribute('date'))",
        ICBCard: /^((40000\d{14})|(95588\d{14})|(6222\d{15})|(\d{16}))$/,
        Currency: /^\d+(\.\d+)?$/,
        Number: /^\d+$/,
        Zip: /^[0-9]\d{5}$/,
        QQ: /^[1-9]\d{4,9}$/,
        Integer: /^[-\+]?\d+$/,
        Double: /^[-\+]?\d+(\.\d+)?$/,
        English: /^[A-Za-z]+$/,
        Chinese: /^[\u0391-\uFFE5]+$/,
        NameGB: /^[\u0391-\uFFE5]{2,}$/,
        NameENOrGB: /^[A-Za-z\u0391-\uFFE5][A-Z a-z\u0391-\uFFE5]*[A-Za-z\u0391-\uFFE5]$/,
        NameENOrGB1: /^[A-Za-z]{3,30}$/,
        variCode: /\w{4}/,
        Username: /^[a-z]\w{3,}$/i,
        UnSafe: /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
        IsSafe: function (str) {
            return !this.UnSafe.test(str);
        },
        SafeString: "this.IsSafe(value)",
        Filter: "this.DoFilter(value, getAttribute('accept'))",
        Limit: "this.limit(value.length,getAttribute('min'), getAttribute('max'))",
        LimitB: "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))",
        Repeat: "value == document.getElementsByName(getAttribute('to'))[0].value",
        Range: "parseFloat(getAttribute('min')) <= parseFloat(value) && parseFloat(value) <= parseFloat(getAttribute('max'))",
        Compare: "this.compare(value,getAttribute('operator'),getAttribute('to'))",
        Custom: "this.Exec(value, getAttribute('regexp'))",
        Group: "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('max'))",
        Date: "this.IsDate(value, getAttribute('min'), getAttribute('format'))",
        ErrorItem: [document.forms[0]],
        ErrorMessage: ["温馨提示：由于以下可能原因，您需要调整输入信息。\t\t\t\t\n"],

        Validate: function (theForm, theItem) {
            var obj = theForm;
            var objItem;
            var count;
            this.ErrorMessage.length = 1;
            this.ErrorItem.length = 1;
            this.ErrorItem[0] = obj;
			
            count = theItem?1:obj.elements.length;

            for (var i = 0; i < count; i++) {
                objItem = theItem?theItem:obj.elements[i];
                with(objItem) {
                    var _dataType = getAttribute("dataType");
                    if (typeof(_dataType) == "object" || typeof(this[_dataType]) == "undefined") continue;
                    this.ClearState(obj.elements[i]);
                    if (getAttribute("checkwith") != null) {
                        var _theObj = getAttribute("checkwith");
                        var _unionObjs = document.getElementsByName(_theObj);
                        var iIndex;
                        if (_unionObjs.length > 0) {
                            for (iIndex = 0; iIndex < _unionObjs.length; iIndex++) {
                                if (value == "" && _unionObjs[iIndex].value != "") break;
                            }
                            if (iIndex < _unionObjs.length) {
                                this.ShowMsg(name, " ", "message");
                                setAttribute("require", "false", 0);
                            }
                        }
                    }
                    if (getAttribute("require") == "false" && value == "") {
                        this.ShowMsg(name, " ", "hide");
                        continue;
                    }
                    if (!this.Require.test(value)) {			
                        this.AddError(i, "必填项不能为空。");
                        continue;
                    }
		
                    switch (_dataType) {
                    case "Mobile":
                        if (!this.Number.test(value)) this.AddError(i, "请确认输入的是数字。");
                        else if (value.length != 11) this.AddError(i, "您输入的手机号码位数不正确。");
                        else if (!this.Mobile.test(value)) this.AddError(i, "手机号码不正确。");
                        else this.ShowMsg(name, "格式正确。", "hide");
                        break;
					case "Phone":
                        if (!this.Phone.test(value)) {
							this.AddError(i, "号码格式不正确。");
						}else{
							/^\d{7,9}$/.test(value)?this.AddError(i, "填写固话时需填写区号。"):this.ShowMsg(name, "格式正确。", "hide");
						}
                        break;	
                    case "NameGB":
                        if (!this.Chinese.test(value)) this.AddError(i, "请输入中文合法字符。");
                        else if (!this.NameGB.test(value)) this.AddError(i, "请完整地输入您的中文姓名。");
                        else this.ShowMsg(name, "格式正确。", "message");
                        break;
                    case "NameENOrGB":
                        if (!eval(this.LimitB)) this.AddError(i, "请输入“" + getAttribute('min') + "～" + getAttribute('max') + "个字符”（1个汉字为2个字符）。");
                        else if (!this.NameENOrGB.test(value)) this.AddError(i, "");
                        else this.ShowMsg(name, "格式正确。", "message");
                        break;

                    case "NameENOrGB1":
                        var value1 = value.replace(/[^\x00-\xff]/g, "aa");
                        if (!eval(this.LimitB)) this.AddError(i, "请输入“" + getAttribute('min') + "～" + getAttribute('max') + "个字符”（1个汉字为2个字符）。");
                        else if (!this.NameENOrGB1.test(value1)) this.AddError(i, "");
                        else this.ShowMsg(name, "格式正确。", "message");
                        break;

                    case "LimitB":
                        if (!eval(this.LimitB)){ 
							var msg="请输入“" + getAttribute('min') + "～" + getAttribute('max') + "个字符”（1个汉字为2个字符）。";
							if(parseInt(getAttribute('min'))==parseInt(getAttribute('max'))){
								msg="请输入“" + getAttribute('min') + "个字符”（1个汉字为2个字符）。";
							}
							this.AddError(i, msg);
						}else {
							this.ShowMsg(name, "格式正确。", "message");
						}
                        break;
                    case "variCode":
                        if (!this.variCode.test(value)) this.AddError(i, "请输入4个字符。");
                        else this.ShowMsg(name, "格式正确。", "message");
                        break;
                    case "IdCard":
                        if (value.length != 15 && value.length != 18) this.AddError(i, "您填写的身份证号码位数不正确。");
                        else if (!eval(this.IdCard)) this.AddError(i, "请输入符合身份证号码规范的数字和英文。");
                        else this.ShowMsg(name, "格式正确。", "message");
                        break;
                    case "IdCardAuth":
                        if (value.length != 15 && value.length != 18) this.AddError(i, "您填写的身份证号码位数不正确。");
                        else if (!eval(this.IdCard)) this.AddError(i, "请输入符合身份证号码规范的数字和英文。");
                        else if (!eval(this.IdCardAuth)) this.AddError(i, "您还未满18岁，暂时不能提交身份证认证。");
                        else this.ShowMsg(name, "格式正确。", "message");
                        break;
                    case "Range":
                        if (!this.Double.test(value)) {
                            this.AddError(i, "请确认输入的是数字。");
                        }
                        else if (!eval(this[_dataType])) {
                            this.AddError(i, "");
                        } else {
                            if (type == "text" || type == "file" || type == "password") this.ShowMsg(name, "格式正确。", "message");
                            else this.ShowMsg(name, "", "message");
                        }
                        break;

                    case "Date":
                    case "Repeat":
                    case "Compare":
                    case "Custom":
                    case "Group":
                    case "Limit":
                    case "SafeString":
                    case "Filter":
                    case "ICBCCard":
                        if (!eval(this[_dataType])) {
                            this.AddError(i, "");
                        } else {
                            if (type == "text" || type == "file" || type == "password") this.ShowMsg(name, "格式正确。", "message");
                            else this.ShowMsg(name, "", "message");
                        }
                        break;
                    default:
                        if (!this[_dataType].test(value)) {
                            this.AddError(i, "格式不正确。");
                        } else {
                            if (type == "text") this.ShowMsg(name, "格式正确。", "message");
                            else this.ShowMsg(name, "", "message");
                        }
                        break;
                    }
                }
            }
			
			
			//总体处理验证显示
            if (this.ErrorMessage.length > 1) {				
				var errCount = this.ErrorItem.length;
				//验证独个输入框的情况
                if (theItem) {
				//验证独个输入框的情况
                    this.ShowMsg(theItem.name, this.ErrorMessage[i].replace(/\d+:/, "")+theItem.getAttribute("msg"));
                } else {
				//验证整个form的情况
                    for (var i = 1; i < errCount; i++) {
						if(this.ErrorItem[i].getAttribute("require")=="true"){
                        	this.ShowMsg(this.ErrorItem[i].name, this.ErrorMessage[i].replace(/\d+:/, "")+this.ErrorItem[i].getAttribute("msg"));
						}
                    }
                    //(this.ErrorItem[errCount - 1].type != "hidden")? this.ErrorItem[errCount - 1].focus():"";
					var theitem = this.ErrorItem[1];
					(theitem.type != "hidden")? setTimeout(function(){theitem.focus()},0):"";

                }
                return false;
            }
            return true;
        },
		//提示信息展示
        ShowMsg: function (name, msg, type) {
            var msgObj = document.getElementById(name + "_Msg");
			var itemObj=document.getElementById(name);
			if(itemObj && !type){
				if(itemObj.getAttribute("errorClean")=='on'){
					itemObj.value="";
				}
			}
            if (msgObj) {
				//如果require属性为false则隐藏提示区域
				if(type=="hide"){
					msgObj.style.display="none";
				}else{
					msgObj.style.display="";
				}
				
                if (!type) {
					type = "msg-para-warn warning_box";
					msg = '<span class="msg0-icon-warn"></span>'+msg;
				}
				if(type=="message"){
					type = "msg-para-right warning_box";
					msg = '<span class="msg0-icon-right"></span>'+msg;
				}
                msgObj.className = type;
                msgObj.innerHTML = msg;
            }
        },
        limit: function (len, min, max) {
            min = min || 0;
            max = max || Number.MAX_VALUE;
            return min <= len && len <= max;
        },
        LenB: function (str) {
            return str.replace(/[^\x00-\xff]/g, "**").length;
        },
        ClearState: function (elem) {
            with(elem) {
                style.color = "";
                style.borderColor = "";
                var lastNode = parentNode.childNodes[parentNode.childNodes.length - 1];
                if (lastNode.id == "__ErrorMessagePanel") parentNode.removeChild(lastNode);
            }
        },
        AddError: function (index, str) {
            this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
            this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
        },
        Exec: function (op, reg) {
            return new RegExp(reg, "g").test(op);
        },
        compare: function (op1, operator, op2) {
            switch (operator) {
            case "NotEqual":
                return (op1 != op2);
            case "GreaterThan":
                return (op1 > op2);
            case "GreaterThanEqual":
                return (op1 >= op2);
            case "LessThan":
                return (op1 < op2);
            case "LessThanEqual":
                return (op1 <= op2);
            default:
                return (op1 == op2);
            }
        },
        MustChecked: function (name, min, max) {
            var groups = document.getElementsByName(name);
            var hasChecked = 0;
            min = min || 1;
            max = max || groups.length;
            for (var i = groups.length - 1; i >= 0; i--)
            if (groups[i].checked) hasChecked++;
            return min <= hasChecked && hasChecked <= max;
        },
        DoFilter: function (input, filter) {
            exp_str1 = filter.split(",").join("|");
            exp_str2 = exp_str1.replace(/\s+/g, "");
            return new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, exp_str2), "gi").test(input);
        },
        IsIdCard: function (number) {
            var date, Ai;
            var verify = "10x98765432";
            var verify2 = "10x98765432";
            var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var area = ['', '', '', '', '', '', '', '', '', '', '', '北京', '天津', '河北', '山西', '内蒙古', '', '', '', '', '', '辽宁', '吉林', '黑龙江', '', '', '', '', '', '', '', '上海', '江苏', '浙江', '安微', '福建', '江西', '山东', '', '', '', '河南', '湖北', '湖南', '广东', '广西', '海南', '', '', '', '重庆', '四川', '贵州', '云南', '西藏', '', '', '', '', '', '', '陕西', '甘肃', '青海', '宁夏', '新疆', '', '', '', '', '', '台湾', '', '', '', '', '', '', '', '', '', '香港', '澳门', '', '', '', '', '', '', '', '', '国外'];
            var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
            if (re == null) return false;
            if (re[1] >= area.length || area[re[1]] == "") return false;
            if (re[2].length == 12) {
                Ai = number.substr(0, 17);
                date = [re[9], re[10], re[11]].join("-");
            }
            else {
                Ai = number.substr(0, 6) + "19" + number.substr(6);
                date = ["19" + re[4], re[5], re[6]].join("-");
            }
            if (!this.IsDate(date, "ymd")) return false;
            var sum = 0;
            for (var i = 0; i <= 16; i++) {
                sum += Ai.charAt(i) * Wi[i];
            }
            Ai += verify.charAt(sum % 11);
            return (number.length == 15 || number.length == 18 && number.toLowerCase() == Ai);
        },

        IsIdCardAuth: function (number, svrTime) {
            var date, datetime, nowtime;
            var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
            if (re[2].length == 12) {
                Ai = number.substr(0, 17);
                date = [re[9], re[10], re[11]].join("-");
                if (!this.IsDate(date, "ymd")) return false;
                datetime = new Date(parseInt(re[9], 10), parseInt(re[10], 10) - 1, parseInt(re[11], 10), 0, 0, 0, 0);
            }
            else {
                Ai = number.substr(0, 6) + "19" + number.substr(6);
                date = ["19" + re[4], re[5], re[6]].join("-");
                if (!this.IsDate(date, "ymd")) return false;
                datetime = new Date(parseInt("19" + re[4], 10), parseInt(re[5], 10) - 1, parseInt(re[6], 10), 0, 0, 0, 0);
            }
            var nowtime = new Date();
            var timeCompare;
            if (svrTime) timeCompare = svrTime * 1000;
            else timeCompare = nowtime.getTime();
            if ((timeCompare - datetime.getTime()) < (18 * 3600 * 24 * 365 * 1000 + 4 * 24 * 3600 * 1000)) return false;
            else return true;
        },

        IsDate: function (op, formatString) {
            formatString = formatString || "ymd";
            var m, year, month, day;
            switch (formatString) {
            case "ymd":
                m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
                if (m == null) return false;
                day = m[6];
                month = m[5] * 1;
                year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
                break;
            case "dmy":
                m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
                if (m == null) return false;
                day = m[1];
                month = m[3] * 1;
                year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
                break;
            default:
                break;
            }
            if (!parseInt(month)) return false;
            month = month == 0 ? 12 : month;
            var date = new Date(year, month - 1, day);
            return (typeof(date) == "object" && year == date.getFullYear() && month == (date.getMonth() + 1) && day == date.getDate());

            function GetFullYear(y) {
                return ((y < 30 ? "20" : "19") + y) | 0;
            }
        }
    }
    return validator;
}

function $addZero(v,size){
	for(var i=0,len=size-(v+"").length;i<len;i++){
		v="0"+v;
	};
	return v;
}

function $replace(tpl, argsArray){
	var _t = tpl;
        for(var i=0,len=argsArray.length; i<len; i++){
                var curr = argsArray[i];
		_t = _t.replace(curr[0], curr[1]);
	}
	return _t;
}

function $initSearchListShowBigImg(){
//初始化搜索列表商品图片显示大图片功能,图片必须具有cid(商品id)，bImg（商品大图url）属性
	var option={
		zoomObj:"",//显示图片的对象
		zoomHTML:"",
		zoomTime:null,
		zoomPos:16
	};
	//全局变量定义
	window._PP_searchListBigImg=option;
	//计算要显示的内容，参数（图片对象、商品id、图片url、）
	window.zoomSearchImg=function(obj){
		var option=window._PP_searchListBigImg
		var bigSrc=obj.getAttribute("bImg")
		var oImg = new Image(),imgExt,excursion;
		oImg.src = bigSrc;
		var oldW = oImg.width;
		var oldH = oImg.height;
		if (oldW == 80 && oldH == 80){
			bigSrc = bigSrc.replace("300x300","200x200");
			excursion = 200;//图片尺寸
			$id("zoomPrev").className = "small";
		}else{
			excursion = 300;
			$id("zoomPrev").className = "large";
		}
		var layerX = $getX(obj) + 80;
		var layerY = $getY(obj) + 10;
		if (layerX > (screen.width-excursion))layerX = (layerX - excursion);
		if (layerY < $getPageScrollHeight()){layerY = $getPageScrollHeight()}
		if ((layerY + (excursion + 15)) > ($getPageScrollHeight() + $getWindowHeight())){
			option.zoomPos = parseInt((layerY + (excursion + 15)) - ($getPageScrollHeight() + $getWindowHeight()) + 16) + "px";
			layerY = (($getPageScrollHeight() + $getWindowHeight()) - (excursion + 15));
		}else{
			option.zoomPos = 16 + "px";
		}
		option.zoomObj.style.left = layerX + "px";
		option.zoomObj.style.top = layerY + "px";
		option.zoomObj.style.zIndex = "1000";
		option.zoomHTML = "<a href='http://auction1.paipai.com/" + obj.getAttribute("cid") + "?PTAG=30658.5.1' target='_blank'><img src='"+bigSrc+"'  lg='6004'>";
		option.zoomTime = setTimeout("showSearchImg()",50);
	};
	//显示图片框
	window.showSearchImg=function(){
		var option = window._PP_searchListBigImg;
		if (option.zoomObj.style.display != "block"){
			$id("zoomPrev").innerHTML = option.zoomHTML;
			if ($id("showWay")){$id("showWay").style.top = option.zoomPos};
			option.zoomObj.style.display = "block";
		}
	};
	//隐藏图片框
	window.hideSearchImg=function(){
		var option = window._PP_searchListBigImg;
		if (option.zoomTime){
			clearTimeout(option.zoomTime);
		}
		option.zoomObj.style.display = "none";
	};
	//创建对象显示外框
	createFrame();
	//绑定所有tag为showBig的图片对象
	bindImages();
	//创建对象显示外框
	function createFrame(){
		//创建辅助对象
		var imageFrame=document.createElement("div")
		imageFrame.className="zoom_img";
		imageFrame.id="zoomImg";
		imageFrame.style.display="none";
		imageFrame.onmouseover=function(){showSearchImg()};
		imageFrame.onmouseout=function(){hideSearchImg()};
		imageFrame.innerHTML='<div id="zoomPrev"></div><span id="showWay"></span>';
		document.body.appendChild(imageFrame);
		_PP_searchListBigImg.zoomObj=document.getElementById("zoomImg");
	}
	//绑定所有tag为showBig的图片对象
	function bindImages(){
		var imgs=document.images;
		for(var i=0;i<imgs.length;i++){
			if(imgs[i].getAttribute("tag")=="showBig"){
				imgs[i].onmouseover=function(){
					zoomSearchImg(this);
				};
				imgs[i].onmouseout=function(){
					hideSearchImg(this);
				};
			}
		}
	}
}

function $getWeekNumOfYear(){
	var today = new Date();
	var end = new Date(today.getFullYear(),today.getMonth(),today.getDate());
	var start = new Date(today.getFullYear(),0,1);
	var d = Math.round((end -start)/86400000);
	return Math.ceil((start.getDay()+d-today.getDay())/7+1);
};

function $showBuyerVipFlash(opt){
//输出彩钻vip成长值进度条FLASH代码
	var option={
		maxXp:30000, //成长值上限
		userXp:0,	//当前成长值
		state:0		//彩钻状态，0为激活，1为灰态
	}
	for(var i in opt){
		option[i]=opt[i];
	}
	var temp ='<object width="490" height="50" data="http://static.paipaiimg.com/flash/release/buyervip/main.swf?t=201003101&maxXp={#maxXp#}&userXp={#userXp#}&invalid={#invalid#}" type="application/x-shockwave-flash"><param value="http://static.paipaiimg.com/flash/release/buyervip/main.swf?t=201003101maxXp={#maxXp#}&userXp={#userXp#}&invalid={#invalid#}" name="movie"><param name="quality" value="high"><param value="transparent" name="wmode"><param value="maxXp={#maxXp#}&userXp={#userXp#}&invalid={#invalid#}" name="flashvars"></object>';
	temp = temp.replace(/{#maxXp#}/g,option.maxXp);		
	temp = temp.replace(/{#userXp#}/g,option.userXp);
	temp = temp.replace(/{#invalid#}/g,option.state);
	return temp;
}

function $getBuyerVipIcon(level,state){
//获取彩钻vip用户等级图标
	var html=['<img src="http://static.paipaiimg.com/module/icon/credit/'],
		map={0:'color_dis_lv'+level,1:'color_lv'+level};
	html.push(map[state*1]);
	html.push('.gif" alt="" />');
	return html.join('');
}

function $getBuyerVipNextGradeExp(ex){
//获取彩钻vip用户升级所需积分
	var gradeList = [1,150,510,1200,3000];
	var needExp = 0;
	var html = "";
	for (var i = 0, len = gradeList.length; i < len; i++){
		if (ex < gradeList[ i ] ){
			needExp = gradeList[ i ] - ex;
			break;
		}
	}
	if(needExp == 0){
		html = "";
	}else{
		html = needExp;
	}	
	return needExp;
}

function $getQuerySafe(name, url) {
    var s = escape($getQuery(name, url));
    s=s.replace(/[\?|#].*/, "").replace(/(%23|%3F).*/i,"").replace(/(%2523|%253F).*/i,""); 
    return s
}

function $getMarketTemplate(className,btn,price,oldprice,soldOut){
	//获取卖场的标准列表元素模板，参数：className样式名（格式：pp_list_1_for_4），btn按钮样式名，price价格标题，oldprice对比价格标题
	var template=[]; 
	template[0]='<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle" style="font-size:13px; color:#333333; text-align:center;vertical-align: middle; " width="100%" height="100%"><img init_src="http://static.paipaiimg.com/assets/common/loading2.gif" /><br />数据加载中……</td></tr></table>'; //加载状态
	//1为商品模板
	template[1]='<li {#template_sold#}><a target="_blank" href="{#url#}"><img init_src="{#realImage#}" class="image"/><span class="recmdRegName">{#recmdRegName#}</span><span class="oldPrice">{#template_oldprice#}:<em class="o">{#oldPrice#}</em>元</span><span class="newPrice">{#template_price#}:<em class="n">{#newPrice#}</em>元</span><span class="{#template_btn#} btn"></span><span class="top_{#order#} icon_top_display"></span><span class="icon_cx"></span></a></li>';
	//红包模板
	template[2]='<li {#template_sold#}><a target="_blank" href="{#url#}"><img init_src="{#realImage#}" class="image"/><span class="recmdRegName">{#recmdRegName#}</span><span class="oldPrice">{#template_oldprice#}:<em class="o">{#oldPrice#}</em>元</span><span class="newPrice">{#template_price#}:<em class="n">{#newPrice#}</em>元</span><span class="discount">可使用:<em class="n">{#discount#}</em>元红包</span><span class="{#template_btn#} btn"></span><span class="icon_hb"></span><span class="top_{#order#} icon_top_display"></span></a></li>';
	//简单浮层商品模板
	template[3]='<li {#template_sold#}><a target="_blank" href="{#url#}"><img init_src="{#realImage#}" class="image"/><p class="pp_layer_1"><span class="goodsName">{#recmdRegName#}</span><span class="newPrice">￥<em class="n">{#newPrice#}</em></span><span class="text_link">查看详情>></span></p><span class="top_{#order#} icon_top_display"></span></a></li>';
	//商品收藏量
	template[4]='<li {#template_sold#}><a target="_blank" href="{#url#}"><img init_src="{#realImage#}" class="image"/><span class="recmdRegName">{#recmdRegName#}</span><span class="newPrice">{#template_price#}:<em class="n">{#newPrice#}</em>元</span><span class="addfavNum">已有<em class="n">{#shopLeft#}</em>人收藏</span><span class="{#template_btn#} btn"></span><span class="top_{#order#} icon_top_display"></span><span class="icon_cx"></span></a></li>';
	//店铺信用好评
	template[5]='<li {#template_sold#}><a target="_blank" href="{#shopUrl#}"><img init_src="{#realImage#}" class="image"/></a><p class="pp_layer_1"><span class="shopName">{#recmdRegName#}</span><span class="goodEvalRate">好评：<em class="n">{#goodEvalRate#}</em></span><span class="gradeIcon">信用：{#gradeIcon#}</span><a target="_blank" href="{#shopUrl#}"><span class="{#template_btn#} btn"></span></a></p></li>';
	//分享到Qzone
	template[6]='<li {#template_sold#}><a target="_blank" href="{#url#}"><img init_src="{#realImage#}" class="image"/><span class="recmdRegName">{#recmdRegName#}</span><span class="oldPrice">{#template_oldprice#}:<em class="o">{#oldPrice#}</em>元</span><span class="newPrice">{#template_price#}:<em class="n">{#newPrice#}</em>元</span><span class="{#template_btn#} btn"></span></a><a class="addPaipai" href="#none" tag="shareComm" cname="{#recmdRegName#}" cid="{#id#}"><span class="btn_share"></span></a><span class="icon_cx"></span><span class="top_{#order#} icon_top_display"></span></li>';
	//分享给好，收藏到拍拍,周收藏量
	template[7]='<li {#template_sold#}> <a href="{#url#}" target="_blank"><img init_src="{#realImage#}" alt="{#recmdRegName#}" class="image" /><span class="recmdRegName">{#recmdRegName#}</span> </a><span class="newPrice">￥{#newPrice#}</span><span class="addnum">本周收藏<em>{#soldCntDay#}</em>次</span><a class="addPaipai" href="#none" tag="favoriteComm" cname="{#recmdRegName#}" cid="{#id#}">收藏</a><a class="shareQzone" href="#none" tag="shareComm" cname="{#recmdRegName#}" cid="{#id#}">分享</a></li>';
	//简单商品模型
	template[8]='<li {#template_sold#}><a target="_blank" href="{#url#}"><img init_src="{#realImage#}" class="image"/><span class="recmdRegName">{#recmdRegName#}</span><span class="oldPrice">{#template_oldprice#}:<em class="o">{#oldPrice#}</em>元</span><span class="newPrice">{#template_price#}:<em class="n">{#newPrice#}</em>元</span><span class="{#template_btn#} btn"></span></a></li>';
	//限量，分享给好友

	template[9]='<li {#template_sold#}> <a href="{#url#}" target="_blank">        <img init_src="{#realImage#}" alt="{#recmdRegName#}" class="image" />        <span class="recmdRegName">{#recmdRegName#}</span><span class="comLeft">限量:<em>{#comLeft#}</em>件</span>'+
	'       <span class="oldPrice">{#template_oldprice#}:<em class="o">{#oldPrice#}</em>元</span>        <span class="newPrice">{#template_price#}:<em class="n">{#newPrice#}</em>元</span></a>        <a class="shareQzone" href="#none" tag="shareComm" cname="{#recmdRegName#}" cid="{#id#}">分享给好友</a>        <a href="{#url#}" target="_blank"><span class="{#template_btn#} btn"></span></a></li>';
	//限量，分享给好友
	template[9]='<li {#template_sold#}> <a href="{#url#}" target="_blank">        <img init_src="{#realImage#}" alt="{#recmdRegName#}" class="image" />        <span class="recmdRegName">{#recmdRegName#}</span><span class="comLeft">限量:<em>{#comLeft#}</em>件</span>        <span class="oldPrice">{#template_oldprice#}:<em class="o">{#oldPrice#}</em>元</span>        <span class="newPrice">{#template_price#}:<em class="n">{#newPrice#}</em>元</span></a>        <a class="shareQzone" href="#none" tag="shareComm" cname="{#recmdRegName#}" cid="{#id#}">分享给好友</a>        <a href="{#url#}" target="_blank" class="{#template_btn#} btn">查看商品&raquo;</a></li>';
	//标准，分享给好友
	template[10]='<li {#template_sold#}><dl><dt><a href="{#url#}" target="_blank">        <img init_src="{#realImage#}" alt="{#recmdRegName#}" class="image" /></a></dt>        <dd class="recmdRegName"><div class="recmdTitle"><a href="{#url#}" target="_blank">{#recmdRegName#}</a></div><div class="icon_z"></div><dd>        <dd class="recmdReason">{#recmdReason#}</dd>        <dd class="oldPrice">{#template_oldprice#}:{#oPrice#}元</dd>        <dd class="newPrice">{#template_price#}:{#nPrice#}元</dd>        <dd class="share"><a class="shareQzone" href="#none" tag="shareComm" cname="{#recmdRegName#}" cid="{#id#}">分享给好友</a>        <a href="{#shopUrl#}" target="_blank" class="{#template_btn#} shopLink">逛逛该店铺&raquo;</a></dd></dl></li>';
	//广告价，推荐理由
	template[11]='<li {#template_sold#}> <a href="{#url#}" target="_blank">        <img init_src="{#realImage#}" alt="{#recmdRegName#}" class="image" />        <span class="recmdRegName">{#recmdRegName#}</span>        <span class="recmdReason">{#recmdReason#}</span>        <span class="newPrice">{#template_price#}:{#nPrice#}元</span>        <span class="adPrice">{#template_oldprice#}:{#aPrice#}元</span></a>        <a class="shareQzone" href="#none" tag="shareComm" cname="{#recmdRegName#}" cid="{#id#}">分享给好友</a>        <a href="{#shopUrl#}" target="_blank" class="{#template_btn#} btn">逛逛店铺&raquo;</a></li>';
	//商品，推荐理由，市场价，拍拍价，销售量，分享给好友
	template[12]='<li {#template_sold#}><dl><dt><a href="{#url#}" target="_blank">        <img init_src="{#realImage#}" alt="{#recmdRegName#}" class="image" /></a></dt>        <dd class="recmdRegName"><div class="recmdTitle"><a href="{#url#}" target="_blank">{#recmdRegName#}</a></div><div class="icon_z"></div><dd>        <dd class="recmdReason">{#recmdReason#}</dd>        <dd class="oldPrice">{#template_oldprice#}:{#oPrice#}元</dd>        <dd class="newPrice">{#template_price#}:{#nPrice#}元</dd>        <dd class="soldCount">销售量:{#soldCount#}</dd>        <dd class="share"><a class="shareQzone" href="#none" tag="shareComm" cname="{#recmdRegName#}" cid="{#id#}">分享给好友</a>        <a href="{#shopUrl#}" target="_blank" class="{#template_btn#} shopLink">逛逛该店铺&raquo;</a></dd></dl></li>';
	template[13]='<li {#template_sold#}><dl><dt><a href="{#url#}" target="_blank">{#recmdRegName#}</a></dt><dd class="recmdImage"><a href="{#url#}" target="_blank"> <img init_src="{#realImage#}" alt="{#recmdRegName#}" class="image" /></a><div class="icon_z"></div><dd>        <dd class="oldPrice">{#template_oldprice#}:{#oPrice#}元</dd><dd class="soldCount">限量:{#shopLeft#}件</dd><dd class="newPrice">{#template_price#}:{#nPrice#}元</dd><dd class="btn"><a href="{#url#}" target="_blank"  class="{#template_btn#}">我要抢</a></dd> <dd class="share"><a class="shareQzone" href="#none" tag="shareComm" cname="{#recmdRegName#}" cid="{#id#}">分享给好友</a>        <a href="{#shopUrl#}" target="_blank" class="shopLink">逛逛该店铺&raquo;</a></dd><dd class="recmdReason"><p>{#recmdReason#}</p></dd></dl></li>';
	if(className==0){return template[0];}
	var btn=btn?btn:"";
	var price=price?price:"拍拍价";
	var oldprice=oldprice?oldprice:"市场价";
	var tempIndex=10;
	var soldOutStr="";
	var classNameArry=['','pp_list_1','pp_list_2','pp_list_3','pp_list_4','pp_list_5','pp_list_6','pp_list_7','pp_list_8','pp_list_9','pp_list_10','pp_list_11','pp_list_12','pp_list_13'];
	for(var i=1;i<classNameArry.length;i++){
		if(className.indexOf(classNameArry[i])>=0){
			tempIndex=i;
		}
	}
	//检查是否有售完开关
	if(soldOut){
		soldOutStr='soldOut="'+soldOut+'" commId="{#id#}"'
	}
	$loadCss("http://static.paipaiimg.com/promote_v2/data/"+className+".css");
	$loadCss("http://static.paipaiimg.com/promote_v2/data/btn.css");
	var temp=template[tempIndex].replace(/{#template_btn#}/g,btn).replace(/{#template_price#}/g,price).replace(/{#template_oldprice#}/g,oldprice).replace(/{#template_sold#}/g,soldOutStr);
	return temp;
}

function $getRightUrlForMarket(url){
	url=url.replace(/ /g,"");
	//卖场xml推荐位数据url校正
	var hosts=['promote1.paipai.com/promote','paipai.lady.qq.com/promote','paipai.digi.qq.com/promote','paipai.games.qq.com/promote'];
	var thisHost=location.hostname;
	if(url.indexOf("/tjw/")<0){
		url="/tjw/"+url;
		if(thisHost=="promote1.paipai.com"){
			url="/promote"+url
		}
	}
	for(var i=0;i<hosts.length;i++){
		if (hosts[i].indexOf(thisHost)>=0){
			url=url.replace("www.paipai.com",hosts[i]);
		}
	}
	return url;
}

function $getActiveInfoByStr(msg){
    //根据抽奖接口返回的信息同系统标准提示和运营自定义提示做匹配，返回正确提示
    var smsg=window.activeErrMsg_text;
    var umsg=window.user_text?window.user_text:window.activeErrMsg_text;
    var index=-1;
    for(var i=0,j=smsg.length;i<j;i++){
        if(smsg[i]==msg){
            index=i;
        }
    }
    return (umsg[index]&&(index>=0))?umsg[index]:"系统错误，请稍后再试！";
}

function $activeRaffleByQQ(){
	//按QQ号码抽奖活动。
	if(!window.g_sActive){
		alert("未配置活动id！")
		return ;
	}
	//判断登陆并发起抽奖请求
	$loginFrame({
		model:false,
		type:"func",
		x:0,
		y:0,
		action:function(){
			var levelStr=$$("#level").val()?("&level="+$$("#level").val()):""
			//发抽奖请求,期待回调AfterRaffle、showpaipailogin
			$loadScript("http://party.paipai.com/cgi-bin/cxpl_drawing?active="+window.g_sActive+levelStr);
		}
	});			
	//抽奖结果反馈
	window.AfterRaffle=function(a,b,c){$showActiveEnd(a,b,c)};
	//抽奖登陆超时
	window.showpaipailogin=function(){
		$loginFrame({
			model:false,
			type:"func",
			check:false,
			x:0,
			y:0,
			action:function(){
				var levelStr=$$("#level").val()?("&level="+$$("#level").val()):""
				//发抽奖请求,期待回调AfterRaffle、doAfterLogin、showpaipailogin
				$loadScript("http://party.paipai.com/cgi-bin/cxpl_drawing?active="+window.g_sActive+levelStr);
			}
		});			
	};
}

function $activeRaffleByOrderId(startFun,resultFun,virtualLevel){
    //按照订单号码参与抽奖活动
    if(!window.g_sActive){
        alert("未配置活动id！")
        return ;
    };
    var oDeal=$$("#deal_id"),
		kind=oDeal.attr('kind')*1,
		val=oDeal.val().replace(/^ | $/g,"");
    oDeal.val(val);
    if(val=="" || val.indexOf("填写")!=-1){
		var msg=val==""?"请填写输入框":val;
        alert(msg);
        oDeal.focus();
        return;
    };
    //启动前处理
    if(startFun){startFun()};
        
    var url="http://party.paipai.com/cgi-bin/"+(kind!=1?"cxpl_drawing?active="+window.g_sActive+"&deal_id=":"cxpl_codedrawing?active="+window.g_sActive+"&code=")+oDeal.val()+"&level="+$$("#level").val();

    //判断登陆并发起抽奖请求
    $loginFrame({
        model:false,
        type:"func",
        x:0,
        y:0,
        action:function(){
            //发抽奖请求,期待回调AfterRaffle、showpaipailogin
            $loadScript(url);
        }
    });            
    //抽奖结果反馈
    window.AfterRaffle=function(a,b,c){$showActiveEnd(a,b,c,resultFun,virtualLevel)};
    //抽奖登陆超时
    window.showpaipailogin=function(){
        $loginFrame({
            model:false,
            type:"func",
            check:false,
            x:0,
            y:0,
            action:function(){
                //发抽奖请求,期待回调AfterRaffle、doAfterLogin、showpaipailogin
                $loadScript(url);
            }
        });            
    };
}

function $showActiveEnd(err,lvl,prizename,resultFun,virtualLevel){
	if(!window.activeErrMsg_text){
		//系统提示，请勿更改
		window.activeErrMsg_text = [
			"对不起，活动尚未开始。", //活动未开始
			"对不起，活动已结束。", //活动已结束
			"对不起，您暂时不能参与该活动，详细情况请联系拍拍客服。", //买家正受处罚
			"对不起，服务器繁忙，请稍后再试。", //没法调用查询订单接口系统
			"对不起，请输入正确的订单号。", //订单号为空
			"对不起，您输入的订单号无效。", //查询不到订单信息
			"对不起，您输入的订单号无效。", //修改了订单时间
			"对不起，您的订单付款金额不满足活动要求，不能参与本活动", //订单金额是否满足活动要求
			"对不起，您的订单中商品不属于本活动指定类目，详情请参看活动规则！", //订单类目不满足活动要求
			"对不起，该订单没有完成财付通付款，不能使用该订单", //订单没有完成付款
			"对不起，当前订单支付方式不支持此次活动，详情请参看活动规则！", //订单不是通过财付通付款
			"对不起，您不是该订单的买家，不能使用该订单", //兑奖用户不是订单买家
			"对不起，您的订单卖家不满足活动要求，不能参与活动，详情请参看活动规则！", //卖家不满足活动要求
			"对不起，您的订单不是在指定的时间内完成付款，不能参与活动。", //订单没有在指定时间内完成付款
			"对不起，当日订单仅限当天参加活动，当晚24：00订单失效，详情请参看活动规则。", //订单不是在当日付款
			"对不起，您的信用等级不满足活动要求，不能参与活动。", //买家信用不满足活动要求
			"对不起，您尚未开通彩钻，不能参与活动。", //买家没开通彩钻
			"对不起，您的彩钻等级不满足活动要求，不能参与活动。", //用户彩钻等级不满足活动要求
			"对不起，您尚未选择奖品等级。", //用户未选择兑奖/抽奖的等级
			"对不起，该奖池暂无该奖品，请稍后再试。", //（某等级）奖品已经兑、抽完
			"对不起，今日奖品已发放完，请稍后再试。", //（某等级）当日奖品已经兑、抽完
			"对不起，本时段的奖品已发放完，请稍后再试。", //（某等级）当小时奖品已经兑、抽完
			"对不起，您在本活动中的参与次数已达到上限。", //已达到活动指定的兑、抽奖上限
			"对不起，您在本活动中单日的参与次数已达到上限。", //已达到活动单日指定的兑、抽奖上限
			"对不起，您兑换该奖品次数已达到上限", //兑换某等级奖品次数已达到上限
			"对不起，该订单已经参与过拍拍网活动了。", //订单重复使用
			"对不起，该QQ号码已经参与过拍拍网活动了。",//QQ号码重复使用
			"对不起，您在本活动的中奖次数已达到上限！"//中奖次数已达到上限
		];
	}
	if(!window.lvl_text2){
		window.lvl_text2=window.lvl_text;
	}
	//抽奖结果反馈
	if(err.length>0 && err.indexOf("自动发奖")<0){
		//根据抽奖接口返回的信息同系统标准提示和运营自定义提示做匹配，返回正确提示
		var smsg=window.activeErrMsg_text;
		var umsg=window.user_text?window.user_text:window.activeErrMsg_text;
		var index=-1;
		for(var i=0,j=smsg.length;i<j;i++){
			if(smsg[i]==err){
				index=i;
			}
		}
		var errStr=(umsg[index]&&(index>=0))?umsg[index]:err;
		if(resultFun){
			resultFun('error',errStr);
		}else{
			if(typeof errStr=="function"){
				errStr('err');
			}else{
				alert(errStr);
			}
		}
	}else if(err.indexOf("自动发奖失败")>=0){
		if(window.lvl_text2[lvl]){
			var errStr=window.lvl_text2[lvl];
		}else{
			var errStr=window.lv_end;
		}
		if(resultFun){
			resultFun('error',errStr);
		}else{
			alert(errStr);
		}
	}else{
		if(window.lvl_text[lvl]){
			var result=window.lvl_text[lvl];
		}else{
			var result=window.lv_end;
		}
		if(resultFun){
			virtualLevel?"":virtualLevel="";
			resultFun(virtualLevel.indexOf('-'+lvl+'-')!=-1?'success':'addr',result);
		}else{
			if(typeof result=="function"){
				result(lvl);
			}else{
				alert(result);
			}
		}
	}
	return;
}

function $bindActiveObjects(){
    //初始化市场活动的按钮及输入框相关操作
    $$("#activeQQClicker,#activeOrderClicker").live("click",function(){
        //QQ号抽奖活动
        var activeId=$$(this).attr("activeId");
        if(this.id=="activeQQClicker"){
            var level=$$(this).attr("level");
            if(level){
                $$("#level").val(level)
            };
            if(activeId){
                window.g_sActive=activeId;
            }
            $activeRaffleByQQ();
        }
        //订单号抽奖活动
        if(this.id=="activeOrderClicker"){
            if(activeId){
                window.g_sActive=activeId;
            }
            $activeRaffleByOrderId();
        }
    });
	var defalutVal="";
    //订单号输入框事件绑定
    $$("#deal_id").focus(function(){
        var _t=$$(this),
			val=_t.val();
        _t.css("color","#000");
        if(val.indexOf("填写")!=-1){
			defalutVal=val;
            _t.val("");
        }
    }).blur(function(){
        var _t=$$(this),
			val=_t.val();
        if(val=="" ||val.indexOf('填写')!=-1){
            _t.val(defalutVal).css("color","#ccc");
        }else{
            _t.css("color","#000");
        }
    }).blur();
}

function $showGotopButton(){
	//显示一个回到顶部的浮动按钮
	$$(document).ready(function(){
		$$("body").append("<a href='#' class='toTop' title='回到顶部'  id='flowLink' style='top:587px;right:50%; position:absolute; margin-right:-502px; width:25px; height:80px;'><img src='http://paipai.lady.qq.com/images/magazine6/totop_03.jpg' /></a>");
		window._gotopLy=0
		window._gotopItem=document.getElementById("flowLink");
		setInterval(function(){
			var f=window._gotopItem;
			var y =((document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop);
			temp=.1*(y-window._gotopLy); 
			temp=((temp>0)?Math.ceil(temp):Math.floor(temp)); 
			f.style.top=(parseInt(f.style.top)+temp)+"px";
			window._gotopLy+=temp; 
		},10)
	});
}

function $parseUrl(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}

function $parseDate(str){
	return Date.parse(str.split('-').join('/'))
}

function $attr(attr,val,node){
	var results=[],
		node=node||document.body;
		
	walk(node,function(n){
		var actual=n.nodeType===1&&(attr==="class"?n.className:n.getAttribute(attr));
		if(typeof actual === 'string' && (actual === val || typeof val !== 'string')){
				results.push(n);
		}
	});
	
	return results;

	function walk(n,func){
		func(n);
		n=n.firstChild;
		while(n){
			walk(n,func);
			n=n.nextSibling;
		}
	}
}

function  $setSaleMail(obj){
	//邮件订阅组件
	var option={
		mid:0,
		x:0,
		y:0,
		template:'<div class="box_hint_normal"><span class="icon msg2-icon-right"></span><div class="hint_content"><p class="hint_title"><strong>您已经成功订阅“{#mailTitle#}”栏目。</strong></p>{#mailDesc#}<div class="hint_op"><a href="http://mail.qq.com/cgi-bin/loginpage" ptag="10007.41.13" target="_blank">在QQ邮箱订阅平台查收邮件</a>  <a href="http://my.paipai.com/cgi-bin/mailbook_query" ptag="10007.41.14">管理订阅</a> </div>{#showOther#}<div class="b_btm"> </div><div class="more_txt">更多推荐订阅：</div><div class="more_recommand"><ul>{#otherCommend#}</ul></div>{#showOther#}<div style="clear:both"></div></div></div></div></div> ',
		templateForNoMail:'<div class="box_hint_normal"> <span class="icon msg2-icon-info"></span><div class="hint_content"><p class="hint_title"><strong>您尚未激活QQ邮箱，请激活后再订阅本栏目。</strong></p><div class="hint_op"><button  name="" type="submit" value="激活QQMail" ptag="" onclick="window.open(\'http://mail.qq.com\');">激活QQMail</button></div></div>',
		mailConfig:{
			"201":["新品推荐","<p>拍拍网最潮人气新品为您抢鲜推荐！</p><p>每月三期，逢周三投递。</p>"],
			"202":["时尚指标","<p>帮您掌握潮流风尚，订阅您的时尚顾问！</p><p>每月三期，逢周一投递。</p>"],
			"204":["卖家必读","最热促销活动报名，拍拍新功能特性，类目调整公告……超级卖家速成，一网打尽，敬请订阅！"],
			"200":["促销信息大全","<p>帮您搜罗拍拍网最优惠的打折促销精选！</p><p>每月四期，逢周五投递。</p>"],
			"206":["我购买过的店铺最近更新","该邮件订阅栏目专门为您推送您在拍拍上购买过的店铺信息，包括店铺最新上架商品、最新的促销信息等。每周五将定期发送到您的QQ邮箱哦，请注意查收！"]
		}
	}
	for(var i in obj){
		option[i]=obj[i];
	}
	//全局变量
	window.PP_core_saleMail_option = option;
	//浮窗登录
	$loginFrame({
		type : 'func',
		model : false,
		action : function(){
			//期待回调函数ModifySaleMailInfo_CallBack(syscode,status)
			$loadScript("http://my.paipai.com/cgi-bin/mailbook_setbook?bookitem="+window.PP_core_saleMail_option.mid+"&t="+Math.random());
		},
		x : window.PP_core_saleMail_option.x,
		y : window.PP_core_saleMail_option.y
	});
	$loadCss("http://static.paipaiimg.com/css/common/salemail.css");
	$loadCss("http://static.paipaiimg.com/module/msg_tips.css");
	
	window.ModifySaleMailInfo_CallBack=function(syscode,status){	
		/*	返回数据：		ModifySaleMailInfo_CallBack(3,0); 		参数1：状态：（1需要激活邮件，2订阅成功，3登陆超时）
		参数2：状态为2的时候有效，值为（:200:201:202:206:）已经订阅的栏目id		*/
		if(parseInt(syscode) == 3){
			$loginFrame({
				type :'func',
				check:false,
				model :false,
				action : function(){
					//期待回调函数ModifySaleMailInfo_CallBack(syscode,status)
					$loadScript("http://my.paipai.com/cgi-bin/mailbook_setbook?bookitem="+window.PP_core_saleMail_option.mid+"&t="+Math.random());
				},
				x : window.PP_core_saleMail_option.x,
				y : window.PP_core_saleMail_option.y
			});
		}else if(parseInt(syscode) == 2){
			var hc=window.PP_core_saleMail_option.template;
			var mailConfig=window.PP_core_saleMail_option.mailConfig[window.PP_core_saleMail_option.mid]
			if(!mailConfig){
				alert("邮件配置错误，请联系客服！");
				return false;
			}
			hc=hc.replace(/{#mailTitle#}/g,mailConfig[0]);
			hc=hc.replace(/{#mailDesc#}/g,mailConfig[1]);
			var commendStr=getCommendList(status);
			hc=hc.replace(/{#otherCommend#}/g,commendStr);
			if(commendStr){
				hc=hc.replace(/{#showOther#}/g,"");
			}else{
				hc=hc.replace(/{#showOther#}.*{#showOther#}/g,"");
			}
			$float({
				title:"邮件订阅",
				html:hc,
				width:"500"
			});
		}else if(parseInt(syscode) == 1){		
			$float({
				title:"提示",
				html:window.PP_core_saleMail_option.templateForNoMail
			});
		}	
		
		function getCommendList(bookItemstr){
			var str=""
			  //促销信息大全
			  if(bookItemstr.indexOf(":200:") < 0 ){
				  str += '<li><a href="http://www.paipai.com/sale/qqmail/order.shtml?n=1&menu=promote&ptag=10007.41.17" target="_blank"><img src="http://mat1.gtimg.com/paipaimai/images/email/2010/0205/icon_sale.png" /></a><div class="more_detail"><p>促销信息大全：为您搜罗最优惠的促销精选。</p><p>每月4期，逢周五投递。</p><button onclick="window.open(\'http://www.paipai.com/sale/qqmail/order.shtml?n=1&menu=promote&ptag=10007.41.17\')">免费订阅</button></div></li>';
			  }
			  //新品推荐
			  if(bookItemstr.indexOf(":201:") < 0 ){
				  str += '<li><a href="http://www.paipai.com/sale/qqmail/order.shtml?n=3&menu=promote&ptag=10007.41.18" target="_blank"><img src="http://mat1.gtimg.com/paipaimai/images/email/2010/0205/icon_new.png" /></a><div class="more_detail"><p>新品推荐：为您推荐最潮的人气新品。</p><p>每月3期，逢周三投递。</p><button onclick="window.open(\'http://www.paipai.com/sale/qqmail/order.shtml?n=3&menu=promote&ptag=10007.41.18\')">免费订阅</button></div></li>';
			  }
			  //时尚指标
			  if(bookItemstr.indexOf(":202:") < 0 ){
				  str += '<li><a href="http://www.paipai.com/sale/qqmail/order.shtml?n=2&menu=promote&ptag=10007.41.19" target="_blank"><img src="http://mat1.gtimg.com/paipaimai/images/email/2010/0205/icon_fashion.png" /></a><div class="more_detail"><p>时尚指标：为您提供最前沿的时尚资讯。</p><p>每月3期，逢周一投递。</p><button onclick="window.open(\'http://www.paipai.com/sale/qqmail/order.shtml?n=2&menu=promote&ptag=10007.41.19\')">免费订阅</button></div></li>';
			  }
			  return str;
		}
		return;
	};
	
}

function $simulateSelect(option){
	var opt={
		input:"",	//输入框id
		show:"",	//显示id
		cover:"",	//遮盖iframe的id
		button:"",	//提交的按钮
		onSearch:$empty(),	//开始搜索的时候
		onSumit:$empty()	//提交的时候调用
	};

	for(var k in option){
		opt[k]=option[k];
	};
	
	var	nowItem=-1,		//当前展示的项目
		preItem=0,		//前一项
		total=0,		//总项目
		val="",			//存储进行搜索的值，如果没有变化则不启动
		oInput=$id(opt.input),	//存储输入的dom
		oShow=$id(opt.show),		//存储展示位置的dom
		oBtn=$id(opt.button);	//存储按钮的dom
		
	$addEvent(document,"click",function(){
		//鼠标外部点击后隐藏搜索和选择的下拉框
		if(oShow.style.display!="none"){
			hideResult();	
		}
	});

	function hideResult(){
		//隐藏搜索结果列表
		$display(opt.show+","+opt.cover,"none");	
	};
	
	oInput.onkeyup=function(e){
		var	code=$getKeyCode(e);
		if(code!==13 && code!==38 && code!==40 && this.value!==''){
			if(this.value!==val){
				hideResult();	
				opt.onSearch(this.value,opt);
			};
		}else if(code==13){
			opt.onSumit();
		}else if(this.value==''){ 
			hideResult();				
		};
		val=this.value;
	};
	
	null!==oBtn?(oBtn.onclick=function(){
		opt.onSumit(); 
	}):"";
	
	opt.showResult=function(html,data){
		oShow.innerHTML=html;
		$display(opt.show+","+opt.cover,'block');
		nowItem=-1;
		preItem=0;
		total=data.length;
		oInput.onkeydown=function(e){
			showKeyDown($getKeyCode(e));
		}
		
		function showKeyDown(code){
			//选择搜索结果的操作
			if(code==38||code==40){
				//38:up,40:down
				preItem=nowItem;
				code==38?nowItem--:nowItem++;
				nowItem=nowItem<0?total-1:(nowItem>total-1?0:nowItem);
	
				var oItem=oShow.childNodes[0].childNodes[nowItem];
				if(oItem){
					oItem.className="autoResultLink";
					oInput.value=data[nowItem];
				};
				if(-1!==preItem){
					var oPrev=oShow.childNodes[0].childNodes[preItem];
					oPrev?oPrev.className="":"";
				}				
			}else if(code==13){
				//回车
				if(nowItem!=-1){
					oInput.value=data[nowItem];
					hideResult();
				};
				opt.onSumit(); 
			}
		};	
	}
}

function $3cShopClassList(uin,domId,classList,expand){
//3c数码商家自定义列表模块
	var target=$id(domId);
	var hc=[];
	var ps=20;
	if(classList&&classList.length>0){
		//展示左侧分类列表
		for(var i=0;i<classList.length;i++){
			var item=classList[i];
			hc.push('<li id="classList_'+item.classId+'">');
			var url="http://auction1.3c.paipai.com/itemlistbycustomclass.xhtml?pageType=0&uin="+uin+"&classid="+item.classId+"&pageSize="+ps;
			if(item.childrenList.length>0){
				hc.push('<p class="txt2p"><span class="iconarrowright"></span><a href="'+url+'" class="f0">'+item.className+'</a></p>');
				hc.push('<ul style="display:none;">');
				for(var j=0;j<item.childrenList.length;j++){
					var item2=item.childrenList[j];
					var url2="http://auction1.3c.paipai.com/itemlistbycustomclass.xhtml?pageType=0&uin="+uin+"&classid="+item2.classId+"&pageSize="+ps;
					hc.push('<li id="classList_'+item2.classId+'"><span class="ffst">·</span><a href="'+url2+'" class="f0">'+item2.className+'</a></li>');
				}
				hc.push('</ul>');
			}else{
				hc.push('<p class="txt2p"><span class="square"></span><a href="'+url+'" class="f0">'+item.className+'</a></p>');
			}
			hc.push('<p class="height1dotted"></p>');
			hc.push('</li>');
		}
	}else{
		hc.push('无类目');
		target.className='nodata';
	}
	target.innerHTML=hc.join('');
	//列表展开折叠交互
	var list=$$('#'+domId+'>li');
	for(var i=0;i<list.length;i++){
		(function(li,expand){
			var listItem=$$(li);
			var ul=listItem.find('>ul');
			if(ul.length>0){
				var span=listItem.find('>p>span');
				span.click(function(){
					if(ul.css('display')=='none'){
						//listItem.find('p').addClass('current');
						span.addClass('iconarrowdown').removeClass('iconarrowright');
						ul.show();
					}else{
						//listItem.find('p').removeClass('current');
						span.removeClass('iconarrowdown').addClass('iconarrowright');
						ul.hide();
					}
				});
				if(expand)span.click();
			}
		})(list[i],expand);
	}
}

function $setAioSub(obj){
	var option={
		aid:1,
		x:0,
		y:0,
		template_success:'<div style="height: 80px;" class="favo_main"><div class="g1h4"><img src="http://pics.paipai.com/member/login_ico_right.gif" align="absmiddle" vspace="5"> {#tp_nickname#}订制拍拍网每日精选成功!</div><div id="" style="font-size:12px; line-height:1.5; text-align:left;">您可以随时在 <a style="text-decoration:underline; color:blue;" href="http://my.paipai.com/commodity/hideInfo_AIO.shtml?isSellLink=22" target="_blank">我的拍拍 &gt; 基本设置：QQ相关功能设置</a> 中设置关闭或打开该功能。</div></div>',
		template_again:'<div style="height: 80px;" class="favo_main"><div class="g1h4"><img src="http://pics.paipai.com/member/login_ico_right.gif" align="absmiddle" vspace="5"> {#tp_nickname#}已订制过拍拍网每日精选!</div><div id="" style="font-size:12px; line-height:1.5; text-align:left;">您可以随时在 <a style="text-decoration:underline; color:blue;" href="http://my.paipai.com/commodity/hideInfo_AIO.shtml?isSellLink=22" target="_blank">我的拍拍 &gt; 基本设置：QQ相关功能设置</a> 中设置关闭或打开该功能。</div></div>',
		template_false:'<div style="height: 80px;" class="favo_main"><div class="g1h4" style="color:red;"><img src="http://pics.paipai.com/member/login_ico_alert.gif" align="absmiddle" vspace="5"> {#tp_nickname#}订制拍拍网每日精选失败!</div><div id="" style="font-size:12px; line-height:1.5; text-align:left;">您可以随时在 <a style="text-decoration:underline; color:blue;" href="http://my.paipai.com/commodity/hideInfo_AIO.shtml?isSellLink=22" target="_blank">我的拍拍 &gt; 基本设置：QQ相关功能设置</a> 中设置关闭或打开该功能。</div></div>'
	}
	for(var i in obj){
		option[i]=obj[i];
	}
	//全局变量
    window.PP_core_AioSub_option = option;
	//浮窗登录
    $loginFrame({
        type : 'func',
        model : false,
        action : function(){
            //期待回调函数ModifyShoppingGuideInfo_CallBack(syscode,status)
            $loadScript("http://service.paipai.com/cgi-bin/shoppingguide_modify?shoppingguideoption=1&aioSrc="+window.PP_core_AioSub_option.aid+"&t="+Math.random());
        },
        x : option.x,
        y : option.y
    });
	window.ModifyShoppingGuideInfo_CallBack=function(syscode,status){
		if(parseInt(syscode) < 0){
			if(parseInt(syscode) == -4){
				$loginFrame({
					type : 'func',
					check:false,
					model : false,
					action : function(){
						//期待回调函数ModifyShoppingGuideInfo_CallBack(syscode,status)
						$loadScript("http://service.paipai.com/cgi-bin/shoppingguide_modify?shoppingguideoption=1&aioSrc="+window.PP_core_AioSub_option.aid+"&t="+Math.random());
					},
					x : option.x,
					y : option.y
				});
			}else{
				//订阅失败
				$float({
					title:"提示",
					html:window.PP_core_AioSub_option.template_false.replace(/{#tp_nickname#}/g,$getNick()+"("+$getUin()+")")
				});
			}
			return;
		}
		if(parseInt(status) == 2){
			//订阅失败
			$float({
				title:"提示",
				html:window.PP_core_AioSub_option.template_again.replace(/{#tp_nickname#}/g,$getNick()+"("+$getUin()+")")
			});
		} else if(parseInt(status) == 1){
			$float({
				title:"提示",
				html:window.PP_core_AioSub_option.template_success.replace(/{#tp_nickname#}/g,$getNick()+"("+$getUin()+")")
			});
		} 
	};

}

function $getYP(e){
	//获取页面中对象的绝对Y位置，如果是隐藏的，则尝试获取其父节点位置
	var t = $getY(e),e = e.parentNode;   
	
	while(0===t && document.body != e){
		t = $getY(e);   
		e = e.parentNode;
	}
	
    return t;
}

function $getTimeDistance(ts){
//根据时间差计算剩余的时间，返回[天，小时，分，秒]
	  var timeLeft=[0,0,0,0];//结构：天、小时、分、秒
	  timeLeft[0]=(ts>86400)?parseInt(ts/86400):0;
	  ts=ts - timeLeft[0] * 86400;
	  timeLeft[1]=(ts>3600)?parseInt(ts/3600):0;
	  ts=ts - timeLeft[1] * 3600;
	  timeLeft[2]=(ts>60)?parseInt(ts/60):0;
	  timeLeft[3]=ts - timeLeft[2] * 60;
	  return timeLeft;
}

function $bindActiveTimecount(){
//绑定活动的倒计时功能
	var items=$$("[tag='marketCountdown']");
	if(items.length<1){
		return;
	}
	setInterval(function(){
		$$("[tag='marketCountdown']").each(function(){
			var s=new Date($$(this).attr("startTime"));
			var e=new Date($$(this).attr("endTime"));
			var n=new Date();
			var temp="",timeLeft=[0,0,0,0];
			if(s>n){//未开始
				timeLeft=$getTimeDistance(parseInt((s-n)/1000));
				var css=timeLeft[0]<1?"timeForSaleStart1":"timeForSaleStart2"
				temp='<div class="timeForSaleStart"><div class="'+css+'"><span class="s_yy">{#YY#}</span><span class="year text">年</span><span class="s_mm">{#MM#}</span><span class="month text">月</span><span class="s_dd">{#DD#}</span><span class="day text">日</span><span class="s_hh">{#HH#}</span><span class="hour text">时</span><span class="textTime text">活动尚未开始，现在离活动开始还有：</span><span class="dd">{#dd#}</span><span class="days text">天</span><span class="hh">{#hh#}</span><span class="hours text">时</span><span class="mm">{#mm#}</span><span class="minutes text">分</span><span class="ss">{#ss#}</span><span class="secends text">秒</span></div></div>';
			}else if(n>s && n<e){
				temp='<div class="timeForSaleing"><span class="s_yy">{#YY#}</span><span class="year text">年</span><span class="s_mm">{#MM#}</span><span class="month text">月</span><span class="s_dd">{#DD#}</span><span class="day text">日</span><span class="s_hh">{#DD#}</span><span class="hour text">时</span><span class="textTime text">活动已开始，离活动结束还有：</span><span class="dd">{#dd#}</span><span class="days text">天</span><span class="hh">{#hh#}</span><span class="hours text">时</span><span class="mm">{#mm#}</span><span class="minutes text">分</span><span class="ss">{#ss#}</span><span class="secends text">秒</span></div>';
				timeLeft=$getTimeDistance(parseInt((e-n)/1000));
			}else{
				temp='<div class="timeForSaleEnd">活动已结束</div>';
			}
			for(var i=0;i<4;i++){
				timeLeft[i]=timeLeft[i].toString().length<2?("0"+timeLeft[i].toString()):timeLeft[i].toString();
			}
			//日期
			var dtime=this.getAttribute('time')=='targetTime'?s:n;
			var yd=dtime.getFullYear().toString();
			var md=(dtime.getMonth()+1).toString();
			var dd=dtime.getDate().toString();
			var hh=dtime.getHours().toString();
			temp=temp.replace("{#YY#}",yd.length<2?'0'+yd:yd);
			temp=temp.replace("{#MM#}",md.length<2?'0'+md:md);
			temp=temp.replace("{#DD#}",dd.length<2?'0'+dd:dd);
			temp=temp.replace("{#HH#}",hh.length<2?'0'+hh:hh);
			temp=temp.replace("{#dd#}",timeLeft[0]);
			temp=temp.replace("{#hh#}",timeLeft[1]);
			temp=temp.replace("{#mm#}",timeLeft[2]);
			temp=temp.replace("{#ss#}",timeLeft[3]);
			this.innerHTML=temp;
		})						
	},1000);
}

(function(){
	var	isReady=false, //判断onDOMReady方法是否已经被执行过
    	readyList= [],//把需要执行的方法先暂存在这个数组里
        timer;//定时器句柄
	$ready=function(fn) {
		if (isReady )
			fn.call( document);
		else
			readyList.push(function() { return fn.call(this);});
		return this;
	}
        
	var onDOMReady=function(){
		for(var i=0,len=readyList.length;i<len;i++){
			readyList[i].apply(document);
		}
		readyList = null;
	}
	
	var bindReady = function(evt){
		if(isReady) return;
		isReady=true;
		onDOMReady.call(window);
		if(document.removeEventListener){
			document.removeEventListener("DOMContentLoaded", bindReady, false);
		}else if(document.attachEvent){
			document.detachEvent("onreadystatechange", bindReady);
			if(window == window.top){
				clearInterval(timer);
				timer = null;
			}
		}
	};
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded", bindReady, false);
	}else if(document.attachEvent){
		document.attachEvent("onreadystatechange", function(){
			if((/loaded|complete/).test(document.readyState)){
				bindReady();
			}
		});
		if(window == window.top){
			timer = setInterval(function(){
					try{
						isReady||document.documentElement.doScroll('left');//在IE下用能否执行doScroll判断dom是否加载完毕
					}catch(e){
						return;
					}
					bindReady();
			},5);
		}
	}
})();

function $hover(option){
	var opt={
		title:null,//dom
		content:null,//dom
		overFunc:function(){
			opt.content.style.display="block"
		},
		outFunc:function(){
			opt.content.style.display="none"
		},
		timer:100,
		intr:null
	};
	for(var k in option){
		opt[k]=option[k];
	};
	
	$mouseover(opt.title,overFunc);
	$mouseout(opt.title,outFunc);
	$mouseover(opt.content,overFunc);
	$mouseout(opt.content,outFunc);
	
	function overFunc(){
		clearTimeout(opt.intr);
		opt.intr = null;
		opt.overFunc();
	}
	
	function outFunc(){
		opt.intr=setTimeout(function(){
			opt.outFunc();
		},opt.timer);
	}	
}

function $each(jn,fn){
	var len=jn.length;
	if("number"===typeof len){
		for(var i=0;i<len;i++){
			fn(jn[i],i);
		}
	}else{
		for(var k in jn){
			fn(jn[k],k);
		}	
	}
};

function $createXmlObj(){
//构造xml对象
	var tempObj;
	if (document.all){
		var arrXMLDom = ["MSXML2.DOMDocument.4.0","Microsoft.XmlDom"];
		for (var i = 0; i < arrXMLDom.length; i++){
			try{
				tempObj = new ActiveXObject(arrXMLDom[i]);
				tempObj.async = false;
				return tempObj;
			}catch (e){}
		}
	}else{
		tempObj = document.implementation.createDocument("", "", null);
		tempObj.async = false;
		return tempObj;
	}
}

function $loadXmlString(s){
//加载xml字符串，转成xml对象

	var tempObj = $createXmlObj();
	if (document.all){
		if (tempObj){
			tempObj.loadXML(s);
		}
	}else{
		var oParser = new DOMParser();
		tempObj = oParser.parseFromString(s,"text/xml");
	}
	return tempObj;
}

function $qq2Commid(qq){
//qq号转十六进制的actionId
	qq = parseInt(qq);
	var id = qq.toString(16).toUpperCase();
	var num = 8-id.length;
	for (var i = 0; i<num; i++){
		id = "0"+id;
	}
	id =id.substring(4,8)+id.substring(0,4);
	id =id.substring(2,4)+id.substring(0,2)+id.substring(6,8)+id.substring(4,6);
	for (var j = 0; j<24; j++){
		id = id+"0";
	}
	return id;
}

function $getManlisongRule(list){
//输出满立送规则字符串
/*参数为如下结构的xml对象
<content contentId="204271">
        <costFlag>0</costFlag>
        <costMoney>1</costMoney>
        <favorableFlag>16</favorableFlag>
        <freeMoney>0.00</freeMoney>
        <freeRebate>0</freeRebate>
        <presentedName></presentedName>
        <presentType>0</presentType>
        <presentUrl></presentUrl>
        <presentID></presentID>
        <barterMoney>0.00</barterMoney>
        <barterName></barterName>
        <barterType>0</barterType>
        <barterUrl></barterUrl>
        <barterID></barterID>
</content>
*/
	var itemRules = "";
	for(var i = 0; i <= list.length; i++){
		var rule = {};
		var mlsRule = "";
		var flag = "";
		
		var valueNodes=$$(list[i]).children();
		for(var j=0;j<valueNodes.length;j++){
				rule[valueNodes[j].nodeName]=valueNodes[j].firstChild?valueNodes[j].firstChild.nodeValue:"";
		};
		
		if (rule['costFlag']==="1"){
			mlsRule += "消费满<em>{#CostMoney#}</em>元";
		}
		if (rule['costFlag']==="0"){
			mlsRule += "消费满<em>{#CostMoney#}</em>件";
		}
		
		if (rule['favorableFlag']&1){
			mlsRule += '减<em>{#FreeMoney#}</em>元 ';
		}
		if (rule['favorableFlag']&2){
			mlsRule += '可享<em>{#FreeRebate#}%</em>折扣 ';
		}
		if (rule['favorableFlag']&4){
			mlsRule += '赠送<a href="{#presentUrl#}?ptag={#ptag#}" target="blank">{#presentedName#}</a>  ';
		}
		if (rule['favorableFlag']&8){
			mlsRule += '加<em>{#BarterMoney#}</em>元换购<a href="{#BarterUrl#}?ptag={#ptag#}" target="blank">{#BatterName#}</a>  ';
		}
		if (rule['favorableFlag']&16){
			mlsRule += '包快递。';
		}
		//替换提示语句。
		rule['presentUrl']=rule['presentUrl']?rule['presentUrl']:"http://auction1.paipai.com/"+rule['presentId'];
		rule['barterUrl']=rule['barterUrl']?rule['barterUrl']:"http://auction1.paipai.com/"+rule['barterId'];
		//去小数
		rule['costMoney']=rule['costMoney']+"";
		rule['costMoney']=rule['costMoney'].replace(".00","");
		rule['freeMoney']=rule['freeMoney']+"";
		rule['freeMoney']=rule['freeMoney'].replace(".00","");
		rule['barterMoney']=rule['barterMoney']+"";
		rule['barterMoney']=rule['barterMoney'].replace(".00","");
		
		mlsRule = $strReplace(mlsRule,{
			"{#CostMoney#}":rule['costMoney'],
			"{#FreeMoney#}":rule['freeMoney'],
			"{#FreeRebate#}":rule['freeRebate'],
			"{#presentUrl#}":rule['presentUrl'],
			"{#presentedName#}":rule['presentedName'],
			"{#BarterMoney#}":rule['barterMoney'],
			"{#BarterUrl#}":rule['barterUrl'],
			"{#BatterName#}":rule['barterName']
		}); 
		if (itemRules===""){
			itemRules=mlsRule;
		}else{
			itemRules = itemRules+"<br/>"+mlsRule;
		}
	}
	return itemRules;
};

function $initTabExchange(){
	//初始化tab切换工具
	$$("[tag='tabexchang']").live("mouseover",function(){
		var c=$$(this).attr("content");
		$$("[tag='tabexchang'][groupId='"+$$(this).attr("groupId")+"']").each(function(){
			var ons=$$(this).attr("onstyle");
			var offs=$$(this).attr("offstyle");
			var cont=$$(this).attr("content");
			if(c==cont){//当前的显示出来
				$$(this).removeClass(offs).addClass(ons);
				$$(cont).show();
			}else{
				$$(this).removeClass(ons).addClass(offs);
				$$(cont).hide();
			}
		});
		
	});
}

function $picListShower(opt){
	var option={
		smallShowLength:5,	//小图展示数量
		bigPicArrayIndex:1,		//示意图地址在数组中的index
		smallPicArrayIndex:2,	//小图地址在数组中的index
		floatViewArrayIndex:0,	//浮出图地址在数组中的index
		picViewTemp:'<img title="点击看大图" alt="点击看大图" src="{#url#}" width="300" height="300" id="{#picViewId#}" style="cursor:pointer" />',							//示意图模版
		smallPicTemp:'<li id="{#id#}" {#style#}><img title="点击切换示意图" alt="点击切换示意图" src="{#url#}" style="cursor:pointer;" /></li>',		//小图模板
		floatPicTemp:'<table id="{#floatViewId#}" width="100%" height="500" border="0" cellpadding="0" cellspacing="0"><tr><td width="60" align="center" valign="top"><br /><br /><a href="javascript:;" id="{#previewLastId#}" style="display:none">&lt;&lt;上一张</a></td>  <td align="center" valign="middle"><img src="{#url#}" alt="点击图片可关闭大图" title="点击图片可关闭大图" id="{#floatViewItemId#}" width="450" height="450"/></td><td width="60" align="center" valign="top"><br /><br /><a href="javascript:;" id="{#previewNextId#}" style="display:none">下一张&gt;&gt;</a></td></tr></table>',				//浮出图片模版
		pics:[['','','']],	//图片数据
		picLength:0,		//图片数量
		picView:'',			//示意图dom
		picViewImg:'',		//示意图img对象
		bigPicView:'',		//大图浮窗
		smallView:'',		//小图ul
		smallViewIndex:0,	//小图展示起始index
		currentViewIndex:0,		//展示的index
		fix:true,				//是否在图片长度不足小图展示数量时展示空框
		initPicView:true,		//初始时是否重设示意图，如果html上已经设置则应为false
		smallViewDom:[],	//小图的dom	
		changePics:function(i){},		//换图
		showBigPic:function(i){},		//展示大图
		next:function(){},				//下一张
		prev:function(){},				//上一张
		goHead:function(o){},			//查看的是第一张时调用
		goLast:function(o){},			//查看的是最后一张时调用
		changing:function(o){}			//转换图片后调用
	}
	for(var i in opt){
		option[i]=opt[i];
	}
	option.changePics=changePics;
	option.showBigPic=showBigPic;
	option.next=showNext;
	option.prev=showPrev;
	//图片长度
	option.picLength=option.pics.length;
	//放置示意图
	if(option.picView){
		if(option.initPicView)option.picView.innerHTML=option.picViewTemp.replace(/{#url#}/g,option.pics[0][option.bigPicArrayIndex]).replace(/{#picViewId#}/g,'_picsViewShow');
		//获得img
		var imgList=option.picView.getElementsByTagName('img');
		option.picViewImg=imgList.length>0?imgList[0]:null;
		//展示
		option.picView.onclick=showBigPic;
	}
	//放置小图
	var smallHtml=[];
	for(var i=0;i<option.picLength;i++){
		smallHtml.push(option.smallPicTemp.replace(/{#id#}/g,'_picSmall'+i).replace(/{#style#}/g,i>=option.smallShowLength?'style="display:none;"':'').replace(/{#url#}/g,option.pics[i][option.smallPicArrayIndex]));
	}
	if(option.fix){
		for(var i=option.picLength;i<option.smallShowLength;i++){
			smallHtml.push('<li id="_picSmall'+i+'"></li>');
		}
	}
	if(option.smallView){
		option.smallView.innerHTML=smallHtml.join('');
	}
	//缓存小图对象
	option.smallViewDom=[];
	for(var i=0;i<option.picLength;i++){
		var smallTarget=document.getElementById('_picSmall'+i);
		if(smallTarget){
			option.smallViewDom.push(smallTarget);
			smallTarget.onclick=(function(pi){return function(){changePics(pi)} })(i);
		}
	}
	if(option.picLength>0){
		changePics(0);
	}
	return option;
	function changePics(index){
		//更新小图展示index
		if(option.smallViewIndex+option.smallShowLength<=index){
			option.smallViewIndex=index-option.smallShowLength+1;
		}
		if(option.smallViewIndex>index){
			option.smallViewIndex=option.smallViewIndex-option.smallShowLength+1;
		}
		option.currentViewIndex=index;
		//处理小图的展示
		for(var i=0;i<option.smallViewDom.length;i++){
			//去掉current
			option.smallViewDom[i].className=option.smallViewDom[i].className.replace(/current /ig,'').replace(/ current/ig,'').replace(/current/ig,'');
			if(i>=option.smallViewIndex&&i<option.smallViewIndex+option.smallShowLength){
				//可视范围内
				option.smallViewDom[i].style.display='';
				//当前展示的小图
				if(i==index){
					option.smallViewDom[i].className+=' current';
					//改变示意图
					if(option.picViewImg&&option.picViewImg.src!=option.pics[i][option.bigPicArrayIndex]){
						option.picViewImg.src=option.pics[i][option.bigPicArrayIndex];
					}
				}
			}else{
				//不在可视序号内
				option.smallViewDom[i].style.display='none';
			}
		}
		if(option.changing)option.changing(option);
		if(index==0&&option.goHead)option.goHead(option);
		if(index==option.picLength-1&&option.goLast)option.goLast(option);
	}
	function showNext(){
		if(option.currentViewIndex<(option.picLength-1)){
			option.currentViewIndex+=1;
			changePics(option.currentViewIndex);
		}
	}
	function showPrev(){
		if(option.currentViewIndex>0){
			option.currentViewIndex-=1;
			changePics(option.currentViewIndex);
		}
	}
	function showBigPic(index){
		var viewHtml=option.floatPicTemp.replace(/{#previewLastId#}/g,'_previewLast').replace(/{#previewNextId#}/g,'_previewNext').replace(/{#floatViewId#}/g,'_viewPics').replace(/{#floatViewItemId#}/g,'_previewPicsItem').replace(/{#url#}/g,option.pics[option.currentViewIndex][option.floatViewArrayIndex]);
		var pl=option.picLength;
		var width=pl>1?650:550;
		var opt={
			width:width,
			height:550,
			title:'查看大图',
			html:viewHtml,
			cover:true,
			onClose:function(){			
				changePics(option.currentViewIndex);
				return true;
			}
		};
		option.bigPicView=$float(opt);
		var oImg=document.getElementById('_previewPicsItem');
		oImg.onclick=function(){		
			option.bigPicView.close();
		};
		if(pl>1){
			var oLast=document.getElementById('_previewLast');
			var oNext=document.getElementById('_previewNext');
			oLast.style.display="block";
			oNext.style.display="block";
			if(option.currentViewIndex==0){			
				oLast.style.color='#ccc';
			}else if(option.currentViewIndex==(pl-1)){			
				oNext.style.color='#ccc';
			};
			oLast.onclick=function(){
				if(option.currentViewIndex>0){
					var last=option.currentViewIndex-1;
					oImg.src=option.pics[last][option.floatViewArrayIndex];
					option.currentViewIndex=last;
					oNext.style.color='#2266bb';
					if(last==0){
						oLast.style.color='#ccc';
					};
				};
				return false;
			};
			oNext.onclick=function(){
				if(option.currentViewIndex<(pl-1)){
					var next=option.currentViewIndex+1;	
					oImg.src=option.pics[next][option.floatViewArrayIndex];
					option.currentViewIndex=next;
					oLast.style.color='#2266bb';
					if(next==(pl-1)){
						oNext.style.color='#ccc';
					}
				};
				return false;
			}
		}
	}
}

function $initScrollAd(){
	//活动卖场专用巨无霸组件，性能一般
	window._scollAd=$$("[tag='scrollAd']");
	if(_scollAd.length<1){
		return;
	}
	window._scollAd.each(function(){
		var n=0;
		var l=$$(this).find(".roll_pic li").length;
		var s='<ol class="roll_num">';
		for(var i=0;i<l;i++){
			s+='<li '+(i==n?'class="hover"':"")+' cindex="'+i+'">'+(i+1)+'</li>';
		}
		s+="</ol>";
		$$(this).append(s).attr("cindex","0").attr("autoScroll","true").attr("maxLength",l);
		$$(this).find(".roll_pic").css("left","-"+(n*parseInt($$(this).attr("rollWidth")))+"px");
		$$(this).find(".roll_num li").mouseover(function(){
			var p=$$(this).parent("ol").parent(".roll_ad");
			var i=$$(this).attr("cindex");
			var w=parseInt(p.attr("rollWidth"));
			p.attr("cindex",i)
			p.find(".roll_num li").removeClass("hover").filter(":eq("+i+")").addClass("hover")
			p.find(".roll_pic").stop().animate({left : -(i*w)},500);
		});
	}).mouseover(function(){
		$$(this).attr("autoScroll","false");
	}).mouseout(function(){
		$$(this).attr("autoScroll","true");
	});
	setInterval(function(){
		_scollAd.each(function(){
			if($$(this).attr("autoScroll")=="false"){
				return;
			}
			var i=parseInt($$(this).attr("cindex"));
			var m=parseInt($$(this).attr("maxLength"));
			var w=parseInt($$(this).attr("rollWidth"));
			var ni=i<(m-1)?(i+1):0
			$$(this).attr("cindex",ni);
			$$(this).find(".roll_num li").removeClass("hover").filter(":eq("+ni+")").addClass("hover");
			$$(this).find(".roll_pic").stop().animate({left : -(ni*w)},500)
		});
	},2000);
}

function $child(node,val,fn){
	var results=[],
		node=node||document.body;
		
	walk(node.firstChild,function(n){
		var actual=n.nodeType===1&&n.nodeName.toLowerCase();
		if(typeof actual === 'string' && (actual === val || typeof val !== 'string')){
				results.push(n);
				fn&&fn(n);
		}
	});
	
	return results;
			
	function walk(n,func){
		func(n);
		while(n=n.nextSibling){		
			func(n,func);			
		}
	}
}

function $openModal(url, variant, options){
    //打开模态窗口
    if (!url || url.replace(/(^\s*)|(\s*$)/g, "") == '') 
        return;
    options = options || {};
    this.height = parseInt(options.height, 10) || 500;
    this.width = parseInt(options.width, 10) || 800;
    this.center = options.center || (options.center == 0 ? 0 : 1);
    this.help = options.help || 0;
    this.resizable = options.resizable || 0;
    this.statusbar = options.status || (options.status == 0 ? 0 : 1);
    this.scroll = options.scroll || (options.scroll == 0 ? 0 : 1);
    this.minimize = options.minimize || 0;
    this.maximize = options.maximize || 0;
    
    if ($isBrowser('ie6')) {
        this.height += 54;
        this.width += 6;
    }
    options = 'scroll:' + this.scroll + ';center:' + this.center + ';resizable:' + this.resizable + ';minimize:' + this.minimize + ';maximize:' + this.maximize + ';help:' + this.help + ';status:' + this.statusbar + ';dialogWidth:' + this.width + 'px' + ';dialogHeight:' + this.height + 'px';
    
    return window.showModalDialog(url, variant || window, options);
};

function $checkUserIsVip(uin,callback){
	//检查用户是否会员，并把会员状态返回给回调函数
	$loadScript('http://ext.paipai.com/qqvip/is_vip?uin='+uin);
	//用户身份回调,参数:flag=1为会员，flag=0为非会员
	window.chkVipCallBack=callback;
}

function $checkOrderIsVirtual(oid,callback){
	window._PP_checkOrder_data={"oid":oid,"callback":callback}
	//检查订单是否是虚拟类商品
	$loadScript('http://party.paipai.com/cgi-bin/cxpl_deal_profile?deal_id='+oid+'&checkmod=comm_id');
	//订单状态回调
	window.AfterCheckDealCommId=function(uin, ret, errmsg){
		var sClassIds = ",3119,24590,200021,200082,200110,200024,28039,200023,200022,12001,100000003,100000002,100000001,"; 
		var vFlag=0;
		if(ret=='0'){
			var commIds=errmsg.split(',');
			for(var i=0;i<commIds.length;i++){
				if(commIds[i]&&sClassIds.indexOf(','+commIds[i]+',')!=-1){
					vFlag=1;
					break;
				}
			}
			//回调,flag=0非虚拟商品，flag=1虚拟商品
			_PP_checkOrder_data.callback(vFlag);
		}else if(ret=='2'){//登录超时
			$loginFrame({
				model:false,
				type:"func",
				check:false,
				x:0,
				y:0,
				action:function(){
					$checkOrderIsVirtual(_PP_checkOrder_data.oid,_PP_checkOrder_data.callback);
				}
			})
		}else{
			showFlashResult("error",errmsg)//(errmsg);
		}
	}
}

function $htmlEncode(str){
    return typeof(str) != "string" ? "" : str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/ /g, "&nbsp;");
};

function $htmlDecode(str){
    return typeof(str) != "string" ? "" : str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&nbsp;/g, " ");
};

function $checkUserIsBuyerVip(callback){
	//判断用户是否彩钻用户，并把结果返回给指定的回调函数，1表示是彩钻用户，0表不是
	window["_PP_UserIsBuyerVip_data"]=callback;
	$loginFrame({
		x:0,
		y:0,
		type:"func",
		action:function(){
			$loadScript("http://service.paipai.com/cgi-bin/buyervip_level?t="+Math.random());
			window.buyerVipCallBack=function(json){
				//加载彩钻flash动画
				if(json.code=='200'){
					window["_PP_UserIsBuyerVip_data"](json.state);
				}
			};
		}
	});
}

function $classAttr(obj){ 
	var option = {
        area: "", //显示区域的id，jquery语法
        var1: "", //返回编码1的inputid，jquery语法
        var2: "", //返回自定义值编码的input id，jquery语法
		spuID:"#productid",//返回spuid的input id，jquery语法。默认productid
		updateTypeInput: "#iUpdateType", //编辑还是新增的状态值， 默认iUpdateType
        saleAttr: {}, //关键库存属性串，用于b2c回填库存
        classId: "", //类目的id
        hiddenId: "", //如果没属性的时候就把这个id对象隐藏掉，jquery语法
        showHelp: true, //默认显示帮助链接
        subAttrRule: [], //子属性规则库，运行中有用，不要覆盖
        activeAttr: [], //用户操作过的属性id列表，运行中有用
        urlList: [], //请求数据的url的列表，用于防止死循环
        isB2C: false, //是否b2c,当"true"的时候从不同路径拉取数据
        isSPU: false, //是否拉取SPU(Standard Product Unit)数据
        isCheck: true, //是否进行验证，后台可能不需要验证
        isKeyEdit: true, //是否能够编辑关键路径，编辑的时候可能不允许关键属性路径的修改
        isHideSale: false,//是否隐藏销售属性
        showHideAttr: false,//是否显示隐藏属性
		txtLen:20,	//自定义文本的长度
        onInited: function(obj){
            return true;
        },
        onChange: function(dom, obj){
            return true;
        },
		onStockChange:function(input){
			return true;
		},
        onLoadSPU: function(cId, pId, pvId){
            return true
        },//当载入SPU数据后执行操作
        _keyAttrList:[],//存放完整的关键属性id列表
		_keyAttrStr:""//关键属性值编码串
		
    };
    for (var i in obj) {
        option[i] = obj[i];
    }
    option.areaHandel = $$(option.area); //显示区域的jQ对象
	option.showAttrList = showAttrList;//渲染属性列表
	option.isAdd = $$(option.updateTypeInput).val()==(""||0||"0");//判断是新增还是编辑
	option.spuIdHandel = $$(option.spuID);//存放spuid的jQ对象
    option.check = checkProperty; //检查属性选择的完整状态
	option.loadSpuInfo=loadSpuInfo;//加载spu数据
	//默认选择状态
    option._var1 = strToAttr($$(option.var1).val().replace("^", ""));
    //自定义属性值
    option._var2 = strToAttr($$(option.var2).val().replace("^", ""));
	//创建支持SPU的白名单。【后期这个需要从后台取得， 目前在此放开】
	//["203320","203360","203380", "203381",   "203386", "****",    211540,   211500,   225220,  4034,           211520,           226500,      201121]
	//[手机、    笔记本、 数码相机、数码摄像机、数码单反、{化妆品}、耳机耳麦、单反镜头、滤镜、   闪光灯及附件、  三脚架/云台(新)、{化妆品BB霜}、MP3/MP4、读卡器 、相机贴膜 、蓝牙耳机 、手机充电器 、手机线控耳机 、手机电池 、手机数据线 、笔记本电脑包 、笔记本电池 、笔记本电源 、笔记本内存 、键盘 、鼠标 、键鼠套装 、笔记本硬盘]
	option._spuList = ["203320","203360","203380","203381","203386", 27487, 24639, 36305, 20084, 20083, 203060, 203061, 24640, 27494, 27493, 27495, 203082, 203083, 27496, 20160, 20085, 20185, 27593, 20086, 20089, 20197, 26912, 203080, 26913, 27079, 27078, 26998, 20087, 27077, 203081, 27486, 27534, 27535, 20093, 27559, 27543, 27542, 27541, 27540, 27539, 27536, 27537, 27538, 203100, 203101, 203102, 27523, 20162, 20163, 20092, 20091, 36308, 20180, 20182, 20181, 20179, 27848, 27850, 27851, 34528, 34529, 34530, 34531, 34532, 34533, 34534, 203300, 203301, 203302, 20175, 27843, 27844, 27845, 203106, 27846, 20153, 20154, 20152, 20156, 20151, 203104, 203105, 20159, 20068, 20071, 20067, 203020, 203021, 20069, 20070, 20074, 20166, 20169, 203114, 203115, 203116, 203117, 203118, 203303, 203119, 203120, 203304, 20171, 203240, 34517, 20077, 27484, 27489, 36307, 36306, 203040, 203041, 27488, 203042, 20076, 26936, 26937, 20073, 20078, 29226, 29227, 27492, 20088, 203109, 203108, 203110, 203107, 203111, 203112, 203113, 26916, 26934, 26932, 27490, 203208, 203209, 203210, 203121, 203122, 203123, 203124, 203125, 203126, 203127, 203128, 203129, 203130, 203131, 24659, 24661, 24663, 24666, 24669, 20164, 20172, 20173, 203132, 203133, 203134, 203135, 203136, 203138, 203137, 26935, 203139, 203140, 203141, 203142, 203145, 203146, 203147, 203143, 203144, 20157, 203163, 203161, 203160, 203162, 203164, 203165, 203172, 203166, 203170, 203167, 203168, 203169, 203171, 203182, 203173, 203174, 203175, 203340, 203200, 203201, 203202, 203203, 203204, 203205, 203206, 203207, "211540","211500","225220","4034","211520", 226500,"201121", 228861, 228920, 229064, 211421, 229796, 211440, 211480, 48, 230249, 46, 204078, 204077, 204081, 204082, 204086];
	//取得当前类目是否在SPU白名单中的布尔值
	option._isInSPUList = checkClassID.call(option);
	//如果是新增状态，productid默认为0
	if(option.isAdd){
		option.spuIdHandel.val("0");
	}
	//写入全局变量
    window._classAttrOption = option;
    //请求类目配置数据的回调函数。 如;选择手机，那么就取回手机相关的所有的厂商，型号，颜色，重量，等等。
    window.classAttrCallBack = classAttrCallBack;
    //选择对象操作的处理事件
    window.attrChange = attrChange;
    //检查列表的输入是否合法
    window.setTipsState = setTipsState;
	//载入SPU信息
	window.findSpuByKeyAttrSuccess = findSpuByKeyAttrSuccess;
    //开始渲染
    option.showAttrList();
    //属性描述信息的框
    $$("body").append('<div id="classAttrDesc" class="classAttrDesc" ></div>');
	//加上提示信息
	//option.showSPUinfo();
	return option;
    
    //检查属性选择的完整状态1
    function checkProperty(){
        //如果当前类目没有属性，则直接返回真
        if (!this.aidList) {
            $$(this.var1).val("");
            $$(this.var2).val("");
            return true;
        }
        if (this.aidList.length < 1) {
            $$(this.var1).val("");
            $$(this.var2).val("");
            return true;
        }
        var _var1 = window._classAttrOption._var1;
        var _var2 = window._classAttrOption._var2;
        _var1 = [];
        _var2 = [];
        var _t = [], _e = [], _eItems = [];
        for (var i = 0; i < this.aidList.length; i++) {
            _t.push("#f_" + this.aidList[i]);
        }
        $$(_t.join(",")).each(function(){
            var _this = $$(this);
            var _v = getAttrNewValue(window._classAttrOption, _this.attr("attrId"), _this.attr("parentId"), _this.attr("parentAttrId"));
            var stype = _this.attr("stype");
            if (window._classAttrOption.isCheck) {
                window.onerror = "";
                //必选但是没有选择
                if (_v[4] && _v[0] == "" && stype != 'txt') {
                    var _item = _this.find("select,:checkbox,:text").filter(":first").get(0);
                    _eItems.push(_item ? _item : "");
                    _e.push("请选择“" + _this.attr("attrName") + "”");
                    $$("#e_" + _this.attr("attrId")).html("请选择“" + _this.attr("attrName") + "”").show();
                }
                //文本属性必填情况
                if (_v[4] && stype == 'txt' && _v[1] == "") {
                    var _item = _this.find("select,:checkbox,:text").filter(":first").get(0);
                    _eItems.push(_item ? _item : "");
                    _e.push("请填写“" + _this.attr("attrName") + "”");
                    $$("#e_" + _this.attr("attrId")).html("请填写“" + _this.attr("attrName") + "”").show();
                }
                //选了其他，但是没有填内容
                if (_v[3] && _v[1] == "") {
                    var _item = _this.find(":text").filter(":first").get(0);
                    _eItems.push(_item ? _item : "");
                    _e.push("请填写“" + _this.attr("attrName") + "”的自定义属性值");
                    $$("#e_" + _this.attr("attrId")).html("请填写“" + _this.attr("attrName") + "”的自定义属性值").show();
                }
            }
            //选择了值就压入
            if (_v[0].length > 0) {
                //如果是复选则按照id拼成16进制串，单选则直接转换成16进制数
                _var1.push([_this.attr("attrId"), getByteFromIdList(_v[0], _this.attr("attrId"), window._classAttrOption)])
            };
            //选择了值，并且有其他值，并且不为空
            (_v[0] && _v[3] && _v[1]) ? _var2.push([_this.attr("attrId"), _v[1]]) : "";
            //文本属性的情况【选中值，自定义值，是否有子属性，是否有其他值，是否必选值】
            if (_v[0].length == 0 && !_v[3] && _v[1]) {
                //if (!option.isB2C) {
                    _var1.push([_this.attr("attrId"), 1]);
               // }
                _var2.push([_this.attr("attrId"), _v[1]]);
            }
        });
        if (_e.length < 1) {
            $$(this.var1).val(attrsToStr(_var1, 16));
            $$(this.var2).val(attrsToStr(_var2, 16));
            return true;
        }
        else {
            this.errorItems = _eItems;
            try {
                _eItems[0] ? _eItems[0].focus() : "";
            } 
            catch (e) {
            }
            return _e;
        }
    }
    //选择框、文本框的用户操作事件
    function attrChange(dom){
		var option = window._classAttrOption; 
		var attrType = $$(dom).attr("atag");//select、input、text
        var aid = parseInt($$(dom).attr("attrid")); 
        var aoid = (attrType == "select" || attrType == "checkbox") ? dom.value : "";
        var apid = $$(dom).attr("parentId");
        var apaid = $$(dom).attr("parentAttrId");
        var attrText = dom.value;
        var property = $$(dom).attr("property");
        //自定义内容文本框
		
        if (attrType == "text" || attrType == "txt") {
            //输入的内容验证
            //替换：|
            if ($strTrim(attrText," ") != attrText) {
                attrText = $strTrim(attrText," ");
                dom.value = attrText;
            }
            if (attrText.replace(/[-:\|\^"\\\/<>]/g, "") != attrText) {
                attrText = attrText.replace(/\:/g, "：").replace(/\|/g, "｜").replace(/\^/g, " ").replace(/\"/g, "“").replace(/\\/g, " ").replace(/\//g, " ").replace(/\'/g, "‘").replace(/</g, "＜").replace(/>/g, "＞").replace(/-/g, "~");
                dom.value = attrText;
            };
            //长度检查
			var tLen=option.txtLen;
            if ($strLenGB(attrText) > tLen) {
                attrText = $strLenGB($strSubGB(attrText,0, tLen)) >= tLen ? $strSubGB(attrText,0, tLen-1) : attrText;
                dom.value = attrText;
            }
        };
        var t_var = getAttrNewValue(option, aid, apid, apaid);
        //根据属性的选择状态设置自定义内容文本框的显示隐藏（先判断现在状态是否等于目标状态，不等才修改）
        document.getElementById("i_" + aid).style.display = t_var[3] ? "" : "none";
        //判断是否有子属性的变化
        var childChange = false;
        //发生改变的元素(属性值)列表,复选框只有一个当前元素，单选框则还要加上原来的值
        var changeItemList = [aoid, (attrType == "select") ? getAttrDefValue(option, aid, apid, apaid)[0].toString() : ""];
        //判断发生改变的元素是否具有子属性，如果有的话则说明一定有变化
        for (var i = 0; i < option.attr.attrList.length; i++) {
            var _attr = option.attr.attrList[i];
            if (!option.attr.attrList[i]) {
                continue;
            }
            if (_attr.id == aid && _attr.parentId == apid && _attr.parentAttrId == apaid) {
                //判断所有改变的元素是否有子属性
                for (var j = 0; j < option.attr.attrList[i].opList.length; j++) {
                    if (!option.attr.attrList[i].opList[j]) {
                        continue;
                    }
                    for (var k = 0; k < changeItemList.length; k++) {
                        (changeItemList[k] != "" && parseInt(option.attr.attrList[i].id) == parseInt(aid) && parseInt(_attr.opList[j][0]) == parseInt(changeItemList[k]) && _attr.opList[j][2] > 0) ? childChange = true : "";
                    }
                }; 
                //判断完了以后，顺便把最新的值写入
                _attr.defaultVar = t_var[0].join(",");
                _attr.defaultTxt = t_var[1];
            }
        };
        //把当前属性id插入到用户操作过的属性列表中，便于还原提示状态
        (("," + option.activeAttr + ",").indexOf("," + aid + "_" + apid + "_" + apaid + ",") < 0) ? option.activeAttr.push(aid + "_" + apid + "_" + apaid) : "";
        setTipsState(option);
        option.onChange(dom, option);
        //判断是否需要重新渲染选择区域
        if (childChange) {
            window._classAttrOption.showAttrList();
        };
		option.loadSpuInfo();
		if (attrType == 'select' || attrType == "txt") {
			if (parseInt(property) & 0X80000) {			
				if (option.isSPU) {
                    //如果需要载入SPU数据	
					if (option.isB2C) {
						//注意，文本框也可能是关键属性，例如图书的ISBN号码
                        var isKey = attrType == "txt" ? 1 : 0;
                        var attrValue = isKey ? dom.value : aoid;
                        option.onLoadSPU(option.classId, aid, attrValue, isKey);
                    }
                }
            };
		};
	};
    //输出所有用户操作过的属性的提示信息
    function setTipsState(obj){
        var _alist = obj.attr.attrList;
        var _t = [];
        for (var i = 0; i < obj.activeAttr.length; i++) {
            var _to = obj.activeAttr[i].split("_");
            var _mess = ""; //提示信息
            for (var j = 0; j < _alist.length; j++) {
                if (!_alist[j]) {
                    continue;
                }
                if (_alist[j].id == parseInt(_to[0]) && _alist[j].parentId == parseInt(_to[1]) && _alist[j].parentAttrId == parseInt(_to[2])) {
                    var _v = getAttrNewValue(obj, _alist[j].id, _alist[j].parentId, _alist[j].parentAttrId);
                    var prop = _alist[j].property;
                    //必选并且没有选择并且不为文本属性
                    _mess = ((prop & 0x20000) && _v[0].length < 1 && !(prop & 0x8)) ? "请选择‘" + _alist[j].name + "’" : _mess;
                    _mess = ((prop & 0x8) && _v[1] == "") ? "请填写‘" + _alist[j].name + "’" : _mess;
                    _mess = (_v[3] && _v[1] == "") ? "请填写“" + _alist[j].name + "”的自定义属性值" : _mess;
                }
            }
            (_mess) ? $$("#e_" + _to[0]).html(_mess).show() : $$("#e_" + _to[0]).html("").hide();
            //这里只保留未检查通过的id
            (_mess) ? _t.push(obj.activeAttr[i]) : "";
        }
        obj.activeAttr = _t;
    }
    //获取某个属性的当前选中值【选中值，自定义值，是否有子属性，是否有其他值，是否必选值】
    function getAttrNewValue(option, aid, pid, paid){
        var r = [[], '', false, false, false];
        for (var i = 0; i < option.attr.attrList.length; i++) {
            var a = option.attr.attrList[i];
            if (!a) {
                continue;
            }
            if (a.id == aid && a.parentId == pid && a.parentAttrId == paid) {
                r[4] = (a.property & 0x20000) ? true : false;
                //选中对象的处理
                var items = (a.property & 0x4) ? option.areaHandel.find(":checked[name='r_" + aid + "']") : ((a.property & 0x2) ? option.areaHandel.find("#s_" + aid) : option.areaHandel.find("#x_" + aid));
                items.each(function(){
                    this.value ? r[0].push(this.value) : "";
                    for (var j = 0; j < a.opList.length; j++) {
                        if (!a.opList[j]) {
                            continue;
                        }
                        //判断是否有其他值、子属性
                        (a.opList[j][0] == parseInt(this.value) && a.opList[j][2] > 0) ? r[2] = true : "";
                       // (a.opList[j][0] == parseInt(this.value) && a.opList[j][1].indexOf("其他") >= 0 && !option.isB2C) ? r[3] = true : "";
                        (a.opList[j][0] == parseInt(this.value) && a.opList[j][1].indexOf("其他") >= 0) ? r[3] = true : "";
                    }
                });
                var _vv = $$("#c_" + aid).val();
				var tLen=option.txtLen;
                if ($strLenGB(_vv) > tLen) {
                    _vv = $strLenGB($strSubGB(_vv,0, tLen)) >= tLen ? $strSubGB(_vv,0, tLen-1) : _vv;
                    $$("#c_" + aid).val(_vv);
                }
                r[1] = _vv;
                if (a.property & 0x8) {
                    //当为文本输入的时候，清空r[0]，值放置如r[1]
                    r[0] = [];
                    r[1] = $$("#x_" + aid).val();
                }
            }
        }
        return r;
    }
    //获取某属性的默认选址,参数：大对象，属性id，属性的父属性id，属性的父属性属性值id,
    function getAttrDefValue(obj, aid, apid, apaid){
        for (var i = 0; i < obj.attr.attrList.length; i++) {
            if (obj.attr.attrList[i].id == aid && obj.attr.attrList[i].parentId == apid && obj.attr.attrList[i].parentAttrId == apaid) {
                //返回参数:[选中元素的id列表，自定义值，16进制标表示的选中值]
                return [obj.attr.attrList[i].defaultVar.split(","), obj.attr.attrList[i].defaultTxt ? obj.attr.attrList[i].defaultTxt : "", getByteFromIdList(obj.attr.attrList[i].defaultVar.split(","), obj.attr.attrList[i].id, obj)];
            }
        }
        return [[], "", ""];
    }
    //渲染属性列表
    function showAttrList(){
        //如果没有attr变量则表示是第一次请求
        if (!this.attr) {
            this.areaHandel.html('<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle" style="font-size:13px; color:#333333; text-align:center;vertical-align: middle; " width="100%" height="100%" style="padding:5px;"><img src="http://static.paipaiimg.com/assets/common/loading2.gif" /><br />数据加载中……</td></tr></table>');
            //期待回调函数：classAttrCallBack
            var url = "http://my.paipai.com/cgi-bin/" + (this.isB2C ? "b2c_" : "") + "commoditypublish_genjsdata?classid=1&mc=" + this.classId + "&attrid=" + attrsToStr(this._var1, 16) + "&tagid=";
            if (("," + this.urlList.join(",") + ",").indexOf("," + url + ",") >= 0) {
                alert("类目属性请求出错，请刷新页面重试，如果多次出现这种情况请联系客服处理。");
                return;
            }
            this.urlList.push(url);
            $loadScript(url + ((new Date).getTime()), "getRootAttr");
            return;
        }
        //从第0级开始加载数据
        this.aidList = [];
		//清空关键属性列表
		this._keyAttrList=[];
        var hc = getCodesByParentId(this, 0, 0);
        //如果数据不完整则中断，等待下次被唤起
        if (this.noFullData) {
            return;
        }
		//如果当前商品是SPU商品，那么增加spu的提示
		if(this._isInSPUList){
			hc = '<DIV id="spuAlertInfo"><span class="warning" style="font-weight:bold; color:#F00; margin-left:20px; padding-right:5px; width:460px; background:url(http://pics.paipai.com/common/icon/noteHint.gif) no-repeat scroll 5px 2px #F5FFF1; border:1px solid #ABDC97; ">为节省您发布商品的时间，商品属性自动加载标准产品信息。<a href="http://bbs1.paipai.com/g40005c3i1049s0p0.html" target="_blank" style="text-decoration:underline;">反馈>></a></span></DIV>' + hc;
		}
        this.areaHandel.html(hc);
        setTipsState(this);
        if (this.showHelp) {
            //给所有的tip帮助链接绑定tips事件
			$$("#classAttrDesc").unbind("mouseover").mouseover(function(){
				$$(this).show();
			}).mouseout(function(){
				$$(this).hide();
			});
            this.areaHandel.find("[atag='tiplink']").unbind("mouseover").mouseover(function(){
                var infoId = this.id.replace("a_", "t_");
                $$("#classAttrDesc").css("position", "absolute").css("left", $getX(this)).css("top", $getY(this) + 15).html($$("#" + infoId).html()).show().children("div").css("width", "395").css("display", "block").append('<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;filter:Alpha(Opacity=0);border:none;" id="classAttrDesc_iframe"></iframe>');
                $$("#classAttrDesc_iframe").css("height", $$("#classAttrDesc").height() + 15)
            }).mouseout(function(){
                $$("#classAttrDesc").hide();
            });
        }
        else {
            this.areaHandel.find("[atag='tiplink']").remove();
        }
		//渲染完成，判断spu数据的调用
		this.loadSpuInfo();
        //初始化完成事件
		this.onInited(this);
    }
    //根据父id生成列表,参数：obj，父属性id，16进制父属性的默认值（可能是多选项目的子属性，所以一定要是选择后的值）
    function getCodesByParentId(obj, pid, paid){
        if (obj.noFullData) {
            return "";
        }
        //销售属性分开装配
        var html = [], htmlSale = [];
        //把组合属性值转换成属性值id列表
        for (var i = 0, len = obj.attr.attrList.length; i < len; i++) {
            //属性值id列表
            var nowAttr = obj.attr.attrList[i];
            //遍历所有的属性节点，找到当前父节点选中值下的子节点
            if (nowAttr && nowAttr.parentId == pid && ("," + getListFromIdByte(paid, pid, obj) + ",").indexOf("," + nowAttr.parentAttrId + ",") >= 0) {
                //构造组件的html代码				
                html.push(getAttrCode(nowAttr));
            }
        }
        //如果这里没有找到任何一个元素，并且不是根目录的话，就说明数据不完整，要重新请求数据后重新渲染。
        if (html.length < 1 && pid != 0) {
            //期待回调classAttrCallBack，参数:nt是否返回跟属性数据，mc当前类目id，attrid属性id及选中属性的值
            var url = "http://my.paipai.com/cgi-bin/" + (obj.isB2C ? "b2c_" : "") + "commoditypublish_genjsdata?classid=0&mc=" + obj.attr.classId + "&attrid=" + parseInt(pid, 10).toString(16) + ":" + paid + "&tagid=";
            if (("," + obj.urlList.join(",") + ",").indexOf("," + url + ",") >= 0) {
                alert("类目属性请求出错，请刷新页面重试，如果多次出现这种情况请联系客服处理。");
                return "";
            }
            obj.urlList.push(url);
            $loadScript(url + ((new Date).getTime()), "getYeziAttr");
            return "";
        }
        //返回代码
        return html.join("");
        
        //生成某条属性的代码
        function getAttrCode(al){
            obj.aidList.push(al.id);//记录当前使用中的属性
            var dvar = getAttrDefValue(obj, al.id, al.parentId, al.parentAttrId); //默认选择的属性值[选择值，自定义值,选中元素的id数组]
            var hasChild = false; //当前属性的选择结果中是否有子属性,条件：但前选中值有子属性
            var hasOther = false; //是否显示其他内容，条件：当前选中项中有其他值存在
            var ss = ""; //选择框的代码串
            var ap = parseInt(al.property);
			//判断是否关键属性，如果是关键属性，压入关键属性列表
			if(ap & 0x80000){
				obj._keyAttrList.push([al.id,al.parentId, al.parentAttrId]);
			}
			//文本属性
            if (ap & 0x8) {
                //输入框
                var autoValue = "";
                //当属性为必选属性，且被隐藏时默认值- （被显示时不设置默认值）
                if ((!obj.isB2C && (ap & 0x200000)) || (obj.isB2C && (ap & 0x400000))) {
					if (!obj.showHideAttr) {
						autoValue = "-";
					}
                }
                ss += '<input type="text" id="x_' + al.id + '" onchange="attrChange(this)" atag="txt" noblank="' + ((ap & 0x20000) ? "true" : "false") + '" attrId="' + al.id + '" attrName="' + al.name + '" parentId="' + al.parentId + '" parentAttrId="' + al.parentAttrId + '" property="' + al.property + '" value="' + (dvar[1] ? dvar[1] : autoValue) + '" />';
            };
            //单选属性
            if (ap & 0x2) {
                ss += '<select id="s_' + al.id + '" onchange="attrChange(this)" atag="select" noblank="' + ((ap & 0x20000) ? "true" : "false") + '" attrId="' + al.id + '" attrName="' + al.name + '" parentId="' + al.parentId + '" parentAttrId="' + al.parentAttrId + '" property="' + al.property + '"><option value="" style="color:#999;">未选择</option>'
                for (var ii = 0; ii < al.opList.length; ii++) {
                    if (!al.opList[ii]) {
                        continue;
                    }
                    var autoSelectThis = false;
                    //当属性为必选属性，且被隐藏时默认选择第一个
                    if (ii == 0 && (parseInt(al.property) & 0x20000) && ((!obj.isB2C && (parseInt(al.property) & 0x200000)) || (obj.isB2C && (parseInt(al.property) & 0x400000)))) {
                        autoSelectThis = true;
                    }
                    ss += '<option value="' + al.opList[ii][0] + '" ' + (("," + dvar[0] + ",").indexOf("," + al.opList[ii][0] + ",") >= 0 ? 'selected="selected"' : '') + ' subAttrIds="' + al.opList[ii][2] + '" ' + (autoSelectThis ? 'selected="selected"' : '') + '>' + al.opList[ii][1] + '</option>';
                    (("," + dvar[0] + ",").indexOf("," + al.opList[ii][0] + ",") >= 0 && al.opList[ii][2]) ? hasChild = true : '';
                    //(("," + dvar[0] + ",").indexOf("," + al.opList[ii][0] + ",") >= 0 && al.opList[ii][1].indexOf("其他") >= 0 && !option.isB2C) ? hasOther = true : '';
                    (("," + dvar[0] + ",").indexOf("," + al.opList[ii][0] + ",") >= 0 && al.opList[ii][1].indexOf("其他") >= 0 ) ? hasOther = true : '';
                }
                ss += '</select>';
            }
            //复选框，属性值借助数组进行排序
            var isSale = false;//是否销售属性，下面隐藏也需要
            if (ap & 0x4) {
                //如果是销售属性，按照如下格式构造：{384010047:['颜色',1,0,{684044389:'白色',384001735:'橙色',384001745:'淡蓝色',384001743:'淡紫色',384001712:'粉色',384001713:'褐色',684004234:'褐色',384001703:'黑色',384001704:'红色',384001715:'灰色',684044383:'桔色',384001711:'金色',384001706:'蓝色',684044580:'蓝色',384001705:'绿色',384006300:'米色',384001714:'其它',684044306:'银色',384001742:'紫色',384001729:'棕色',684100369:'炫银、莹白、霓红'}],684003201:['套装',1,0,{684055954:'普通',684055958:'套装一',684055960:'套装二'}]}
                isSale = ap & 0x10000;
                //如果是销售属性，则构造数据
                isSale ? obj.saleAttr[al.id] = [al.name, 1, 0, {}] : '';
                ss += "<div class='input-css'>"
                for (var ii = 0; ii < al.opList.length; ii++) {
                    if (!al.opList[ii]) {
                        continue;
                    }
                    var autoSelectThis = false;
                    //当属性为必选属性，且被隐藏时默认选择第一个
                    if (ii == 0 && (parseInt(al.property) & 0x20000) && ((!obj.isB2C && (parseInt(al.property) & 0x200000)) || (obj.isB2C && (parseInt(al.property) & 0x400000)))) {
                        autoSelectThis = true;
                    }
                    isSale ? obj.saleAttr[al.id][3][al.opList[ii][0]] = al.opList[ii][1] : '';
                    ss += '<input type="checkbox" onclick="attrChange(this)" name="r_' + al.id + '" id="r_' + al.id + '_' + al.opList[ii][0] + '" value="' + al.opList[ii][0] + '"  ' + ((("," + dvar[0] + ",").indexOf("," + al.opList[ii][0] + ",") >= 0 || autoSelectThis) ? 'checked="checked"' : '') + ' attrId="' + al.id + '" attrName="' + al.name + '" text="' + al.opList[ii][1] + '" atag="checkbox" stock="' + ((ap & 0x10000) ? "1" : "0") + '" noblank="' + ((ap & 0x20000) ? "true" : "false") + '" parentId="' + al.parentId + '" parentAttrId="' + al.parentAttrId + '" /><label for="r_' + al.id + '_' + al.opList[ii][0] + '">' + al.opList[ii][1] + '</label>';
                    (("," + dvar[0] + ",").indexOf("," + al.opList[ii][0] + ",") >= 0 && al.opList[ii][2]) ? hasChild = true : '';
                    //(("," + dvar[0] + ",").indexOf("," + al.opList[ii][0] + ",") >= 0 && al.opList[ii][1].indexOf("其他") >= 0 && !option.isB2C) ? hasOther = true : '';
                    (("," + dvar[0] + ",").indexOf("," + al.opList[ii][0] + ",") >= 0 && al.opList[ii][1].indexOf("其他") >= 0 ) ? hasOther = true : '';
                }
                ss += "</div>";
            };
            var hc = '<div atag="attrItem" id="f_{#attrId#}" stype="{#type#}" attrId="{#attrId#}" attrName="{#name#}" parentId="{#parentId#}" parentAttrId="{#parentAttrId#}" class="cts" style="display:{#showThis#};"><p class="cts2"><font class="fontOrange">{#must#}</font>{#name#}：</p><ul class="cts1"><li atag="select" class="cts3">{#selector#}</li><li atag="input" id="i_{#attrId#}" class="cts4" style="{#showOtherVar#}"><input name="c_{#attrId#}" onchange="attrChange(this)"  type="text" id="c_{#attrId#}" noblank="" attrId="{#attrId#}" value="{#otherVar#}" parentId="{#parentId#}" parentAttrId="{#parentAttrId#}" size="'+option.txtLen+'" atag="text" /></li><li atag="tip" class="cts5" ><a href="#nolink" id="a_{#attrId#}" style="{#showAbout#}" class="cts6" atag="tiplink">关于{#name#}</a> <div id="t_{#attrId#}" style="display:none" style="top"><div class="ctsflow">{#description#}</div></div></li><li atag="error" id="e_{#attrId#}" class="cts7" style="display:none"></li></ul></div>';
            hc = hc.replace(/{#attrHide#}/g, obj.isHideSale && isSale ? "display:none;" : "");
            hc = hc.replace(/{#must#}/g, (ap & 0x20000) ? "*" : "");//是否必填
            if (!obj.isB2C) {//c2c属性的隐藏
                hc = hc.replace(/{#showThis#}/g, (ap & 0x200000) ? "none" : "");//是否显示
            }
            else {//b2c属性的隐藏
                hc = hc.replace(/{#showThis#}/g, (ap & 0x400000) ? "none" : "");//是否显示
            }
			hc = hc.replace(/{#attrId#}/g, al.id);//属性id号
            hc = hc.replace(/{#parentId#}/g, al.parentId);//属性id号
            hc = hc.replace(/{#parentAttrId#}/g, al.parentAttrId);//属性id号
            hc = hc.replace(/{#name#}/g, al.name);//属性名称
            hc = hc.replace(/{#showAbout#}/g, (al.desc == "null" || al.desc == "" || !al.desc) ? "display:none;" : "")
            hc = hc.replace(/{#description#}/g, al.desc);//属性描述文字
            hc = hc.replace(/{#selector#}/g, ss);//选择框
            hc = hc.replace(/{#otherVar#}/g, dvar[1]);//自定义属性值
            hc = hc.replace(/{#showOtherVar#}/g, hasOther ? "" : "display:none;");//自定义属性值
            hc = hc.replace(/{#tips#}/g, "");//tips内容
            hc = hc.replace(/{#type#}/g, (ap & 0x2) ? "select" : ((ap & 0x4) ? "checkbox" : "txt"));//选项类别：单选，复选，文本
            //如果当前属性的选中属性值有子属性，则把子属性的内容输出出来,参数：obj，当前属性id，当前属性默认值
            if (hasChild) {
                //递归调用当前节点的子节点属性
                hc += getCodesByParentId(obj, al.id, dvar[2]);
            }
            return hc;
        }
    };
	//加载商品spu数据
	function loadSpuInfo(){
		option.spuIdHandel.val("0");
		//b2c下不加载spu数据
		if(this.isB2C){return false;}
		if(!this._isInSPUList){
			return false;
		}//不在列表中，直接返回.
		var obj=this;
		var keyValue=getSpuStr();
		//如果关键属性未发生变化，则什么也不做。
		if(!isKeyValueChange()){//1----------关键属性未发生变化，则返回，什么也不做。
			//..todo 
		}else if(!isKeyValueSelect()){//如果关键属性发生变化，但是未全部选中，则：取消其他属性的只读状态
			_cleanHtml();
		}else{//如果关键属性发生变化，并且全部选中，则加载spu数据
			//如果当前item不是关键属性或者其父属性，那么解锁并清空所有非关键属性项，关键属性项及其父属性不改变
			//判断是否新增
			//option.spuIdHandel.val("0");
			if(typeof window._isFirstEdit=="undefined"){
				window._isFirstEdit = true;
			}
			if(option.isAdd){
				_cleanHtml();
			}else{
				if(window._isFirstEdit){
					window._isFirstEdit = false;
				}else{
					_cleanHtml();
				}
			}
			if(keyValue.length>0){
				var kv, loading;
				(function(){
					var s = [],	len=keyValue.length, x; 
					for(var i=0; i<len; i++){
						x = keyValue[i];
						//s.push((x[1]?"1":"0") + ":" +x[5]  + ":" + x[0]);//格式：是否文本：属性ID:选项ID
						//dukechen的参数顺序发生调整:   
						s.push(x[5] + ":" +x[0]  + ":" + (x[1]?"1":"0"));//格式：属性ID:选项ID:是否文本
					}
					loading = $$("#e_"+keyValue[len-1][5]); 
					kv =  s.join("|");
				})();
				loading.html("正在加载标准产品信息，请稍候……").show();
				//期待回调getSpuInfoCallBack
				//loadScript("http://sale.brand.paipai.com/getSPUInfoByAttrs.xhtml?cid="+ this.classId +"&encode=10&keyattrstr="+kv);
				//CGI变更：sale.brand.paipai.com被回收，改用新的api.paipai.com. 期待回调findSpuByKeyAttrSuccess. 接口数据结构保持不变
				$loadScript("http://api.paipai.com/spu/findSpuByKeyAttr.xhtml?needParseAttr=1&classId="+ this.classId +"&keyAttrs="+kv);
				loading.html("").hide();
			}//end of else.
			
		} 
		obj._keyAttrStr=getSpuStr();
		//清理HTML元素,除关键属性和其父属性外，其他置空。
		function _cleanHtml(){
			$$(obj.area).find(":disabled").removeAttr("disabled");
			//计算出关键属性和其父属性.
			function getParentAttrByItem(id){
				var al=window._classAttrOption.attr.attrList;
				var _t;
				for(var i=0;i<al.length;i++){
					if(al[i].id==id){_t=al[i];}
				}
				if(!_t){return "";}
				if(_t.parentId=="0"){
					return id+"";
				}
				for(var i=0;i<al.length;i++){
					if(al[i].id==_t.parentId){
						var returnVar=getParentAttrByItem(al[i].id);
						return id+","+getParentAttrByItem(al[i].id);
					}
				}
			}
			var keyList=[];
			for(var i=0;i<obj._keyAttrList.length;i++){
				keyList=keyList.concat(getParentAttrByItem(obj._keyAttrList[i][0]).split(","));
			}
			for(var i =0;i<keyList.length;i++){
				keyList[i]="#f_"+keyList[i];
			}
			keyList=keyList.join(",");
			//$$(obj.area).find(":checkbox:not("+ _voidItems("r").join(",") +")").attr("checked", false); //checkbox 不做清除。
			//$$(obj.area).find("div[id^=f_]:visible select:not("+ _voidItems("s").join(",") +")").val("");//将所有SELECT都置为空
			$$(obj.area).find("div[id^=f_]:not("+keyList+"):visible select").val("");//将所有SELECT都置为空
			$$(obj.area).find("div[id^=f_]:not("+keyList+"):visible :text[id^=x_]").val("");//将所有INPUT-TEXT都置为空
			//$$(obj.area).find("div[id^=f_]:visible li[atag=input]:not("+ _voidItems("i").join(",") +")").val("").hide(); //将“其他”项隐藏
			//$$(obj.area).find("div[id^=f_]:visible li[atag=error]:not("+ _voidItems("e").join(",") +")").html("").hide(); //将“其他”项的提示信息隐藏
		}
		//判断是否所有属性都已经选中
		function isKeyValueSelect(){
			for(var i=0;i<keyValue.length;i++){
				if(keyValue[i][0].length<1 || (keyValue[i][3] && keyValue[i][1]=="")){
					return false;
				}
			}
			return true;
		}
		//判断关键属性是否发生变化
		function isKeyValueChange(){
			return keyValue.toString()==obj._keyAttrStr ? false : true ;
		}
		//获取关键属性编码串
		function getSpuStr(){
			var str=[];
			var x;
			for(var i=0;i<obj._keyAttrList.length;i++){
				x = obj._keyAttrList[i];
				//【选中值，自定义值，是否有子属性，是否有其他值，是否必选值】
				str.push(getAttrNewValue(obj, x[0], x[1],x[2]).concat(x[0]));
			}
			return str;
		}
	}
    //把值数组，合并为一个长字符串。
    function getByteFromIdList(list, aid, obj){
        if (list == "") {
            return "";
        }
        var t = "select";
        //取当前属性的类型
        for (var i = 0; i < obj.attr.attrList.length; i++) {
            if (obj.attr.attrList[i].id == aid) {
                t = (obj.attr.attrList[i].property & 0x4) ? "checkbox" : "select";
            }
        }
        //如果是复选属性则拼成256位16进制字符串，单选属性则直接转为16进制
        if (t == "select") {
            return parseInt(list, 10).toString(16);
        }
        else 
            if (t == "checkbox") {
                if (obj.isB2C) {
                    for (var i = 0, len = list.length; i < len; i++) {
                        list[i] = parseInt(list[i], 10).toString(16);
                    };
                    return list + '';
                };
                var bytes = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
                
                //把所有选中的id按照32位拆分，分别写入对应的字段
                for (var i = 0; i < list.length; i++) {
                    bytes[Math.ceil(list[i] / 32) - 1] += Math.pow(2, (list[i] - 1) % 32);
                }
                //转为16位字符串
                for (var i = 0; i < bytes.length; i++) {
                    bytes[i] = get16Char(bytes[i]);
                }
                //去零，反转
                return $strTrimLeft(bytes.reverse().join(""),"0");
            }
        
        function get16Char(i){
            i = i.toString(16);
            var s = "";
            for (var j = 0; j < (8 - i.length); j++) {
                s += "0";
            }
            return s + i.toString();
        }
    };
    //把属性字符串转换成一个id数组
    function getListFromIdByte(str, aid, obj){
        if (str == "0") {
            return ["0"];
        }
        var t = "select";
        //取当前属性的类型
        for (var i = 0; i < obj.attr.attrList.length; i++) {
            if (obj.attr.attrList[i].id == aid) {
                t = (obj.attr.attrList[i].property & 0x4) ? "checkbox" : "select";
            }
        }
        if (obj.isB2C) {
            var arr = str.split(',');
            for (var i = 0, len = arr.length; i < len; i++) {
                arr[i] = parseInt(arr[i], 16).toString(10);
            };
            return arr;
        };
        //如果是复选属性则把字符串，转成256位长自己再出id列表，如果是单选属性则直接转成10进制id
        if (t == "select") {
            return [parseInt(str, 16)];
        }
        if (t == "checkbox") {
            //把str转为2进制串
            var s = "", r = [];
            for (var i = 0; i < str.length; i++) {
                s += ["0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111", "1000", "1001", "1010", "1011", "1100", "1101", "1110", "1111"][parseInt(str.substr(i, 1), 16)];
            }
            //把字符串补齐为256位2进制串
            str = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000".substr(0, 256 - s.length) + s;
            //按位数返回位的id，（最右边位第一位）
            for (var i = 0; i < str.length; i++) {
                if (str.substr(i, 1) == "1") {
                    r.push(256 - i);
                }
            }
            return r.reverse()
        }
    };
    //把内存中的属性选择传转换为字符串,参数：编码串，id的进制
    function attrsToStr(attr, type){
        var ct = type == 10 ? 10 : 16;
        var ct2 = type == 10 ? 16 : 10;
        var t = [];
        for (var i = 0; i < attr.length; i++) {
            if (!attr[i][0]) {
                continue;
            }
            t.push(parseInt(attr[i][0], ct2).toString(ct) + ":" + attr[i][1]);
        }
        return t.join("|");
    };
    //字符串转换为属性选择状态对象
    function strToAttr(str){
        //数据结构：33:13|34:3|35:2|37:1|38:1|39:1|515:1|516:1|517:1|573:2|30:14|null
        var attr = str ? str.replace("^", "").split("|") : [];
        //去掉最后的空元素
        if (attr[attr.length - 1] == "") {
            attr.pop();
        }
        for (var i = 0; i < attr.length; i++) {
            attr[i] = attr[i].split(":");
            //兼容旧的3位属性值,自动转码，去掉第一位，并转为16进制id
            if (attr[i].length > 2) {
                attr[i].reverse();
                attr[i].pop();
                attr[i].reverse();
            }
            attr[i][0] = parseInt(attr[i][0], 16)
        }
        
        //转换结果51,13,52,3,53,2,55,1,56,1,57,1,1301,1,1302,1,1303,1,1395,2,48,14,49,6^
        return attr;
    };
    //回调函数：请求类目配置数据的回调
    function classAttrCallBack(obj){
        if (!window._classAttrOption) {
            return;
        }
        var option = window._classAttrOption;
        //如果是请求全新的数据的时候就先创建对象
        if (!option.attr) {
            option.attr = {
                classId: obj.classId,
                className: obj.className,
                attrList: []
            };
            if (obj.attrList.length < 1 && option.hiddenId != "") {
                $$(option.hiddenId).hide();
            }
        }
        //合并属性列表
        for (var i = 0; i < obj.attrList.length; i++) {
            if (option.showHideAttr && (obj.attrList[i].property & 0x200000)) {
                obj.attrList[i].property = obj.attrList[i].property - 0x200000
            }
            option.attr.attrList.push(obj.attrList[i]);
        }
        //如果有默认值，则把默认值覆盖系统默认值
        for (var i = 0; i < option._var1.length; i++) {
            for (var j = 0; j < option.attr.attrList.length; j++) {
                if (option.attr.attrList[j].id == option._var1[i][0]) {
                    option.attr.attrList[j].defaultVar = getListFromIdByte(option._var1[i][1], option._var1[i][0], option).join(",");
                }
            }
        }
        for (var i = 0; i < option._var2.length; i++) {
            for (var j = 0; j < option.attr.attrList.length; j++) {
                if (option.attr.attrList[j].id == option._var2[i][0]) {
                    option.attr.attrList[j].defaultTxt = option._var2[i][1];
                }
            }
        }
		//
        option._var1 = [];
        option._var2 = [];
        //标记全局变量：当前数据设为完整，可以继续渲染
        option.noFullData = false;
        //回调重新渲染
        window._classAttrOption.showAttrList();
    }
	//判断当前类目是否在SPU白名单中
	function checkClassID(){
		for(var i=0; i<option._spuList.length; i++){
			if(option.classId==option._spuList[i]){
				return true;
			}
		}
		return false;
	}
	
	/**
	 * 处理SPU信息的函数
	 * 取回的SPU信息应该全部是非关键属性，而不应该有关键属性在里面。
	 */
	function findSpuByKeyAttrSuccess(config){
		//error 0:得到正确值; 1:无SPU信息; >1:错误中断。
		var e = config.errorCode; 
		var option=window._classAttrOption;
		option.spuIdHandel.val( e==0 ? config.productId||"0" : "0");//填入spuid。productId
		if(e==0){
			var spuList = listing(); 
			//定义for要用到的临时变量(i,j)、关键属性列表
			var i ,j ,item, _kItemList=[];
			for(i in spuList){
				var container = $$("#f_"+i);//区块容器(DIV)
				var st = container.attr("stype");
				//如果当前属性是关键属性，或者是关键属性的父属性，过滤掉。
				item = container.find("[property]");
				if(item.length>0 && (parseInt(item.attr("property")) & 0X80000 )){
					_kItemList.push(item);
					continue;
				}
				switch(st){//根据dom参数判断数据类型（没有property属性）
					case "select" : 
						//因为是单选。正确的SPU信息只会让这个for执行一次或两次。执行两次是因为包含“其他**”值
						var x, opts = spuList[i].options;
						//如果“其他**” 被选中，并且缺少对应值，那么认为是一项无效数据，丢弃。
						for(x in opts){
							var s = container.find("#s_"+i);//找到select
							//1）如果拿到的值非法(不在select的option列表里面)，那么就丢掉(非法数据无法通过value来赋值)
							//var isErrorData = s.val(x).val()=="";
							//2）如果含有“其他**”，但是并没对应的值，将该项数据丢弃，不影响操作。
							// if(opts[x].indexOf("其他")>=0 && s.find("option[value=" + x + "]").length>0){
							//	todo...
							// }
							//s.attr("disabled", isErrorData ? false : true );
							var option_dom = s.find("option[value="+ x +"]");
							//if(opts[x].indexOf("其他")>=0 || option_dom.length==0 || option_dom.html().indexOf("其他")>=0){
							if(option_dom.length==0 || option_dom.html().indexOf("其他")>=0){
								s.attr("disabled", false);
								break; // break the for(x in opts) loop.
							}else{
								s.attr("disabled", s.val(x).val()!=="");
							}
						}
						break;// break for switch(st).
					case "checkbox":
						////如果多选项已经有值的话，就不再给默认值了【meeliao时期规则，暂时废除】
//						//if(container.find(":checkbox:checked").length>0){
//						//	continue;//return;
//						//}else{
//						//如果没有选中的复选框，那么将SPU中的选项值变成可选，其余disable。
//							//container.find(":checkbox").attr("disabled", true);
//							var jqStr = [], opts = spuList[i].options;
//							var _other = "", _hasOther = false; //为了“其他”项准备数据
//							for(var x in opts){
//								//判断单选项下拉框里面的“其他”
//								if(x==0){
//									_other = opts[x];
//									continue;
//								}else{
//									jqStr.push("#r_"+i+"_"+x);
//									if(opts[x]=="其他"){
//										_hasOther = true;
//										//continue;
//									}//else{
//									if($$("#r_"+i+"_"+x).attr("stock")>0){
//										option.onStockChange($$("#r_"+i+"_"+x));
//									}
//									//}
//								}
//							} 
//							if(_hasOther && _other){
//								$$("#c_" + i).val(_other).attr("disabled", true);
//								$$("#i_" + i).show();//显示“其他”的内容 
//							}
//							container.find(jqStr.join(",")).attr("checked", true);
//						//}
//						break;
						//【★: 20100412讨论组意见：回到原始需求，SPU多选项不做处理】
						if(container.find(":checkbox:checked").length>0){
							continue;//用户已经有选择，不拿SPU数据做任何操作
						}else{
							var jqStr = [], opts = spuList[i].options;
							for(var x in opts){
								if("其他"!==opts[x]){
									jqStr.push("#r_"+i+"_"+x);//维护一个jq格式的元素ID串
									if($$("#r_"+i+"_"+x).attr("stock")>0){
										option.onStockChange($$("#r_"+i+"_"+x));//库存属性打上标
									}
								}
							}
							container.find(jqStr.join(",")).attr("checked", true);//将SPU数据选上
						}
					case "txt":
					//如果是文本属性则直接赋值, 这个for也只会执行1次，道理同上面的select。
						var _opts = spuList[i].options;
						for(var x in _opts){
							container.find("#x_"+i).val(_opts[x]).attr("disabled", true);
						}
						break;
				}
				
			}
			//找到关键属性的父属性，也让他可选
			for(var i=0; i<_kItemList.length;i++){
				$$("select[attrid="+_kItemList[i].attr("parentid")+"]").attr("disabled", false);
			}
		}else{
			return false;
		}
		//整理SPU信息，得到一个合理的数据结构。方便后续调用：
		// e.g: res = { "12230":{ "name":"颜色", 	"options":{"4":"红色","7":"绿色"} },  "2":{name:"网络类型", options:{"5":"3G"} },
		//					"2316":{  "name":"尺寸色",  "options":{"1":"超大","3":"中","4":"小"} }  } 
		function listing(){
			var i,
				al = config.attrList,
				len = al.length;
			var res = {};
			for(i=0;i<len; i++){
				var item = al[i];
				if(item.attrID=="2089"){continue;}//对于商品成色做个特殊处理
				var _r = res[item.attrID];
				if(!_r){
					_r = {};
					_r.name = item.attrName;
					_r.options = {};
					_r.options[item.attrOptionID] = item.attrOptionValue;
					res[item.attrID] = _r;
				}else{
					//注意ID是1的情况
					if(!_r.options[item.attrOptionID] || _r.options[item.attrOptionID]=="1"){
						_r.options[item.attrOptionID] = item.attrOptionValue;
					}
				}
			}
			return res;
		}
	}
};

function $getColorFlash(opt){
    var option={
        maxXp:30000, //成长值上限
        userXp:0,    //当前成长值
        state:0        //彩钻状态，1为激活，0为灰态
    },
	flash ='<object width="490" height="50" data="http://static.paipaiimg.com/flash/release/buyervip/main.swf?t=201003101&maxXp={#maxXp#}&userXp={#userXp#}&invalid={#invalid#}" type="application/x-shockwave-flash"><param value="http://static.paipaiimg.com/flash/release/buyervip/main.swf?t=201003101&maxXp={#maxXp#}&userXp={#userXp#}&invalid={#invalid#}" name="movie"><param name="quality" value="high"><param value="transparent" name="wmode"><param value="maxXp={#maxXp#}&userXp={#userXp#}&invalid={#invalid#}" name="flashvars"></object>';
	for(var i in opt){
        option[i]=opt[i];
    } 
	return flash.replace(/{#maxXp#}/g,option.maxXp).replace(/{#userXp#}/g,option.userXp).replace(/{#invalid#}/g,option.state);
};

function $initCommSoldOut(){
	//绑定商品状态更新逻辑,找到所有需要拉最新商品状态的商品，并进行更新，支持异步加载进来的数据
	window._PP_CommSoldOut_data={
		list:[]
	};
	//加载商品状态的回调
	window.itemCommInfoCallBack=function(data){
		for(var i=0,len=data.length;i<len;i++){
			if(data[i].dwState==6){  
				var o=$$("[newStyle][commId='"+data[i].strItemId+"']");
				o.addClass(o.attr("newStyle"));	
			}
		}
	} 
	findAllComms();
	setInterval(function(){findAllComms()},200);
	function findAllComms(){
		var o=window._PP_CommSoldOut_data;
		$$("[soldOut][commId]").each(function(){
			var t=$$(this);
			var id=t.attr("commId");
			var css=t.attr("soldOut");
			if(id && css){
				o.list.push(id);
				t.attr("newStyle",css);
			}
			t.removeAttr("soldOut")
		});
		for(var i=0,j=o.list.length,list=[];i<j;i++){
			list.push(o.list[i]);
			if(list.length==10 || (j-1)==i){
				//加载商品列表的状态数据，期待回调itemCommInfoCallBack
				$loadScript('http://my.paipai.com/cgi-bin/item_view/item_list?sItemid='+list.join("|"))
				list=[];
			}
		}
		o.list=[];
	}
};

function $cataDrawList(o){
	/*
	//类目下拉选择菜单
	//20100720 create by homerhuang 
	*/
	var cataDrawItem = {
		drawItem:"drawCata",
		drawListItem:"drawCataList",
		formName:"searchForm",
		drawType:"0",		//下拉导航类型
		logValue:"1001",
		showType:"1",		//下拉菜单展示样式
		curSort:"",
		arrFirstSort:[],
		arrShopSort:[],
		arrMapSort:{},
		template:'<li class="{#cssName#}"><a attr="{#clsId#}" title="{#clsName#}" href="#h" lg="{#sLog#}" pos="{#sPos#}">{#clsName#}</a></li>',		//模版
		timerHandle:null,
		timeDelay:300,
		showClassList:function(){
			var tempArr = [[0,"所有分类"]],cataSelect = document.forms[cataDrawObj["formName"]].elements["sClassid"],tempSort;
			var cataItem = $id(cataDrawObj["drawListItem"]).getElementsByTagName("ul")[0],tempStr,tempNodes,tempHtml = "",len = 0,clsGroup = false;
			if (typeof(cataDrawObj["curSort"]) == "object"){
				tempSort = tempArr.concat(cataDrawObj["curSort"]);
				cataDrawObj["showType"] = 1;
			}else{
				tempSort = (cataDrawObj["drawType"] == 0)?cataDrawObj["arrFirstSort"]:cataDrawObj["arrShopSort"]
				cataDrawObj["showType"] = 2;
			}
			for (var n = 0; n < tempSort.length; n++){
				if (typeof(tempSort[n]) == "object"){
					tempStr = cataDrawObj["template"];
					if (cataDrawObj["showType"] == "1"){
						if (!clsGroup){
							tempStr = tempStr.replace("{#cssName#}","");
						}else{
							tempStr = tempStr.replace("{#cssName#}","c_bg");
						}
					}else{
						tempStr = tempStr.replace("{#cssName#}","s_" + len);
						len++;
					}
					tempStr = tempStr.replace("{#clsId#}",tempSort[n][0]);
					tempStr = tempStr.replace("{#sLog#}",cataDrawObj["logValue"]);
					tempStr = tempStr.replace("{#sPos#}",n);
					tempStr = tempStr.replace(/\{\#clsName\#\}/gi,tempSort[n][1]);
					tempHtml += tempStr;
				}else{
					if (tempSort[n] == 1){
						clsGroup = true;
					}else{
						clsGroup = false;
					}
				}
			}
			if (cataDrawObj["showType"] != "1"){cataItem.className = "all";}
			cataItem.innerHTML = tempHtml;
			tempNodes = cataItem.getElementsByTagName("a");
			for (var i = 0; i < tempNodes.length; i++){
				tempNodes[i].onclick = cataDrawObj.callFunction;
			}
		},
		callFunction:function(e){
			var event = e || window.event,srcEls;
			srcEls = event.target || event.srcElement;
			var cataSelect = document.forms[cataDrawObj["formName"]].elements["sClassid"],sfSelect = document.forms[cataDrawObj["formName"]].elements["sf"],sId = this.getAttribute("attr");
			cataSelect.value = sId;
			sfSelect.value = "77";
			if (cataDrawObj["drawType"] == 1){
				document.forms[cataDrawObj["formName"]].elements["shoptype"].value = cataDrawObj["arrMapSort"][sId]?cataDrawObj["arrMapSort"][sId]:0;
			}
			//$id(cataDrawObj["drawItem"]).innerHTML = this.getAttribute("title") + "<span></span>";
			$id(cataDrawObj["drawListItem"]).className = "h";
			$submitToSearch(cataDrawObj["formName"]);
		}
	};
	for (var n in o){cataDrawItem[n] = o[n]}
	window.cataDrawObj = cataDrawItem;
	//事件绑定
	$id(cataDrawObj["drawListItem"]).onmouseout = function(){
		$id(cataDrawObj["drawItem"]).setAttribute("attr",1);
		$id(cataDrawObj["drawItem"]).className = "";
		this.className = "h";
		var tempNode = $id(cataDrawObj["drawItem"]).getElementsByTagName("span")[0];
		tempNode.className = "";
	};
	$id(cataDrawObj["drawItem"]).onmouseout = function(){
		if (cataDrawObj["timerHandle"]){clearTimeout(cataDrawObj["timerHandle"]);}
		$id(cataDrawObj["drawListItem"]).className = "h";
		this.className = "";
		var tempNode = $id(cataDrawObj["drawItem"]).getElementsByTagName("span")[0];
		tempNode.className = "";
	};
	$id(cataDrawObj["drawItem"]).onmouseover = function(){
		if (this.getAttribute("attr") && this.getAttribute("attr") == 1){
			$id(cataDrawObj["drawListItem"]).className = "";
			this.className = "all";
			var tempNode = $id(cataDrawObj["drawItem"]).getElementsByTagName("span")[0];
			tempNode.className = "ex";
			this.setAttribute("attr",0);
		}else{
			cataDrawObj["timerHandle"] = setTimeout(function(){
				$id(cataDrawObj["drawListItem"]).className = "";
				$id(cataDrawObj["drawItem"]).className = "all";
				var tempNode = $id(cataDrawObj["drawItem"]).getElementsByTagName("span")[0];
				tempNode.className = "ex";
			},cataDrawObj["timeDelay"]);
		}
	};
	$id(cataDrawObj["drawListItem"]).onmouseover = function(){
		this.className = "";
		$id(cataDrawObj["drawItem"]).className = "all";
		var tempNode = $id(cataDrawObj["drawItem"]).getElementsByTagName("span")[0];
		tempNode.className = "ex";
	};
	cataDrawObj.showClassList();
	$id(cataDrawObj["drawListItem"]).onmousewheel = function(){return false};
};

function $getColorIcon(level,state,obj){
	//获取彩钻vip用户等级图标
	// level  彩钻等级 state  彩钻状态 obj未扩展参数目前支持isSmall属性
	if(!obj){obj={};}
	if(obj.isSmall){//小图标
		return 	level>0 ? ('<img src="http://static.paipaiimg.com/module/icon/credit/'+ (state*1==0?'colors_dis_lv':'colors_lv') + level+'.png" alt="" />'):'';
	}else {//默认为大图标
		return level>0 ? ('<img src="http://static.paipaiimg.com/module/icon/credit/'+ (state*1==0?'color_dis_lv':'color_lv') + level+'.gif" alt="" />'):'';
	}
}

/**
 * @desc: 显示未付款订单列表
 * @param: obj. 参数列表；
 *         <b>currDeals</b>: Array.当前带入的订单列表序列，格式为  ["dealID1","dealID2","dealID3"]
 */
function $showDealList(obj){
	obj = obj||{}; //如果obj为undefined，那么设置为空对象 
	//拉取订单列表，唯一的参数callback为回调函数名，期待回调deallistCallback
	$loadScript("http://pay.paipai.com/cgi-bin/query_deal/query?deal_state=1&start=0&size=10&callback=deallistCallback&"+Math.random());
	window.deallistCallback = function showInfo(data){
		var rCode = parseInt(data.retcode);
		if(rCode===0){
			//加载css文件
			$loadCss("http://static.paipaiimg.com/module/show_deal_list.css?"+Math.random());
			var dls = data.dealList,
				dLen = dls.length;
			//拉取的订单列表为空，暂时啥也不做，待确认。
			if(dLen==0){
				return alert("您选中的订单均已付款，无须重复付款");
			}
			var tpl = '<div class="deal_list_box"><div class="txt_description">您还有其它等待付款的订单，您现在可以选中一次性完成付款：</div><div class="pro_list"><span tag="textMeasure" style="display:none;">M</span><ul><li class="t_head" ><div class="pro_name"><input name="" type="checkbox" value="" />全选</div><div class="pro_price">应付小计</div></li>【#deallist#】</ul></div><div class="totall_price">应付总计：<span class="color_orange" tag="total"></span>元</div><input type="hidden" tag="s"></input><button class="btn_hit_b">继续去付款</button><a name="closeWindow" href="#">关闭窗口</a></div>';
			var deallist = [];
			for(var i=0;i<dLen;i++){
				var dl = dls[i],
					dlts = dl.tradeList,
					dlid = dl.dealId,
					dName = dlts[0].itemName;
				//判断循环的当前的订单id是否在参数数组中，如果在参数数组中，那么对应的checkbox将disabled，并且checked。
				var isCurrDeal = function(dlArr){
					dlArr = dlArr||[];
					//88881336-20100726-5044183   88881332-20100201-5020183
					for(var i=0, len = dlArr.length; i<len; i++){
						if(dlArr[i]==dlid){
							//性能优化：当在目标数组中找到对应元素后将元素删除（前置条件是目标数组没有其他用途）
							dlArr.splice(i, 1);
							return true;
						}
					}
					return false;
				}(obj.currDeals);
				var	dNameA = '<span tag="ruler" class="ruler"><a tag="context" href="http://pay.paipai.com/cgi-bin/deal_detail/view?deal_id='+ dlid +'" target="_blank" title="'+ dName +'">'+dName+'<span tag="omit"></span></a>'+(dlts.length > 1 ? '<span tag="others" class="others" style="">等商品</span>':'') + '</span>';
				deallist.push('<li><div class="pro_name" tag="infos"><input type="checkbox"'+ (isCurrDeal ? 'checked="checked" disabled="disabled" ':'' )+' v="'+dl.totalPrice+'" s="'+ dl.dealId +'"/>'+dNameA+'</div><div class="pro_price">'+ dl.totalPrice +'</div></li>');
			}
			//显示浮层并拿到浮层内容的jq对象
			var f = $float({
				title:"温馨提示",
				width: 600,
				html: tpl.replace(/【#deallist#】/, deallist.join(""))
			});
			bh = $$(f.boxHandel);
			//如果商品名过长，那么显示省略号.这里设定timer的原因是dom渲染有可能不及时造成计算错误
			setTimeout(function(){
				//这里在dom中存放一个内容为单字节字符的隐藏span，用来测量一个字节在当前dom中的显示宽度，作为后面计算的基数。
				var aByteWidth = bh.find("span[tag=textMeasure]").width();
				bh.find(".pro_list div.pro_name[tag=infos]").each(function(){
					var _this = $$(this),
						span_ruler = _this.find("span[tag=ruler]"),
						a = _this.find("a"),
						span_omit = a.find("span[tag=omit]"),//省略号
						span_others = _this.find("span[tag=others]");
						has_others = span_others.length > 0;//是否有多个子订单
					if(has_others){
						//console.debug(a.width(), span_others.width());
						a.width(a.width()-span_others.width()-5);
					}
					//解决在FF等浏览器下 前面的checkbox和后面的a上下不对齐。
					if(!$isBrowser("ie")){
						a.add(_this.find(":checkbox")).css("verticalAlign", "middle");
					}
					if(a.width()>span_ruler.width()){
						/*
						span_omit.show();//不能完整显示，那么就将省略号显示出来
						//span_ruler.width(span_ruler.width() * (has_others ? 0.8 : 0.9 ));
						console.info(span_ruler.width());
						span_ruler.width(span_ruler.width() -20- (has_others ? span_omit.width() : 0 ));
						console.log(span_ruler.width(), "|"+span_context.text()+"|"+span_context.text().length);
						//var text = span_context.text(),
						var text = span_context.text().replace(/ +/g, " "),
							len = Math.round(span_ruler.width()/aByteWidth);//能存放得下多长的半角字符
						console.debug("|"+$getTextByByteLength(text, len)+"|");
						span_context.text($getTextByByteLength(text, len));
						*/
						a.width(span_ruler.width());
					}
				});
			}, 100);
			//列表元素的鼠标滑过样式切换,最后一行特殊样式
			bh.find(".pro_list li:gt(0)").hover(
				function(){$$(this).addClass("hover");}, 
				function(){$$(this).removeClass("hover");}
			).filter(":last").addClass("t_footer");
			//全选事件
			var select_all = bh.find("li.t_head :checkbox"),
				select_single = bh.find("li :checkbox").not(select_all),
				hidden = bh.find(":hidden[tag=s]"),
				total = bh.find("span[tag=total]");
			//每个订单列表的checkbox单击事件绑定
			select_single.click(function(){refreshState();});
			//“全选”的checkbox单击事件
			select_all.click(function(){
				select_single.filter(":not([disabled])").attr("checked", $$(this).attr("checked"));
				refreshState();
			});
			//去付款按钮
			bh.find("button.btn_hit_b").click(function(){
				f.close();
				window.open("http://pay.paipai.com/cgi-bin/trade_account/TenpayFast?"+hidden.val()+ "&t=" + new Date().valueOf());
			});
			//关闭窗口
			bh.find("a[name=closeWindow]").click(function(){f.close();return false;});
			//刷新状态
			function refreshState(){
				//如果都没有一个选中，那么将全选的按钮置为不可选
				if(select_single.filter(":checked").length==0){
					select_all.attr("checked", false);
				}
				var totalCount = 0, ciString = [];//实时计算总价和更新提交串
				select_single.filter(":checked").each(function(){
					totalCount += parseFloat($$(this).attr("v"));
					ciString.push("dealCodeList="+$$(this).attr("s"));
				});
				//刷新总价
				total.html(totalCount.toFixed(2));
				//刷新hidden隐藏值
				hidden.val(ciString.join("&"));
			}
			refreshState();
		}else{//出错了，执行什么处理呢？
			return false;//...todo
		}
	}
}

function $changeType(o){
	/*
	//顶部搜索导航商品店铺切换Tab
	//20100720 create by homerhuang 
	*/
	var searchTypeItem = {
		tabName:"searchTab",		//切换按钮父节点
		tabItem:"p",				//切换按钮标签节点
		typeInpueName:"searchType",	//切换时保存对应搜索导航的input
		//点击是的切换函数
		changeFun:function(){		
			var t = this.getAttribute("attr");
			for (var n = 0; n < typeNodes.length; n++){
				if (n == t){
					typeNodes[n].className = "now";
					$id(searchTypeObj["typeInpueName"]).value = t;
				}else{
					typeNodes[n].className = "";
				}
			}
			searchTypeObj["evenFunc"](t);
		},
		//切换Tab的同时是否执行其他操作逻辑
		evenFunc:function(){
			var t = arguments[0];
			if (window["smartDrawObj"]){
				if (t == "0"){
					smartDrawObj["isAvai"] = true;
				}else{
					smartDrawObj["isAvai"] = false;
				}
			}
			if (window["cataDrawObj"]){
				cataDrawObj["drawType"] = t;
				cataDrawObj["showClassList"]();
			}
		}
	};
	for (var n in o){searchTypeItem[n] = o[n]}
	window.searchTypeObj = searchTypeItem;
	var typeTab = $id(searchTypeObj["tabName"]),typeItem;
	var typeNodes = typeTab.getElementsByTagName(searchTypeObj["tabItem"]);
	for (var i = 0; i < typeNodes.length; i++){
		typeNodes[i].setAttribute("attr",i);
		typeNodes[i].onclick = searchTypeObj["changeFun"];
	}
};

function $smartDrawWidget(o){
	/*
	//搜索相关词smartDraw
	//20100720 create by homerhuang 
	*/
	var smartDrawItem = {
		isAvai:false,		//是否启用(默认不启用)
		sourceUrl:"http://search.paipai.com/cgi-bin/isuggest_v6",
		domTag:"smartDrawCallBack",		//接口回调函数名称
		formName:"searchForm",			//下拉展示的输入框提交表单名称
		smartBrawItem:"KeyWord",		//下拉展示的输入框对象
		drawListItem:"searchDrawList",	//下拉展示Dom容器元素
		markListItem:"maskSearchDrawList",
		nowLink:-1,			//当前展示的下拉项节点的数组下标
		curKeyWord:"",		//当前输入框的关键字
		mutuKey:[],		//接口回调后数据保存在此数组变量
		maxNum:0,			//当前展示下拉项节点长度
		pTag:"20058.1.1",
		template:'<li attr="{#idx#}" onmouseover="smartDrawObj.setNowLink(this)"><a href="http://search.paipai.com/cgi-bin/comm_search?keywordtype=goods&KeyWord={#keyWord#}&ADTAG=40.1.{#idx#}" lg="1005" pos="{#sPos#}" onclick="javascript:smartDrawObj.nowLink = -1;"><span>{#keyWord#}</span><em>约{#keyNum#}结果</em></a></li>{###}<li attr="{#idx#}" class="photo" onmouseover="smartDrawObj.setNowLink(this)"><a href="http://auction1.3c.paipai.com/spu.xhtml?pd={#commId#}&PTAG={#pTag#}" target="_blank" lg="1006" pos="{#sPos#}" onclick="javascript:smartDrawObj.nowLink = -1;"><img src="http://img5.paipaiimg.com/{#commPic#}" width="40" height="40" /><span>{#commName#}</span></a></li>{###}<li attr="{#idx#}" onmouseover="smartDrawObj.setNowLink(this)"><a href="http://search.paipai.com/cgi-bin/comm_search?keywordtype=goods&KeyWord={#keyWord#}&sClassid={#sclass#}&ADTAG=40.1.{#idx#}" lg="1008" pos="{#sPos#}" onclick="javascript:smartDrawObj.nowLink = -1;"><span>{#showWord#}</span></a></li>',		//模版
		//初始化下拉选框
		initDrawItem:function(){
			var objFrm = document.forms[this["formName"]],drawItem;
			$id("headSubmitBtn").onclick =function(){
				if (smartDrawObj["nowLink"] > -1){
					if (smartDrawObj["mutuKey"][smartDrawObj["nowLink"]].length == 3 && isNaN(smartDrawObj["mutuKey"][smartDrawObj["nowLink"]][1])){
						smartDrawObj["submitSPU"]();
					}else{
						smartDrawObj["submitSearch"](smartDrawObj["formName"]);
					}
				}else{
					smartDrawObj["submitSearch"](smartDrawObj["formName"]);
				}
			}
			if (objFrm){
				drawItem = objFrm.elements[this["smartBrawItem"]];
				if (drawItem){
					drawItem.onkeyup = this["keyEvent"];
					drawItem.onfocus = function(){
						this.style.color = "#000000";
						if (this.value == '想找什么？输入商品名称试试'){
							this.value = '';
						}
					};
				}
			}
			if ($isBrowser("ie")){
				document.attachEvent("onclick",smartDrawObj["hidesmartDraw"]);
			}else{
				document.addEventListener("click",smartDrawObj["hidesmartDraw"],true);
			}
		},
		//设置当前选中项(参数为当前选中节点)
		setNowLink:function(dom){
			try{
				if (dom && dom.getAttribute("attr") != null){
					smartDrawObj["nowLink"] = dom.getAttribute("attr");
					var objListItem = $id(smartDrawObj["drawListItem"]).getElementsByTagName("li");
					for (var i = 0; i < objListItem.length; i++){
						if (objListItem[i].className.indexOf("autoResultLink") > -1){objListItem[i].className = objListItem[i].className.replace(" autoResultLink","");}
					}
					dom.className += " autoResultLink";
				}
			}catch (e){
			}
		},
		//隐藏下拉展示
		hidesmartDraw:function(){
			if (drawListItem && drawListItem.style.display == "block"){
				drawListItem.style.display="none";
				if (drawListMark){drawListMark.style.display="none";}
				var e = arguments[0],srcEls;
				if ($isBrowser("firefox") && e){
					srcEls = e.target;
					if (srcEls.type.toLowerCase() != "submit"){smartDrawObj["nowLink"] = -1;}
				}
			}
		},
		//键盘响应事件
		keyEvent:function(e){
			var keyCode=$getKeyCode(e);
			var drawListItem = $id(smartDrawObj["drawListItem"]);
			if (smartDrawObj["isAvai"]){
				if (this.value == ""){
					smartDrawObj.hidesmartDraw();
				}else{
					if (keyCode == 13){
						smartDrawObj["chkSearchKey"]();
					}else if (keyCode == 38 || keyCode == 40){
						if (smartDrawObj["maxNum"] > 0 && drawListItem.style.display == "block"){
							if(keyCode == 38){
								smartDrawObj["nowLink"]--;
							}else if(keyCode == 40){
								smartDrawObj["nowLink"]++;
							}
							if(smartDrawObj["nowLink"] < 0){
								smartDrawObj["nowLink"] = smartDrawObj["maxNum"] - 1;
							}else if(smartDrawObj["nowLink"] > (smartDrawObj["maxNum"] - 1)){
								smartDrawObj["nowLink"] = 0;
							}
							var objListItem = drawListItem.getElementsByTagName("li");
							for (var i = 0; i < objListItem.length; i++){
								if (objListItem[i].className.indexOf("autoResultLink") > -1){objListItem[i].className = objListItem[i].className.replace(" autoResultLink","");}
							}
							objListItem[smartDrawObj["nowLink"]].className += " autoResultLink";
							if (!(smartDrawObj["mutuKey"][smartDrawObj["nowLink"]].length == 3 && isNaN(smartDrawObj["mutuKey"][smartDrawObj["nowLink"]][1]))){
								drawItem.value = smartDrawObj["curKeyWord"] = smartDrawObj["mutuKey"][smartDrawObj["nowLink"]][0];
								if (smartDrawObj["mutuKey"][smartDrawObj["nowLink"]].length == 3 && objFrm.elements["sClassid"]){
									objFrm.elements["sClassid"].value = smartDrawObj["mutuKey"][smartDrawObj["nowLink"]][1];
								}else{
									objFrm.elements["sClassid"].value = "";
								}
							}
						}
					}else{
						if (this.value != smartDrawObj["curKeyWord"]){
							$loadScript(smartDrawObj["sourceUrl"] + "?KeyWord=" + this.value + "&dTag=" + smartDrawObj["domTag"] + "&t=" + (new Date).getTime());
							smartDrawObj["curKeyWord"] = this.value;
						}
					}
				}
			}else{
				smartDrawObj.hidesmartDraw();
				if (keyCode == 13){smartDrawObj["submitSearch"](smartDrawObj["formName"]);}
			}
			return false;
		},
		//回车是检查操作类型(可能是输入法回车、提交关键词、提交spu推荐)
		chkSearchKey:function(){
			//var frm = document.forms[smartDrawObj["formName"]];
			if (smartDrawObj["nowLink"] != -1){
				if (smartDrawObj["mutuKey"][smartDrawObj["nowLink"]].length == 3 && isNaN(smartDrawObj["mutuKey"][smartDrawObj["nowLink"]][1])){
					smartDrawObj["submitSPU"]();
				}else{
					smartDrawObj["nowLink"] = -1;
					smartDrawObj["submitSearch"](smartDrawObj["formName"]);
				}
			}else{
				if (drawItem.value != smartDrawObj["curKeyWord"]){
					$loadScript(smartDrawObj["sourceUrl"] + "?KeyWord=" +drawItem.value + "&dTag=" + smartDrawObj["domTag"] + "&t=" + (new Date).getTime());
					smartDrawObj["curKeyWord"] = drawItem.value;
				}else{
					smartDrawObj["nowLink"] = -1;
					smartDrawObj["submitSearch"](smartDrawObj["formName"]);
				}
			}
		},
		//提交spu推荐
		submitSPU:function(){
			var spuFrm = document.forms["spuSearchFrom"];
			if (spuFrm){
				spuFrm.elements["pd"].value = smartDrawObj["mutuKey"][smartDrawObj["nowLink"]][2];
			}else{
				spuFrm = document.createElement("form");
				spuFrm.setAttribute("target","_blank");
				spuFrm.setAttribute("action","http://auction1.3c.paipai.com/spu.xhtml");
				spuFrm.setAttribute("method","get");
				var tempNode = document.createElement("input");
				tempNode.setAttribute("type","hidden");
				tempNode.setAttribute("name","PTAG");
				tempNode.value = "20058.1.1";
				spuFrm.appendChild(tempNode);
				var tempNode = document.createElement("input");
				tempNode.setAttribute("type","hidden");
				tempNode.setAttribute("name","pd");
				tempNode.value = smartDrawObj["mutuKey"][smartDrawObj["nowLink"]][2];
				spuFrm.appendChild(tempNode);
				document.body.appendChild(spuFrm);
			}
			smartDrawObj["nowLink"] = -1;
			spuFrm.submit();
		},
		//提交当前搜索词
		submitSearch:function(){
			var frm = arguments[0],event = window.event,srcEls;
			if (typeof(frm) == "object" || !frm){
				if ($isBrowser("firefox")){event = frm}
				srcEls = event.target || event.srcElement;
				frm = srcEls.getAttribute("frm");
			}
			var objFrm = document.forms[frm];
			//如果存在表单，则进行提交逻辑判断
			if (objFrm){
				var t = objFrm.elements["searchType"].value,clsObj = objFrm.elements["sClassid"];
				var clsId = (!clsObj || clsObj.value == "")?0:clsObj.value;
				if(objFrm.elements[smartDrawObj["smartBrawItem"]].value == '想找什么？输入商品名称试试'){
					objFrm.elements[smartDrawObj["smartBrawItem"]].value = '';
				}
				
				if(objFrm.elements[smartDrawObj["smartBrawItem"]].value == "" && clsId == "0"){
					window.location = "http://search.paipai.com/";
					return false;
				}else{
					if (t && t == "1"){
						objFrm.action="http://shopsearch.paipai.com/SearchShopAction.xhtml";
					}else{
						objFrm.action="http://search1.paipai.com/cgi-bin/comm_search1";
					}
					objFrm.submit();
					return false;
				}
			}
		},
		//相关词回调数据接口函数
		smartDrawCallBack:function(o){
			try{
				if (o["list"] && o["list"].length > 0){
					smartDrawObj["mutuKey"] = [];
					smartDrawObj["maxNum"] = 0;
					var strAuto=['<ul>',[],[],[],'</ul>'],mutuCommStr = smartDrawObj["template"].split("{###}"),tempStr,i,m = 1;
					if (o["spu"] && o["spu"].length > 0){
						for (i = 0; i < o["spu"].length; i++,m++){
							tempStr = mutuCommStr[1].replace(/\{\#idx\#\}/gi,i);
							tempStr = tempStr.replace("{#commId#}",o["spu"][i][2]);
							tempStr = tempStr.replace("{#commName#}",o["spu"][i][0]);
							tempStr = tempStr.replace("{#commPic#}",o["spu"][i][1]);
							tempStr = tempStr.replace("{#pTag#}",smartDrawObj["pTag"]);
							tempStr = tempStr.replace("{#sPos#}",m);
							strAuto[1].push(tempStr);
							smartDrawObj["maxNum"]++;
						}
						smartDrawObj["mutuKey"] = smartDrawObj["mutuKey"].concat(o["spu"]);
					}
					if (o["hotclass"] && o["hotclass"].length > 1){
						for (i = 0,m = 1; i < o["hotclass"].length; i++,m++){
							o["hotclass"][i][0] = decodeURI(o["hotclass"][i][0]);
							tempStr = mutuCommStr[2].replace(/\{\#idx\#\}/gi,smartDrawObj["maxNum"]);
							tempStr = tempStr.replace("{#keyWord#}",o["hotclass"][i][0]);
							if (o["hotclass"][i][1] == 0){
								tempStr = tempStr.replace("{#showWord#}",o["hotclass"][i][0]);
							}else{
								tempStr = tempStr.replace("{#showWord#}","&nbsp; 在<strong>" + o["hotclass"][i][2] + "</strong>中搜索");
							}
							tempStr = tempStr.replace("{#sclass#}",o["hotclass"][i][1]);
							tempStr = tempStr.replace("{#sPos#}",m);
							strAuto[2].push(tempStr);
							smartDrawObj["maxNum"]++;
						}
						smartDrawObj["mutuKey"] = smartDrawObj["mutuKey"].concat(o["hotclass"]);
					}
					if(o["list"].length > 0){
						for(i=0,m = 1;i<o["list"].length;i++,m++){
							tempStr = mutuCommStr[0].replace(/\{\#idx\#\}/gi,smartDrawObj["maxNum"]);
							tempStr = tempStr.replace(/\{\#keyWord\#\}/gi,o["list"][i][0]);
							tempStr = tempStr.replace("{#keyNum#}",o["list"][i][1]);
							tempStr = tempStr.replace("{#sPos#}",m);
							strAuto[3].push(tempStr);
							smartDrawObj["maxNum"]++;
						};
						smartDrawObj["mutuKey"] = smartDrawObj["mutuKey"].concat(o["list"]);
					}
					strAuto[1] = strAuto[1].join("");
					strAuto[2] = strAuto[2].join("");
					strAuto[3] = strAuto[3].join("");
					strAuto = strAuto.join("");
					drawListItem.innerHTML = strAuto;
					if (drawListItem.style.display != "block"){
						drawListItem.style.display = "block";
						if(drawListMark){drawListMark.style.display = "block";}
					}
					smartDrawObj["nowLink"]=-1;
				}else{
					smartDrawObj["nowLink"]=-1;
					smartDrawObj.hidesmartDraw();
				}
			}catch(e){
			}
		}
	};
	for (var n in o){smartDrawItem[n] = o[n]}
	window.smartDrawObj = smartDrawItem;
	var objFrm = document.forms[smartDrawObj["formName"]],drawListItem = $id(smartDrawObj["drawListItem"]),drawListMark = $id(smartDrawObj["markListItem"]);
	var drawItem = objFrm.elements[smartDrawObj["smartBrawItem"]];
	window._PP_head_callback = function(o){
		if (smartDrawObj[o["dTag"]]){
			smartDrawObj[o["dTag"]](o);
		}else if (window[o["dTag"]]){
			window[o["dTag"]](o);
		}
	}
	smartDrawObj["initDrawItem"]();
};

function $showRelativeComms(obj){
	var configs = {
		url: "",//必须。访问的cgi
		ptagIndex:"",
		tpl :'<li><div class="img_wp"><a href="http://auction1.paipai.com/{#itemid#}?PTAG={#ptag#}" target="_blank"><img src="{#imageUrl#}" /></a></div><div class="name"><a href="http://auction1.paipai.com/{#itemid#}?PTAG={#ptag#}" target="_blank">{#title#}</a></div><div class="price">拍拍价：<span class="num">{#price#}</span>元</div></li>',
		//hideIfNoneData: true,//可选。遇到返回空数据时的处理办法。
		domArea: "#ad1_1", //容器
		domContent: "#mutuGoodsDiv", //主题数据区
		itemLength: 5, //默认选择前5个元素
		emptyDataAct: function(){
			$$(this.domArea).hide();
			return true;
		}
	};
	for(var x in obj){
		configs[x] = obj[x]||configs[x];
	}
	//对应5个页面： [关联推荐-购物车页面, 关联推荐-付款成功页面, 关联推荐-确认收货成功页,关联推荐-评价成功页, 关联推荐-收藏夹页面]
	var currPtag = ["31409", "31410", "31411", "31412", "31413"][parseInt(configs.ptagIndex)-1];
	
	$loadScript(configs.url + "&callback=showRelatedItems&t="+new Date().valueOf());
	window.showRelatedItems = function(obj){
		if(obj.retcode!=0){
			return false;	
		}else{
			var ls = obj.itemlist.slice(0, configs.itemLength);
			if(ls.length>0){
				$$(configs.domContent).html($$.map(ls, function(i, idx){//只取前5个数据
					var ptag = currPtag+".1."+(idx+1);
					var hc = configs.tpl.replace(/{#imageUrl#}/g, i.logourl).replace(/{#itemid#}/g, i.itemid).replace(/{#title#}/g, i.itemtitle).replace(/{#price#}/g, i.price).replace(/{#ptag#}/g, ptag);
					/* 图标输出暂被取消
					hc = hc.replace(/{#icon_reallyicon#}/,(i.property&0x2000000)?'<a style="margin: 0px;" title="已加入诚信保证计划，支持“正品 假一赔三”，如在收货后14天内发现该商品不是正品，且与卖家协商未果，买家可申请赔付。" target="正品 假一赔三" href="http://www.paipai.com/trust/chengbao.shtml?tab=4&amp;PTAG=30072.4.8#1"><span style="margin: 0px 10px 0px 0px; background: transparent url(http://static.paipaiimg.com/assets/common/ppicons.png) no-repeat scroll -40px -345px; display: inline-block; outline-style: none; outline-width: medium; font-size: 0px; vertical-align: middle; cursor: pointer; width: 16px; height: 16px;overflow:hidden;"></span></a>':'');
					hc = hc.replace(/{#icon_sevenship#}/,((i.property&0x80000)?'<a style="margin: 0px;" title="已加入诚信保证计划，支持“7天包退”，如对该商品不满意可在收货后7天内无理由退换货。" target="7天包退" href="http://www.paipai.com/trust/chengbao.shtml?tab=2&amp;PTAG=30072.4.6#1"><span style="margin: 0px 10px 0px 0px; background: transparent url(http://static.paipaiimg.com/assets/common/ppicons.png) no-repeat scroll -20px -345px; display: inline-block;  outline-style: none; outline-width: medium; font-size: 0px; vertical-align: middle; cursor: pointer; width: 16px; height: 16px;overflow:hidden;"></span></a>':''));
					hc = hc.replace(/{#icon_repayship#}/,((i.property&0x40000)?'<a style="margin: 0px;" title="已加入诚信保证计划，支持“先行赔付”，该商品如14天内出现质量问题，且与卖家协商未果，拍拍网将会先行赔付。" target="先行赔付" href="http://www.paipai.com/trust/chengbao.shtml?PTAG=30072.4.5#1"><span style="margin: 0px 10px 0px 0px; background: transparent url(http://static.paipaiimg.com/assets/common/ppicons.png) no-repeat scroll 0px -345px; display: inline-block; outline-style: none; outline-width: medium; font-size: 0px; vertical-align: middle; cursor: pointer; width: 16px; height: 16px;overflow:hidden;"></span></a>':''));
					hc = hc.replace(/{#icon_rapidship#}/,((i.property&0x800000)?'<a style="margin: 0px;" title="已加入诚信保证计划，支持“诚保代充”，该商品如未在承诺时间内代充到买家指定账户，买家可申请赔付。" target="诚保代充" href="http://www.paipai.com/trust/chengbao.shtml?tab=3&amp;PTAG=30072.4.7#1"><span style="margin: 0px 10px 0px 0px; background: transparent url(http://static.paipaiimg.com/assets/common/ppicons.png) no-repeat scroll -60px -345px; display: inline-block; outline-style: none; outline-width: medium; font-size: 0px; vertical-align: middle; cursor: pointer; width: 16px; height: 16px;overflow:hidden;"></span></a>':''));
					*/
					return i ?  hc : "";
				}).join(""));
				$$(configs.domArea).show();
				
			}else{
				configs.emptyDataAct();
			}
		}
	}
}

function $decodeHtml(content){
	if(content == null){
		return "";	
	}
	return $strReplace(content, {
		"&quot;" : '\"',
		"\\'" : '\'',
		"&lt;" : '<',
		"&gt;" : '>',
		"&amp;" : '&',
		"&nbsp" : ' ',
		"&#39;" : '\'',
		"&#09;" : '\t',
		"&#40;" : '(',
     	"&#41;" : ')',
		"&#42;" : '*',
		"&#43;" : '+',
		"&#44;" : ',',
		"&#45;" : '-',
		"&#46;" : '.',
		"&#47;" : '/',
		"&#63;" : '?',
		"&#92;" : '\\',
		"<BR>" : '\n'
	});
};

function $getMp(n){
	var mp = $getCookie("mp");
    return mp?mp.split(":")[n]:"";
}

function $stockManage(obj){
/*		
 商品库存管理组件相关代码
 *作者:kpxu
 */
    var option = {
        input: "", //最终结果值所保存的input dom，初始化的时候也会从这里取值，如果有就初始化出来，表示是修改。
        area: "", //输出内容的区域的dom
        maxLength: 100, //最多可支持的库存条数
        stockSwitch: true, //是否启用库存管理
		canEdit:true,//是否可编辑库存
        onInited: function(obj){
            return true;
        }, //初始化成功事件
        onChange: function(obj){
            return true;
        }, //用户修改了输入
        onSwitch: function(obj){
            return true;
        },
        tp: '{#attrlist#}<div id="stockAttrsFrame0"><input type="checkbox" name="stockSwitch" id="stockSwitch" /><label for="stockSwitch">启用库存配置</label>&nbsp;&nbsp;<a href="http://help.paipai.com/content/help_30122.shtml" target="_blank">查看使用帮助>></a><font color="#FF0000"></font></div><div class="attr-add" id="stockAttrsFrame1">{#attrContent#}{#attrItem#}<dl><dt><img src="http://static.paipaiimg.com/assets/index/close.png" alt="点击删除整行库存属性" style="cursor:pointer;" tag="delAttr" var1="{#attrItem_name#}"  /> {#attrItem_name#}：</dt><dd>{#attrItem_valueItem#}<span>{#attrItem_value#}</span>{#attrItem_valueItem#}</dd></dl>{#attrItem#}{#attrItemEdit#}<dl><dt class="n"><input name="" type="text" value="{#attrItem_name#}" id="{#attrItem_Id#}" maxlength="20" />：</dt><dd>{#attrItem_valueItem#}<input name="" id="{#attrItem_Id#}" type="text" value="{#attrItem_value#}" maxlength="20" style="{#attrItem_style#}"  />{#attrItem_valueItem#}<button type="button" id="showMore_{#attrItem_Id#}" style="{#ItemsShow_style#}" tag="showMore">+</button></dd></dl>{#attrItemEdit#}{#editSave#}<dl><dt></dt><dd><button type="button" id="saveEditStockAttrs">确定</button>　　<a href="#nolink" id="cancelEditStockAttrs">取消</a><em>(属性不超过10个汉字)</em></dd></dl>{#editSave#}{#goedit#}<dl><dt></dt><dd>{#attrCanadd#}<a href="#nolink" id="addStockAttrs">增加一行</a><br />{#attrCanadd#}{#attrCanedit#}<button id="editStockAttrs" type="button">编辑</button>{#attrCanedit#}</dd></dl>{#goedit#}{#attrContent#}</div>{#attrlist#}{#stock#}<div class="item-list" id="stockAttrsFrame2" >{#stockContent#}<div style="text-align:left;">小提示：复制excel表格里的内容，粘贴到下面的列表中试试？</div><div class="item-tip" style="display:none;"><div class="tip-content"></div><span class="tip-dot"></span></div><table><colgroup>{#stock_rows#}<col />{#stock_rows#}<col width="160" /><col width="85" /><col width="85" /><col width="95" /></colgroup><thead><tr>{#stock_names#}<th>{#stock_name#}</th>{#stock_names#}<th>库存编码</th><th><input name="" type="checkbox" id="stockSetPriceSame" stype="price" onclick="setStockVarToSame(this)" /><label>价格</label></th><th><input name="" type="checkbox" id="stockSetNumSame" stype="num" onclick="setStockVarToSame(this)" /><label>数量</label></th><th>备注</th></tr></thead><tbody>{#stock_line#}<tr style="{#stock_css#}" >{#stock_values#}<td class="col0">{#stock_value#}</td>{#stock_values#}<td class="col1" nowrap><input name="" id="{#stock_id#}_0"  maxlength="20" class="inp-01" dtype="string" type="text" value="{#stock_info_0#}" tag="stockInput" onblur="stockInputCheck(this)" onchange="stockInputCheck(this)" onpaste="return stockOnPaste(this)" /></td><td class="col2" nowrap><input name=""      id="{#stock_id#}_1" class="inp-02" type="text" value="{#stock_info_1#}" tag="stockInput" dtype="price" onblur="stockInputCheck(this)" onchange="stockInputCheck(this)" style="ime-mode:disabled" onpaste="return stockOnPaste(this)" maxlength="10" /> 元</td><td class="col3" nowrap><input name="" id="{#stock_id#}_2"  class="inp-03" type="text" maxlength="6" value="{#stock_info_2#}" tag="stockInput" dtype="num" style="ime-mode:disabled" onblur="stockInputCheck(this)" onchange="stockInputCheck(this)" onpaste="return stockOnPaste(this)" /> 件</td><td class="col4" nowrap><input name="" id="{#stock_id#}_3" maxlength="20" dtype="string" value="{#stock_info_3#}" class="inp-04" type="text" tag="stockInput" onblur="stockInputCheck(this)" onchange="stockInputCheck(this)" onpaste="return stockOnPaste(this)" /></td></tr>{#stock_line#}</tbody></table><div><a onclick="var v=window.stockOption.getExcelCopy();" href="#nolink">复制上图表为Excel表格格式</a></div>{#stockContent#}</div>{#stock#}' //模板
    };
    for (var i in obj) {
        option[i] = obj[i];
    }
    //判断必要条件
    if (!option.input || !option.area) {
        return;
    }
    option.decodeStockStr = decodeStockStr;
    option.createDicars = createDicars;
    option.encodeStockStr = encodeStockStr;
    option.drawStock = drawStock;
    option.getStockInfo = getStockInfo;
    option.getAttrsState = getAttrsState;
    option.showAttrsHtml = showAttrsHtml;
    option.showAttrsEditHtml = showAttrsEditHtml;
    option.showAttrsAddHtml = showAttrsAddHtml;
    option.showStockInputHtml = showStockInputHtml;
    option.getNewAttrsObj = getNewAttrsObj;
    option.addAttr = addAttr;
    option.delAttr = delAttr;
    option.check = checkStockInput;
    option.getStockInput = getStockInput;
    option.saveNewVar = saveNewVar;
    option.setStockSwitch = setStockSwitch;
    option.getExcelCopy = getExcelCopy;
    option.countStock = countStock;
    window.stockInputCheck = stockInputCheck;
    window.setStockVarToSame = setStockVarToSame;
    window.stockOnPaste = stockOnPaste;
    //构造库存数据对象，不管有没有默认值
    option.stock = decodeStockStr(option.input.value);
    option.drawStock(option, "init");
    bindAttrsSelectAction(option);
    option.onInited(option);
    window.stockOption = option;
    //判断是否启用
    document.getElementById("stockSwitch").checked = option.stockSwitch ? true : false;
    (!option.stockSwitch) ? option.setStockSwitch() : "";
    option.onSwitch(option);
    return option;
    //解码字符串，参数：编码串、库存数据对象
    //编码字符串的示例结构：A.A1,B.B1,C.C1:货号，价格，数量，备注|A.A1,B.B1,C.C2:货号，价格，数量，备注
    //改成：1#颜色:s|尺寸:s~货号，价格，数量，备注;2#颜色:s|尺寸:s~货号，价格，数量，备注;3#颜色:s|尺寸:s~货号，价格，数量，备注;
    function decodeStockStr(str){
        //解码空串
        if (str == "") {
            return {
                attrs: {},
                values: {},
                encodeStr: ""
            };
        }
        var stock = {};
        stock.values = {};
        var tmp = str.split(";");
        for (var i = 0; i < tmp.length; i++) {
            //先去掉每条数据前面的编号
            tmp[i] = tmp[i].replace(/^\d.*#/, "");
            //如果库存对象中没有属性map就先构建属性map,等于直接把第一条记录转换成一个值对
            if (!stock.attrs) {
                stock.attrs = {};
                var s = tmp[i].split("~")[0].split("|");
                for (var j = 0; j < s.length; j++) {
                    //切开s[i]，会得到2元素的数据，第一个是属性名，第2个是属性值
                    stock.attrs[s[j].split(":")[0]] = [s[j].split(":")[1]];
                }
            }
            //分析当前记录的属性值，如果不存在map里面就加入进去
            var s = tmp[i].split("~")[0].split("|");
            for (var j = 0; j < s.length; j++) {
                //取出当前属性的值列表，如果当前属性值不存在就加入到属性列表中
                if (("," + stock.attrs[s[j].split(":")[0]].join(",") + ",").indexOf("," + s[j].split(":")[1] + ",") < 0) {
                    stock.attrs[s[j].split(":")[0]].push(s[j].split(":")[1]);
                }
            }
            //分析当前的记录，解析并压入数据库
            stock.values[tmp[i].split("~")[0].toString()] = tmp[i].split("~")[1].split(",");
        }
        return stock;
    };
    //根据属性的map笛卡尔集
    //map的结构如下：｛a:[a1,a2,a3],b:[b1,b2,b3],c:[c1,c2,c3]｝生成的笛卡尔集结构：["a:a1|b:b1|c:c1","a:a1|b:b1|c:c2","a:a1|b:b1|c:c3","a:a2.."...]
    function createDicars(obj){
        //先生成一个2维数组，作为临时对象,方便后面递归
        //如：[[a:a1,a:a2,a.a3],[b.b1,b.b2,b.b3],[c.c1,c.c2,c.c3]]
        var tmp = [];
        for (var i in obj) {
            var t = [];
            for (var j = 0; j < obj[i].length; j++) {
                t.push(i + ":" + obj[i][j]);
            }
            tmp.push(t);
        }
        if (tmp.length == 0) {
            return tmp;
        }
        //递归生成属性值的笛卡尔集
        return ceateDicar(tmp);
        //2维数组迪卡集生成算法
        function ceateDicar(tmp){
            if (tmp.length == 1) {
                //笛卡尔集本身是2维的，如果1级只有一个数组，就只返回第一项，去掉2维特性
                return tmp[0];
            }
            else {
                var t = [];
                //生成第一行和第2行的简单迪卡集为一个新的一位数组，如：["a:a1|b:b1","a:a1|b:b2","a：a1|b：b3","a：a2.."...]
                for (var i = 0; i < tmp[0].length; i++) {
                    for (var j = 0; j < tmp[1].length; j++) {
                        t.push(tmp[0][i] + "|" + tmp[1][j]);
                    }
                }
                //把简单笛卡尔结果作为新数组的第一个元素，再把原来数组的第3行开始合并到新数组中。
                //如：[["a:a1|b:b1","a:a1|b:b2","a:a1|b:b3","a:a2.."...],["c:c1","c:c2"]]
                var t2 = [t];
                for (var i = 2; i < tmp.length; i++) {
                    t2.push(tmp[i]);
                }
                //继续递归，对新生成的2维数组继续进行迪卡集运算，直到变成1维
                return ceateDicar(t2);
            }
        };
            };
    //生成已经填写的库存数据库：
    //编码库存字符串，参数：库存对象。
    function encodeStockStr(){
        //生成组合全集
        this.stock.dicar = this.createDicars(this.stock.attrs);
        //生成需要取值的库存数据库（属性值的笛卡尔集）
        for (var i = 0; i < this.stock.dicar.length; i++) {
            //如果数组元素id为：“a:a1|b:b1|c:c1”
            if (!this.stock.values[this.stock.dicar[i]]) {
                this.stock.values[this.stock.dicar[i]] = [, , , ];
            }
            this.stock.dicar[i] = i + "#" + this.stock.dicar[i] + "~" + this.stock.values[this.stock.dicar[i]];
        }
        //生成最终编码
        this.stock.encodeStr = this.stock.dicar.join(";");
        //把值写回表单，更新表单中的值，应该可以不用写，最后再返回内容就行
        this.input.value = this.stock.encodeStr;
        //返回一下编码后的串，免得会用上
        return this.stock.encodeStr;
    };
    //输出当前属性列表的统计信息：属性的数量以及属性的最大长度等。
    function getAttrsState(){
        var obj = this
        this.stock.state = {
            num: 0,
            maxlength: 0
        };
        for (var i in this.stock.attrs) {
            this.stock.state.num += 1;
            this.stock.state.maxlength = (this.stock.attrs[i].length > this.stock.state.maxlength) ? this.stock.attrs[i].length : this.stock.state.maxlength;
        }
    };
    //输出属性列表的展示状态html代码
    function showAttrsHtml(obj, dom){
        //一条属性的模板
        var it = ((new RegExp("{#attrItem#}(.*){#attrItem#}", "ig")).exec(obj.tp)) ? RegExp.$1 : "";
        //单个属性值的模板
        var it2 = ((new RegExp("{#attrItem_valueItem#}(.*){#attrItem_valueItem#}", "ig")).exec(it)) ? RegExp.$1 : "";
        var hc = "";
        //遍历所有属性，获得每条属性的html代码
        for (var i in obj.stock.attrs) {
            var hc3 = "";
            for (var j = 0; j < obj.stock.attrs[i].length; j++) {
                hc3 += it2.replace(/{#attrItem_value#}/g, obj.stock.attrs[i][j]);
            }
            hc += it.replace(/{#attrItem_name#}/g, i).replace(/{#attrItem_valueItem#}.*?{#attrItem_valueItem#}/, hc3);
        }
        //输出新增、编辑按钮
        hc += (((new RegExp("{#goedit#}(.*){#goedit#}", "ig")).exec(obj.tp) )&& obj.canEdit) ? RegExp.$1 : "";
        //控制编辑按钮的展示
        hc = hc.replace(((obj.stock.state.num > 0) ? /{#attrCanedit#}/g : /{#attrCanedit#}.*?{#attrCanedit#}/g), "");
        //控制添加按钮的展示
        hc = hc.replace(((obj.stock.state.num < 5) ? /{#attrCanadd#}/g : /{#attrCanadd#}.*?{#attrCanadd#}/g), "");
        obj.state = "show";
        dom.innerHTML = hc;
        $$("#stockAttrsFrame1").removeClass("attr-edit");
        //绑定删除属性按钮的操作
        $$("#stockAttrsFrame1 [tag='delAttr']").click(function(){
            if (confirm("您确认删除属性\"" + this.getAttribute("var1") + "\"吗？删除后不可恢复。")) {
                obj.delAttr(obj, this.getAttribute("var1"));
            }
        });
        //绑定添加事件(先判断添加按钮是否存在)
        (document.getElementById("addStockAttrs")) ? document.getElementById("addStockAttrs").onclick = function(){
            obj.drawStock(obj, "addAttr");
        }
 : "";
        //绑定编辑事件(先判断编辑按钮是否存在)
        (document.getElementById("editStockAttrs")) ? document.getElementById("editStockAttrs").onclick = function(){
            obj.drawStock(obj, "editAttr");
        }
 : "";
    };
    //输出属性列表的编码状态代码
    function showAttrsEditHtml(obj, dom){
        //一条属性信息的编辑状态模板
        var it = ((new RegExp("{#attrItemEdit#}(.*){#attrItemEdit#}", "ig")).exec(obj.tp)) ? RegExp.$1 : "";
        //一个属性值的编辑状态模板
        var it2 = ((new RegExp("{#attrItem_valueItem#}(.*){#attrItem_valueItem#}", "ig")).exec(it)) ? RegExp.$1 : "";
        var hc = "";
        
        //循环生成每条属性的编辑状态代码
        for (var i in obj.stock.attrs) {
            var hc3 = "";//临时记录单条属性的编辑代码
            //((obj.stock.state.maxlength+1)>20?20:(obj.stock.state.maxlength>=10?20:10))
            var itemStyle = obj.stock.state.maxlength >= 10 ? "" : "display:none;"; //第10个之后的编辑框的样式
            var showAllStyle = obj.stock.state.maxlength >= 10 ? "display:none;" : ""; //每行的显示更多按钮的样式
            for (var j = 0; j < 20; j++) {
                hc3 += it2.replace(/{#attrItem_value#}/g, obj.stock.attrs[i][j] ? obj.stock.attrs[i][j] : "").replace(/{#attrItem_Id#}/g, "editAttrInput_" + i + "_" + j).replace(/{#attrItem_style#}/g, j >= 10 ? itemStyle : "");
            }
            hc += it.replace(/{#attrItem_name#}/g, i).replace(/{#attrItem_valueItem#}.*?{#attrItem_valueItem#}/, hc3).replace(/{#attrItem_Id#}/g, "editAttrTitle_" + i).replace("{#ItemsShow_style#}", showAllStyle);
        }
        //输出保存、取消按钮
        hc += ((new RegExp("{#editSave#}(.*){#editSave#}", "ig")).exec(obj.tp)) ? RegExp.$1 : "";
        obj.state = "edit";
        dom.innerHTML = hc;
        $$("#stockAttrsFrame1").addClass("attr-edit");
        //绑定显示更多输入框的事件：
        $$("#stockAttrsFrame1 button[tag='showMore']").click(function(){
            $$(this).hide().prevAll("input").show();
        });
        //开始绑定取消事件
        document.getElementById("cancelEditStockAttrs").onclick = function(){
            obj.drawStock(obj, "editCancel");
        };
        //绑定保存事件
        document.getElementById("saveEditStockAttrs").onclick = function(){
            //检查输入
            var at = obj.getNewAttrsObj(obj, "edit");
            if (at == true) {
                obj.drawStock(obj, "init");
            }
            else {
                alert("温馨提示:\n\n" + at.join("\n"))
            }
        };
    }
    //输出属性列表的添加状态代码
    function showAttrsAddHtml(obj, dom){
        //一条属性列表的展示模板
        var it = ((new RegExp("{#attrItem#}(.*){#attrItem#}", "ig")).exec(obj.tp)) ? RegExp.$1 : "";
        //单个属性值的展示模板
        var it2 = ((new RegExp("{#attrItem_valueItem#}(.*){#attrItem_valueItem#}", "ig")).exec(it)) ? RegExp.$1 : "";
        //一条属性信息的编辑状态模板
        var it3 = ((new RegExp("{#attrItemEdit#}(.*){#attrItemEdit#}", "ig")).exec(obj.tp)) ? RegExp.$1 : "";
        //一个属性值的编辑状态模板
        var it4 = ((new RegExp("{#attrItem_valueItem#}(.*){#attrItem_valueItem#}", "ig")).exec(it3)) ? RegExp.$1 : "";
        var hc = "";
        //同属性列表展示代码输出相同，只是多输出一行空白输入框
        for (var i in obj.stock.attrs) {
            var hc3 = "";
            for (var j = 0; j < obj.stock.attrs[i].length; j++) {
                hc3 += it2.replace(/{#attrItem_value#}/g, obj.stock.attrs[i][j]);
            }
            hc += it.replace(/{#attrItem_name#}/g, i).replace(/{#attrItem_valueItem#}.*?{#attrItem_valueItem#}/, hc3);
        }
        //输出一行编辑框，数量为总长度+1，总长为0的时候就=5
        var hc4 = "";
        //for(var i=0;i<(obj.stock.state.maxlength>0?((obj.stock.state.maxlength+1)>20?20:(obj.stock.state.maxlength>=10?20:10)):10);i++){
        var itemStyle = "display:none;";
        for (var i = 0; i < 20; i++) {
            hc4 += it4.replace(/{#attrItem_value#}/g, "").replace(/{#attrItem_Id#}/g, "editAttrInput_0_" + i).replace(/{#attrItem_style#}/g, i >= 10 ? itemStyle : "");
        }
        hc += it3.replace(/{#attrItem_name#}/g, "").replace(/{#attrItem_valueItem#}.*?{#attrItem_valueItem#}/, hc4).replace(/{#attrItem_Id#}/g, "editAttrTitle_0").replace("{#ItemsShow_style#}", "");
        //输出保存按钮
        hc += ((new RegExp("{#editSave#}(.*){#editSave#}", "ig")).exec(obj.tp)) ? RegExp.$1 : "";
        //控制编辑按钮的展示
        obj.state = "add";
        dom.innerHTML = hc;
        $$("#stockAttrsFrame1").addClass("attr-edit");
        //绑定显示更多输入框的事件：
        $$("#stockAttrsFrame1 button[tag='showMore']").click(function(){
            $$(this).hide().prevAll("input").show();
        });
        //绑定取消事件：
        document.getElementById("cancelEditStockAttrs").onclick = function(){
            drawStock(obj, "editCancel");
        };
        //绑定保存事件
        document.getElementById("saveEditStockAttrs").onclick = function(){
            //检查输入合法性
            var at = obj.getNewAttrsObj(obj, "add");
            if (at == true) {
                drawStock(obj, "init");
            }
            else {
                alert("温馨提示:\n\n" + at.join("\n"))
            }
        };
    }
    //输出库存输入框列表
    function showStockInputHtml(obj, dom){
        this.stock.dicar = this.createDicars(this.stock.attrs);
        //库存列表框架模板
        var hc = ((new RegExp("{#stockContent#}(.*){#stockContent#}", "ig")).exec(this.tp)) ? RegExp.$1 : "";
        //库存列表行模板
        var tp_tr = ((new RegExp("{#stock_line#}(.*){#stock_line#}", "ig")).exec(this.tp)) ? RegExp.$1 : "";
        var tp_tr_a = tp_tr.replace(/{#stock_values#}.*{#stock_values#}/, "{#stock_trs#}").replace(/{#.*?#}/g, "||---||").split("||");
        //库存列head区宽度控制列
        var tp_row = ((new RegExp("{#stock_rows#}(.*){#stock_rows#}", "ig")).exec(this.tp)) ? RegExp.$1 : "";
        //库存表头区域的属性名输出单元
        var tp_tit = ((new RegExp("{#stock_names#}(.*){#stock_names#}", "ig")).exec(this.tp)) ? RegExp.$1 : "";
        //库存表行里面的属性值输出单元
        var tp_val = ((new RegExp("{#stock_values#}(.*){#stock_values#}", "ig")).exec(this.tp)) ? RegExp.$1 : "";
        var row_hc = tit_hc = tr_hc = "";
        var tr_hc = []
        //输出表格的列对象
        for (var i in this.stock.attrs) {
            row_hc += tp_row; //生成所有属性的宽度
            tit_hc += tp_tit.replace(/{#stock_name#}/g, i); //输出所有属性的标题
        }
        for (var i = 0; i < this.stock.dicar.length; i++) {
            var t = this.stock.dicar[i].split("|");
            var td_hc = [];
            var tinfo = this.getStockInfo(this, this.stock.dicar[i]);
            var tp_css = parseInt(tinfo[2]) == 0 ? "background-color:#fdc689;" : ""
            for (var j = 0; j < t.length; j++) {
                td_hc.push(tp_val.replace(/{#stock_value#}/g, t[j].split(":")[1]));
            }
            tp_tr_a[1] = tp_css;
            tp_tr_a[3] = td_hc.join("");
            tp_tr_a[5] = this.stock.dicar[i];
            tp_tr_a[7] = tinfo[0];
            tp_tr_a[9] = this.stock.dicar[i];
            tp_tr_a[11] = tinfo[1] ? parseFloat(tinfo[1]).toFixed(2) : "";
            tp_tr_a[13] = this.stock.dicar[i];
            tp_tr_a[15] = tinfo[2];
            tp_tr_a[17] = this.stock.dicar[i];
            tp_tr_a[19] = tinfo[3];
            tr_hc.push(tp_tr_a.join(""));
        }
        hc = hc.replace(/{#stock_rows#}.*?{#stock_rows#}/g, row_hc);
        hc = hc.replace(/{#stock_names#}.*?{#stock_names#}/g, tit_hc);
        hc = hc.replace(/{#stock_line#}.*?{#stock_line#}/g, tr_hc.join(""));
        dom.innerHTML = hc;
        this.countStock()
        this.onChange(this);
        //为了性能，这里就不批量绑定表单的鼠标事件了，放在代码里面用onclick处理
    };
    //获取修改后的属性列表，返回一个新的attrs对象
    function getNewAttrsObj(obj, type){
        var err = [];//返回的错误对象
        var newAttrs = {};//编辑后的新attrs对象
        var count = [0, [], 1, [], [], [], []]; //[属性条数，为空值的属性名称的数组，最终生成的库存条目数量，所有用到的属性名称或者属性值的数组（用于判断重复值），重复的值,命名不合法的属性,长度过长的属性]
        //先把错误的错误状态都清空
        $$("#stockAttrsFrame1 :text.errorInput").removeClass("errorInput");
        //编辑状态的检查
        if (type == "edit") {
            //遍历所有的属性，取得新值
            for (var i in obj.stock.attrs) {
                var t_t = document.getElementById("editAttrTitle_" + i).value;
                //如果当前为空就跳过：忽略所有属性名为空的行
                if (t_t == "") {
                    continue;
                }
                //创建一个空的当前属性行对象
                newAttrs[t_t] = [];
                //给这个属性对象填值，取得所有的子值对象，并遍历
                var t_list = $$("#stockAttrsFrame1 :input[id^='editAttrInput_" + i + "_']").each(function(){
                    this.value = this.value.replace(/^ */g, "").replace(/ *$/g, "").replace(/_/g, "-");
                    this.value ? newAttrs[t_t].push(this.value) : "";
                });
                //如果这个属性对象的属性值列表为空的话就提示空值错误,并把这一行的文本框都设置为错误状态
                if (newAttrs[t_t].length < 1) {
                    count[1].push(t_t);
                    $$("#stockAttrsFrame1 :input[id^='editAttrInput_" + i + "_']").addClass("errorInput");
                }
                count[0]++;//属性条数加1
                count[2] = count[2] * (newAttrs[t_t].length < 1 ? 1 : newAttrs[t_t].length);//算出总库存条数的乘集
                count[3] = count[3].concat([t_t], newAttrs[t_t]);//把所有的名词全部压入，后面用来判断是否有重复项目
            }
        }
        //添加状态的保存。
        if (type == "add") {
            //先完整的把已有数据深拷贝一份
            for (var i in obj.stock.attrs) {
                newAttrs[i] = obj.stock.attrs[i];
            }
            //获得新增项目的值
            var t_t = document.getElementById("editAttrTitle_0").value;
            if (t_t) {
                //判断新增的元素是否已经存在，存在就压入重复错误列表
                newAttrs[t_t] ? count[4].push(t_t) : "";
                //剩下的操作同修改
                newAttrs[t_t] = [];
                var t_list = $$("#stockAttrsFrame1 :input[id^='editAttrInput_0_']").each(function(){
                    this.value = this.value.replace(/^ */g, "").replace(/ *$/g, "").replace(/_/g, "-");
                    this.value ? newAttrs[t_t].push(this.value) : "";
                });
                //如果这个属性对象为空的话就提示空值错误,并把这一行的文本框都设置为错误状态
                if (newAttrs[t_t].length < 1) {
                    count[1].push(t_t);
                    $$("#stockAttrsFrame1 :input[id^='editAttrInput_0_']").addClass("errorInput");
                }
            }
            for (var i in newAttrs) {
                count[0]++;//属性条数加1
                count[2] = count[2] * (newAttrs[i].length < 1 ? 1 : newAttrs[i].length);//算出总库存条数的乘集
                count[3] = count[3].concat([i], newAttrs[i]);//把所有的名词全部压入，后面用来判断是否有重复项目
            }
        }
        /*开始检查输入的错误	
         *属性编辑检查规则:
         *1、属性最多5个；
         *2、笛卡尔最长100；
         *3、属性值、属性名所有的都不能相同；
         *4、内容只能为：中文字母数字；
         *5、属性必须有至少一个值
         */
        //判断输入内容，只能为中文字母数字
        $$("#stockAttrsFrame1 :text").each(function(){
        
            if (this.value != "") {
                if (!/^[\u4e00-\u9fa5\w\*\(\) （）\.\/\\\-%\@\+]*$/.test(this.value)) {
                    count[5].push(this.id);
                }
                if ($strLenGB(this.value) > 20) {
                    count[6].push(this.id);
                }
            }
        });
        if (count[5].length > 0) {
            err.push("存在不合法的属性名或者属性值,名称只能由中文、字母、数字、（、）、*、\\、\/、+、-、%、@、.以及空格组成。");
            $$("#" + count[5].join(",#")).addClass("errorInput");
        }
        if (count[6].length > 0) {
            err.push("您填写的属性超过了10个汉字（20个字符），请修改后提交。");
            $$("#" + count[6].join(",#")).addClass("errorInput");
        }
        if (count[0] > 5) {
            err.push("最多只支持5种库存属性，请重新选择，清空不必要的项目。");
        }
        if (count[1].length > 0) {
            err.push("属性“" + count[1].join(",") + "”至少要有一个以上的属性值。");
        }
        if (count[2] > 100) {
            err.push("您生成的库存记录超过100条的最大限制，请适当调整属性。")
        }
        //扫描相同元素
        for (var i = 0; i < count[3].length; i++) {
            for (var j = i + 1; j < count[3].length; j++) {
                if (count[3][i] == count[3][j]) {
                    count[4].push(count[3][i]);
                }
            }
        }
        //同名元素检查
        if (count[4].length > 0) {
            err.push("您填写的属性存在相同名称，请修改后提交。");//+count[4].join("、"))
            $$("#stockAttrsFrame1 :input[value='" + count[4].join("'],#stockAttrsFrame1 :input[value='") + "']").addClass("errorInput");
        }
        //检查是否有错，有错误就返回false并提示错误
        if (err.length > 0) {
            for (var i = 0; i < err.length; i++) {
                err[i] = (i + 1) + "、" + err[i];
            }
            return err;
        }
        else {
            obj.stock.attrs = newAttrs;
            obj.stock.dicar = obj.createDicars(obj.stock.attrs);
            //生成需要缺乏的库存数据库
            for (var i = 0; i < obj.stock.dicar.length; i++) {
                //如果数组元素id为：“a.a1,b.b1,c.c1”
                if (!obj.stock.values[obj.stock.dicar[i]]) {
                    obj.stock.values[obj.stock.dicar[i]] = [, , , ];
                }
            }
            return true;
        }
    }
    //获取某个属性组合的默认值，如果没有就返回空数组
    function getStockInfo(obj, str){
        var t = ["", "", "", ""];
        var n = str.split("|");
        for (var i in obj.stock.values) {
            if (inArray(i.split("|"), n)) {
                return obj.stock.values[i];
            }
        }
        return t;
        //判断数组的是否包含
        function inArray(a, b){
            //保证前面是大数组
            if (a.length < b.length) {
                var t = a;
                a = b;
                b = t;
            }
            var isin = 0;
            for (var i = 0; i < b.length; i++) {
                for (var j = 0; j < a.length; j++) {
                    if (b[i] == a[j]) {
                        isin++;
                        continue;
                    }
                }
            }
            if (isin == b.length) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    //获取所有的用户输入的库存信息，打入values
    function getStockInput(obj){
        obj.stock.dicar = obj.createDicars(obj.stock.attrs);
        var inputs = {};
        var c = ""
        $$("#stockAttrsFrame2 :text").each(function(){
            var _id = this.id.split("_")
            var _value = this.value;
            if (!inputs[_id[0]]) {
                inputs[_id[0]] = [_value, , , ];
            }
            else {
                inputs[_id[0]][parseInt(_id[1])] = _value;
            }
        });
        obj.stock.values = inputs;
        obj.countStock()
        obj.onChange(obj);
    }
    //根据库存对象渲染页面
    function drawStock(obj, type){
        obj.getAttrsState();
        if (type == "init") {
            //输出框架
            var hc = (((new RegExp("{#attrlist#}(.*){#attrlist#}", "ig")).exec(obj.tp)) ? RegExp.$1 : "").replace(/{#attrContent#}.*?{#attrContent#}/, '');
            if (obj.stock.state.num > 0) {
                hc += (((new RegExp("{#stock#}(.*){#stock#}", "ig")).exec(obj.tp)) ? RegExp.$1 : "").replace(/{#stockContent#}.*?{#stockContent#}/, '');
            }
            obj.area.innerHTML = hc;
            $$("#stockSwitch").click(function(){
                obj.stockSwitch = !obj.stockSwitch;
                obj.setStockSwitch();
            }).attr("checked", obj.stockSwitch);
            //输出属性列表的展示状态
            obj.showAttrsHtml(obj, document.getElementById("stockAttrsFrame1"));
            //输出库存输入列表
            if (obj.stock.state.num > 0) {
                obj.showStockInputHtml(obj, document.getElementById("stockAttrsFrame2"));
            }
        }
        if (type == "addAttr") {
            //更新属性列表区域为添加状态
            obj.showAttrsAddHtml(obj, document.getElementById("stockAttrsFrame1"))
        }
        if (type == "editAttr") {
            //更新属性列表区域为编辑状态
            obj.showAttrsEditHtml(obj, document.getElementById("stockAttrsFrame1"))
        }
        if (type == "editCancel") {
            //更新属性列表区域为展示状态
            obj.showAttrsHtml(obj, document.getElementById("stockAttrsFrame1"))
        }
    }
    //删除一条属性记录
    function delAttr(obj, attr){
        if (!obj.stockSwitch) {
            return;
        }
        var newAttrs = {};
        var count = 1;
        //先完整的把已有数据深拷贝一份，免得修改影响到原来的数据
        for (var i in obj.stock.attrs) {
            if (i == attr) {
                continue;
            }
            newAttrs[i] = [];
            for (var j = 0; j < obj.stock.attrs[i].length; j++) {
                newAttrs[i][j] = obj.stock.attrs[i][j];
            };
                    }
        obj.stock.attrs = newAttrs;
        obj.drawStock(obj, "init");
    }
    //添加新的属性进来
    function addAttr(obj, attr, attrvar){
        if (!obj.stockSwitch) {
            return;
        }
        var newAttrs = {};
        var count = 1;
        var attrsCount = 0;
        //先完整的把已有数据深拷贝一份，免得修改影响到原来的数据
        for (var i in obj.stock.attrs) {
            newAttrs[i] = [];
            for (var j = 0; j < obj.stock.attrs[i].length; j++) {
                newAttrs[i][j] = obj.stock.attrs[i][j];
            };
            attrsCount += 1
        }

        if (!newAttrs[attr]) {
            newAttrs[attr] = [];
            attrsCount += 1
        }
        if (attrsCount > 5) {
            return;
        }
        for (var i = 0; i < newAttrs[attr].length; i++) {
            if (newAttrs[attr][i] == attrvar) {
                return;
            }
        }
        newAttrs[attr].push(attrvar);
        //进行统计
        for (var i in newAttrs) {
            count = count * (newAttrs[i].length < 1 ? 1 : newAttrs[i].length);//算出总库存条数的乘集
        }
        if (count > 100) {
            return;
        }
        //走到这里的时候说明新加的数据符合要求则更新原来的属性map
        obj.stock.attrs = newAttrs;
        for (var i in obj.stock.attrs) {
            count = count * (newAttrs[i].length < 1 ? 1 : newAttrs[i].length);//算出总库存条数的乘集
        }
        obj.stock.attrs = newAttrs;
        obj.drawStock(obj, "init");
    }
    //绑定类目属性区域的选择时间
    function bindAttrsSelectAction(obj){
        $$(":checkbox[attrName][attrVar][tag='forstock']").click(function(){
            this.checked ? obj.addAttr(obj, $$(this).attr("attrName"), $$(this).attr("attrVar")) : "";
        });
    }
    //库存输入文本框的检查
	function stockInputCheck(obj){
        var dtype = $$(obj).attr("dtype");
        switch (dtype) {
            case "string":
				var v = obj.value;
				//if (!/^[\u4e00-\u9fa5\w-]*$/.test(v)){
				//	obj.value = v.replace(/[^\u4e00-\u9fa5\w-]/g, "");
                //}
				obj.value = v.replace(/[^\u4e00-\u9fa5\w-\/]/g, "");
                break;
            case "price":
                var p = obj.value;
                if (p == "") {
                    return;
                }
                p = p.replace(/[^\d\.]/g, "");
                if (p != obj.value) {
                    obj.value = p;
                }
                if (p != "" && parseFloat(p).toFixed(2) != obj.value) {
                    if (parseFloat(p).toFixed(2).length > 10 || parseFloat(p) > 1000000) {
                        obj.value = "1000000.00";
                    }
                    else {
                        obj.value = parseFloat(p).toFixed(2);
                    }
                }
                break;
            case "num":
                var p = obj.value;
                if (p == "") {
                    return;
                }
                p = $strTrimLeft(p,"0");
                if (p != obj.value) {
                    obj.value = p;
                }
                p = p.replace(/[^\d]/g, "");
                if (p != obj.value) {
                    obj.value = p;
                }
                if (p != "" && parseInt(p).toString() != obj.value) {
                    obj.value = parseInt(p);
                }
                if (p == "") {
                    obj.value = 0;
                }
                break;
        };
        //如果有性能问题，这里可以修改为直接在stock。value上修改值，不从dom中取，代码见下面的注释
        window.stockOption.getStockInput(window.stockOption);
        //window.stockOption.saveNewVar(obj.id.split("_")[0],obj.id.split("_")[1],obj.value);
    };
    //在历史数据记录中插入新的值
    function saveNewVar(t, i, v){
        var o = window.stockOption.stock.values;
        (!o[t]) ? o[t] = [, , , ] : "";
        o[t][i] = v;
    }
    //设置相同值的操作
    function setStockVarToSame(dom){
        var dtype = $$(dom).attr("stype");
        var items = $$("#stockAttrsFrame2 [dtype='" + dtype + "']");
        if (dom.checked) {
            if (confirm("您确定把所选列全部设置一行中的内容吗？")) {
                var t = items.val()
                items.val(t);
                //如果有性能问题，这里可以修改为直接在stock。value上修改值，不从dom中取，代码见下面的注释
                window.stockOption.getStockInput(window.stockOption)
                //				for(var i in window.stockOption.stock.values){
                //					window.stockOption.saveNewVar(i,dtype=="num"?2:1,t)
                //				}
            }
            else {
                dom.checked = false;
            }
        }
    };
    //切换库存对象的启用关闭开关
    function setStockSwitch(){
        (window.stockOption.stockSwitch) ? $$("#stockAttrsFrame1,#stockAttrsFrame2").show() : $$("#stockAttrsFrame1,#stockAttrsFrame2").hide();
        window.stockOption.onSwitch(window.stockOption);
    }
    //检查表单的输入状态
    function checkStockInput(){
        if (!this.stockSwitch) {
            this.input.value = "";
            return true;
        }
        this.getStockInput(this);
        var err = [];
        var inputs = [];
        if (this.state != "show") {
            err.push("库存属性列表处于编辑状态，请先保存修改再提交。");
        }
        for (var i in this.stock.values) {
            //			if(this.stock.values[i][0]==""){
            //				inputs.push(":text[id='"+i+"_0']");
            //			}
            if (this.stock.values[i][1] == "") {
                inputs.push(":text[id='" + i + "_1']");
            }
            if (this.stock.values[i][2] == "") {
                inputs.push(":text[id='" + i + "_2']");
            }
        }
        if (inputs.length > 0) {
            err.push("请您完整填写价格、数量。");
        }
        if (err.length < 1) {
            this.encodeStockStr()
            return true;
        }
        else {
            return err;
        }
    }
    //把库存的当前数据拷贝到内存中
    function getExcelCopy(){
        this.getStockInput(this);
        var t = [];
        for (var i in this.stock.values) {
            t.push(this.stock.values[i].join("\t"));
        }
        t = t.join("\r\n");
        window.clipboardData.setData("text", t);
        alert("温馨提示:\n\n" + "数据已复制，请直接粘贴在Excel表格中。");
    }
    //用户粘贴数据事件判断
    function stockOnPaste(obj){
        var t = clipboardData.getData("text");
        if (t.length > 10 * 1000) {
            alert("温馨提示:\n\n" + "您粘帖的表格过大，请复制时适当减少表格数量。")
            return false;
        }
        if (/(.*\n.*){2,}/.test(t)) {
            //if(confirm("温馨提示:\n\n"+"检测到你要粘贴的数据是多行格式，是否要按照表格结构分拆到各个输入框？")){
            var d = t.replace(/^\n|\n$/, "").split("\r\n");
            for (var i = 0; i < d.length; i++) {
                d[i] = d[i].split("\t");
            }
            var _id = obj.id.split("_")[0];
            var _s = parseInt(obj.id.split("_")[1]);
            var _o = window.stockOption;
            var _l = _o.stock.dicar = _o.createDicars(_o.stock.attrs);
            var _v = _o.stock.values;
            var startTag = false;
            var curLine = 0;
            for (var i = 0; i < _l.length; i++) {
                //如果找到起点就打上标记
                (_l[i] == _id) ? startTag = true : "";
                //发现标记打上并且数据还没有粘贴完的话，就开始粘贴一行
                if (startTag && curLine < d.length) {
                    for (var j = _s, k = 0; j < 4 && k < d[curLine].length; j++, k++) {
                        switch (j) {
                            case 1:
                                (!/^[\d\.]*$/.test(d[curLine][k])) ? d[curLine][k] = d[curLine][k].replace(/[^\d\.]/g, "") : "";
                                if (d[curLine][k] != "") {
                                    d[curLine][k] = parseFloat(d[curLine][k]).toFixed(2);
                                }
                                break;
                            case 2:
                                (!/^[\d]*$/.test(d[curLine][k])) ? d[curLine][k] = d[curLine][k].replace(/[^\d]/g, "") : "";
                                if (d[curLine][k] && d[curLine][k] != "0") {
                                    d[curLine][k] = parseInt($strTrimLeft(d[curLine][k].toString(),"0"));
                                }
                                break;
                            default:
                                (!/^[\u4e00-\u9fa5\w]*$/.test(d[curLine][k])) ? d[curLine][k] = d[curLine][k].replace(/[^\u4e00-\u9fa5\w]/g, "") : "";
                                break;
                        };
                        _v[_l[i]] ? "" : _v[_l[i]] = [, , , ];
                        _v[_l[i]][j] = d[curLine][k];
                    }
                    curLine++;
                }
            }
            window.stockOption.showStockInputHtml(window.stockOption, document.getElementById("stockAttrsFrame2"));
            return false
        }
        //}
        return true;
    }
    //统计库存数据中的最大价格、最小价格、商品总数
    function countStock(){
        this.maxPrice = "";
        this.minPrice = "";
        this.stockCount = 0;
        for (var i = 0; i < this.stock.dicar.length; i++) {
            var d = this.stock.values[this.stock.dicar[i]];
            if (!d) {
                continue;
            }
            if (!this.maxPrice) {
                this.maxPrice = parseFloat(d[1]);
                this.minPrice = parseFloat(d[1]);
            }
            if (d[1] && parseFloat(d[1]) > parseFloat(this.maxPrice)) {
                this.maxPrice = parseFloat(d[1]);
            }
            if (d[1] && parseFloat(d[1]) < parseFloat(this.minPrice)) {
                this.minPrice = parseFloat(d[1]);
            }
            if (d[2]) {
                this.stockCount += parseInt(d[2]);
            }
        }
    }
}

function $simpleValidator(){
	Validator = {
	Require : /.+/,
	Email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	Phone : /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,11}(\-\d{1,6})?$/,
	Mobile : /^(852\d{8})|(((\(\d{2,3}\))|(\d{3}\-))?((13\d{9})|(14\d{9})|(15\d{9})|(18\d{9})))$/,
	Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
	IdCard : "this.IsIdCard(value)",	
	Currency : /^\d+(\.\d+)?$/,
	Number : /^\d+$/,
	Zip : /^[0-9]\d{5}$/,
	QQ : /^[1-9]\d{4,9}$/,
	Integer : /^[-\+]?\d+$/,
	Double : /^[-\+]?\d+(\.\d+)?$/,
	English : /^[A-Za-z]+$/,
	Chinese : /^[\u0391-\uFFE5]+$/,
	Username : /^[a-z]\w{3,}$/i,
	UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
	IsSafe : function(str){return !this.UnSafe.test(str);},
	SafeString : "this.IsSafe(value)",
	Filter : "this.DoFilter(value, getAttribute('accept'))",
	Limit : "this.limit(value.length,getAttribute('min'), getAttribute('max'))",
	LimitB : "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))",
	LimitC : "this.limit(this.LenC(value), getAttribute('min'), getAttribute('max'))",
	Date : "this.IsDate(value, getAttribute('min'), getAttribute('format'))",
	Repeat : "value == document.getElementsByName(getAttribute('to'))[0].value",
	Range : "parseFloat(getAttribute('min')) <= parseFloat(value) && parseFloat(value) <= parseFloat(getAttribute('max'))",
	Compare : "this.compare(value,getAttribute('operator'),getAttribute('to'))",
	Custom : "this.Exec(value, getAttribute('regexp'))",
	Group : "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('max'))",
	ErrorItem : [document.forms[0]],
	ErrorMessage : ["温馨提示：由于以下可能原因，您需要调整输入信息。\t\t\t\t\n"],

	Validate : function(){
	var theForm;
		var mode;
		switch(arguments.length)
		{
			case 0:	
			 theForm = document.forms[0];
			 mode = 1;
			 break;
			case 1:
				if(typeof(arguments[0])=="object")
					theForm = arguments[0];
				else
					theForm = document.forms[arguments[0]];
				mode = 1;
				break;
			case 2:
			default:
				if(typeof(arguments[0])=="object")
					theForm = arguments[0];
				else
					theForm = document.forms[arguments[0]];
				mode = arguments[1];
				break;
		}

		var obj = theForm || event.srcElement;
		var count = obj.elements.length;
		this.ErrorMessage.length = 1;
		this.ErrorItem.length = 1;
		this.ErrorItem[0] = obj;
		var checkwithObject = null;
		for(var i=0;i<count;i++){
			with(obj.elements[i]){
				var _dataType = getAttribute("dataType");
				if(typeof(_dataType) == "object" || typeof(this[_dataType]) == "undefined")
						continue;
				this.ClearState(obj.elements[i]);
				if(getAttribute("checkwith")!=null)
				{
					var _theObj=getAttribute("checkwith");				
					var _unionObjs= document.getElementsByName(_theObj);
					var iIndex;
					if(_unionObjs.length > 0)
					{
						for(iIndex=0;iIndex<_unionObjs.length;iIndex++)
						{	
							if(value == ""&&_unionObjs[iIndex].value!="")
								break;	
						}
						if(iIndex <	_unionObjs.length) 
							continue;				
					}
				}
//alert(getAttribute("id"));
//alert(getAttribute("require"));
				if(getAttribute("require") == "false" && value == "")
					continue;
				
				switch(_dataType){
					case "IdCard" :
					case "Date" :
					case "Repeat" :
					case "Range" :
					case "Compare" :
					case "Custom" :
					case "Group" : 
					case "Limit" :
					case "LimitB" :
					case "LimitC" :
					case "SafeString" :
					case "Filter" :
					if(!eval(this[_dataType])) {
						this.AddError(i, getAttribute("msg"));
					}
					break;
					default :
					if(!this[_dataType].test(value)){
						this.AddError(i, getAttribute("msg"));
					}
					break;
			}
		}
	}
	
	if(this.ErrorMessage.length > 1){
		mode = mode || 1;
		var errCount = this.ErrorItem.length;
		switch(mode){
			case 2 :
				for(var i=1;i<errCount;i++)
				{
					this.ErrorItem[i].style.color = "red";
					this.ErrorItem[i].style.borderColor = "red";
				}
				case 1 :
					alert(this.ErrorMessage.join("\n"));
				try
				{
					this.ErrorItem[1].focus();
				}
				catch(bb){break;}
				break;
		case 3 :
				for(var i=1;i<errCount;i++){
					try{
					this.ErrorItem[i].style.borderColor = "red";
					var span = document.createElement("SPAN");
					span.id = "__ErrorMessagePanel";
					span.style.color = "red";					
					this.ErrorItem[i].parentNode.appendChild(span);
					span.innerHTML = this.ErrorMessage[i].replace(/\d+:/,"*");
					}
					catch(e){alert(e.description);}
				}
				this.ErrorItem[1].focus();
				break;
				default :
				alert(this.ErrorMessage.join("\n"));
				break;
			}
			return false;
		}
		return true;
	},

limit : function(len,min, max){
min = min || 0;
max = max || Number.MAX_VALUE;
return min <= len && len <= max;
},
LenB : function(str){
return str.replace(/[^\x00-\xff]/g,"**").length;
},
LenC : function(str){
	var exp = /^[A-Za-z0-9]+$/;
	if(!exp.test(str))
	{
		return 0;
	}
return str.replace(/[^\x00-\xff]/g,"**").length;
},
ClearState : function(elem){
with(elem){
style.color = "";
style.borderColor="";
var lastNode = parentNode.childNodes[parentNode.childNodes.length-1];
if(lastNode.id == "__ErrorMessagePanel")
parentNode.removeChild(lastNode);
}
},
AddError : function(index, str){
this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
},
Exec : function(op, reg){
return new RegExp(reg,"g").test(op);
},
compare : function(op1,operator,op2){
switch (operator) {
case "NotEqual":
return (op1 != op2);
case "GreaterThan":
return (op1 > op2);
case "GreaterThanEqual":
return (op1 >= op2);
case "LessThan":
return (op1 < op2);
case "LessThanEqual":
return (op1 <= op2);
default:
return (op1 == op2); 
}
},
MustChecked : function(name, min, max){
var groups = document.getElementsByName(name);
var hasChecked = 0;
min = min || 1;
max = max || groups.length;
for(var i=groups.length-1;i>=0;i--)
if(groups[i].checked) hasChecked++;
return min <= hasChecked && hasChecked <= max;
},
DoFilter : function(input, filter){
	exp_str1 = filter.split(",").join("|");
	exp_str2 = exp_str1.replace(/\s+/g,"");
	return new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, exp_str2), "gi").test(input);
},
IsIdCard : function(number){
var date, Ai;
var verify = "10x98765432";
var verify2 = "10x98765432";
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
var area = ['','','','','','','','','','','','北京','天津','河北','山西','内蒙古','','','','','','辽宁','吉林','黑龙江','','','','','','','','上海','江苏','浙江','安微','福建','江西','山东','','','','河南','湖北','湖南','广东','广西','海南','','','','重庆','四川','贵州','云南','西藏','','','','','','','陕西','甘肃','青海','宁夏','新疆','','','','','','台湾','','','','','','','','','','香港','澳门','','','','','','','','','国外'];
var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
if(re == null) return false;
if(re[1] >= area.length || area[re[1]] == "") return false;
if(re[2].length == 12){
Ai = number.substr(0, 17);
date = [re[9], re[10], re[11]].join("-");
}
else{
Ai = number.substr(0, 6) + "19" + number.substr(6);
date = ["19" + re[4], re[5], re[6]].join("-");
}
if(!this.IsDate(date, "ymd")) return false;
var sum = 0;
for(var i = 0;i<=16;i++){
sum += Ai.charAt(i) * Wi[i];
}
Ai +=verify.charAt(sum%11);
return (number.length ==15 || number.length == 18 && number.toLowerCase() == Ai);
},
IsDate : function(op, formatString)
{
formatString = formatString || "ymd";
var m, year, month, day;
switch(formatString){
case "ymd" :
m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
if(m == null ) return false;
day = m[6];
month = m[5]*1;
year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
break;
case "dmy" :
m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
if(m == null ) return false;
day = m[1];
month = m[3]*1;
year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
break;
default :
break;
}
if(!parseInt(month)) return false;
month = month==0 ?12:month;
var date = new Date(year, month-1, day);
return (typeof(date) == "object" && year == date.getFullYear() && month == (date.getMonth()+1) && day == date.getDate());
function GetFullYear(y){return ((y<30 ? "20" : "19") + y)|0;}
}
}

return Validator

}

function $fillAddress(obj){
	var option={
		regionUrl:"http://static.paipaiimg.com/js/regiondata.js?t=20091111",//默认地址数据地址
		province:"",
		city:"",
		area:"",
		provId:"",
		cityId:"",
		areaId:"",
		initValue:"",
		onSelect:function(){return true;},
		onSelectBlankProv:function(){return true;},
		onSelectBlankCity:function(){return true;}		
	}
	for(var i in obj)option[i] = obj[i];
	
	option.provinceHander=option.province==""?null:$id(option.province);
	option.cityHander=option.city==""?null:$id(option.city);
	option.areaHander=option.area==""?null:$id(option.area);
	
    if(option.provinceHander){
		option.provinceHander.setAttribute("stype","province");
		option.provinceHander.setAttribute("vprovince",option.province);
		option.provinceHander.setAttribute("vcity",option.city);
		option.provinceHander.setAttribute("varea",option.area);
	}
	if(option.cityHander){
		option.cityHander.setAttribute("stype","city");
		option.cityHander.setAttribute("vprovince",option.province)
		option.cityHander.setAttribute("vcity",option.city)
		option.cityHander.setAttribute("varea",option.area)
	}
	if(option.areaHander){
		option.cityHander.setAttribute("stype","area");
		option.cityHander.setAttribute("vprovince",option.province)
		option.cityHander.setAttribute("vcity",option.city)
		option.cityHander.setAttribute("varea",option.area)
	}
	
option.initaddress=init;
$loadScript(option.regionUrl);
var regionMap = $getRegionMap();

//初始化地址选择下拉框
init();	 
return option;



function init(){
	setPath();
	addListener();
	fillProv();
	fillCity();
	fillArea();
}

	 
function setPath(){
	if(option.initValue){
		for(var i in regionMap){
			if(i.toString()===option.initValue.toString()){		//如果从省目录中找到就直接设置，不进行下一步操作
				option.provId=option.initValue;
				return;
			}else{	//当前省不是默认则找这个省的市数据，然后在进行下一步
				if (typeof(regionMap[i][2])=="object"){	//如果这个省有市的数据则在市数据中找
					var tempProv=i;
					for(var j in regionMap[i][2]){	
						if(j.toString()===option.initValue.toString()){	//在市数据中找到，就直接把这个省和市的数据写入设置中，并退出循环
							option.provId=tempProv;
							option.cityId=j;
							return;
						}else{//找地区数据
							var tempaeralist=regionMap[i][2][j][2];
							if(typeof(tempaeralist)=="object"){
								var tempCity=j;
								for(var k in tempaeralist){//在地区数据中找
									if (k.toString()===option.initValue.toString()){//找到
										option.provId=tempProv;
										option.cityId=tempCity;
										option.areaId=k;
										return;
									}
								}
							}
						}
					}
				}
			}
		}
	}
};

function fillProv(){
	var _theprovince=option.provinceHander
	if(_theprovince){
		if(_theprovince.options.length > 0) return;
		$addSelect(_theprovince,"","");
		for(var i in regionMap){
			$addSelect(_theprovince,regionMap[i][0],i);
		}
		if(option.provId){
			_theprovince.value = option.provId;
		}
	}
};

function fillCity(){
	var _thecity=option.cityHander;
	if(_thecity){
		if (!option.provId){return ;}
		var cityList=regionMap[option.provId][2];
/*		var hasIt = false;
		for(var j=0;j<_thecity.options.length;j++){
			if(_thecity.options[j].value.toString()==option.cityId && _thecity.options[j].value.toString()!=""){
				hasIt = true;
				break;
			}
		}
		if(hasIt){return;}*/
		_thecity.options.length = 0;
		$addSelect(_thecity,"","");
		for(var i in cityList){
			$addSelect(_thecity,cityList[i][0],i);
		}
		if(option.cityId){
			_thecity.value = option.cityId;
		}
	}
};


function fillArea(){
	var _thearea=option.areaHander;
	if(_thearea && option.area){
		var areaList;
		if(!option.cityId){
			_thearea[0].options.length = 0;
			return;
		}
		areaList=regionMap[option.provId][2][option.cityId][2];
		_thearea.options.length = 0;
		$addSelect(_thearea,"","");
		for(var i in areaList){
			$addSelect(_thearea,areaList[i][0],i);
		}
		if(option.areaId){
			_thearea.val(option.areaId)
		}
	}
};

function addListener(){
	
	function changeAction(){		
		vprovince=this.getAttribute("vprovince");
		vcity=this.getAttribute("vcity");
		varea=this.getAttribute("varea");
		var stype = this.getAttribute("stype");
		var thevalue = this.value;
		var thisselectvar = thevalue
		option.onSelect(this,stype);
		if(stype=="province" && thevalue==""){
 option.onSelectBlankProv(this);
			$id(vcity)?$id(vcity).options.length = 0:"";
			(varea && $id(varea))?$id(varea).options.length = 0:"";
		}
		if(stype=="city" && thevalue==""){
			option.onSelectBlankCity(this);
			thisselectvar=$id(vprovince).value;
		}
		
		option.provId="";
		option.cityId="";
		option.areaId="";
		option.initValue = thisselectvar;
		init();
	}
	if(option.cityHander){
		option.provinceHander.onchange="";
		option.provinceHander.onchange=changeAction;
	}
	if(option.areaHander){
		option.cityHander.onchange = "";
		option.cityHander.onchange = changeAction
	}
};

}

function $captureImage(opts){
    var CAP = {
        options: {
            //上传input file标签的名称
            inputFileName: "Fdata",
            //上传文件的包头信息，包括cookie
            uploadDataHeader: {
                'Cookie': ''
            },
            //上传服务器地址,默认为mcs文件上传CGI
            uploadUrl: 'http://file.mcs.paipai.com/cgi-bin/up',
            //是否自动上传截屏图片
            isAutoUpload: false,
            //安装截屏控件页面
            helpUrl: 'http://mcs.paipai.com/instcap.htm',
            //图片上传进度
            onUploadProcess: function(precent){
                return true;
            },
            //截屏图片上传成功
            onUploadSuccess: function(result){
                return true;
            },
            //截屏成功
            onCaptureSuccess: function(fileId, fileName){
                return true;
            },
            //发生错误
            onFailure: function(err){
                //err:{id:'1:未安装插件，2：上传失败   3:上传未知事件, 查看onUploadEvent中错误码',description:'错误描述'}
                return false;
            }
        },
        //截屏对象
        capture: null,
        //上传对象
        uploader: null,
        //对象初始化
        init: function(opts){
            for (var o in opts) {
                this.options[o] = opts[o];
            }
            //安装截屏控件
            this.setup();
            return this;
        },
        //安装截屏控件
        setup: function(){
            try {
                this.capture = new ActiveXObject("SCActiveX.ScreenCapture");
                this.uploader = new ActiveXObject("SCActiveX.Uploader");
            } 
            catch (e) {
                //截屏控件安装提示
                if (confirm("您还未安装截屏控件，立即安装截屏控件？")) {
                    window.open(this.options.helpUrl);
                }
                else {
                    this.capture = null;
                    this.uploader = null;
                }
                this.options.onFailure({
                    id: 1,
                    description: '未安装截屏控件'
                });
            }
        },
        //启动截屏
        doCapture: function(){
            if (!(this.capture && this.uploader)) {
                return false;
            }
            var _this = this;
            this.capture.OnCaptureFinished = function(){
                if (!(_this.capture && _this.uploader)) {
                    return false;
                }
                //获取文件id
                var fileId = _this.capture.SaveClipBoardBmpToFile(1);
                //获取本地图片文件名
                var fileName = _this.capture.GetLocalFileNameByID(fileId);
                //截屏成功
                _this.options.onCaptureSuccess(fileId, fileName);
                //控件上传图片
                if (_this.options.isAutoUpload) {
                    _this.doUpload(fileId);
                }
            };
            this.capture.DoCapture();
            return true;
        },
        //控件调用CGI上传图片
        doUpload: function(fileId, data){
            if (!(this.capture && this.uploader)) {
                return false;
            }
            //清理一下上传数据       
            this.uploader.ClearFormItems();
            this.uploader.ClearHeaders();
            
            //上传服务器地址
            this.uploader.URL = this.options.uploadUrl;
            //上传的HTTP包头信息
            var headData = this.options.uploadDataHeader;
            for (var item in headData) {
                this.uploader.AddHeader(item, headData[item]);
            }
            //POST数据
            this.uploader.AddFormItem(this.options.inputFileName, 1, 4, fileId);
            for (var i = 0, len = data.length; i < len; i++) {
                this.uploader.AddFormItemObject(data[i]);
            }
            var _this = this;
            //上传时触发的事件
            this.uploader.OnEvent = function(obj, eventID, p1, p2, p3){
                if (!(_this.capture && _this.uploader)) {
                    return false;
                }
                var err = {};//错误信息
                switch (eventID) {
                    case 1://发生上传错误
                        err.id = p1;
                        switch (p1) {
                            //ERR_GETPACKAGE_FAILED
                            case 20001:
                                err.description = "MIME包错误";
                                break;
                            //ERR_GETBUFFER_FAILED
                            case 20002:
                                err.description = "内存不足";
                                break;
                            //ERR_HTTPREQUEST_FAILED
                            case 20003:
                                err.description = "发送请求失败";
                                break;
                            //ERR_HTTPADDHEADERS_FAILED
                            case 20004:
                                err.description = "添加HTTP请求头失败";
                                break;
                            //ERR_GETHTTPRESPONSE_FAILED
                            case 20005:
                                err.description = "获取HTTP应答体失败";
                                break;
                            //ERR_GETHTTPHEADERS_FAILED
                            case 20006:
                                err.description = "获取HTTP应答头失败";
                                break;
                            //ERR_CANNOT_CONNECTTOSERVER
                            case 20007:
                                err.description = "无法连接到服务器";
                                break;
                            //ERR_URL_INVALID
                            case 20008:
                                err.description = "URL不合法";
                                break;
                            //ERR_CREATETHREAD_FAILED
                            case 20009:
                                err.description = "创建上传线程失败";
                                break;
                            //ERR_UPLOADTHREAD_ALREADYRUNNING
                            case 20010:
                                err.description = "上传线程已经运行";
                                break;
                        }
                        _this.options.onFailure(err);
                        break;
                    case 2://Progress	
                        _this.options.onUploadProcess(p1 * 100 / p2);
                        break;
                    case 3://Finished
                        _this.options.onUploadSuccess(_this.uploader.Response);
                        break;
                    default://Unknown event
                        err.id = 3;
                        err.description = "上传过程中，发生未知事件";
                        _this.options.onFailure(err);
                        break;
                }
            };
            //开始上传
            this.uploader.StartUpload();
            return true;
        }
    };
    return CAP.init(opts);
};

function $time33(str){
    //哈希time33算法
    for(var i = 0, len = str.length,hash = 5381; i < len; ++i){
       hash += (hash << 5) + str.charAt(i).charCodeAt();
    };
    return hash & 0x7fffffff;
};

function $selectColor(opt) {
	var option = {
		content : '',	//父元素id
		defaultColor : 'black',	//默认颜色
		colorTable: [
			["#FFFFFF", "#E5E4E4", "#D9D8D8", "#C0BDBD", "#A7A4A4", "#8E8A8B", "#827E7F", "#767173", "#5C585A", "#000000"], 
			["#FEFCDF", "#FEF4C4", "#FEED9B", "#FEE573", "#FFED43", "#F6CC0B", "#E0B800", "#C9A601", "#AD8E00", "#8C7301"], 
			["#FFDED3", "#FFC4B0", "#FF9D7D", "#FF7A4E", "#FF6600", "#E95D00", "#D15502", "#BA4B01", "#A44201", "#8D3901"], 
			["#E2F0FE", "#C7E2FE", "#ADD5FE", "#92C7FE", "#6EB5FF", "#48A2FF", "#2690FE", "#0162F4", "#013ADD", "#0021B0"], 
			["#D3FDFF", "#ACFAFD", "#7CFAFF", "#4AF7FE", "#1DE6FE", "#01DEFF", "#00CDEC", "#01B6DE", "#00A0C2", "#0084A0"], 
			["#EDFFCF", "#DFFEAA", "#D1FD88", "#BEFA5A", "#A8F32A", "#8FD80A", "#79C101", "#3FA701", "#307F00", "#156200"], 
			["#FFD2D0", "#FFBAB7", "#FE9A95", "#FF7A73", "#FF483F", "#FE2419", "#F10B00", "#D40A00", "#940000", "#6D201B"], 
			["#FFDAED", "#FFB7DC", "#FFA1D1", "#FF84C3", "#FF57AC", "#FD1289", "#EC0078", "#D6006D", "#BB005F", "#9B014F"], 
			["#FCD6FE", "#FBBCFF", "#F9A1FE", "#F784FE", "#F564FE", "#F546FF", "#F328FF", "#D801E5", "#C001CB", "#8F0197"], 
			["#D4C89F", "#DAAD88", "#C49578", "#C2877E", "#AC8295", "#C0A5C4", "#969AC2", "#92B7D7", "#80ADAF", "#9CA53B"]]
	}
	option = $extend(option, opt);
	window["PP_core_colorPanel_data"] = {curColor:option.defaultColor};
	var colorHtml = ['<div><div style="padding:2px;"><div tag="colorBanner" style="cursor:pointer;margin:2px 0px;display:block; height:15px;width:30px;background-Color:'+option.defaultColor+';"></div></div></div><div tag="colorPanel" style="display : none;position:absolute;"><table style="font-size:0px;">'], content = $id(option.content);
	for(var i = 0, len = option.colorTable.length; i < len; i++){
		var colorRow = option.colorTable[i];
		colorHtml.push('<tr>');
		for(var j = 0, cLen = colorRow.length; j < cLen; j++){
			colorHtml.push('<td color="'+colorRow[j]+'" style="border:1px solid white;cursor:pointer;width:15px;height:15px;background-color:'+colorRow[j]+'"></td>');
		}
		colorHtml.push('</tr>');
	}
	colorHtml.push('</table></div>');
	content.innerHTML = colorHtml.join('');
	var colorPanel = $attr('tag', "colorPanel", content)[0], colorBanner = $attr('tag', "colorBanner", content)[0];
	colorBanner.onclick = function(){
		clearTimeout(window["PP_core_colorPanel_data"].timeout);
		colorPanel.style.display = "block";
	}
	/* 颜色板移出 */
	colorPanel.onmouseout = function(e){
		var self = this;
		var e = e || window.event, src = e.target || e.srcElement, color = src.getAttribute('color');
		if(color){
			src.style.border = "1px solid white";
		}
		window["PP_core_colorPanel_data"].timeout = setTimeout(function(){
			self.style.display = "none";																 
		}, 500);		
	}
	/* 颜色版滑过 */
	colorPanel.onmousemove = function(e){
		clearTimeout(window["PP_core_colorPanel_data"].timeout);
		var e = e || window.event, src = e.target || e.srcElement, color = src.getAttribute('color');
		if(color){
			if(PP.miniIndex.isIE){
				src.style.border = "1px groove white";
			} else {
				src.style.border = "1px solid black";	
			}		
		}
	}
	/* 点击颜色版 */
	colorPanel.onclick = function(e){
		var e = e || window.event, src = e.target || e.srcElement, color = src.getAttribute('color');
		if(color){
			window["PP_core_colorPanel_data"].curColor = color;
			this.style.display = "none";
			colorBanner.style.backgroundColor = color;
		}
	}
	return {
		dispose : function(){
			$destoryDomEvents(colorPanel);
			colorBanner = colorPanel = null;
		}
	}
};

function $mouseouter(option){
    var opt={
        title:null,//dom
        content:null,//dom
        outFunc:function(){
            $addClass(opt.content,"h");
        },
        timer:100,
        intr:null
    };
    for(var k in option){
        opt[k]=option[k];
    };
    
    $mouseout(opt.title,outFunc);
    $mouseover(opt.content,overFunc);
    $mouseout(opt.content,outFunc);
    
    function overFunc(){
        clearTimeout(opt.intr);
        opt.intr = null;
    }
    
    function outFunc(){
        opt.intr=setTimeout(function(){
            opt.outFunc();
        },opt.timer);
    }    
}

function $remindMessage(obj) {
	  //单个商品的短信提醒功能
	  //参数:option = {cid:"",//商品IDleft: 0, //当前位置离左边框的位移 top: 0	//当前位置离顶部的位};
        var option = {
			cid:"",//商品ID
            left: 0, //当前位置离左边框的位移
            top: 0,	//当前位置离顶部的位移	
			currentFloatWindow:null,//保存当前浮动窗体的引用
			currentUserName:"",//当前登录用户
			openSmsUrl: "http://my.paipai.com/user/subscribe_phone.shtml?src=1"//开通手机短息服务页面地址
        };
        for (var i in obj) {
            option[i] = obj[i];
        }
        option.left = (option.left == 0 ? ($getPageScrollWidth() + $getWindowWidth()/ 2 - 200): option.left);
        option.top = (option.top == 0 ? ($getPageScrollHeight() + $getWindowHeight()/2 - 200): option.top);
        window["remindSmsOption"] = option;
		
        //模板
        var template = {openSms:'<div class="box_content"><div class="box_hint_normal"><span class="icon msg3-icon-info"></span><div class="hint_content  phone_hint_content"><p class="hint_title"><strong>对不起，你未开通<span>拍拍手机短信服务</span>，暂时无法设置短信提醒。</strong></p><div class="hint_op  pmarginbottom"><p>开通拍拍手机短信服务，您可以：</p><p>1.<span class="fontBold"><span>免费设置</span>短信提醒功能</span></p><p>2.<span class="fontBold"><span>免费订阅</span>短信内容</span></p><p class="textindent">发货提醒、投诉处理提醒、中差评处理反馈、规则变更...</p><p class="ppaddingtop"><button id="btnOpenSms">立即开通</button><span class="hint_op_tiips1">开通后返回本页面设置短信提醒</span></p></div></div></div></div>',
        confirmSms : '<div class="box_content"><div class="box_hint_normal"> <span class="icon msg3-icon-info"></span><div class="hint_content  phone_hint_content"><p class="hint_title"><strong>请在新打开的<span>拍拍手机短信服务</span>网页中完成开通。</strong></p><div class="hint_op"><p class="ppaddingtop"><button class="phone_hint_content_btn_long" id="btnSetSms">已开通，设置短信提醒</button><button class="phone_hint_content_btn_long" id="btnReopenSms">未开通，返回重新开通</button></p></div></div></div></div>',
        setSms : '<div class="box_content "><div class="phone_tips_box"><p>尊敬的{#userName#}：</p><p class="textindent"><!--您开通拍拍手机短信服务的手机号码为：158*****555，-->提醒手机短信将会在设置的时间发送到您的设定的手机。</p></div><div class="phone_tips_commander" id="phone_tips_commander"><p><span>提醒时间：</span><span class="colright"><span><input type="radio" time="10" name="rdTime">提前10分钟</span><span><input type="radio" name="rdTime" time="30">提前30分钟</span><span><input type="radio" time="60" name="rdTime">提前60分钟</span></span></p><!--<p><span>短信内容：</span><span class="colright">你的商品降价拉，好便宜呀，快行动！</span></p>--><p class="phone_tips_commander_btn"><button id="btnConfirmSms">设置提醒</button><span><a href="#" id="btnCancelSms">取消</a></span></p></div></div></div>',
        successSms : '<div class="box_content "><div class="box_hint_normal"> <span class="icon msg3-icon-right"></span><div class="hint_content phone_hint_content"><p class="hint_title"><strong>短信提醒设置成功！</strong></p><p>短息提醒将会<span class="beforemin">提前{#time#}分钟</span>发送到您设定的手机。</p><div class="hint_op"><button id="btnCloseWindow">关闭窗口</button></div></div></div></div>'}

        //打开新浮窗
        function openFloatWindow(template) {
            return $floatTip({ width: "500", cover: false, style: 'stand', title: "设置短信提醒", html: template, left: window.remindSmsOption.left, top: window.remindSmsOption.top });
        };

        //事件处理函数映射表
        var handleMap = {
            "btnConfirmSms": function(event) {
                //设置提醒的相关动作
				var time = getRemindTime();
				if(time == ""){
					alert("请选择提醒时间！");
					return ;
				}
				$loadScript("http://ext.paipai.com/oadsms/subscribeitem?cid="+window.remindSmsOption.cid+"&time="+time);
            },
            "btnCancelSms": function (event) {
                //关闭浮窗
                window.remindSmsOption.currentFloatWindow.close();
            },
            "btnCloseWindow": function (event) {
                //关闭浮窗
                window.remindSmsOption.currentFloatWindow.close();
            },
            "btnOpenSms": function (event) {
                //打开新页面，开通手机短信服务
                window.open(window.remindSmsOption.openSmsUrl);
                //关闭当前浮窗
                window.remindSmsOption.currentFloatWindow.close();
				//打开新浮窗,用于确认用户已经开通短息服务
				var floatWindow = openFloatWindow(template.confirmSms);	
				 //给确认短息服务模板中的“已开通，设置短信提醒”按钮添加事件处理
				bindEvent("btnSetSms",floatWindow);
				//给确认短息服务模板中的“未开通，返回重新开通”按钮添加事件处理  
				bindEvent("btnReopenSms",floatWindow);
				
            },
            "btnSetSms": function (event) {
                //关闭当前浮窗
                window.remindSmsOption.currentFloatWindow.close();
                //打开新浮窗,提供用户设置短信提醒的功能
				$loadScript("http://ext.paipai.com/oadsms/getmqqinfo?cid="+window.remindSmsOption.cid);
            },
            "btnReopenSms": function (event) {
                //打开新页面，开通手机短信服务
                window.open(window.remindSmsOption.openSmsUrl);
            }
        };

        //绑定相关按钮的时间处理函数
        function bindEvent(id,floatWindow) {
            var e = $id(id);
            if (e) {
				window.remindSmsOption.currentFloatWindow = floatWindow;
                $addEvent(e, "click", handleMap[id]);
            }
        };
		
		//获取短信提醒模板中设定的时间
		function getRemindTime(){
			var o = $id("phone_tips_commander");	
			if(!o){return "";}
			var checkList = o.getElementsByTagName("input");
			for(var i=0,len=checkList.length;i<len;i++){
				if(checkList[i].type=="radio" && checkList[i].checked){
					return 	checkList[i].getAttribute("time");
				}	
			}
			return "";
		};
	
		//获取用户订阅资料回调函数
        window.getMqqInfoCallBack = function (userInfoMqq) {
			if(!userInfoMqq || userInfoMqq.i_ret != 0){
				alert("系统出错，获取商品信息失败，请重试！");
				return ;
			}
			
			window.remindSmsOption.currentUserName = userInfoMqq.nickname;
			//已经开通短信服务,但未开通短信提醒功能
            if (userInfoMqq.state == 0) {
                //打开新浮窗,提供用户设置短信提醒的功能
                var floatWindow = openFloatWindow(template.setSms.replace("{#userName#}",window.remindSmsOption.currentUserName));
                //给设置短信提醒模板中的“取消”按钮添加事件处理函数
                bindEvent("btnCancelSms",floatWindow);
                //给设置短信提醒模板中的“设置提醒”添加事件处理函数  
                bindEvent("btnConfirmSms",floatWindow);
            }
            //未开通短信服务
            else{
				//展开浮窗,提示用户需要开通短信服务
                var floatWindow = openFloatWindow(template.openSms);
                //给提示用户开通短信服务模板中的"立即开通"按钮添加时间处理函数
                bindEvent("btnOpenSms",floatWindow);
            }
        };
		
		//设置短信提醒回调函数
		window.subscribeItemCallBack = function(subscribe){
			if(!subscribe || subscribe.i_ret == -2){
				alert("设置短息提醒失败！");
				return ;
			}
			//关闭浮窗
            window.remindSmsOption.currentFloatWindow.close();
            //打开新浮窗,提示短信提醒设置成功
            var floatWindow = openFloatWindow(template.successSms.replace(/{#time#}/gi,subscribe.time));
            bindEvent("btnCloseWindow",floatWindow); 
		};

		$$(document).ready(function(){
		//显示登录框
        $loginFrame({ type: 'func', check: false, model: false, x: window.remindSmsOption.left, y: window.remindSmsOption.top, action: function () {
                $loadScript("http://ext.paipai.com/oadsms/getmqqinfo?cid="+window.remindSmsOption.cid);
            }
		});
		});
    };

function $keywordEditor(opt){
	//{ constKws: arrKey, begin: 0, remain: 200 - len }
	var option = {
		constArray : [],	//已经使用的关键词数组
//		begin : 0,	
		total : 200,
		remain : 200,		//剩余输入关键词个数
		usedTxt : null,		//正在使用个数文本
		remainTxt : null,	//剩余输入个数文本
		editObj : null,		//编辑框
		usedKws : {},		//正在使用的关键词
		constKws : {},		//已经使用过的关键词
		spliter: window.attachEvent ? '\r\n' : '\n', /* S 关键字编辑相关内容 */
		afterInput : function(){}
	}
	option = $extend(option, opt);
	//设置关键字可以输入的字数提示（去重）
	function setKWNum(l) {
		option.usedTxt.innerHTML = l;
		option.remainTxt.innerHTML = option.remain - l;
	};
	//整理输入框的文字，去掉空行和关键字前后的空格
	function refreshKWEdit() {
		var data = getNoEmptyData(true);
		option.editObj.value = data.text;
	};
	function refreshKWNum() {
		setKWNum(getNoEmptyData(false).arr.length);
		option.afterInput();
		//getCompareKeywordListFromMain();
	};
	//获取输入的关键词
	function getNoEmptyData(unique) {
		var rtn = {}, arr = (option.editObj.value.split('\n') || []), l = arr.length, i, newarr = [], key;
		//重新设置全局变量
		option.usedKws = {};
	
		for (i = 0; i < l; i++) {
			key = arr[i].replace(/(^\s*)|(\s*$)/g, '');
			if (key) {
				if (!unique || (!option.usedKws[key] && !option.constKws[key])) {	//增加一个对关键词列表内容的判断,不仅限于输入关键词的文本框
					newarr.push(key);
					option.usedKws[key] = 1;
				}
			}
		}
		//多于200个关键词的时候去掉200后的关键词
		var capacity = option.remain;
		if (newarr.length > capacity) {
			for (i = capacity; i < newarr.length; i++) {
				option.usedKws[newarr[i]] = 0;
			}
			newarr.length = capacity;
		}
		//设置关键字可以输入的字数提示
		setKWNum(newarr.length);
	
		if (newarr.length > 0) {
			rtn.text = (newarr.join(option.spliter) + option.spliter);
			rtn.arr = newarr;
		} else {
			rtn.text = '';
			rtn.arr = [];
		}
		return rtn;
	};
	
	//初始化关键字编辑器
	(function initKWEdit() {
		var _kw = option.editObj;
		var constKws = option["constKws"] || [];
		var l = option.constArray.length;
	
		if (!_kw) {
			return false;
		}
		_kw.oninput = refreshKWNum;
		_kw.onkeyup = refreshKWNum;
		_kw.onblur = function () {
			refreshKWEdit();
//			if (PP.express.getCompareKeywordListFromMain) {
//				PP.express.getCompareKeywordListFromMain();
//			}
		};
		refreshKWEdit();
		//记录已存在的关键字
		for (i = 0; i < l; i++) {
			option.constKws[option.constArray[i]] = 1;
		}
		//设置控件页面表现
		option.usedTxt.innerHTML = 0;
		option.remain = option.total - option.constArray.length;
		option.remainTxt.innerHTML = option.remain;
		//不可添加的情况下，禁用输入和保存按钮
//		if (option["remain"] == 0) {
//			$id('save_edit_btn').disabled = true;
//		};
		_kw = null;
	})();
	
	return {
		//添加关键词
		addKeyWord : function (kw) {
			//增加关键字
			var textarea_kw = option.editObj;
			if ($$.isArray(kw)) {
				var i, l = kw.length;
				for (i = 0; i < l; i++) {
					if (option.usedKws[kw[i]] || option.constKws[kw[i]]) {//已经存在此关键词
						continue;
					} else {
						option.usedKws[kw[i]] = 1;
						textarea_kw.value += (kw[i] + option.spliter);
					}
				}
				refreshKWNum();
				return true;
			} else {
				if (option.usedKws[kw] || option.constKws[kw]) {//已经存在此关键词
					return false;
				} else {
					option.usedKws[kw] = 1;
					textarea_kw.value += (kw + option.spliter);
					refreshKWNum();
					return true;
				}
			}
		}	
	}
};

/**
* 将时间字符串转为中文
* @str : 时间字符串
* @return : []
*/
$timeStrToReadable = function (str, showEmpty) {
    return timeArrToReadable($timeStrToArr(str));
    /**
    * 将时间数组翻译成内容
    *
    * @data ：时间数组
    * @return ：string
    */
    function timeArrToReadable(data) {
        var hc = [];
        var label = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
        if (!data || !data.length) {
            data = [];
            for (var i = 0, len = 7; i < len; i++) {
                data.push([]);
            };
        }
        for (var i = 0; i < data.length; i++) {
            var dayHs = [];
            var item = data[i];
            if (item.length > 0) {
                for (var j = 0; j < item.length; j++) {
                    //x.5或整数
                    var range = item[j];
                    var sh = parseInt(range.start);
                    var eh = parseInt(range.end);
                    dayHs.push('' + sh + (range.start > sh ? ':30' : ':00') + '-' + eh + (range.end > eh ? ':30' : ':00') + '');
                }
                hc.push(label[i] + '（' + dayHs.join(',') + '）');
            } else if (showEmpty) {
                hc.push(label[i]);
            }
        }
        return hc;
    }
};

function $timeStrToArr(str) {
        str = str ? str : '';
        //str = str.replace(/0*$/, '');
        var start = 0, end = 0;
        var hlist = [];
        for (var i = 0, len=7; i < len; i++) {
            hlist.push([]);
        };
    
        var curpos = 0;
        var hst = 0;
        var f = function(start, end) {
            start = ( (start - 1) % 48) / 2;
            end = ((end -1) % 48 + 1) / 2;
            var o = {'start': start, 'end': end};
            return o;
        }
        for(var i=0, len=str.length; i<len; i++) {
            var v = str.slice(i, i+1);
            if(v == 1 && start == 0 ) {
                start = end = i+1;
                continue;
            }
    
            if(v == 1 && start !=0 ) {
                end = i+1;
            }
             //终结一次: 遇到0 ， 最后一个数0, 逢48
            if((v == 0 && start !=0) || (i== (len-1) && start != 0) || ((i+1)%48 == 0 && start!=0) ) {
                //var pos = ((i+1)%48 == 0 && curpos<6) ? curpos - 1 : curpos;
                var pos = parseInt((start-1)/48);
                hlist[pos].push(f(start, end));
                start = 0, end=0;
                continue;
            }
        }
        // 最后一个数为1但是长度不为336的情况,
        if(start !=0) {
            var pos = parseInt((start-1)/48);
            hlist[pos].push(f(start, end));
        }
        return hlist;
    }

function $getItemsBusiness(itemList,callback){		
	//查询商品的类目，所属业务id
	var ItemBusiness={};
	//查询类目id
	$loadScript('http://my.paipai.com/cgi-bin/item_view/item_list?sItemid='+itemList.join('|'));
	window.itemCommInfoCallBack=function(items){
		var leaves=[];
		for(var i=0;i<items.length;i++){
			ItemBusiness[items[i].strItemId]={leafClass:items[i].dwLeafClassId};
			leaves.push(items[i].dwLeafClassId);
		}
		if(leaves.length>0){
			//查询业务
			$loadScript('http://auction1.3c.paipai.com/getMetaInfoByMetaIds.xhtml?metaIds='+leaves.join(','));
			window._PP_metaBusiness=function(data){
				for(var i in ItemBusiness){
					var item=ItemBusiness[i];
					if(data[item.leafClass]){
						item.biz=data[item.leafClass].bizType;
					}
				}
				if(callback){
					callback(ItemBusiness);
				}
			}
		}
	}
}

function $addToken(url){
	var token=$getToken();
	return token==""?url:url+(url.indexOf("?")!=-1?"&":"?")+"g_tk="+token;
}

function $setSelectedItem(name,selectedValue){
    //专门用于check和radio设置选择项，设置成功则返回true;
    var objs=document.getElementsByName(name),
        flag=false;
    for(var i=0,len=objs.length;i<len;i++){
        var t=objs[i];
        if(t.tagName.toLowerCase()=="input"){
            if((t.type.toLowerCase()=="checkbox" || t.type.toLowerCase()=="radio") ){    //设置单选复选框的值
                if(t.value==selectedValue){
                    t.checked=true;
                    flag=true;
                }
            }
        }
    };
    return flag;
};

function $name(name){
	return document.getElementsByName(name);
}

function $getToken(){
	var skey=$getCookie("skey"),
		token=skey==null?"":$time33(skey);
	return token;
}

function $stopBubble(ev){
　　var evt = ev || window.event;
　　if (window.event) {// IE
　　　　evt.cancelBubble = true;
　　} else {// Firefox
　　　　evt.stopPropagation();
　　}
}

/***********  End Core Function  ***********/
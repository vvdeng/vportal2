//  加入收藏 <a onclick="$addFavorite(window.location,document.title)">加入收藏</a>
$addFavorite=function(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(""+sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, ""+sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
//设为首页 <a onclick="$setHome(this,window.location)">设为首页</a>
$setHome=function(obj,vrl){
        try{
                obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
        }
        catch(e){
                if(window.netscape) {
                        try {
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                        }
                        catch (e) {
                                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                        }
                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        prefs.setCharPref('browser.startup.homepage',vrl);
                 }
        }
}
$bannerSlide = function (bannerId) {
	var currentIndex = 0;
	var canChange=1;
	var timeoutId = 0;
	var clickRunning=0;
	var len=$$("#" + bannerId + " .picSel li").size();
	$$("#" + bannerId + " .picSel li").click(function () {
		if(clickRunning==1||canChange==0){
			return;
		}
		clickRunning=1;
	//	clearTimeout(timeoutId);
		clearInterval(timeoutId);
		currentIndex=parseInt($$(this).attr("idx")) - 1;
		$$(this).siblings().removeClass("sel");
		$$(this).addClass("sel");
		var selPic=$$("#" + bannerId + " .picList").children(":eq(" + currentIndex + ")");
		
	//	selPic.show();
	//	selPic.siblings().hide();
		canChange=0;
		selPic.addClass('fix').fadeIn(1000,function(){
		
			selPic.siblings().hide();
			selPic.removeClass('fix');
			canChange=1;
		});
		
	//	timeoutId = setTimeout(timeAction, 5000);
	    timeoutId = setInterval(timeAction, 5000);
	    clickRunning=0;
	});
	function timeAction() {
//	alert(currentIndex);
		currentIndex = (currentIndex + 1) % len;
		$$("#" + bannerId + " .picSel ul").children(":eq(" + currentIndex + ")").click();
	//	timeoutId = setTimeout(timeAction, 5000);
	}
	// timeoutId = setTimeout(timeAction, 5000);
	timeoutId = setInterval(timeAction, 5000);
};
$cycleMove=function (areaId){
 //  $$("#"+areaId+" .slider").after("<div class='sliderBk'></div>");
	var area=$$("#"+areaId);
	area.css("position","relative");
	var areaSlider=$$("#"+areaId+">div:eq(0)");
	var areaLi=$$("#"+areaId+" li");
	var parentDivWidth=area.width();
	var sliderDivHeight=area.height();
	var sliderDivWidth=areaLi.size()*areaLi.width(); 
	areaSlider.width(sliderDivWidth);
	if(sliderDivWidth<=parentDivWidth){
		return;
	}
	var sliderBk=areaSlider.clone();//$$("<div class='slider'></div>");
	sliderBk.appendTo("#"+areaId);//.html($$("#"+areaId+" .slider").html());
	sliderBk.css("top",sliderDivHeight);
	sliderBk.width(sliderDivWidth);
//	$$("#"+areaId+" .sliderBk").html($$("#"+areaId+" .slider").html());
//	alert($$("#"+areaId+">div:eq(1)").attr("class"));
	var use=1,useBk=0;
		
	var left=0,leftBk=parentDivWidth;
	function ta(){
		//alert($$("#"+areaId+" .slider").width());
		 if(use==1)
		 {
			 areaSlider.css("left",left+"px");
			 left=left-1;
		
			 if(left<-sliderDivWidth+parentDivWidth){
		
				useBk=1;
				
			 }
			 if(left<-sliderDivWidth){
				left=parentDivWidth;
				use=0;
			 }
		}
		if(useBk==1){
			
		//	$$("#"+areaId+" .sliderBk").show();
			sliderBk.css("top","0px");
			sliderBk.css("left",leftBk+"px");
			leftBk=leftBk-1;
			 if(leftBk<-sliderDivWidth+parentDivWidth){

				
				use=1;
				
			 }
			 if(leftBk<-sliderDivWidth){
				leftBk=parentDivWidth;
				useBk=0;
			 }
		}
	}
	var tf=setInterval(ta,15);
	area.mouseover(function(){
	clearInterval(tf);
	});
	area.mouseout(function(){
	tf=setInterval(ta,30);
	});	
}
//bubble
$bubble=function (areaId){
	var area=$$("#"+areaId);
	var bubbleTop=0;
    var liSize=$$("#"+areaId+" li").size();

	var msOut=1,timeoutRunned=0;
	var bubbleIndex=0;
	var bubbleHeight=area.height();
	var bubbleCur=$$("#"+areaId+"  li:eq("+bubbleIndex+")");
	var bubbleNext=$$("#"+areaId+"  li:eq("+(bubbleIndex+1)+")");

	bubbleNext.show();
	bubbleNext.css("top",bubbleHeight);

	var ta,ta0;
	function bubbleWait(){
		ta=setInterval(bubbleAction,100);
	}
	function bubbleAction(){

	bubbleCur.css("top",bubbleTop);
	bubbleNext.css("top",bubbleHeight+bubbleTop);
	bubbleTop--;

	if(bubbleTop<=-bubbleHeight){
		clearInterval(ta);
		bubbleTop=0;
	bubbleIndex=(bubbleIndex+1)%liSize;
	 bubbleCur=$$("#"+areaId+"  li:eq("+bubbleIndex+")");
	 bubbleNext=$$("#"+areaId+"  li:eq("+(bubbleIndex+1)%liSize+")");

	bubbleNext.show();
	bubbleNext.css("top",bubbleHeight);
	if(msOut==1){
		timeoutRunned=1;
		ta0=setTimeout(bubbleWait,2000);
	}
	else{
		timeoutRunned=0;
	}

	}

	}


	area.mouseover(function(){
	if(msOut==1){
		msOut=0;
	//	clearInterval(ta);
	//	clearInterval(ta0);
	}
	});
	area.mouseout(function(){
	if(msOut==0){
		msOut=1;
		if(timeoutRunned==0)
		{    
			timeoutRunned=1;
			ta=setInterval(bubbleAction,100);
		}
	}//alert("t");
	});
	ta=setInterval(bubbleAction,100);
}
$imageSubmit=function(src){
  
  var imgPath=$$(src).val();
  if( !/.*(jpg|jpeg|bmp|png)$/i.exec(imgPath)){
  	alert("请上传jpg、jpeg、bmp、png格式图片");
  	return false;
  } 
}
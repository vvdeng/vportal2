<%@ page language="java" contentType="text/html;charset=utf-8"%>
<script type="text/javascript">
$namespace("Portal.header");
Portal.header.menuAction=function(){
	function timeAction(){
		$$(".subMenu").css("visibility","hidden");
		$$(".upArrow").hide();
	}
	var ta=null;
	$$(".subMenu").css("visibility","hidden");

	$$(".mainMenu li").mouseover(function(){
		clearTimeout(ta);
		timeAction();
		var mid=$$(this).attr("mid");
		var hasSub=$$(this).attr("hasSub");
		if(mid&&hasSub){
			var mainMenuLeft=parseInt($$(this).attr("mainMenuLeft"));
			
			$$(".upArrow").css("left",(53+mainMenuLeft)+"px");
			$$(".upArrow").show();
			$$(".subMenu[mid='"+mid+"']").css("visibility","visible");
			
		//	alert($$(".mainMenu li[mid='"+mid+"']").position().left);
		//	$$(".subMenu[mid='"+mid+"']").css("left",mainMenuLeft+"px");
		}
	});
	$$(".mainMenu li").mouseout(function(){
		var mid=$$(this).attr("mid");
		if(mid){
	//	$$(".upArrow").hide();
	//	$$(".subMenu[mid='"+mid+"']").css("visibility","hidden");
		ta=setTimeout(timeAction,2000);
		}
	});
	var liWidth=$$(".subMenu li:eq(0)").width();
	var menuWidth=$$("#menu").width();
	$$(".subMenu").each(function(index){
		var mid=$$(this).attr("mid");
		var mainMenu=$$(".mainMenu li[mid='"+mid+"']");
	    var posLeft=mainMenu.position().left;
	   	mainMenu.attr("mainMenuLeft",posLeft);
	   	mainMenu.attr("hasSub","true");
		var childrenSize=$$(this).children().size();
		
		var width=(liWidth+1)*childrenSize-1;//+1：增加右边界宽度 -1：最后一个没有右边界
		if(posLeft+width>menuWidth){
			posLeft=menuWidth-width;
		}
		$$(this).css("left",posLeft+"px");
		$$(this).width(width);
	});
	$$(".subMenu").mouseover(function(){
		clearTimeout(ta);
	});
	$$(".subMenu").mouseout(function(){
		ta=setTimeout(timeAction,2000);
	});
}
</script>
<div id="header">
	<div id="logo">
		<img src="${pageContext.request.contextPath}/images/logo.jpg"
			/ width="616px" height="100px">
	</div>
	<div id="tips">
		<ul>
			<li>
				<img src="${pageContext.request.contextPath}/images/t-1.jpg"
					height="19px" width="19px" />
				<span onclick="$setHome(this,window.location)">设为首页</span>
			</li>
			<li>
				<img src="${pageContext.request.contextPath}/images/t-2.jpg"
					height="19px" width="19px" />
				<span onclick="$addFavorite(window.location,document.title)">加入收藏</span>
			</li>
			<li>
				<img src="${pageContext.request.contextPath}/images/t-3.jpg"
					height="19px" width="19px" />
				<span>联系我们</span>
			</li>
			<li class="lang">
				中文
			</li>
			<li class="lang">
				English
			</li>
		</ul>
	</div>
	<div id="search">
		<input class="text" type="text">
		<input class="btn" type="image"
			src="${pageContext.request.contextPath}/images/search_btn.gif.png" />
	</div>
</div>
<div class="clear"></div>
<div id="menuBar">
	<div id="menu">
		<ul class="mainMenu">
			<li>
				<a href="${pageContext.request.contextPath}/index.jhtml">首页</a>
			</li>
			<c:forEach var="menu" items="${menuList}" varStatus="status">
				<li class="${topMenu.id==menu.id?'sel':'' }" mid="${menu.id}">

					<a
						href="${pageContext.request.contextPath}/channel/list.jhtml?cid=${menu.id }&type=${menu.type}">${menu.title
						}</a>
				</li>
			</c:forEach>
		</ul>
		<c:forEach var="firstMenu" items="${metaMap}" varStatus="status">
			<c:if test="${firstMenu.subMenuListSize>0 }">
				<ul class="subMenu" mid="${firstMenu.id}">
					<c:forEach var="secondMenu" items="${firstMenu.subMenuList}"
						varStatus="subStatus">
						<li <c:if test="${subStatus.last}">class="tail"</c:if>>
							<a href="${pageContext.request.contextPath}/channel/list.jhtml?cid=${secondMenu.id}">${secondMenu.title}</a>
						</li>

					</c:forEach>
				</ul>
			</c:if>
		</c:forEach>
		<!-- 
		<ul class="subMenu" mid="1">
			<li>
				团队简介
			</li>
			
			<li>
				团队简介
			</li>
			
			<li>
				团队简介
			</li>
		</ul>
		  -->
		<div class="upArrow h"></div>
	</div>
</div>
<script type="text/javascript">

Portal.header.menuAction();
</script>
<!--头部结束 -->
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${selMenu.title }</title>
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/common.css" />
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/header.css" />
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/list.css" />
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/bottom.css" />
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/resources/paginator.css" />
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/resources/jquery.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/resources/core.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/scripts/base.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/scripts/list.js" /></script>
	</head>
	<body>
		<%@include file="/WEB-INF/jsp/common/header.jsp"%>
		<div id="mainPid">
			<img
				src="${pageContext.request.contextPath}/images/list-main-pic.jpg"
				width="1004px" height="180px">
		</div>
		<div id="main">
			<%@include file="/WEB-INF/jsp/common/sidebar.jsp"%>
			<div id="list">
				<div id="listHeader">
					${selMenu.title }
				</div>
				<div id="nav">
					当前位置：首页&nbsp;&gt;&nbsp;
					<c:if test="${selMenu.level==2}">${topMenu.title}&nbsp;&gt;&nbsp;</c:if>
					${selMenu.title }
				</div>

				<hr />
				<ul>
					
					<c:forEach var="news" items="${pageModel.page.list }">
						<li>
							<a href="${pageContext.request.contextPath}/content/detail.jhtml?cid=${news.id}&type=${param.type}">${news.title}</a><span class="time">2013-01-01</span>
						</li>
					</c:forEach>
				</ul>
			</div>
			<div id="page"></div>
			<div class="clear"></div>		
		</div>
		<script type="text/javascript">

		Portal.list.init();
		var opt={
		keyId:Math.random(),	//当前对象的唯一标记码
		pageCount:${pageModel.pageNum},	//总页码
		currentPage:cid=${param.pid==null?1:param.pid},	//当前页码
		itemCount:${pageModel.page.count},	//总记录条数
		more:false,	//是否有下五页存在
		domList:[$("#page")],		//内容输出区域的id列表，jquery语法
		type:"full",	//控制条样式
		action:"url",	//点击分页的操作类型：url、func
		url:"${pageContext.request.contextPath}/channel/list.jhtml?cid=${param.cid}&type=${param.type}&pid={#pageId#}",	//链接地址格式模板，当action=url时才有效，页码标签{#pageId#}
		func:function(pageId,opt){return true;},		//点击链接时的处理函数，参数为页码id和对象本身，当action=func时有效
		onInit:function(pageId,opt){return true;}
		};
		$page(opt);
		</script>	
		<%@include file="/WEB-INF/jsp/common/bottom.jsp"%>
	</body>

</html>

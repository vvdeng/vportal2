<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>后台管理</title>
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/admin/common.css" />
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/admin/head.css" />
		<script>
		 self.parent.frames["leftFrame"].location="${pageContext.request.contextPath}/admin/side.xhtml?id=${topSysMenuList[0].id}&type=${topSysMenuList[0].type}&operation=${topSysMenuList[0].operation}";
		</script>
	</head>
	<body>
		<div id="logo"></div>
		<div id="right">
			<div id="simpleInfo">
				<div id="welcome">
					您好，
				</div>
				<div id="logout">
					<a href="${pageContext.request.contextPath}/admin/logout.jhtml">退出</a>
				</div>
				<div id="message">
					您有0条未读消息
				</div>
				<div id="gotoIndex">
					<a href="#">【查看首页】</a>
				</div>
				
			</div>
			<div id="menu">
				<ul>
					<c:forEach var="topMenu" items="${topSysMenuList}"
						varStatus="status">
						<li>
							<a href="${pageContext.request.contextPath}/admin/side.xhtml?id=${topMenu.id}&type=${topMenu.type}&operation=${topMenu.operation} "
								target="leftFrame">${topMenu.title }</a>
						</li>
						<c:if test="${!status.last }">
							<li class="sep"></li>
						</c:if>
					</c:forEach>

				</ul>
			</div>
		</div>

	</body>
</html>
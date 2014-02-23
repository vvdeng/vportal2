<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/styles/admin/common.css"/>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/styles/admin/left.css"/>
		<title>admin-left</title>
		<script>
		 self.parent.frames["mainFrame"].location="${pageContext.request.contextPath}${defaultHref}";
		</script>
	</head>
	<body class="lbody">
		<div id="timeZone">
			现在时间：2012年8月13日 星期一
		</div>
		<div id="opt">
		
			<ul>
				<c:if test="${sideForm.type==1}">
				<c:forEach var="menu" items="${menuList}">
				<li>
					<a href="${pageContext.request.contextPath}${menu.href}" target="mainFrame">${menu.title}</a>
				</li>
				</c:forEach>
				</c:if>
				
			</ul>
		</div>
	</body>
</html>
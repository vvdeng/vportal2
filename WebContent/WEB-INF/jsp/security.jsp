<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<html>
	<head>
		<title>门户管理系统</title>		
		<ui:config />
	</head>
	<body>
		<aa:zone name="dataZone">
			<ui:panel title="访问受限">
					<c:if test="${resultcode==-1}">
						您长时间未操作，已被退出，请重新<a href="javascript:login()">登陆</a>。
					</c:if>
					<c:if test="${resultcode==-2}">
						权限不足，请联系管理员
					</c:if>
			</ui:panel>
		</aa:zone>
	</body>
</html>
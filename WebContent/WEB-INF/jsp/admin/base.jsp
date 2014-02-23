<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>后台管理</title>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/styles/admin/common.css" />
	</head>
	<frameset rows="70px,*" cols="*" frameborder="no" border="0" framespacing="0">
		<frame src="head.xhtml" name="topFrame" scrolling="No" noresize="noresize" name="topFrame" />
		<frameset cols="215px,*" frameborder="no" border="0" framespacing="0">
			<frame  scrolling="No" noresize="noresize" name="leftFrame" />
			<frame  name="mainFrame" name="mainFrame" />
		</frameset>
	</frameset>
</html>
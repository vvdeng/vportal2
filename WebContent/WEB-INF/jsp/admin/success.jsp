<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<head>
<meta http-equiv="Refresh" content="3;url=${pageContext.request.contextPath}${successForm.backUrl}">
</head>
<body>
	<ui:panel height="100%" type="simple"  >
	<ui:layout direction="v">
	<ui:panel type="simple" align="center"  height="25%"></ui:panel>
		<ui:panel type="simple" align="center" ><img src="${pageContext.request.contextPath}/resources/OK128.jpg"></ui:panel>
		<ui:panel type="simple" align="center" >
		
		<h1>${successForm.info}<h1>
		</ui:panel>
		<ui:panel type="simple" align="center" ><ui:link href="${successForm.backUrl}">${successForm.label}</ui:link></ui:panel>
	</ui:layout>
	</ui:panel>
<body>
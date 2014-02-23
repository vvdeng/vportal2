<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<%@ taglib prefix="decorator"
	uri="http://www.opensymphony.com/sitemesh/decorator"%>
<html>
	<head>
		<title>门户管理系统</title>
		<!--  
		<link
			href="http://static.paipaiimg.com/life_v2/boss/boss.css?t=2010111092"
			type="text/css" rel="stylesheet" media="screen" />
		<link href="http://static.paipaiimg.com/life_v2/boss/treeview.css"
			type="text/css" rel="stylesheet" media="screen" />
		<link href="http://static.paipaiimg.com/module/credit.css "
			type="text/css" rel="stylesheet" media="screen" />
		-->
		
		<ui:config />
		<script>
				var UIAjax = PP.vfui.js.ajax;
				var UIForm = PP.vfui.js.form;
				var UIDialog = PP.vfui.js.dialog;
				function login() {	
					if (self.parent) {
						self.parent.window.location = "${pageContext.request.contextPath}/login.xhtml";
					} else {
						window.location = "${pageContext.request.contextPath}/login.xhtml";
					}
				}
		</script>
		<decorator:head />
	</head>
	<body <decorator:getProperty property="body.onload" writeEntireProperty="true" /> <decorator:getProperty property="body.class" writeEntireProperty="true" />>
		<decorator:body />
	</body>
</html>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<head>

</head>
<body>
	<aa:zone name="editNews">
		<ui:panel>
			<ui:form id="saveNews" name="saveNews" columns="2" labelWidth="120"
				columnWidth="30%,30%">
				<input type="hidden" id="id" name="id"  value="${news.id}" />
				<ui:formItem span="2" label="标题：">
					<ui:validator targetId="title" required="true"></ui:validator>
					<input type="text" id="title" name="title"  value="${news.title}" />
				</ui:formItem>
				<ui:formItem  label="作者：" span="2">
					<ui:validator targetId="author" required="true"></ui:validator>
					<input type="text" id="author" name="author" value="${news.author}" />
				</ui:formItem>
				<ui:formItem label="发表时间" span="2">
				<ui:calendar id="createTime" name="createTime" format="yy-MM-dd HH:mm:ss" value="${news.createTime}"/>
				</ui:formItem>
			</ui:form>
		</ui:panel>
	</aa:zone>
<body>
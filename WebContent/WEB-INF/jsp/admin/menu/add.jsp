<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<head>

</head>
<body>
	<aa:zone name="editMenu">
		<ui:panel>
			<ui:form id="saveMenu" name="saveMenu" columns="2" labelWidth="60"
				columnWidth="45%,45%">
				<input type="hidden" id="id" name="id" value="${menuForm.id}" />
				<ui:formItem label="名称：">
					<ui:validator targetId="title" required="true"></ui:validator>
					<input type="text" id="title" name="title" value="${menuForm.title}" />
				</ui:formItem>
				<ui:formItem label="隐藏：">
					
					<ui:checkbox  name="state" value="1" checked="${menuForm.state}"></ui:checkbox>
				</ui:formItem>
				<ui:formItem label="描述：">

					<input type="text" id="description" name="description"
						value="${menuForm.description}" />
				</ui:formItem>
				<ui:formItem label="父菜单：">
					<ui:combo name="parentId" data="${firstMenuList}"
						optionLabel="title" optionValue="id" value="${menuForm.parentId}">
						<ui:option value="0" selected="true">顶级菜单</ui:option>
					</ui:combo>
				</ui:formItem>

			</ui:form>

		</ui:panel>
	</aa:zone>
<body>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<head>
	<script>

</script>
</head>
<body>
	<aa:zone name="editSysMenu">
		<ui:panel>
			<ui:form id="saveSysMenu" name="saveSysMenu" columns="2"
				labelWidth="60" columnWidth="45%,45%">
				<input type="hidden" id="id" name="id" value="${sysMenuForm.id}" />
				<ui:formItem label="名称：">
					<ui:validator targetId="title" required="true"></ui:validator>
					<input type="text" id="title" name="title"
						value="${sysMenuForm.title}" />
				</ui:formItem>
				<ui:formItem label="隐藏：">

					<ui:checkbox name="state" value="1" checked="${sysMenuForm.state}"></ui:checkbox>
				</ui:formItem>
				<ui:formItem label="描述：">

					<input type="text" id="description" name="description"
						value="${sysMenuForm.description}" />
				</ui:formItem>


				<ui:formItem label="层级：">
					<ui:combo name="level" data="${sysMenuLevel}"
						value="${sysMenuForm.level}"
						onchange="Portal.levelClick(this,'parentId');">
					</ui:combo>
				</ui:formItem>
				<ui:formItem label="父菜单：">
					<ui:combo id="parentId" name="parentId"
						data="${sysMenuForm.level==null||sysMenuForm.level==1?'':(sysMenuForm.level==2?firstSysMenuList:secondSysMenuList)}"
						optionLabel="title" optionValue="id"
						value="${sysMenuForm.parentId}" disabled="${sysMenuForm.level==1}">
						<c:if test="${sysMenuForm.level==null||sysMenuForm.level==1}">
							<ui:option value="0" selected="true">顶级菜单</ui:option>
						</c:if>
					</ui:combo>
				</ui:formItem>
				<ui:formItem label="子级形式：">
					<ui:combo name="type" data="${sysMenuType}"
						value="${sysMenuForm.type}">
					</ui:combo>
				</ui:formItem>
				<ui:formItem label="操作：">

					<input type="text" id="operation" name="operation"
						value="${sysMenuForm.operation}" />
				</ui:formItem>
				<ui:formItem label="链接：">

					<input type="text" id="href" name="href"
						value="${sysMenuForm.href}" />
				</ui:formItem>
			</ui:form>

		</ui:panel>
	</aa:zone>
<body>
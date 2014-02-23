<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<script>
			$namespace("Portal")
			Portal.queryMenu = function(page) {
				if (typeof page == "undefined") {
					$id("queryForm").action = "${pageContext.request.contextPath}/admin/menu/list.xhtml";
				}
				else {
					$id("queryForm").action = "${pageContext.request.contextPath}/admin/menu/list.xhtml?" + page.queryString;
				}
				PP.vfui.js.ajax.refreshZone("queryForm");
			}
			Portal.refreshMenuDetail = function(menuId) {
				if ($id(menuId + "MenuDetailRow").style.display == 'block') {
					PP.vfui.js.ajax.refreshZoneByUrl("${pageContext.request.contextPath}/admin/menu/detail.xhtml?id=" + menuId, menuId + "menuDetail");
				}
			}
			Portal.addMenu = function() {
			
				PP.vfui.js.ajax.refreshZoneByUrl("${pageContext.request.contextPath}/admin/menu/add.xhtml", 'editMenu');
				PP.vfui.js.dialog.show('dialog');
			}
			Portal.editMenu = function(id) {
				PP.vfui.js.ajax.refreshZoneByUrl("${pageContext.request.contextPath}/admin/menu/edit.xhtml?id=" + id, 'editMenu');
				PP.vfui.js.dialog.show('dialog');
			}
			Portal.saveMenu = function() {
			//	var data = {url:'${pageContext.request.contextPath}/admin/menu/save.json', onSuccess:Portal.onSaveMenuSuccess, method:"post"};
			//	PP.vfui.js.ajax.submit("saveMenu", data);
				$id('saveMenu').submit();
			}
			Portal.onSaveMenuSuccess = function(responseJson) {
				var id = responseJson.data.id;
				PP.vfui.js.ajax.refreshZoneByUrl("${pageContext.request.contextPath}/admin/menu/list.xhtml",  "dataZone");
			}
		</script>
	</head>
	<body onload="Portal.queryMenu()">
		<ui:panel title="菜单查询" collapsible="true">
			<ui:form id="queryForm" name="queryForm" columns="2">
				<ui:formItem label="名称：">
					<ui:text name="title" />
				</ui:formItem>
				<ui:formItem label="父菜单：">
					<ui:combo name="parentId" data="${firstMenu.list}"
						optionLabel="title" optionValue="id">
						<ui:option value="0" selected="true">顶级菜单</ui:option>
					</ui:combo>
				</ui:formItem>
				<ui:formItem span="2">
					<ui:button label="查询" onclick="Portal.queryMenu();" />
					<ui:link href="/admin/menu/add.xhtml">新增</ui:link>
				</ui:formItem>
				<input type="hidden" name="id" value="" />
			</ui:form>
		</ui:panel>

		<aa:zone name="dataZone">
			<ui:table id="menuTable" model="${pageModel}" var="menu"
				defaultMsg="查询不到相关记录！" callback="Portal.queryMenu" showTitle="true">
				<ui:row>

					<ui:column title="名称" property="title" />
					<ui:column title="描述" property="description" />
					<ui:column title="详情">
						<ui:textColspan targetId="${menu.id}MenuDetailRow" showLabel="隐藏"
							hideLabel="展示" defaultHide="true"
							callback="Portal.refreshMenuDetail(${menu.id})" />
					</ui:column>
					<ui:column title="操作" width="300px">
						<ui:link href="/admin/menu/edit.xhtml?id=${menu.id}">
							编辑
						</ui:link>
						<ui:link href="/admin/menu/delete.xhtml?id=${menu.id}">
							删除
						</ui:link>
						<ui:link href="/admin/news/edit.xhtml?id=${news.id}">
							审核
						</ui:link>
					</ui:column>
				</ui:row>
				<ui:row-ext id="${menu.id}MenuDetailRow" style="display:none">
					<aa:zone name="${menu.id}MenuDetailRow">
					</aa:zone>
				</ui:row-ext>
			</ui:table>
		</aa:zone>

		<ui:dialog id="dialog" title="编辑内容" width="800" acceptLabel="保存"
			onAccept="Portal.saveMenu">

			<aa:zone name="editMenu">
			</aa:zone>

		</ui:dialog>
	</body>
</html>

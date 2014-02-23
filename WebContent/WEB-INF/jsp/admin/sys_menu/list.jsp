<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<script>

			$namespace("Portal");
			
			Portal.topSysMenuLevel="<option value='0'>顶级菜单</option>";
			Portal.firstSysMenuLevel="<c:forEach var='firstMenu' items='${firstSysMenuList}'><option value='${firstMenu.id}'>${firstMenu.title}</option></c:forEach>"
			Portal.secondSysMenuLevel="<c:forEach var='secondMenu' items='${secondSysMenuList}'><option value='${secondMenu.id}'>${secondMenu.title}</option></c:forEach>"			
			Portal.levelClick=function(src,selId){
				var level=$$(src).val();
				var sel=$$("#"+selId);
				if(level==1){
				    sel.attr('disabled',true);
					sel.html(Portal.topSysMenuLevel);
				}
				else if(level==2){
					sel.attr('disabled',false);
					sel.html(Portal.firstSysMenuLevel);
				}
				else {
					sel.attr('disabled',false);
					sel.html(Portal.secondSysMenuLevel);
				}
			}
			Portal.querySysMenu = function(page) {
				if (typeof page == "undefined") {
					$id("queryForm").action = "${pageContext.request.contextPath}/admin/sys_menu/list.xhtml";
				}
				else {
					$id("queryForm").action = "${pageContext.request.contextPath}/admin/sys_menu/list.xhtml?" + page.queryString;
				}
				PP.vfui.js.ajax.refreshZone("queryForm");
			}
			Portal.refreshSysMenuDetail = function(id) {
				if ($id(menuId + "SysMenuDetailRow").style.display == 'block') {
					PP.vfui.js.ajax.refreshZoneByUrl("${pageContext.request.contextPath}/admin/sys_menu/detail.xhtml?id=" + id, id + "sysMenuDetail");
				}
			}
			Portal.addSysMenu = function() {
				
				PP.vfui.js.ajax.refreshZoneByUrl("${pageContext.request.contextPath}/admin/sys_menu/add.xhtml", 'editSysMenu');
	
				PP.vfui.js.dialog.show('dialog');
				
			}
			Portal.editSysMenu = function(id) {
				PP.vfui.js.ajax.refreshZoneByUrl("${pageContext.request.contextPath}/admin/sys_menu/edit.xhtml?id=" + id, 'editSysMenu');
				PP.vfui.js.dialog.show('dialog');
			}
			Portal.saveSysMenu = function() {
				var data = {url:'${pageContext.request.contextPath}/admin/sys_menu/save.json', onSuccess:Portal.onSaveSysMenuSuccess, method:"post"};
				PP.vfui.js.ajax.submit("saveSysMenu", data);
			}
			Portal.onSaveSysMenuSuccess = function(responseJson) {
				var id = responseJson.data.id;
				PP.vfui.js.ajax.refreshZoneByUrl("${pageContext.request.contextPath}/admin/sys_menu/list.xhtml",  "dataZone");
			}
		</script>
	</head>
	<body >
		<ui:panel title="菜单查询" collapsible="true">
			<ui:form id="queryForm" name="queryForm" columns="2">
				<ui:formItem label="名称：">
					<ui:text name="title" />
				</ui:formItem>
				<ui:formItem label="父菜单：">
					<ui:combo name="parentId" data="${firstSysMenuList}"
						optionLabel="title" optionValue="id">
						<ui:option value="0" selected="true">顶级菜单</ui:option>
					</ui:combo>
				</ui:formItem>
				<ui:formItem span="2">
					<ui:button label="查询" onclick="Portal.querySysMenu();" />
					<ui:link onclick="Portal.addSysMenu();">新增</ui:link>
				</ui:formItem>
				<input type="hidden" name="id" value="" />
			</ui:form>
		</ui:panel>

		<aa:zone name="dataZone">
			<ui:table id="menuTable" model="${pageModel}" var="sysMenu"
				defaultMsg="查询不到相关记录！" callback="Portal.querySysMenu"
				showTitle="true">
				<ui:row>

					<ui:column title="名称" property="title" />
					<ui:column title="描述" property="description" />
					<ui:column title="详情">
						<ui:textColspan targetId="${sysMenu.id}SysMenuDetailRow"
							showLabel="隐藏" hideLabel="展示" defaultHide="true"
							callback="Portal.refreshSysMenuDetail(${sysMenu.id})" />
					</ui:column>
					<ui:column title="操作">
						<ui:button onclick="Portal.editSysMenu(${sysMenu.id}); "
							label="编辑" />
					</ui:column>
				</ui:row>
				<ui:row-ext id="${sysMenu.id}SysMenuDetailRow" style="display:none">
					<aa:zone name="${sysMenu.id}SysMenuDetailRow">
					</aa:zone>
				</ui:row-ext>
			</ui:table>
		</aa:zone>

		<ui:dialog id="dialog" title="编辑内容" width="800" acceptLabel="保存"
			onAccept="Portal.saveSysMenu">

			<aa:zone name="editSysMenu">
			</aa:zone>

		</ui:dialog>
	</body>
</html>

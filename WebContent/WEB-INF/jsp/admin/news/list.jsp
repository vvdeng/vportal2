<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<link rel="stylesheet"
			href="${pageContext.request.contextPath}/plugins/kindeditor/themes/default/default.css" />
		<link rel="stylesheet"
			href="${pageContext.request.contextPath}/plugins/kindeditor/plugins/code/prettify.css" />
		<script charset="utf-8"
			src="${pageContext.request.contextPath}/plugins/kindeditor/kindeditor.js"></script>
		<script charset="utf-8"
			src="${pageContext.request.contextPath}/plugins/kindeditor/lang/zh_CN.js"></script>
		<script charset="utf-8"
			src="${pageContext.request.contextPath}/plugins/kindeditor/plugins/code/prettify.js"></script>
		<script>
		function richText(K) {
		
			var editor1 = K.create('textarea[name="content"]', {
				cssPath : '${pageContext.request.contextPath}/plugins/kindeditor//plugins/code/prettify.css',
				uploadJson : '${pageContext.request.contextPath}/kindeditor/ajaxFileUpload.json',
				fileManagerJson : '${pageContext.request.contextPath}/kindeditor/fileManager.json',
				allowFileManager : true,
				langType:'zh_CN',
				afterCreate : function() {
					var self = this;
					K.ctrl(document, 13, function() {
						self.sync();
						document.forms['example'].submit();
					});
					K.ctrl(self.edit.doc, 13, function() {
						self.sync();
						document.forms['example'].submit();
					});
				}
			});
			prettyPrint();
		};
	</script>
		<script>
			$namespace("Portal")
			Portal.queryNews = function(page) {
				if (typeof page == "undefined") {
					$id("queryForm").action = "${pageContext.request.contextPath}/admin/news/list.xhtml";
				}
				else {
					$id("queryForm").action = "${pageContext.request.contextPath}/admin/news/list.xhtml?" + page.queryString;
				}
				PP.vfui.js.ajax.refreshZone("queryForm");
			}
			Portal.refreshNewsDetail = function(id) {
				if ($id(newsId + "NewsDetailRow").style.display == 'block') {
					PP.vfui.js.ajax.refreshZoneByUrl("${pageContext.request.contextPath}/admin/news/detail.xhtml?id=" + id, id + "newsDetail");
				}
			}
			Portal.addNews = function() {
				var config={};
				config.onAfterResponseProcessing=function(){
				
				richText(KindEditor);
				}
				PP.vfui.js.ajax.refreshZoneByUrl("${pageContext.request.contextPath}/admin/news/add.xhtml", 'editNews',config);
				PP.vfui.js.dialog.show('dialog');
			}
			Portal.editNews = function(id) {
				PP.vfui.js.ajax.refreshZoneByUrl("${pageContext.request.contextPath}/admin/news/edit.xhtml?id=" + id, 'editNews');
				PP.vfui.js.dialog.show('dialog');
			}
			Portal.saveNews = function() {
				var data = {url:'${pageContext.request.contextPath}/admin/news/save.json', onSuccess:Portal.onSaveNewsSuccess, method:"post"};
				PP.vfui.js.ajax.submit("saveNews", data);
			}
			Portal.onSaveNewsSuccess = function(responseJson) {
				var id = responseJson.data.id;
				PP.vfui.js.ajax.refreshZoneByUrl("${pageContext.request.contextPath}/admin/news/list.xhtml",  "dataZone");
			}
		</script>
	</head>
	<body onload="Portal.queryNews()">
		<ui:panel title="新闻查询" collapsible="true">
			<ui:form id="queryForm" name="queryForm" columns="2">
				<ui:formItem label="标题：" span="2">
					<ui:text name="title" />
				</ui:formItem>

				<ui:formItem span="2">
					
						<ui:button label="查询" onclick="Portal.queryNews();" />
						<ui:link href="/admin/news/add.xhtml">新增</ui:link>
					
				</ui:formItem>
				<input type="hidden" name="id" value="" />
			</ui:form>
		</ui:panel>

		<aa:zone name="dataZone">
			<ui:table id="newsTable" model="${pageModel}" var="news"
				defaultMsg="查询不到相关记录！" callback="Portal.queryNews" showTitle="true">
				<ui:row>

					<ui:column title="标题" property="title" />
					<ui:column title="作者" property="author" />
					<ui:column title="来源" property="source" />
					<ui:column title="发表时间">${news.createTime}</ui:column>
					
					<ui:column title="一级栏目" >${menu.menuMap[news.firstMenuId]['title']}</ui:column>
					<ui:column title="二级栏目" >${menu.menuMap[news.secondMenuId]['title']}</ui:column>

					<ui:column title="操作">
						<!--	<ui:button onclick="Portal.editNews(${news.id}); " label="编辑"/>-->
						<ui:link href="/admin/news/edit.xhtml?id=${news.id}">
							编辑
						</ui:link>
						<ui:link href="/admin/news/edit.xhtml?id=${news.id}">
							删除
						</ui:link>
						<ui:link href="/admin/news/edit.xhtml?id=${news.id}">
							审核
						</ui:link>
					</ui:column>

				</ui:row>
	
			</ui:table>
		</aa:zone>

		<ui:dialog id="dialog" title="编辑内容" width="800" acceptLabel="保存"
			onAccept="Portal.saveNews">

			<aa:zone name="editNews">
			</aa:zone>

		</ui:dialog>
	</body>
</html>

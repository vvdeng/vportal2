<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
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
		$namespace("Portal")
	   	Portal.data={
		<c:forEach var="firstMenu" items="${menu.menuList}" varStatus="status">   
		"${firstMenu.id}":{"title":"${firstMenu.title}","list":[
		<c:forEach var="secondMenu" items="${firstMenu.subMenuList}" varStatus="subStatus">  
		{
		"id":"${secondMenu.id}",
		"title":"${secondMenu.title}"
		}
		<c:if test="${!subStatus.last}">,</c:if>
		 </c:forEach>
		]}<c:if test="${!status.last}">,</c:if>
		 </c:forEach>
	   };
	   Portal.firstMenuChanged=function(src,subId){
	    var selId=$$(src).val();
	    var subMenuList=Portal.data[selId]["list"];
	    var options=[];
	    
	    for(var i=0;i<subMenuList.length;i++){
	   
	   		var option="<option value='"+subMenuList[i]["id"]+"'>"+subMenuList[i]["title"]+"</option>"
	    	options.push(option);
	    }
	    if(options.length==0){
	    	var option="<option value='0'>请选择</option>"
	    	options.push(option);
	    }
	   $$("#"+subId).html(options.join(' '));
	   }
	 
		KindEditor.ready(function(K) {
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
		});
		
	</script>
</head>
<body>

	<ui:panel title="编辑内容">
		<ui:form id="saveNews" name="saveNews" columns="3" labelWidth="60"
			columnWidth="45%,45%,8%" method="POST" action="save.xhtml">
			<ui:formItem span="2" label="标题：">
				<ui:validator targetId="title" required="true"></ui:validator>
				<input type="text" id="title" name="title" />
			</ui:formItem>
			<ui:formItem labelWidth="1">
				<input type="submit" name="button" value="提交内容"
					style="padding: 3px 12px; font-weight: bold;" />
			</ui:formItem>
			<ui:formItem label="作者：">
				<ui:validator targetId="author" required="true"></ui:validator>
				<input type="text" id="author" name="author" />
			</ui:formItem>
			<ui:formItem label="发表时间：">
				<ui:calendar id="createTime" name="createTime"
					format="yyyy-MM-dd HH:mm:ss" value="<%=new java.util.Date()%>" />
			</ui:formItem>
			<ui:formItem></ui:formItem>
			<ui:formItem label="一级栏目：">
				<ui:combo name="firstMenuId" data="${firstMenuList}"
					optionLabel="title" optionValue="id" onchange="Portal.firstMenuChanged(this,'secondMenuId');" style="width:125px;">

				</ui:combo>
			</ui:formItem>
			<ui:formItem label="二级栏目：">
				<ui:combo id="secondMenuId" name="secondMenuId" data="${menu.menuList[0].subMenuList}"
					optionLabel="title" optionValue="id" style="width:125px;">

				</ui:combo>
			</ui:formItem>
			<ui:formItem></ui:formItem>
			<ui:formItem labelWidth="1">
				<input type="submit" name="button" value="提交内容"
					style="padding: 3px 12px; font-weight: bold;" />
			</ui:formItem>

			<ui:formItem span="3" label="内容：">

				<ui:layout direction="h">
					<ui:panel type="simple" layoutWidth="4%"></ui:panel>
					<ui:panel type="simple" layoutWidth="94%">
						<ui:tabContainer selectedTabIndex="0" selectedTabId="tab1"
							collapsible="false">
							<ui:tabPanel id="tab1" title="单反">
								<ui:panel>

									<textarea name="content" cols="100" rows="8"
										style="width: 600px; height: 200px; visibility: hidden;"></textarea>
								</ui:panel>
							</ui:tabPanel>
							<ui:tabPanel id="tab2" title="简洁模式">



							</ui:tabPanel>

						</ui:tabContainer>
					</ui:panel>
				</ui:layout>
			</ui:formItem>

		</ui:form>

	</ui:panel>
<body>
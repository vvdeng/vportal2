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
	<script type="text/javascript">
	$namespace("Portal.admin.menu");
	Portal.admin.menu.firstMenuTypeMap={
	<c:forEach items="${firstMenu.list}" var="firstMenuItem" varStatus="sta">
	"${firstMenuItem.id}":"${firstMenuItem.type}" <c:if test="${!sta.last}">,</c:if>
	</c:forEach>
	
	}
	Portal.admin.menu.pmenuOnChange=function(src){
		var val=$$(src).val();
	//	alert(Portal.admin.menu.firstMenuTypeMap[val]);
		if(val!=0)
		{
		//	$$("[name=type]").attr("disabled","true");
			$$("[name=type]").each(function(){
				if($$(this).val()==Portal.admin.menu.firstMenuTypeMap[val])
				{	
				
					$$(this).attr("checked","true");
				}
				else{
				
					$$(this).removeAttr("checked");
				}
			});
		//	$$("#menuType").parent().css("visibility","hidden");
		}
		else{
		
		//	$$("[name=type]").removeAttr("disabled");
		//	$$("#menuType").parent().css("visibility","visible");
		}
	}	
	</script>
</head>
<body>

	<ui:panel title="编辑栏目">

		<ui:form id="saveMenu" name="saveMenu" columns="3" labelWidth="60"
			columnWidth="350px,350px,150px" method="POST" action="save.xhtml"
			enctype="multipart/form-data">
			<br>
			<input type="hidden" id="id" name="id" value="${menuForm.id}" />
			<ui:formItem label="名称：">
				<ui:validator targetId="title" required="true"></ui:validator>
				<input type="text" id="title" name="title" value="${menuForm.title}" />
			</ui:formItem>
			<ui:formItem label="隐藏：">

				<ui:checkbox name="state" value="1" checked="${menuForm.state}"></ui:checkbox>
			</ui:formItem>
			<ui:formItem labelWidth="1">
				<ui:button label="提交" />
			</ui:formItem>

			<ui:formItem label="父菜单：">
				<ui:combo name="parentId" data="${firstMenu.list}"
					optionLabel="title" optionValue="id" value="${menuForm.parentId}"
					disabled="${menuForm.level==100} "
					onchange="Portal.admin.menu.pmenuOnChange(this);">
					<ui:option value="0" selected="true">顶级菜单</ui:option>
				</ui:combo>
			</ui:formItem>
			<ui:formItem label="类型：" span="2" id="menuType">

				<ui:radio name="type" data="${menuTypeMap}"
					value="${menuForm.type==null?1:menuForm.type}" />
			</ui:formItem>
			<ui:formItem label="上传图标：">
				<input type="file" name="imgFile" />
			</ui:formItem>
			<ui:formItem span="2" label="${menuForm.imgUrl!=null?'原图标：':''}">
				<c:if test="${menuForm.imgUrl!=null}">
					<img src="${menuForm.imgUrl }" width="208px" height="58px" />
				</c:if>
			</ui:formItem>
			<ui:formItem label="描述：" span="3">

				<input type="text" id="description" name="description" size="90"
					value="${menuForm.description}" />
			</ui:formItem>
		</ui:form>
	</ui:panel>
<body>
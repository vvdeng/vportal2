<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<head>

	<link rel="stylesheet"
		href="${pageContext.request.contextPath}/plugins/kindeditor/themes/default/default.css" />
	<link rel="stylesheet"
		href="${pageContext.request.contextPath}/plugins/kindeditor/plugins/code/prettify.css" />
	<style type="text/css">
#test ul {
	float: left;
	width: 800px;
}

#test li {
	float: left;
	width: 300px;
}
</style>
	<script charset="utf-8"
		src="${pageContext.request.contextPath}/plugins/kindeditor/kindeditor.js"></script>
	<script charset="utf-8"
		src="${pageContext.request.contextPath}/plugins/kindeditor/lang/zh_CN.js"></script>
	<script charset="utf-8"
		src="${pageContext.request.contextPath}/plugins/kindeditor/plugins/code/prettify.js"></script>
	<script>
		$namespace("Portal.admin.news");
	   	Portal.admin.news.data={
	   	"newsId":"${newsForm.id}",
	   	"imageNum":"${fn:length(imgList)}",
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
	   Portal.admin.news.firstMenuChanged=function(src,subId){
	    var selId=$$(src).val();
	    var subMenuList=Portal.admin.news.data[selId]["list"];
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
	   Portal.admin.news.modelChanged=function(src){
	   $id('saveNews').action='${pageContext.request.contextPath}/admin/news/changeEditModel.xhtml'
	   $id('saveNews').submit();
	/*   var model=$$(src).val();
	   if(model==2){
	        var url=""+window.location;
	   		if(url.indexOf('?')>0)
	   		{
	   			window.location=window.location+"&m="+model;
	   		}
	   		else{
	   			window.location=window.location+"?m="+model;
	   		}
	   }*/
	   }
	   Portal.admin.news.imageSubmit=function(){
	   	if(Portal.admin.news.data.imageNum>=8)
	   	{
	   		alert("一个主题下最多保存8张图片");
	   		return false;
	   	}
	     var imgPath=$$("#selImg").val();
	     if( !/.*(jpg|jpeg|bmp|png)$/i.exec(imgPath)){
	     	alert("请上传jpg、jpeg、bmp、png格式图片");
	     	return false;
	     }
	     
	   }
	   Portal.admin.news.setMainImage=function(imageId){
	       window.location="./setMainImg.xhtml?id="+imageId+"&contentId="+Portal.admin.news.data.newsId;
	   }
	   Portal.admin.news.delImage=function(imageId){
	       window.location="./delImg.xhtml?id="+imageId+"&contentId="+Portal.admin.news.data.newsId;
	   }
		KindEditor.ready(function(K) {
			var editor1 = K.create('textarea[name="content"]', {
				cssPath : '${pageContext.request.contextPath}/plugins/kindeditor//plugins/code/prettify.css',
				uploadJson : '${pageContext.request.contextPath}/kindeditor/ajaxFileUpload.json',
				fileManagerJson : '${pageContext.request.contextPath}/kindeditor/fileManager.json',
				allowFileManager : true,
				langType:'zh_CN',
				<c:if test="${newsForm.editModel==2}">
				items:['image','fontsize','bold','justifyleft','justifycenter'],
				</c:if>
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

	<ui:tabContainer collapsible="false"
		selectedTabIndex="${param.tabIndex}">
		<ui:tabPanel title="详细内容">
			<ui:form id="saveNews" name="saveNews" columns="3" labelWidth="60"
				columnWidth="350px,350px,150px" method="POST" action="save.xhtml"
				enctype="multipart/form-data">
				<input type="hidden" id="id" name="id" value="${newsForm.id }" />
				<ui:formItem label="标题：">
					<ui:validator targetId="title" required="true"></ui:validator>
					<input type="text" id="title" name="title"
						value="${newsForm.title }" width="150px" />
				</ui:formItem>
				<ui:formItem label="信息来源：">

					<input type="text" id="source" name="source"
						value="${newsForm.source }" width="150px" />
				</ui:formItem>
				<ui:formItem labelWidth="1">
					<ui:button label="提交内容" />
				</ui:formItem>
				<ui:formItem label="作者：">
					<ui:validator targetId="author" required="true"></ui:validator>
					<input type="text" id="author" name="author"
						value="${newsForm.author }" />
				</ui:formItem>
				<ui:formItem label="发表时间：">
					<ui:calendar id="createTime" name="createTime"
						format="yyyy-MM-dd HH:mm:ss" value="${newsForm.createTime }" />
				</ui:formItem>
				<ui:formItem></ui:formItem>

				<ui:formItem label="一级栏目：">

					<ui:combo name="firstMenuId" data="${firstMenuList}"
						optionLabel="title" optionValue="id"
						onchange="Portal.admin.news.firstMenuChanged(this,'secondMenuId');"
						style="width:125px;" value="${newsForm.firstMenuId }">

					</ui:combo>

				</ui:formItem>

				<ui:formItem label="二级栏目：">
					<c:if test="${newsForm.id!=null}">
						<ui:combo id="secondMenuId" name="secondMenuId"
							data="${menu.menuMap[newsForm.firstMenuId].subMenuList}"
							optionLabel="title" optionValue="id" style="width:125px;"
							value="${newsForm.secondMenuId }">
						</ui:combo>
					</c:if>
					<c:if test="${newsForm.id==null}">
						<ui:combo id="secondMenuId" name="secondMenuId"
							data="${menu.menuList[0].subMenuList}" optionLabel="title"
							optionValue="id" style="width:125px;"
							value="${newsForm.secondMenuId }">
						</ui:combo>
					</c:if>
				</ui:formItem>
				<ui:formItem></ui:formItem>
				<ui:formItem label="主图：">
					<input type="file" name="mainImageFile" id="mainImageFile" />
				</ui:formItem>
				<ui:formItem span="2" label="预览：">
					<input type="hidden" name="mainImagePath" id="mainImagePath" value="${newsForm.mainImagePath}" />
					<img
						src="${pageContext.request.contextPath}${newsForm.mainImagePath}"
						width="150px" height="150px" />
				</ui:formItem>


				<ui:formItem span="3" label="编辑模式：">
					<ui:radio data="1:完整模式,2:简洁模式" name="editModel"
						value="${newsForm.editModel!=2?1:2}" gap="5"
						onClick="Portal.admin.news.modelChanged(this);"></ui:radio>
				</ui:formItem>

				<ui:formItem span="3" label="内容：">
					<ui:layout direction="h">
						<ui:panel type="simple" layoutWidth="50px"></ui:panel>
						<ui:panel type="simple" layoutWidth="760px">

							<ui:panel type="simple">

								<textarea name="content" cols="100" rows="8"
									style="width: 750px; min-height: 400px; visibility: hidden;">${newsForm.content} </textarea>
							</ui:panel>

						</ui:panel>
					</ui:layout>
				</ui:formItem>

			</ui:form>

		</ui:tabPanel>
		<ui:tabPanel title="编辑图片">
			<ui:panel width="800px" margin="15px 0 0 20px">
				<ui:form id="savePics" name="Pics" columns="3" labelWidth="60"
					columnWidth="350px,260px,100px" method="POST"
					enctype="multipart/form-data" action="saveImg.xhtml"
					onsubmit="return Portal.admin.news.imageSubmit();">
					<input type="hidden" id="contentId" name="contentId"
						value="${newsForm.id }" />
					<ui:formItem label="上传图片：" span="2">
						<input id="selImg" type="file" name="imageFile" />
					</ui:formItem>
					<ui:formItem labelWidth="-1">
						<ui:button label="提交图片" />
					</ui:formItem>
					<ui:formItem span="2" label="${menuForm.imgUrl!=null?'原图标：':''}">
						<c:if test="${menuForm.imgUrl!=null}">
							<img src="${menuForm.imgUrl }" width="208px" height="58px" />
						</c:if>
					</ui:formItem>
				</ui:form>
			</ui:panel>
			<ui:panel width="840px" padding="0" type="simple" clear="true">

				<c:forEach var="img" items="${imgList}">
					<ui:panel width="380px" type="cell" height="380px" align="center"
						margin="15px 0 0 20px">
						<img src="${pageContext.request.contextPath}${img.imagePath }"
							width="350px" height="350px" />

						<ui:panel type="buttonPanel" width="350px" height="40px"
							margin="20px 0 0 0 ">
							<ui:button label="设为主图"
								onclick=" Portal.admin.news.setMainImage(${img.id});" />
							<ui:button label="删除"
								onclick="Portal.admin.news.delImage(${img.id});" />
						</ui:panel>

					</ui:panel>

				</c:forEach>
			</ui:panel>
		</ui:tabPanel>
	</ui:tabContainer>
<body>
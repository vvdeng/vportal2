<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<head>
	<style type="text/css">
#overallTab span {
	color: white;
	font-weight: bold;
	font-size: 15px;
	font-family: "幼圆";
	cursor: pointer;
}

#logoRegion {
	background-color: blue;
	margin: 1px;
	width: 598px;;
	height: 80px;
	line-height: 80px;
}

#newestRegion {
	background-color: red;
	margin: 1px;
	width: 598px;
	height: 20px;
	line-height: 20px;
}

/*
#newestRegion span {
	text-align: left;
	font-size: 15px;
	color: blue;
}
*/
#leftUpRegion {
	float: left;
	width: 400px;
	height: 150px;
	background-color: green;
	line-height: 150px;
	margin: 1px;
}

#rightUp1Region {
	float: left;
	width: 196px;
	height: 75px;
	background-color: green;
	line-height: 75px;
	margin: 1px;
}

#rightUp2Region {
	float: left;
	width: 196px;
	height: 72px;
	background-color: green;
	line-height: 72px;
	margin: 1px;
}

#middle1Region {
	float: left;
	width: 240px;
	height: 150px;
	background-color: purple;
	line-height: 150px;
	margin: 1px;
}

#middle2Region {
	float: left;
	width: 240px;
	height: 150px;
	background-color: purple;
	line-height: 150px;
	margin: 1px;
}

#middle3Region {
	float: left;
	width: 114px;
	height: 150px;
	background-color: purple;
	line-height: 150px;
	margin: 1px;
}

#bottomRegion {
	float: left;
	width: 598px;
	height: 150px;
	background-color: navy;
	line-height: 150px;
	margin: 1px;
}
</style>
	<script type="text/javascript">
$namespace("Portal.config");
Portal.config.firstMenuList={
<c:forEach var="menu" items="${firstMenu.list}" varStatus="sta">
"${menu.id}":"true"<c:if test="${!sta.last}">,</c:if>
</c:forEach>
}
Portal.config.firstMenuChanged=function(src){
	var sr=$$(src);
	var mid=$$(src).val();
	var id=sr.attr("id");
	var subClassVal=id+"_sub";
	sr.attr("name","val");
	$$("."+subClassVal).removeAttr("name");
	$$("."+subClassVal).hide();
	$$("."+subClassVal+"[extra='"+mid+"']").show();
	
	
}
Portal.config.subMenuChanged=function(src){
	var sr=$$(src);
	var classVal=sr.attr("class");
	var pid=classVal.replace("_sub","");
	if(sr.val()=="0"){
	 	$$("#"+pid).attr("name","val");
		sr.removeAttr("name");
	}else{
		sr.attr("name","val");
	 	$$("#"+pid).removeAttr("name");
	}

}
Portal.config.menuInit=function(region,val){
	var fCombo=$$("#"+region+"Combo");
	var selSubMenu=$$("."+region+"Combo_sub option[value='"+val+"']").parent();
	if(Portal.config.firstMenuList[val]=="true"){
		fCombo.attr("value",val);
		fCombo.change();
	}else{
		
		fCombo.attr("value",selSubMenu.attr("extra"));
		fCombo.change();
		selSubMenu.attr("value",val);
		selSubMenu.change();
	}

}
</script>
</head>
<body>
	<ui:panel width="900px" type="simple">
		<ui:tabContainer>
			<ui:tabPanel title="总览" contentLeft="150px" id="overallTab">
				<ui:panel height="550px" width="600px" align="center" padding="0"
					type="simple" id="simpleRegion">
					<div id="logoRegion">
						<span>LOGO区域</span>
					</div>
					<div id="newestRegion">
						<span>最新公告</span>
					</div>
					<div id="leftUpRegion">
						<span>左上內容区（文字栏目）</span>
					</div>
					<div id="rightUp1Region">
						<span>右上1缩略区（图片栏目）</span>
					</div>
					<div id="rightUp2Region">
						<span>右上2滚动区（图片栏目）</span>
					</div>
					<div id="middle1Region">
						<span>中1内容区（文字栏目）</span>
					</div>
					<div id="middle2Region">
						<span>中2内容区（文字栏目）</span>
					</div>
					<div id="middle3Region">
						<span>中3视频区</span>
					</div>
					<div id="bottomRegion">
						<span>底部滚动区（图片栏目）</span>
					</div>
				</ui:panel>
			</ui:tabPanel>
			<ui:tabPanel title="LOGO" id="logoTab">
				<ui:panel height="100px">
					<ui:form id="saveLogoPic1" name="saveLogoPic"
						action="saveLogoPic.xhtml" enctype="multipart/form-data"
						columns="3" labelWidth="60" method="post"
						columnWidth="420px,200px,80px"
						onsubmit="return $imageSubmit(this,'imageFiles');">
						<ui:formItem label="图1：" labelWidth="50">

							<input type="hidden" id="id" name="id"
								value="${config['logo'][0].id}" />
							<img
								src="${pageContext.request.contextPath}${config['logo'][0].val}"
								width="300px" height="100px" />
						</ui:formItem>
						<ui:formItem labelWidth="-1">

							<input type="file" id="imageFiles" name="imageFiles" />
						</ui:formItem>
						<ui:formItem labelWidth="-1">
							<ui:button label="保存" />

						</ui:formItem>
					</ui:form>
				</ui:panel>
				<ui:panel height="100px">
					<ui:form id="saveLogoPic1" name="saveLogoPic"
						action="saveLogoPic.xhtml" enctype="multipart/form-data"
						columns="3" labelWidth="60" method="post"
						columnWidth="420px,200px,80px"
						onsubmit="return $imageSubmit(this,'imageFiles');">
						<ui:formItem label="图2：" labelWidth="50">

							<input type="hidden" id="id" name="id"
								value="${config['logo'][1].id}" />
							<img
								src="${pageContext.request.contextPath}${config['logo'][1].val}"
								width="300px" height="100px" />
						</ui:formItem>
						<ui:formItem labelWidth="-1">

							<input type="file" id="imageFiles" name="imageFiles" />
						</ui:formItem>
						<ui:formItem labelWidth="-1">
							<ui:button label="保存" />

						</ui:formItem>
					</ui:form>
				</ui:panel>
				<ui:panel height="100px">
					<ui:form id="saveLogoPic1" name="saveLogoPic"
						action="saveLogoPic.xhtml" enctype="multipart/form-data"
						columns="3" labelWidth="60" method="post"
						columnWidth="420px,200px,80px"
						onsubmit="return $imageSubmit(this,'imageFiles');">
						<ui:formItem label="图3：" labelWidth="50">

							<input type="hidden" id="id" name="id"
								value="${config['logo'][2].id}" />
							<img
								src="${pageContext.request.contextPath}${config['logo'][2].val}"
								width="300px" height="100px" />
						</ui:formItem>
						<ui:formItem labelWidth="-1">

							<input type="file" id="imageFiles" name="imageFiles" />
						</ui:formItem>
						<ui:formItem labelWidth="-1">
							<ui:button label="保存" />

						</ui:formItem>
					</ui:form>

				</ui:panel>
			</ui:tabPanel>
			<ui:tabPanel title="最新公告" id="newestTab">
				<ui:panel>

					<ui:form id="saveNewest" name="saveNewest"
						action="saveSelChannel.xhtml" columns="3" labelWidth="60"
						method="post">
						<ui:formItem label="一级菜单" labelWidth="50">
							<input type="hidden" name="type" value="${configType.newest }">
							<input type="hidden" name="id" value="${config['newest'].id}">
							<ui:combo id="newestCombo" data="${firstMenu.list}"
								optionLabel="title" optionValue="id"
								onchange="Portal.config.firstMenuChanged(this);"></ui:combo>
						</ui:formItem>
						<ui:formItem label="二级菜单" labelWidth="50">


							<c:forEach var="firstMenu" items="${metaMap}">
								<ui:combo className="newestCombo_sub" style="display:none"
									extra="${firstMenu.id}"
									onchange="Portal.config.subMenuChanged(this);">
									<ui:option value="0">请选择</ui:option>
									<c:forEach var="subMenu" items="${firstMenu.subMenuList}">
										<ui:option value="${subMenu.id}">${subMenu.title}</ui:option>
									</c:forEach>
								</ui:combo>
							</c:forEach>

						</ui:formItem>
						<ui:formItem labelWidth="-1">
							<ui:button label="保存" />

						</ui:formItem>
					</ui:form>
				</ui:panel>
			</ui:tabPanel>
			<ui:tabPanel title="左上內容" id="leftUpTab">
				<ui:panel>

					<ui:form id="saveLeftUp" name="saveLeftUp"
						action="saveSelChannel.xhtml" columns="3" labelWidth="60"
						method="post">
						<ui:formItem label="一级菜单" labelWidth="50">
							<input type="hidden" name="type" value="${configType.leftUp }">
							<input type="hidden" name="id" value="${config['leftUp'].id}">
							<ui:combo id="leftUpCombo" data="${firstMenu.list}"
								optionLabel="title" optionValue="id"
								onchange="Portal.config.firstMenuChanged(this);"></ui:combo>
						</ui:formItem>
						<ui:formItem label="二级菜单" labelWidth="50">


							<c:forEach var="firstMenu" items="${metaMap}">
								<ui:combo className="leftUpCombo_sub" style="display:none"
									extra="${firstMenu.id}"
									onchange="Portal.config.subMenuChanged(this);">
									<ui:option value="0">请选择</ui:option>
									<c:forEach var="subMenu" items="${firstMenu.subMenuList}">
										<ui:option value="${subMenu.id}">${subMenu.title}</ui:option>
									</c:forEach>
								</ui:combo>
							</c:forEach>

						</ui:formItem>
						<ui:formItem labelWidth="-1">
							<ui:button label="保存" />

						</ui:formItem>
					</ui:form>
				</ui:panel>

			</ui:tabPanel>
			<ui:tabPanel title="右上1缩略" id="rightUp1Tab">
				<ui:panel>

					<ui:form id="saveRightUp1" name="saveRightUp1"
						action="saveSelChannel.xhtml" columns="3" labelWidth="60"
						method="post">
						<ui:formItem label="一级菜单" labelWidth="50">
							<input type="hidden" name="type" value="${configType.rightUp1 }">
							<input type="hidden" name="id" value="${config['rightUp1'].id}">
							<ui:combo id="rightUp1Combo" data="${firstMenu.list}"
								optionLabel="title" optionValue="id"
								onchange="Portal.config.firstMenuChanged(this);"></ui:combo>
						</ui:formItem>
						<ui:formItem label="二级菜单" labelWidth="50">


							<c:forEach var="firstMenu" items="${metaMap}">
								<ui:combo className="rightUp1Combo_sub" style="display:none"
									extra="${firstMenu.id}"
									onchange="Portal.config.subMenuChanged(this);">
									<ui:option value="0">请选择</ui:option>
									<c:forEach var="subMenu" items="${firstMenu.subMenuList}">
										<ui:option value="${subMenu.id}">${subMenu.title}</ui:option>
									</c:forEach>
								</ui:combo>
							</c:forEach>

						</ui:formItem>
						<ui:formItem labelWidth="-1">
							<ui:button label="保存" />

						</ui:formItem>
					</ui:form>
				</ui:panel>
			</ui:tabPanel>
			<ui:tabPanel title="右上2滚动" id="rightUp2Tab">
				<ui:panel>

					<ui:form id="saveRightUp2" name="saveRightUp2"
						action="saveSelChannel.xhtml" columns="3" labelWidth="60"
						method="post">
						<ui:formItem label="一级菜单" labelWidth="50">
							<input type="hidden" name="type" value="${configType.rightUp2 }">
							<input type="hidden" name="id" value="${config['rightUp2'].id}">
							<ui:combo id="rightUp2Combo" data="${firstMenu.list}"
								optionLabel="title" optionValue="id"
								onchange="Portal.config.firstMenuChanged(this);"></ui:combo>
						</ui:formItem>
						<ui:formItem label="二级菜单" labelWidth="50">


							<c:forEach var="firstMenu" items="${metaMap}">
								<ui:combo className="rightUp2Combo_sub" style="display:none"
									extra="${firstMenu.id}"
									onchange="Portal.config.subMenuChanged(this);">
									<ui:option value="0">请选择</ui:option>
									<c:forEach var="subMenu" items="${firstMenu.subMenuList}">
										<ui:option value="${subMenu.id}">${subMenu.title}</ui:option>
									</c:forEach>
								</ui:combo>
							</c:forEach>

						</ui:formItem>
						<ui:formItem labelWidth="-1">
							<ui:button label="保存" />

						</ui:formItem>
					</ui:form>
				</ui:panel>
			</ui:tabPanel>
			<ui:tabPanel title="中1内容" id="middle1Tab">
				<ui:panel>

					<ui:form id="saveMiddle1" name="saveMiddle1"
						action="saveSelChannel.xhtml" columns="3" labelWidth="60"
						method="post">
						<ui:formItem label="一级菜单" labelWidth="50">
							<input type="hidden" name="type" value="${configType.middle1 }">
							<input type="hidden" name="id" value="${config['middle1'].id}">
							<ui:combo id="middle1Combo" data="${firstMenu.list}"
								optionLabel="title" optionValue="id"
								onchange="Portal.config.firstMenuChanged(this);"></ui:combo>
						</ui:formItem>
						<ui:formItem label="二级菜单" labelWidth="50">


							<c:forEach var="firstMenu" items="${metaMap}">
								<ui:combo className="middle1Combo_sub" style="display:none"
									extra="${firstMenu.id}"
									onchange="Portal.config.subMenuChanged(this);">
									<ui:option value="0">请选择</ui:option>
									<c:forEach var="subMenu" items="${firstMenu.subMenuList}">
										<ui:option value="${subMenu.id}">${subMenu.title}</ui:option>
									</c:forEach>
								</ui:combo>
							</c:forEach>

						</ui:formItem>
						<ui:formItem labelWidth="-1">
							<ui:button label="保存" />

						</ui:formItem>
					</ui:form>
				</ui:panel>
			</ui:tabPanel>
			<ui:tabPanel title="中二内容" id="middle2Tab">
				<ui:panel>

					<ui:form id="saveMiddle2" name="saveMiddle2"
						action="saveSelChannel.xhtml" columns="3" labelWidth="60"
						method="post">
						<ui:formItem label="一级菜单" labelWidth="50">
							<input type="hidden" name="type" value="${configType.middle2 }">
							<input type="hidden" name="id" value="${config['middle2'].id}">
							<ui:combo id="middle2Combo" data="${firstMenu.list}"
								optionLabel="title" optionValue="id"
								onchange="Portal.config.firstMenuChanged(this);"></ui:combo>
						</ui:formItem>
						<ui:formItem label="二级菜单" labelWidth="50">


							<c:forEach var="firstMenu" items="${metaMap}">
								<ui:combo className="middle2Combo_sub" style="display:none"
									extra="${firstMenu.id}"
									onchange="Portal.config.subMenuChanged(this);">
									<ui:option value="0">请选择</ui:option>
									<c:forEach var="subMenu" items="${firstMenu.subMenuList}">
										<ui:option value="${subMenu.id}">${subMenu.title}</ui:option>
									</c:forEach>
								</ui:combo>
							</c:forEach>

						</ui:formItem>
						<ui:formItem labelWidth="-1">
							<ui:button label="保存" />

						</ui:formItem>
					</ui:form>
				</ui:panel>
			</ui:tabPanel>
			<ui:tabPanel title="中三视频" id="middle3Tab">
				<ui:panel>

					<ui:form id="saveMiddle3" name="saveMiddle3"
						action="saveSelChannel.xhtml" columns="3" labelWidth="60"
						method="post">
						<ui:formItem label="一级菜单" labelWidth="50">
							<input type="hidden" name="type" value="${configType.middle3 }">
							<input type="hidden" name="id" value="${config['middle3'].id}">
							<ui:combo id="middle3Combo" data="${firstMenu.list}"
								optionLabel="title" optionValue="id"
								onchange="Portal.config.firstMenuChanged(this);"></ui:combo>
						</ui:formItem>
						<ui:formItem label="二级菜单" labelWidth="50">


							<c:forEach var="firstMenu" items="${metaMap}">
								<ui:combo className="middle3Combo_sub" style="display:none"
									extra="${firstMenu.id}"
									onchange="Portal.config.subMenuChanged(this);">
									<ui:option value="0">请选择</ui:option>
									<c:forEach var="subMenu" items="${firstMenu.subMenuList}">
										<ui:option value="${subMenu.id}">${subMenu.title}</ui:option>
									</c:forEach>
								</ui:combo>
							</c:forEach>

						</ui:formItem>
						<ui:formItem labelWidth="-1">
							<ui:button label="保存" />

						</ui:formItem>
					</ui:form>
				</ui:panel>
			</ui:tabPanel>
			<ui:tabPanel title="底部滚动" id="bottomTab">
				<ui:panel>

					<ui:form id="saveBottom" name="saveBottom"
						action="saveSelChannel.xhtml" columns="3" labelWidth="60"
						method="post">
						<ui:formItem label="一级菜单" labelWidth="50">
							<input type="hidden" name="type" value="${configType.bottom }">
							<input type="hidden" name="id" value="${config['bottom'].id}">
							<ui:combo id="bottomCombo" data="${firstMenu.list}"
								optionLabel="title" optionValue="id"
								onchange="Portal.config.firstMenuChanged(this);"></ui:combo>
						</ui:formItem>
						<ui:formItem label="二级菜单" labelWidth="50">


							<c:forEach var="firstMenu" items="${metaMap}">
								<ui:combo className="bottomCombo_sub" style="display:none"
									extra="${firstMenu.id}"
									onchange="Portal.config.subMenuChanged(this);">
									<ui:option value="0">请选择</ui:option>
									<c:forEach var="subMenu" items="${firstMenu.subMenuList}">
										<ui:option value="${subMenu.id}">${subMenu.title}</ui:option>
									</c:forEach>
								</ui:combo>
							</c:forEach>

						</ui:formItem>
						<ui:formItem labelWidth="-1">
							<ui:button label="保存" />

						</ui:formItem>
					</ui:form>
				</ui:panel>
			</ui:tabPanel>
		</ui:tabContainer>
	</ui:panel>
	<script type="text/javascript">

	$$("#simpleRegion span").click(
		function(event){
		var tabId="header_"+$$(event.target).parent().attr("id").replace("Region","Tab");
		$$("#"+tabId).click();
		}
	);
	
/*	if(Portal.config.firstMenuList["${config['leftUp'].val}"]=="true"){
		$$("#leftUpCombo").attr("value","${config['leftUp'].val}");
		$$("#leftUpCombo").change();
	}else{
		var selSubMenu=$$(".leftUpCombo_sub option[value=\'${config['leftUp'].val}\']").parent();
		$$("#leftUpCombo").attr("value",selSubMenu.attr("extra"));
		$$("#leftUpCombo").change();
		selSubMenu.attr("value","${config['leftUp'].val}");
		selSubMenu.change();
	}*/
	Portal.config.menuInit("leftUp","${config['leftUp'].val}");
	Portal.config.menuInit("newest","${config['newest'].val}");
	Portal.config.menuInit("rightUp1","${config['rightUp1'].val}");
	Portal.config.menuInit("rightUp2","${config['rightUp2'].val}");
	Portal.config.menuInit("middle1","${config['middle1'].val}");
	Portal.config.menuInit("middle2","${config['middle2'].val}");
	Portal.config.menuInit("middle3","${config['middle3'].val}");
	Portal.config.menuInit("bottom","${config['bottom'].val}");
</script>
</body>

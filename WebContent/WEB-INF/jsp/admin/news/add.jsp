<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<head>

</head>
<body>
	<aa:zone name="editNews">
		<ui:panel>
			<ui:form id="saveNews" name="saveNews" columns="2" labelWidth="60"
				columnWidth="45%,45%">
				<ui:formItem span="2" label="标题：">
					<ui:validator targetId="title" required="true"></ui:validator>
					<input type="text" id="title" name="title" />
				</ui:formItem>
				<ui:formItem label="作者：">
					<ui:validator targetId="author" required="true"></ui:validator>
					<input type="text" id="author" name="author" />
				</ui:formItem>
				<ui:formItem label="发表时间">
					<ui:calendar id="createTime" name="createTime"
						format="yyyy-MM-dd HH:mm:ss" value="<%=new java.util.Date()%>" />
				</ui:formItem>

			
			<ui:layout direction="h">
				<ui:panel type="simple" layoutWidth="2%"></ui:panel>
				<ui:panel title="可视模式" type="simple" layoutWidth="95%">
					<ui:tabContainer selectedTabIndex="0" selectedTabId="tab1"
						collapsible="true">
						<ui:tabPanel id="tab1" title="单反">
							<ui:panel>
								<form name="example" method="post" action="${pageContext.request.contextPath}/kindeditor/content.xhtml">
							
								<textarea name="content" cols="100" rows="8"
									style="width: 600px; height: 200px; visibility: hidden;"></textarea>
									<input type="submit" name="button" value="提交内容" /> (提交快捷键: Ctrl + Enter)
							</form>
							</ui:panel>
						</ui:tabPanel>
						<ui:tabPanel id="tab2" title="简洁模式">
							<ui:form id="saveNewsDetail" name="saveNewsDetail" columns="1"
								labelWidth="120" columnWidth="95%">
								<div id="modelP" style="display: none">
									<ui:formItem label="段落：">
										<ui:textArea col="40" tag="content"></ui:textArea>
										<ui:button label="增加段落" />
										<ui:button label="增加文本" />
										<ui:button label="删除" />
									</ui:formItem>
								</div>
								<ui:formItem label="段落：">
									<ui:textArea col="40" tag="content"></ui:textArea>
									<ui:button label="增加段落" />
									<ui:button label="增加文本" />
									<ui:button label="删除" />
								</ui:formItem>
							</ui:form>
						</ui:tabPanel>
						
					</ui:tabContainer>

				</ui:panel>
				<ui:panel type="simple" layoutWidth="2%"></ui:panel>
			</ui:layout>
			</ui:form>

		</ui:panel>
	</aa:zone>
<body>
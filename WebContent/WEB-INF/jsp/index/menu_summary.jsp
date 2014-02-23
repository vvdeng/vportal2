<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<div class="header">
	<ul>
		<c:forEach var="menu" items="${menuSummaryList}">
			<li val="${menu.id }">
				${menu.title }
			</li>
		</c:forEach>

	</ul>
</div>
<div class="clear"></div>
<c:forEach var="menu" items="${menuSummaryList}" varStatus="sta">
	<div class="content  <c:if test="${!sta.first }">h</c:if>" val="${menu.id }">
		<div class="itemList">
		
			<ul>
				<c:forEach var="summary" items="${summaryMap[menu.id]['list']}">
				<li>
					&gt;
					<a href="${pageContext.request.contextPath}/content/detail.jhtml?cid=${summary.id }">${summary.title}</a>
				</li>
				
				</c:forEach>
				
				
			</ul>
		</div>
		<img width="132px" height="105px" src="${pageContext.request.contextPath}${summaryMap[menu.id]['mainImagePath'] }">
	</div>
</c:forEach>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<div id="subMemu">
	<div id="subMenuHeader">
		${selMenu.title }
	</div>
	<ul>
		<c:forEach var="subMenu" items="${subMenuList}">
			<li>
				<a
					href="${pageContext.request.contextPath }/channel/list.jhtml?cid=${subMenu.id}&type=${subMenu.type}">${subMenu.title
					}</a>
			</li>
		</c:forEach>
	</ul>
	<div class="btm"></div>
</div>

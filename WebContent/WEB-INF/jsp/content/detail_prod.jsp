<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${selMenu.title }</title>
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/common.css" />
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/header.css" />
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/detail_prod.css" />
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/bottom.css" />

		<script type="text/javascript"
			src="${pageContext.request.contextPath}/resources/jquery.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/resources/core.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/scripts/base.js"></script>

	</head>
	<body>
		<%@include file="/WEB-INF/jsp/common/header.jsp"%>
		<div id="mainPid">
			<img
				src="${pageContext.request.contextPath}/images/list-main-pic.jpg"
				width="1004px" height="180px">
		</div>
		<div id="main">
			<%@include file="/WEB-INF/jsp/common/sidebar.jsp"%>
			<div id="content">
				<div id="contentHeader">
					${selMenu.title }
				</div>
				<div id="nav">
					当前位置：首页&nbsp;&gt;&nbsp;
					<c:if test="${selMenu.level==2}">${topMenu.title}&nbsp;&gt;&nbsp;</c:if>
					${selMenu.title }
				</div>

				<hr />
				<div class="title">
					${detail.title}
				</div>
				<div class="info">
					点击次数:69&nbsp;更新时间:${detail.lastEditTime}
				</div>
				<div id="picArea">
					<div id="mainPic">
						<ul>
							<c:forEach var="img" items="${imageList}" varStatus="sta">

								<li <c:if test="${!sta.first}">class="h"</c:if> >
									<img src="${pageContext.request.contextPath}${img.imagePath}"
										width="406px" height="380px">
								</li>
							</c:forEach>
							<ul>
					</div>
					<div id="picList">
						<img class="movL" src="" />
						<img class="movR" src="" />
						<ul>
							<c:forEach var="img" items="${imageList}">
								<li>
									<img src="${pageContext.request.contextPath}${img.imagePath}"
										width="46px" height="46px" />
								</li>
							</c:forEach>


						</ul>

					</div>
				</div>
				<div id="simpleInfo">
					<ul>
						<li>
							<span class="lb">产品价格：</span><span class="val">BLEDD5系列</span>
						</li>
						<li>
							<span class="lb">产品价格：</span><span class="val">BLEDD5系列</span>
						</li>
						<li>
							<span class="lb">产品价格：</span><span class="val">BLEDD5系列</span>
						</li>
					</ul>
				</div>
				<div class="clear"></div>
				<div id="labelList">
					<ul>
						<li>
							详细内容
						</li>
					</ul>
				</div>
				<div class="detail">
					${mainInfo.content }
				</div>
				<div class="newslink">
					上一条：
					<a href="#">没有了</a>&nbsp;&nbsp;下一条：
					<a href="#">华炜心系基层 冒酷暑视察指导工作 强调——创新是企业的生命</a>
				</div>
			</div>
			<div class="clear"></div>
		</div>

		<%@include file="/WEB-INF/jsp/common/bottom.jsp"%>
	</body>

</html>

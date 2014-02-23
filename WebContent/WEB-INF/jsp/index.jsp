<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>西安重装光电技术研究中心</title>
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/common.css" />
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/header.css" />
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/index.css" />
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/bottom.css" />
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/resources/jquery.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/resources/core.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/scripts/base.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/scripts/index.js" /></script>
	</head>

	<body>
		<%@include file="/WEB-INF/jsp/common/header.jsp"%>
		<div id="mainPicArea">
			<div class="picList">
				<c:forEach var="imgCfg" varStatus="sta" items="${regionMap['logo']}">

					<img src="${pageContext.request.contextPath}${imgCfg.val}"
						width="100%" height="451px"
						<c:if test="${!sta.first}">class="h"</c:if> />
				</c:forEach>

			</div>
			<div class="picSel">
				<ul>
					<c:forEach var="imgCfg" varStatus="sta"
						items="${regionMap['logo']}">

						<li idx="${sta.index+1 }"></li>
					</c:forEach>

				</ul>
			</div>

		</div>
		<script type="text/javascript">
		$bannerSlide('mainPicArea');
		</script>
		<div id="main">
			<div id="seperator">
				<img src="images/banner-bg.jpg" width="1004px" height="41px" />
			</div>
			<div id="latestNews">
				<img src="images/gonggao-left.jpg" width="96px" height="31px" />
				<div id="newsBubble">
					<ul>
						<c:forEach var="news" varStatus="sta"
							items="${regionMap['newestData'].list}">
							<li <c:if test="${!sta.first }">class="h"</c:if>>
								<a
									href="${pageContext.request.contextPath}/content/detail.jhtml?cid=${news.id }">
									${news.title } </a><span><fmt:formatDate pattern="yyyy-MM-dd" value="${news.createTime}" type="both"/></span>
							</li>
						</c:forEach>

					</ul>
				</div>
				<div class="clear"></div>
			</div>
			<script type="text/javascript">
				$bubble('newsBubble');
			</script>
			<div id="region1">
				<div id="picShow">
					<div class="picList">
						<c:forEach var="imageNews" varStatus="sta"
							items="${regionMap['leftUpImageData'].list}">

							<img src="${pageContext.request.contextPath}${imageNews.mainImagePath}"
								width="238" height="160px"
								<c:if test="${!sta.first}">class="h"</c:if> />
						</c:forEach>
					

					</div>
					<div class="picSel">
						<ul>
						<c:forEach var="imageNews" varStatus="sta"
							items="${regionMap['leftUpImageData'].list}">

							<li idx="${sta.index+1 }" <c:if test="!sta.first">class="sel"</c:if>>
								${sta.index+1 }
							</li>
						</c:forEach>
						
						</ul>
					</div>
				</div>
				<script type="text/javascript">
				$bannerSlide('picShow');
				</script>
				<div class="header">
					<img src="images/lanmu-left2.jpg" />
					<span>企业动态</span>
				</div>
				<div class="title">
					<a href="#">${regionMap.leftUpNews1st.news.title }</a>
				</div>
				<div class="abstract">
					${regionMap.leftUpNews1st.detail }
				</div>
				<div class="clear"></div>
				<div class="newsList">
					<ul>
						<c:forEach var="news" items="${regionMap['leftUpData'].list}">
							<li>
								<a
									href="${pageContext.request.contextPath}/content/detail.jhtml?cid=${news.id }">
									${news.title } </a><span><fmt:formatDate pattern="yyyy-MM-dd" value="${news.createTime}" type="both"/></span>
							</li>
						</c:forEach>
					</ul>
					<div class="clear"></div>
				</div>
			</div>
			<!--Region1结束-->
			<div id="region2">
				<div class="loading">
				<img src="${pageContext.request.contextPath}/images/loading3.gif"/>
				</div>
			</div>
			<!--Region2结束-->
			<div id="region3" class="region">
				<div class="header">
					<img src="images/lanmu-left2.jpg" />
					<span>项目案例</span>
				</div>
				<div class="clear"></div>
				<div class="content" id="diplayArea1">
					<div class="itemList">
						<ul>
							<c:forEach var="news" items="${regionMap['rightUp2Data'].list}">
								<li>
									<a
										href="${pageContext.request.contextPath}/content/detail.jhtml?cid=${news.id }">
										<img
											src="${pageContext.request.contextPath}${news.mainImagePath }"
											height="80px" width="110px" /><span>${news.title}</span> </a>
								</li>
							</c:forEach>

						</ul>
					</div>
				</div>
			</div>
			<script type="text/javascript">
				$cycleMove('diplayArea1');
				</script>
			<!--Region3结束-->
			<div class="clear"></div>
			<div id="region4" class="region">
				<div class="header">
					<img src="images/lanmu-left2.jpg" />
					<span>行业动态</span>
				</div>
				<div class="clear"></div>
				<div class="content">
					<div class="info itemList">
						<ul>
							<c:forEach var="news" items="${regionMap['middle1Data'].list}">
								<li>
									<a
										href="${pageContext.request.contextPath}/content/detail.jhtml?cid=${news.id }">
										${news.title } </a><span><fmt:formatDate pattern="yyyy-MM-dd" value="${news.createTime}" type="both"/></span>
								</li>
							</c:forEach>
						</ul>
					</div>
				</div>
			</div>
			<!--Region4结束-->
			<div id="region5" class="region">
				<div class="header">
					<img src="images/lanmu-left2.jpg" />
					<span>系统应用</span>
				</div>
				<div class="clear"></div>
				<div class="content">
					<div class="info itemList">
						<ul>
							<c:forEach var="news" items="${regionMap['middle2Data'].list}">
								<li>
									<a
										href="${pageContext.request.contextPath}/content/detail.jhtml?cid=${news.id }">
										${news.title } </a><span><fmt:formatDate pattern="yyyy-MM-dd" value="${news.createTime}" type="both"/></span>
								</li>
							</c:forEach>
						</ul>
					</div>
				</div>
			</div>

			<!--Region5结束-->
			<div id="region6" class="region">
				<div class="header">
					<img src="images/lanmu-left2.jpg" />
					<span>企业视频</span>
				</div>
				<div class="clear">
				</div>
				<div class="content">
					<div class="info itemList">
						<ul>
							<li>
								<a href="#">LED产业全球市场发展现状解析 </a>
								<span><fmt:formatDate pattern="yyyy-MM-dd" value="${news.createTime}" type="both"/></span>
							</li>
							<li>
								<a href="#">LED产业全球市场发展现状解析 </a>
								<span><fmt:formatDate pattern="yyyy-MM-dd" value="${news.createTime}" type="both"/></span>
							</li>
							<li>
								<a href="#">LED产业全球市场发展现状解析 </a>
								<span><fmt:formatDate pattern="yyyy-MM-dd" value="${news.createTime}" type="both"/></span>
							</li>
							<li>
								<a href="#">LED产业全球市场发展现状解析 </a>
								<span><fmt:formatDate pattern="yyyy-MM-dd" value="${news.createTime}" type="both"/></span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!--Region6结束-->
			<div class="clear">
			</div>
			<div id="region7" class="region">
				<div class="header">
					<img src="images/lanmu-left2.jpg" />
					<span>项目案例</span>
				</div>
				<div class="clear">
				</div>
				<div class="content" id="diplayArea2">
					<div class="itemList">
						<ul>
							<c:forEach var="news" items="${regionMap['bottomData'].list}">
								<li>
									<a
										href="${pageContext.request.contextPath}/content/detail.jhtml?cid=${news.id }">
										<img
											src="${pageContext.request.contextPath}${news.mainImagePath }"
											height="80px" width="110px" /><span>${news.title}</span> </a>
								</li>
							</c:forEach>

						</ul>
					</div>
				</div>
			</div>
			<!--Region7结束-->
			<div class="clear"></div>
			
			
		</div>
		<%@include file="/WEB-INF/jsp/common/bottom.jsp"%>
	</body>
	<script type="text/javascript">
			Portal.index.data = {"rightUp1Mid":"${regionMap['rightUp1'].val}"};
			$cycleMove('diplayArea2');
			Portal.index.init();
			</script>
</html>

<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>后台管理</title>
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/admin/common.css" />
		<link rel="stylesheet" type="text/css"
			href="${pageContext.request.contextPath}/styles/admin/login.css" />
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/resources/jquery.js"></script>
		<script type="text/javascript">
		//	alert($$("#verifyCode").attr("src"));
		var canSubmit=false;
		var count=0;
		function genCode(){
			
			$$("#verifyCode").attr("src","${pageContext.request.contextPath}/code.jhtml?count="+(count++));
		}
	
		</script>
	</head>
	<body>
		<div id="left">
			
			<img src="${pageContext.request.contextPath}/images/cloud.jpg"
				id="decorator" />
			<img src="${pageContext.request.contextPath}/images/line.jpg"
				id="line" />
		</div>
		<div id="main">
			<div id="loginArea">
				<img src="${pageContext.request.contextPath}/images/adminTitle.jpg"
					id="loginTitle" />
				<form method="post"
					action="${pageContext.request.contextPath}/admin/login.jhtml" id="loginForm">
					<div class="field">
						<span class="name">用户名：</span><span class="val"> <input
								type="text" id="name" name="name" /> </span>
								<span class="r">${errMsg}<span>
					</div>
					<div class="field">
						<span class="name">密码：</span><span class="val"> <input
								type="password" id="pwd" name="pwd" /> </span>
					</div>
					<div class="field">
						<span class="name"></span><span class="val"> <img
								src="${pageContext.request.contextPath}/code.jhtml"
								id="verifyCode" onclick="genCode();" /> </span>
					</div>

					<div class="field">
						<span class="name">验证码：</span><span class="val"> <input
								type="text" id="verifyCodeInput" /> </span>
						<span class="r"><span>
					</div>
					<!-- src="${pageContext.request.contextPath}/images/login.jpg" -->
					<div class="submitArea">
						<input id="submit" type="submit" value="" name="submit" />
						<input id="reset" type="type" name="reset" value="" />
					</div>

				</form>
				
			</div>
		</div>
		<script type="text/javascript">
		$$("#verifyCodeInput").focus(function(){
			canSubmit=false;
				
		});
		$$("#verifyCodeInput").blur(function(){
			
			var sr=$$(this);
            $$.ajax({
                cache:false,
                url:"${pageContext.request.contextPath}/checkCode.json?code="+sr.val(),
                dataType: "json",
                success :function(data){
                	sr.parent().next().text(data.msg);
                    if(data.errCode==0){
                    	canSubmit=true;
                    	sr.parent().next().hide();
                    }
                    else{
                   		canSubmit=false;
                    	sr.parent().next().show();
                    }
                },
                error:function(data,b,err){
                
                    return false;
                }
            });
		//	alert("a");
		});
		$$("#loginForm").submit(function(){
		   var result=false;
			if(!canSubmit){
				var sr=$$("#verifyCodeInput");
		        $$.ajax({
		        	async:false,//这里要同步
		            cache:false,
		            url:"${pageContext.request.contextPath}/checkCode.json?code="+sr.val(),
		            dataType: "json",
		            success :function(data){
		            	sr.parent().next().text(data.msg);
		                if(data.errCode==0){
		                	canSubmit=true;
		                	sr.parent().next().hide();
		                //	$$("#loginForm").submit();//在异步方式下逻辑上应如此，实际not work...
		                result=true;
		                
		                }
		                else{
		                	result=false;
		               		canSubmit=false;
		                	sr.parent().next().show();
		                	
		                }
		            },
		            error:function(data,b,err){
		            
		                return false;
		            }
		       });
		     	return result;
			 }
			 else{
		//	 alert("aaaa");
			 	return true;
			 }
		});
		</script>
	</body>
</html>
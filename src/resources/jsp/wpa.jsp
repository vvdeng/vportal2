<%@ page language="java" contentType="text/html;charset=GBK"%>
<%@page import="java.util.Map"%>
<%@page import="com.paipai.the3rd.wpa.WpaHelper"%>
<%@page import="com.paipai.the3rd.wpa.WpaConstant"%>
<%
	String uin = request.getParameter("uin");
	Map<String, String> rsp = WpaHelper.GetTencentSignature(Long.parseLong(uin), "",
			"WpaController");
	out.print("{SIG_TENCENT : '" + rsp.get(WpaConstant.SIG_TENCENT) + "', SIG_UI : '" + rsp.get(WpaConstant.SIG_UI) + "'}");
	out.flush();
%>
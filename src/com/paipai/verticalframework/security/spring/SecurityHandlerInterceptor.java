/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??SecurityHandlerInterceptor.class				
 *			
 * Description?????????9????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0   raywu  2010-11-09  Create	
 */
package com.paipai.verticalframework.security.spring;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.paipai.verticalframework.log.Log;
import com.paipai.verticalframework.security.util.PermissionChecker;
import com.paipai.verticalframework.web.ajax.JsonData;

import flexjson.JSONSerializer;

/**
 * ???????9????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class SecurityHandlerInterceptor extends HandlerInterceptorAdapter {

	public final static String ERROR_CODE = "resultcode";
	public final static int ERROR_CODE_NOT_LOGIN = -1;
	public final static int ERROR_CODE_AUTH = -2;
	private boolean checkParams = false;
	private Set<String> nosecuritySet = new HashSet<String>();
	private String securityPage = "/WEB-INF/jsp/security.jsp";

	public void setCheckParams(boolean checkParams) {
		this.checkParams = checkParams;
	}

	public void setNosecuritySet(Set<String> nosecuritySet) {
		this.nosecuritySet = nosecuritySet;
	}

	public void setSecurityPage(String securityPage) {
		this.securityPage = securityPage;
	}

	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		String uri = request.getRequestURI();
		// ????????а??????
		if (nosecuritySet.contains(uri)) {
			return true;
		}

		// ????????а??????
		if (handler.getClass().isAnnotationPresent(NoSecurity.class)) {
			return true;
		}

		boolean json = uri.endsWith(".json");

		String servletPath = request.getServletPath();
		if (servletPath.startsWith("/")) {
			servletPath = servletPath.substring(1);
		}

		// ?????????????????????
		if (checkParams && request.getQueryString() != null
				&& !"".equals(request.getQueryString())) {
			servletPath = servletPath + "?" + request.getQueryString();
		}
		Object loginAccount = request.getSession().getAttribute("loginAccount");
		// ???δ???
		if (loginAccount == null) {
			if (json) {
				JsonData jsonData = new JsonData();
				jsonData.setErrCode(new Integer(ERROR_CODE_NOT_LOGIN)
						.toString());
				jsonData.setMsg("no login");

				JSONSerializer serializer = new JSONSerializer();
				String jsonString = serializer.exclude("class").serialize(
						jsonData);
				response.setCharacterEncoding("UTF-8");
				response.setContentType("text/plain; charset=UTF-8");
				response.getOutputStream().write(jsonString.getBytes());
				response.getOutputStream().flush();
			}
			else {
				request.setAttribute(ERROR_CODE, ERROR_CODE_NOT_LOGIN);
				request.getRequestDispatcher(securityPage).forward(request,
						response);
			}
			return false;
		}

		if (handler.getClass().isAnnotationPresent(LoginSecurity.class)) {
			return true;
		}
		else if (PermissionChecker.checkFunction(request.getSession(),
				servletPath)) {
			return true;
		}
		else {
			// ?????????
			Log.logInfo("checkFunction[" + servletPath + "] Failed!");
			if (json) {
				JsonData jsonData = new JsonData();
				jsonData.setErrCode(new Integer(ERROR_CODE_AUTH).toString());
				jsonData.setMsg("no auth");

				JSONSerializer serializer = new JSONSerializer();
				String jsonString = serializer.exclude("class").serialize(
						jsonData);
				response.setCharacterEncoding("UTF-8");
				response.setContentType("text/plain; charset=GBK");
				response.getOutputStream().write(jsonString.getBytes());
				response.getOutputStream().flush();
			}
			else {
				request.setAttribute(ERROR_CODE, ERROR_CODE_AUTH);
				request.getRequestDispatcher(this.securityPage).forward(
						request, response);
			}
			return false;
		}
	}
}

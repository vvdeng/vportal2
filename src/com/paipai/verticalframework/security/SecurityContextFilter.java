/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??SecurityContextFilter.class				
 *			
 * Description????????????ù?????			 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0   raywu  2010-11-09  Create	
 */
package com.paipai.verticalframework.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.paipai.verticalframework.core.RequestMDC;
import com.paipai.verticalframework.security.spring.data.AccountBO;

/**
 * ??????????ù?????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class SecurityContextFilter implements Filter {

	public void init(FilterConfig config) throws ServletException {
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		if (request instanceof HttpServletRequest) {
			HttpServletRequest httpServletRequest = (HttpServletRequest) request;
			AccountBO accountBO = (AccountBO) httpServletRequest.getSession()
					.getAttribute("loginAccount");
			if (accountBO != null && accountBO.getUserBO() != null) {
				RequestMDC.setUserName(accountBO.getUserBO().getUserName());
			}
		}

		filterChain.doFilter(request, response);
	}

	public void destroy() {
	}
}

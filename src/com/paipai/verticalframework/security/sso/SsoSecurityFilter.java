/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??SSOSecurityFilter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2011-1-12			????
 */
package com.paipai.verticalframework.security.sso;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

import com.paipai.verticalframework.core.ObjectFactory;
import com.paipai.verticalframework.log.Log;
import com.paipai.verticalframework.security.spring.data.AccountBO;
import com.paipai.verticalframework.security.spring.data.PrivilegeBO;
import com.paipai.verticalframework.security.spring.data.SsoBO;
import com.paipai.verticalframework.security.spring.data.UserBO;
import com.paipai.verticalframework.security.spring.data.service.SecurityDataService;
import com.paipai.verticalframework.security.util.SecurityUtil;

/**
 * <??????>
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class SsoSecurityFilter extends OncePerRequestFilter {

	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		SsoBO sso = SecurityUtil.checkSso(request);
		if (sso.isReload()) {
			SecurityDataService securityDataService = ObjectFactory.getObject(
					SecurityDataService.class, "securityDataService");
			UserBO userBo = securityDataService.loadUser(sso.getSystemId(), sso
					.getUsername());
			if (userBo != null) {
				List<PrivilegeBO> privileges = securityDataService
						.loadPrivileges(sso.getSystemId(), sso.getUsername());
				SecurityUtil.loginSuccess(request, response, new AccountBO(
						userBo, privileges));
				Log.logInfo("user[{0}] lof system[{1}] ogin success", sso.getUsername(), sso.getSystemId());
			}
			else {
				Log.logInfo("user[{0}] of system[{1}] not found", sso.getUsername(), sso.getSystemId());
			}
		}

		chain.doFilter(request, response);
	}
}

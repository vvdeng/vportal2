/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??SecurityUtil.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2011-1-12			????
 */
package com.paipai.verticalframework.security.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.paipai.boss.common.util.OaKeyHandle;
import com.paipai.verticalframework.core.SystemConfig;
import com.paipai.verticalframework.log.Log;
import com.paipai.verticalframework.security.constants.SecurityConstants;
import com.paipai.verticalframework.security.spring.data.AccountBO;
import com.paipai.verticalframework.security.spring.data.PrivilegeBO;
import com.paipai.verticalframework.security.spring.data.SsoBO;
import com.paipai.verticalframework.web.util.CookieUtil;

/**
 * <??????>
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class SecurityUtil {

	private final static String SECURITY_ADMIN_URL_KEY = "security.bossAdminUrl";
	private final static String SECURITY_SYSTEM_KEY = "security.systemId";
	private final static String SECURITY_SYSTEM_DOMAIN = "security.domain";
	private final static String SECURITY_SYSTEM_MAX_TIMESTAMP = "security.maxTimestamp";
	private final static String SECURITY_SYSTEM_TOKEN = "security.token";
	private final static long SECURITY_SYSTEM_DEFAULT_MAX_TIMESTAMP = 24 * 60 * 60 * 1000;
	private final static String SECURITY_TOKEN_KEY = "__TOKEN__";
	private final static String SECURITY_USER_KEY = "__USER__";
	private final static String SECURITY_TIMESTAMP_KEY = "__TIMESTAMP__";
	private final static String SECURITY_TOKEN_SESSION_KEY = "__TOKEN_SESSION__";

	public static void loginSuccess(HttpServletRequest request,
			HttpServletResponse response, AccountBO accountBO) {
		List<String> functions = new ArrayList<String>();
		if (accountBO != null) {
			functions.add("menu_top.action");
			functions.add("menu_left.action");
			functions.add("menu_nav.action");
			functions.add("menu_footer.action");
			functions.add("menu_center.action");

			for (PrivilegeBO privilege : accountBO.getPrivileges()) {
				functions.add(privilege.getMenuUrl());

				if (privilege.getSubMenuUrls() != null
						&& !privilege.getSubMenuUrls().trim().equals("")) {
					StringTokenizer token = new StringTokenizer(privilege
							.getSubMenuUrls(), ",");
					while (token.hasMoreTokens()) {
						String oneUrl = token.nextToken();
						if (oneUrl != null && !oneUrl.trim().equals("")) {
							functions.add(oneUrl);
						}
					}
				}
			}
		}
		loginSuccess(request, response, accountBO, functions);
	}

	public static void loginSuccess(HttpServletRequest request,
			HttpServletResponse response, AccountBO accountBO,
			List<String> functions) {
		HttpSession session = request.getSession();
		session.setAttribute("loginAccount", accountBO);
		if (accountBO != null) {
			session.setAttribute("privileges", accountBO.getPrivileges());
		}
		session.setAttribute("functions", functions);

		long timestamp = System.currentTimeMillis();
		String token = OaKeyHandle.encrypt(getToken()
				+ accountBO.getUserBO().getUserName() + timestamp,
				SecurityConstants.DecryptWord, false);
		CookieUtil.setCookie(request, response, SECURITY_TOKEN_KEY, token,
				getDomain());
		CookieUtil.setCookie(request, response, SECURITY_USER_KEY, accountBO
				.getUserBO().getUserName(), getDomain());
		CookieUtil.setCookie(request, response, SECURITY_TIMESTAMP_KEY, Long
				.toString(timestamp), getDomain());
		session.setAttribute(SECURITY_TOKEN_SESSION_KEY, token);
	}

	public static SsoBO checkSso(HttpServletRequest request) {
		SsoBO bo = new SsoBO();
		Map<String, String> cookies = CookieUtil.getAllCookies(request);
		String token = cookies.get(SECURITY_TOKEN_KEY);
		String user = cookies.get(SECURITY_USER_KEY);
		bo.setToken(token);
		bo.setUsername(user);
		bo.setSystemId(getSystemId());

		if (token != null) {
			String tokenFromSession = (String) request.getSession()
					.getAttribute(SECURITY_TOKEN_SESSION_KEY);
			if (!token.equals(tokenFromSession)) {

				String timestamp = cookies.get(SECURITY_TIMESTAMP_KEY);

				try {
					long timestampValue = Long.parseLong(timestamp);
					bo.setTimestamp(timestampValue);
					// ??????????????????
					if (isTokenValid(token, user, timestampValue)) {
						bo.setReload(true);
					}
				}
				catch (NumberFormatException nfe) {
					Log.logInfo("error timestamp format %s", nfe, timestamp);
				}
			}
		}

		return bo;
	}

	public static String getAdminUrl() {
		return SystemConfig.getProperty(SECURITY_ADMIN_URL_KEY);
	}

	public static String getSystemId() {
		return SystemConfig.getProperty(SECURITY_SYSTEM_KEY);
	}

	public static String getDomain() {
		return SystemConfig.getProperty(SECURITY_SYSTEM_DOMAIN, "");
	}

	public static Long getMaxTimestamp() {
		return SystemConfig.getLongProperty(SECURITY_SYSTEM_MAX_TIMESTAMP,
				SECURITY_SYSTEM_DEFAULT_MAX_TIMESTAMP);
	}

	public static String getToken() {
		return SystemConfig.getProperty(SECURITY_SYSTEM_TOKEN, "");
	}

	public static boolean isTimestampInvalid(long timestampValue) {
		return (System.currentTimeMillis() - timestampValue <= getMaxTimestamp());
	}

	public static boolean isTokenValid(String token, String user,
			long timestampValue) {
		if (isTimestampInvalid(timestampValue)) {
			String source = OaKeyHandle.encrypt(getToken() + user
					+ timestampValue, SecurityConstants.DecryptWord, false);
			if (source.equals(token)) {
				return true;
			}
		}
		return false;
	}

	public static void logout(HttpServletRequest request,
			HttpServletResponse response) {
		CookieUtil.removeCookie(request, response, SECURITY_TOKEN_KEY);
		CookieUtil.removeCookie(request, response, SECURITY_USER_KEY);
		CookieUtil.removeCookie(request, response, SECURITY_TIMESTAMP_KEY);
		request.getSession().invalidate();
	}
}

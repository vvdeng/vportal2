/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CookieUtil.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2011-1-12			????
 */
package com.paipai.verticalframework.web.util;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * <??????>
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CookieUtil {

	public static Map<String, String> getAllCookies(HttpServletRequest request) {
		Map<String, String> cookies = new HashMap<String, String>();
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				cookies.put(cookie.getName(), cookie.getValue());
			}
		}
		return cookies;
	}

	public static Map<String, String> getCookiesValue(
			HttpServletRequest request, String... cookieNames) {
		Map<String, String> cookies = new HashMap<String, String>();
		if (request.getCookies() != null) {
			Set<String> cookieNameSet = new HashSet<String>();
			for (String name : cookieNames) {
				cookieNameSet.add(name);
			}
			for (Cookie cookie : request.getCookies()) {
				if (cookieNameSet.contains(cookie.getName())) {
					cookies.put(cookie.getName(), cookie.getValue());
				}
			}
		}
		return cookies;
	}

	public static Map<String, Cookie> getCookies(HttpServletRequest request,
			String... cookieNames) {
		Map<String, Cookie> cookies = new HashMap<String, Cookie>();
		if (request.getCookies() != null) {
			Set<String> cookieNameSet = new HashSet<String>();
			for (String name : cookieNames) {
				cookieNameSet.add(name);
			}
			for (Cookie cookie : request.getCookies()) {
				if (cookieNameSet.contains(cookie.getName())) {
					cookies.put(cookie.getName(), cookie);
				}
			}
		}
		return cookies;
	}

	public static String getCookieValue(HttpServletRequest request,
			String cookieName) {
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (cookieName.equals(cookie.getName())) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}

	public static Cookie getCookie(HttpServletRequest request, String cookieName) {
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (cookieName.equals(cookie.getName())) {
					return cookie;
				}
			}
		}
		return null;
	}

	public static void setCookie(HttpServletRequest request,HttpServletResponse response,
			String cookieName, String cookieValue, String domain) {
		setCookie(request, response, cookieName, cookieValue, domain, -1);
	}

	public static void setCookie(HttpServletRequest request,
			HttpServletResponse response, String cookieName,
			String cookieValue, String domain, int maxAge) {
		Cookie cookie = getCookie(request, cookieName);
		if (cookie == null) {
			cookie = new Cookie(cookieName, cookieValue);
		}
		else {
			cookie.setValue(cookieValue);
		}
		cookie.setMaxAge(maxAge);
		cookie.setPath("/");
		if (domain != null && domain.length() > 0) {
			cookie.setDomain(domain);
		}
		response.addCookie(cookie);
	}

	public static void removeCookie(HttpServletRequest request,
			HttpServletResponse response, String cookieName) {
		Cookie cookie = getCookie(request, cookieName);
		if (cookie != null) {
			cookie.setMaxAge(0);
			response.addCookie(cookie);
		}
	}
}

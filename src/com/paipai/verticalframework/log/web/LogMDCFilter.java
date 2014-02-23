/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??LogMDCFilter.java					
 *			
 * Description??????????????Log MDC??
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.log.web;

import java.io.IOException;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.MDC;

import com.paipai.verticalframework.core.RequestMDC;
import com.paipai.verticalframework.log.URILogAppender;

/**
 * ????????????Log MDC??
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class LogMDCFilter implements Filter {

	private Set<String> parameterKeyConfigs = new HashSet<String>();
	private Set<String> requestKeyConfigs = new HashSet<String>();
	private Set<String> sessionKeyConfigs = new HashSet<String>();
	private Set<String> cookieKeyConfigs = new HashSet<String>();

	public void init(FilterConfig config) throws ServletException {
		setKeyConfig(config, "parameter-key", parameterKeyConfigs);
		setKeyConfig(config, "request-key", requestKeyConfigs);
		setKeyConfig(config, "session-key", sessionKeyConfigs);
		setKeyConfig(config, "cookie-key", cookieKeyConfigs);
	}

	private void setKeyConfig(FilterConfig config, String paramName,
			Set<String> keyConfig) {
		String key = config.getInitParameter(paramName);
		if (key != null) {
			String[] values = key.split(",");
			for (String value : values) {
				value = value.trim();
				if (value.length() > 0) {
					keyConfig.add(value.trim());
				}
			}
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest,
	 *      javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		// ??????????????????Log MDC
		Map<String, Object> ctx = RequestMDC.getMDCMap();
		for (Map.Entry<String, Object> entry : ctx.entrySet()) {
			if (entry.getKey() != null && entry.getValue() != null) {
				MDC.put(entry.getKey(), entry.getValue());
			}
		}

		// ??????URI????MDC?У????????????URI??ò?????????????
		MDC.put(URILogAppender.KEY, RequestMDC.getRequestURI());

		if (req instanceof HttpServletRequest) {
			HttpServletRequest request = (HttpServletRequest) req;
			try {
				// ??????????л???Щ?????Log MDC
				if (parameterKeyConfigs.size() > 0) {
					for (String key : parameterKeyConfigs) {
						Object value = request.getParameter(key);
						if (value != null) {
							MDC.put(key, value);
						}
						value = null;
					}
				}

				// ???????л???Щ?????Log MDC
				if (requestKeyConfigs.size() > 0) {
					for (String key : requestKeyConfigs) {
						Object value = request.getAttribute(key);
						if (value != null) {
							MDC.put(key, value);
						}
						value = null;
					}
				}

				// ??session?????л???Щ?????Log MDC
				if (sessionKeyConfigs.size() > 0
						&& request.getSession(false) != null) {
					for (String key : sessionKeyConfigs) {
						Object value = request.getSession(false).getAttribute(
								key);
						if (value != null) {
							MDC.put(key, value);
						}
						value = null;
					}
				}

				// ??cookie?????л???Щ?????Log MDC
				if (cookieKeyConfigs.size() > 0) {
					Cookie[] cookies = request.getCookies();
					if (cookies != null) {
						for (Cookie cookie : cookies) {
							if (cookieKeyConfigs.contains(cookie.getName())) {
								MDC.put(cookie.getName(), cookie.getValue());
							}
						}
					}
				}

				chain.doFilter(req, res);
			}
			finally {
				for (String key : ctx.keySet()) {
					MDC.remove(key);
				}

				if (parameterKeyConfigs.size() > 0) {
					for (String key : parameterKeyConfigs) {
						MDC.remove(key);
					}
				}

				if (requestKeyConfigs.size() > 0) {
					for (String key : requestKeyConfigs) {
						MDC.remove(key);
					}
				}
				if (sessionKeyConfigs.size() > 0) {
					for (String key : sessionKeyConfigs) {
						MDC.remove(key);
					}
				}
				if (cookieKeyConfigs.size() > 0) {
					for (String key : cookieKeyConfigs) {
						MDC.remove(key);
					}
				}
			}
		}
		else {
			chain.doFilter(req, res);
		}
	}

	public void destroy() {
	}
}

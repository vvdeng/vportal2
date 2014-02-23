/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??AjaxRequestFilter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		carldong		2010-11-19			????
 */
package com.paipai.verticalframework.web.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.CharacterEncodingFilter;

/**
 * ajax?????????
 * 
 * @author carldong????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class AjaxRequestFilter extends CharacterEncodingFilter {

	private String ajaxEncode = "UTF-8";
	private String commonEncode = "UTF-8";
	private String ajaxRequestKey = "isAjaxRequest";

	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		if (isAJAXRequest(request)) {
			request.setCharacterEncoding(ajaxEncode);
			response.setCharacterEncoding(ajaxEncode);
		}
		else {
			request.setCharacterEncoding(commonEncode);
			response.setCharacterEncoding(commonEncode);
		}
		filterChain.doFilter(request, response);
	}

	public boolean isAJAXRequest(HttpServletRequest servletRequest) {
		return Boolean.TRUE.toString().equalsIgnoreCase(
				servletRequest.getHeader(ajaxRequestKey));
	}
}

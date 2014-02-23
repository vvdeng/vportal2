/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??RequestUtils.java
 * 
 * Description?????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-19			????
 */
package com.paipai.verticalframework.web.spring;

import com.paipai.verticalframework.core.RequestMDC;

/**
 * ???????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class RequestUtils {

	public static boolean isRequestHessian(String contextPath) {
		String uri = RequestMDC.getRequestURI();
		if ("/".equals(contextPath)) {
			return uri.startsWith("/hessian/");
		}
		else {
			return uri.startsWith(contextPath + "/hessian/");
		}
	}

	public static boolean isRequestJson() {
		String uri = RequestMDC.getRequestURI();
		return uri.endsWith(".json");
	}

	public static boolean isRequestUrlText() {
		String uri = RequestMDC.getRequestURI();
		return uri.endsWith(".url");
	}
}

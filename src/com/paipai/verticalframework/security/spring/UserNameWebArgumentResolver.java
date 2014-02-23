/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??UserNameWebArgumentResolver.class				
 *			
 * Description????????????????????????????????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0   raywu  2010-11-09  Create	
 */
package com.paipai.verticalframework.security.spring;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebArgumentResolver;
import org.springframework.web.context.request.NativeWebRequest;

import com.paipai.verticalframework.core.RequestMDC;
import com.paipai.verticalframework.security.UserVo;

/**
 * ??????????????????????????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class UserNameWebArgumentResolver implements WebArgumentResolver {

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.web.bind.support.WebArgumentResolver#resolveArgument(org.springframework.core.MethodParameter,
	 *      org.springframework.web.context.request.NativeWebRequest)
	 */
	public Object resolveArgument(MethodParameter methodparameter,
			NativeWebRequest nativewebrequest) throws Exception {
		if (methodparameter.getParameterType().isAssignableFrom(UserVo.class)) {
			return new UserVo(RequestMDC.getUserName());
		}
		return UNRESOLVED;
	}

}

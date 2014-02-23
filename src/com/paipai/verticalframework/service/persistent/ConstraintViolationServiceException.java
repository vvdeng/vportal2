/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??ConstraintViolationServiceException.java					
 *			
 * Description??Υ??Ψ???????????? 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-10-27   Create	
 */
package com.paipai.verticalframework.service.persistent;

import com.paipai.verticalframework.core.BaseException;

/**
 * Υ??Ψ????????????
 * 
 * @author raywu (ayufox@gmail.com)
 */
public class ConstraintViolationServiceException extends BaseException {

	public ConstraintViolationServiceException() {
		super();
	}

	public ConstraintViolationServiceException(String message, Throwable cause) {
		super(message, cause);
	}

	public ConstraintViolationServiceException(String message) {
		super(message);
	}

	public ConstraintViolationServiceException(Throwable cause) {
		super(cause);
	}
}

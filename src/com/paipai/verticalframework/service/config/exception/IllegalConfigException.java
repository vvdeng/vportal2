/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??IllegalConfigException.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-12-24			????
 */
package com.paipai.verticalframework.service.config.exception;

import com.paipai.verticalframework.core.BaseRuntimeException;


/** 
 * ?????????
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class IllegalConfigException extends BaseRuntimeException {

	public IllegalConfigException() {
		super();
	}

	public IllegalConfigException(String message, Throwable cause) {
		super(message, cause);
	}

	public IllegalConfigException(String message) {
		super(message);
	}

	public IllegalConfigException(Throwable cause) {
		super(cause);
	}
}

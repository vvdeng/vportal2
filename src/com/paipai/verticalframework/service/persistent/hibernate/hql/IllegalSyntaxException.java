/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??IllegalSyntaxException.java					
 *			
 * Description?????HQL?????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.hql;

import com.paipai.verticalframework.core.BaseRuntimeException;

/**
 * ???HQL?????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class IllegalSyntaxException extends BaseRuntimeException {

	public IllegalSyntaxException(Throwable t) {
		super(t);
	}

	public IllegalSyntaxException(String message) {
		super(message);
	}
}

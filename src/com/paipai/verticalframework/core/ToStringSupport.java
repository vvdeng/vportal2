/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??ToStringSupport.java					
 *			
 * Description???????????toString????							 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.core;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * ?????????toString????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class ToStringSupport {

	public String toString() {
		return toString(this);
	}

	public static String toString(Object obj) {
		return ToStringBuilder.reflectionToString(obj,
				ToStringStyle.SHORT_PREFIX_STYLE);
	}
}

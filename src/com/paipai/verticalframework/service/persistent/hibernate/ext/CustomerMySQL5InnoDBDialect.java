/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??CustomerMySQL5InnoDBDialect.java					
 *			
 * Description??Mysql Hibernate Dialect				 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.ext;

import org.hibernate.dialect.MySQL5InnoDBDialect;

import com.paipai.verticalframework.log.Log;

/**
 * Mysql Hibernate Dialect
 * 
 * @author raywu (ayufox@gmail.com)
 */
public class CustomerMySQL5InnoDBDialect extends MySQL5InnoDBDialect {

	public CustomerMySQL5InnoDBDialect() {
		super();
		Log
				.logInfo("Register bitand function for bit-and operation. (e.g.: where a & b = :c)");
		registerFunction("bitand", new BitAndFunction());
		registerFunction("bitor", new BitOrFunction());
	}
}
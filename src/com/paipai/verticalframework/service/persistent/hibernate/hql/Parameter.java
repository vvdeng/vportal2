/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??Parameter.java					
 *			
 * Description??HQL???????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.hql;

/**
 * HQL???????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class Parameter {

	public final static String NOT_ALLOWED = ".";
	public final static String REPLACE = "_";

	private String name;

	private Object value;

	public Parameter(String name, Object value) {
		this.name = name.replace(NOT_ALLOWED, REPLACE);
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public Object getValue() {
		return value;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		StringBuffer buffer = new StringBuffer("Parameter:");
		buffer.append("[name:'" + this.name + "']");
		buffer.append("[value:'" + this.value + "']");
		return buffer.toString();
	}
}

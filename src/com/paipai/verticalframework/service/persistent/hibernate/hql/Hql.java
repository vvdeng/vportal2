/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??Hql.java					
 *			
 * Description??Hql???????		 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.hql;

import com.paipai.verticalframework.core.util.Asserts;

/**
 * Hql???????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class Hql {

	public final static String INDEX_PARAMETER_NAME_PREFIX = "p";

	public static Hql createIndexHql(String hqlstr, Object... values) {
		Object[] arguments = new Object[values.length * 2];
		for (int i = 0; i < values.length; i++) {
			arguments[i * 2] = INDEX_PARAMETER_NAME_PREFIX + i;
			arguments[i * 2 + 1] = values[i];
		}
		return new Hql(hqlstr, arguments);
	}

	private String hql;
	private Parameter[] parameters;

	public Hql(String hql, Parameter... parameters) {
		init(hql, parameters);
	}

	/**
	 * Hql???????1?7
	 * 
	 * @param hql
	 *            hql???
	 * @param arguments
	 *            ????
	 */
	public Hql(String hql, Object... arguments) {
		checkArguments(arguments);
		Parameter[] parameters = new Parameter[arguments.length / 2];
		for (int i = 0; i < parameters.length; i = i + 1) {
			parameters[i] = new Parameter(arguments[i * 2].toString(),
					arguments[i * 2 + 1]);
		}
		init(hql, parameters);
	}

	public Hql(String hql) {
		this(hql, new Parameter[0]);
	}

	public String getHql() {
		return hql;
	}

	public Parameter[] getParameters() {
		return parameters;
	}

	/**
	 * @param hql
	 * @param cache
	 * @param parameters
	 */
	private void init(String hql, Parameter... parameters) {
		this.hql = hql;
		this.parameters = parameters;
	}

	/**
	 * @param arguments
	 */
	private void checkArguments(Object[] arguments) {
		Asserts.assertNotNull(arguments, Hql.class, "arguments");
		Asserts.assertTrue(arguments.length % 2 == 0,
				"Arguments must'be paired");
		for (int i = 0; i < arguments.length; i = i + 2) {
			Asserts.assertNotNull(arguments[i], Hql.class, "Parameter name");
			Asserts.assertBeType(arguments[i], String.class, Hql.class,
					"Parameter name");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		StringBuffer buffer = new StringBuffer("Hql:");
		buffer.append("[hql:'" + hql + "']");
		for (int i = 0; i < this.parameters.length; i++) {
			buffer.append("[parameter" + i + ":'" + this.parameters[i] + "']");
		}
		return buffer.toString();
	}
}

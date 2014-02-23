/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??VariableExpander.java					
 *			
 * Description?????????)??????									 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.core;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * ???????)??????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class VariableExpander {

	private Properties variables; // ?????????

	private String pre = "${"; // ??????

	private String post = "}"; // ??????

	private Map cache; // ??????????cache

	public VariableExpander(Properties variables) {
		this.variables = variables;
		cache = new HashMap();
	}

	/**
	 * ???cache
	 * 
	 * @see ?ο???JavaDoc
	 */
	public void clearCache() {
		cache.clear();
	}

	/**
	 * ???????????????
	 * 
	 * @param name?????
	 * @return String
	 * @see ?ο???JavaDoc
	 */
	public String getValue(String name) {
		String value = this.variables.getProperty(name);
		return expandVariables(value);
	}

	private String expandVariables(String source) {
		String result = (String) this.cache.get(source);

		if (source == null || result != null) {
			return result;
		}

		int fIndex = source.indexOf(this.pre);

		if (fIndex == -1) {
			return source;
		}

		StringBuffer sb = new StringBuffer(source);

		while (fIndex > -1) {
			int lIndex = sb.indexOf(this.post);

			int start = fIndex + this.pre.length();

			if (fIndex == 0) {
				String varName = sb.substring(start, start + lIndex
						- this.pre.length());
				sb.replace(fIndex, fIndex + lIndex + 1, this.variables
						.getProperty(varName));
			}
			else {
				String varName = sb.substring(start, lIndex);
				sb.replace(fIndex, lIndex + 1, this.variables
						.getProperty(varName));
			}

			fIndex = sb.indexOf(this.pre);
		}

		result = sb.toString();

		this.cache.put(source, result);

		return result;
	}
}

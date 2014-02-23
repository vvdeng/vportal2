/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??CommonUtils.java					
 *			
 * Description?????ù?????	 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0      raywu  2010-09-28   Create	
 */
package com.paipai.verticalframework.core.util;

import java.util.Collection;

import org.apache.commons.lang.StringUtils;

/**
 * ???ù?????
 * 
 * @author raywu (ayufox@gmail.com)
 */
public class CommonUtils {

	/**
	 * ??????
	 * 
	 * @param obj
	 * @return boolean
	 */
	public static boolean isEmpty(Object obj) {
		if (obj == null) {
			return true;
		}
		else if (obj instanceof String) {
			return StringUtils.isEmpty((String) obj);
		}
		else if (obj instanceof Object[]) {
			return (((Object[]) obj).length == 0);
		}
		else if (obj instanceof Collection) {
			return (((Collection) obj).size() == 0);
		}
		else {
			return false;
		}
	}

	/**
	 * ??????
	 * 
	 * @param first
	 * @param second
	 * @return boolean
	 */
	public static boolean equals(Object first, Object second) {
		if (first == null) {
			return (second == null);
		}
		else {
			return (first.equals(second));
		}
	}

	/**
	 * ???????
	 * 
	 * @param array
	 * @param merge
	 * @return String
	 */
	public static String merge(String[] array, String merge) {
		if (array == null || merge == null) {
			throw new IllegalArgumentException("array or merge can't be null");
		}

		StringBuffer buffer = new StringBuffer();
		for (String str : array) {
			if (buffer.length() > 0) {
				buffer.append(merge);
			}
			buffer.append(str);
		}
		return buffer.toString();
	}

	/**
	 * ?и????
	 * 
	 * @param string
	 * @param split
	 * @return String[]
	 */
	public static String[] split(String string, String split) {
		if (string == null || split == null) {
			throw new IllegalArgumentException("string or split can't be null");
		}

		return string.split(split);
	}
}

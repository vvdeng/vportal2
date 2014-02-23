/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??UIFunction.java
 * 
 * Description??UI????)?
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-24			????
 */
package com.paipai.verticalframework.ui.function;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.apache.commons.lang.StringEscapeUtils;

import flexjson.JSONSerializer;

/**
 * UI????)?
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class UIFunction {

	/**
	 * ???????????json???
	 * 
	 * @param src
	 *            ??????
	 * @return String
	 * @see ?ο???JavaDoc
	 */
	public static String formatJson(Object src) {
		JSONSerializer serializer = new JSONSerializer();
		serializer.exclude("class");
		String json = serializer.serialize(src);
		return StringEscapeUtils.escapeHtml(json);
	}

	/**
	 * ???????????json???
	 * 
	 * @param src
	 *            ??????
	 * @param includes
	 *            ????Щ????
	 * @param excludes
	 *            ?????Щ????
	 * @return String
	 * @see ?ο???JavaDoc
	 */
	public static String formatJson(Object src, String includes, String excludes) {
		JSONSerializer serializer = new JSONSerializer();
		serializer.exclude("class");
		if (includes != null && includes.trim().length() > 0) {
			String[] args = includes.split(",");
			for (String arg : args) {
				serializer = serializer.include(arg);
			}
		}

		if (excludes != null && excludes.trim().length() > 0) {
			String[] args = excludes.split(",");
			for (String arg : args) {
				serializer = serializer.exclude(arg);
			}
		}
		String json = serializer.serialize(src);
		return StringEscapeUtils.escapeHtml(json);
	}

	/**
	 * ???????????
	 * 
	 * @param date
	 *            ????
	 * @return String
	 * @see ?ο???JavaDoc
	 */
	public static String formatDate(Date date) {
		if (date == null) {
			return "";
		}
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		return format.format(date);
	}

	/**
	 * ????????????
	 * 
	 * @param date
	 *            ????
	 * @return String
	 * @see ?ο???JavaDoc
	 */
	public static String formatTime(Date date) {
		if (date == null) {
			return "";
		}
		SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
		return format.format(date);
	}

	/**
	 * ???????????????
	 * 
	 * @param date
	 *            ????
	 * @return String
	 * @see ?ο???JavaDoc
	 */
	public static String formatTimestamp(Date date) {
		if (date == null) {
			return "";
		}
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return format.format(date);
	}

	/**
	 * ???escape
	 * 
	 * @param src
	 *            ?????
	 * @param format
	 *            ????????js/html/xml
	 * @return String
	 * @see ?ο???JavaDoc
	 */
	public static String escape(String src, String format) {
		if (src == null) {
			return "";
		}

		if ("js".equals(format)) {
			return StringEscapeUtils.escapeJavaScript(src);
		}
		else if ("html".equals(format)) {
			return StringEscapeUtils.escapeHtml(src);
		}
		else if ("xml".equals(format)) {
			return StringEscapeUtils.escapeXml(src);
		}
		else {
			throw new IllegalArgumentException("format[" + format
					+ "] unsupported");
		}
	}

	/**
	 * ???unescape
	 * 
	 * @param src
	 *            ?????
	 * @param format
	 *            ????????js/html/xml
	 * @return String
	 * @see ?ο???JavaDoc
	 */
	public static String unescape(String src, String format) {
		if (src == null) {
			return "";
		}

		if ("js".equals(format)) {
			return StringEscapeUtils.unescapeJavaScript(src);
		}
		else if ("html".equals(format)) {
			return StringEscapeUtils.unescapeHtml(src);
		}
		else if ("xml".equals(format)) {
			return StringEscapeUtils.unescapeXml(src);
		}
		else {
			throw new IllegalArgumentException("format[" + format
					+ "] unsupported");
		}
	}

	/**
	 * ifelse????????? ? :
	 * 
	 * @param bool
	 *            ?ж????
	 * @param ifValue
	 *            ????????????
	 * @param elseValue
	 *            ??????????????
	 * @return Object
	 * @see ?ο???JavaDoc
	 */
	public static Object ifelse(boolean bool, Object ifValue, Object elseValue) {
		return (bool ? ifValue : elseValue);
	}

	/**
	 * if???
	 * 
	 * @param bool
	 *            ?ж????
	 * @param ifValue
	 *            ????????????
	 * @return Object
	 * @see ?ο???JavaDoc
	 */
	public static Object iftrue(boolean bool, Object ifValue) {
		return ifelse(bool, ifValue, null);
	}
	
	/**
	 * map?????key??map?л?????
	 * 
	 * @param key
	 *            key
	 * @param map
	 *            value map
	 * @return Object
	 * @see ?ο???JavaDoc
	 */
	public static Object map(Object key, Map map) {
		return map2(key, map, key);
	}
	
	/**
	 * map?????key??map?л?????
	 * 
	 * @param key
	 *            key
	 * @param map
	 *            value map
	 * @param defaultValue
	 *            ???????
	 * @return Object
	 * @see ?ο???JavaDoc
	 */
	public static Object map2(Object key, Map map, Object defaultValue) {
		if (map == null) {
			return null;
		}
		Object value = map.get(key);
		return (value == null ? defaultValue : value);
	}

	/**
	 * ??????????????
	 * @param value??????
	 * @return java.util.Date
	 * @see ?ο???JavaDoc
	 */
	public static Date sec2Date(long value) {
		if (value == 0) {
			return null;
		}
		return new Timestamp(value * 1000);
	}

	/**
	 * ????????????????
	 * @param value????????
	 * @return java.util.Date
	 * @see ?ο???JavaDoc
	 */
	public static Date msec2Date(long value) {
		if (value == 0) {
			return null;
		}
		return new Timestamp(value);
	}
}

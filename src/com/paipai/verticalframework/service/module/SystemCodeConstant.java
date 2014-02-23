/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??SystemCodeConstant.java					
 *			
 * Description?????????崦????											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-10-27   Create	
 */
package com.paipai.verticalframework.service.module;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;

import com.paipai.verticalframework.core.SystemConfig;
import com.paipai.verticalframework.log.Log;

/** 
 * ???????崦????
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class SystemCodeConstant {

	private static Map<Long, String> moduleMap = new HashMap<Long, String>();
	private static Map<Long, Comment> commentInfoMap = new HashMap<Long, Comment>();
	static {
		String targetClassName = SystemConfig
				.getProperty("system.codeconstant");
		try {
			Class targetClass = Class.forName(targetClassName);
			registCodeClass(targetClass);
		}
		catch (ClassNotFoundException e) {
			Log.logError("system.codeconstant[" + targetClassName
					+ "] Class Not Found!", e);
		}
	}

	public static void registCodeClass(Class targetClass) {
		Log.logInfo("regist {0}", targetClass);

		Field[] fields = targetClass.getDeclaredFields();
		for (int i = 0; i < fields.length; i++) {
			if (((fields[i].getModifiers() & Modifier.PUBLIC) == Modifier.PUBLIC)
					&& (fields[i].getModifiers() & Modifier.STATIC) == Modifier.STATIC) {
				if (fields[i].isAnnotationPresent(Module.class)) {
					Module module = fields[i].getAnnotation(Module.class);
					try {
						Long value = fields[i].getLong(null);
						moduleMap.put(value, module.value());
						Log.logDebug("load module [key:{0},value:{1}]", value,
								module.value());
					}
					catch (Exception e) {
						Log.logError("Get Value From Field ["
								+ fields[i].getName() + "] Of Class["
								+ targetClass + "] failed", e);
					}
				}
				else if (fields[i].isAnnotationPresent(Comment.class)) {
					Comment comment = fields[i].getAnnotation(Comment.class);
					try {
						Long value = fields[i].getLong(null);
						commentInfoMap.put(value, comment);
						Log.logDebug(
								"load code [key:{0},title:{1},message:{2}]",
								value, comment.title(), comment.message());
					}
					catch (Exception e) {
						Log.logError("Get Value From Field ["
								+ fields[i].getName() + "] Of Class["
								+ targetClass + "] failed", e);
					}
				}
			}
		}
	}

	public static Long getModuleId(Long code) {
		return code / 1000L;
	}

	public static String getModuleName(Long module) {
		return moduleMap.get(module);
	}

	public static Comment getComment(Long code) {
		return commentInfoMap.get(code);
	}

	public static String formatMessage(Long code) {
		Comment info = commentInfoMap.get(code);
		if (info == null) {
			return "";
		}
		else {
			return info.message();
		}
	}

	public static String formatMessage(Long code, Object... arguments) {
		Comment info = commentInfoMap.get(code);
		if (info == null) {
			return "";
		}
		else {
			return MessageFormat.format(info.message(), arguments);
		}
	}
}

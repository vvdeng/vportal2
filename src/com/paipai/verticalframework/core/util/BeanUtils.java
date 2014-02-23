/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??BeanUtils.class				
 *			
 * Description????????????	 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0   raywu  2010-11-09  Create	
 */
package com.paipai.verticalframework.core.util;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * ??????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class BeanUtils {

	private final static Log LOGGER = LogFactory.getLog(BeanUtils.class);

	/**
	 * ??????????????????????
	 * 
	 * @param src???????
	 * @param clazz????????????
	 * @return <T>
	 * @see ?ο???JavaDoc
	 */
	public static <T> T copyTo(Object src, Class<T> clazz) {
		Object target = ClassUtils.createInstance(clazz);
		org.springframework.beans.BeanUtils.copyProperties(src, target);
		return (T) target;
	}

	public static void copyTo(Object src, Object target) {

		org.springframework.beans.BeanUtils.copyProperties(src, target);

	}

	/**
	 * ?????????????Map
	 * 
	 * @param src???????
	 * @return Map<String, Object>
	 * @see ?ο???JavaDoc
	 */
	public static Map<String, Object> toMap(Object src) {
		Field[] fields = src.getClass().getDeclaredFields();
		Map<String, Object> map = new HashMap<String, Object>();
		for (Field field : fields) {
			try {
				field.setAccessible(true);
				map.put(field.getName(), field.get(src));
			} catch (Exception e) {
				LOGGER.error("error access filed[" + field.getName() + "] of ["
						+ src + "]", e);
			}
		}
		return map;
	}

	/**
	 * ??????Map????????????
	 * 
	 * @param map
	 *            ????map
	 * @param obj
	 *            ????????
	 * @see ?ο???JavaDoc
	 */
	public static void map2Object(Map map, Object obj) {
		if (map == null || obj == null)
			return;

		Field[] fields = obj.getClass().getDeclaredFields();

		for (Field field : fields) {
			try {
				field.setAccessible(true);
				if (map.containsKey(field.getName())) {
					field.setAccessible(true);
					field.get(obj);
					field.set(obj, map.get(field.getName()));
				}
			} catch (Exception e) {
				LOGGER.error("error access filed[" + field.getName() + "] to ["
						+ obj + "]", e);
			}
		}
	}
}

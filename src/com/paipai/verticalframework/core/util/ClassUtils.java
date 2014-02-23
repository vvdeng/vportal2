/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??ClassUtils.java					
 *			
 * Description????????????			 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0      raywu  2010-09-28   Create	
 */
package com.paipai.verticalframework.core.util;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.HashSet;
import java.util.Set;

/**
 * ??????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 */
public class ClassUtils {

	/**
	 * ??????????????????
	 * 
	 * @param cls
	 *            ????
	 * @see ?ο???JavaDoc
	 */
	public static Object createInstance(Class cls) {
		if (cls == null) {
			throw new IllegalArgumentException("target class can't be null");
		}

		try {
			return cls.newInstance();
		}
		catch (InstantiationException e) {
			throw new CreateInstanceFailedException(e);
		}
		catch (IllegalAccessException e) {
			throw new CreateInstanceFailedException(e);
		}
	}

	/**
	 * ??????г???
	 * 
	 * @param target
	 * @return Set
	 */
	public static Set resolveAllConstantValue(Class target) {
		if (target == null) {
			throw new IllegalArgumentException("target class can't be null");
		}

		Set set = new HashSet();
		Field[] fields = target.getDeclaredFields();
		for (Field f : fields) {
			int modify = f.getModifiers();
			// public final static
			if (Modifier.isPublic(modify) && Modifier.isFinal(modify)
					&& Modifier.isStatic(modify)) {
				try {
					set.add(f.get(null));
				}
				catch (IllegalArgumentException e) {
					Asserts.fail("Can't happen here!");
				}
				catch (IllegalAccessException e) {
					Asserts.fail("Can't happen here!");
				}
			}
		}
		return set;
	}

	/**
	 * ???????????
	 * 
	 * @param obj
	 * @param type
	 * @return boolean
	 */
	public static boolean isTypeOf(Object obj, Class type) {
		return type.isAssignableFrom(obj.getClass());
	}
}

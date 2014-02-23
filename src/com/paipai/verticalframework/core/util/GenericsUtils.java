/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??GenericsUtils.java					
 *			
 * Description????????????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0      raywu  2010-09-28   Create	
 */
package com.paipai.verticalframework.core.util;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

/**
 * Provides a helper that locates the declarated generics type of a class.
 * 
 * @author sshwsfc@gmail.com
 */
public class GenericsUtils {

	/**
	 * Locates the first generic declaration on a class.
	 * 
	 * @param clazz
	 *            The class to introspect
	 * @return the first generic declaration, or <code>null</code> if cannot
	 *         be determined
	 */
	public static Class getGenericClass(Class clazz) {
		return getGenericClass(clazz, 0);
	}

	/**
	 * Locates generic declaration by index on a class.
	 * 
	 * @param clazz
	 *            clazz The class to introspect
	 * @param index
	 *            the Index of the generic ddeclaration,start from 0.
	 */
	public static Class getGenericClass(Class clazz, int index) {
		Type genType = clazz.getGenericSuperclass();

		if (genType instanceof ParameterizedType) {
			Type[] params = ((ParameterizedType) genType)
					.getActualTypeArguments();

			if ((params != null) && (params.length >= (index - 1))
					&& params[index] instanceof Class) {
				return (Class) params[index];
			}
		}
		return null;
	}
}

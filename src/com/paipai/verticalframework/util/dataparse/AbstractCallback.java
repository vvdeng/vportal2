/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??AbstractCallback.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Dec 6, 2010			????
 */
package com.paipai.verticalframework.util.dataparse;

import java.beans.PropertyEditor;
import java.beans.PropertyEditorManager;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;


/** 
 * ????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public abstract class AbstractCallback<T> implements ICallback {
	
	protected Map<Integer, String> propertyMap = null;
	
	public AbstractCallback(Map<Integer, String> propertyMap) {
		this.propertyMap = propertyMap;
	}
	
	protected T parse(Object[] data) throws InstantiationException, IllegalAccessException, SecurityException, NoSuchFieldException, InvocationTargetException, NoSuchMethodException, ParseException {
		if (data == null || data.length == 0)
			return null;
		// ???????????????????Object[]
		if (!(getClass().getGenericSuperclass() instanceof ParameterizedType)) {
			return (T)data;
		}
		// ???????????У???????Object[]
		if (this.propertyMap == null) {
			return (T)data;
		}
		Class<T> tClass = (Class<T>) ((ParameterizedType)getClass().getGenericSuperclass()).getActualTypeArguments()[0];
		T t = tClass.newInstance();
		for (int i = 0; i < data.length; i++) {
			if (!this.propertyMap.containsKey(i))
				continue;
			String fieldName = this.propertyMap.get(i);
			Class propertyType = PropertyUtils.getPropertyType(t, fieldName);
			if (data[i] == null) {
				PropertyUtils.setProperty(t, fieldName, this.getDefaultValue(propertyType));
				continue;
			}
			if (data[i] instanceof String) {
				// ?????excel????string??????????п??????????????
				String stringData = data[i].toString();
				if (stringData.length() == 0)
					PropertyUtils.setProperty(t, fieldName, this.getDefaultValue(propertyType));
				if (propertyType.getName().equals(Date.class.getName())) {
					if (stringData.length() == "yyyy-MM-dd HH:mm:ss".length()) {
						SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						PropertyUtils.setProperty(t, fieldName, format.parse(stringData));
					}
					else if (stringData.length() == "yyyy-MM-dd HH:mm".length()) {
						SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
						PropertyUtils.setProperty(t, fieldName, format.parse(stringData));
					}
					else if (stringData.length() == "yyyy-MM-dd".length()) {
						SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
						PropertyUtils.setProperty(t, fieldName, format.parse(stringData));
					}
					else {
						PropertyUtils.setProperty(t, fieldName, this.getDefaultValue(propertyType));
					}
				}
				else {
					PropertyEditor propertyEditor = PropertyEditorManager.findEditor(propertyType);
					if (propertyEditor == null) {
						PropertyUtils.setProperty(t, fieldName, this.getDefaultValue(propertyType));
					}
					else {
						propertyEditor.setAsText(stringData);
						PropertyUtils.setProperty(t, fieldName, propertyEditor.getValue());
					}
				}
			}
			else {
				PropertyUtils.setProperty(t, fieldName, data[i]);
			}
		}
		return t;
	}
	
	private Object getDefaultValue(Class clazz) {
		if (clazz.isPrimitive()) {
			if (clazz.getName().equals(Boolean.class.getName()))
				return false;
			else
				return 0;
		}
		else {
			return null;
		}
	}
}

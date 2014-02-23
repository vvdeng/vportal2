/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??NativeNumberEditor.java
 * 
 * Description?????????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-19			????
 */
package com.paipai.verticalframework.web.spring;

import java.beans.PropertyEditorSupport;
import java.text.NumberFormat;

import org.springframework.util.NumberUtils;
import org.springframework.util.StringUtils;

/**
 * ???????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class NativeNumberEditor extends PropertyEditorSupport {

	private final Class numberClass;
	private final NumberFormat numberFormat;
	private final boolean allowEmpty;

	public NativeNumberEditor(Class numberClass, boolean allowEmpty)
			throws IllegalArgumentException {
		this(numberClass, null, allowEmpty);
	}

	public NativeNumberEditor(Class numberClass, NumberFormat numberFormat,
			boolean allowEmpty) throws IllegalArgumentException {

		if (numberClass == int.class) {
			this.numberClass = Integer.class;
		}
		else if (numberClass == long.class) {
			this.numberClass = Long.class;
		}
		else if (numberClass == double.class) {
			this.numberClass = Double.class;
		}
		else if (numberClass == float.class) {
			this.numberClass = Float.class;
		}
		else {
			throw new IllegalArgumentException(
					"Property class must be a subclass of int/long/double/float");
		}
		this.numberFormat = numberFormat;
		this.allowEmpty = allowEmpty;
	}

	public void setAsText(String text) throws IllegalArgumentException {
		if (allowEmpty && !StringUtils.hasText(text)) {
			setValue(NumberUtils.parseNumber("0", numberClass));
		}
		else if (numberFormat != null) {
			setValue(NumberUtils.parseNumber(text, numberClass, numberFormat));
		}
		else {
			setValue(NumberUtils.parseNumber(text, numberClass));
		}
	}

	public String getAsText() {
		Object value = getValue();
		if (value == null)
			return "";
		if (numberFormat != null)
			return numberFormat.format(value);
		else
			return value.toString();
	}
}

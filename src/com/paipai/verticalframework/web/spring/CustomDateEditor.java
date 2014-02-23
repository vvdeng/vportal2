/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CustomDateEditor.java
 * 
 * Description?????????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-19			????
 */
package com.paipai.verticalframework.web.spring;

import java.beans.PropertyEditorSupport;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.util.Date;

import org.springframework.util.StringUtils;

/**
 * ???????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CustomDateEditor extends PropertyEditorSupport {

	private final DateFormat dateFormat;
	private final boolean allowEmpty;
	private final int exactDateLength;

	public CustomDateEditor(DateFormat dateFormat, boolean allowEmpty) {
		this.dateFormat = dateFormat;
		this.allowEmpty = allowEmpty;
		exactDateLength = -1;
	}

	public CustomDateEditor(DateFormat dateFormat, boolean allowEmpty,
			int exactDateLength) {
		this.dateFormat = dateFormat;
		this.allowEmpty = allowEmpty;
		this.exactDateLength = exactDateLength;
	}

	public void setAsText(String text) throws IllegalArgumentException {
		
		if (allowEmpty && !StringUtils.hasText(text)) {
			setValue(null);
		}
		else {
			if (text != null && exactDateLength >= 0
					&& text.length() != exactDateLength)
				throw new IllegalArgumentException(
						"Could not parse date: it is not exactly"
								+ exactDateLength + "characters long");
			try {
				setValue(new Timestamp(dateFormat.parse(text).getTime()));
			}
			catch (ParseException ex) {
				IllegalArgumentException iae = new IllegalArgumentException(
						"Could not parse date: " + ex.getMessage());
				iae.initCause(ex);
				throw iae;
			}
		}
	}

	public String getAsText() {
		
		Date value = (Date) getValue();
		return value == null ? "" : dateFormat.format(value);
	}
}

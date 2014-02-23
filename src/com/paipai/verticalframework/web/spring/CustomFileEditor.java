/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CustomFileEditor.java
 * 
 * Description?????????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-19			????
 */
package com.paipai.verticalframework.web.spring;

import org.springframework.beans.propertyeditors.FileEditor;

import com.paipai.verticalframework.web.upload.AjaxFileUploadUtil;

/**
 * ???????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CustomFileEditor extends FileEditor {

	public void setAsText(String text) throws IllegalArgumentException {
		System.out.println("text="+text);
		if (text != null && text.length() > 0) {
			setValue(AjaxFileUploadUtil.getFile(text));
		}
	}
}

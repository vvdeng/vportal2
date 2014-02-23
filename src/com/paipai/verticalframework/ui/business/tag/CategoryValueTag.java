/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CategoryValueTag.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2011-1-5			????
 */
package com.paipai.verticalframework.ui.business.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.business.printer.CategoryValuePrinter;

/**
 * <??????>
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CategoryValueTag extends SimpleTagSupport {
	/**
	 * ????????
	 */
	private static Integer ID_STEP = 1;

	private String id = "categoryValue_" + (ID_STEP++);
	private String value;

	public void doTag() throws JspException, IOException {
		CategoryValuePrinter categoryValuePrinter = new CategoryValuePrinter(getJspBody(),
				getJspContext());
		categoryValuePrinter.printCategoryValue(id, value);
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setValue(String value) {
		this.value = value;
	}
}

/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??ValueTag.java
 * 
 * Description?????property???,??????????Map?????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		carldong		2010-11-19			????
 */
package com.paipai.verticalframework.ui.component.tag;

import java.io.IOException;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.component.printer.ValuePrinter;

/**
 * <??????>
 * 
 * @author carldong????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class ValueTag extends SimpleTagSupport {

	private Object property;
	private Map itemMap;
	private Object defaultValue;

	@Override
	public void doTag() throws JspException, IOException {
		ValuePrinter valuePrinter = new ValuePrinter(getJspBody(),
				getJspContext());

		valuePrinter.printValue(property, itemMap, defaultValue);
	}

	public void setProperty(Object property) {
		this.property = property;
	}

	public void setItemMap(Map itemMap) {
		this.itemMap = itemMap;
	}

	public void setDefaultValue(Object defaultValue) {
		this.defaultValue = defaultValue;
	}
}

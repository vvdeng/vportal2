/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??ValuePrinter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		carldong		2010-11-19			????
 */
package com.paipai.verticalframework.ui.component.printer;

import java.io.IOException;
import java.util.Map;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/**
 * <??????>
 * 
 * @author carldong????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class ValuePrinter extends DefaultXhtmlPrinter {

	public ValuePrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printValue(Object property, Map map, Object defaultValue)
			throws IOException {
		if (map != null && property != null) {
			if (map.containsKey(property.toString())) {
				printHelper.text(map.get(property.toString()));
			}
			else {
				if (defaultValue == null) {
					printHelper.text(property);
				}
				else {
					printHelper.text(defaultValue);
				}
			}
		}
		else {
			printHelper.text(defaultValue);
		}
		flushTag();

	}
}

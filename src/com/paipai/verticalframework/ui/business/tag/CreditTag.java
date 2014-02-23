/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CreditTag.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		carldong		2010-11-19			????
 */
package com.paipai.verticalframework.ui.business.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.business.printer.CreditPrinter;

/**
 * <??????>
 * 
 * @author carldong????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CreditTag extends SimpleTagSupport {

	private long value;
	private String type;

	public void setValue(long value) {
		this.value = value;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void doTag() throws JspException, IOException {
		CreditPrinter creditPrinter = new CreditPrinter(getJspBody(),
				getJspContext());

		creditPrinter.printValue(value, type);
	}

}

/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??InputValidatorRangeTag.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Feb 28, 2011			????
 */
package com.paipai.verticalframework.ui.component.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.component.printer.InputValidatorSetPrinter;

/** 
 * ??b????????У?鷶Χ
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class InputValidatorSetTag extends SimpleTagSupport {
	
	private static Integer idStep = 2012;
	private String id = "_ivs_" + (idStep++);
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	@Override
	public void doTag() throws JspException, IOException {
		InputValidatorSetPrinter printer = new InputValidatorSetPrinter(super.getJspBody(), super.getJspContext());
		printer.printValidatorSet(id);
	}
}

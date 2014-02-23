/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??InputValidatorRangePrinter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Feb 28, 2011			????
 */
package com.paipai.verticalframework.ui.component.printer;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;


/** 
 * ??b????????У?鷶Χ?????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class InputValidatorSetPrinter extends DefaultXhtmlPrinter {
	
	public InputValidatorSetPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	
	public void printValidatorSet(String id) {
		printHelper.script("PP.vfui.form.setForm('" + id + "')");
		printHelper.startElement(Tag.FORM);
		printHelper.attribute(Attr.ID, id);
		//printHelper.attribute(Attr.STYLE, "visibility:hidden;position:absolute;");
		printHelper.closeElement();
		
		super.printBody();
		
		printHelper.endElement(Tag.FORM);
		
		flushTag();
	}
}

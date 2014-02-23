/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CategoryValuePrinter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2011-1-5			????
 */
package com.paipai.verticalframework.ui.business.printer;

import java.io.IOException;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/**
 * <??????>
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CategoryValuePrinter extends DefaultXhtmlPrinter {

	public CategoryValuePrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printCategoryValue(String id,String value) throws IOException {
		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.ID, id);
		printHelper.startElement(Tag.SCRIPT);
		printHelper.text("PP.vfui.category.setCategoryValue('" + id + "','" + value + "');");
		printHelper.endElement(Tag.SCRIPT);
		printHelper.endElement(Tag.SPAN);
		flushTag();
	}
}

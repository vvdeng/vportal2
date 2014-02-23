/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CellTablePrinter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Jan 12, 2011			????
 */
package com.paipai.verticalframework.ui.component.printer;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;


/** 
 * ????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CellTablePrinter extends DefaultXhtmlPrinter {
	
	public CellTablePrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	
	public void printCellTable(String id, String style) {
		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.CLASS, "model_table");
		printHelper.closeElement();
		
		printHelper.startElement(Tag.TABLE);
		printHelper.closeElement();
		
		this.printBody();
		
		printHelper.endElement(Tag.TABLE);
		
		printHelper.endElement(Tag.DIV);
		
		flushTag();
	}
}

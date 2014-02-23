/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CellRowPrinter.java
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
 * ?????д????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CellRowPrinter extends DefaultXhtmlPrinter {
	
	public CellRowPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	
	public void printCellRow(String id, String style, String onclick, boolean isFirst) {
		if (isFirst) {
			printHelper.startElement(Tag.TBODY);
			printHelper.closeElement();
		}
		
		printHelper.startElement(Tag.TR);
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.STYLE, style);
		printHelper.attribute(Attr.ONCLICK, onclick);
		printHelper.closeElement();
		
		this.printBody();
		
		printHelper.endElement(Tag.TR);
		
		if (isFirst) {
			printHelper.endElement(Tag.TBODY);
		}
		
		flushTag();
	}
}

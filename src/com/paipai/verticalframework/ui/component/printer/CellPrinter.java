/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CellPrinter.java
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
 * ?????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CellPrinter extends DefaultXhtmlPrinter {
	
	public CellPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	
	public void printHeadCell(String id, String style, String onclick) {
		printHelper.startElement(Tag.TH);
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.STYLE, style);
		printHelper.attribute(Attr.ONCLICK, onclick);
		printHelper.closeElement();
		
		this.printBody();
		
		printHelper.endElement(Tag.TH);
		
		flushTag();
	}
	
	public void  printRowCell(String id, String style, String onclick) {
		printHelper.startElement(Tag.TD);
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.STYLE, style);
		printHelper.attribute(Attr.ONCLICK, onclick);
		printHelper.closeElement();
		
		this.printBody();
		
		printHelper.endElement(Tag.TD);
		
		flushTag();
	}
}

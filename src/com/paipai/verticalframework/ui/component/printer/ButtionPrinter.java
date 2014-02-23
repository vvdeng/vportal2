/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??ButtionPrinter.java					
 *			
 * Description??????????????????							 												
 * History??
 * ?汾??    ????           ????          ?????????????
 *  1.0   bevisdeng        2010-10-22           Create	
 */

package com.paipai.verticalframework.ui.component.printer;

import java.io.IOException;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/** 
 * ????
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class ButtionPrinter extends DefaultXhtmlPrinter  {


	public ButtionPrinter(JspFragment jspFragment,JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	public void printButtion(String id,String name,String onclick,String type,String className,String label) throws IOException{

		printHelper.startElement(Tag.BUTTON);
		printHelper.attribute(Attr.TYPE, type,"submit");
		printHelper.attribute(Attr.CLASS,className,"button7");
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.VALUE, name,"button");
		printHelper.attribute(Attr.ONCLICK, onclick);
		printHelper.startElement(Tag.SPAN);
		printHelper.text(label);
		printHelper.endElement(Tag.SPAN);
		printHelper.endElement(Tag.BUTTON);
	
		flushTag();
		
	}
}

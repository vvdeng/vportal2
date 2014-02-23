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
import com.paipai.verticalframework.ui.util.PrintHelper.PositionType;

/** 
 * ????
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class NavigatorPrinter extends DefaultXhtmlPrinter  {


	public NavigatorPrinter(JspFragment jspFragment,JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	public void printNavigator(String id) throws IOException{
		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.CLASS, "pv_sitemap");
		printHelper.text("&nbsp");
		printBody();
		printHelper.removeElement(Tag.SPAN, PositionType.END);
		printHelper.endElement(Tag.DIV);
		flushTag();
		
	}
}

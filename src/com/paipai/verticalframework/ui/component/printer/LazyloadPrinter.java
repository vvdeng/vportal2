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
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class LazyloadPrinter extends DefaultXhtmlPrinter
{
	private static final String TYPE="lazyload";
	public LazyloadPrinter(JspFragment jspFragment, JspContext jspContext)
	{
		super(jspFragment, jspContext);
	}

	public void printText(String id, String function) throws IOException
	{

		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.TYPE,TYPE);
		printHelper.attribute(Attr.TAG, function);
		printHelper.text("");
		printHelper.endElement(Tag.DIV);
		flushTag();

	}

}

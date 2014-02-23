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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.PageContext;
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

public class NavigatorItemPrinter extends DefaultXhtmlPrinter
{

	public NavigatorItemPrinter(JspFragment jspFragment, JspContext jspContext)
	{
		super(jspFragment, jspContext);
	}

	public void printNavigatorItem(String id, String desc, String link)
			throws IOException
	{
		printHelper.startElement(Tag.A);
		if (link != null)
		{
			link = getAbsolutePath(link);
		}
		printHelper.attribute(Attr.HREF, link);
		printHelper.text(desc);
		printHelper.endElement(Tag.A);
		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.CLASS, "pv_arr");
		printHelper.text("&gt;");
		printHelper.endElement(Tag.SPAN);

		flushTag();

	}
}

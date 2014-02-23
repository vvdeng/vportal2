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

package com.paipai.verticalframework.ui.printer;

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

public class IframePrinter extends DefaultXhtmlPrinter {

	public IframePrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printText(String id, String name, String src, String height,
			String width, boolean crossDomain) throws IOException {

		printHelper.startElement(Tag.DIV);
		printHelper.startElement(Tag.IFRAME);
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.NAME, name);
		printHelper.attribute(Attr.SRC, src);
		printHelper.attribute("frameborder", "0");
		String style = "";
		if (height != null && height.trim().length() > 0) {
			style += "height:" + height + ";";
		}
		if (width != null && width.trim().length() > 0) {
			style += "width:" + width + ";";
		}

		if (height == null || height.trim().length() == 0) {
			printHelper.attribute("scrolling", "no");
			if (crossDomain) {
				printHelper.attribute(Attr.TAG, "auto_height_cross_domain_iframe");
				printHelper.attribute(Attr.ONLOAD,"FrameManager.registerFrame(this);");
			} else {
				printHelper.attribute(Attr.TAG, "auto_height_iframe");
			}
		}
		printHelper.attribute(Attr.STYLE, style);
		printHelper.text("");
		printHelper.endElement(Tag.IFRAME);
		printHelper.endElement(Tag.DIV);
		flushTag();

	}

}

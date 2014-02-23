/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??LinkPrinter.java					
 *			
 * Description??????????????????							 												
 * History??
 * ?汾??    ????           ????          ?????????????
 *  1.0   bevisdeng        2010-10-25           Create	
 */

package com.paipai.verticalframework.ui.component.printer;

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

public class LinkPrinter extends DefaultXhtmlPrinter {

	public LinkPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);

	}

	public void printLink(String id, String href, String target, int length,
			String onclick, String className) {

		if (href != null && href.trim().length() > 0 && href.charAt(0) == '/') {
			HttpServletRequest request = (HttpServletRequest) ((PageContext) jspContext)
					.getRequest();
			String path = request.getContextPath();
			String basePath = request.getScheme() + "://"
					+ request.getServerName() + ":" + request.getServerPort()
					+ path + "/";
			href = basePath + href.substring(1);
		}
		printHelper.startElement(Tag.A);
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.HREF, href, "javascript:void(0);");
		printHelper.attribute(Attr.TARGET, target);
		printHelper.attribute(Attr.ONCLICK, onclick);
		printHelper.attribute(Attr.CLASS, className, "button7");
		printHelper.closeElement();// ????????????????????????

		int startIndex = printHelper.getBuffer().length();
		printBody();
		int endIndex = printHelper.getBuffer().length();
		postProcessBody(startIndex, endIndex, length);

		printHelper.endElement(Tag.A);

		flushTag();
	}

	public void postProcessBody(int startIndex, int endIndex, int length) {
		if ((startIndex == endIndex)) {
			return;
		}
		String bodyContent = printHelper.getBuffer().substring(startIndex,
				endIndex);
		if (length != 0 && bodyContent.length() > length) {
			bodyContent = bodyContent.substring(0, length);
		}

		printHelper.getBuffer().delete(startIndex, endIndex);
		printHelper.startElement(Tag.SPAN);
		printHelper.text(bodyContent);
		printHelper.endElement(Tag.SPAN);

	}
}

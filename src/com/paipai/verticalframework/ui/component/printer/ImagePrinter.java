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

public class ImagePrinter extends DefaultXhtmlPrinter {

	public ImagePrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printImage(String id, String src, boolean lazyLoad,
			String className, String alt, String href, String target,
			String defaultImage, String height, String width, String altImage,String onclick)
			throws IOException {
		if (href != null && href.trim().length() > 0) {
			if (href.charAt(0) == '/') {
				HttpServletRequest request = (HttpServletRequest) ((PageContext) jspContext)
						.getRequest();
				String path = request.getContextPath();
				String basePath = request.getScheme() + "://"
						+ request.getServerName() + ":"
						+ request.getServerPort() + path + "/";
				href = basePath + href.substring(1);
			}
			printHelper.startElement(Tag.A);
			printHelper.attribute(Attr.HREF, href);
			printHelper.attribute(Attr.TARGET, target);
		}
		printHelper.startElement(Tag.IMG);
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.CLASS, className);
		printHelper.attribute(Attr.ONCLICK,onclick);
		printHelper.attribute(Attr.WIDTH, width);
		printHelper.attribute(Attr.HEIGHT, height);
		if (altImage != null && altImage.trim().length() > 0) {
			printHelper.attribute(Attr.ALTIMAGE,altImage);
			printHelper.attribute(Attr.ONLOAD, "PP.vfui.tag.procImage(this);");
		}

		if (lazyLoad) {
			printHelper.attribute(Attr.INIT_SRC, src);
			printHelper.attribute(Attr.SRC, defaultImage);
		} else {
			printHelper.attribute(Attr.SRC, src);
		}
		printHelper.attribute(Attr.TAG, "uiImg");
		printHelper.attribute(Attr.PARA, defaultImage);
		printHelper.attribute(Attr.ALT, alt);
		printHelper.attribute(Attr.ONERROR, "javascript:this.src='"
				+ defaultImage + "'");
		printHelper.endElement(Tag.IMG);
		if (href != null && href.trim().length() > 0) {
			printHelper.endElement(Tag.A);
		}
		flushTag();

	}

}

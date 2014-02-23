/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??QQPrinter.java
 * 
 * Description??QQ?????UI???
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-19			????
 */
package com.paipai.verticalframework.ui.business.printer;

import java.io.IOException;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Constants;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/** 
 * QQ?????UI???
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class QQPrinter extends DefaultXhtmlPrinter {

	public QQPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void print(String uin, boolean lazyLoad, int imgType)
			throws IOException {
		String url = getAbsolutePath(Constants.BASE_FOLDER_NAME + "wpa.jsp");
		printHelper.startElement(Tag.A);
		printHelper.attribute(Attr.HREF, "javascript:PP.vfui.ui.qq.talkTo("
				+ uin + ",'" + url + "')");
		printHelper.startElement(Tag.IMG);
		printHelper.attribute(Attr.BORDER, "0");
		if (lazyLoad) {
			printHelper.attribute(Attr.INIT_SRC, "http://wpa.qq.com/pa?p=2:"
					+ uin + ":" + imgType);
			printHelper.attribute(Attr.SRC, "http://wpa.qq.com/pa?p=2:0:"
					+ imgType);
		}
		else {
			printHelper.attribute(Attr.SRC, "http://wpa.qq.com/pa?p=2:" + uin
					+ ":" + imgType);
		}
		printHelper.endElement(Tag.IMG);
		printHelper.endElement(Tag.A);
		flushTag();
	}
}

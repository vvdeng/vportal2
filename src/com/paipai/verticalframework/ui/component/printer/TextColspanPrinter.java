/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??TextColspanPrinter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-12-27			????
 */
package com.paipai.verticalframework.ui.component.printer;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/**
 * <??????>
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class TextColspanPrinter extends DefaultXhtmlPrinter {

	public TextColspanPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void print(String id, String targetId, String className,
			String hideLabel, String showLabel, boolean defaultHide,
			String callback) {
		printHelper.startElement(Tag.A);
		printHelper.attribute(Attr.ID, id);
		String onclick = "javascript:PP.vfui.colspan.showOrHideText('" + id
				+ "','" + targetId + "','" + hideLabel + "','" + showLabel
				+ "')";
		if (callback != null) {
			onclick = onclick + ";" + callback;
		}
		printHelper.attribute(Attr.ONCLICK, onclick);
		if (className != null) {
			printHelper.attribute(Attr.CLASS, className);
		}
		printHelper.attribute(Attr.ONMOUSEOVER, "this.style.cursor='hand';");

		printHelper.closeElement();
		if (defaultHide) {
			printHelper.text(hideLabel);
		}
		else {
			printHelper.text(showLabel);
		}
		printHelper.endElement(Tag.A);

		flushTag();
	}
}

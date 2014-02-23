/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??FormPrinter.java
 * 
 * Description????????????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 8, 2010		????
 */
package com.paipai.verticalframework.ui.printer.form;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/**
 * ??????????
 * 
 * @author sunniyang
 * @version 1.0
 */
public class FormPrinter extends DefaultXhtmlPrinter {

	public FormPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printForm(String id, String name, int columns, String action,
			String method, String enctype, int labelWidth, String target,
			String onsubmit) {
		printHelper.script("PP.vfui.form.setForm('" + id + "')");

		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.CLASS, "model_form");

		printHelper.startElement(Tag.FORM);
		printHelper.attribute(Attr.ID, id);
		if (name != null)
			printHelper.attribute(Attr.NAME, name);
		if (action != null)
			printHelper.attribute(Attr.ACTION, action);
		if (method != null)
			printHelper.attribute(Attr.METHOD, method);
		if (enctype != null)
			printHelper.attribute(Attr.ENCTYPE, enctype);
		if (target != null) {
			printHelper.attribute(Attr.TARGET, target);
		}
		if (onsubmit != null) {
			printHelper.attribute(Attr.ONSUBMIT, onsubmit);
		}
		printHelper.closeElement();

		printHelper.startElement(Tag.UL);
		printHelper.attribute(Attr.CLASS, "fluid_" + columns);
		printHelper.closeElement();

		this.printBody();

		printHelper.endElement(Tag.UL);

		printHelper.startElement(Tag.INPUT);
		printHelper.attribute(Attr.ID, "reset" + id);
		printHelper.attribute(Attr.TYPE, "reset");
		printHelper.attribute(Attr.STYLE, "visibility:hidden;");
		printHelper.text(" ");
		printHelper.endElement(Tag.INPUT);

		printHelper.endElement(Tag.FORM);

		printHelper.endElement(Tag.DIV);

		printHelper.script("PP.vfui.form.formEnd('" + id + "');");

		flushTag();
	}
}

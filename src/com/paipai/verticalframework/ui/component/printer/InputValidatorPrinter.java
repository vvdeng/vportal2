/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??InputValidatorPrinter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Feb 28, 2011			????
 */
package com.paipai.verticalframework.ui.component.printer;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;


/** 
 * <??????>
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class InputValidatorPrinter extends DefaultXhtmlPrinter {
	
	public InputValidatorPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	
	public void printValidator(String id, String setId, String label,
			String targetId, String format, boolean required, int minLength,
			int maxLength, int minValue, int maxValue, boolean single, boolean trim) {
		String labelId = "_lbl_" + id;
		printHelper.startElement(Tag.LABEL);
		printHelper.attribute(Attr.ID, labelId);
		printHelper.attribute(Attr.STYLE, "visibility:hidden;position:absolute;");
		printHelper.closeElement();
		printHelper.text(label);
		printHelper.endElement(Tag.LABEL);
		
		StringBuilder builder = new StringBuilder();
		builder.append("{labelId: '" + labelId + "', ");
		builder.append("label: '" + label + "', ");
		builder.append("targetId: '" + targetId + "', ");
		builder.append("format: '" + format + "', ");
		builder.append("required: " + required + ", ");
		builder.append("minLength: " + minLength + ", ");
		builder.append("maxLength: " + maxLength + ", ");
		builder.append("minValue: " + minValue + ", ");
		builder.append("maxValue: " + maxValue + ", ");
		builder.append("single: " + single + ", ");
		builder.append("trim: " + trim + "}");
		printHelper.script("PP.vfui.form.addItemValidator('" + setId + "', " + builder.toString() + ");");

		flushTag();
	}
}

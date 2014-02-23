/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??FormItemValidatorPrinter.java
 * 
 * Description???????????????????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 8, 2010		????
 */
package com.paipai.verticalframework.ui.printer.form;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/**
 * ?????????????????
 * 
 * @author sunniyang
 * @version 1.0
 */
public class FormItemValidatorPrinter extends DefaultXhtmlPrinter {

	public FormItemValidatorPrinter(JspFragment jspFragment,
			JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printValidator(String formId, String labelId, String label,
			String targetId, String format, boolean required, int minLength,
			int maxLength, int minValue, int maxValue, boolean single, boolean trim) {
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
		printHelper.script("PP.vfui.form.addItemValidator('" + formId + "', "
				+ builder.toString() + ");");

		flushTag();
	}
}

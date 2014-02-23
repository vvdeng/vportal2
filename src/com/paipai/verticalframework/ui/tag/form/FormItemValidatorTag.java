/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??FormItemValidatorTag.java
 * 
 * Description??form???????? ui?????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 8, 2010		????
 */
package com.paipai.verticalframework.ui.tag.form;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspTag;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.printer.form.FormItemValidatorPrinter;

/**
 * ??????????tag
 * 
 * @author sunniyang
 * @version 1.0
 */
public class FormItemValidatorTag extends SimpleTagSupport {

	/**
	 * ???????html?????id?
	 */
	private String targetId;
	/**
	 * ??????
	 * 
	 * @see com.paipai.verticalframework.ui.tag.form.FormItemValidatorTag.Format
	 */
	private String format = "";
	/**
	 * ???????????
	 */
	private boolean required = false;
	/**
	 * ??С???????format?????????Ч??
	 */
	private int minLength = -1;
	/**
	 * ???????format?????????Ч??
	 */
	private int maxLength = -1;
	/**
	 * ??С?????format?????????Ч??
	 */
	private int minValue = -1;
	/**
	 * ????????format?????????Ч??
	 */
	private int maxValue = -1;
	/**
	 * ?????????????????tccUser??Ч??
	 */
	private boolean single = false;
	/**
	 * ??form????????????ü????????β????
	 */
	private boolean trim = true;

	public String getTargetId() {
		return targetId;
	}

	public void setTargetId(String targetId) {
		this.targetId = targetId;
	}

	public boolean isRequired() {
		return required;
	}

	public void setRequired(boolean required) {
		this.required = required;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public int getMinLength() {
		return minLength;
	}

	public void setMinLength(int minLength) {
		this.minLength = minLength;
	}

	public int getMaxLength() {
		return maxLength;
	}

	public void setMaxLength(int maxLength) {
		this.maxLength = maxLength;
	}

	public int getMinValue() {
		return minValue;
	}

	public void setMinValue(int minValue) {
		this.minValue = minValue;
	}

	public int getMaxValue() {
		return maxValue;
	}

	public void setMaxValue(int maxValue) {
		this.maxValue = maxValue;
	}
	
	public boolean isSingle() {
		return single;
	}
	
	public void setSingle(boolean single) {
		this.single = single;
	}

	public boolean isTrim() {
		return trim;
	}

	public void setTrim(boolean trim) {
		this.trim = trim;
	}

	@Override
	public void doTag() throws JspException, IOException {
		if ((format != null && format.length() != 0) && Format.valueOf(format) == null)
			this.format = "";
		FormItemValidatorPrinter printer = new FormItemValidatorPrinter(super
				.getJspBody(), super.getJspContext());

		JspTag pTag = this.getParent();
		if (!pTag.getClass().getName().equals(FormItemTag.class.getName()))
			throw new JspException(
					"formItemValidator tag must be wraped by formItem tag");
		FormItemTag parent = (FormItemTag) pTag;
		pTag = parent.getParent();
		if (!pTag.getClass().getName().equals(FormTag.class.getName()))
			throw new JspException("formItem tag must be wraped by form tag");
		FormTag form = (FormTag) pTag;
		String label = parent.getLabel().trim();
		if (label.endsWith(":") || label.endsWith("??"))
			label = label.substring(0, label.length() - 1);
		printer.printValidator(form.getId(), parent.getId(), label, targetId,
				format, required, minLength, maxLength, minValue, maxValue, single, 
				trim);
	}

	/**
	 * ???????????
	 * 
	 * @author sunniyang
	 * @version 1.0
	 */
	public enum Format {
		alpha, lowercase_pure_alpha, english_name_multiline, english_name, alphanum, alphanum_underscore, unsigned, integer, batch_qq, batch_qq_multiline, qq, any_batch_qq, batch_email, percent, real, unsigned_real, email, rich_email, qq_email, phone, ip, date, time, full_date_time, date_time, short_time, price,random
	}
}

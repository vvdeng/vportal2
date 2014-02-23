/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??ComboTag.java					
 *			
 * Description??????????????????							 												
 * History??
 * ?汾??    ????           ????          ?????????????
 *  1.0   bevisdeng        2010-10-22           Create	
 */

package com.paipai.verticalframework.ui.component.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.component.printer.DoubleComboPrinter;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class DoubleComboTag extends SimpleTagSupport {
	private String id;
	private String name;
	private Object data;
	private String value;
	private String optionLabel;
	private String optionValue;
	private String style;
	private String onchange;
	private Boolean disabled;
	private String secondValue;
	private String secondOptionLabel;
	private String secondOptionValue;
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOnchange() {
		return onchange;
	}

	public void setOnchange(String onchange) {
		this.onchange = onchange;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getOptionLabel() {
		return optionLabel;
	}

	public void setOptionLabel(String optionLabel) {
		this.optionLabel = optionLabel;
	}

	public String getOptionValue() {
		return optionValue;
	}

	public void setOptionValue(String optionValue) {
		this.optionValue = optionValue;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public boolean isDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}
	public String getSecondValue() {
		return secondValue;
	}

	public void setSecondValue(String secondValue) {
		this.secondValue = secondValue;
	}

	public String getSecondOptionLabel() {
		return secondOptionLabel;
	}

	public void setSecondOptionLabel(String secondOptionLabel) {
		this.secondOptionLabel = secondOptionLabel;
	}

	public String getSecondOptionValue() {
		return secondOptionValue;
	}

	public void setSecondOptionValue(String secondOptionValue) {
		this.secondOptionValue = secondOptionValue;
	}

	@Override
	public void doTag() throws JspException, IOException {
		DoubleComboPrinter doubleComboPrinter = new DoubleComboPrinter(getJspBody(),
				getJspContext());
		doubleComboPrinter.printCombo(id, name, data, value,optionLabel,optionValue,style,onchange,disabled,secondValue,secondOptionLabel,secondOptionValue);
	}

}

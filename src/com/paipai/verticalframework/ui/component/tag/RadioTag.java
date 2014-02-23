/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??RadioTag.java					
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

import com.paipai.verticalframework.ui.component.printer.RadioPrinter;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class RadioTag extends SimpleTagSupport {
	private String id;
	private String name;
	private Object data;
	private String value;
	private String listLabel;
	private String listValue;
	private String style;
	private String className;
	private String onClick;
	private String gap;

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

	public String getListLabel() {
		return listLabel;
	}

	public void setListLabel(String listLabel) {
		this.listLabel = listLabel;
	}

	public String getListValue() {
		return listValue;
	}

	public void setListValue(String listValue) {
		this.listValue = listValue;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getOnClick() {
		return onClick;
	}

	public void setOnClick(String onClick) {
		this.onClick = onClick;
	}

	public String getGap() {
		return gap;
	}

	public void setGap(String gap) {
		this.gap = gap;
	}

	@Override
	public void doTag() throws JspException, IOException {
		RadioPrinter radioPrinter = new RadioPrinter(getJspBody(),
				getJspContext());
		radioPrinter
				.printRadio(id, name, data,value, listLabel, listValue,style,className,onClick,gap);
	}

}

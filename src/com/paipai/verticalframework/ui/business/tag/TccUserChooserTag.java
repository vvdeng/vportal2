/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??TccUserChooser.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Dec 27, 2010			????
 */
package com.paipai.verticalframework.ui.business.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.business.printer.TccUserChooserPrinter;


/** 
 * RTX?????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class TccUserChooserTag extends SimpleTagSupport {
	
	private static Integer idStep = 2012;
	private String id = "tcc" + (idStep++);
	private String name = "";
	private String inputType = "text";
	private int width = 150;
	private int height = 50;
	private String value = "";
	
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
	
	public String getInputType() {
		return inputType;
	}
	
	public void setInputType(String inputType) {
		this.inputType = inputType;
	}

	public int getWidth() {
		return width;
	}
	
	public void setWidth(int width) {
		this.width = width;
	}
	
	public int getHeight() {
		return height;
	}
	
	public void setHeight(int height) {
		this.height = height;
	}
	
	public String getValue() {
		return value;
	}
	
	public void setValue(String value) {
		this.value = value;
	}

	@Override
	public void doTag() throws JspException, IOException {
		TccUserChooserPrinter printer = new TccUserChooserPrinter(super.getJspBody(), super.getJspContext());
		printer.printTccUserChooser(id, name, inputType, width, height, value);
	}
}

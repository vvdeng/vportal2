/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??Column.java
 * 
 * Description?????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-25			????
 */
package com.paipai.verticalframework.web.excel.table;

import com.paipai.verticalframework.core.ToStringSupport;

/**
 * ???????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class Column extends ToStringSupport {

	private String name;
	private String property;
	private int width = 0;
	private String align = "center";
	private boolean autoWrap = false;
	private String format = "text";

	public Column(String name, String property) {
		super();
		this.name = name;
		this.property = property;
	}

	public String getName() {
		return name;
	}

	public String getProperty() {
		return property;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public String getAlign() {
		return align;
	}

	public void setAlign(String align) {
		this.align = align;
	}

	public boolean isAutoWrap() {
		return autoWrap;
	}

	public void setAutoWrap(boolean autoWrap) {
		this.autoWrap = autoWrap;
	}
	
	public String getFormat() {
		return format;
	}
	
	public void setFormat(String format) {
		this.format = format;
	}
}

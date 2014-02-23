/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??ExcelStyle.java
 * 
 * Description??Excel???????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-25			????
 */
package com.paipai.verticalframework.web.excel;

import com.paipai.verticalframework.core.ToStringSupport;

/**
 * Excel???????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class ExcelStyle extends ToStringSupport {

	private String name;
	private int height;
	private String font;
	private int weight;
	private boolean bold;
	private String color;
	private String backColor;

	public ExcelStyle(String name) {
		super();
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public String getFont() {
		return font;
	}

	public void setFont(String font) {
		this.font = font;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public boolean isBold() {
		return bold;
	}

	public void setBold(boolean bold) {
		this.bold = bold;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getBackColor() {
		return backColor;
	}

	public void setBackColor(String backColor) {
		this.backColor = backColor;
	}
}

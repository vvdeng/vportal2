/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??ColumnWidth.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Dec 4, 2010			????
 */
package com.paipai.verticalframework.ui.tag.form;

/**
 * ?п?
 * 
 * @author sunniyang
 * @version 1.0
 */
public class ColumnWidth {

	private int width = 0;
	private boolean percent = false;

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public boolean isPercent() {
		return percent;
	}

	public void setPercent(boolean percent) {
		this.percent = percent;
	}

	public String getSuffix() {
		if (this.percent) {
			return "%";
		} else {
			return "px";
		}
	}
}

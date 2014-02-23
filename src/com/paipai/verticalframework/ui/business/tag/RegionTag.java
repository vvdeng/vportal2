/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??RegionTag.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Jan 5, 2011			????
 */
package com.paipai.verticalframework.ui.business.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.business.printer.RegionPrinter;

/** 
 * ??????? ???-????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class RegionTag extends SimpleTagSupport {
	
	private static Integer idStep = 2012;
	private String id = "reg" + (idStep++);
	private String name = id;
	private int width = 80;
	private int level = 2;
	private boolean showAll = false;
	private int provinceValue = -1;
	private int cityValue = -1;
	private int townValue = -1;
	
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
	
	public int getWidth() {
		return width;
	}
	
	public void setWidth(int width) {
		this.width = width;
	}
	
	public int getLevel() {
		return level;
	}
	
	public void setLevel(int level) {
		this.level = level;
	}
	
	public boolean isShowAll() {
		return showAll;
	}
	
	public void setShowAll(boolean showAll) {
		this.showAll = showAll;
	}
	
	public int getProvinceValue() {
		return provinceValue;
	}
	
	public void setProvinceValue(int provinceValue) {
		this.provinceValue = provinceValue;
	}
	
	public int getCityValue() {
		return cityValue;
	}
	
	public void setCityValue(int cityValue) {
		this.cityValue = cityValue;
	}
	
	public int getTownValue() {
		return townValue;
	}
	
	public void setTownValue(int townValue) {
		this.townValue = townValue;
	}

	@Override
	public void doTag() throws JspException, IOException {
		RegionPrinter printer = new RegionPrinter(super.getJspBody(), super.getJspContext());
		printer.printRegion(id, name, width, level, showAll, provinceValue, cityValue, townValue);
	}
}

/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CommodityPropertyTag.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Jan 10, 2011			????
 */
package com.paipai.verticalframework.ui.business.tag;

import java.io.IOException;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.business.printer.CommodityPropertyPrinter;


/** 
 * ???????????????????????????б?
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CommodityPropertyTag extends SimpleTagSupport {
	
	private static String allIconTag = "redicon,othership,qccicon,autoship,autosmallcard," 
		+ "reallyicon,sevenship,repayship,vedioshow,rapidship,shangpin,chengbao,tejia,promotion";
	private static Integer idStep = 2012;
	private String id = "commPro" + (idStep++);
	private String property = "";
	private String iconTag = allIconTag;
	private String iconType = "";
	private String ptag = "";
	private Map<String, String> ptagList = null;
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getProperty() {
		return property;
	}
	
	public void setProperty(String property) {
		this.property = property;
	}
	
	public String getIconTag() {
		return iconTag;
	}
	
	public void setIconTag(String iconTag) {
		this.iconTag = iconTag;
	}
	
	public String getIconType() {
		return iconType;
	}
	
	public void setIconType(String iconType) {
		this.iconType = iconType;
	}

	public String getPtag() {
		return ptag;
	}
	
	public void setPtag(String ptag) {
		this.ptag = ptag;
	}
	
	public Map<String, String> getPtagList() {
		return ptagList;
	}
	
	public void setPtagList(Map<String, String> ptagList) {
		this.ptagList = ptagList;
	}
	
	@Override
	public void doTag() throws JspException, IOException {
		CommodityPropertyPrinter printer = new CommodityPropertyPrinter(super.getJspBody(), super.getJspContext());
		printer.printCommodityProperty(id, property, iconTag, iconType, ptag, ptagList);
	}
}

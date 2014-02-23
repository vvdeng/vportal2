/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??SellerPropertyTag.java
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

import com.paipai.verticalframework.ui.business.printer.SellerPropertyPrinter;


/** 
 * ???????????????????????????б?
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class SellerPropertyTag extends SimpleTagSupport {
	
	private static String allIconTag = "validmobile,tenpay,idcard,athenbank,patriarch,helpangle,freegoldmedal," 
		+ "qccicon,athensafe,bigsage,bigreally,bigwomen,shangpin,licence,legend-shop-1,shangpinhui,qqshop";
	private static Integer idStep = 2012;
	private String id = "sellerPro" + (idStep++);
	private String qq = "";
	private String property = "";
	private String auth = "";
	private String property1 = "";
	private String property2 = "";
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
	
	public String getQq() {
		return qq;
	}
	
	public void setQq(String qq) {
		this.qq = qq;
	}
	
	public String getProperty() {
		return property;
	}
	
	public void setProperty(String property) {
		this.property = property;
	}

	public String getAuth() {
		return auth;
	}
	
	public void setAuth(String auth) {
		this.auth = auth;
	}
	
	public String getProperty1() {
		return property1;
	}
	
	public void setProperty1(String property1) {
		this.property1 = property1;
	}
	
	public String getProperty2() {
		return property2;
	}
	
	public void setProperty2(String property2) {
		this.property2 = property2;
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
		SellerPropertyPrinter printer = new SellerPropertyPrinter(super.getJspBody(), super.getJspContext());
		printer.printSellerProperty(id, qq, property, auth, property1, property2, iconTag, iconType, ptag, ptagList);
	}
}

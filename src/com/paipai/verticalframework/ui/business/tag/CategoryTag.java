/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??ButtonTag.java					
 *			
 * Description??????????????????							 												
 * History??
 * ?汾??    ????           ????          ?????????????
 *  1.0   bevisdeng        2010-10-22           Create	
 */

package com.paipai.verticalframework.ui.business.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.business.printer.CategoryPrinter;

/**
 * ????
 * 
 * @author riquelmexu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class CategoryTag extends SimpleTagSupport {

	private String id;
	private String name;
	private String filter;
	private String level1;
	private String level2;
	private String level3;
	private String level4;
	private String afterHide;
	/*
	 * ??????????????type=float?????????????????
	 * static ???????????
	 */
	private String type;

	@Override
	public void doTag() throws JspException, IOException {
		CategoryPrinter categoryPrinter = new CategoryPrinter(getJspBody(),
				getJspContext());
		categoryPrinter.printCategory(id, name, level1, level2, level3, level4,
				filter,afterHide,type);
	}

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

	public String getLevel1() {
		return level1;
	}

	public void setLevel1(String level1) {
		this.level1 = level1;
	}

	public String getLevel2() {
		return level2;
	}

	public void setLevel2(String level2) {
		this.level2 = level2;
	}

	public String getLevel3() {
		return level3;
	}

	public void setLevel3(String level3) {
		this.level3 = level3;
	}

	public String getLevel4() {
		return level4;
	}

	public void setLevel4(String level4) {
		this.level4 = level4;
	}

	public String getFilter() {
		return filter;
	}

	public void setFilter(String filter) {
		this.filter = filter;
	}

	public void setAfterHide(String afterHide) {
		this.afterHide = afterHide;
	}

	
	public void setType(String type) {
		this.type = type;
	}

	
	public String getAfterHide() {
		return afterHide;
	}

	
	public String getType() {
		return type;
	}

}

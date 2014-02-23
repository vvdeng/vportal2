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
import com.paipai.verticalframework.ui.business.printer.SimpleCategoryPrinter;

/**
 * ????
 * 
 * @author riquelmexu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class SimpleCategoryTag extends SimpleTagSupport {

	private String id;
	private String name;
	private String defaults;
	private String multiple;
	private int size;


	@Override
	public void doTag() throws JspException, IOException {
		SimpleCategoryPrinter categoryPrinter = new SimpleCategoryPrinter(getJspBody(),
				getJspContext());
		categoryPrinter.printCategory(id, name, defaults,multiple,size);
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

	
	public String getDefaults() {
		return defaults;
	}

	
	public void setDefaults(String defaults) {
		this.defaults = defaults;
	}

	
	public String getMultiple() {
		return multiple;
	}

	
	public void setMultiple(String multiple) {
		this.multiple = multiple;
	}

	
	public int getSize() {
		return size;
	}

	
	public void setSize(int size) {
		this.size = size;
	}
	

}

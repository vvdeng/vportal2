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

package com.paipai.verticalframework.ui.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.printer.GroupPrinter;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο?JavaDoc
 */

public class GroupTag extends SimpleTagSupport {
	private String id;
	private String title;
	private String width;
	private String height;
	private String style;
	private String className;
	
	
	@Override
	public void doTag() throws JspException, IOException {
		GroupPrinter GroupPrinter = new GroupPrinter(getJspBody(),
				getJspContext(),getParent());
		GroupPrinter.printGroup(id, title, width,height,style,className);
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getWidth() {
		return width;
	}


	public void setWidth(String width) {
		this.width = width;
	}


	public String getHeight() {
		return height;
	}


	public void setHeight(String height) {
		this.height = height;
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
}

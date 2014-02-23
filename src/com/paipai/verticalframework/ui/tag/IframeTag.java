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

import com.paipai.verticalframework.ui.printer.IframePrinter;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class IframeTag extends SimpleTagSupport
{
	private String id;
	private String name;
	private String src;
	private String height;
	private String width;
	private boolean crossDomain;
	
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


	public String getSrc() {
		return src;
	}


	public void setSrc(String src) {
		this.src = src;
	}


	public String getHeight() {
		return height;
	}


	public void setHeight(String height) {
		this.height = height;
	}


	public String getWidth() {
		return width;
	}


	public void setWidth(String width) {
		this.width = width;
	}


	public boolean isCrossDomain() {
		return crossDomain;
	}


	public void setCrossDomain(boolean crossDomain) {
		this.crossDomain = crossDomain;
	}


	@Override
	public void doTag() throws JspException, IOException
	{
		IframePrinter iframePrinter = new IframePrinter(getJspBody(), getJspContext());
		iframePrinter.printText(id, name,src,height,width,crossDomain);
	}
	
}

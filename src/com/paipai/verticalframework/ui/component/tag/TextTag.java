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

package com.paipai.verticalframework.ui.component.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.component.printer.TextPrinter;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class TextTag extends SimpleTagSupport
{
	private String id;
	private String name;
	private String value;
	private String tag;
	private String para;
	private String size;
	private String maxLength;
	private String exclude;
	private String readonly;
	private boolean autoClear;
	private boolean autoSelect;
	private String onclick;

	public void setReadonly(String readonly)
	{
		this.readonly = readonly;
	}

	public String getExclude()
	{
		return exclude;
	}

	public void setExclude(String exclude)
	{
		this.exclude = exclude;
	}

	public boolean getAutoClear() {
		return autoClear;
	}

	public void setAutoClear(boolean autoClear) {
		this.autoClear = autoClear;
	}

	public boolean isAutoSelect() {
		return autoSelect;
	}

	public void setAutoSelect(boolean autoSelect) {
		this.autoSelect = autoSelect;
	}

	public String getId()
	{
		return id;
	}

	public void setId(String id)
	{
		this.id = id;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getValue()
	{
		return value;
	}

	public void setValue(String value)
	{
		this.value = value;
	}

	public String getTag()
	{
		return tag;

	}

	public void setTag(String tag)
	{
		this.tag = tag;
	}

	public String getPara()
	{
		return para;
	}

	public void setPara(String para)
	{
		this.para = para;
	}

	public String getSize()
	{
		return size;
	}

	public void setSize(String size)
	{
		this.size = size;
	}

	public String getMaxLength()
	{
		return maxLength;
	}

	public void setMaxLength(String maxLength)
	{
		this.maxLength = maxLength;
	}

	
	public String getOnclick() {
		return onclick;
	}

	
	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}

	@Override
	public void doTag() throws JspException, IOException
	{
		TextPrinter textPrinter = new TextPrinter(getJspBody(), getJspContext());
		textPrinter.printText(id, name, value, tag, para, size, maxLength,
				exclude, readonly,autoClear,autoSelect,onclick);
	}
	
}

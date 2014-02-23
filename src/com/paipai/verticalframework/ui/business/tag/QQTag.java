/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??QQTag.java
 * 
 * Description??QQ?????UI???Tag
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-19			????
 */
package com.paipai.verticalframework.ui.business.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.business.printer.QQPrinter;

/** 
 * QQ?????UI???Tag
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class QQTag extends SimpleTagSupport
{
	private String uin;
	private int imgType = 47;
	private boolean lazyLoad = true;

	public void setUin(String uin)
	{
		this.uin = uin;
	}

	public void setImgType(int imgType)
	{
		this.imgType = imgType;
	}

	public void setLazyLoad(boolean lazyLoad)
	{
		this.lazyLoad = lazyLoad;
	}

	public void doTag() throws JspException, IOException
	{
		QQPrinter printer = new QQPrinter(getJspBody(), getJspContext());

		printer.print(this.uin, this.lazyLoad, this.imgType);
	}

}

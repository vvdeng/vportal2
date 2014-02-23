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

import com.paipai.verticalframework.ui.component.printer.ImagePrinter;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class ImageTag extends SimpleTagSupport
{
	private String id;
	private String src;
	private String alt;
	private String href;
	private String className;
	private String target;
	private boolean lazyLoad = true;
	private String width;
	private String height;
	private String altImage;
	private String defaultImage = "http://img6.paipaiimg.com/noimage.jpg";
	private String onclick;

	public void setId(String id)
	{
		this.id = id;
	}

	public void setSrc(String src)
	{
		this.src = src;
	}

	public void setAlt(String alt)
	{
		this.alt = alt;
	}

	public void setHref(String href)
	{
		this.href = href;
	}

	public void setClassName(String className)
	{
		this.className = className;
	}

	public void setTarget(String target)
	{
		this.target = target;
	}

	public void setDefaultImage(String defaultImage)
	{
		this.defaultImage = defaultImage;
	}

	public void setLazyLoad(boolean lazyLoad)
	{
		this.lazyLoad = lazyLoad;
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

	public String getAltImage() {
		return altImage;
	}

	public void setAltImage(String altImage) {
		this.altImage = altImage;
	}

	
	public String getOnclick() {
		return onclick;
	}

	
	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}

	public void doTag() throws JspException, IOException
	{
		ImagePrinter imagePrinter = new ImagePrinter(getJspBody(),
				getJspContext());
		imagePrinter.printImage(id, src, lazyLoad, className, alt, href, target,
				defaultImage,height,width,altImage,onclick);
	}
}

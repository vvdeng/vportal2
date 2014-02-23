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

import com.paipai.verticalframework.ui.printer.LayoutPrinter;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class LayoutTag extends SimpleTagSupport {
	private String id;
	private String direction;
	private int childrenNum;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}
	public int getChildrenNum() {
		return childrenNum;
	}

	public void setChildrenNum(int childrenNum) {
		this.childrenNum = childrenNum;
	}
	public void addChildrenNum(){
		this.childrenNum++;
	}
	@Override
	public void doTag() throws JspException, IOException {
		LayoutPrinter layoutPrinter = new LayoutPrinter(this,getJspBody(),
				getJspContext());
		layoutPrinter.printLayout(id,direction);
	}



}

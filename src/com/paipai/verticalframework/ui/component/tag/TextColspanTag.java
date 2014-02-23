/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??TextColspanTag.java					
 *			
 * Description??????????????????							 												
 * History??
 * ?汾??    ????           ????          ?????????????
 *  1.0   raywu        2010-12-27           Create	
 */
package com.paipai.verticalframework.ui.component.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.component.printer.TextColspanPrinter;

/**
 * ????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class TextColspanTag extends SimpleTagSupport {

	/**
	 * ????????
	 */
	private static Integer ID_STEP = 1;

	private String id = "textColspan_" + (ID_STEP++);
	private String targetId;
	private String className;
	private String hideLabel = "??";
	private String showLabel = "????";
	private String callback;
	private boolean defaultHide = true;

	public void doTag() throws JspException, IOException {
		TextColspanPrinter checkBoxPrinter = new TextColspanPrinter(
				getJspBody(), getJspContext());
		checkBoxPrinter.print(id, targetId, className, hideLabel, showLabel, defaultHide, callback);
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setTargetId(String targetId) {
		this.targetId = targetId;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public void setHideLabel(String hideLabel) {
		this.hideLabel = hideLabel;
	}

	public void setShowLabel(String showLabel) {
		this.showLabel = showLabel;
	}

	public void setDefaultHide(boolean defaultHide) {
		this.defaultHide = defaultHide;
	}

	public void setCallback(String callback) {
		this.callback = callback;
	}
}

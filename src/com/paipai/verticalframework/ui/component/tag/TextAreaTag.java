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

import com.paipai.verticalframework.ui.component.printer.TextAreaPrinter;

/** 
 * ????
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class TextAreaTag extends SimpleTagSupport {
	private String id;
	private String name;
	private String tag;
	private String para;
	private String row;
	private String col;
	private boolean autoClear;
	private boolean autoSelect;
	private String onclick;
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

	public boolean isAutoClear() {
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

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getPara() {
		return para;
	}

	public void setPara(String para) {
		this.para = para;
	}

	public String getRow() {
		return row;
	}

	public void setRow(String row) {
		this.row = row;
	}

	public String getCol() {
		return col;
	}

	public void setCol(String col) {
		this.col = col;
	}

	
	public String getOnclick() {
		return onclick;
	}

	
	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}

	@Override
	public void doTag() throws JspException, IOException {
		TextAreaPrinter textAreaPrinter=new TextAreaPrinter(getJspBody(),getJspContext());
		textAreaPrinter.printTextArea(id, name,tag,para, row, col,autoClear,autoSelect,onclick);
	}


}

/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CellRowTag.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Jan 12, 2011			????
 */
package com.paipai.verticalframework.ui.component.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspTag;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.component.printer.CellRowPrinter;

/** 
 * ??????У?????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CellRowTag extends SimpleTagSupport {
	
	private static Integer idStep = 2012;
	private String id = "cell_row_" + (idStep++);
	private String style = null;
	private String onclick = null;
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getStyle() {
		return style;
	}
	
	public void setStyle(String style) {
		this.style = style;
	}
	
	public String getOnclick() {
		return onclick;
	}
	
	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}
	
	@Override
	public void doTag() throws JspException, IOException {
		CellRowPrinter printer = new CellRowPrinter(super.getJspBody(), super.getJspContext());
		
		JspTag pTag = this.getParent();
		if (!pTag.getClass().getName().equals(CellTableTag.class.getName())) {
			throw new JspException("cellRow tag must be wraped by cellTable tag");
		}
		CellTableTag parent = (CellTableTag)pTag;
		printer.printCellRow(id, style, onclick, parent.isFirstRow());
		parent.setFirstRow(false);
	}
}

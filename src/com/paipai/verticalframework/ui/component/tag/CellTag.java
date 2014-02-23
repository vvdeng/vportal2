/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CellTag.java
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

import com.paipai.verticalframework.ui.component.printer.CellPrinter;

/** 
 * ?????????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CellTag extends SimpleTagSupport {
	
	private static Integer idStep = 2012;
	private String id = "cell_" + (idStep++);
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
		CellPrinter printer = new CellPrinter(super.getJspBody(), super.getJspContext());
		
		JspTag pTag = this.getParent();
		if (pTag.getClass().getName().equals(CellHeadTag.class.getName())) {
			printer.printHeadCell(id, style, onclick);
		}
		else if (pTag.getClass().getName().equals(CellRowTag.class.getName())) {
			printer.printRowCell(id, style, onclick);
		}
		else {
			throw new JspException("cell tag must be wraped by cellHead or cellRow tag");
		}
	}
}

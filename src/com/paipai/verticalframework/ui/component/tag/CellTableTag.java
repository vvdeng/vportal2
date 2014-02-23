/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CellTable.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Jan 12, 2011			????
 */
package com.paipai.verticalframework.ui.component.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.component.printer.CellTablePrinter;

/** 
 * ????????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CellTableTag extends SimpleTagSupport {
	
	private static Integer idStep = 2012;
	private String id = "cell_table_" + (idStep++);
	private String style = null;
	private boolean isFirstHead = true;
	private boolean isFirstRow = true;
	
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
	
	public boolean isFirstHead() {
		return isFirstHead;
	}
	
	public void setFirstHead(boolean isFirstHead) {
		this.isFirstHead = isFirstHead;
	}
	
	public boolean isFirstRow() {
		return isFirstRow;
	}
	
	public void setFirstRow(boolean isFirstRow) {
		this.isFirstRow = isFirstRow;
	}

	@Override
	public void doTag() throws JspException, IOException {
		CellTablePrinter printer = new CellTablePrinter(super.getJspBody(), super.getJspContext());
		printer.printCellTable(id, style);
	}
}

/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??FormTag.java
 * 
 * Description??form ui?????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 8, 2010		????
 */
package com.paipai.verticalframework.ui.tag.form;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.printer.form.FormPrinter;

/**
 * ??tag
 * 
 * @author sunniyang
 * @version 1.0
 */
public class FormTag extends SimpleTagSupport {

	/**
	 * ????????????????form id
	 */
	private static Integer idStep = 2012;
	/**
	 * id???????????????????formTag+idStep
	 */
	private String id = "formTag" + (idStep++);
	/**
	 * ???
	 */
	private String name = null;
	/**
	 * ????????
	 */
	private int columns = 1;
	/**
	 * ?п??????3?У?"20%,20%,10%"?????????з?????У?????????????????????
	 * ???м??????????п???"*"???棬??"20%,*,10%"????м?????????70%
	 * ?????????96%
	 */
	private String columnWidth = null;
	/**
	 * ????url
	 */
	private String action = null;
	/**
	 * ?????
	 */
	private String method = null;
	/**
	 * ????????
	 */
	private String enctype = null;
	/**
	 * ?????label????????????????????????????????????????
	 */
	private int labelWidth = 100;
	/**
	 * form???????????????е?????????????????
	 */
	private int currCol = 0;
	
	private String target;
	
	private String onsubmit;

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

	public int getColumns() {
		return columns;
	}

	public void setColumns(int columns) {
		this.columns = columns;
	}
	
	public String getColumnWidth() {
		return columnWidth;
	}
	
	public void setColumnWidth(String columnWidth) {
		this.columnWidth = columnWidth;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}
	
	public String getEnctype() {
		return enctype;
	}
	
	public void setEnctype(String enctype) {
		this.enctype = enctype;
	}

	public int getLabelWidth() {
		return labelWidth;
	}

	public void setLabelWidth(int labelWidth) {
		this.labelWidth = labelWidth;
	}

	public int getCurrCol() {
		return currCol;
	}

	public void setCurrCol(int currCol) {
		this.currCol = currCol;
	}
	
	public ColumnWidth[] getParsedWidth() throws JspException {
		ColumnWidth[] cWidth = new ColumnWidth[this.columns];
		if (this.columnWidth == null)
			this.columnWidth = "*";
		String[] widthStrings = this.columnWidth.split(",");
		int leftPercent = 96;
		int autoColumn = 0;
		int i = 0;
		for (; i < widthStrings.length; i++) {
			String widthString = widthStrings[i].trim();
			ColumnWidth columnWidth = new ColumnWidth();
			if (widthString.endsWith("%")) {
				try {
					columnWidth.setWidth(Integer.parseInt(widthString.substring(0, widthString.length() - 1)));
				}
				catch (NumberFormatException e) {
					throw new JspException("form?п?????????????");
				}
				columnWidth.setPercent(true);
				leftPercent -= columnWidth.getWidth();
			}
			else if(widthString.endsWith("px")){
				try {
					columnWidth.setWidth(Integer.parseInt(widthString.substring(0, widthString.length() - 2)));
				}
				catch (NumberFormatException e) {
					throw new JspException("form?п?????????????");
				}
				columnWidth.setPercent(false);
				
			}
			else if (widthString.equals("*")) {
				columnWidth.setWidth(0);
				columnWidth.setPercent(true);
				autoColumn++;
			}
			else {
				throw new JspException("form?п?????????????");
			}
			cWidth[i] = columnWidth;
		}
		for (; i < this.columns; i++) {
			ColumnWidth columnWidth = new ColumnWidth();
			columnWidth.setWidth(0);
			columnWidth.setPercent(true);
			cWidth[i] = columnWidth;
			autoColumn++;
		}
		for (i = 0; i < cWidth.length; i++) {
			if (cWidth[i].getWidth() == 0)
				cWidth[i].setWidth(leftPercent / autoColumn);
		}
		return cWidth;
	}
	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}
	public String getOnsubmit() {
		return onsubmit;
	}

	public void setOnsubmit(String onsubmit) {
		this.onsubmit = onsubmit;
	}

	@Override
	public void doTag() throws JspException, IOException {
		FormPrinter printer = new FormPrinter(super.getJspBody(), super
				.getJspContext());
		printer.printForm(id, name, columns, action, method, enctype, labelWidth,target,onsubmit);
	}


}

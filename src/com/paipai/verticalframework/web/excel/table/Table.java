/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??Table.java
 * 
 * Description??Table????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-25			????
 */
package com.paipai.verticalframework.web.excel.table;

import java.util.ArrayList;
import java.util.List;

import com.paipai.verticalframework.core.ToStringSupport;

/**
 * Table????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class Table extends ToStringSupport{

	private String title;
	private String titleStyle = "titleStyle";
	private String headStyle = "headStyle";
	private String rowStyle = "rowStyle";
	private String model = "list";

	private List<Column> columns = new ArrayList<Column>();

	public void addColumn(Column column) {
		this.columns.add(column);
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitleStyle() {
		return titleStyle;
	}

	public void setTitleStyle(String titleStyle) {
		this.titleStyle = titleStyle;
	}

	public String getHeadStyle() {
		return headStyle;
	}

	public void setHeadStyle(String headStyle) {
		this.headStyle = headStyle;
	}

	public String getRowStyle() {
		return rowStyle;
	}

	public void setRowStyle(String rowStyle) {
		this.rowStyle = rowStyle;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public List<Column> getColumns() {
		return columns;
	}

	public void setColumns(List<Column> columns) {
		this.columns = columns;
	}

}

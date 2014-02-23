/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??TableParser.java
 * 
 * Description????????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-25			????
 */
package com.paipai.verticalframework.web.excel.table;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.paipai.verticalframework.log.Log;
import com.paipai.verticalframework.web.excel.ConfigException;

/**
 * ??????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class TableParser {

	private final String TABLE_TITLE = "title";
	private final String TABLE_TITLE_STYLE = "titleStyle";
	private final String TABLE_HEAD_STYLE = "headStyle";
	private final String TABLE_ROW_STYLE = "rowStyle";
	private final String TABLE_MODEL = "model";

	private final String COLUMN_NAME = "name";
	private final String COLUMN_PROPERTY = "property";
	private final String COLUMN_WIDTH = "width";
	private final String COLUMN_ALIGN = "align";
	private final String COLUMN_AUTOWRAP = "autoWrap";
	private final String COLUMN_FORMAT = "format";

	/**
	 * ????Table????
	 * 
	 * @param element
	 *            ???
	 * @return Table
	 * @see ?ο???JavaDoc
	 */
	public Table parse(Element element) {
		Table table = new Table();
		if (element.hasAttribute(TABLE_TITLE)) {
			table.setTitle(element.getAttribute(TABLE_TITLE));
		}
		if (element.hasAttribute(TABLE_TITLE_STYLE)) {
			table.setTitleStyle(element.getAttribute(TABLE_TITLE_STYLE));
		}
		if (element.hasAttribute(TABLE_HEAD_STYLE)) {
			table.setHeadStyle(element.getAttribute(TABLE_HEAD_STYLE));
		}
		if (element.hasAttribute(TABLE_ROW_STYLE)) {
			table.setRowStyle(element.getAttribute(TABLE_ROW_STYLE));
		}
		if (element.hasAttribute(TABLE_MODEL)) {
			table.setModel(element.getAttribute(TABLE_MODEL));
		}

		NodeList childNodes = element.getChildNodes();

		for (int i = 0; i < childNodes.getLength(); i++) {
			Node node = childNodes.item(i);
			if (node instanceof Element) {
				Element childElement = (Element) node;

				if ("column".equals(childElement.getTagName())) {
					table.addColumn(parseColumn(childElement));
				} else {
					Log.logError("unknow element " + childElement.getTagName() + " for table");
				}
			}
			node = null;
		}
		Log.logInfo("table config:{0}", table);
		return table;
	}

	private Column parseColumn(Element element) {
		if (!element.hasAttribute(COLUMN_NAME)
				|| !element.hasAttribute(COLUMN_PROPERTY)) {
			throw new ConfigException(
					"name and property attribute for column is needed");
		}
		Column column = new Column(element.getAttribute(COLUMN_NAME), element
				.getAttribute(COLUMN_PROPERTY));
		if (element.hasAttribute(COLUMN_WIDTH)) {
			column.setWidth(Integer
					.parseInt(element.getAttribute(COLUMN_WIDTH)));
		}
		if (element.hasAttribute(COLUMN_ALIGN)) {
			column.setAlign(element.getAttribute(COLUMN_ALIGN));
		}
		if (element.hasAttribute(COLUMN_AUTOWRAP)) {
			column.setAutoWrap(Boolean.parseBoolean(element
					.getAttribute(COLUMN_AUTOWRAP)));
		}
		if (element.hasAttribute(COLUMN_FORMAT)) {
			column.setFormat(element.getAttribute(COLUMN_FORMAT));
		}
		return column;
	}
}

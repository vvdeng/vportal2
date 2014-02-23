/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??StyleParser.java
 * 
 * Description???????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-25			????
 */
package com.paipai.verticalframework.web.excel;

import java.util.HashMap;
import java.util.Map;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.paipai.verticalframework.log.Log;

/**
 * ?????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class ExcelStylesParser {

	private final String NAME = "name";
	private final String HEIGHT = "height";
	private final String FONT = "font";
	private final String WEIGHT = "weight";
	private final String BOLD = "bold";
	private final String COLOR = "color";
	private final String BACKCOLOR = "backColor";

	/**
	 * ????Excel???
	 * @param element styles Element
	 * @return Map<String, ExcelStyle>
	 * @see ?ο???JavaDoc
	 */
	public Map<String, ExcelStyle> parse(Element element) {
		Map<String, ExcelStyle> styles = new HashMap<String, ExcelStyle>();
		NodeList childNodes = element.getChildNodes();

		for (int i = 0; i < childNodes.getLength(); i++) {
			Node node = childNodes.item(i);
			if (node instanceof Element) {
				Element childElement = (Element) node;

				if ("style".equals(childElement.getTagName())) {
					ExcelStyle style = parseStyle(childElement);
					styles.put(style.getName(), style);
					style = null;
				}
				else {
					Log.logError("unknow element " + childElement.getTagName()
							+ " for styles");
				}
			}
			node = null;
		}
		Log.logInfo("sytles {0}", styles);
		return styles;
	}

	private ExcelStyle parseStyle(Element element) {
		if (!element.hasAttribute(NAME)) {
			throw new ConfigException("name attribute for style is needed");
		}
		ExcelStyle style = new ExcelStyle(element.getAttribute(NAME));
		NodeList childNodes = element.getChildNodes();

		for (int i = 0; i < childNodes.getLength(); i++) {
			Node node = childNodes.item(i);
			if (node instanceof Element) {
				Element childElement = (Element) node;
				if (HEIGHT.equals(childElement.getTagName())) {
					style.setHeight(Integer.parseInt(childElement
							.getTextContent().trim()));
				}
				else if (FONT.equals(childElement.getTagName())) {
					style.setFont(childElement.getTextContent().trim());
				}
				else if (WEIGHT.equals(childElement.getTagName())) {
					style.setWeight(Integer.parseInt(childElement
							.getTextContent().trim()));
				}
				else if (BOLD.equals(childElement.getTagName())) {
					style.setBold(Boolean.parseBoolean(childElement
							.getTextContent().trim()));
				}
				else if (COLOR.equals(childElement.getTagName())) {
					style.setColor(childElement.getTextContent().trim());
				}
				else if (BACKCOLOR.equals(childElement.getTagName())) {
					style.setBackColor(childElement.getTextContent().trim());
				}
				else {
					Log.logError("unknow element " + childElement.getTagName()
							+ " for style");
				}
			}
			node = null;
		}
		return style;
	}
}

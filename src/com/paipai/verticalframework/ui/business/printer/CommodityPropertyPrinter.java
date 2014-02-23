/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CommodityPropertyPrinter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Jan 10, 2011			????
 */
package com.paipai.verticalframework.ui.business.printer;

import java.util.Map;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;


/** 
 * ???????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CommodityPropertyPrinter extends DefaultXhtmlPrinter {
	
	public CommodityPropertyPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	
	public void printCommodityProperty(String id, String property, String iconTag, String iconType, String ptag, Map<String, String> ptagList) {
		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.ID, "COMMODITY_PRO_SPAN_" + id);
		printHelper.closeElement();
		
		StringBuilder script = new StringBuilder("var result=$getCommIcons({");
		if (property != null && property.length() > 0) {
			script.append("property:'" + property + "',");
		}
		if (iconTag != null && iconTag.length() > 0) {
			script.append("iconTag:'" + iconTag + "',");
		}
		script.append("text:" + (iconType != null && iconType.length() > 0 && iconType.equals("txt")) + ",");
		if (ptag != null && ptag.length() > 0) {
			script.append("ptag:'" + ptag + "',");
		}
		if (ptagList != null && !ptagList.isEmpty()) {
			StringBuilder ptags = new StringBuilder();
			for (String key : ptagList.keySet()) {
				if (ptags.length() == 0) {
					ptags.append("'" + key + "':'" + ptagList.get(key) + "'");
				}
				else {
					ptags.append(",'" + key + "':'" + ptagList.get(key) + "'");
				}
			}
			script.append("ptagList:{" + ptags.toString() + "},");
		}
		script.deleteCharAt(script.length() - 1);
		script.append("});");
		script.append("document.getElementById('COMMODITY_PRO_SPAN_" + id + "').innerHTML=result;");
		printHelper.script(script.toString());
		
		printHelper.endElement(Tag.SPAN);
		
		flushTag();
	}
}

/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??SellerPropertyPrinter.java
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
 * ??????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class SellerPropertyPrinter extends DefaultXhtmlPrinter {
	
	public SellerPropertyPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	
	public void printSellerProperty(String id, String qq, String property, String auth, 
			String property1, String property2, String iconTag, String iconType, String ptag, Map<String, String> ptagList) {
		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.ID, "SELLER_PRO_SPAN_" + id);
		printHelper.closeElement();
		
		StringBuilder script = new StringBuilder("var result=$getUserIcons({");
		if (qq != null && qq.length() > 0) {
			script.append("qq:'" + qq + "',");
		}
		if (property != null && property.length() > 0) {
			script.append("userPro:'" + property + "',");
		}
		if (auth != null && auth.length() > 0) {
			script.append("auth:'" + auth + "',");
		}
		if (property1 != null && property1.length() > 0) {
			script.append("property1:'" + property1 + "',");
		}
		if (property2 != null && property2.length() > 0) {
			script.append("property2:'" + property2 + "',");
		}
		if (iconTag != null && iconTag.length() > 0) {
			script.append("iconTag:'" + iconTag + "',");
		}
		if (iconType != null && iconType.length() > 0) {
			script.append("iconType:'" + iconType + "',");
		}
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
		script.append("document.getElementById('SELLER_PRO_SPAN_" + id + "').innerHTML=result;");
		printHelper.script(script.toString());
		
		printHelper.endElement(Tag.SPAN);
		
		flushTag();
	}
}

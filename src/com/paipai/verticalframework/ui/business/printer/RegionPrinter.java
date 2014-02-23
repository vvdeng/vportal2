/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??RegionPrinter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Jan 5, 2011			????
 */
package com.paipai.verticalframework.ui.business.printer;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;


/** 
 * <??????>
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class RegionPrinter extends DefaultXhtmlPrinter {

	public RegionPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	
	public void printRegion(String id, String name, int width, int level, boolean showAll, int provinceValue, int cityValue, int townValue) {
		String pid = id + "_province";
		String cid = id + "_city";
		String tid = id + "_town";
		String pname = name + "Province";
		String cname = name + "City";
		String tname = name + "Town";
		
		printHelper.startElement(Tag.SELECT);
		printHelper.attribute(Attr.ID, pid);
		printHelper.attribute(Attr.NAME, pname);
		printHelper.attribute(Attr.STYLE, "width:" + width + "px;");
		printHelper.attribute(Attr.ONCHANGE, "PP.vfui.region.onChangeProv('" + pid + "', '" + cid + "', '" + tid + "');");
		printHelper.closeElement();
		printHelper.endElement(Tag.SELECT);
		
		printHelper.text("&nbsp;&nbsp;");
		
		printHelper.startElement(Tag.SPAN);
		printHelper.text("?");
		printHelper.endElement(Tag.SPAN);
		
		if (level >= 2) {
			printHelper.text("&nbsp;&nbsp;");
			
			printHelper.startElement(Tag.SELECT);
			printHelper.attribute(Attr.ID, cid);
			printHelper.attribute(Attr.NAME, cname);
			printHelper.attribute(Attr.STYLE, "width:" + width + "px;");
			printHelper.attribute(Attr.ONCHANGE, "PP.vfui.region.onChangeCity('" + pid + "', '" + cid + "', '" + tid + "');");
			printHelper.closeElement();
			printHelper.endElement(Tag.SELECT);
			
			printHelper.text("&nbsp;&nbsp;");
			
			printHelper.startElement(Tag.SPAN);
			printHelper.text("??");
			printHelper.endElement(Tag.SPAN);
		}
		
		if (level >= 3) {
			printHelper.text("&nbsp;&nbsp;");
			
			printHelper.startElement(Tag.SELECT);
			printHelper.attribute(Attr.ID, tid);
			printHelper.attribute(Attr.NAME, tname);
			printHelper.attribute(Attr.STYLE, "width:" + width + "px;");
			printHelper.closeElement();
			printHelper.endElement(Tag.SELECT);
			
			printHelper.text("&nbsp;&nbsp;");
			
			printHelper.startElement(Tag.SPAN);
			printHelper.text("??/??");
			printHelper.endElement(Tag.SPAN);
		}
		
		String script = "PP.vfui.region.createRegion('" + pid + "', '" + cid + "', '" + tid + "', " + level + ", " + showAll + ", " 
			+ (provinceValue == -1 ? "''" : provinceValue) + ", " 
			+ (cityValue == -1 ? "''" : cityValue) + ", " 
			+ (townValue == -1 ? "''" : townValue) + ");";
		printHelper.script(script);
		
		flushTag();
	}
}

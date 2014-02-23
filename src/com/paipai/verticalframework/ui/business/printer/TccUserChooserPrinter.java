/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??TccUserChooserPrinter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Dec 27, 2010			????
 */
package com.paipai.verticalframework.ui.business.printer;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;


/** 
 * RTX??????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class TccUserChooserPrinter extends DefaultXhtmlPrinter {

	public TccUserChooserPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	
	public void printTccUserChooser(String id, String name, String inputType, int width, int height, String value) {
		printHelper.style(".user_chooser_class_" + id + "{width:" + width + "px;height:" + height + "}");
		printHelper.style(".autofinish {z-index:520!important;}");
		
		printHelper.script("$loadScript('http://top.oa.com/js/users.js', null, {charset:'utf-8'});");
		
		int iType = 1;
		if (inputType.equals("textArea"))
			iType = 2;
		printHelper.script("new Tcc.UserChooser({id:'" + id + "',name:'" + name + "',inputType:" 
				+ iType + ",choosertype:1,user_chooser_class:'user_chooser_class_" + id + "',value:'" + value + "'});");
		
		flushTag();
	}
}

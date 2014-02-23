/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??ButtionPrinter.java					
 *			
 * Description??????????????????							 												
 * History??
 * ?汾??    ????           ????          ?????????????
 *  1.0   bevisdeng        2010-10-22           Create	
 */

package com.paipai.verticalframework.ui.component.printer;

import java.io.IOException;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.JspFragment;
import javax.servlet.jsp.tagext.JspTag;

import com.paipai.verticalframework.ui.component.tag.ComboTag;
import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class OptionPrinter extends DefaultXhtmlPrinter {

	public OptionPrinter(JspFragment jspFragment, JspContext jspContext,
			JspTag parentTag) {
		super(jspFragment, jspContext, parentTag);
	}

	public void printOption(String id, String value, String selected)
			throws IOException, JspException {

		printHelper.startElement(Tag.OPTION);
		printHelper.attribute(Attr.VALUE, value);
		/*
		if (!(parentTag instanceof ComboTag)) {
			throw new JspTagException("option??? ???????? combo ??????");			
		}
		if((value!=null&&value.equals(((ComboTag)parentTag).getValue()))||"true".equals(selected)){
			printHelper.attribute(Attr.SELECTED, "true");
		}*/
		if ("true".equals(selected)) {
			printHelper.attribute(Attr.SELECTED, "true");
		}
		printBody();
		printHelper.endElement(Tag.OPTION);
		flushTag();

	}

}

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
import java.io.StringWriter;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/** 
 * ????
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class PrintPrinter extends DefaultXhtmlPrinter {
	

	public PrintPrinter(JspFragment jspFragment,JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	public void printPrint(String id,boolean br) throws IOException{
	
		StringWriter bodyWriter=new StringWriter();
		printBody(bodyWriter);
		String bodyContent=bodyWriter.getBuffer().toString().replace("<", "&lt;").replace(">", "&gt;").replace(" ", "&nbsp;");
		if(br){
			bodyContent=bodyContent.replace("\n", "<br>");
		}
		printHelper.text(bodyContent);		
		flushTag();
		
	}

}

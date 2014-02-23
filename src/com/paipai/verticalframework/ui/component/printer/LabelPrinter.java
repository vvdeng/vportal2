/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??LinkPrinter.java					
 *			
 * Description??????????????????							 												
 * History??
 * ?汾??    ????           ????          ?????????????
 *  1.0   bevisdeng        2010-10-25           Create	
 */

package com.paipai.verticalframework.ui.component.printer;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/** 
 * ????
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class LabelPrinter extends DefaultXhtmlPrinter {

	
	public LabelPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);

	}
	public void printLabel(String id,int length,String type){

		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.ID, id);
		if("button".equals(type)){
			
			printHelper.attribute(Attr.CLASS,"label_button");
		}
		printHelper.closeElement();//????????????????????????
		int startIndex=printHelper.getBuffer().length();
		printBody();
		int endIndex=printHelper.getBuffer().length();
		postProcessBody(startIndex,endIndex,length);
		printHelper.endElement(Tag.SPAN);
		flushTag();	
	}
	public void postProcessBody(int startIndex,int endIndex,int length){
		if((startIndex==endIndex)||length==0){
			return;
		}
		String bodyContent=printHelper.getBuffer().substring(startIndex,endIndex);
		if(bodyContent.length()>length){
			printHelper.getBuffer().delete(startIndex, endIndex);
			printHelper.startElement(Tag.SPAN);
			printHelper.attribute(Attr.TITLE, bodyContent);
			printHelper.text(bodyContent.substring(0, length)+"...");
			printHelper.endElement(Tag.SPAN);		
		}
		
	}
}

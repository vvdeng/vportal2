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

package com.paipai.verticalframework.ui.printer;

import java.io.IOException;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;
import javax.servlet.jsp.tagext.JspTag;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.tag.LayoutTag;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class GroupPrinter extends DefaultXhtmlPrinter {


	public GroupPrinter(JspFragment jspFragment, JspContext jspContext,
			JspTag parentTag) {
		super(jspFragment, jspContext, parentTag);
	}

	public void printGroup(String id, String title, String width,
			String height,String style,String className) throws IOException {
		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.ID,id);
		if(style==null){
			style="";
			
		}
		if(width!=null){
			style+="width:"+width+";";
		}
		if(height!=null){
			style+="height:"+height+";";
		}
		printHelper.attribute(Attr.STYLE,style);
		printHelper.attribute(Attr.CLASS,className);
		printHelper.startElement(Tag.H4);
		printHelper.attribute(Attr.CLASS,"group_title");
		printHelper.startElement(Tag.SPAN);
		printHelper.text(title);
		printHelper.endElement(Tag.SPAN);
		printHelper.endElement(Tag.H4);
		printHelper.startElement(Tag.DIV);
		printBody();
		printHelper.endElement(Tag.DIV);
		printHelper.endElement(Tag.DIV);
		flushTag();

	}
}

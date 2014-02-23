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

public class TextAreaPrinter extends DefaultXhtmlPrinter {
	

	public TextAreaPrinter(JspFragment jspFragment,JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	public void printTextArea(String id,String name,String tag,String para,String row,String col,boolean autoClear,boolean autoSelect,String onclick) throws IOException{
		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.CLASS, "pv_text_area");
		printHelper.startElement(Tag.TEXTAREA);

		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.NAME, name);
		printHelper.attribute(Attr.TAG, tag);
		printHelper.attribute(Attr.PARA,para);
		printHelper.attribute(Attr.ROWS, row);
		printHelper.attribute(Attr.COLS,col);
		printHelper.attribute(Attr.ONCLICK,onclick);
		if(autoClear){
			printHelper.attribute(Attr.STYLE, "color:#cccccc;");
			String jsCode="if(!this.getAttribute('inited')){this.setAttribute('inited','true');this.innerHTML='';this.style.color='black';}";
			if(autoSelect){
				jsCode+="this.select()";
			}
			printHelper.attribute(Attr.ONCLICK,jsCode);

		}
		printBody();
		printHelper.endElement(Tag.TEXTAREA);
		printHelper.endElement(Tag.SPAN);
		flushTag();
		
	}
}

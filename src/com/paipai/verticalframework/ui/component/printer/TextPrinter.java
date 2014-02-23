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
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class TextPrinter extends DefaultXhtmlPrinter
{

	public TextPrinter(JspFragment jspFragment, JspContext jspContext)
	{
		super(jspFragment, jspContext);
	}

	public void printText(String id, String name, String value, String tag,
			String para, String size, String maxLength, String exclude,
			String readonly,boolean autoClear,boolean autoSelect,String onclick) throws IOException
	{

		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.CLASS, "pv_text");
		printHelper.startElement(Tag.INPUT);
		printHelper.attribute(Attr.TYPE, "text");
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.NAME, name);
		printHelper.attribute(Attr.ONCLICK,onclick);
		if (value != null && value.equalsIgnoreCase(exclude))
		{
			printHelper.attribute(Attr.VALUE, "");
		} else
		{
			printHelper.attribute(Attr.VALUE, value);
		}

		printHelper.attribute(Attr.TAG, tag);
		printHelper.attribute(Attr.PARA, para);
		printHelper.attribute(Attr.SIZE, size);
		printHelper.attribute(Attr.MAXLENGTH, maxLength);
		printHelper.attribute(Attr.READONLY, readonly);
		if(autoClear){
			printHelper.attribute(Attr.STYLE, "color:#cccccc;");
			String jsCode="if(!this.getAttribute('inited')){this.setAttribute('inited','true');this.value='';this.style.color='black';}";
			if(autoSelect){
				jsCode+="this.select()";
			}
			printHelper.attribute(Attr.ONCLICK,jsCode);

		}
		printHelper.endElement(Tag.INPUT);
		printHelper.endElement(Tag.SPAN);
		flushTag();

	}

}

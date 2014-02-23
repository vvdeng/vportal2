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

package com.paipai.verticalframework.ui.business.printer;

import java.io.IOException;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/**
 * ????
 * 
 * @author riquelmexu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class SimpleCategoryPrinter extends DefaultXhtmlPrinter {

	public SimpleCategoryPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printCategory(String id, String name,String defaults,String multiple,int size) throws IOException {
		System.out.println("test========>"+size);
		if(multiple!=null&&multiple.equals("single")){
			printHelper.startElement(Tag.SELECT);
			printHelper.attribute(Attr.ID,id+"_category");
			printHelper.attribute(Attr.NAME,name+"_category");
			System.out.println("test");
			printHelper.attribute(Attr.ONCHANGE,"PP.vfui.simpleCategory.selectCategory(this)");
			printHelper.endElement(Tag.SELECT);
		}else{
			printHelper.startElement(Tag.SPAN);
			printHelper.attribute(Attr.ID, id + "_sortPathShowUp");
			printHelper.text(" ");
			printHelper.endElement(Tag.SPAN);


			printHelper.startElement(Tag.DIV);

			printHelper.attribute(Attr.CLASS, "module_box_normal widget_life");
			printHelper.attribute(Attr.STYLE, "width:300px;margin-top: 2px; margin-left: 40px;");
			printHelper.attribute(Attr.ID, id + "_category");


			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.CLASS, "box_content");

			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.CLASS, "select_list");

			/*
			 * ?????? <div class="sortList">
			 */
			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.CLASS, "sortList");

			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.ID, id + "_sortNoteC1");
			printHelper.attribute(Attr.CLASS, "sortNote");
			printHelper.text("????????");
			
			printHelper.startElement(Tag.SPAN);
			printHelper.attribute(Attr.STYLE,"padding-left: 40px;");
			printHelper.startElement(Tag.A);
			printHelper.attribute(Attr.ONCLICK,"PP.vfui.simpleCategory.reset()");
			printHelper.attribute(Attr.TITLE,"??????????????");
			printHelper.text("????");
			printHelper.endElement(Tag.A);
			printHelper.endElement(Tag.SPAN);
			printHelper.endElement(Tag.DIV);

			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.ID, id + "_sortShowC");
			printHelper.attribute(Attr.CLASS, "sortShow bg_selected");
			printHelper.text(" ");
			printHelper.endElement(Tag.DIV);

			printHelper.endElement(Tag.DIV);



			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.CLASS, "form_b center");
			printHelper.attribute(Attr.STYLE, "text-align: center");
			
			
			printHelper.endElement(Tag.DIV);

			printHelper.endElement(Tag.DIV);
			printHelper.endElement(Tag.DIV);
			/* printHelper.endElement(Tag.DIV); */

			/*
			 * hidden input
			 */
		}
		printHelper.startElement(Tag.INPUT);
		printHelper.attribute(Attr.TYPE, "hidden");
		printHelper.attribute(Attr.NAME, name );
		printHelper.attribute(Attr.ID, id );
		printHelper.attribute(Attr.VALUE, "");
		printHelper.endElement(Tag.INPUT);	
		
		printHelper.startElement(Tag.INPUT);
		printHelper.attribute(Attr.TYPE, "hidden");
		printHelper.attribute(Attr.NAME, id + "FullDesc");
		printHelper.attribute(Attr.ID, id + "FullDesc");
		printHelper.attribute(Attr.VALUE, "");
		printHelper.endElement(Tag.INPUT);			
		
		printHelper.script("PP.vfui.simpleCategory.option.id=\"" + id + "\";");
		printHelper.script("PP.vfui.simpleCategory.option.name=\"" + name + "\";");
		printHelper.script("PP.vfui.simpleCategory.option.defaults=" + defaults + ";");
		if(multiple!=null){
			printHelper.script("PP.vfui.simpleCategory.option.multiple=\"" + multiple + "\";");
		}
		if(size!=0){
			printHelper.script("PP.vfui.simpleCategory.option.size=" + size + ";");	
		}
		printHelper.script("PP.vfui.simpleCategory.init();");

		flushTag();

	}
}

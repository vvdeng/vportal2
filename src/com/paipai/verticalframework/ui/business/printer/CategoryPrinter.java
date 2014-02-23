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

public class CategoryPrinter extends DefaultXhtmlPrinter {

	public CategoryPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printCategory(String id, String name, String level1,
			String level2, String level3, String level4, String filter,
			String afterHide,String type) throws IOException {

		/*
		 * printHelper.startElement(Tag.DIV); printHelper.attribute(Attr.CLASS,
		 * "form_t");
		 */
		/*
		 * printHelper.startElement(Tag.LABEL); printHelper.text(" ");
		 * printHelper.endElement(Tag.LABEL);
		 */
		//???type???????type???????float
		if(type==null||type.isEmpty()){
			type=new String("float");
		}
		if(type.equals("float")){
			printHelper.startElement(Tag.BUTTON);
			printHelper.attribute(Attr.ID, id + "_btn");
			printHelper.text("??????");
			printHelper.endElement(Tag.BUTTON);			
		}


		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.ID, id + "_sortPathShowUp");
		printHelper.text(" ");
		printHelper.endElement(Tag.SPAN);

		//printHelper.endElement(Tag.DIV);

		printHelper.startElement(Tag.DIV);
		if(type.equals("float")){
			printHelper.attribute(Attr.CLASS, "module_box_normal box_life h");
			printHelper
					.attribute(Attr.STYLE,
							"position:absolute;width:990px;left:50%;top:100px;margin-left:10px;");
		}else{
			printHelper.attribute(Attr.CLASS, "module_box_normal widget_life");
			printHelper
			.attribute(Attr.STYLE,
					"width:990px;");
		}
		printHelper.attribute(Attr.ID, id + "_category");
		if (type.equals("float")) {
			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.CLASS, "box_title");
			printHelper.startElement(Tag.H4);
			printHelper.text("????б?????");
			printHelper.endElement(Tag.H4);
			printHelper.endElement(Tag.DIV);
		}

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
		printHelper.text("?????1?????");
		printHelper.endElement(Tag.DIV);

		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.ID, id + "_sortShowC1");
		printHelper.attribute(Attr.CLASS, "sortShow bg_selected");
		printHelper.text(" ");
		printHelper.endElement(Tag.DIV);

		printHelper.endElement(Tag.DIV);

		/*
		 * </div>
		 */

		/*
		 * <div class="sortList">
		 */

		for (int i = 2; i <= 4; i++) {

			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.CLASS, "sortList");

			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.ID, id + "_sortNoteC" + i);
			printHelper.attribute(Attr.CLASS, "sortNote hidden");
			printHelper.text("?????" + i + "??????");
			printHelper.endElement(Tag.DIV);

			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.ID, id + "_sortShowC" + i);
			printHelper.attribute(Attr.CLASS, "sortShow");
			printHelper.text(" ");
			printHelper.endElement(Tag.DIV);

			printHelper.endElement(Tag.DIV);
		}

		/*
		 * </dev>
		 */

		printHelper.startElement(Tag.P);
		printHelper.attribute(Attr.CLASS, "select_result");
		printHelper.attribute(Attr.ID, id + "_sortPathShow");
		printHelper.text(" ");
		printHelper.endElement(Tag.P);

		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.CLASS, "form_b center");
		printHelper.attribute(Attr.STYLE, "text-align: center");
		
		if(type.equals("float")){
			printHelper.startElement(Tag.BUTTON);
			printHelper.attribute(Attr.ID, id + "_select_btn");
			printHelper.text("???");
			printHelper.endElement(Tag.BUTTON);
		}
		
		printHelper.endElement(Tag.DIV);

		printHelper.endElement(Tag.DIV);
		printHelper.endElement(Tag.DIV);
		/* printHelper.endElement(Tag.DIV); */

		/*
		 * hidden input
		 */
		for (int i = 1; i <= 4; i++) {
			printHelper.startElement(Tag.INPUT);
			printHelper.attribute(Attr.TYPE, "hidden");
			printHelper.attribute(Attr.NAME, name + i);
			printHelper.attribute(Attr.ID, id + i);
			printHelper.attribute(Attr.VALUE, "");
			printHelper.endElement(Tag.INPUT);
		}

		printHelper.startElement(Tag.INPUT);
		printHelper.attribute(Attr.TYPE, "hidden");
		printHelper.attribute(Attr.NAME, id + "FullDesc");
		printHelper.attribute(Attr.ID, id + "FullDesc");
		printHelper.attribute(Attr.VALUE, "");
		printHelper.endElement(Tag.INPUT);

		String levels = "[";

		if (!level1.isEmpty()) {
			levels += level1;
			if (level2 != null && !level2.isEmpty()) {
				levels += "," + level2;
				if (level3 != null && !level3.isEmpty()) {
					levels += "," + level3;
					if (level4 != null && !level4.isEmpty()) {
						levels += "," + level4;
					}
				}
			}
		}
		levels += "]";
		if (!levels.isEmpty()) {
			printHelper
					.script("PP.vfui.category.option.levels=" + levels + ";");
		}

		if (filter != null && !filter.isEmpty()) {
			printHelper.script("PP.vfui.category.option.callBack=" + filter
					+ ";");
		}

		if (afterHide != null && !afterHide.isEmpty()) {
			printHelper.script("PP.vfui.category.afterHide=" + afterHide + ";");
		}

		printHelper.script("PP.vfui.category.option.id=\"" + id + "\";");
		printHelper.script("PP.vfui.category.option.name=\"" + name + "\";");
		printHelper.script("PP.vfui.category.option.type=\"" + type + "\";");
		printHelper.script("PP.vfui.category.init();");

		flushTag();

	}
}

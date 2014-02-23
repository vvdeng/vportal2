/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??DialogPrinter.java
 * 
 * Description??????????????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 8, 2010		????
 */
package com.paipai.verticalframework.ui.printer.dialog;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/**
 * ????????????
 * 
 * @author sunniyang
 * @version 1.0
 */
public class DialogPrinter extends DefaultXhtmlPrinter {

	public DialogPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printDialog(String id, String name, int width, int height,
			String title, String buttonAlign, String acceptLabel,
			String onAccept, String cancelLabel, String onCancel,boolean scrollX) {
		printHelper.startElement(Tag.DIV);
		String style="visibility:hidden;position:absolute;left:50%;top:50%;width:"
			+ width + "px;height:" + height + "px;margin-left:-"
			+ (width / 2) + "px;margin-top:-" + (height / 2)
			+ "px;z-index:1;";
		if (height > 0) {
			style += "overflow-y: scroll;";
		}
		if (scrollX == true) {
			style += "overflow-x: scroll;";
		}
		printHelper.attribute(Attr.STYLE,style);
		printHelper.attribute(Attr.CLASS, "module_box_normal box_life");
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.NAME, name);
		printHelper.closeElement();
		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.ID, id + "_title");
		printHelper.attribute(Attr.STYLE, "cursor:move;");
		printHelper.attribute(Attr.CLASS, "box_title");
		printHelper.closeElement();

		printHelper.startElement(Tag.H4);
		printHelper.text(title);
		printHelper.endElement(Tag.H4);

		printHelper.startElement(Tag.A);
		printHelper.attribute(Attr.CLASS, "bt_close box_bt_close");
		printHelper.attribute(Attr.STYLE, "cursor:hand");
		//if (onCancel != null && onCancel.length() != 0) // ???dialog?????X????????cancel???
		//	printHelper.attribute(Attr.ONCLICK, "PP.vfui.dialog.cancel('" + id
		//			+ "'," + onCancel + ");");
		//else
			printHelper.attribute(Attr.ONCLICK, "PP.vfui.dialog.cancel('" + id
					+ "');");
		printHelper.text(" ");
		printHelper.endElement(Tag.A);

		printHelper.endElement(Tag.DIV);

		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.CLASS, "box_content");
		printHelper.closeElement();

		this.printBody();

		boolean showAccept = (acceptLabel != null && acceptLabel.length() != 0)
				|| (onAccept != null && onAccept.length() != 0);
		boolean showCancel = (cancelLabel != null && cancelLabel.length() != 0)
				|| (onCancel != null && onCancel.length() != 0);
		if (showAccept) {
			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.CLASS, "form_b");
			if (buttonAlign == null)
				printHelper.attribute(Attr.STYLE, "text-align:right;");
			else if (buttonAlign.equals("left"))
				printHelper.attribute(Attr.STYLE, "text-align:left;");
			else if (buttonAlign.equals("center"))
				printHelper.attribute(Attr.STYLE, "text-align:center;");
			else
				printHelper.attribute(Attr.STYLE, "text-align:right;");
			printHelper.closeElement();

			printHelper.startElement(Tag.BUTTON);
			printHelper.attribute(Attr.TYPE, "button");
			if (acceptLabel != null && acceptLabel.length() <= 2)
				printHelper.attribute(Attr.STYLE, "width:40px;");
			if (onAccept != null && onAccept.length() != 0)
				printHelper.attribute(Attr.ONCLICK, "PP.vfui.dialog.accept('"
						+ id + "'," + onAccept + ");");
			else
				printHelper.attribute(Attr.ONCLICK, "PP.vfui.dialog.accept('"
						+ id + "');");
			printHelper.closeElement();
			if (acceptLabel == null)
				printHelper.text("???");
			else
				printHelper.text(acceptLabel);
			printHelper.endElement(Tag.BUTTON);

			printHelper.startElement(Tag.BUTTON);
			printHelper.attribute(Attr.TYPE, "button");
			if (cancelLabel != null && cancelLabel.length() <= 2)
				printHelper.attribute(Attr.STYLE, "width:40px;");
			if (onCancel != null && onCancel.length() != 0)
				printHelper.attribute(Attr.ONCLICK, "PP.vfui.dialog.cancel('"
						+ id + "'," + onCancel + ");");
			else
				printHelper.attribute(Attr.ONCLICK, "PP.vfui.dialog.cancel('"
						+ id + "');");
			printHelper.closeElement();
			if (cancelLabel == null)
				printHelper.text("取消");
			else
				printHelper.text(cancelLabel);
			printHelper.endElement(Tag.BUTTON);

			printHelper.endElement(Tag.DIV);
		}
		else {
			if (showCancel) {
				printHelper.startElement(Tag.BUTTON);
				printHelper.attribute(Attr.TYPE, "button");
				if (cancelLabel != null && cancelLabel.length() <= 2)
					printHelper.attribute(Attr.STYLE, "width:40px;");
				if (onCancel != null && onCancel.length() != 0)
					printHelper.attribute(Attr.ONCLICK,
							"PP.vfui.dialog.cancel('" + id + "'," + onCancel
									+ ");");
				else
					printHelper.attribute(Attr.ONCLICK,
							"PP.vfui.dialog.cancel('" + id + "');");
				printHelper.closeElement();
				if (cancelLabel == null)
					printHelper.text("取消");
				else
					printHelper.text(cancelLabel);
				printHelper.endElement(Tag.BUTTON);
			}
		}
		printHelper.endElement(Tag.DIV);
		printHelper.endElement(Tag.DIV);

		printHelper
				.script("new PP.vfui.dialog.Endrag('" + id + "_title" + "','"
						+ id + "',-" + (width / 2) + ",-" + (height / 2) + ");"/* +
				"var cfg = {x0: 0, y0: 0, x1: 0, y1: 0, moveable: false, offSetX: 0, offSetY: 0};" + 
				"var dTitle = document.getElementById('" + id + "_title');" + 
				"PP.vfui.js.dialog.tccReg(dTitle, cfg);"*/);

		flushTag();
	}
}

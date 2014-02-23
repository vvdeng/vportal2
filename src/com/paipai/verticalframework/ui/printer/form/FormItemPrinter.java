/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??FormItemPrinter.java
 * 
 * Description??????????????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 8, 2010		????
 */
package com.paipai.verticalframework.ui.printer.form;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;
import com.paipai.verticalframework.ui.tag.form.ColumnWidth;

/**
 * ????????????
 * 
 * @author sunniyang
 * @version 1.0
 */
public class FormItemPrinter extends DefaultXhtmlPrinter {

	public FormItemPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public int printFormItem(int columns, ColumnWidth[] columnWidth,
			int currCol, int lWidth, String id, String name, int span,
			String label, int labelWidth) {
		if (span == 0)
			return currCol;
		if (currCol + span > columns || currCol == 0) {
			// ????????У???????????FormItem????????????????
			// ??????????????????????????
			if (currCol != 0)
				printHelper.endElement(Tag.UL);

			printHelper.startElement(Tag.UL);
			printHelper.attribute(Attr.CLASS, "fluid_" + columns);
			printHelper.closeElement();

			this.printItem(columns, columnWidth, 0, lWidth, id, name, span,
					label, labelWidth);
			// ????????У???????
			if (span % columns == 0) {
				printHelper.endElement(Tag.UL);
			}

			flushTag();
			return span % columns;
		} else {
			// ???????????????FormItem
			this.printItem(columns, columnWidth, currCol, lWidth, id, name,
					span, label, labelWidth);
			// ????????У???????
			if ((currCol + span) % columns == 0) {
				printHelper.endElement(Tag.UL);
			}

			flushTag();
			return (currCol + span) % columns;
		}
	}

	private void printItem(int columns, ColumnWidth[] columnWidth, int currCol,
			int lWidth, String id, String name, int span, String label,
			int labelWidth) {
		printHelper.startElement(Tag.LI);
		printHelper.attribute(Attr.CLASS, "column");
		// printHelper.attribute(Attr.STYLE, "width:" + 96 / columns * span +
		// "%;");
		int width = 0;
		for (int i = currCol; i < span + currCol; i++) {
			width += columnWidth[i].getWidth();
		}
		printHelper.attribute(Attr.STYLE, "width:" + width
				+ columnWidth[0].getSuffix() + ";");
		printHelper.closeElement();

		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.CLASS, "form_t");
		printHelper.closeElement();
		if (labelWidth >= 0) {
			printHelper.startElement(Tag.LABEL);
			printHelper.attribute(Attr.ID, id);
			printHelper.attribute(Attr.NAME, name);
			printHelper.attribute(Attr.CLASS, "label");
			printHelper.attribute(Attr.STYLE, "width:"
					+ (labelWidth != 0 ? labelWidth : (lWidth != 0 ? lWidth
							: 100)) + "px;");
			printHelper.closeElement();
			printHelper.text((label == null || label.length() == 0) ? ""
					: label);

			printHelper.endElement(Tag.LABEL);
		}

		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.STYLE, "height:21px;vertical-align:middle;");
		printHelper.closeElement();

		this.printBody();

		printHelper.endElement(Tag.SPAN);

		printHelper.endElement(Tag.DIV);

		printHelper.endElement(Tag.LI);
	}
}

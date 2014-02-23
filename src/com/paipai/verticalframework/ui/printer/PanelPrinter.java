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

public class PanelPrinter extends DefaultXhtmlPrinter {
	private static final String TABLE_PANEL_TYPE = "tablePanel";
	private static final String TABLE_PADDING = "0px";
	private static final String FORM_PADDING_TOP = "10px";
	private static final String FORM_PADDING_BOTTOM = "0px";
	private static final String FORM_PADDING_LEFT = "0px";
	private static final String FORM_PADDING_RIGHT = "0px";

	public PanelPrinter(JspFragment jspFragment, JspContext jspContext,
			JspTag parentTag) {
		super(jspFragment, jspContext, parentTag);
	}

	public void printPanel(String id, String title, String width,
			String height, boolean collapsible, String type, String contentTop,
			String contentBottom, String contentLeft, String contentRight,
			String layoutWidth, boolean fixed, String top, String left,
			boolean scrollX, boolean scrollY, String align, String display,
			String padding, String margin, boolean clear) throws IOException {
		if (parentTag != null && LayoutTag.class.equals(parentTag.getClass())) {
			((LayoutTag) parentTag).addChildrenNum();
			printHelper.startElement(Tag.LI);
			printHelper.attribute(Attr.CLASS, "column");
			if (layoutWidth != null && layoutWidth.trim().length() > 0) {
				printHelper.attribute(Attr.STYLE, "width:" + layoutWidth + ";");
			}
		}
		if ("buttonPanel".equals(type)) {
			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.ID, id);
			String style = "border-width:0px ! important;";
			if (width != null && width.trim().length() > 0) {
				style += "width:" + width + ";";
			}
			if (fixed) {
				style += "position:fixed !important;";
			}
			if (top != null && top.trim().length() > 0) {
				style += "top:" + top + ";";

			}

			if (left != null && left.trim().length() > 0) {
				style += "left:" + left + ";";

			}
			if (display != null && display.trim().length() > 0) {
				style += "display:" + display + ";";

			}
			if (margin != null && margin.trim().length() > 0) {
				style += "margin:" + margin + ";";
			}
			printHelper.attribute(Attr.STYLE, style);
			printHelper.startElement(Tag.DIV);
			style = "";
			if (align != null && align.trim().length() > 0) {
				style += "text-align:" + align + ";";

			}
			if (height != null && height.trim().length() > 0) {
				style += "height:" + height + ";";

			}
			if (scrollY == true) {
				style += "overflow-y: scroll;";
			}
			if (scrollX == true) {
				style += "overflow-x: scroll;";
			}
			
			if (padding != null && padding.trim().length() > 0) {
				style += "padding:" + padding + ";";
			}
			if (style.trim().length() > 0) {
				printHelper.attribute(Attr.STYLE, style);
			}

		} else if ("simple".equals(type)) {
			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.ID, id);
			printHelper.attribute(Attr.CLASS, "module_box_normal widget_life");
			String style = "border-width:0px ! important;";
			if (width != null && width.trim().length() > 0) {
				style += "width:" + width + ";";
			}
			if (fixed) {
				style += "position:fixed !important;";
			}
			if (top != null && top.trim().length() > 0) {
				style += "top:" + top + ";";

			}

			if (left != null && left.trim().length() > 0) {
				style += "left:" + left + ";";

			}
			if (display != null && display.trim().length() > 0) {
				style += "display:" + display + ";";

			}
			if (margin != null && margin.trim().length() > 0) {
				style += "margin:" + margin + ";";
			}
			printHelper.attribute(Attr.STYLE, style);
			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.CLASS, "box_content");
			printHelper.attribute(Attr.ID,id+"_content");
			style = "";
			if (align != null && align.trim().length() > 0) {
				style += "text-align:" + align + ";";

			}
			if (height != null && height.trim().length() > 0) {
				style += "height:" + height + ";";

			}
			if (scrollY == true) {
				style += "overflow-y: scroll;";
			}
			if (scrollX == true) {
				style += "overflow-x: scroll;";
			}
			if (contentTop != null && contentTop.trim().length() > 0) {
				style += "padding-top:" + contentTop + ";";
			} else {
				style += "padding-top: 0px;";
			}
			if (contentBottom != null && contentBottom.trim().length() > 0) {
				style += "padding-bottom:" + contentBottom + ";";
			} else {
				style += "padding-bottom: 0px;";
			}
			if (contentLeft != null && contentLeft.trim().length() > 0) {
				style += "padding-left:" + contentLeft + ";";
			} else {
				style += "padding-left: 0px;";
			}
			if (contentRight != null && contentRight.trim().length() > 0) {
				style += "padding-right:" + contentRight + ";";
			} else {
				style += "padding-right: 0px;";
			}
			if (padding != null && padding.trim().length() > 0) {
				style += "padding:" + padding + ";";
			}
			if (style.trim().length() > 0) {
				printHelper.attribute(Attr.STYLE, style);
			}

		} else if ("cell".equals(type)) {
			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.ID, id);
			printHelper.attribute(Attr.CLASS, "module_box_normal widget_life");
			String style = "float:left;clear:none !important;";
			if (width != null && width.trim().length() > 0) {
				style += "width:" + width + ";";
			}
			if (fixed) {
				style += "position:fixed !important;";
			}
			if (top != null && top.trim().length() > 0) {
				style += "margin-top:" + top + ";";

			}

			if (left != null && left.trim().length() > 0) {
				style += "margin-left:" + left + ";";

			}
			if (display != null && display.trim().length() > 0) {
				style += "display:" + display + ";";

			}
			if (margin != null && margin.trim().length() > 0) {
				style += "margin:" + margin + ";";
			}
			if (style.trim().length() > 0) {
				printHelper.attribute(Attr.STYLE, style);
			}

			if (title != null && title.trim().length() != 0) {
				printHelper.startElement(Tag.DIV);
				printHelper.attribute(Attr.CLASS, "box_title");
				printHelper.startElement(Tag.H4);
				printHelper.text(title);
				printHelper.endElement(Tag.H4);

				if (collapsible == true) {
					printHelper.startElement(Tag.A);
					printHelper.attribute(Attr.HREF, "#nogo");
					printHelper.attribute(Attr.CLASS,
							"bt_close widget_bt_close");
					printHelper.attribute(Attr.STYLE, "position:static;");
					printHelper.attribute(Attr.TAG, "collapsible_panel");
					printHelper.attribute(Attr.ONCLICK,
							"PP.vfui.tag.panelCollaps(this);");
					printHelper.text("");
					printHelper.endElement(Tag.A);
				}
				printHelper.endElement(Tag.DIV);
			}
			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.CLASS, "box_content");
			printHelper.attribute(Attr.ID,id+"_content");
			style = "";
			if (align != null && align.trim().length() > 0) {
				style += "text-align:" + align + ";";

			}
			if (height != null && height.trim().length() > 0) {
				style += "height:" + height + ";";

			}
			if (scrollY == true) {
				style += "overflow-y: scroll;";
			}
			if (scrollX == true) {
				style += "overflow-x: scroll;";
			}
			if (contentTop != null && contentTop.trim().length() > 0) {
				style += "padding-top:" + contentTop + ";";
			} else if (TABLE_PANEL_TYPE.equals(type)) {
				style += "padding-top:" + TABLE_PADDING + ";";
			} else if ("formPanel".equals(type)) {
				style += "padding-top:" + FORM_PADDING_TOP + ";";
			}

			if (contentBottom != null && contentBottom.trim().length() > 0) {
				style += "padding-bottom:" + contentBottom + ";";
			} else if (TABLE_PANEL_TYPE.equals(type)) {
				style += "padding-bottom:" + TABLE_PADDING + ";";
			} else if ("formPanel".equals(type)) {
				style += "padding-bottom:" + FORM_PADDING_BOTTOM + ";";
			}
			if (contentLeft != null && contentLeft.trim().length() > 0) {
				style += "padding-left:" + contentLeft + ";";
			} else if (TABLE_PANEL_TYPE.equals(type)) {
				style += "padding-left:" + TABLE_PADDING + ";";
			} else if ("formPanel".equals(type)) {
				style += "padding-left:" + FORM_PADDING_LEFT + ";";
			}
			if (contentRight != null && contentRight.trim().length() > 0) {
				style += "padding-right:" + contentRight + ";";
			} else if (TABLE_PANEL_TYPE.equals(type)) {
				style += "padding-right:" + TABLE_PADDING + ";";
			} else if ("formPanel".equals(type)) {
				style += "padding-right:" + FORM_PADDING_RIGHT + ";";
			}
			if (padding != null && padding.trim().length() > 0) {
				style += "padding:" + padding + ";";
			}
			if (style.trim().length() > 0) {
				printHelper.attribute(Attr.STYLE, style);
			}
		} else {
			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.ID, id);
			printHelper.attribute(Attr.CLASS, "module_box_normal widget_life");
			String style = "";
			if (width != null && width.trim().length() > 0) {
				style += "width:" + width + ";";
			}
			if (fixed) {
				style += "position:fixed !important;";
			}
			if (top != null && top.trim().length() > 0) {
				style += "top:" + top + ";";

			}

			if (left != null && left.trim().length() > 0) {
				style += "left:" + left + ";";

			}
			if (display != null && display.trim().length() > 0) {
				style += "display:" + display + ";";

			}
			if (margin != null && margin.trim().length() > 0) {
				style += "margin:" + margin + ";";
			}
			if (style.trim().length() > 0) {
				printHelper.attribute(Attr.STYLE, style);
			}

			if (title != null && title.trim().length() != 0) {
				printHelper.startElement(Tag.DIV);
				printHelper.attribute(Attr.CLASS, "box_title");
				printHelper.startElement(Tag.H4);
				printHelper.text(title);
				printHelper.endElement(Tag.H4);

				if (collapsible == true) {
					printHelper.startElement(Tag.A);
					printHelper.attribute(Attr.HREF, "#nogo");
					printHelper.attribute(Attr.CLASS,
							"bt_close widget_bt_close");
					printHelper.attribute(Attr.STYLE, "position:static;");
					printHelper.attribute(Attr.TAG, "collapsible_panel");
					printHelper.attribute(Attr.ONCLICK,
							"PP.vfui.tag.panelCollaps(this);");
					printHelper.text("");
					printHelper.endElement(Tag.A);
				}
				printHelper.endElement(Tag.DIV);
			}
			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.CLASS, "box_content");
			printHelper.attribute(Attr.ID,id+"_content");
			style = "";
			if (align != null && align.trim().length() > 0) {
				style += "text-align:" + align + ";";

			}
			if (height != null && height.trim().length() > 0) {
				style += "height:" + height + ";";

			}
			if (scrollY == true) {
				style += "overflow-y: scroll;";
			}
			if (scrollX == true) {
				style += "overflow-x: scroll;";
			}
			if (contentTop != null && contentTop.trim().length() > 0) {
				style += "padding-top:" + contentTop + ";";
			} else if (TABLE_PANEL_TYPE.equals(type)) {
				style += "padding-top:" + TABLE_PADDING + ";";
			} else if ("formPanel".equals(type)) {
				style += "padding-top:" + FORM_PADDING_TOP + ";";
			}

			if (contentBottom != null && contentBottom.trim().length() > 0) {
				style += "padding-bottom:" + contentBottom + ";";
			} else if (TABLE_PANEL_TYPE.equals(type)) {
				style += "padding-bottom:" + TABLE_PADDING + ";";
			} else if ("formPanel".equals(type)) {
				style += "padding-bottom:" + FORM_PADDING_BOTTOM + ";";
			}
			if (contentLeft != null && contentLeft.trim().length() > 0) {
				style += "padding-left:" + contentLeft + ";";
			} else if (TABLE_PANEL_TYPE.equals(type)) {
				style += "padding-left:" + TABLE_PADDING + ";";
			} else if ("formPanel".equals(type)) {
				style += "padding-left:" + FORM_PADDING_LEFT + ";";
			}
			if (contentRight != null && contentRight.trim().length() > 0) {
				style += "padding-right:" + contentRight + ";";
			} else if (TABLE_PANEL_TYPE.equals(type)) {
				style += "padding-right:" + TABLE_PADDING + ";";
			} else if ("formPanel".equals(type)) {
				style += "padding-right:" + FORM_PADDING_RIGHT + ";";
			}
			if (padding != null && padding.trim().length() > 0) {
				style += "padding:" + padding + ";";
			}
			if (style.trim().length() > 0) {
				printHelper.attribute(Attr.STYLE, style);
			}
		}

		printBody();
		if (clear == true) {
			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.STYLE, "clear:both;");
			printHelper.endElement(Tag.DIV);
		}
		printHelper.endElement(Tag.DIV);
		printHelper.endElement(Tag.DIV);

		if (parentTag != null && LayoutTag.class.equals(parentTag.getClass())) {
			printHelper.endElement(Tag.LI);
		}
		flushTag();

	}
}

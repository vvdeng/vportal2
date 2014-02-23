/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CalendarPrinter.java
 * 
 * Description??
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		bevisdeng		2010-10-22			????
 */
package com.paipai.verticalframework.ui.component.printer;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

public class CalendarPrinter extends DefaultXhtmlPrinter {
	public static final String DEFAULT_FORMAT = "%y-%m-%d";
	private static SimpleDateFormat sdf = new SimpleDateFormat();

	public CalendarPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	/**
	 * ?????????????????????????
	 * 
	 * @param id :
	 *            ????????id
	 * @param name
	 *            :??????????? ???????????????????????
	 * @return format java??????
	 */
	public void printCalendar(String id, String name, String format,
			Object value, boolean readonly) {
		printHelper.startElement(Tag.INPUT);
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.TYPE, "text");
		printHelper.attribute(Attr.NAME, name);
		if (value == null) {
			value = new Date();
		}
		if (value instanceof String) {
			printHelper.attribute(Attr.VALUE, value.toString());
		} else if (value instanceof Date) {
			if (format == null || format.trim().length() == 0) {
				format = "yyyy-MM-dd";
			}
			sdf.applyPattern(format);
			printHelper.attribute(Attr.VALUE, sdf.format(value));
		}
		if (readonly) {
			printHelper.attribute(Attr.READONLY);
		}
		printHelper.endElement(Tag.INPUT);
		// ????PP.vfui.calendar()???????????????;
		printHelper
				.script("var sopt={input: '#"
						+ id
						+ "',action:'#"
						+ id
						+ "',useDeltaYear:true,format:'"
						+ transformFormat(format)
						+ "',time:"
						+ useTime(format)
						+ ",zeroHour:true,deltaYear:1};PP.vfui.component.calendar(sopt);");

		flushTag();
	}

	/**
	 * ??java??????????calendar??Js??????
	 * 
	 * @param javaFormat
	 *            :java??????
	 * @return calendar??????????????
	 */
	private static String transformFormat(String javaFormat) {
		if (javaFormat == null || javaFormat.trim().length() == 0) {
			return DEFAULT_FORMAT;
		}
		return javaFormat.replaceAll("[sSz]", "").replace("yyyy", "%y")
				.replace("yy", "%y").replace("MM", "%m").replace("dd", "%d")
				.replace("HH", "%h").replace("mm", "%M");
	}

	private static boolean useTime(String javaFormat) {
		return (javaFormat != null && (javaFormat.contains("HH") || javaFormat
				.contains("mm")));
	}
}

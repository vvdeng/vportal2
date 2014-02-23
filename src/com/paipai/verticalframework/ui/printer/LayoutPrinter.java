/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName：ButtionPrinter.java					
 *			
 * Description：简要描述本文件的内容							 												
 * History：
 * 版本号    作者           日期          简要介绍相关操作
 *  1.0   bevisdeng        2010-10-22           Create	
 */

package com.paipai.verticalframework.ui.printer;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.tag.LayoutTag;

/**
 * 描述
 * 
 * @author bevisdeng（最新修改者）
 * @version 1.0（新版本号）
 * @see 参考的JavaDoc
 */

public class LayoutPrinter extends DefaultXhtmlPrinter {
	public static Pattern hChildrenClassPattern = Pattern.compile("column");
	public static Pattern fluidPlaceholderPattern = Pattern
			.compile("fluidPlaceholder");
	private LayoutTag layoutTag;
	public LayoutPrinter(LayoutTag layoutTag,JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
		this.layoutTag=layoutTag;
	}

	public void printLayout(String id, String direction) throws IOException {
		if ("h".equals(direction)) {
			int childrenNum = 0;
			printHelper.startElement(Tag.UL);
			printHelper.attribute(Attr.ID, id);
			printHelper.attribute(Attr.CLASS, "fluidPlaceholder");
			printBody();
			Matcher hChildrenClassMatcher = hChildrenClassPattern
					.matcher(printHelper.getBuffer());
//			while (hChildrenClassMatcher.find()) {
//				childrenNum++;
//			}
			childrenNum=layoutTag.getChildrenNum();
			Matcher fluidPlaceholderMatcher = fluidPlaceholderPattern
					.matcher(printHelper.getBuffer());
			if (childrenNum == 0 || childrenNum == 1) {
				System.out.print(fluidPlaceholderMatcher.replaceFirst("fluid_1"));
			} else if (childrenNum == 2) {
				if (fluidPlaceholderMatcher.find()) {
					String newBuffer=fluidPlaceholderMatcher
					.replaceFirst("fluid_2");
					printHelper.getBuffer().delete(0, printHelper.getBuffer().length()).append(newBuffer);
				}
			} else if (childrenNum == 3) {
				if (fluidPlaceholderMatcher.find()) {
					String newBuffer=fluidPlaceholderMatcher
					.replaceFirst("fluid_3");
					printHelper.getBuffer().delete(0, printHelper.getBuffer().length()).append(newBuffer);
				}
			}

			else {
				throw new RuntimeException("水平布局的子面板数必须小于等于3");
			}
			printHelper.endElement(Tag.UL);
		} else {
			printHelper.startElement(Tag.DIV);
			printHelper.attribute(Attr.ID, id);
			printBody();
			printHelper.endElement(Tag.DIV);
		}

		flushTag();

	}

}

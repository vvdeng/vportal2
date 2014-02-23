/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName：PagePrinter.java
 * 
 * Description：<简要描述本文件的内容>
 * History：
 * 版本号		作者				日期			简要介绍相关操作
 * 1.0		carldong		2010-11-19			创建
 */
package com.paipai.verticalframework.ui.component.tag.table;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/**
 * <类描述>
 * 
 * @author carldong（最新修改者）
 * @version 1.0（新版本号）
 * @see 参考的JavaDoc
 */
public class PagePrinter extends DefaultXhtmlPrinter {

	public PagePrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printPage(int count, int pageSize, int curPage, String callback) {
		int lastPage = (count % pageSize == 0) ? count / pageSize
				: (count / pageSize) + 1;

		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.CLASS, "page_wrap");
		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.CLASS, "paginator");

		if (curPage > 1) {
			printHelper.startElement(Tag.A);
			printHelper.attribute(Attr.CLASS, "page-start");
			printHelper.attribute(Attr.HREF, "javascript:" + callback + "(1)");
			printHelper.text("首页");
			printHelper.endElement(Tag.A);

			printHelper.startElement(Tag.A);
			printHelper.attribute(Attr.CLASS, "page-prev");
			printHelper.attribute(Attr.HREF, "javascript:" + callback + "("
					+ (curPage - 1) + ")");
			printHelper.text("上一页");
			printHelper.endElement(Tag.A);

		} else {
			printHelper.startElement(Tag.SPAN);
			printHelper.attribute(Attr.CLASS, "page-start");
			printHelper.text("首页");
			printHelper.endElement(Tag.SPAN);

			printHelper.startElement(Tag.SPAN);
			printHelper.attribute(Attr.CLASS, "page-start");
			printHelper.text("上一页");
			printHelper.endElement(Tag.SPAN);
		}
		if (lastPage <= 5) {
			for (int i = 1; i <= lastPage; i++) {
				if (curPage == i) {
					printHelper.startElement(Tag.SPAN);
					printHelper.attribute(Attr.CLASS, "page-this");
					printHelper.text(i);
					printHelper.endElement(Tag.SPAN);
				} else {
					printHelper.startElement(Tag.A);
					printHelper.attribute(Attr.CLASS, "page-this");
					printHelper.attribute(Attr.HREF, "javascript:" + callback
							+ "(" + i + ")");
					printHelper.text(i);
					printHelper.endElement(Tag.A);
				}
			}
		} else {
			if (curPage < 3) {
				for (int i = 1; i <= 5; i++) {
					if (curPage == i) {
						printHelper.startElement(Tag.SPAN);
						printHelper.attribute(Attr.CLASS, "page-this");
						printHelper.text(i);
						printHelper.endElement(Tag.SPAN);
					} else {
						printHelper.startElement(Tag.A);
						printHelper.attribute(Attr.CLASS, "page-this");
						printHelper.attribute(Attr.HREF, "javascript:"
								+ callback + "(" + i + ")");
						printHelper.text(i);
						printHelper.endElement(Tag.A);
					}
				}
			} else {
				if (curPage > lastPage - 3) {
					for (int i = lastPage - 4; i <= lastPage; i++) {
						if (curPage == i) {
							printHelper.startElement(Tag.SPAN);
							printHelper.attribute(Attr.CLASS, "page-this");
							printHelper.text(i);
							printHelper.endElement(Tag.SPAN);
						} else {
							printHelper.startElement(Tag.A);
							printHelper.attribute(Attr.CLASS, "page-this");
							printHelper.attribute(Attr.HREF, "javascript:"
									+ callback + "(" + i + ")");
							printHelper.text(i);
							printHelper.endElement(Tag.A);
						}
					}
				} else {
					for (int i = curPage - 2; i <= curPage + 2; i++) {
						if (curPage == i) {
							printHelper.startElement(Tag.SPAN);
							printHelper.attribute(Attr.CLASS, "page-this");
							printHelper.text(i);
							printHelper.endElement(Tag.SPAN);
						} else {
							printHelper.startElement(Tag.A);
							printHelper.attribute(Attr.CLASS, "page-this");
							printHelper.attribute(Attr.HREF, "javascript:"
									+ callback + "(" + i + ")");
							printHelper.text(i);
							printHelper.endElement(Tag.A);
						}
					}
				}
			}
		}
		if (curPage < lastPage) {
			printHelper.startElement(Tag.A);
			printHelper.attribute(Attr.CLASS, "page-next");
			printHelper.attribute(Attr.HREF, "javascript:" + callback + "("
					+ curPage + 1 + ")");
			printHelper.text("下一页");
			printHelper.endElement(Tag.A);

			printHelper.startElement(Tag.A);
			printHelper.attribute(Attr.CLASS, "page-next");
			printHelper.attribute(Attr.HREF, "javascript:" + callback + "("
					+ lastPage + ")");
			printHelper.text("尾页");
			printHelper.endElement(Tag.A);
		} else {
			printHelper.startElement(Tag.SPAN);
			printHelper.attribute(Attr.CLASS, "page-end");
			printHelper.text("下一页");
			printHelper.endElement(Tag.SPAN);

			printHelper.startElement(Tag.SPAN);
			printHelper.attribute(Attr.CLASS, "page-end");
			printHelper.text("尾页");
			printHelper.endElement(Tag.SPAN);

		}
		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.CLASS, "page-skip");
		printHelper.text("共" + count + "条 第" + curPage + " / " + lastPage
				+ " 页 到第");
		printHelper.startElement(Tag.INPUT);
		printHelper.attribute(Attr.ID, "PageJumpText");
		printHelper.attribute(Attr.TYPE, "text");
		printHelper.text("页");

		printHelper.startElement(Tag.BUTTON);
		printHelper.attribute(Attr.VALUE, "go");
		printHelper.attribute(Attr.ONCLICK, callback
				+ "(document.all.PageJumpText.value);");
		printHelper.text("确定");
		printHelper.endElement(Tag.BUTTON);
		printHelper.endElement(Tag.SPAN);
		printHelper.endElement(Tag.DIV);
		printHelper.endElement(Tag.DIV);

		flushTag();
	}

}

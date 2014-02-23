/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??RowTag.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		carldong		2010-11-19			????
 */
package com.paipai.verticalframework.ui.component.tag.table;

import javax.servlet.jsp.tagext.TagSupport;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.util.PrintHelper;

/**
 * <??????>
 * 
 * @author carldong????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
@SuppressWarnings("serial")
public class RowTag extends PaiPaiBodyTagSupport {

	private String className;

	public int doStartTag() {
		PrintHelper printHelper = new PrintHelper();
		TableTag tableTag = (TableTag) TagSupport.findAncestorWithClass(this,
				TableTag.class);
		if (tableTag.isDataNull() && !tableTag.isShowTitle()) {
			return EVAL_BODY_INCLUDE;
		}

		if (tableTag.getCurrentBean() == null) {
			printHelper.startElement(Tag.THEAD);
			printHelper.text("");
		}

		printHelper.startElement(Tag.TR);
		printHelper.attribute(Attr.CLASS, className);
		printHelper.text("");
		flushTag(printHelper.getBuffer());

		return EVAL_BODY_INCLUDE;
	}

	public int doEndTag() {
		try {
			TableTag tableTag = (TableTag) TagSupport.findAncestorWithClass(
					this, TableTag.class);
			
			if (tableTag.isDataNull() && !tableTag.isShowTitle()) {
				return EVAL_PAGE;
			}

			PrintHelper printHelper = new PrintHelper();
			printHelper.endElement(Tag.TR);

			if (tableTag.getCurrentBean() == null) {
				printHelper.endElement(Tag.THEAD);
			}

			flushTag(printHelper.getBuffer());

			if (bodyContent != null)
				bodyContent.writeOut(bodyContent.getEnclosingWriter());

		}
		catch (Exception e) {
			e.printStackTrace();
		}

		return EVAL_PAGE;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

}

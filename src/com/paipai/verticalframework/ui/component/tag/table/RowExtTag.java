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
public class RowExtTag extends PaiPaiBodyTagSupport {

	private String id;
	private String className;
	private String style;

	public int doStartTag() {
		TableTag tableTag = (TableTag) TagSupport.findAncestorWithClass(this,
				TableTag.class);

		if (tableTag.getCurrentBean() == null) {
			return SKIP_BODY;
		}
		PrintHelper printHelper = new PrintHelper();
		printHelper.startElement(Tag.TR);
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.CLASS, className);
		printHelper.attribute(Attr.STYLE, style);
		printHelper.text("");
		printHelper.startElement(Tag.TD);
		if (tableTag.getColumnCount() > 0) {
			printHelper.attribute(Attr.COLSPAN, String.valueOf(tableTag
					.getColumnCount()));
		}
		printHelper.text("");
		flushTag(printHelper.getBuffer());
		return EVAL_BODY_INCLUDE;
	}

	public int doEndTag() {
		try {
			PrintHelper printHelper = new PrintHelper();
			printHelper.endElement(Tag.TD);
			printHelper.endElement(Tag.TR);
			flushTag(printHelper.getBuffer());

			if (bodyContent != null)
				bodyContent.writeOut(bodyContent.getEnclosingWriter());

		}
		catch (Exception e) {
			e.printStackTrace();
		}

		return EVAL_PAGE;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public void setId(String id) {
		this.id = id;
	}
}

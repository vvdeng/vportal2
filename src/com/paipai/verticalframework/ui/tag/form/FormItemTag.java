/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??FormItemTag.java
 * 
 * Description??form??? ui?????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 8, 2010		????
 */
package com.paipai.verticalframework.ui.tag.form;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspTag;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.printer.form.FormItemPrinter;

/**
 * ????tag
 * 
 * @author sunniyang
 * @version 1.0
 */
public class FormItemTag extends SimpleTagSupport {

	/**
	 * ????????????????formItem id
	 */
	private static Integer idStep = 2012;
	/**
	 * id???????????????????formItemTag+idStep
	 */
	private String id = "formItemTag" + (idStep++);
	/**
	 * ???
	 */
	private String name = null;
	/**
	 * form???????п?
	 */
	private int span = 1;
	/**
	 * form???label
	 */
	private String label = null;
	/**
	 * label?????????????form??labelWidth
	 */
	private int labelWidth = 0;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getSpan() {
		return span;
	}

	public void setSpan(int span) {
		this.span = span;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public int getLabelWidth() {
		return labelWidth;
	}

	public void setLabelWidth(int labelWidth) {
		this.labelWidth = labelWidth;
	}

	@Override
	public void doTag() throws JspException, IOException {
		FormItemPrinter printer = new FormItemPrinter(super.getJspBody(), super.getJspContext());

		JspTag pTag = this.getParent();
		if (!pTag.getClass().getName().equals(FormTag.class.getName()))
			throw new JspException("formItem tag must be wraped by form tag");
		FormTag parent = (FormTag) pTag;
		if (span > parent.getColumns())
			throw new JspException("column span can not be bigger than columns");
		int currCol = printer.printFormItem(parent.getColumns(), parent.getParsedWidth(), 
				parent.getCurrCol(), parent.getLabelWidth(), id, name, span, label, labelWidth);
		parent.setCurrCol(currCol);
	}
}

/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??DialogTag.java
 * 
 * Description??????? ui?????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 8, 2010		????
 */
package com.paipai.verticalframework.ui.tag.dialog;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.printer.dialog.DialogPrinter;

/**
 * ?????tag
 * 
 * @author sunniyang
 * @version 1.0
 */
public class DialogTag extends SimpleTagSupport {

	private static final long serialVersionUID = 1L;
	/**
	 * id
	 */
	private String id;
	/**
	 * ???
	 */
	private String name;
	/**
	 * ???
	 */
	private int width;
	/**
	 * ???
	 */
	private int height;
	/**
	 * ????
	 */
	private String title;
	/**
	 * ??????λ???left/center/right?????center
	 */
	private String buttonAlign;
	/**
	 * ????????????????????????????
	 */
	private String acceptLabel;
	/**
	 * ???????????????
	 */
	private String onAccept;
	/**
	 * ??????????????????????
	 */
	private String cancelLabel;
	/**
	 * ???????????
	 */
	private String onCancel;
	/**
	 * ??????
	 */
	private boolean scrollX;
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

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getButtonAlign() {
		return buttonAlign;
	}

	public void setButtonAlign(String buttonAlign) {
		this.buttonAlign = buttonAlign;
	}

	public String getAcceptLabel() {
		return acceptLabel;
	}

	public void setAcceptLabel(String acceptLabel) {
		this.acceptLabel = acceptLabel;
	}

	public String getOnAccept() {
		return onAccept;
	}

	public void setOnAccept(String onAccept) {
		this.onAccept = onAccept;
	}

	public String getCancelLabel() {
		return cancelLabel;
	}

	public void setCancelLabel(String cancelLabel) {
		this.cancelLabel = cancelLabel;
	}

	public String getOnCancel() {
		return onCancel;
	}

	public void setOnCancel(String onCancel) {
		this.onCancel = onCancel;
	}

	@Override
	public void doTag() throws JspException, IOException {
		DialogPrinter printer = new DialogPrinter(super.getJspBody(), super
				.getJspContext());
		printer.printDialog(id, name, width, height, title, buttonAlign,
				acceptLabel, onAccept, cancelLabel, onCancel,scrollX);
	}

	
	public boolean isScrollX() {
		return scrollX;
	}

	
	public void setScrollX(boolean scrollX) {
		this.scrollX = scrollX;
	}
}

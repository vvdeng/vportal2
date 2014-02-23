/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??ButtonTag.java					
 *			
 * Description??????????????????							 												
 * History??
 * ?汾??    ????           ????          ?????????????
 *  1.0   bevisdeng        2010-10-22           Create	
 */

package com.paipai.verticalframework.ui.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.printer.PanelPrinter;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο?JavaDoc
 */

public class PanelTag extends SimpleTagSupport {
	private String id;
	private String title;
	private String width;
	private String height;
	private boolean collapsible;
	private String type;//simple;normal;cell
	private String contentTop;
	private String contentBottom;
	private String contentLeft;
	private String contentRight;
	private String layoutWidth;
	private boolean fixed;
	private String top;
	private String left;
	private boolean scrollX;
	private boolean scrollY;
	private String align;
	private String display;
	private String padding;
	private String margin;
	private boolean clear;
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public boolean isCollapsible() {
		return collapsible;
	}

	public void setCollapsible(boolean collapsible) {
		this.collapsible = collapsible;
	}
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	public String getContentTop() {
		return contentTop;
	}

	public void setContentTop(String contentTop) {
		this.contentTop = contentTop;
	}

	public String getContentBottom() {
		return contentBottom;
	}

	public void setContentBottom(String contentBottom) {
		this.contentBottom = contentBottom;
	}

	public String getContentLeft() {
		return contentLeft;
	}

	public void setContentLeft(String contentLeft) {
		this.contentLeft = contentLeft;
	}

	public String getContentRight() {
		return contentRight;
	}

	public void setContentRight(String contentRight) {
		this.contentRight = contentRight;
	}

	public String getLayoutWidth() {
		return layoutWidth;
	}

	public void setLayoutWidth(String layoutWidth) {
		this.layoutWidth = layoutWidth;
	}

	
	public boolean isFixed() {
		return fixed;
	}

	public void setFixed(boolean fixed) {
		this.fixed = fixed;
	}

	public String getTop() {
		return top;
	}

	public void setTop(String top) {
		this.top = top;
	}

	public String getLeft() {
		return left;
	}

	public void setLeft(String left) {
		this.left = left;
	}

	public boolean isScrollX() {
		return scrollX;
	}

	
	public void setScrollX(boolean scrollX) {
		this.scrollX = scrollX;
	}

	public boolean isScrollY() {
		return scrollY;
	}

	public void setScrollY(boolean scrollY) {
		this.scrollY = scrollY;
	}

	public String getAlign() {
		return align;
	}

	public void setAlign(String align) {
		this.align = align;
	}

	public String getDisplay() {
		return display;
	}

	public void setDisplay(String display) {
		this.display = display;
	}

	public String getPadding() {
		return padding;
	}

	public void setPadding(String padding) {
		this.padding = padding;
	}

	public String getMargin() {
		return margin;
	}

	public void setMargin(String margin) {
		this.margin = margin;
	}

	public boolean isClear() {
		return clear;
	}

	public void setClear(boolean clear) {
		this.clear = clear;
	}

	@Override
	public void doTag() throws JspException, IOException {
		PanelPrinter panelPrinter = new PanelPrinter(getJspBody(),
				getJspContext(),getParent());
		panelPrinter.printPanel(id, title, width,height,collapsible,type,contentTop,contentBottom,contentLeft,contentRight,layoutWidth,fixed,top,left,scrollX,scrollY,align,display,padding,margin,clear);
	}

	
}

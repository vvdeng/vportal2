package com.paipai.verticalframework.ui.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.printer.TabPanelPrinter;

public class TabPanelTag extends SimpleTagSupport {
	private String id;
	private String tabId;
	private String title;
	private String contentTop;
	private String contentBottom;
	private String contentLeft;
	private String contentRight;
	private String onclick;
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTabId() {
		return tabId;
	}

	public void setTabId(String tabId) {
		this.tabId = tabId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

	
	public String getOnclick() {
		return onclick;
	}

	
	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}

	@Override
	public void doTag() throws JspException, IOException {
		TabPanelPrinter tabPanelPrinter=new TabPanelPrinter(getJspBody(), getJspContext(), getParent(), this);
		tabPanelPrinter.printTabPanel(id,title,contentTop,contentBottom,contentLeft,contentRight,onclick);
	}
	
}

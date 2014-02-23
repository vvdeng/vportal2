package com.paipai.verticalframework.ui.tag;

import java.io.IOException;
import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.printer.TabContainerPrinter;

public class TabContainerTag extends SimpleTagSupport {
	private String id;
	private int selectedTabIndex;
	private String selectedTabId;
	private boolean collapsible;
	private List<TabPanelTag> children;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getSelectedTabIndex() {
		return selectedTabIndex;
	}

	public void setSelectedTabIndex(int selectedTabIndex) {
		this.selectedTabIndex = selectedTabIndex;
	}

	public String getSelectedTabId() {
		return selectedTabId;
	}

	public void setSelectedTabId(String selectedTabId) {
		this.selectedTabId = selectedTabId;
	}
	public boolean isCollapsible() {
		return collapsible;
	}

	public void setCollapsible(boolean collapsible) {
		this.collapsible = collapsible;
	}
	public List<TabPanelTag> getChildren() {
		return children;
	}

	public void setChildren(List<TabPanelTag> children) {
		this.children = children;
	}

	@Override
	public void doTag() throws JspException, IOException {
		TabContainerPrinter tabContainerPrinter=new TabContainerPrinter(getJspBody(), getJspContext(),this);
		tabContainerPrinter.printTabContainer(id, selectedTabIndex, selectedTabId,collapsible);
	}

	
}

package com.paipai.verticalframework.ui.printer;

import java.io.IOException;
import java.io.StringWriter;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.tag.TabContainerTag;
import com.paipai.verticalframework.ui.tag.TabPanelTag;

public class TabContainerPrinter extends DefaultXhtmlPrinter {
	private TabContainerTag tabContainerTag;

	public TabContainerPrinter(JspFragment jspFragment, JspContext jspContext,
			TabContainerTag tabContainerTag) {
		super(jspFragment, jspContext);
		this.tabContainerTag = tabContainerTag;
	}

	public void printTabContainer(String id, int selectedTabIndex,
			String selectedTabId, boolean collapsible) throws JspException,
			IOException {
		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.CLASS, "tab_gray auto_round");
		StringWriter bodyWriter = new StringWriter();
		printBody(bodyWriter);
		if (tabContainerTag.getChildren() == null)
			throw new RuntimeException("TabContainer????????TabPanel??");
		bodyWriter.getBuffer().delete(0, bodyWriter.getBuffer().length());
		calSelectedIndex();
		printHelper.startElement(Tag.UL);
		printHelper.attribute(Attr.CLASS, "tabnav");
		for (int i = 0; i < tabContainerTag.getChildren().size(); i++) {
			TabPanelTag tabPanelTag = (TabPanelTag) tabContainerTag
					.getChildren().get(i);
			printHelper.startElement(Tag.LI);
			if (i == tabContainerTag.getSelectedTabIndex())
				printHelper.attribute(Attr.CLASS, "c");
			printHelper.attribute(Attr.TAG, "tab_header");

			if (tabPanelTag.getId() != null && !tabPanelTag.getId().isEmpty()) {
				printHelper.attribute(Attr.ID, "header_" + tabPanelTag.getId());
			}
			printHelper.attribute(Attr.NAME, tabPanelTag.getTabId());
			printHelper.attribute(Attr.ONCLICK,
					"PP.vfui.tag.tabHeaderClick(this);");
			printHelper.startElement(Tag.A);
			printHelper.attribute(Attr.HREF, "javascript:void(0);");
			printHelper.attribute(Attr.ONCLICK, tabPanelTag.getOnclick());
			printHelper.startElement(Tag.EM);
			printHelper.text(tabPanelTag.getTitle());
			printHelper.endElement(Tag.EM);
			printHelper.endElement(Tag.A);
			printHelper.endElement(Tag.LI);
		}

		if (collapsible) {
			printHelper.startElement(Tag.LI);
			printHelper.attribute(Attr.TAG, "collapsible_tab_container");
			printHelper.attribute(Attr.ONCLICK,
					"PP.vfui.tag.tabHeaderCollaps(this);");
			printHelper.attribute(Attr.CLASS, "last");
			printHelper.startElement(Tag.A);
			printHelper.attribute(Attr.HREF, "javascript:void(0);");
			printHelper.attribute(Attr.CLASS, "bt_close");
			printHelper.text("   ");
			printHelper.endElement(Tag.A);
			printHelper.endElement(Tag.LI);
		}
		printHelper.endElement(Tag.UL);
		tabContainerTag.setChildren(null);
		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.CLASS, "tab_panel");
		printBody();
		printHelper.endElement(Tag.DIV);
		printHelper.endElement(Tag.DIV);
		flushTag();
	}

	private void calSelectedIndex() {
		for (int i = 0; i < tabContainerTag.getChildren().size(); i++) {
			TabPanelTag tabPanelTag = (TabPanelTag) tabContainerTag
					.getChildren().get(i);
			if (tabPanelTag.getId() != null
					&& tabPanelTag.getId().equals(
							tabContainerTag.getSelectedTabId())) {
				tabContainerTag.setSelectedTabIndex(i);
				return;
			}
		}

	}

}

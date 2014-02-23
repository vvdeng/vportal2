
package com.paipai.verticalframework.ui.printer;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspFragment;
import javax.servlet.jsp.tagext.JspTag;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.tag.TabContainerTag;
import com.paipai.verticalframework.ui.tag.TabPanelTag;



public class TabPanelPrinter extends DefaultXhtmlPrinter
{

    public TabPanelPrinter(JspFragment jspFragment, JspContext jspContext, JspTag parentTag, TabPanelTag tabPanelTag)
    {
        super(jspFragment, jspContext, parentTag);
        this.tabPanelTag = tabPanelTag;
    }

    public void printTabPanel(String id, String title, String contentTop,
			String contentBottom, String contentLeft, String contentRight,String onclick)
        throws JspException, IOException
    {
        int tabIndex = addToTabContainer();
        printHelper.closeElement();
        printHelper.startElement(Tag.DIV);
        printHelper.attribute(Attr.ID, id);
        tabPanelTag.setTabId((new StringBuilder("tab")).append(tabIndex).toString());
        printHelper.attribute(Attr.NAME, tabPanelTag.getTabId());
        printHelper.attribute(Attr.TAG, "tab_panel");
        if(isSelectedTab())
        {
            printHelper.attribute(Attr.CLASS, "tabcon");
            printHelper.attribute(Attr.STYLE, "display:block;");
        } else
        {
            printHelper.attribute(Attr.CLASS, "tabcon h");
            printHelper.attribute(Attr.STYLE, "display:none;");
        }
        printHelper.startElement(Tag.DIV);
        String style="";
    	if (contentTop != null && contentTop.trim().length() > 0) {
			style += "padding-top:" + contentTop + ";";
		} 

		if (contentBottom != null && contentBottom.trim().length() > 0) {
			style += "padding-bottom:" + contentBottom + ";";
		} 
		if (contentLeft != null && contentLeft.trim().length() > 0) {
			style += "padding-left:" + contentLeft + ";";
		} 
		if (contentRight != null && contentRight.trim().length() > 0) {
			style += "padding-right:" + contentRight + ";";
		} 
		if(style.trim()!=null){
			printHelper.attribute(Attr.STYLE,style);
		}
        printBody();
        printHelper.endElement(Tag.DIV);
        printHelper.endElement(Tag.DIV);
        flushTag();
    }

    private TabContainerTag getTabContainerTag()
    {
        if(parentTag == null || parentTag.getClass() != TabContainerTag.class)
            throw new RuntimeException("TabPanel????????TabContainer?У?");
        else
            return (TabContainerTag)parentTag;
    }

    private boolean isSelectedTab()
    {
        return getTabContainerTag().getChildren().indexOf(tabPanelTag) == getTabContainerTag().getSelectedTabIndex();
    }

    private int addToTabContainer()
    {
        if(getTabContainerTag().getChildren() == null)
            getTabContainerTag().setChildren(new ArrayList());
        getTabContainerTag().getChildren().add(tabPanelTag);
        return getTabContainerTag().getChildren().size() - 1;
    }

    private TabPanelTag tabPanelTag;
}



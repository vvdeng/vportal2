/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??TreePrinter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Dec 26, 2010			????
 */
package com.paipai.verticalframework.ui.printer.tree;

import java.util.Collection;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspFragment;

import org.apache.commons.beanutils.PropertyUtils;

import com.paipai.verticalframework.log.Log;
import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;


/** 
 * ???????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class TreePrinter extends DefaultXhtmlPrinter {
	
	public TreePrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	
	public void printTree(String id, String name, Collection data, boolean checkMode, String urlTarget, 
			String idProperty, String textProperty, String parentProperty, String urlProperty, String urlTargetProperty, String checkedProperty) throws JspException {
		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.ID, "TREE_DIV_" + id);
		printHelper.attribute(Attr.CLASS, "dtree");
		printHelper.closeElement();
		
		String script = id + "=new dTree('" + id + "'," + checkMode + ",'" + urlTarget + "');";
		for (Object nodeData : data) {
			try {
				String nodeId = PropertyUtils.getProperty(nodeData, idProperty).toString();
				String nodeText = PropertyUtils.getProperty(nodeData, textProperty).toString();
				String nodeParent = PropertyUtils.getProperty(nodeData, parentProperty).toString();
				String nodeUrl = "#";
				if (urlProperty != null) {
					Object tmp = PropertyUtils.getProperty(nodeData, urlProperty);
					if (tmp != null)
						nodeUrl= tmp.toString();
					if (nodeUrl.length() == 0)
						nodeUrl = "#";
				}
				String nodeTarget = "";
				if (urlTargetProperty != null) {
					Object tmp = PropertyUtils.getProperty(nodeData, urlTargetProperty);
					if (tmp != null)
						nodeTarget = tmp.toString();
				}
				String nodeChecked = Boolean.toString(false);
				if (checkedProperty != null) {
					Object tmp = PropertyUtils.getProperty(nodeData, checkedProperty);
					if (tmp != null)
						nodeChecked = tmp.toString();
				}
				script += id + ".add(" + nodeId + "," + nodeParent + ",'" + nodeText + "','" + nodeUrl + "','" + nodeTarget + "'," + nodeChecked + ");";
			}
			catch (Exception e) {
				Log.logError("error in parsing tree data[" + nodeData + "]", e);
				throw new JspException("error in parsing tree data[" + nodeData + "]");
			}
		}
		//script += "document.write(" + id + ");";
		script += "document.getElementById('TREE_DIV_" + id + "').innerHTML=" + id + ";";
		printHelper.script(script);
		
		printHelper.endElement(Tag.DIV);
		
		flushTag();
	}
}

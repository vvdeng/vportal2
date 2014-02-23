/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??TreeTag.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Dec 26, 2010			????
 */
package com.paipai.verticalframework.ui.tag.tree;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.printer.tree.TreePrinter;


/** 
 * ????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class TreeTag extends SimpleTagSupport {
	
	private static Integer idStep = 2012;
	private String id = "treeTag" + (idStep++);
	private String name = null;
	private Collection data = null;
	private boolean checkMode = false;
	private String urlTarget = null;
	private String idProperty = "id";
	private String textProperty = "text";
	private String parentProperty = "parent";
	private String urlProperty = "url";
	private String urlTargetProperty = "urlTarget";
	private String checkedProperty = "checked";
	
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
	
	public Collection getData() {
		return data;
	}
	
	public void setData(Collection data) {
		this.data = data;
	}
	
	public String getUrlTarget() {
		return urlTarget;
	}
	
	public void setUrlTarget(String urlTarget) {
		this.urlTarget = urlTarget;
	}
	
	public boolean isCheckMode() {
		return checkMode;
	}
	
	public void setCheckMode(boolean checkMode) {
		this.checkMode = checkMode;
	}
	
	public String getIdProperty() {
		return idProperty;
	}
	
	public void setIdProperty(String idProperty) {
		this.idProperty = idProperty;
	}
	
	public String getTextProperty() {
		return textProperty;
	}
	
	public void setTextProperty(String textProperty) {
		this.textProperty = textProperty;
	}
	
	public String getParentProperty() {
		return parentProperty;
	}
	
	public void setParentProperty(String parentProperty) {
		this.parentProperty = parentProperty;
	}
	
	public String getUrlProperty() {
		return urlProperty;
	}
	
	public void setUrlProperty(String urlProperty) {
		this.urlProperty = urlProperty;
	}
	
	public String getUrlTargetProperty() {
		return urlTargetProperty;
	}
	
	public void setUrlTargetProperty(String urlTargetProperty) {
		this.urlTargetProperty = urlTargetProperty;
	}
	
	public String getCheckedProperty() {
		return checkedProperty;
	}
	
	public void setCheckedProperty(String checkedProperty) {
		this.checkedProperty = checkedProperty;
	}

	@Override
	public void doTag() throws JspException, IOException {
		TreePrinter printer = new TreePrinter(super.getJspBody(), super.getJspContext());
		printer.printTree(id, name, data, checkMode, urlTarget, 
				idProperty, textProperty, parentProperty, urlProperty, urlTargetProperty, checkedProperty);
	}
}

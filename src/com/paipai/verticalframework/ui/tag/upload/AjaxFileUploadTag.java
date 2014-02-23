/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??AjaxFileUploadTag.java
 * 
 * Description????ajax??????????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Nov 26, 2010			????
 */
package com.paipai.verticalframework.ui.tag.upload;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.printer.upload.AjaxFileUploadPrinter;


/** 
 * ajax??????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 */
public class AjaxFileUploadTag extends SimpleTagSupport {
	
	private static Integer idStep = 2012;
	private String id = "fil" + (idStep++);
	private String name = null;
	private int minFiles = 0;
	private int maxFiles = 5;
	private String fileExts = null;
	
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
	
	public int getMinFiles() {
		return minFiles;
	}
	
	public void setMinFiles(int minFiles) {
		this.minFiles = minFiles;
	}
	
	public int getMaxFiles() {
		return maxFiles;
	}
	
	public void setMaxFiles(int maxFiles) {
		this.maxFiles = maxFiles;
	}
	
	public String getFileExts() {
		return fileExts;
	}
	
	public void setFileExts(String fileExts) {
		this.fileExts = fileExts;
	}

	@Override
	public void doTag() throws JspException, IOException {
		AjaxFileUploadPrinter printer = new AjaxFileUploadPrinter(super.getJspBody(), super.getJspContext());
		printer.printUploader(id, name, minFiles, maxFiles, fileExts);
	}
}

/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??AjaxFileUploadPrinter.java
 * 
 * Description???????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Nov 26, 2010			????
 */
package com.paipai.verticalframework.ui.printer.upload;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;


/** 
 * ajax???????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class AjaxFileUploadPrinter extends DefaultXhtmlPrinter {
	
	public AjaxFileUploadPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}
	
	public void printUploader(String id, String name, int minFiles, int maxFiles, String fileExts) {
		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.ID, "uploadZone_" + name);
		printHelper.closeElement();
		printHelper.endElement(Tag.SPAN);
		printHelper.startElement(Tag.LABEL);
		printHelper.closeElement();
		printHelper.text("???????????: " + minFiles + "-" + maxFiles + "??");
		printHelper.endElement(Tag.LABEL);
		printHelper.startElement(Tag.BR);
		printHelper.endElement(Tag.BR);
		
		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.ID, "uploadList_" + name);
		printHelper.closeElement();
		printHelper.endElement(Tag.SPAN);
		
		StringBuilder script = new StringBuilder("(function() {");
		script.append("PP.vfui.fileupload.uploader['" + name + "'] = new qq.FileUploader({");
		script.append("element: document.getElementById('uploadZone_" + name + "'),");
		script.append("action: '" + getAbsolutePath("/ajaxfileupload") + "',");
		if (fileExts == null)
			script.append("allowedExtensions: [],");
		else
			script.append("allowedExtensions: [" + fileExts + "],");
		script.append("params: {fieldName:'" + name + "',minFiles:" + minFiles + ",maxFiles:" + maxFiles + ",fileCount:0},");
		script.append("onSubmit: PP.vfui.fileupload.uploadSubmit,");
		script.append("onComplete: PP.vfui.fileupload.uploadComplete");
		script.append("});");
		script.append("})();");
		printHelper.script(script.toString());
		
		flushTag();
	}
}

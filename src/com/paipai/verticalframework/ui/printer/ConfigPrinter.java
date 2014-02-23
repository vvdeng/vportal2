/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??DefaultPrinter.java					
 *			
 * Description??????????????????							 												
 * History??
 * ?汾??    ????           ????          ?????????????
 *  1.0   bevisdeng        2010-10-22           Create	
 */

package com.paipai.verticalframework.ui.printer;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Constants;
import com.paipai.verticalframework.ui.constant.Tag;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class ConfigPrinter extends DefaultXhtmlPrinter {
	private static final long TEN_MINUTES_TO_MILLS = 10 * 60 * 1000;
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

	public ConfigPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printConfigInfo(String contextPath) throws JspException,
			IOException {
		String timeStamp = getTimeStamp();

		for (String jsFileName : Constants.JS_FILE_NAMES) {
			String uri = jsFileName;
			if (uri.indexOf("http://") < 0) {
				uri = getContextRelativePath(contextPath,
						Constants.BASE_FOLDER_NAME + jsFileName);
			}

			printScriptTag(uri, timeStamp);
		}
		for (String cssFileName : Constants.CSS_FILE_NAMES) {
			String uri = cssFileName;
			if (uri.indexOf("http://") < 0) {
				uri = getContextRelativePath(contextPath,
						Constants.BASE_FOLDER_NAME + cssFileName);
			}
			printStyleTag(uri, timeStamp);
		}
		flushTag();
	}

	private void printScriptTag(String uri, String timestamp) {
		uri += "?t=" + timestamp;
		printHelper.startElement(Tag.SCRIPT);
		printHelper.attribute(Attr.TYPE, "text/javascript");
		printHelper.attribute(Attr.SRC, uri);
		printHelper.text("");
		printHelper.endElement(Tag.SCRIPT);
	}

	private void printStyleTag(String uri, String timestamp) {
		uri += "?t=" + timestamp;
		printHelper.startElement(Tag.LINK);
		printHelper.attribute(Attr.TYPE, "text/css");
		printHelper.attribute(Attr.REL, "stylesheet");
		printHelper.attribute(Attr.HREF, uri);
		printHelper.endElement(Tag.LINK);
	}

	private String getContextRelativePath(String contextPath, String uri) {
		return contextPath + uri;
	}

	private String getTimeStamp() {
		long currentTime = System.currentTimeMillis();
		String timeStamp = sdf.format(new Date(currentTime
				/ TEN_MINUTES_TO_MILLS * TEN_MINUTES_TO_MILLS));
		return timeStamp;
	}
}

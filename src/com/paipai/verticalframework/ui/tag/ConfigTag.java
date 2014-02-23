
package com.paipai.verticalframework.ui.tag;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.printer.ConfigPrinter;

public final class ConfigTag extends SimpleTagSupport {

	private ConfigPrinter configPrinter;
	private String contextPath;
//	public static final String EXTERNAL_JQUERY_FILE = "http://static.paipaiimg.com/js/base.js?t=20090422.js";
//	public static final String EXTERNAL_CALENDAR_FILE = "http://static.paipaiimg.com/js/pp.ui.calendar.js";
//	public static final String EXTERNAL_JS_FILE = "http://static.paipaiimg.com/js/base.js?t=20090422.js   ";

	public void doTag() throws JspException, IOException {

		configPrinter=new ConfigPrinter(getJspBody(), getJspContext());
		contextPath=findContextPath();
		configPrinter.printConfigInfo(contextPath);

	}

	private String findContextPath() {
		PageContext pageContext = (PageContext) getJspContext();
		HttpServletRequest req = (HttpServletRequest) pageContext.getRequest();
		return req.getContextPath();
	}
}

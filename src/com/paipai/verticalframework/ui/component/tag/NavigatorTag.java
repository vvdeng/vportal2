/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??ButtonTag.java					
 *			
 * Description??????????????????							 												
 * History??
 * ?汾??    ????           ????          ?????????????
 *  1.0   bevisdeng        2010-10-22           Create	
 */

package com.paipai.verticalframework.ui.component.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.component.printer.NavigatorPrinter;

/** 
 * ????
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class NavigatorTag extends SimpleTagSupport {
	private String id;

	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	

	@Override
	public void doTag() throws JspException, IOException {
		NavigatorPrinter navigatorPrinter=new NavigatorPrinter(getJspBody(),getJspContext());
		navigatorPrinter.printNavigator(id);
	}

}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??EnableContextHandler.java					
 *			
 * Description??Sschema??Spring)?Schema handler???					 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0   raywu  2009-8-10  Create	
 */
package com.paipai.verticalframework.service.config.support;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.xml.NamespaceHandlerSupport;

/**
 * context schema??Spring)?Schema handler???
 * 
 * @author raywu
 * @version 1.0
 */
public class EnableContextHandler extends NamespaceHandlerSupport {

	private final static Log LOG = LogFactory
			.getLog(EnableContextHandler.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.beans.factory.xml.NamespaceHandler#init()
	 */
	public void init() {
		if (LOG.isInfoEnabled()) {
			LOG.info("register ComponentScanParser");
		}
		registerBeanDefinitionParser("component-scan",
				new ComponentScanParser());
	}
}

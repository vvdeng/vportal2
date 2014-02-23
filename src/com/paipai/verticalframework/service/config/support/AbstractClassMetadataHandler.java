/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??AbstractClassMetadataHandler.class				
 *			
 * Description??ClassMetadataHandler???????					 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0   raywu  2009-8-10  Create	
 */
package com.paipai.verticalframework.service.config.support;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;

/**
 * ClassMetadataHandler???????
 * 
 * @author raywu
 */
public abstract class AbstractClassMetadataHandler implements
		IClassMetadataHandler {

	protected final Log LOG = LogFactory.getLog(getClass());

	private BeanDefinitionRegistry registry;

	public void init(BeanDefinitionRegistry registry) {
		this.registry = registry;
	}

	public int getOrder() {
		return HIGHEST_PRECEDENCE;
	}

	public void destroy() {

	}

	protected void registerBeanDefinition(String beanName,
			BeanDefinition beanDefinition) {
		this.registry.registerBeanDefinition(beanName, beanDefinition);

		if (LOG.isInfoEnabled()) {
			LOG.info("regist BeanDefinition[beanName=" + beanName
					+ ",beanDefinition=" + beanDefinition + "]");
		}
	}

	protected boolean containsBeanDefinition(String beanName) {
		return this.registry.containsBeanDefinition(beanName);
	}

	protected BeanDefinitionRegistry getBeanDefinitionRegistry() {
		return this.registry;
	}
}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??SpringObjectFactory.class				
 *			
 * Description??????Spring IOC?????????				 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0   raywu  2010-11-09  Create	
 */
package com.paipai.verticalframework.core.spring;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import com.paipai.verticalframework.core.ObjectFactory;

/**
 * ????Spring IOC?????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class SpringObjectFactory extends ObjectFactory implements
		ApplicationContextAware {

	private ApplicationContext applicationContext;

	public SpringObjectFactory() {
		super();

		setInstance(this);
	}

	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		this.applicationContext = applicationContext;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.boss.common.core.ObjectFactory#bindConfigDependence(java.lang.Object)
	 */
	public void bindConfigDependence(Object bean) {
		this.applicationContext.getAutowireCapableBeanFactory()
				.autowireBeanProperties(bean,
						AutowireCapableBeanFactory.AUTOWIRE_BY_NAME, false);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.boss.common.core.ObjectFactory#getConfigObject(java.lang.Class,
	 *      java.lang.String)
	 */
	public <T> T getConfigObject(Class<T> requiredType, String name) {
		return (T) this.applicationContext.getBean(name, requiredType);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.boss.common.core.ObjectFactory#existConfigBean(java.lang.String)
	 */
	public boolean containsConfigBean(String beanName) {
		return this.applicationContext.containsBean(beanName);
	}
}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??AnnotationConfigBeanFactoryPostProcessor.class
 *			
 * Description??Annotation????BeanFactoryPostProcessor?????????????????????????Annotation??????????Spring????									 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0   raywu  2009-8-10  Create	
 */
package com.paipai.verticalframework.service.config.support;

import java.io.IOException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.core.Ordered;
import org.springframework.core.PriorityOrdered;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.util.ClassUtils;

import com.paipai.verticalframework.service.config.support.metadata.IClassMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IMetadataReader;
import com.paipai.verticalframework.service.config.support.metadata.IMetadataReaderFactory;
import com.paipai.verticalframework.service.config.support.utils.BeanRegisterUtils;

/**
 * Annotation????BeanFactoryPostProcessor?????????????????????????Annotation??????????Spring????
 * 
 * @author raywu
 * @version 1.0
 */
public class AnnotationConfigBeanFactoryPostProcessor implements
		BeanFactoryPostProcessor, PriorityOrdered {

	private final static Log LOG = LogFactory
			.getLog(AnnotationConfigBeanFactoryPostProcessor.class);

	private String[] packagePrefixs;

	private IMetadataReaderFactory metadataReaderFactory;

	private ResourcePatternResolver resourcePatternResolver;

	public void setPackagePrefixs(String[] packagePrefixs) {
		this.packagePrefixs = packagePrefixs;
	}

	public void setMetadataReaderFactory(
			IMetadataReaderFactory metadataReaderFactory) {
		this.metadataReaderFactory = metadataReaderFactory;
	}

	public void setResourcePatternResolver(
			ResourcePatternResolver resourcePatternResolver) {
		this.resourcePatternResolver = resourcePatternResolver;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.core.Ordered#getOrder()
	 */
	public int getOrder() {
		// ??????????BeanRegisterBeanFactoryPostProcessor
		return Ordered.HIGHEST_PRECEDENCE + 100;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.beans.factory.config.BeanFactoryPostProcessor#postProcessBeanFactory(org.springframework.beans.factory.config.ConfigurableListableBeanFactory)
	 */
	public void postProcessBeanFactory(ConfigurableListableBeanFactory factory)
			throws BeansException {
		if (LOG.isInfoEnabled()) {
			LOG.info("start do postProcessBeanFactory");
		}

		String[] allBeanNames = factory.getBeanDefinitionNames();
		for (String beanName : allBeanNames) {
			BeanDefinition beanDefinition = factory.getBeanDefinition(beanName);
			String beanClassName = beanDefinition.getBeanClassName();
			// ?????????
			for (String packagePrefix : this.packagePrefixs) {
				if (beanClassName.startsWith(packagePrefix)) {
					handleConfig(beanDefinition);
					break;
				}
			}
		}

		if (LOG.isInfoEnabled()) {
			LOG.info("finish do postProcessBeanFactory");
		}
	}

	private void handleConfig(BeanDefinition beanDefinition) {
		Resource resource = this.resourcePatternResolver.getResource(ClassUtils
				.convertClassNameToResourcePath(beanDefinition
						.getBeanClassName())
				+ ".class");
		try {
			IMetadataReader reader = this.metadataReaderFactory
					.create(resource);
			IClassMetadata classMetadata = reader.readMetadata();

			BeanRegisterUtils.registDefinitionDetail(classMetadata,
					beanDefinition);
		}
		catch (IOException e) {
			LOG.info("error when read beanDefinition[" + beanDefinition
					+ "] resource", e);
		}
	}
}

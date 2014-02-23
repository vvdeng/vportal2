/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??BeanRegisterBeanFactoryPostProcessor.class
 *			
 * Description??Bean???BeanFactoryPostProcessor????????ClassMetadataHandler??????????Spring???????									 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-13   Create	
 */
package com.paipai.verticalframework.service.config.support;

import java.io.IOException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.core.Ordered;
import org.springframework.core.PriorityOrdered;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.util.ClassUtils;
import org.springframework.util.SystemPropertyUtils;

import com.paipai.verticalframework.service.config.support.metadata.IClassMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IMetadataReader;
import com.paipai.verticalframework.service.config.support.metadata.IMetadataReaderFactory;

/**
 * Bean???BeanFactoryPostProcessor????????ClassMetadataHandler??????????Spring???????
 * 
 * @author raywu
 * @version 1.0
 */
public class BeanRegisterBeanFactoryPostProcessor implements
		BeanFactoryPostProcessor, PriorityOrdered {

	private final static Log LOG = LogFactory
			.getLog(BeanRegisterBeanFactoryPostProcessor.class);
	protected static final String DEFAULT_RESOURCE_PATTERN = "/**/*.class";

	private String[] packagePrefixs;

	private IMetadataReaderFactory metadataReaderFactory;

	private ResourcePatternResolver resourcePatternResolver;

	private List<IClassMetadataHandler> classMetadataHandlers;

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

	public void setClassMetadataHandlers(
			List<IClassMetadataHandler> classMetadataHandlers) {
		this.classMetadataHandlers = classMetadataHandlers;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.core.Ordered#getOrder()
	 */
	public int getOrder() {
		return Ordered.HIGHEST_PRECEDENCE;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.beans.factory.config.BeanFactoryPostProcessor#postProcessBeanFactory(org.springframework.beans.factory.config.ConfigurableListableBeanFactory)
	 */
	public void postProcessBeanFactory(
			ConfigurableListableBeanFactory beanFactory) throws BeansException {
		if (beanFactory instanceof BeanDefinitionRegistry) {
			if (LOG.isInfoEnabled()) {
				LOG.info("BeanRegisterBeanFactoryPostProcessor start");
			}
			handleBeanRegister((BeanDefinitionRegistry) beanFactory);
		}
		else {
			LOG
					.warn("BeanFactory is not a BeanDefinitionRegistry, Auto-Scan cann't work");
		}
	}

	/**
	 * @param beanDefinitionRegistry
	 */
	protected void handleBeanRegister(
			BeanDefinitionRegistry beanDefinitionRegistry)
			throws BeansException {
		initHandlers(beanDefinitionRegistry);

		for (String packagePrefix : packagePrefixs) {
			if (LOG.isInfoEnabled()) {
				LOG.info("scan package[" + packagePrefix + "]");
			}

			try {
				// ??packagePrefix???????????.class???
				Resource[] resources = resourcePatternResolver
						.getResources(ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX
								+ ClassUtils
										.convertClassNameToResourcePath(SystemPropertyUtils
												.resolvePlaceholders(packagePrefix
														.trim()))
								+ DEFAULT_RESOURCE_PATTERN);

				for (Resource resource : resources) {
					try {
						if (LOG.isDebugEnabled()) {
							LOG.debug("handle resource[" + resource + "]");
						}

						if (resource.isReadable()) {
							IMetadataReader reader = metadataReaderFactory
									.create(resource);
							IClassMetadata metadata = reader.readMetadata();
							handle(metadata, beanDefinitionRegistry);
						}
					}
					catch (Throwable t) {
						LOG.info(
								"Error when handle resource[" + resource + "]",
								t);
					}
				}
			}
			catch (IOException e) {
				LOG.info("Error when scan resource ", e);
			}
		}

		destroyHandlers(beanDefinitionRegistry);
	}

	/**
	 * ???????????
	 * 
	 * @param context
	 */
	private void initHandlers(BeanDefinitionRegistry beanDefinitionRegistry) {
		for (IClassMetadataHandler classHandler : this.classMetadataHandlers) {
			classHandler.init(beanDefinitionRegistry);
		}
	}

	/**
	 * ????????
	 * 
	 * @param context
	 */
	private void destroyHandlers(BeanDefinitionRegistry beanDefinitionRegistry) {
		for (IClassMetadataHandler classHandler : this.classMetadataHandlers) {
			classHandler.destroy();
		}
	}

	/**
	 * ?????????
	 * 
	 * @param metadata
	 *            ??????
	 * @param context
	 *            Spring Context
	 */
	private void handle(IClassMetadata metadata,
			BeanDefinitionRegistry beanDefinitionRegistry) {
		for (IClassMetadataHandler classHandler : this.classMetadataHandlers) {
			// ????????????????
			if (!classHandler.handle(metadata)) {
				break;
			}
		}
	}
}

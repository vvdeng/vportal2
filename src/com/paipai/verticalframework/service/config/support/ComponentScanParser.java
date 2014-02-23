/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??ComponentScanParser.java					
 *			
 * Description??Spring??????????账?????					 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu  2009-8-10  Create	
 *  1.1     raywu   2009-8-12   ???IClassMetadataHandler??????????
 *  1.2     raywu   2009-8-14   ???BeanFactoryPostProcessor????????????????
 */
package com.paipai.verticalframework.service.config.support;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.beans.factory.xml.BeanDefinitionParser;
import org.springframework.beans.factory.xml.ParserContext;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.paipai.verticalframework.core.util.ClassUtils;
import com.paipai.verticalframework.service.config.exception.IllegalConfigException;
import com.paipai.verticalframework.service.config.support.metadata.IMetadataReaderFactory;
import com.paipai.verticalframework.service.config.support.metadata.asm.DefaultMetadataReaderFactory;
import com.paipai.verticalframework.service.config.support.utils.ComponentClassMetadataHandler;

/**
 * Spring??????????账?????
 * 
 * @author raywu
 * @version 1.2
 */
public class ComponentScanParser implements BeanDefinitionParser {

	private final static Log LOG = LogFactory.getLog(ComponentScanParser.class);

	private List<IClassMetadataHandler> classMetadataHandlers = new ArrayList<IClassMetadataHandler>();
	{
		addClassMetadataHandler(new ComponentClassMetadataHandler());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.beans.factory.xml.BeanDefinitionParser#parse(org.w3c.dom.Element,
	 *      org.springframework.beans.factory.xml.ParserContext)
	 */
	public BeanDefinition parse(Element element, ParserContext context) {
		String packagePrefixString = element.getAttribute("packages");
		if (LOG.isInfoEnabled()) {
			LOG.info("read packages[" + packagePrefixString + "]");
		}
		String[] packagePrefixs = packagePrefixString.split(",");
		NodeList children = element.getChildNodes();
		for (int i = 0; i < children.getLength(); i++) {
			Node node = children.item(i);
			if (node instanceof Element) {
				Element handler = (Element) node;
				try {
					addClassMetadataHandler((IClassMetadataHandler) ClassUtils
							.createInstance(Class.forName(handler
									.getAttribute("className"))));
				}
				catch (ClassNotFoundException e) {
					throw new IllegalConfigException(e);
				}
				handler = null;
			}
			node = null;
		}
		PathMatchingResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
		IMetadataReaderFactory metadataReaderFactory = new DefaultMetadataReaderFactory();

		// ???BeanRegisterBeanFactoryPostProcessor
		registBeanRegisterBeanFactoryPostProcessor(resourcePatternResolver,
				metadataReaderFactory, packagePrefixs, context);

		// ???AnnotationConfigBeanFactoryPostProcessor
		registAnnotationConfigBeanFactoryPostProcessor(resourcePatternResolver,
				metadataReaderFactory, packagePrefixs, context);

		return null;
	}

	private void registBeanRegisterBeanFactoryPostProcessor(
			PathMatchingResourcePatternResolver resourcePatternResolver,
			IMetadataReaderFactory metadataReaderFactory,
			String[] packagePrefixs, ParserContext context) {

		BeanDefinitionRegistry registry = context.getRegistry();

		if (!registry
				.containsBeanDefinition(BeanRegisterBeanFactoryPostProcessor.class
						.getName())) {
			// ???BeanFactoryPostProcessor???壬??????Spring????????????
			RootBeanDefinition beanDefinition = new RootBeanDefinition(
					BeanRegisterBeanFactoryPostProcessor.class);
			MutablePropertyValues mutablePropertyValues = beanDefinition
					.getPropertyValues();
			mutablePropertyValues.addPropertyValue("packagePrefixs",
					packagePrefixs);
			mutablePropertyValues.addPropertyValue("metadataReaderFactory",
					metadataReaderFactory);
			mutablePropertyValues.addPropertyValue("resourcePatternResolver",
					resourcePatternResolver);
			mutablePropertyValues.addPropertyValue("classMetadataHandlers",
					this.classMetadataHandlers);

			registry.registerBeanDefinition(
					BeanRegisterBeanFactoryPostProcessor.class.getName(),
					beanDefinition);

			if (LOG.isInfoEnabled()) {
				LOG.info("regist BeanDefinition[beanName="
						+ AnnotationConfigBeanFactoryPostProcessor.class
								.getName() + ",beanDefinition="
						+ beanDefinition + "]");
			}
		}
	}

	/**
	 * @param resourcePatternResolver
	 * @param metadataReaderFactory
	 * @param packagePrefixs
	 * @param context
	 */
	private void registAnnotationConfigBeanFactoryPostProcessor(
			ResourcePatternResolver resourcePatternResolver,
			IMetadataReaderFactory metadataReaderFactory,
			String[] packagePrefixs, ParserContext context) {

		BeanDefinitionRegistry registry = context.getRegistry();

		if (!registry
				.containsBeanDefinition(AnnotationConfigBeanFactoryPostProcessor.class
						.getName())) {
			// ???BeanFactoryPostProcessor???壬??????@Property??@Init??@Destroy????
			RootBeanDefinition beanDefinition = new RootBeanDefinition(
					AnnotationConfigBeanFactoryPostProcessor.class);
			MutablePropertyValues mutablePropertyValues = beanDefinition
					.getPropertyValues();
			mutablePropertyValues.addPropertyValue("packagePrefixs",
					packagePrefixs);
			mutablePropertyValues.addPropertyValue("metadataReaderFactory",
					metadataReaderFactory);
			mutablePropertyValues.addPropertyValue("resourcePatternResolver",
					resourcePatternResolver);

			registry.registerBeanDefinition(
					AnnotationConfigBeanFactoryPostProcessor.class.getName(),
					beanDefinition);

			if (LOG.isInfoEnabled()) {
				LOG.info("regist BeanDefinition[beanName="
						+ AnnotationConfigBeanFactoryPostProcessor.class
								.getName() + ",beanDefinition="
						+ beanDefinition + "]");
			}
		}
	}

	/**
	 * ??????????
	 * 
	 * @param classMetadataHandler
	 */
	private void addClassMetadataHandler(
			IClassMetadataHandler classMetadataHandler) {
		this.classMetadataHandlers.add(classMetadataHandler);
		// ????????
		Collections.sort(this.classMetadataHandlers,
				new Comparator<IClassMetadataHandler>() {

					public int compare(IClassMetadataHandler o1,
							IClassMetadataHandler o2) {
						Integer order1 = o1.getOrder();
						Integer order2 = o2.getOrder();
						return order1.compareTo(order2);
					}
				});
	}
}

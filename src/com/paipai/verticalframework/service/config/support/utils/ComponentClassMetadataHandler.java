/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??BeanClassMetadataHandler.java					
 *			
 * Description??Bean???????????????	 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 *  1.1     raywu   2009-8-12   ???IClassMetadataHandler??????????
 */
package com.paipai.verticalframework.service.config.support.utils;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.config.RuntimeBeanReference;
import org.springframework.beans.factory.support.RootBeanDefinition;

import com.paipai.verticalframework.service.config.support.AbstractClassMetadataHandler;
import com.paipai.verticalframework.service.config.support.IClassMetadataHandler;
import com.paipai.verticalframework.service.config.support.annotation.Component;
import com.paipai.verticalframework.service.config.support.metadata.IAnnotationMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IClassMetadata;

/**
 * Bean???????????????
 * 
 * @author raywu
 * @version 1.1
 */
public class ComponentClassMetadataHandler extends AbstractClassMetadataHandler
		implements IClassMetadataHandler {

	private final static Set<String> PROPERTY_EXECLUDES = new HashSet<String>();
	{
		PROPERTY_EXECLUDES.add("name");
		PROPERTY_EXECLUDES.add("scope");
		PROPERTY_EXECLUDES.add("lazy");
		PROPERTY_EXECLUDES.add("factoryMethod");
	}

	private Map<String, IBeanNameResolver> beanNameResolverMap = new HashMap<String, IBeanNameResolver>();

	public void registerBeanNameResolver(String componentAnnotationClass,
			IBeanNameResolver beanNameResolver) {
		this.beanNameResolverMap
				.put(componentAnnotationClass, beanNameResolver);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.IClassHandler#getOrder()
	 */
	public int getOrder() {
		return LOWEST_PRECEDENCE - 10;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.IClassMetadataHandler#handle(com.paipai.logicframework.config.support.metadata.IClassMetadata)
	 */
	public boolean handle(IClassMetadata classMetadata) {
		Collection<IAnnotationMetadata> annotationMetadataList = classMetadata
				.getAnnotationMetadataList();
		boolean result = true;

		// ???????????????Annotation
		for (IAnnotationMetadata metadata : annotationMetadataList) {
			// ??????Metadata??????Component
			if (metadata.getMetaAnnotations().contains(
					Component.class.getName())) {
				if (LOG.isDebugEnabled()) {
					LOG.debug("metadata [" + metadata.getAnnotationClass()
							+ "] is a component annotation");
				}

				IBeanNameResolver beanNameResolver = this.beanNameResolverMap
						.get(metadata.getAnnotationClass());
				if (beanNameResolver == null) {
					beanNameResolver = new DefaultComponentBeanNameResolver(
							metadata.getAnnotationClass());
					this.beanNameResolverMap.put(metadata.getAnnotationClass(),
							beanNameResolver);
				}

				// ??@Bean?????name???????????????????Bean???????????Сд
				String beanName = beanNameResolver.resolve(classMetadata);

				if (beanName == null || beanName.length() == 0) {
					if (LOG.isDebugEnabled()) {
						LOG.debug("beanName for ["
								+ metadata.getAnnotationClass()
								+ "] can't be found for ["
								+ classMetadata.getClassName() + "]");
					}
					continue;
				}

				// ?????Bean?????
				if (containsBeanDefinition(beanName)) {
					if (LOG.isDebugEnabled()) {
						LOG.debug("beanName[" + beanName
								+ "] had bean registered");
					}
					return true;
				}

				handleRegisterBean(classMetadata, metadata, beanName);

				// ?????????@Component????????????????????
				result = false;
			}
		}

		return result;
	}

	private void handleRegisterBean(IClassMetadata classMetadata,
			IAnnotationMetadata metadata, String beanName) {
		// ???Bean????
		RootBeanDefinition beanDefinition = new RootBeanDefinition();
		beanDefinition.setAbstract(false);
		beanDefinition.setBeanClassName(classMetadata.getClassName());

		String scope = (String) metadata.getAttribute("scope");
		if (scope != null && scope.length() > 0) {
			beanDefinition.setScope(scope);
		}
		Boolean lazy = (Boolean) metadata.getAttribute("lazy");
		if (lazy != null) {
			beanDefinition.setLazyInit(lazy);
		}
		beanDefinition.setAutowireMode(Autowire.BY_NAME.value());

		String factoryMethod = (String) metadata.getAttribute("factoryMethod");
		if (factoryMethod != null && factoryMethod.length() > 0) {
			beanDefinition.setFactoryMethodName(factoryMethod);
		}
		beanDefinition.setAutowireCandidate(true);

		// ????Annotation??????????
		for (String property : metadata.getAttributesMap().keySet()) {
			if (!PROPERTY_EXECLUDES.contains(property)) {
				Object value = metadata.getAttribute(property);
				if (value instanceof String) {
					String valueString = ((String) value).trim();
					beanDefinition.getPropertyValues().addPropertyValue(
							property, new RuntimeBeanReference(valueString));
				}
				else {
					beanDefinition.getPropertyValues().addPropertyValue(
							property, value);
				}
				value = null;
			}
		}

		registerBeanDefinition(beanName, beanDefinition);
	}
}

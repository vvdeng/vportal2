/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??HessianServiceClassMetadataHandler.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-12-23			????
 */
package com.paipai.verticalframework.service.config.support.hessian;

import java.util.Collection;

import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.config.RuntimeBeanReference;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.remoting.caucho.HessianServiceExporter;

import com.paipai.verticalframework.service.config.exception.IllegalConfigException;
import com.paipai.verticalframework.service.config.support.AbstractClassMetadataHandler;
import com.paipai.verticalframework.service.config.support.hessian.annotation.HessianService;
import com.paipai.verticalframework.service.config.support.metadata.IAnnotationMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IClassMetadata;
import com.paipai.verticalframework.service.config.support.utils.DefaultComponentBeanNameResolver;
import com.paipai.verticalframework.service.config.support.utils.IBeanNameResolver;
import com.paipai.verticalframework.service.config.support.utils.ScopeConstant;

/**
 * HessianService???崦??
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class HessianServiceClassMetadataHandler extends
		AbstractClassMetadataHandler {

	/**
	 * <????????>
	 * 
	 * @param ???????????????У???????????????Χ??
	 * @return ??????????????????????????????????????????????????η???
	 * @exception ?????????????????????????
	 * @see ?ο???JavaDoc
	 */
	public boolean handle(IClassMetadata classMetadata) {
		Collection<IAnnotationMetadata> annotationMetadataList = classMetadata
				.getAnnotationMetadataList();
		// ???????????????Annotation
		for (IAnnotationMetadata metadata : annotationMetadataList) {
			// ??????Metadata??????Component
			if (HessianService.class.getName().equals(
					metadata.getAnnotationClass())) {
				if (LOG.isDebugEnabled()) {
					LOG.debug("class [" + classMetadata.getClassName()
							+ "] has a HessianService annotation");
				}

				if (classMetadata.getInterfaceNames() == null
						|| classMetadata.getInterfaceNames().length != 1) {
					throw new IllegalConfigException(
							"Class With HessianService Annotation must have only interface");
				}
				String interfaceClassName = classMetadata.getInterfaceNames()[0];
				IBeanNameResolver beanNameResolver = new DefaultComponentBeanNameResolver(
						metadata.getAnnotationClass());
				// ??@Bean?????name???????????????????Bean???????????Сд
				// ??????@HessianService Bean?????Bean?????@Component??????
				String hessianServiceBeanName = beanNameResolver
						.resolve(classMetadata);

				if (hessianServiceBeanName == null
						|| hessianServiceBeanName.length() == 0) {
					if (LOG.isDebugEnabled()) {
						LOG.debug("beanName for ["
								+ metadata.getAnnotationClass()
								+ "] can't be found for ["
								+ classMetadata.getClassName() + "]");
					}
					continue;
				}
				// serviceBean
				String hessianUri =  "/" + classMetadata.getClassNameForShort();
				if (hessianUri.endsWith("Impl")) {
					hessianUri = hessianUri.substring(0,
							hessianUri.length() - "Impl".length());
				}
				if (hessianUri.endsWith("HessianService")) {
					hessianUri = hessianUri.substring(0,
							hessianUri.length()
									- "HessianService".length());
				}

				RootBeanDefinition definition = new RootBeanDefinition();
				definition.setAbstract(false);
				definition.setBeanClass(HessianServiceExporter.class);
				definition.setScope(ScopeConstant.SCOPE_SINGLETON);
				definition.setLazyInit(false);
				definition.setAutowireCandidate(true);
				definition.setAutowireMode(Autowire.BY_NAME.value());

				if (LOG.isDebugEnabled()) {
					LOG.debug("Reader Bean Definition[" + definition
							+ "] with name[" + hessianUri + "]");
				}

				MutablePropertyValues mpv = new MutablePropertyValues();

				// serviceInterface
				mpv.addPropertyValue("service", new RuntimeBeanReference(hessianServiceBeanName));
				mpv.addPropertyValue("serviceInterface", interfaceClassName);
				LOG.info("hessian : " + hessianUri);

				definition.setPropertyValues(mpv);
				registerBeanDefinition(hessianUri, definition);
			}
		}

		// ??????????????@Component???????????????true
		return true;
	}
}

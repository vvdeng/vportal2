/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??HessianClientClassMetadataHandler.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-12-24			????
 */
package com.paipai.verticalframework.service.config.support.hessian;

import java.util.Collection;

import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.remoting.caucho.HessianProxyFactoryBean;

import com.paipai.verticalframework.service.config.exception.IllegalConfigException;
import com.paipai.verticalframework.service.config.support.AbstractClassMetadataHandler;
import com.paipai.verticalframework.service.config.support.hessian.annotation.HessianClient;
import com.paipai.verticalframework.service.config.support.metadata.IAnnotationMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IClassMetadata;
import com.paipai.verticalframework.service.config.support.utils.DefaultComponentBeanNameResolver;
import com.paipai.verticalframework.service.config.support.utils.IBeanNameResolver;
import com.paipai.verticalframework.service.config.support.utils.ScopeConstant;

/**
 * HessianClient???崦??
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class HessianClientClassMetadataHandler extends
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
			if (HessianClient.class.getName().equals(
					metadata.getAnnotationClass())) {
				if (LOG.isDebugEnabled()) {
					LOG.debug("class [" + classMetadata.getClassName()
							+ "] has a HessianClient annotation");
				}

				if (classMetadata.isInterface()) {
					throw new IllegalConfigException("Class With HessianClient Annotation must be interface");
				}
				
				IBeanNameResolver beanNameResolver = new DefaultComponentBeanNameResolver(
						metadata.getAnnotationClass());
				// ??@Bean?????name???????????????????Bean???????????Сд
				// ??????@HessianService Bean?????Bean?????@Component??????
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
				
				RootBeanDefinition definition = new RootBeanDefinition();
				definition.setAbstract(false);
				definition.setBeanClass(HessianProxyFactoryBean.class);
				definition.setScope(ScopeConstant.SCOPE_SINGLETON);
				definition.setLazyInit(false);
				definition.setAutowireCandidate(true);
				definition.setAutowireMode(Autowire.BY_NAME.value());

				MutablePropertyValues mpv = new MutablePropertyValues();

				mpv.addPropertyValue("serviceUrl", metadata.getAttribute("serviceUrl"));
				mpv.addPropertyValue("serviceInterface", classMetadata.getClassName());
				mpv.addPropertyValue("overloadEnabled", metadata.getAttribute("overloadEnabled"));

				definition.setPropertyValues(mpv);

				if (LOG.isDebugEnabled())
				{
					LOG.debug("Reader Bean Definition[" + definition + "] with name["
							+ beanName + "]");
				}
				registerBeanDefinition(beanName, definition);
			}
		}

		return true;
	}
}

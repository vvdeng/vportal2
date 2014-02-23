/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??BeanRegisterUtils.java					
 *			
 * Description??Bean????????	 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.utils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.PropertyValue;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.RuntimeBeanReference;
import org.springframework.beans.factory.support.AbstractBeanDefinition;

import com.paipai.verticalframework.service.config.support.annotation.Destroy;
import com.paipai.verticalframework.service.config.support.annotation.Init;
import com.paipai.verticalframework.service.config.support.annotation.Property;
import com.paipai.verticalframework.service.config.support.metadata.IAnnotationMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IClassMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IFieldMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IMethodMetadata;

/**
 * Bean????????
 * 
 * @author raywu
 * @version 1.0
 */
public class BeanRegisterUtils {

	private final static Log LOG = LogFactory.getLog(BeanRegisterUtils.class);

	/**
	 * ?????????
	 * 
	 * @param classMetadata
	 *            ??????
	 * @param beanDefinition
	 *            ????
	 */
	public static void registDefinitionDetail(IClassMetadata classMetadata,
			BeanDefinition beanDefinition) {
		registerProperty(classMetadata, beanDefinition);
		registerLifecycle(classMetadata, beanDefinition);
	}

	/**
	 * ????@Property????????????
	 * 
	 * @param classMetadata
	 *            ??????
	 * @param beanDefinition
	 *            ????
	 */
	public static void registerProperty(IClassMetadata classMetadata,
			BeanDefinition beanDefinition) {
		MutablePropertyValues mpv = beanDefinition.getPropertyValues();
		for (IFieldMetadata filedMetadata : classMetadata.getFieldMetadatas()) {
			IAnnotationMetadata annotationMetadata = filedMetadata
					.getAnnotationMetadata(Property.class.getName());
			if (annotationMetadata != null) {

				PropertyValue pv = mpv.getPropertyValue(filedMetadata
						.getFieldName());
				// ?????????????????????????????????????@Property?????Ч????XML????????
				if (pv == null) {
					String ref = (String) annotationMetadata
							.getAttribute("ref");
					String value = (String) annotationMetadata
							.getAttribute("value");
					// ref????????
					if (ref != null && ref.trim().length() > 0) {
						mpv.addPropertyValue(filedMetadata.getFieldName(),
								new RuntimeBeanReference(ref.trim()));
						if (LOG.isDebugEnabled()) {
							LOG.debug("registerProperty[name="
									+ filedMetadata.getFieldName() + ",ref="
									+ ref.trim() + "] for class["
									+ classMetadata.getClassName() + "]");
						}
					}
					else {
						mpv.addPropertyValue(filedMetadata.getFieldName(),
								value);
						if (LOG.isDebugEnabled()) {
							LOG.debug("registerProperty[name="
									+ filedMetadata.getFieldName() + ",value="
									+ value + "] for class["
									+ classMetadata.getClassName() + "]");
						}
					}

					value = null;
					ref = null;
				}
				else {
					if (LOG.isDebugEnabled()) {
						LOG.debug("property [" + pv.getName() + "] value ["
								+ pv.getValue() + "], ignore @Property config");
					}
				}
			}

			annotationMetadata = null;
		}
	}

	/**
	 * ????@Init??@Destroy??????????????
	 * 
	 * @param classMetadata
	 *            ??????
	 * @param beanDefinition
	 *            ????
	 */
	public static void registerLifecycle(IClassMetadata classMetadata,
			BeanDefinition definition) {
		if (definition instanceof AbstractBeanDefinition) {

			AbstractBeanDefinition beanDefinition = (AbstractBeanDefinition) definition;
			for (IMethodMetadata methodMetadata : classMetadata
					.getMethodMetadatas()) {
				IAnnotationMetadata initAnnotationMetadata = methodMetadata
						.getAnnotationMetadata(Init.class.getName());
				if (initAnnotationMetadata != null) {
					beanDefinition.setInitMethodName(methodMetadata
							.getMethodName());

					if (LOG.isDebugEnabled()) {
						LOG.debug("registerLifecycle[type=init, value="
								+ methodMetadata.getMethodName()
								+ "] for class[" + classMetadata.getClassName()
								+ "]");
					}
				}
				IAnnotationMetadata destroyAnnotationMetadata = methodMetadata
						.getAnnotationMetadata(Destroy.class.getName());
				if (destroyAnnotationMetadata != null) {
					beanDefinition.setDestroyMethodName(methodMetadata
							.getMethodName());

					if (LOG.isDebugEnabled()) {
						LOG.debug("registerLifecycle[type=destroy, value="
								+ methodMetadata.getMethodName()
								+ "] for class[" + classMetadata.getClassName()
								+ "]");
					}
				}
			}
		}
	}
}

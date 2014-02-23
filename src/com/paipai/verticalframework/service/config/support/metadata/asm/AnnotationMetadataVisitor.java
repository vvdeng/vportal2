/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??AnnotationMetadataVisitor.java					
 *			
 * Description???????????Annotation???????Visitor		 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.metadata.asm;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

import org.objectweb.asm.AnnotationVisitor;
import org.objectweb.asm.commons.EmptyVisitor;

import com.paipai.verticalframework.service.config.support.metadata.IAnnotationMetadata;

/**
 * ?????????Annotation???????Visitor
 * 
 * @author raywu
 * @version 1.0
 */
public class AnnotationMetadataVisitor extends EmptyVisitor implements
		AnnotationVisitor, IAnnotationMetadata {

	private String annotationClass; // Annotation Class??
	private final Map<String, Object> attributesMap = new LinkedHashMap<String, Object>(); // Annotation????????
	private final Set<String> metaAnnotations = new LinkedHashSet<String>(); // Annotation?????Annotation

	// Meta
	private final ClassLoader classLoader;

	public AnnotationMetadataVisitor(String annotationClass,
			ClassLoader classLoader) {
		this.annotationClass = annotationClass;
		this.classLoader = classLoader;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.AnnotationMetadata#getAnnotationClass()
	 */
	public String getAnnotationClass() {
		return annotationClass;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.AnnotationMetadata#getAttributesMap()
	 */
	public Map<String, Object> getAttributesMap() {
		return this.attributesMap;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.AnnotationMetadata#getAttribute(java.lang.String)
	 */
	public Object getAttribute(String name) {
		return this.attributesMap.get(name);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.AnnotationMetadata#getMetaAnnotations()
	 */
	public Set<String> getMetaAnnotations() {
		return metaAnnotations;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.objectweb.asm.commons.EmptyVisitor#visit(java.lang.String,
	 *      java.lang.Object)
	 */
	public void visit(String name, Object value) {
		// ????Annotation???????
		attributesMap.put(name, value);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.objectweb.asm.commons.EmptyVisitor#visitEnd()
	 */
	public void visitEnd() {
		// ????Annotation?????
		try {
			Class<?> annotationClass = classLoader
					.loadClass(this.annotationClass);
			Method[] annotationAttributes = annotationClass.getMethods();
			// ????Annotation??????????
			for (int i = 0; i < annotationAttributes.length; i++) {
				Method annotationAttribute = annotationAttributes[i];
				String attributeName = annotationAttribute.getName();
				Object defaultValue = annotationAttribute.getDefaultValue();
				if (defaultValue != null
						&& !attributesMap.containsKey(attributeName)) {
					attributesMap.put(attributeName, defaultValue);
				}
			}

			// ???Annotation??????Annotation???
			Annotation[] metaAnnotations = annotationClass.getAnnotations();
			for (Annotation metaAnnotation : metaAnnotations) {
				this.metaAnnotations.add(metaAnnotation.annotationType()
						.getName());
			}
		}
		catch (ClassNotFoundException ex) {
		}
	}
}

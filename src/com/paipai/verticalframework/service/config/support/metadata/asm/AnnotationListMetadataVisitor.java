/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??AnnotationListMetadataVisitor.java					
 *			
 * Description??Annotation?б???Visitor		 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.metadata.asm;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

import org.objectweb.asm.AnnotationVisitor;
import org.objectweb.asm.Type;
import org.objectweb.asm.commons.EmptyVisitor;

import com.paipai.verticalframework.service.config.support.metadata.IAnnotationListMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IAnnotationMetadata;

/**
 * Annotation?б???Visitor
 * 
 * @author raywu
 * @see com.paipai.logicframework.config.support.metadata.asm.AnnotationMetadataVisitor
 * @version 1.0
 */
public abstract class AnnotationListMetadataVisitor extends EmptyVisitor
		implements AnnotationVisitor, IAnnotationListMetadata {

	private Map<String, IAnnotationMetadata> annotationMetadataMap = new LinkedHashMap<String, IAnnotationMetadata>();

	private ClassLoader classLoader;

	public AnnotationListMetadataVisitor(ClassLoader classLoader) {
		this.classLoader = classLoader;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.objectweb.asm.commons.EmptyVisitor#visitAnnotation(java.lang.String,
	 *      boolean)
	 */
	public AnnotationVisitor visitAnnotation(final String desc, boolean visible) {
		final String className = Type.getType(desc).getClassName();
		AnnotationMetadataVisitor visitor = new AnnotationMetadataVisitor(
				className, classLoader);
		this.annotationMetadataMap.put(visitor.getAnnotationClass(), visitor);
		return visitor;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.AnnotationListMetadata#getAnnotationMetadataMap()
	 */
	public Map<String, IAnnotationMetadata> getAnnotationMetadataMap() {
		return this.annotationMetadataMap;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.IAnnotationListMetadata#getAnnotationMetadataList()
	 */
	public Collection<IAnnotationMetadata> getAnnotationMetadataList() {
		return this.annotationMetadataMap.values();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.AnnotationListMetadata#getAnnotationMetadata(java.lang.String)
	 */
	public IAnnotationMetadata getAnnotationMetadata(String name) {
		return this.annotationMetadataMap.get(name);
	}
}

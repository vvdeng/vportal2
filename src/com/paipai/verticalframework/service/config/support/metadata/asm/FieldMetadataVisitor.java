/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??FieldMetadataVisitor.java					
 *			
 * Description?????????????????丽???Annotation???????Visitor	 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.metadata.asm;

import org.objectweb.asm.FieldVisitor;

import com.paipai.verticalframework.service.config.support.metadata.IFieldMetadata;

/**
 * ???????????????丽???Annotation???????Visitor
 * 
 * @author raywu
 * @version 1.0
 */
public class FieldMetadataVisitor extends AnnotationListMetadataVisitor
		implements FieldVisitor, IFieldMetadata {

	private String fieldName;

	public FieldMetadataVisitor(String fieldName, ClassLoader classLoader) {
		super(classLoader);
		this.fieldName = fieldName;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.FieldMetadata#getFieldName()
	 */
	public String getFieldName() {
		return fieldName;
	}
}

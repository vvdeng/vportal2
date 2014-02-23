/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??MethodMetadataVisitor.java					
 *			
 * Description??????????????丽???Annotation???????Visitor	 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.metadata.asm;

import org.objectweb.asm.MethodVisitor;

import com.paipai.verticalframework.service.config.support.metadata.IMethodMetadata;

/**
 * ????????????丽???Annotation???????Visitor
 * 
 * @author raywu
 * @version 1.0
 */
public class MethodMetadataVisitor extends AnnotationListMetadataVisitor
		implements MethodVisitor, IMethodMetadata {

	private String methodName;

	public MethodMetadataVisitor(String methodName, ClassLoader classLoader) {
		super(classLoader);
		this.methodName = methodName;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.MethodMetadata#getMethodName()
	 */
	public String getMethodName() {
		return methodName;
	}
}

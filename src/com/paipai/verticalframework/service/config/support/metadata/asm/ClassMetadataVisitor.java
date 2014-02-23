/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??ClassMetadataVisitor.java					
 *			
 * Description????????????丽???Annotation???????Visitor		 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.metadata.asm;

import java.util.ArrayList;
import java.util.List;

import org.objectweb.asm.ClassVisitor;
import org.objectweb.asm.FieldVisitor;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;
import org.springframework.util.ClassUtils;

import com.paipai.verticalframework.service.config.support.metadata.IClassMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IFieldMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IMethodMetadata;

/**
 * ??????????丽???Annotation???????Visitor
 * 
 * @author raywu
 * @version 1.0
 */
public class ClassMetadataVisitor extends AnnotationListMetadataVisitor
		implements ClassVisitor, IClassMetadata {

	private String className;

	private String classNameForShort;

	private boolean isInterface;

	private boolean isAbstract;

	private String enclosingClassName;

	private boolean independentInnerClass;

	private String superClassName;

	private String[] interfaces;

	private List<IFieldMetadata> fieldMetadtas = new ArrayList<IFieldMetadata>();
	private List<IMethodMetadata> methodMetadatas = new ArrayList<IMethodMetadata>();
	private ClassLoader classLoader;

	public ClassMetadataVisitor(ClassLoader classLoader) {
		super(classLoader);
		this.classLoader = classLoader;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.objectweb.asm.commons.EmptyVisitor#visit(int, int,
	 *      java.lang.String, java.lang.String, java.lang.String,
	 *      java.lang.String[])
	 */
	public void visit(int version, int access, String name, String signature,
			String supername, String[] interfaces) {
		this.className = ClassUtils.convertResourcePathToClassName(name);
		int index = className.lastIndexOf('.');
		if (index < 0) {
			this.classNameForShort = className;
		}
		else {
			this.classNameForShort = className.substring(index + 1);
		}
		this.isInterface = ((access & Opcodes.ACC_INTERFACE) != 0);
		this.isAbstract = ((access & Opcodes.ACC_ABSTRACT) != 0);
		if (supername != null) {
			this.superClassName = ClassUtils
					.convertResourcePathToClassName(supername);
		}
		this.interfaces = new String[interfaces.length];
		for (int i = 0; i < interfaces.length; i++) {
			this.interfaces[i] = ClassUtils
					.convertResourcePathToClassName(interfaces[i]);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.objectweb.asm.commons.EmptyVisitor#visitField(int,
	 *      java.lang.String, java.lang.String, java.lang.String,
	 *      java.lang.Object)
	 */
	public FieldVisitor visitField(int access, String name, String desc,
			String signature, Object value) {
		FieldMetadataVisitor visitor = new FieldMetadataVisitor(name,
				this.classLoader);

		this.fieldMetadtas.add(visitor);

		return visitor;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.objectweb.asm.commons.EmptyVisitor#visitMethod(int,
	 *      java.lang.String, java.lang.String, java.lang.String,
	 *      java.lang.String[])
	 */
	public MethodVisitor visitMethod(int access, String name, String desc,
			String signature, String[] exceptions) {
		MethodMetadataVisitor visitor = new MethodMetadataVisitor(name,
				this.classLoader);

		this.methodMetadatas.add(visitor);

		return visitor;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.objectweb.asm.commons.EmptyVisitor#visitOuterClass(java.lang.String,
	 *      java.lang.String, java.lang.String)
	 */
	public void visitOuterClass(String owner, String name, String desc) {
		this.enclosingClassName = ClassUtils
				.convertResourcePathToClassName(owner);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.objectweb.asm.commons.EmptyVisitor#visitInnerClass(java.lang.String,
	 *      java.lang.String, java.lang.String, int)
	 */
	public void visitInnerClass(String name, String outerName,
			String innerName, int access) {
		if (outerName != null
				&& this.className.equals(ClassUtils
						.convertResourcePathToClassName(name))) {
			this.enclosingClassName = ClassUtils
					.convertResourcePathToClassName(outerName);
			this.independentInnerClass = ((access & Opcodes.ACC_STATIC) != 0);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#getFieldMetadatas()
	 */
	public List<IFieldMetadata> getFieldMetadatas() {
		return this.fieldMetadtas;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#getMethodMetadatas()
	 */
	public List<IMethodMetadata> getMethodMetadatas() {
		return this.methodMetadatas;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#getClassName()
	 */
	public String getClassName() {
		return this.className;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#getClassNameForShort()
	 */
	public String getClassNameForShort() {
		return this.classNameForShort;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#isInterface()
	 */
	public boolean isInterface() {
		return this.isInterface;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#isAbstract()
	 */
	public boolean isAbstract() {
		return this.isAbstract;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#isConcrete()
	 */
	public boolean isConcrete() {
		return !(this.isInterface || this.isAbstract);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#isIndependent()
	 */
	public boolean isIndependent() {
		return (this.enclosingClassName == null || this.independentInnerClass);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#hasEnclosingClass()
	 */
	public boolean hasEnclosingClass() {
		return (this.enclosingClassName != null);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#getEnclosingClassName()
	 */
	public String getEnclosingClassName() {
		return this.enclosingClassName;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#hasSuperClass()
	 */
	public boolean hasSuperClass() {
		return (this.superClassName != null);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#getSuperClassName()
	 */
	public String getSuperClassName() {
		return this.superClassName;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.ClassMetadata#getInterfaceNames()
	 */
	public String[] getInterfaceNames() {
		return this.interfaces;
	}
}

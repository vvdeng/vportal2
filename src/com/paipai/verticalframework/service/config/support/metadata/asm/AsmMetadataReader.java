/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??AsmMetadataReader.java					
 *			
 * Description????????????ASM???		 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.metadata.asm;

import java.io.IOException;

import org.objectweb.asm.ClassReader;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import com.paipai.verticalframework.service.config.support.metadata.IClassMetadata;
import com.paipai.verticalframework.service.config.support.metadata.IMetadataReader;

/**
 * ??????????ASM???
 * 
 * @author raywu
 * @version 1.0
 */
public class AsmMetadataReader implements IMetadataReader {

	private final ResourceLoader resourceLoader;
	private ClassReader classReader;

	public AsmMetadataReader(Resource resource) throws IOException {
		this(null, resource);
	}

	public AsmMetadataReader(ClassLoader classLoader, Resource resource)
			throws IOException {
		this.resourceLoader = (classLoader != null ? new DefaultResourceLoader(
				classLoader) : new DefaultResourceLoader());
		this.classReader = new ClassReader(resource.getInputStream());
	}

	public IClassMetadata readMetadata() throws IOException {
		try {
			ClassMetadataVisitor visitor = new ClassMetadataVisitor(
					this.resourceLoader.getClassLoader());

			classReader.accept(visitor, 0);

			return visitor;
		}
		catch (Throwable t) {
			t.printStackTrace();
			return null;
		}
	}
}

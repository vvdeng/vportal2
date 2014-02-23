/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??IAnnotationListMetadata.java					
 *			
 * Description??Annotation?б??????????			 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.metadata;

import java.util.Collection;
import java.util.Map;

/**
 * Annotation?б??????????
 * 
 * @author raywu
 * @version 1.0
 */
public interface IAnnotationListMetadata {

	/**
	 * Annotation?б????
	 * 
	 * @return Map<String, AnnotationMetadata>
	 */
	Map<String, IAnnotationMetadata> getAnnotationMetadataMap();

	/**
	 * Annotation?б????
	 * 
	 * @return Collection<IAnnotationMetadata>
	 */
	Collection<IAnnotationMetadata> getAnnotationMetadataList();

	/**
	 * ???Annotation???
	 * 
	 * @param name
	 *            Annotation??
	 * @return AnnotationMetadata
	 */
	IAnnotationMetadata getAnnotationMetadata(String name);
}

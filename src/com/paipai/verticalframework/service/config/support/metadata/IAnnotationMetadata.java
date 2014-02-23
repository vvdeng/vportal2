/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??IAnnotationMetadata.java					
 *			
 * Description??Annotation??????????			
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.metadata;

import java.util.Map;
import java.util.Set;

/**
 * Annotation??????????
 * 
 * @author raywu
 * @version 1.0
 */
public interface IAnnotationMetadata {

	/**
	 * Annotation??????
	 * 
	 * @return String
	 */
	String getAnnotationClass();

	/**
	 * Annotation?????????
	 * 
	 * @return Map<String, Object>
	 */
	Map<String, Object> getAttributesMap();

	/**
	 * ??????Annotation???annotation???
	 * 
	 * @return Set<String>
	 */
	Set<String> getMetaAnnotations();

	/**
	 * ????????
	 * 
	 * @param name
	 *            ??????
	 * @return String
	 */
	Object getAttribute(String name);
}

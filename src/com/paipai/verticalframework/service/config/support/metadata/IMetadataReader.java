/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??IMetadataReader.java					
 *			
 * Description???????????		 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.metadata;

import java.io.IOException;

/**
 * ?????????
 * 
 * @author raywu
 * @version 1.0
 */
public interface IMetadataReader {

	/**
	 * ?????????????
	 * 
	 * @param resource
	 *            .class??????
	 * @return ClassMetadata
	 * @throws IOException
	 */
	IClassMetadata readMetadata() throws IOException;
}

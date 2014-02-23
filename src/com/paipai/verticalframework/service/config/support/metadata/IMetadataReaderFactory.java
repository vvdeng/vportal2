/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??IMetadataReaderFactory.java					
 *			
 * Description??MetadataReader???????		 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.metadata;

import java.io.IOException;

import org.springframework.core.io.Resource;

/**
 * MetadataReader???????
 * 
 * @author raywu
 * @see com.paipai.logicframework.config.support.metadata.IMetadataReader
 * @version 1.0
 */
public interface IMetadataReaderFactory {

	/**
	 * ????????Reader
	 * 
	 * @param resource
	 *            ??????
	 * @return IMetadataReader
	 * @throws IOException
	 */
	IMetadataReader create(Resource resource) throws IOException;
}

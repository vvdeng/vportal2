/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??DefaultMetadataReaderFactory.java					
 *			
 * Description?????????????????		 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.metadata.asm;

import java.io.IOException;
import java.util.Map;

import org.apache.commons.collections.map.ReferenceMap;
import org.springframework.core.io.Resource;

import com.paipai.verticalframework.service.config.support.metadata.IMetadataReader;
import com.paipai.verticalframework.service.config.support.metadata.IMetadataReaderFactory;

/**
 * ???????????????
 * 
 * @author raywu
 * @version 1.0
 */
public class DefaultMetadataReaderFactory implements IMetadataReaderFactory {

	private Map<Resource, IMetadataReader> readerMap = new ReferenceMap(
			ReferenceMap.HARD, ReferenceMap.SOFT);// ?????????map?????IMetadataReader?????????

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.logicframework.config.support.metadata.IMetadataReaderFactory#create(org.springframework.core.io.Resource)
	 */
	public IMetadataReader create(Resource resource) throws IOException {
		IMetadataReader reader = this.readerMap.get(resource);
		if (reader == null) {
			reader = new AsmMetadataReader(resource);
			this.readerMap.put(resource, reader);
		}
		return reader;
	}

}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??BeanMapContext.java					
 *			
 * Description??Bean????Context				 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.hql;

import java.util.Map;

import com.paipai.verticalframework.core.util.BeanUtils;
import com.paipai.verticalframework.log.Log;

/**
 * Bean????Context
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class BeanMapContext extends MapContext {

	public BeanMapContext(Map target) {
		super(target);
	}

	public BeanMapContext(Object bean) {
		try {
			Map<String, Object> map = BeanUtils.toMap(bean);
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				if (entry.getValue() instanceof Long) {
					add(entry.getKey(), entry.getValue(), LongEffect.ZERO_NULL);
				}
				else {
					add(entry.getKey(), entry.getValue());
				}
			}
		}
		catch (Exception e) {
			Log.logError("describe bean[" + bean + "] failed", e);
		}
	}
}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??AbstractEntity.java					
 *			
 * Description???????????е??????????????? 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-10-27   Create	
 */
package com.paipai.verticalframework.service.persistent;

import java.io.Serializable;

import com.paipai.verticalframework.core.ToStringSupport;

/**
 * ?????????е???????????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 */
public abstract class AbstractEntity extends ToStringSupport {

	protected abstract Serializable getEntityId();

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	public boolean equals(Object obj) {
		if (obj.getClass().isAssignableFrom(getClass())) {
			AbstractEntity entity = (AbstractEntity) obj;
			return getEntityId().equals(entity.getEntityId());
		}
		else {
			return false;
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return getEntityId().hashCode();
	}
}

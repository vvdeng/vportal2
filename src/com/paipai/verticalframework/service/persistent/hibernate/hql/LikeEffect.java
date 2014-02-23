/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??LikeEffect.java					
 *			
 * Description??????like????%?/???
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.hql;

import org.apache.commons.lang.StringUtils;

/**
 * ????like????%?/???
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public abstract class LikeEffect implements IEffect<String> {

	//?????
	public final static LikeEffect PREFIX = new 
	LikeEffect() {

		protected String doLikeEffect(String source) {
			return "%" + source;
		}
	};

	//??????
	public final static LikeEffect PARTIAL = new LikeEffect() {

		protected String doLikeEffect(String source) {
			return "%" + source + "%";
		}
	};

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.IEffect#doEffect(java.lang.Object)
	 */
	public String doEffect(String source) {
		if (!StringUtils.isEmpty(source)) {
			return doLikeEffect(source);
		}
		else {
			return source;
		}
	}

	protected abstract String doLikeEffect(String source);
}

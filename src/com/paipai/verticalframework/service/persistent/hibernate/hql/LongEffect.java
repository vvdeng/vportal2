/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??LongEffect.java					
 *			
 * Description??????long???
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.hql;

/** 
 * ????long???
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public abstract class LongEffect implements IEffect<Long>
{
	//??0??????NULL
	public final static LongEffect ZERO_NULL = new LongEffect()
	{
		protected boolean isMatchNullCondition(Long source)
		{
			return (Long.valueOf(0).equals(source));
		}
	};
	//??????????NULL
	public final static LongEffect NEGATIVE_NULL = new LongEffect()
	{
		protected boolean isMatchNullCondition(Long source)
		{
			return (source != null && source < 0L);
		}
	};
	
	/* (non-Javadoc)
	 * @see com.konceptusa.framework.core.IEffect#doEffect(java.lang.Object)
	 */
	public Long doEffect(Long source)
	{
		if (isMatchNullCondition(source))
		{
			return null;
		}
		else
		{
			return source;
		}
	}

	protected abstract boolean isMatchNullCondition(Long source);
}

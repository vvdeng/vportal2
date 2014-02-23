/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??HibernateQueryListCallback.java					
 *			
 * Description??Hibernat??????????							 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;

import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;

/**
 * Hibernat??????????
 * 
 * @author raywu (ayufox@gmail.com)
 */
public class HibernateQueryUniqueCallback extends HibernateQueryCallback {

	private int from;

	public HibernateQueryUniqueCallback(Hql hql, int from) {
		super(hql);
		this.from = from;
	}

	public HibernateQueryUniqueCallback(Hql hql) {
		this(hql, 0);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.common.persistent.HibernateQueryCallback#doInHibernate(org.hibernate.Query)
	 */
	public Object doInHibernate(Query query) throws HibernateException,
			SQLException {
		if (this.from > 0) {
			query.setFirstResult(this.from);
		}

		return getByList(query);
	}

	protected Object getByList(Query query) {
		List list = query.list();
		if (list.size() == 0) {
			return null;
		}
		else {
			return list.get(0);
		}
	}
}

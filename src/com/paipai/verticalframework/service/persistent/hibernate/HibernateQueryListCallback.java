/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??HibernateQueryListCallback.java					
 *			
 * Description??Hibernat?б??????							 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate;

import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Query;

import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;

/**
 * ?????б?
 * 
 * @author raywu (ayufox@gmail.com)
 */
public class HibernateQueryListCallback extends HibernateQueryCallback {

	private final static int DEFAULT_PAGE_SIZE = 20;
	private int from;
	private int offset;

	public HibernateQueryListCallback(Hql hql, int from, int offset) {
		super(hql);
		this.from = from;
		this.offset = offset;
	}

	public HibernateQueryListCallback(Hql hql) {
		this(hql, -1, -1);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.HibernateQueryCallback#doInHibernate(org.hibernate.Query)
	 */
	public Object doInHibernate(Query query) throws HibernateException,
			SQLException {
		if (this.from >= 0) {
			query.setFirstResult(this.from);
		}
		if (this.offset > 0) {
			query.setMaxResults(this.offset);
		}
		else if (this.offset == 0) {
			query.setMaxResults(DEFAULT_PAGE_SIZE);
		}
		return query.list();
	}
}

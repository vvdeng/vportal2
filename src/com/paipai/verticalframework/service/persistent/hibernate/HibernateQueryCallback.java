/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??HibernateQueryCallback.java					
 *			
 * Description??Hibernat??????								 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate;

import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;

/**
 * ??????
 * 
 * @author raywu (ayufox@gmail.com)
 */
public abstract class HibernateQueryCallback implements HibernateCallback {

	private Hql hql;

	protected Hql getHql() {
		return hql;
	}

	public HibernateQueryCallback(Hql hql) {
		this.hql = hql;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.orm.hibernate3.HibernateCallback#doInHibernate(org.hibernate.Session)
	 */
	public Object doInHibernate(Session session) throws HibernateException,
			SQLException {
		Query query = HibernateUtils.createQuery(session, hql);
		return doInHibernate(query);
	}

	/**
	 * ??в???
	 * 
	 * @param query
	 *            query????
	 * @return Object
	 * @throws HibernateException
	 * @throws SQLException
	 */
	public abstract Object doInHibernate(Query query)
			throws HibernateException, SQLException;
}

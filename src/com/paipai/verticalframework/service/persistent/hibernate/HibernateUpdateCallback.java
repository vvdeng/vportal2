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
public class HibernateUpdateCallback extends HibernateQueryCallback {

	

	public HibernateUpdateCallback(Hql hql) {
		super(hql);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.HibernateQueryCallback#doInHibernate(org.hibernate.Query)
	 */
	public Object doInHibernate(Query query) throws HibernateException,
			SQLException {
	
		return query.executeUpdate();
	}
}

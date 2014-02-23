/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??HibernateUtils.java					
 *			
 * Description??Hibernate??????						 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import org.hibernate.Query;
import org.hibernate.Session;

import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Parameter;

/**
 * Hibernate??????
 * 
 * @author raywu (ayufox@gmail.com)
 */
public class HibernateUtils {

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.HibernateUtils#setParameter(Query,
	 *      String, String)
	 */
	public static Query createQuery(Session session, Hql hql, int from) {
		Query query = createQuery(session, hql);
		if (from > 0) {
			query.setFirstResult(from);
		}
		return query;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.HibernateUtils#setParameter(Query,
	 *      String, String)
	 */
	public static Query createQuery(Session session, Hql hql, int from,
			int offset) {
		Query query = createQuery(session, hql, from);
		if (offset > 0) {
			query.setMaxResults(offset);
		}
		return query;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.HibernateUtils#setParameter(Query,
	 *      String, String)
	 */
	public static Query createQuery(Session session, Hql hql) {
		Query query = session.createQuery(hql.getHql());
		for (int i = 0; i < hql.getParameters().length; i++) {
			setParameter(query, hql.getParameters()[i]);
		}
		return query;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.HibernateUtils#setParameter(Query,
	 *      String, String)
	 */
	public static void setParameter(Query query, Parameter parameter) {
		setParameter(query, parameter.getName(), parameter.getValue());
	}

	/**
	 * ????????????в???????
	 * 
	 * @param query
	 *            query????
	 * @param name
	 *            ???????
	 * @param value
	 *            ?????
	 */
	public static void setParameter(Query query, String name, Object value) {
		if (value instanceof Timestamp) {
			query.setTimestamp(name, (Timestamp) value);
		}
		else if (value instanceof Time) {
			query.setTime(name, (Time) value);
		}
		else if (value instanceof Date) {
			query.setDate(name, (Date) value);
		}
		else if (value instanceof Object[]) {
			query.setParameterList(name, (Object[]) value);
		}
		else if (value instanceof long[]) {
			Collection list = new ArrayList();
			for (long item : (long[]) value) {
				list.add(item);
			}
			query.setParameterList(name, list);
		}
		else if (value instanceof double[]) {
			Collection list = new ArrayList();
			for (double item : (double[]) value) {
				list.add(item);
			}
			query.setParameterList(name, list);
		}
		else if (value instanceof int[]) {
			Collection list = new ArrayList();
			for (int item : (int[]) value) {
				list.add(item);
			}
			query.setParameterList(name, list);
		}
		else if (value instanceof float[]) {
			Collection list = new ArrayList();
			for (float item : (float[]) value) {
				list.add(item);
			}
			query.setParameterList(name, list);
		}
		else if (value instanceof Collection) {
			query.setParameterList(name, (Collection) value);
		}
		else {
			query.setParameter(name, value);
		}
	}
}

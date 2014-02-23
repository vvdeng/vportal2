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

import java.sql.Connection;
import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.springframework.orm.hibernate3.HibernateCallback;

/**
 * Hibernate-JDBC???
 * 
 * @author Ray
 */
public abstract class JdbcConnectionCallback<T> implements HibernateCallback {

	public Object doInHibernate(Session session) throws HibernateException,
			SQLException {
		session.flush();
		final ResultHolder result = new ResultHolder();
		session.doWork(new Work() {

			public void execute(Connection connection) throws SQLException {
				result.result = doInJdbc(connection);
			}
		});
		session.clear();
		return result.result;
	}

	public abstract T doInJdbc(Connection conn) throws SQLException;

	private class ResultHolder {

		T result;
	}
}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??JdbcUniqueResultCallback.java					
 *			
 * Description??JDBC????????ResultSet Callback						 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * JDBC????????ResultSet Callback
 * 
 * @author raywu (ayufox@gmail.com)
 * @param <T>
 */
public abstract class JdbcUniqueResultCallback<T> extends JdbcResultCallback<T> {

	public JdbcUniqueResultCallback(String sql) {
		super(sql);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.JdbcResultCallback#doInJdbc(java.sql.ResultSet)
	 */
	protected T doInJdbc(ResultSet rs) throws SQLException {
		if (rs.next()) {
			return getRow(rs);
		}
		else {
			return null;
		}
	}

	protected abstract T getRow(ResultSet rs) throws SQLException;
}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??JdbcResultCallback.java					
 *			
 * Description??JDBC???ResultSet Callback						 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * JDBC???ResultSet Callback
 * 
 * @author raywu (ayufox@gmail.com)
 * @param <T>
 */
public abstract class JdbcResultCallback<T> extends JdbcStatementCallback<T> {

	public JdbcResultCallback(String sql) {
		super(sql);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.JdbcStatementCallback#doInJdbc(java.sql.PreparedStatement)
	 */
	public T doInJdbc(PreparedStatement pstm) throws SQLException {
		setParameters(pstm);
		ResultSet rs = pstm.executeQuery();
		try {
			return doInJdbc(rs);
		}
		finally {
			rs.close();
		}
	}

	protected void setParameters(PreparedStatement pstm) throws SQLException {

	}

	protected abstract T doInJdbc(ResultSet rs) throws SQLException;
}

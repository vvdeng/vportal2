/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??JdbcStatementCallback.java					
 *			
 * Description??JDBC???Statement Callback						 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * JDBC???Statement Callback
 * 
 * @author raywu (ayufox@gmail.com)
 * @param <T>
 */
public abstract class JdbcStatementCallback<T> extends
		JdbcConnectionCallback<T> {

	private String sql;

	public JdbcStatementCallback(String sql) {
		this.sql = sql;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.JdbcConnectionCallback#doInJdbc(java.sql.Connection)
	 */
	public T doInJdbc(Connection conn) throws SQLException {
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(this.sql);
			return (T) doInJdbc(pstm);
		}
		finally {
			if (pstm != null) {
				pstm.close();
			}
		}
	}

	public abstract Object doInJdbc(PreparedStatement pstm) throws SQLException;
}

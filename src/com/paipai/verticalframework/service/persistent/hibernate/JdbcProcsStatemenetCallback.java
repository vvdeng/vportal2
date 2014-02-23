/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??JdbcProcsStatemenetCallback.java					
 *			
 * Description??JDBC???ResultSet Callback						 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * Hibernate ?洢???Callback
 * 
 * @author raywu (ayufox@gmail.com)
 * @param <T>
 */
public abstract class JdbcProcsStatemenetCallback<T> extends
		JdbcConnectionCallback<T> {

	private String sql;

	public JdbcProcsStatemenetCallback(String sql) {
		this.sql = sql;
	}

	public T doInJdbc(Connection conn) throws SQLException {
		CallableStatement cs = null;
		try {
			cs = conn.prepareCall(sql);
			return (T) doInJdbc(cs);
		}
		finally {
			if (cs != null) {
				cs.close();
			}
		}
	}

	public abstract T doInJdbc(CallableStatement pstm) throws SQLException;
}

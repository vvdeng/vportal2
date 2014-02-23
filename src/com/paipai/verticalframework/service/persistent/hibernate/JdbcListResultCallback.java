/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??JdbcListResultCallback.java					
 *			
 * Description??JDBC???ResultSet Callback						 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * JDBC????б?ResultSet Callback
 * 
 * @author raywu (ayufox@gmail.com)
 * @param <T>
 */
public abstract class JdbcListResultCallback<T> extends
		JdbcResultCallback<List> {

	public JdbcListResultCallback(String sql) {
		super(sql);
	}

	protected List<T> doInJdbc(ResultSet rs) throws SQLException {
		List<T> list = new ArrayList<T>();
		while (rs.next()) {
			list.add(getRow(rs));
		}
		return list;
	}

	protected abstract T getRow(ResultSet rs) throws SQLException;
}

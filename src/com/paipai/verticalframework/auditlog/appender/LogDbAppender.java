/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??LogDbAppender.java
 * 
 * Description????????DB?????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 16, 2010	????
 */
package com.paipai.verticalframework.auditlog.appender;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.sql.DataSource;

import com.paipai.verticalframework.auditlog.AuditLog;
import com.paipai.verticalframework.core.BaseRuntimeException;
import com.paipai.verticalframework.log.Log;

/**
 * ??????DB?????
 * ?????????LogAppender??????????????????DB??
 * @author sunniyang
 * @version 1.0
 * @see
 */
public class LogDbAppender implements LogAppender {

	/**
	 * ?????б????????
	 */
	private Map<String, DataSource> dataSources;
	/**
	 * ????????????
	 */
	private Map<String, String> tables;
	/**
	 * ??????????????dataSources????????4
	 */
	private DataSource defaultDs = null;
	/**
	 * ?????????tables????????4
	 */
	private String defaultTable = null;

	/**
	 * ?????????洢??DB????sysCode?????bizType???
	 * @param auditLog????????
	 * @see 
	 */
	@Override
	public void append(AuditLog auditLog) {
		if (auditLog == null) {
			return;
		}
		SimpleDateFormat valueFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		StringBuilder sBuilder = new StringBuilder();
		sBuilder.append(valueFormat.format(auditLog.getOpTime()) + "\t");
		sBuilder.append(auditLog.getSysCode() + "\t");
		sBuilder.append(auditLog.getLoginUser() + "\t");
		sBuilder.append(auditLog.getBizType() + "\t");
		sBuilder.append(auditLog.getBsnType() + "\t");
		sBuilder.append(auditLog.getKeyInfo() + "\t");
		sBuilder.append(auditLog.getOpDesc() + "\t");
		sBuilder.append(auditLog.getClientIp() + "\t");
		sBuilder.append(auditLog.getSessionId());
		Log.logDebug(sBuilder.toString());

		// ???????
		DataSource matchedDs = this.dataSources.get(auditLog.getSysCode());
		if (matchedDs == null) {
			matchedDs = this.defaultDs;
		}
		if (matchedDs == null) {
			Log.logError("Matched({0}) DataSource Not Found", auditLog
					.getSysCode());

			return;
		}

		// ???????????
		String tableName = this.tables.get(auditLog.getBizType().toString());
		if (tableName == null) {
			tableName = this.defaultTable;
		}

		if (tableName == null) {
			Log.logError("Matched({0}) TabledName Not Found", auditLog
					.getSysCode());

			return;
		}

		Connection con = null;
		PreparedStatement stmt = null;
		try {
			con = matchedDs.getConnection();

			sBuilder = new StringBuilder();
			sBuilder.append("insert into ").append(tableName);
			sBuilder
					.append("(op_time,sys_code,login_user,biz_type,bsn_type,key_info,op_desc,client_ip,session_id)");
			sBuilder.append(" values(?,?,?,?,?,?,?,?,?)");
			stmt = con.prepareStatement(sBuilder.toString());
			stmt.setTimestamp(1, new java.sql.Timestamp(auditLog.getOpTime()
					.getTime()));
			stmt.setString(2, auditLog.getSysCode() == null ? "" : auditLog
					.getSysCode());
			stmt.setString(3, auditLog.getLoginUser() == null ? "" : auditLog
					.getLoginUser());
			stmt.setLong(4, auditLog.getBizType() == null ? 0 : auditLog
					.getBizType());
			stmt.setString(5, auditLog.getBsnType() == null ? "" : auditLog
					.getBsnType());
			stmt.setString(6, auditLog.getKeyInfo());
			stmt.setString(7, auditLog.getOpDesc());
			stmt.setString(8, auditLog.getClientIp() == null ? "" : auditLog
					.getClientIp());
			stmt.setString(9, auditLog.getSessionId() == null ? "" : auditLog
					.getSessionId());
			stmt.executeUpdate();
		}
		catch (SQLException e) {
			throw new BaseRuntimeException(e);
		}
		finally {
			try {
				try {
					if (stmt != null)
						stmt.close();
				}
				catch (SQLException ex) {
					Log.logError("Error Close Statement", ex);
				}
				if (con != null) {
					con.close();
				}
			}
			catch (SQLException ex) {
				Log.logError("Error Close Resource", ex);
			}
		}
	}
	
	public void setDataSources(Map<String, DataSource> dataSources) {
		this.dataSources = new HashMap<String, DataSource>();
		Set<String> keyStrings = dataSources.keySet();
		for (String keyString : keyStrings) {
			DataSource ds = dataSources.get(keyString);
			String[] keys = keyString.split(",");
			for (String key : keys) {
				if (key.trim().equals("*")) {
					this.defaultDs = ds;
					continue;
				}
				this.dataSources.put(key.trim(), ds);
			}
		}
	}

	public void setTables(Map<String, String> tables) {
		this.tables = new HashMap<String, String>();
		Set<String> keyStrings = tables.keySet();
		for (String keyString : keyStrings) {
			String table = tables.get(keyString);
			String[] keys = keyString.split(",");
			for (String key : keys) {
				if (key.trim().equals("*")) {
					this.defaultTable = table;
					continue;
				}
				this.tables.put(key.trim(), table);
			}
		}
	}
}

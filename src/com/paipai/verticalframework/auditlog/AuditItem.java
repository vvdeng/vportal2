/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??AuditItem.java
 * 
 * Description???????????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 16, 2010	????
 */
package com.paipai.verticalframework.auditlog;

import com.paipai.verticalframework.core.ToStringSupport;

/**
 * ?????
 * @author sunniyang
 * @version 1.0
 * @see
 */
public class AuditItem extends ToStringSupport {

	public static final AuditItem OP_TIME = new AuditItem("OP_TIME");
	public static final AuditItem SYS_CODE = new AuditItem("SYS_CODE");
	public static final AuditItem LOGIN_USER = new AuditItem("LOGIN_USER");
	public static final AuditItem BIZ_TYPE = new AuditItem("BIZ_TYPE");
	public static final AuditItem BSN_TYPE = new AuditItem("BSN_TYPE");
	public static final AuditItem KEY_INFO = new AuditItem("KEY_INFO");
	public static final AuditItem OP_DESC = new AuditItem("OP_DESC");
	public static final AuditItem CLIENT_IP = new AuditItem("CLIENT_IP");
	public static final AuditItem SESSION_ID = new AuditItem("SESSION_ID");

	/**
	 * ???
	 */
	private String name;

	private AuditItem(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??AuditLog.java
 * 
 * Description??????????????????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 16, 2010	????
 */
package com.paipai.verticalframework.auditlog;

import java.util.Date;

import com.paipai.verticalframework.core.ToStringSupport;

/**
 * ?????????
 * @author sunniyang
 * @version 1.0
 * @see
 */
public class AuditLog extends ToStringSupport {

	/**
	 * ???id
	 */
	private long logId;
	/**
	 * ???????
	 */
	private Date opTime;
	/**
	 * ??????
	 */
	private String sysCode;
	/**
	 * ??????
	 */
	private String loginUser;
	/**
	 * ???????
	 */
	private Long bizType;
	/**
	 * ???????
	 */
	private String bsnType;
	/**
	 * ??????
	 */
	private String opResult;
	/**
	 * ??????
	 */
	private String keyInfo;
	/**
	 * ????????
	 */
	private String opDesc;
	/**
	 * ?????IP
	 */
	private String clientIp;
	/**
	 * ??id
	 */
	private String sessionId;

	public long getLogId() {
		return logId;
	}

	void setLogId(long logId) {
		this.logId = logId;
	}

	public Date getOpTime() {
		return opTime;
	}

	void setOpTime(Date opTime) {
		this.opTime = opTime;
	}

	public String getSysCode() {
		return sysCode;
	}

	void setSysCode(String sysCode) {
		this.sysCode = sysCode;
	}

	public String getLoginUser() {
		return loginUser;
	}

	void setLoginUser(String loginUser) {
		this.loginUser = loginUser;
	}

	public Long getBizType() {
		return bizType;
	}

	void setBizType(Long bizType) {
		this.bizType = bizType;
	}

	public String getBsnType() {
		return bsnType;
	}

	void setBsnType(String bsnType) {
		this.bsnType = bsnType;
	}

	public String getOpResult() {
		return opResult;
	}

	void setOpResult(String opResult) {
		this.opResult = opResult;
	}

	public String getKeyInfo() {
		return keyInfo;
	}

	void setKeyInfo(String keyInfo) {
		this.keyInfo = keyInfo;
	}

	public String getOpDesc() {
		return opDesc;
	}

	void setOpDesc(String opDesc) {
		this.opDesc = opDesc;
	}

	public String getClientIp() {
		return clientIp;
	}

	void setClientIp(String clientIp) {
		this.clientIp = clientIp;
	}

	public String getSessionId() {
		return sessionId;
	}

	void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
}

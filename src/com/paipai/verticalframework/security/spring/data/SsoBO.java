/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??SsoBO.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2011-1-12			????
 */
package com.paipai.verticalframework.security.spring.data;

import com.paipai.boss.common.core.ToStringSupport;


/** 
 * <??????>
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class SsoBO extends ToStringSupport{
	private boolean reload = false;
	private String token;
	private long timestamp;
	private String username;
	private String systemId;
	
	public boolean isReload() {
		return reload;
	}
	
	public void setReload(boolean reload) {
		this.reload = reload;
	}
	
	public String getToken() {
		return token;
	}
	
	public void setToken(String token) {
		this.token = token;
	}
	
	public long getTimestamp() {
		return timestamp;
	}
	
	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getSystemId() {
		return systemId;
	}
	
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
}

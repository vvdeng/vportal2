/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??UserVo.class				
 *			
 * Description???????????		 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0   raywu  2010-11-09  Create	
 */
package com.paipai.verticalframework.security;

import com.paipai.verticalframework.core.ToStringSupport;

/**
 * ?????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class UserVo extends ToStringSupport {

	private String username;

	public UserVo(String username) {
		super();
		this.username = username;
	}

	public UserVo() {
		super();
	}

	public String getUsername() {
		return username;
	}
}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??LoginForwardForm.class				
 *			
 * Description?????????????? 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0   raywu  2010-11-09  Create	
 */
package com.paipai.verticalframework.security.spring;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.AutoPopulatingList;

import com.paipai.verticalframework.core.ToStringSupport;
import com.paipai.verticalframework.security.spring.data.AccountBO;
import com.paipai.verticalframework.security.spring.data.PrivilegeBO;
import com.paipai.verticalframework.security.spring.data.UserBO;

/**
 * ????????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class LoginForwardForm extends ToStringSupport {

	private List<String> functions = new ArrayList<String>();
	private AccountBO accountBO = new AccountBO();
	{
		accountBO.setPrivileges(new AutoPopulatingList(PrivilegeBO.class));
		accountBO.setUserBO(new UserBO());
	}

	public List<String> getFunctions() {
		return functions;
	}

	public void setFunctions(List<String> functions) {
		this.functions = functions;
	}

	public AccountBO getAccountBO() {
		return accountBO;
	}

	public void setAccountBO(AccountBO accountBO) {
		this.accountBO = accountBO;
	}
}

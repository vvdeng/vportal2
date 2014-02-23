package com.paipai.verticalframework.security.spring.data;

import java.io.Serializable;
import java.util.List;

import com.paipai.boss.common.util.MD5;

public class AccountBO implements Serializable {

	private UserBO userBO = null;

	private List<PrivilegeBO> privileges = null;

	public AccountBO() {
		super();
	}

	public AccountBO(UserBO userBO, List<PrivilegeBO> privileges) {
		super();
		this.userBO = userBO;
		this.privileges = privileges;
	}

	public String getCryptPassword() {
		if (userBO == null || userBO.getPassword() == null) {
			return null;
		}
		return MD5.crypt(userBO.getPassword());
	}

	public UserBO getUserBO() {
		return userBO;
	}

	public void setUserBO(UserBO userBO) {
		this.userBO = userBO;
	}

	public List<PrivilegeBO> getPrivileges() {
		return privileges;
	}

	public void setPrivileges(List<PrivilegeBO> privileges) {
		this.privileges = privileges;
	}

}

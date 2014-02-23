/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??DatabaseSecurityDataService.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2011-1-12			????
 */
package com.paipai.verticalframework.security.spring.data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcDaoSupport;

import com.paipai.verticalframework.security.spring.data.PrivilegeBO;
import com.paipai.verticalframework.security.spring.data.UserBO;

/**
 * <??????>
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class DatabaseSecurityDataService extends NamedParameterJdbcDaoSupport
		implements SecurityDataService {

	public UserBO loadUser(String system, String username) {
		String sql = "SELECT SYSTEM_ID as systemId,USER_NAME as userName,PASSWORD as password, DESCRIPTION as description,"
				+ "LOGIN_TYPE FROM BOSS_USER U WHERE U.SYSTEM_ID = :systemId and  U.USER_NAME = :username";
		Map namedParameters = new HashMap();
		namedParameters.put("systemId", system);
		namedParameters.put("username", username);
		List<UserBO> users = getNamedParameterJdbcTemplate().query(sql,
				namedParameters, new BeanPropertyRowMapper(UserBO.class));
		if (users.size() > 0) {
			return users.get(0);
		} else {
			return null;
		}
	}

	public List<PrivilegeBO> loadPrivileges(String system, String username) {
		String sql = "SELECT DISTINCT A.SYSTEM_ID as systemId, A.PRIVILEGE_ID as privilegeId, A.PRIVILEGE_NAME as privilegeName, "
				+ "A.PARENT_ID as parentId, A.MENU_URL as menuUrl,A.PLEVEL as pLevel,A.VIEW_TYPE as viewType," +
						"A.SUB_MENU_URLS as subMenuUrls, A.ORDER_ID as orderId "
				+ "FROM BOSS_PRIVILEGE A,BOSS_GROUP_USER_REL B,BOSS_PRIVILEGE_GROUP_REL C "
				+ "WHERE A.PRIVILEGE_ID = C.PRIVILEGE_ID "
				+ "AND A.SYSTEM_ID = B.SYSTEM_ID "
				+ "AND B.SYSTEM_ID = C.SYSTEM_ID  "
				+ "AND B.GROUP_ID = C.GROUP_ID "
				+ "AND B.SYSTEM_ID = :systemId" + " AND B.USER_NAME = :username "
				+ "ORDER BY A.ORDER_ID,A.PRIVILEGE_ID";
		Map namedParameters = new HashMap();
		namedParameters.put("systemId", system);
		namedParameters.put("username", username);
		return getNamedParameterJdbcTemplate().query(sql,
				namedParameters, new BeanPropertyRowMapper(PrivilegeBO.class));
	}
}

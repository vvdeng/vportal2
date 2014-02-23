/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??OrderBy.java					
 *			
 * Description?????????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.hql;

import com.paipai.verticalframework.service.persistent.Order;

/**
 * ???????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class OrderBy {

	public final static String DESC = "desc";

	public final static String ASC = "asc";

	private Order order;

	public OrderBy(Order order) {
		this.order = order;
	}

	/**
	 * ????order???
	 * 
	 * @param alias
	 *            ????
	 * @return String
	 */
	public String buildOrder(String alias) {
		if (alias == null || alias.length() == 0) {
			return this.order.getProperty() + " " + this.order.getOrder();
		}
		return alias + "." + this.order.getProperty() + " "
				+ this.order.getOrder();
	}
}

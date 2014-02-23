/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??Order.java					
 *			
 * Description?????? 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-10-27   Create	
 */
package com.paipai.verticalframework.service.persistent;

/**
 * ????
 * 
 * @author raywu (ayufox@gmail.com)
 */
public class Order {

	public final static String DESC = "desc";
	public final static String ASC = "asc";
	public static final Order DEFAULT_ORDER = new Order("id", DESC);
	private String property;
	private String order;

	public Order(String property, String order) {
		this.property = property;
		this.order = order;
	}

	public Order(String property) {
		this(property, ASC);
	}

	public String getOrder() {
		return order;
	}

	public String getProperty() {
		return property;
	}
}

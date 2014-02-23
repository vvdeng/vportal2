/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??Page.java					
 *			
 * Description?????????????漰????????????????????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0      raywu  2010-09-28   Create	
 */
package com.paipai.verticalframework.core.vo;

import java.io.Serializable;
import java.util.Collection;

import com.paipai.verticalframework.core.ToStringSupport;

/**
 * ???????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class Page<T> extends ToStringSupport implements Serializable {

	private static final long serialVersionUID = 1964185396193351285L;

	private int count;

	private Collection<T> list;

	public Page(int count, Collection<T> list) {
		this.count = count;
		this.list = list;
	}

	public Page(Collection<T> list) {
		this(list.size(), list);
	}

	public Page() {
	}

	public int getCount() {
		return count;
	}

	public Collection<T> getList() {
		return list;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public void setList(Collection<T> list) {
		this.list = list;
	}
}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??MapContext.java					
 *			
 * Description?????Map???Context
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.hql;

import java.util.HashMap;
import java.util.Map;

/** 
 * ???Map???Context
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class MapContext implements Context
{
	private Map context = new HashMap();

	public MapContext()
	{
	}

	public MapContext(Map target)
	{
		if (target != null)
		{
			this.context = target;
		}
	}
	
	/**
	 * ???????context
	 * @param name : ???
	 * @param value : ?
	 * @see ?ο???JavaDoc
	 */
	public void add(String name, Object value)
	{
		this.context.put(name, value);
	}
	
	/**
	 * ???????context??????????Effect????????
	 * @param name : ???
	 * @param value : ?
	 * @param effect : Effect
	 * @see ?ο???JavaDoc
	 */
	public void add(String name, Object value, IEffect effect)
	{
		if (effect != null)
		{
			value = effect.doEffect(value);
		}
		add(name, value);
	}

	/**
	 * ???Context?
	 * @param name : ???
	 * @return Object
	 * @see ?ο???JavaDoc
	 */
	public Object get(String name)
	{
		return this.context.get(name);
	}
}

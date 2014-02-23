/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??XHqlCompileExecutor.java					
 *			
 * Description??HQL???????????????)?
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.hql.ast;

import java.util.ArrayList;
import java.util.List;

import antlr.collections.AST;

import com.paipai.verticalframework.service.persistent.Order;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Context;
import com.paipai.verticalframework.service.persistent.hibernate.hql.OrderBy;

/** 
 * HQL????????????)?
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class XHqlCompileExecutor extends HqlCompileExecutor
{
	private String alias;
	private Order order;
	
	protected List<Range> ranges = new ArrayList<Range>();
	
	public XHqlCompileExecutor(AST root, Context context, Order order, String alias)
	{
		init(root, context, order, alias);
	}
	
	public XHqlCompileExecutor(AST root, Context context, Order order)
	{
		init(root, context, order, null);
	}
	
	public XHqlCompileExecutor(AST root, Context context)
	{
		init(root, context, null, null);
	}
	
	protected XHqlCompileExecutor()
	{
	}
	
	protected void init(AST root, Context context, Order order, String alias)
	{
		super.init(root, context);
		this.order = order;
		this.alias = alias;
	}
	
	protected String buildHql()
	{
		String hql = super.buildHql();
		if (this.order != null && this.order.getProperty() != null && this.order.getProperty().length() > 0)
		{
			String orderStr = buildOrderString();
			hql += " order by " + orderStr;
		}
		return hql;
	}
	
	private String buildOrderString()
	{
		if (this.alias == null && this.ranges.size() == 1)
		{
			alias = this.ranges.get(0).getAlias();
		}
		return new OrderBy(this.order).buildOrder(alias);
	}

	protected void printORDER(StringBuilder buffer, AST ast)
	{
		super.printORDER(buffer, ast);
		if (this.order != null && this.order.getProperty() != null && this.order.getProperty().length() > 0)
		{
			buffer.append("," + buildOrderString());
			this.order = null;
		}
	}
	
	protected void printRANGE(StringBuilder buffer, AST ast)
	{
		AST first = ast.getFirstChild();
		AST second = first.getNextSibling();
		
		int length = buffer.length();
		print(buffer, first);
		String entity = buffer.substring(length);
		String alias = null;
		if (second != null)
		{
			buffer.append(" ");
			length = buffer.length();
			print(buffer, second);
			alias = buffer.substring(length);
		}
		this.ranges.add(new Range(entity, alias));
		
		AST next = ast.getNextSibling();
		if (next != null && next.getType() == RANGE)
		{
			buffer.append(",");
		}
	}

	public static class Range
	{
		private String entity;
		private String alias;

		public Range(String entity, String alias)
		{
			this.entity = entity;
			this.alias = alias;
		}

		public String getAlias()
		{
			return alias;
		}

		public String getEntity()
		{
			return entity;
		}
	}
}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??XHqlCompilerImpl.java					
 *			
 * Description??HQL????????????)?
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.hql.ast;

import antlr.collections.AST;

import com.paipai.verticalframework.service.persistent.Order;
import com.paipai.verticalframework.service.persistent.hibernate.hql.BeanMapContext;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Context;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;
import com.paipai.verticalframework.service.persistent.hibernate.hql.IXHqlCompiler;
import com.paipai.verticalframework.service.persistent.hibernate.hql.IllegalSyntaxException;

/**
 * HQL????????????)?
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class XHqlCompilerImpl extends HqlCompilerImpl implements IXHqlCompiler {

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.hqlx.IXHqlCompiler#build(java.lang.String,
	 *      com.konceptusa.framework.core.Context,
	 *      com.konceptusa.framework.core.dao.hql.vo.Order, java.lang.String)
	 */
	public Hql compile(String hql, Object bean, Order order, String alias) {
		Context context = new BeanMapContext(bean);
		hql = prepare(hql, context);
		return doCompile(hql, context, order, alias);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.hqlx.IXHqlCompiler#build(java.lang.String,
	 *      com.konceptusa.framework.core.Context,
	 *      com.konceptusa.framework.core.dao.hql.vo.Order, java.lang.String)
	 */
	public Hql compile(String hql, Context context, Order order, String alias) {
		hql = prepare(hql, context);
		return doCompile(hql, context, order, alias);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.hqlx.IHqlCompiler#build(java.lang.String,
	 *      com.konceptusa.framework.core.Context)
	 */
	public Hql compile(String hql, Context context) {
		hql = prepare(hql, context);
		return doCompile(hql, context, null, null);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.hqlx.IXHqlCompiler#compile(java.lang.String,
	 *      com.konceptusa.framework.core.Context,
	 *      com.konceptusa.framework.core.dao.hql.vo.Order)
	 */
	public Hql compile(String hql, Object bean, Order order) {
		Context context = new BeanMapContext(bean);
		hql = prepare(hql, context);
		return doCompile(hql, context, order, null);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.hqlx.IXHqlCompiler#compile(java.lang.String,
	 *      com.konceptusa.framework.core.Context,
	 *      com.konceptusa.framework.core.dao.hql.vo.Order)
	 */
	public Hql compile(String hql, Context context, Order order) {
		hql = prepare(hql, context);
		return doCompile(hql, context, order, null);
	}

	protected Hql doCompile(String hql, Context context, Order order,
			String alias) {
		if (hql == null || context == null) {
			throw new IllegalArgumentException("hql or context can't be null");
		}

		AST ast = getRootAST(hql);
		
		HqlCompileExecutor compilerContext = createExecutor(context, order,
				alias, ast);
		return compilerContext.build();
	}

	protected XHqlCompileExecutor createExecutor(Context context, Order order,
			String alias, AST ast) {
		return new XHqlCompileExecutor(ast, context, order, alias);
	}

	protected static String prepare(String hql, Context context) {
		int lastindex = 0;
		int from = 0;
		int to = 0;
		while (true) {
			from = hql.indexOf('{', lastindex);
			if (from < 0) {
				break;
			}
			to = hql.indexOf('}', from);
			if (to < 0) {
				throw new IllegalSyntaxException("{ and } not pair");
			}

			String compare = hql.substring(from + 1, to);
			hql = hql.replaceAll("\\{" + compare + "\\}", "=");

			lastindex = from;
		}
		return hql;
	}
}

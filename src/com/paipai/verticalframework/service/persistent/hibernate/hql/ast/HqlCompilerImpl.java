/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??HqlCompilerImpl.java					
 *			
 * Description??HQL????????????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.hql.ast;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.Map;

import org.apache.commons.collections.map.LRUMap;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.hql.ast.HqlParser;

import antlr.RecognitionException;
import antlr.TokenStreamException;
import antlr.collections.AST;

import com.paipai.verticalframework.service.persistent.hibernate.hql.BeanMapContext;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Context;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;
import com.paipai.verticalframework.service.persistent.hibernate.hql.IHqlCompiler;
import com.paipai.verticalframework.service.persistent.hibernate.hql.IllegalSyntaxException;

/**
 * HQL????????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class HqlCompilerImpl implements IHqlCompiler {

	private final static Log LOG = LogFactory.getLog(HqlCompilerImpl.class);

	private Map astCache = new LRUMap(1000);

	public void setAstCache(Map astCache) {
		this.astCache = astCache;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.hqlx.IHqlCompiler#compile(java.lang.String,
	 *      java.lang.Object[])
	 */
	public Hql compile(String hql, Object value) {
		return compile(hql, new BeanMapContext(value));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.konceptusa.framework.core.dao.hqlx.IHqlCompiler#compile(java.lang.String,
	 *      com.konceptusa.framework.core.Context)
	 */
	public Hql compile(String hql, Context context) {
		
		if (hql == null || context == null) {
			throw new IllegalArgumentException("hql or context can't be null");
		}

		AST ast = getRootAST(hql);
		
		HqlCompileExecutor compilerContext = new HqlCompileExecutor(ast,
				context);
		return compilerContext.build();
	}

	protected AST getRootAST(String hql) {
		AST ast = (AST) this.astCache.get(hql);
		if (ast == null) {
			ast = createAST(hql);
			this.astCache.put(hql, ast);
			if (LOG.isDebugEnabled()) {
				LOG.debug("get ast[" + ast + "] from cache for hql[" + hql
						+ "]");
			}
		}
		return ast;
	}

	private AST createAST(String hql) {
		HqlParser parser = HqlParser.getInstance(hql);
		try {
			parser.statement();
		}
		catch (RecognitionException e) {
			throw new IllegalSyntaxException(e);
		}
		catch (TokenStreamException e) {
			throw new IllegalSyntaxException(e);
		}
		AST ast = parser.getAST();
		parser.getParseErrorHandler().throwQueryException();
		if (LOG.isDebugEnabled()) {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			parser.showAst(ast, new PrintStream(baos));
			LOG.debug("AST:" + new String(baos.toByteArray()));
		}
		return ast;
	}
}

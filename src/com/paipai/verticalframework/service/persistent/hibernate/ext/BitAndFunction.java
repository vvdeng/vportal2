/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??BitAndFunction.java					
 *			
 * Description??mysql??????????					 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate.ext;

import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.QueryException;
import org.hibernate.dialect.function.SQLFunction;
import org.hibernate.engine.Mapping;
import org.hibernate.engine.SessionFactoryImplementor;
import org.hibernate.type.Type;

/**
 * mysql??????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 */
public class BitAndFunction implements SQLFunction {

	public Type getReturnType(Type type, Mapping mapping) {
		return Hibernate.LONG;
	}

	public boolean hasArguments() {
		return true;
	}

	public boolean hasParenthesesIfNoArguments() {
		return true;
	}

	public String render(List args, SessionFactoryImplementor factory)
			throws QueryException {
		if (args.size() != 2) {
			throw new IllegalArgumentException(
					"BitAndFunction requires 2 arguments!");
		}
		return args.get(0).toString() + " & " + args.get(1).toString();

	}
}

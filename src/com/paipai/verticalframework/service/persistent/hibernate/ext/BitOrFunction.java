/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??BitOrFunction.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2011-1-12			????
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
 * <??????>
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class BitOrFunction implements SQLFunction {

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
		return args.get(0).toString() + " | " + args.get(1).toString();

	}
}

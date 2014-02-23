/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??ObjectCallback.java
 * 
 * Description??????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Dec 6, 2010			????
 */
package com.paipai.verticalframework.util.dataparse;

import java.util.Map;

import com.paipai.verticalframework.log.Log;


/** 
 * ????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 */
public abstract class ObjectCallback<T> extends AbstractCallback<T> {
	
	public ObjectCallback(Map<Integer, String> propertyMap) {
		super(propertyMap);
	}
	
	@Override
	public void begin() {
		// do nothing
	}
	
	@Override
	public void visit(Object[] data, int line) {
		T t = null;
		try {
			t = this.parse(data);
		}
		catch (Exception e) {
			Log.logError("excel???????????????????");
			this.handleErrorData(data, line);
		}
		if (t != null) {
			this.handleObject(t, line);
		}
	}
	
	@Override
	public void end() {
		// do nothing
	}
	
	protected abstract void handleObject(T t, int line);
	
	protected abstract void handleErrorData(Object[] data, int line);
}

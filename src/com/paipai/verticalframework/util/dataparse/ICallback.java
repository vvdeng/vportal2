/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??ICallback.java
 * 
 * Description????????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Dec 6, 2010			????
 */
package com.paipai.verticalframework.util.dataparse;


/** 
 * ??????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 */
public interface ICallback {
	
	public void begin();
	
	public void visit(Object[] data, int line);
	
	public void end();
}

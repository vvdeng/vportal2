/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??ListCallback.java
 * 
 * Description???б?????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Dec 6, 2010			????
 */
package com.paipai.verticalframework.util.dataparse;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.paipai.verticalframework.log.Log;


/** 
 * ?б?????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 */
public abstract class ListCallback<T> extends AbstractCallback<T> {
	
	private int batchSize = 0;
	private List<T> buffer = new ArrayList<T>();
	private List<LineData> failedDataList = new ArrayList<LineData>();
	private int startLine = 0;
	private int endLine = 0;
	
	public ListCallback() {
		this(null, 0);
	}
	
	public ListCallback(Map<Integer, String> propertyMap) {
		this(propertyMap, 0);
	}
	
	public ListCallback(Map<Integer, String> propertyMap, int batchSize) {
		super(propertyMap);
		this.batchSize = batchSize;
	}
	
	@Override
	public void begin() {
		this.buffer = new ArrayList<T>();
		this.failedDataList = new ArrayList<LineData>();
		this.startLine = 0;
		this.endLine = 0;
	}
	
	@Override
	public void visit(Object[] data, int line) {
		T t = null;
		try {
			t = parse(data);
			if (t != null) {
				this.buffer.add(t);
				if (this.buffer.size() == 1)
					this.startLine = line;
				this.endLine = line;
			}
		}
		catch (Exception e) {
			Log.logError("excel???????????????????");
			this.failedDataList.add(new LineData(line, data));
		}
		if (this.batchSize > 0) {
			// ??????????????С??????????????????
			if (this.buffer.size() == this.batchSize) {
				this.handleList(this.buffer, this.startLine, this.endLine);
				if (this.failedDataList.size() > 0) {
					this.handleErrorDatas(this.failedDataList);
				}
				this.begin();
			}
		}
	}
	
	@Override
	public void end() {
		if (this.buffer.size() > 0) {
			this.handleList(this.buffer, this.startLine, this.endLine);
		}
		if (this.failedDataList.size() > 0) {
			this.handleErrorDatas(this.failedDataList);
		}
	}
	
	protected abstract void handleList(List<T> list, int startLine, int endLine);
	
	protected abstract void handleErrorDatas(List<LineData> datas);
}

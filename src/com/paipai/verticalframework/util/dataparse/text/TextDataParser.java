/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??TextDataParser.java
 * 
 * Description??TXT???????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Dec 6, 2010			????
 */
package com.paipai.verticalframework.util.dataparse.text;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.paipai.verticalframework.util.dataparse.ICallback;
import com.paipai.verticalframework.util.dataparse.IDataParser;
import com.paipai.verticalframework.log.Log;


/** 
 * TXT???????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 */
public class TextDataParser implements IDataParser {
	
	private static final String TAB = "\t";
	private static final String VERTICAL = "|";
	private static final String DECRATE_VERTICAL = "\\|";
	private static final String COMMA = ",";
	
	private int startLine = 0;
	private String seprate = TAB+VERTICAL+DECRATE_VERTICAL+VERTICAL+COMMA;
	
	public TextDataParser(int startLine) {
		this(startLine, (String[]) null);
	}
	
	public TextDataParser(int startLine, String... seprates) {
		this.startLine = startLine;
		if (seprates != null) {
			String seps = null;
			for (String sep : seprates) {
				if (sep.equals(VERTICAL))
					sep = DECRATE_VERTICAL;
				if (seps == null)
					seps = sep;
				else
					seps += (VERTICAL + sep);
			}
			if (seps != null && seps.length() != 0) {
				this.seprate = seps;
			}
		}
	}
	
	@Override
	public void parse(InputStream in, ICallback callback) {
		BufferedReader reader = new BufferedReader(new InputStreamReader(in));
		try {
			int line = 0;
			while (line < this.startLine && reader.readLine() != null) {
				line++;
			}
			if (line < this.startLine)
				return;
			
			callback.begin();
			
			String lineContent = null;
			while ((lineContent = reader.readLine()) != null) {
				String[] data = this.readLineData(lineContent, line);
				if (data != null)
					callback.visit(data, line);
				line++;
			}
			
			callback.end();
		}
		catch (Exception e) {
			Log.logError(e.getMessage());
			e.printStackTrace();
		}
	}
	
	private String[] readLineData(String lineContent, int line) {
		if (lineContent == null || lineContent.length() == 0)
			return null;
		String[] data = lineContent.split(this.seprate);
		for (int i = 0; i < data.length; i++)
			data[i] = data[i].trim();
		return data;
	}
	
	public int getStartLine() {
		return startLine;
	}
	
	public void setStartLine(int startLine) {
		this.startLine = startLine;
	}
}

/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??ExcelDataParser.java
 * 
 * Description??Excel???????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Dec 6, 2010			????
 */
package com.paipai.verticalframework.util.dataparse.excel;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import com.paipai.verticalframework.util.dataparse.ICallback;
import com.paipai.verticalframework.util.dataparse.IDataParser;
import com.paipai.verticalframework.log.Log;


/** 
 * Excel???????????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 */
public class ExcelDataParser implements IDataParser {
	
	private int startLine = 0;
	
	public ExcelDataParser(int startLine) {
		this.startLine = startLine;
	}
	
	@Override
	public void parse(InputStream in, ICallback callback) {
		Workbook wb = null;
		try {
			callback.begin();
			
			wb = WorkbookFactory.create(in);
			int sheetNumber = wb.getNumberOfSheets();
			for (int i = 0; i < sheetNumber; i++) {
				Sheet sheet = wb.getSheetAt(i);
				int line = this.startLine;
				Row row = null;
				while ((row = sheet.getRow(line)) != null) {
					Object[] data = this.readLineData(row);
					if (data != null)
						callback.visit(data, line);
					line++;
				}
			}
			
			callback.end();
		}
		catch (Exception e) {
			Log.logError(e.getMessage());
		}
		finally {
			try {
				in.close();
			}
			catch(Exception ex) {}
		}
	}
	
	private Object[] readLineData(Row row) {
		if (row == null)
			return null;
		List<Object> dataList = new ArrayList<Object>();
		for (Cell cell : row) {
			switch (cell.getCellType()) {
				case Cell.CELL_TYPE_BOOLEAN:
					// ???Boolean????????
					dataList.add(cell.getBooleanCellValue());
					break;
				case Cell.CELL_TYPE_NUMERIC:
					if (DateUtil.isCellDateFormatted(cell)) {
						// ?????????
						dataList.add(cell.getDateCellValue());
					} else {
						// ???????
						dataList.add(cell.getNumericCellValue());
					}
					break;
				case Cell.CELL_TYPE_STRING:
					// ???String
					dataList.add(cell.getRichStringCellValue().toString());
					break;
				case Cell.CELL_TYPE_BLANK:
					// ???
					dataList.add("");
					break;
			}
		}
		return dataList.toArray();
	}
	
	public int getStartLine() {
		return startLine;
	}
	
	public void setStartLine(int startLine) {
		this.startLine = startLine;
	}
}

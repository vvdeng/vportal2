/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??StyleManager.java
 * 
 * Description??Excel?????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-25			????
 */
package com.paipai.verticalframework.web.excel;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;

/**
 * Excel?????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class ExcelStyleManager {

	private Map<String, ExcelStyle> styles = new HashMap<String, ExcelStyle>();

	public ExcelStyleManager() {
		super();
	}
	
	public void addStyles(Map<String, ExcelStyle> styles)
	{
		this.styles.putAll(styles);
	}
	
	public void addStyle(ExcelStyle style)
	{
		this.styles.put(style.getName(), style);
	}

	public HSSFCellStyle getExcelStyle(HSSFWorkbook wb, String name) {
		ExcelStyle style = this.styles.get(name);
		if (style == null) {
			return null;
		}
		return this.getStyle(wb, style);
	}
	
	// ?????????POI????????color?????????
	// ffff:0:0???red
	// 0:ffff:0???green
	// 0:0:ffff???blue
	private short getPoiColorIndex(String color, short defaultColor) {
		if (color == null)
			return defaultColor;
		String upperColor = color.toUpperCase();
		Hashtable colorHash = HSSFColor.getTripletHash();
		if (colorHash.containsKey(upperColor))
			return ((HSSFColor)colorHash.get(upperColor)).getIndex();
		return defaultColor;
	}
	
	private HSSFCellStyle getStyle(HSSFWorkbook wb, ExcelStyle style) {
		HSSFCellStyle cellStyle = wb.createCellStyle();
		cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// ???????
		cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// ???????
		cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
		cellStyle.setTopBorderColor(HSSFColor.BLACK.index);
		cellStyle.setBottomBorderColor(HSSFColor.BLACK.index);
		cellStyle.setLeftBorderColor(HSSFColor.BLACK.index);
		cellStyle.setRightBorderColor(HSSFColor.BLACK.index);
		cellStyle.setFillBackgroundColor(this.getPoiColorIndex(style.getBackColor(), HSSFColor.WHITE.index));
		
		HSSFFont cellFont = wb.createFont();
		cellFont.setFontName(style.getFont());
		cellFont.setFontHeightInPoints((short)style.getWeight());
		cellFont.setBoldweight(style.isBold() ? HSSFFont.BOLDWEIGHT_BOLD : HSSFFont.BOLDWEIGHT_NORMAL);
		cellStyle.setFont(cellFont);
		return cellStyle;
	}
}

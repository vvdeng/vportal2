/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??ExcelTableHandler.java
 * 
 * Description??Excel table??????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 16, 2010	????
 */
package com.paipai.verticalframework.web.excel.table;

import java.io.InputStream;
import java.util.Collection;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFHyperlink;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.util.IOUtils;
import org.w3c.dom.Element;

import com.paipai.verticalframework.log.Log;
import com.paipai.verticalframework.web.excel.ExcelHandler;
import com.paipai.verticalframework.web.excel.ExcelStyleManager;

/**
 * Excel???????????б??????????????
 * 
 * @author sunniyang
 * @author raywu
 * @version 1.1
 */
public class ExcelTableHandler implements ExcelHandler {
	private final static String INDEX = "INDEX";
	
	//private final static String TEXT = "text";
	private final static String LINK = "link";
	private final static String IMAGE = "image";

	@SuppressWarnings("deprecation")
	public void fillSheet(HSSFSheet sheet, Element element, Map model, ExcelStyleManager excelStyleManager) throws Exception {
		Table tableConfig = new TableParser().parse(element);

		int currentLine = 0; // ?????

		// ????
		if (tableConfig.getTitle() != null) {
			// ???????
			HSSFRow row = sheet.createRow(0);
			HSSFCell cell = row.createCell(0, tableConfig.getColumns().size() - 1);
			HSSFCellStyle titleStyle = excelStyleManager.getExcelStyle(sheet.getWorkbook(), tableConfig.getTitleStyle());
			if (titleStyle != null) {
				cell.setCellStyle(titleStyle);
			}
			HSSFRichTextString text = new HSSFRichTextString(tableConfig.getTitle());
			cell.setCellValue(text);
			currentLine++;
		}

		// ??????
		int index = 0; // ?????
		HSSFRow row = sheet.createRow(currentLine);
		for (Column column : tableConfig.getColumns()) {
			// ?????п?
			if (column.getWidth() > 0) {
				sheet.setColumnWidth(index, column.getWidth() * 37);
			}

			// ???
			HSSFCell cell = row.createCell(index);
			HSSFCellStyle headStyle = excelStyleManager.getExcelStyle(sheet.getWorkbook(), tableConfig.getHeadStyle());
			if (headStyle != null) {
				cell.setCellStyle(headStyle);
			}
			HSSFRichTextString text = new HSSFRichTextString(column.getName());
			cell.setCellValue(text);
			
			index++;
		}
		currentLine++;

		// ??????
		Collection listModel = (Collection) model.get(tableConfig.getModel());

		int modelIndex = 1;
		for (Object item : listModel) {
			row = sheet.createRow(currentLine);
			index = 0;
			for (Column column : tableConfig.getColumns()) {
				HSSFCell cell = row.createCell(index);
				HSSFCellStyle rowStyle = excelStyleManager.getExcelStyle(sheet.getWorkbook(), tableConfig.getRowStyle());
				if (rowStyle != null) {
					if ("center".equals(column.getAlign())) {
						rowStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
					}
					else if ("right".equals(column.getAlign())) {
						rowStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
					}
					else {
						rowStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
					}
					rowStyle.setWrapText(column.isAutoWrap());
					cell.setCellStyle(rowStyle);
				}
				
				if (column.getFormat().equals(LINK)) {
					// ??t
					String pValue = getColumnPropertyValue4String(item, column.getProperty());
					if (pValue != null && pValue.length() > 0) {
						HSSFHyperlink link = new HSSFHyperlink(HSSFHyperlink.LINK_URL);
						link.setAddress(pValue == null ? "" : pValue);
						cell.setHyperlink(link);
					}
					cell.setCellValue(pValue == null ? "" : pValue);
					
					HSSFCellStyle cStyle = sheet.getWorkbook().createCellStyle();
					cStyle.cloneStyleFrom(cell.getCellStyle());
					HSSFFont font = cStyle.getFont(cell.getSheet().getWorkbook());
					HSSFFont cFont = sheet.getWorkbook().createFont();
					cFont.setFontName(font.getFontName());
					cFont.setFontHeightInPoints(font.getFontHeightInPoints());
					cFont.setBoldweight(font.getBoldweight());
					cStyle.setFont(cFont);
					cFont.setColor(HSSFColor.BLUE.index);
					cFont.setUnderline((byte)1);
					cell.setCellStyle(cStyle);
				}
				else if (column.getFormat().equals(IMAGE)) {
					// ??
					Object value = PropertyUtils.getProperty(item, column.getProperty());
					if (!(value instanceof InputStream)) {
						Log.logError("error get image property[" + column.getProperty() + "] from " + item + ": not a InputStream");
					}
					InputStream input = (InputStream)value;
					byte[] bytes = IOUtils.toByteArray(input);
					int picIdx = sheet.getWorkbook().addPicture(bytes, Workbook.PICTURE_TYPE_JPEG);
				    input.close();
				    
				    CreationHelper helper = sheet.getWorkbook().getCreationHelper();
				    HSSFPatriarch drawing = sheet.createDrawingPatriarch();
				    ClientAnchor anchor = helper.createClientAnchor();
				    anchor.setCol1(index);
				    anchor.setCol2(index + 1);
				    anchor.setRow1(currentLine);
				    anchor.setRow2(currentLine + 1);
				    drawing.createPicture(anchor, picIdx);
				}
				else {
					// ???
					HSSFRichTextString text = null;
					if (INDEX.equals(column.getProperty())) {
						text = new HSSFRichTextString(Integer.toString(modelIndex));
					}
					else {
						text = new HSSFRichTextString(getColumnPropertyValue4String(item, column.getProperty()));
					}
					cell.setCellValue(text);
				}
				index++;
			}
			
			modelIndex++;
			currentLine++;
		}
	}

	private String getColumnPropertyValue4String(Object bean, String property) {
		try {
			Object value = PropertyUtils.getProperty(bean, property);
			if (value == null) {
				return "";
			}
			else {
				return value.toString();
			}
		}
		catch (Exception e) {
			Log.logError("error get property[" + property + "] from " + bean, e);
			return "";
		}
	}
}

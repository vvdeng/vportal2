/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??ExcelView.java
 * 
 * Description??Excel???????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 16, 2010	????
 */
package com.paipai.verticalframework.web.excel;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.AbstractView;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.paipai.verticalframework.log.Log;

/**
 * Excel???????
 * 
 * @author sunniyang
 * @version 1.0
 */
public class ExcelView extends AbstractView {

	private String viewName;
	private Map<String, ExcelHandler> handlerMap;
	private Map<String, ExcelStyle> defaultStyles;

	public ExcelView(String viewName, Map<String, ExcelHandler> handlerMap,
			Map<String, ExcelStyle> defaultStyles) {
		this.viewName = viewName;
		this.handlerMap = handlerMap;
		this.defaultStyles = defaultStyles;
	}

	/**
	 * ???model???excel?????xml????????????????????????????????????
	 * 
	 * @param modelMap???????????
	 * @param request??http????
	 * @param response??http???
	 * @exception IOException?????????????xml?????
	 * @exception SAXException?????????????xml??????????
	 */
	@SuppressWarnings("deprecation")
	@Override
	protected void renderMergedOutputModel(Map modelMap, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// ???map???
		String tplPath = request.getRealPath("") + "/WEB-INF" + this.viewName
				+ ".xml";
		InputStream is = null;
		try {
			is = new FileInputStream(tplPath);
			Element rootNode = getRootElement(is);

			String fileName = rootNode.getAttribute("fileName");

			response.setContentType("application/vnd.ms-excel");
			if (request.getHeader("User-Agent").indexOf("MSIE 5.5") != -1) {
				response.setHeader("Content-Disposition", "filename=\""
						+ new String(fileName.getBytes("GBK"), "ISO8859_1")
						+ ".xls\"");
			}
			else {
				response.addHeader("Content-Disposition", "filename=\""
						+ new String(fileName.getBytes("GBK"), "ISO8859_1")
						+ ".xls\"");
			}
			response.setCharacterEncoding("gbk");

			OutputStream out = response.getOutputStream();
			HSSFWorkbook wb = new HSSFWorkbook();
			//wb.createSheet(arg0);
			//WritableWorkbook wb = Workbook.createWorkbook(out); // ????Excel????
			ExcelStyleManager excelStyleManager = new ExcelStyleManager();
			excelStyleManager.addStyles(this.defaultStyles);

			ExcelStylesParser parser = new ExcelStylesParser();
			NodeList stylesNodes = rootNode.getElementsByTagName("styles"); // ???????sheet???
			for (int i = 0; i < stylesNodes.getLength(); i++) {
				Map<String, ExcelStyle> styles = parser
						.parse((Element) stylesNodes.item(i));
				excelStyleManager.addStyles(styles);
				styles = null;
			}

			NodeList sheetNodes = rootNode.getElementsByTagName("sheet"); // ???????sheet???
			for (int i = 0; i < sheetNodes.getLength(); i++) {
				Element sheetNode = (Element) sheetNodes.item(i);
				String sheetName = sheetNode.getAttribute("name");
				HSSFSheet sheet = wb.createSheet(sheetName);

				NodeList nodes = sheetNode.getChildNodes(); // table ????????
				for (int j = 0; j < nodes.getLength(); j++) {
					Node node = nodes.item(j);
					if (node.getNodeType() == Node.ELEMENT_NODE) {
						Element element = (Element) node;
						ExcelHandler handler = this.handlerMap.get(element
								.getTagName());
						if (handler == null) {
							Log.logError("unsuported export type {0}", element
									.getTagName());
							continue; // ????????????????
						}
						handler.fillSheet(sheet, element, modelMap,
								excelStyleManager);
					}
				}
			}

			wb.write(out);
			out.flush();
			out.close();
		}
		finally {
			if (is != null) {
				is.close();
			}
		}
	}

	private Element getRootElement(InputStream is) {
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		try {
			DocumentBuilder builder;
			builder = factory.newDocumentBuilder();
			Document doc = builder.parse(is);
			return (Element) doc.getFirstChild();
		}
		catch (ParserConfigurationException ex) {
			Log.logError("error when get root element", ex);
			throw new ConfigException(ex);
		}
		catch (IOException ex) {
			Log.logError("error when get root element", ex);
			throw new ConfigException(ex);
		}
		catch (SAXException ex) {
			Log.logError("error when get root element", ex);
			throw new ConfigException(ex);
		}
	}
}

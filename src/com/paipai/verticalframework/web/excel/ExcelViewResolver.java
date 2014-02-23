/**
 * 
 */
package com.paipai.verticalframework.web.excel;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.AbstractCachingViewResolver;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.paipai.verticalframework.log.Log;
import com.paipai.verticalframework.web.excel.table.ExcelTableHandler;

/**
 * @author sunniyang Excel?????????
 */
public class ExcelViewResolver extends AbstractCachingViewResolver {

	public final static String EXCEL_DEFAULT_STYLE = "excel_default_style.xml";
	private Map<String, ExcelStyle> defaultStyles = new HashMap<String, ExcelStyle>();
	private Map<String, ExcelHandler> handlerMap = new HashMap<String, ExcelHandler>();
	{
		handlerMap.put("table", new ExcelTableHandler());
	}

	public ExcelViewResolver() {
		initDefaultStyles();
	}

	@Override
	protected View loadView(String viewName, Locale locale) throws Exception {
		if (viewName.startsWith("/excel")) {
			return new ExcelView(viewName, this.handlerMap, this.defaultStyles);
		}
		return null;
	}

	public void setHandlerMap(Map<String, ExcelHandler> handlerMap) {
		this.handlerMap.putAll(handlerMap);
	}

	private void initDefaultStyles() {
		InputStream is = ExcelView.class
				.getResourceAsStream(EXCEL_DEFAULT_STYLE);
		if (is != null) {
			Log.logInfo("parse default excel style [" + EXCEL_DEFAULT_STYLE
					+ "]");
			parseStyles(is);
		}
		else {
			Log.logInfo("no default excel style [" + EXCEL_DEFAULT_STYLE
					+ "] found");
		}
		is = ExcelView.class.getResourceAsStream("/" + EXCEL_DEFAULT_STYLE);
		if (is != null) {
			Log.logInfo("parse user config default excel style ["
					+ EXCEL_DEFAULT_STYLE + "]");
			parseStyles(is);
		}
		else {
			Log.logInfo("no user config default excel style ["
					+ EXCEL_DEFAULT_STYLE + "] found");
		}
	}

	private void parseStyles(InputStream is) {
		Element element = getRootElement(is);
		ExcelStylesParser parser = new ExcelStylesParser();

		NodeList stylesNodes = element.getElementsByTagName("styles"); // ???????sheet???
		for (int i = 0; i < stylesNodes.getLength(); i++) {
			Map<String, ExcelStyle> styles = parser.parse((Element) stylesNodes
					.item(i));
			this.defaultStyles.putAll(styles);
			styles = null;
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

/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??ButtionPrinter.java					
 *			
 * Description??????????????????							 												
 * History??
 * ?汾??    ????           ????          ?????????????
 *  1.0   bevisdeng        2010-10-22           Create	
 */

package com.paipai.verticalframework.ui.component.printer;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class RadioPrinter extends DefaultXhtmlPrinter {
	private static final String OPTION_KEY = "key";
	private static final String OPTION_VALUE = "value";

	public RadioPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printRadio(String id, String name, Object data, String value,
			String listLabel, String listValue, String style, String className,String onClick,String gap)
			throws IOException, JspException {
		if (data == null) {
			return;
		}
		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.STYLE, style);
		printHelper.attribute(Attr.CLASS, className);

		if (data instanceof List) {
			List listData = (List) data;
			processList(listData, listLabel, listValue, name, value,onClick,gap);

		} else if (data instanceof Map) {
			Map mapData = (Map) data;
			processMap(mapData, name, value,onClick,gap);
		} else {
			processList(parseData(data.toString()), OPTION_VALUE, OPTION_KEY,
					name, value,onClick,gap);
		}
		printHelper.endElement(Tag.SPAN);
		flushTag();

	}

	private static Object getProperty(Object bean, String propertyName) {
		Object returnValue = null;
		try {
			PropertyDescriptor pd = new PropertyDescriptor(propertyName, bean
					.getClass());
			Method getMethod = pd.getReadMethod();
			returnValue = getMethod.invoke(bean, null);
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			throw new RuntimeException(e);
		} catch (IntrospectionException e) {
			// TODO Auto-generated catch block
			throw new RuntimeException(e);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			throw new RuntimeException(e);
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			throw new RuntimeException(e);
		}
		return returnValue;
	}

	public void processMap(Map mapData, String name, String value,String onClick,String gap) {
		Iterator<Map.Entry> iterator = mapData.entrySet().iterator();
		while (iterator.hasNext()) {
			
			Map.Entry<Object, String> entry = iterator.next();
			printHelper.startElement(Tag.INPUT);
			printHelper.attribute(Attr.NAME, name);
			printHelper.attribute(Attr.TYPE, "radio");

			printHelper.attribute(Attr.VALUE, entry.getKey().toString());
			if (entry.getKey().toString().equals(value)) {
				printHelper.attribute(Attr.CHECKED, "checked");
			}
			printHelper.attribute(Attr.ONCLICK,onClick);
			printHelper.endElement(Tag.INPUT);
			printHelper.startElement(Tag.LABEL);
			printHelper.attribute(Attr.STYLE,"padding-right:"+gap+"px;");
			printHelper.text(entry.getValue());
			printHelper.endElement(Tag.LABEL);
		}
	}

	public void processList(List listData, String listLabel, String listValue,
			String name, String value,String onClick,String gap) {
		for (Object ele : listData) {
			printHelper.startElement(Tag.INPUT);
			printHelper.attribute(Attr.NAME, name);
			printHelper.attribute(Attr.TYPE, "radio");
			String lValue = getProperty(ele, listValue).toString();
			String lLabel = getProperty(ele, listLabel).toString();
			printHelper.attribute(Attr.VALUE, lValue);
			printHelper.attribute(Attr.ONCLICK,onClick);
			if (lValue.equals(value)) {
				printHelper.attribute(Attr.CHECKED, "checked");
			}
			printHelper.endElement(Tag.INPUT);
			printHelper.startElement(Tag.LABEL);
			printHelper.attribute(Attr.STYLE,"padding-right:"+gap+"px;");
			printHelper.text(lLabel);
			printHelper.endElement(Tag.LABEL);
		}
	}

	public static List parseData(String dataStr) {
		List<Option> optionList = new ArrayList<Option>();
		if (dataStr == null) {
			return optionList;
		}
		dataStr = dataStr.replace("'", "").replace("{", "").replace("}", "");
		String[] dataArr = dataStr.split(",");
		if (dataArr.length > 0) {
			for (int i = 0; i < dataArr.length; i++) {
				String[] keyAndValue = dataArr[i].split(":");
				if (keyAndValue.length == 2) {
					String key = keyAndValue[0].trim();
					String value = keyAndValue[1].trim();
					if (key.length() > 0 && value.length() > 0) {
						Option option = new Option(key, value);
						optionList.add(option);
					}
				}
			}
		}
		return optionList;
	}

	static class Option {
		String key;
		String value;

		public String getKey() {
			return key;
		}

		public void setKey(String key) {
			this.key = key;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}

		public Option(String key, String value) {
			this.key = key;
			this.value = value;
		}
	}

}

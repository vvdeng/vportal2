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
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.component.printer.RadioPrinter.Option;
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

public class CheckBoxPrinter extends DefaultXhtmlPrinter {

	private static final String OPTION_KEY = "key";
	private static final String OPTION_VALUE = "value";

	public CheckBoxPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printCheckBox(String id, String name, Object data,
			String value, String listLabel, String listValue, String style,
			String className, String onclick, Integer checked)
			throws IOException, JspException {

		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.STYLE, style);
		printHelper.attribute(Attr.CLASS, className);
		Set<String> valueSet = new HashSet<String>();

		if (data == null) {
			process(name,value, onclick, checked);
		} else {
			valueSet.addAll(Arrays.asList(value.split(",")));
			if (data instanceof List) {
				List listData = (List) data;
				processList(listData, listLabel, listValue, name, value,
						valueSet, onclick);
			} else if (data instanceof Map) {
				Map mapData = (Map) data;
				processMap(mapData, name, value, valueSet, onclick);
			} else {
				processList(parseData(data.toString()), OPTION_VALUE,
						OPTION_KEY, name, value, valueSet, onclick);
			}
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

			throw new RuntimeException(e);
		} catch (IntrospectionException e) {

			throw new RuntimeException(e);
		} catch (IllegalAccessException e) {

			throw new RuntimeException(e);
		} catch (InvocationTargetException e) {
			throw new RuntimeException(e);
		}
		return returnValue;
	}

	public void process(String name,String value, String onclick, Integer checked) {
		printHelper.startElement(Tag.INPUT);
		printHelper.attribute(Attr.TYPE, "checkBox");
		printHelper.attribute(Attr.VALUE,value);
		printHelper.attribute(Attr.ID, name);
		printHelper.attribute(Attr.NAME, name);
		printHelper.attribute(Attr.ONCLICK, onclick);
		if (new Integer(1).equals(checked)) {
			printHelper.attribute(Attr.CHECKED, "checked");
		}
		printHelper.endElement(Tag.INPUT);
	}

	public void processMap(Map mapData, String name, String value,
			Set<String> valueSet, String onclick) {
		Iterator<Map.Entry> iterator = mapData.entrySet().iterator();
		while (iterator.hasNext()) {
			Map.Entry<String, String> entry = iterator.next();
			printHelper.startElement(Tag.INPUT);
			printHelper.attribute(Attr.NAME, name);
			printHelper.attribute(Attr.TYPE, "checkbox");
			printHelper.attribute(Attr.VALUE, entry.getKey());
			printHelper.attribute(Attr.ONCLICK, onclick);
			if (valueSet.contains(entry.getKey().toString())) {
				printHelper.attribute(Attr.CHECKED, "checked");
			}
			printHelper.endElement(Tag.INPUT);
			printHelper.startElement(Tag.LABEL);
			printHelper.text(entry.getValue());
			printHelper.endElement(Tag.LABEL);

		}
	}

	public void processList(List listData, String listLabel, String listValue,
			String name, String value, Set<String> valueSet, String onclick) {
		for (Object ele : listData) {
			printHelper.startElement(Tag.INPUT);
			printHelper.attribute(Attr.NAME, name);
			printHelper.attribute(Attr.TYPE, "checkbox");
			String lValue = getProperty(ele, listValue).toString();
			String lLabel = getProperty(ele, listLabel).toString();
			printHelper.attribute(Attr.VALUE, lValue);
			printHelper.attribute(Attr.ONCLICK, onclick);
			if (valueSet.contains(lValue.toString())) {
				printHelper.attribute(Attr.CHECKED, "checked");
			}
			printHelper.endElement(Tag.INPUT);
			printHelper.startElement(Tag.LABEL);
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

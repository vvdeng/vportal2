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
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspFragment;

import org.apache.commons.beanutils.PropertyUtils;

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

public class ComboPrinter extends DefaultXhtmlPrinter {

	public ComboPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printCombo(String id, String name, Object data, String value,
			String optionLabel, String optionValue,String className,String style,String onchange,Boolean disabled,String extra) throws IOException,
			JspException {
		printHelper.startElement(Tag.SELECT);
		printHelper.attribute(Attr.ID, id);
		printHelper.attribute(Attr.NAME, name);
		printHelper.attribute(Attr.CLASS,className);
		printHelper.attribute(Attr.STYLE, style);
		printHelper.attribute(Attr.ONCHANGE,onchange);
		printHelper.attribute("extra",extra);
		if(Boolean.TRUE.equals(disabled)){
			printHelper.attribute(Attr.DISABLED,"true");
		}
		printHelper.closeElement();
		printBody();
		if (data instanceof List) {
			List listData = (List) data;
			for (Object ele : listData) {
				printHelper.startElement(Tag.OPTION);
				String optValue=getProperty(ele, optionValue).toString();
				String optLabel=getProperty(ele, optionLabel).toString();
				printHelper.attribute(Attr.VALUE,optValue );
				if (optValue.equals(value)) {
					printHelper.attribute(Attr.SELECTED, "true");
				}
				printHelper.text(optLabel);
				printHelper.endElement(Tag.OPTION);
			}
			
		}
		if (data instanceof Map) {
			Map mapData = (Map) data;
			Iterator<Map.Entry> iterator = mapData.entrySet().iterator();
			while (iterator.hasNext()) {
				Map.Entry entry = iterator.next();
				printHelper.startElement(Tag.OPTION);
				printHelper.attribute(Attr.VALUE, entry.getKey().toString());
				if (entry.getKey().toString().equals(value)) {
					printHelper.attribute(Attr.SELECTED, "true");
				}

				printHelper.text(entry.getValue());
				printHelper.endElement(Tag.OPTION);
			}
		}
		printHelper.endElement(Tag.SELECT);
		flushTag();

	}

	private static Object getProperty(Object bean, String propertyName) {
		try {
			return  PropertyUtils.getProperty(bean, propertyName);
		}
		catch (Exception e) {
			return "";
		}
	}

}

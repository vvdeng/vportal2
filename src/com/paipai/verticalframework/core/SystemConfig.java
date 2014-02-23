/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??SystemConfig.java					
 *			
 * Description???????????										 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.core;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.paipai.verticalframework.core.util.BeanUtils;

/**
 * ??????????????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class SystemConfig {

	private final static Log LOGGER = LogFactory.getLog(BeanUtils.class);

	private final static String ENV_KEY = "env"; // ???????????
	public final static String SYSTEM_KEY = "system"; // ??ID

	private final static String SYSTEM_ID;
	private static Properties properties = new Properties();
	private static VariableExpander variableExpander = new VariableExpander(
			properties);
	static {
		// ????????
		// config.properties
		// config.xml
		// config-{evn}.properties
		// config-{env}.xml
		String configFilePrefix = "config";
		String env = System.getenv(ENV_KEY);
		if (env == null || env.length() == 0) {
			env = System.getProperty(ENV_KEY);
		}
		if (env != null) {
			configFilePrefix = "config-" + env;
		}
		InputStream propertiesIS = Thread.currentThread()
				.getContextClassLoader().getResourceAsStream(
						configFilePrefix + ".properties");
		if (propertiesIS != null) {
			try {
				properties.load(propertiesIS);
				LOGGER.info("Load SystemConfig[" + configFilePrefix
						+ ".properties] Success");
			}
			catch (IOException e) {
				LOGGER.error("Error When Load SystemConfig[" + configFilePrefix
						+ ".properties]", e);
			}
		}
		else {
			LOGGER.info("SystemConfig[" + configFilePrefix
					+ ".properties] Not Found!");
		}

		InputStream xmlIS = Thread.currentThread().getContextClassLoader()
				.getResourceAsStream(configFilePrefix + ".xml");
		if (xmlIS != null) {
			try {
				properties.loadFromXML(xmlIS);
				LOGGER.info("Load SystemConfig[" + configFilePrefix
						+ ".xml] Success");
			}
			catch (IOException e) {
				LOGGER.error("Error When Load SystemConfig[" + configFilePrefix
						+ ".xml]", e);
			}
		}
		else {
			LOGGER
					.info("SystemConfig[" + configFilePrefix
							+ ".xml] Not Found!");
		}

		String systemId = properties.getProperty(SYSTEM_KEY);
		if (systemId == null || systemId.length() == 0) {
			systemId = System.getenv(SYSTEM_KEY);
		}

		if (systemId == null || systemId.length() == 0) {
			systemId = System.getProperty(SYSTEM_KEY);
		}

		SYSTEM_ID = systemId;

		LOGGER.info("SystemId: " + SYSTEM_ID);
	}

	/**
	 * ???????ID
	 * 
	 * @return String
	 * @see ?ο???JavaDoc
	 */
	public static String getSystemId() {
		return SYSTEM_ID;
	}

	/**
	 * ?????????????????????????
	 * 
	 * @param name?????????
	 * @return String
	 * @see ?ο???JavaDoc
	 */
	public static String getProperty(String name) {
		return variableExpander.getValue(name);
	}

	/**
	 * ???????????????????У????????
	 * 
	 * @param name?????????
	 * @param defaultValue??????
	 * @return String
	 * @see ?ο???JavaDoc
	 */
	public static String getProperty(String name, String defaultValue) {
		String value = variableExpander.getValue(name);
		if (value == null || value.length() == 0) {
			return defaultValue;
		}
		else {
			return value;
		}
	}

	/**
	 * ???int????????????????????0
	 * 
	 * @param name?????????
	 * @return int
	 * @see ?ο???JavaDoc
	 */
	public static int getIntProperty(String name) {
		return getIntProperty(name, 0);
	}

	/**
	 * ???int???????????????????У????????
	 * 
	 * @param name?????????
	 * @param defaultValue??????
	 * @return int
	 * @see ?ο???JavaDoc
	 */
	public static int getIntProperty(String name, int defaultValue) {
		String value = getProperty(name);
		if (value == null) {
			return defaultValue;
		}
		else {
			try {
				return Integer.parseInt(value);
			}
			catch (NumberFormatException e) {
				LOGGER.error("Value [" + value + "] of Property [" + name
						+ "] must be integer;Use defaultValue[" + defaultValue
						+ "]");
				return defaultValue;
			}
		}
	}

	/**
	 * ???long????????????????????0
	 * 
	 * @param name?????????
	 * @return long
	 * @see ?ο???JavaDoc
	 */
	public static long getLongProperty(String name) {
		return getLongProperty(name, 0L);
	}

	/**
	 * ???long???????????????????У????????
	 * 
	 * @param name?????????
	 * @param defaultValue??????
	 * @return long
	 * @see ?ο???JavaDoc
	 */
	public static long getLongProperty(String name, long defaultValue) {
		String value = getProperty(name);
		if (value == null) {
			return defaultValue;
		}
		else {
			try {
				return Long.parseLong(value);
			}
			catch (NumberFormatException e) {
				LOGGER.error("Value [" + value + "] of Property [" + name
						+ "] must be long;Use defaultValue[" + defaultValue
						+ "]");
				return defaultValue;
			}
		}
	}
}

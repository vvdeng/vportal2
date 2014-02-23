/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??Log.java					
 *			
 * Description?????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.log;

import java.text.MessageFormat;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;

/**
 * ???
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class Log {

	private static final String FQCN = Log.class.getName();

	private static Logger msgLogger = Logger.getLogger("message");
	private static Logger keyLogger = Logger.getLogger("key");

	protected Log() {
	}

	/**
	 * ????????д?
	 * 
	 * @return ???????boolean
	 * @see ?ο???JavaDoc
	 */
	public static boolean isDebugEnabled() {
		return msgLogger.isDebugEnabled();
	}

	/**
	 * debug???
	 * 
	 * @param message
	 *            ??????
	 * @see ?ο???JavaDoc
	 */
	public static void logDebug(String message) {
		msgLogger.log(FQCN, Level.DEBUG, message, null);
	}

	/**
	 * debug????????{0}??{1}??....????
	 * 
	 * @param message
	 *            ??????
	 * @param params
	 *            ????
	 * @see ?ο???JavaDoc
	 */
	public static void logDebug(String format, Object... params) {
		if (msgLogger.isDebugEnabled()) {
			String msg = MessageFormat.format(format, params);
			logDebug(msg);
		}
	}

	/**
	 * info???
	 * 
	 * @param message
	 *            ??????
	 * @see ?ο???JavaDoc
	 */
	public static void logInfo(String message) {
		msgLogger.log(FQCN, Level.INFO, message, null);
	}

	/**
	 * info????????{0}??{1}??....????
	 * 
	 * @param message
	 *            ??????
	 * @param params
	 *            ????
	 * @see ?ο???JavaDoc
	 */
	public static void logInfo(String format, Object... params) {
		if (msgLogger.isInfoEnabled()) {
			String msg = MessageFormat.format(format, params);
			logInfo(msg);
		}
	}

	/**
	 * error???
	 * 
	 * @param message
	 *            ??????
	 * @see ?ο???JavaDoc
	 */
	public static void logError(String message) {
		msgLogger.log(FQCN, Level.ERROR, message, null);
	}

	/**
	 * error???
	 * 
	 * @param message
	 *            ??????
	 * @param t
	 *            ??
	 * @see ?ο???JavaDoc
	 */
	public static void logError(String message, Throwable t) {
		msgLogger.log(FQCN, Level.ERROR, message, t);
	}

	/**
	 * error????????{0}??{1}??....????
	 * 
	 * @param message
	 *            ??????
	 * @param params
	 *            ????
	 * @see ?ο???JavaDoc
	 */
	public static void logError(String format, Object... params) {
		if (msgLogger.isEnabledFor(Level.ERROR)) {
			String msg = MessageFormat.format(format, params);
			logError(msg);
		}
	}

	/**
	 * error????????{0}??{1}??....????
	 * 
	 * @param message
	 *            ??????
	 * @param params
	 *            ????
	 * @param t
	 *            ??
	 * @see ?ο???JavaDoc
	 */
	public static void logError(String format, Throwable t, Object... params) {
		if (msgLogger.isEnabledFor(Level.ERROR)) {
			String msg = MessageFormat.format(format, params);
			logError(msg, t);
		}
	}

	/**
	 * key???
	 * 
	 * @param key
	 *            ????
	 * @param message
	 *            ??????
	 * @see ?ο???JavaDoc
	 */
	public static void logKey(String key, Object message) {
		String targetMsg = MessageFormat.format("{0} {1}", key, message);
		keyLogger.log(FQCN, Level.INFO, targetMsg, null);
	}

	/**
	 * key????????{0}??{1}??....????
	 * 
	 * @param key
	 *            ????
	 * @param message
	 *            ??????
	 * @param params
	 *            ????
	 * @see ?ο???JavaDoc
	 */
	public static void logKey(String key, String format, Object... params) {
		String msg = MessageFormat.format(format, params);
		logKey(key, msg);
	}
}

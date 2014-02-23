/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??URILogAppender.java					
 *			
 * Description????????????url??ò??????????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.log;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.AppenderSkeleton;
import org.apache.log4j.MDC;
import org.apache.log4j.RollingFileAppender;
import org.apache.log4j.helpers.OptionConverter;
import org.apache.log4j.spi.LoggingEvent;

/**
 * ??????????url??ò??????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class URILogAppender extends AppenderSkeleton {

	public final static String KEY = "key";
	protected boolean fileAppend = true;
	protected String defaultFileName;
	protected String actionLogDir;
	protected boolean bufferedIO = false;
	protected int bufferSize = 8 * 1024;
	protected long maximumFileSize = 10 * 1024 * 1024; // The default maximum
	// file
	// size is 10MB.
	protected int maxBackupIndex = 1; // There is one backup file by default.
	private long nextRollover = 0;

	private Map<String, RollingFileAppender> appenders = new HashMap<String, RollingFileAppender>();
	private RollingFileAppender defaultAppender = null;

	protected void append(LoggingEvent event) {
		Object key = MDC.get(KEY);
		RollingFileAppender appender = null;
		if (key instanceof String && ((String) key).length() > 0) {
			appender = retriveAppender((String) key);
		}
		else {
			appender = retriveDefaultAppender();
		}

		if (appender != null) {
			appender.append(event);
		}
	}

	protected synchronized RollingFileAppender retriveDefaultAppender() {
		if (this.defaultAppender == null) {
			try {
				this.defaultAppender = new RollingFileAppender(getLayout(),
						this.defaultFileName);
				this.defaultAppender.setName(getName());
				this.defaultAppender.setMaximumFileSize(this.maximumFileSize);
				this.defaultAppender.setMaxBackupIndex(this.maxBackupIndex);
				this.defaultAppender.setBufferedIO(this.bufferedIO);
				this.defaultAppender.setBufferSize(this.bufferSize);
				this.defaultAppender.setErrorHandler(getErrorHandler());

				System.out.println("Create Default Appender:"
						+ this.defaultFileName);
			}
			catch (Exception e) {
				System.out.println("Create RollingFileAppender Failed");
				e.printStackTrace();
			}
		}

		return this.defaultAppender;
	}

	protected synchronized RollingFileAppender retriveAppender(String key) {
		RollingFileAppender appender = this.appenders.get(key);
		if (appender == null) {
			try {
				appender = new RollingFileAppender(getLayout(),
						this.actionLogDir + "/" + key + ".log");
				appender.setName(getName());
				appender.setMaximumFileSize(this.maximumFileSize);
				appender.setMaxBackupIndex(this.maxBackupIndex);
				appender.setBufferedIO(this.bufferedIO);
				appender.setBufferSize(this.bufferSize);
				appender.setErrorHandler(getErrorHandler());

				this.appenders.put(key, appender);

				System.out.println("Create Appender:" + this.actionLogDir + "/"
						+ key);
			}
			catch (Exception e) {
				System.out.println("Create RollingFileAppender Failed");
				e.printStackTrace();
			}
		}

		return appender;
	}

	public void close() {
		for (RollingFileAppender appender : appenders.values()) {
			appender.close();
		}

		if (this.defaultAppender != null) {
			this.defaultAppender.close();
		}
	}

	public boolean requiresLayout() {
		return true;
	}

	public String getDefaultFileName() {
		return defaultFileName;
	}

	public void setDefaultFileName(String defaultFileName) {
		this.defaultFileName = defaultFileName.trim();
	}

	public String getActionLogDir() {
		return actionLogDir;
	}

	public void setActionLogDir(String actionLogDir) {
		this.actionLogDir = actionLogDir.trim();
	}

	public boolean getBufferedIO() {
		return bufferedIO;
	}

	public int getBufferSize() {
		return bufferSize;
	}

	public void setBufferedIO(boolean bufferedIO) {
		this.bufferedIO = bufferedIO;
	}

	public void setBufferSize(int bufferSize) {
		this.bufferSize = bufferSize;
	}

	public boolean isFileAppend() {
		return fileAppend;
	}

	public void setFileAppend(boolean fileAppend) {
		this.fileAppend = fileAppend;
	}

	public long getMaximumFileSize() {
		return maximumFileSize;
	}

	public void setMaximumFileSize(long maximumFileSize) {
		this.maximumFileSize = maximumFileSize;
	}

	public void setMaxFileSize(String value) {
		this.maximumFileSize = OptionConverter.toFileSize(value,
				this.maximumFileSize + 1);
	}

	public int getMaxBackupIndex() {
		return maxBackupIndex;
	}

	public void setMaxBackupIndex(int maxBackupIndex) {
		this.maxBackupIndex = maxBackupIndex;
	}

	public long getNextRollover() {
		return nextRollover;
	}

	public void setNextRollover(long nextRollover) {
		this.nextRollover = nextRollover;
	}
}

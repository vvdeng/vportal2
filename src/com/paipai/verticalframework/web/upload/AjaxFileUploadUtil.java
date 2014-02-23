/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??AjaxFileUploadUtil.java
 * 
 * Description??????????????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-29			????
 */
package com.paipai.verticalframework.web.upload;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.paipai.verticalframework.core.SystemConfig;
import com.paipai.verticalframework.log.Log;

/**
 * <??????>
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class AjaxFileUploadUtil {

	private final static int SIZE_THREADHOLD = 1 * 1024 * 1024;// ??????????????????????????С??1M
	private static Set<String> allowedExt = new HashSet<String>();
	private static File baseTmpFile;
	private static long maxFileSize = 1 * 1024 * 1024; // ???????1M

	public static File fileUploadPath = null;

	/**
	 * ???????????
	 * @see ?ο???JavaDoc
	 */
	public static synchronized void initFileUpload() {
		if (fileUploadPath != null) {
			return;
		}

		String baseTmpPath = SystemConfig.getProperty("fileupload.path");
		if (baseTmpPath == null || baseTmpPath.length() == 0) {
			baseTmpPath = System.getProperty("catalina.home") + File.separator
					+ "temp" + File.separator + "uploadfile";
		}

		AjaxFileUploadUtil.baseTmpFile = new File(baseTmpPath);
		if (!AjaxFileUploadUtil.baseTmpFile.exists()) {
			AjaxFileUploadUtil.baseTmpFile.mkdirs();
		}

		String allowedExtStr = SystemConfig
				.getProperty("fileupload.allowedext");
		String[] allowedExtArray = null;
		if (allowedExtStr == null || allowedExtStr.length() == 0) {
			allowedExtArray = new String[] { "jpg", "jpeg", "gif", "txt", "xls",
					"doc", "docx", "mp3", "wma", "m4a" };
		}
		else {
			allowedExtArray = allowedExtStr.split(",");
		}
		for (String ext : allowedExtArray) {
			AjaxFileUploadUtil.allowedExt.add(ext);
		}

		String maxFileSizeStr = SystemConfig
				.getProperty("fileupload.maxfilesize");

		if (maxFileSizeStr != null && maxFileSizeStr.length() > 0) {
			if (maxFileSizeStr.endsWith("m") || maxFileSizeStr.endsWith("M")) {
				AjaxFileUploadUtil.maxFileSize = Long.parseLong(maxFileSizeStr
						.substring(0, maxFileSizeStr.length() - 1)) * 1024 * 1024;
			}
			else if (maxFileSizeStr.endsWith("k")
					|| maxFileSizeStr.endsWith("K")) {
				AjaxFileUploadUtil.maxFileSize = Long.parseLong(maxFileSizeStr
						.substring(0, maxFileSizeStr.length() - 1)) * 1024;
			}
			else {
				AjaxFileUploadUtil.maxFileSize = Long.parseLong(maxFileSizeStr);
			}
		}

		Log.logInfo("baseTmpFile: {0};allowedExt : {1}; maxFileSize : {2};",
				AjaxFileUploadUtil.baseTmpFile.getAbsolutePath(),
				AjaxFileUploadUtil.allowedExt, AjaxFileUploadUtil.maxFileSize);
	}

	/**
	 * ??????????????棬????????λ
	 * @see ?ο???JavaDoc
	 */
	public static int getSizeThreadhold() {
		return SIZE_THREADHOLD;
	}

	/**
	 * ??????????????
	 * @param fileExt ??????
	 * @return boolean
	 * @see ?ο???JavaDoc
	 */
	public static boolean isFileExtAllowed(String fileExt) {
		return allowedExt.contains(fileExt);
	}

	/**
	 * ???????
	 * @see ?ο???JavaDoc
	 */
	public static String getFileDate() {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String date = dateFormat.format(new Date());
		return date;
	}

	/**
	 * ????????
	 * @param date ???????
	 * @return File
	 * @see ?ο???JavaDoc
	 */
	public static File getFileDir(String date) {
		File dir = new File(baseTmpFile, date);
		if (!dir.exists()) {
			dir.mkdir();
		}

		return dir;
	}

	/**
	 * ?????????????С
	 * @return long
	 * @see ?ο???JavaDoc
	 */
	public static long getMaxFileSize() {
		return maxFileSize;
	}

	/**
	 * ???token??????
	 * @param token ???token
	 * @return File
	 * @see ?ο???JavaDoc
	 */
	public static File getFile(String token) {
		String[] array = token.split("-");
		
		if (array.length != 2) {
			Log.logError("error token {0}", token);
			return null;
		}
		File dir = getFileDir(array[0]);

		File file = new File(dir, array[1]);
		if (!file.exists()) {
			return null;
		}
		Log.logInfo("file {0}", file.getAbsolutePath());
		return file;
	}
	
	/**
	 * ???now?????????????
	 * @param now ????
	 */
	public static void deleteLastDayFile(Calendar now) {
		now.add(Calendar.DAY_OF_MONTH, -1);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String delDay = dateFormat.format(now.getTime());
		File delDir = getFileDir(delDay);
		File[] files = delDir.listFiles();
		for (File file : files) {
			file.delete();
			Log.logInfo("temp uploaded file: [{0}] deleted", file.getName());
		}
		delDir.delete();
	}
}

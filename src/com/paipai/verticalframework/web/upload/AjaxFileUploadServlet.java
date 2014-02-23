/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??AjaxFileUploadServlet.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		carldong		2010-11-19			????
 */
package com.paipai.verticalframework.web.upload;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadBase.SizeLimitExceededException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.paipai.verticalframework.core.util.RandomUtil;
import com.paipai.verticalframework.log.Log;
import com.paipai.verticalframework.web.ajax.JsonData;
import com.paipai.verticalframework.web.spring.ModuleHandlerExceptionResolver;

import flexjson.JSONSerializer;

/**
 * Ajax??????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class AjaxFileUploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	public final static long ERROR_SIZELIMITEXCEEDED = 1;
	public final static long ERROR_NOFILE = 2;
	public final static long ERROR_EXT = 3;
	
	private Timer timer = null;

	public void init(ServletConfig config) throws ServletException {
		AjaxFileUploadUtil.initFileUpload();
		
		timer = new Timer(true);
		Log.logInfo("timer for temp uploaded file deleting started.");
		timer.schedule(new TimerTask() {
			private final static int DELETE_FILE_HOUR = 4; // ????賿4????????????????
			private boolean isRunning = false;
			@Override
			public void run() {
				Calendar calendar = Calendar.getInstance();
				if (!this.isRunning) {
					if (calendar.get(Calendar.HOUR_OF_DAY) == DELETE_FILE_HOUR) {
						Log.logInfo("deleting temp uploaded file task start");
						this.isRunning = true;
						try {
							AjaxFileUploadUtil.deleteLastDayFile(calendar);
							Log.logInfo("deleting temp uploaded file task finish");
						}
						catch (Exception e) {
							Log.logError("ERROR while deleting temp uploaded file, message is:{0} Date:{1}",
									e.getMessage(), calendar.getTime().toString());
						}
						finally {
							this.isRunning = false;
						}
					}
				}
			}
		}, 0, 60 * 60 *1000);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// ????????????????,??4??????????ServletFileUpload
		DiskFileItemFactory dfif = new DiskFileItemFactory();
		dfif.setSizeThreshold(AjaxFileUploadUtil.getSizeThreadhold());// ??????????????????????????????С,??????4K.???????????????????
		String date = AjaxFileUploadUtil.getFileDate();
		dfif.setRepository(AjaxFileUploadUtil.getFileDir(date));

		// ??????????????????
		ServletFileUpload sfu = new ServletFileUpload(dfif);
		// ?????????????
		sfu.setSizeMax(AjaxFileUploadUtil.getMaxFileSize());

		JSONSerializer serializer = new JSONSerializer();
		JsonData jsonData = new JsonData();

		try {
			// ??request??? ???? ???????б?
			List<FileItem> fileList = sfu.parseRequest(request);
			// ?????????
			if (fileList == null || fileList.size() == 0) {
				jsonData.setErrCode(Long.toString(ERROR_NOFILE));
				jsonData.setMsg("no file");
			}
			else {
				// ??????????????
				FileItem fileItem = null;
				// ????????????·??
				String filePath = null;
				// ?????????С
				long size = 0;

				for (FileItem fi : fileList) {
					if (fi != null && !fi.isFormField()) {
						// ????????????·??
						filePath = fi.getName();
						// ?????????С
						size = fi.getSize();

						if (filePath != null && filePath.length() > 0
								&& size > 0) {
							fileItem = fi;
						}
					}
				}
				if (fileItem == null) {
					jsonData.setErrCode(Long.toString(ERROR_NOFILE));
					jsonData.setMsg("no file");
				}
				else {
					// ??????·?????????
					String fileName = filePath.substring(filePath
							.lastIndexOf("\\") + 1);
					// ????????)???(??)????????????)
					String fileExt = null;
					if (fileName.lastIndexOf('.') > 0) {
						fileExt = fileName
								.substring(fileName.lastIndexOf(".") + 1);
					}

					// ???)???
					if (!AjaxFileUploadUtil.isFileExtAllowed(fileExt)) {
						jsonData.setErrCode(Long.toString(ERROR_EXT));
						jsonData.setMsg("error ext");
					}
					else {
						String random = RandomUtil.random(20);
						AjaxFileData data = new AjaxFileData(fileName, date
								+ "-" + random);
						File file = new File(AjaxFileUploadUtil
								.getFileDir(date), random);
						OutputStream fileOut = null;
						try {
							fileOut = new FileOutputStream(file);
							fileOut.write(fileItem.get());
							fileOut.flush();
						}
						finally {
							if (fileOut != null) {
								fileOut.close();
							}
						}
						jsonData.setData(data);
					}
				}
			}
		}
		catch (Exception e) {// ??????????????
			Log.logError("error when upload", e);
			if (e instanceof SizeLimitExceededException) {
				jsonData.setErrCode(Long.toString(ERROR_SIZELIMITEXCEEDED));
				jsonData.setMsg("size limited");
			}
			else {
				jsonData
						.setErrCode(Long
								.toString(ModuleHandlerExceptionResolver.DEFAULT_ERROR_CODE));
				jsonData.setMsg("system error");
			}
		}

		String jsonString = serializer.exclude("class").serialize(jsonData);
		response.setCharacterEncoding("UTF-8");
		response.getOutputStream().write(jsonString.getBytes("GBK"));
	}
}

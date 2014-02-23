package com.paipai.verticalframework.ui.listener;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.paipai.verticalframework.ui.constant.Constants;

public class TagServletContextListener implements ServletContextListener {
	public static final int	BUFFER_SIZE=1024*1024;//1M??????
	@Override
	public void contextInitialized(ServletContextEvent evt) {
		ServletContext servletContext = evt.getServletContext();
		createResourcesDir(servletContext);
		for (String jsFileName : Constants.JS_FILE_NAMES) {
			createResourceFile(jsFileName, Constants.JS_FOLDER,
					Constants.BASE_FOLDER_NAME, servletContext);
		}
		for (String cssFileName : Constants.CSS_FILE_NAMES) {
			createResourceFile(cssFileName, Constants.CSS_FOLDER,
					Constants.BASE_FOLDER_NAME, servletContext);
		}
		for (String imgFileName : Constants.IMG_FILE_NAMES) {
			createResourceFile(imgFileName, Constants.IMG_FOLDER,
					Constants.BASE_FOLDER_NAME, servletContext);
		}
		for (String jspFileName : Constants.JSP_FILE_NAMES) {
			createResourceFile(jspFileName, Constants.JSP_FOLDER,
					Constants.BASE_FOLDER_NAME, servletContext);
		}
	}
	@Override
	public void contextDestroyed(ServletContextEvent evt) {
	}

	private void createResourcesDir(ServletContext servletContext) {
		String dirPath = servletContext.getRealPath(Constants.BASE_FOLDER_NAME);
		File dir = null;
		dir = new File(dirPath);
		deletelDir(dir,false);
		dir.mkdir();
	}

	private void createResourceFile(String fileName, String srcFileDir,
			String destFileDir, ServletContext servletContext) {
		if(fileName.indexOf("http://")>=0){
			return;
		}
		System.out.println("srcFilePath="+srcFileDir);
		String sourceFileFullPath = srcFileDir + fileName;
		URL sourceURL = getClass().getResource(sourceFileFullPath);
		String destPath = servletContext.getRealPath(destFileDir + fileName);
		
		writeFile(sourceURL, destPath, servletContext);
	}
	private void createLocalResourceFile(String fileName, String srcFileDir,
			String destFileDir, ServletContext servletContext) {
		if(fileName.indexOf("http://")>=0){
			return;
		}
		System.out.println("srcFilePath="+srcFileDir);
		String sourceFileFullPath = srcFileDir + fileName;
		URL sourceURL = getClass().getResource(sourceFileFullPath);
		String destPath = servletContext.getRealPath(destFileDir + fileName);
		
		writeFile(sourceURL, destPath, servletContext);
	}
	private void writeFile(URL fromURL, String toPath,
			ServletContext servletContext) {
		InputStream in = null;
		OutputStream out = null;
		try {
			in = new BufferedInputStream(fromURL.openStream());
			out = new BufferedOutputStream(new FileOutputStream(toPath));
			int len;
			byte[] buffer = new byte[BUFFER_SIZE];
			while ((len = in.read(buffer, 0, buffer.length)) != -1) {
				out.write(buffer, 0, len);
			}
			out.flush();
		} catch (IOException e) {
	        throw new RuntimeException("????????????????? toPath="+toPath,e);
		} finally {
			try {
				in.close();
				out.close();
			} catch (Exception e) {
			}
		}
	}
	public static void deletelDir(File dir,boolean delSelf){
		if(dir!=null&&dir.isDirectory()){
			File[] files=dir.listFiles();
			for (int i = 0; i < files.length; i++) {
				if(files[i].isFile()){
					files[i].delete();
				}
				if(files[i].isDirectory()){
					deletelDir(files[i],true);
				}
			}
			if(delSelf){
			dir.delete();
			}
		}
	}
}


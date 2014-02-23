package com.vvdeng.portal.util;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.ModelMap;
import org.springframework.web.multipart.MultipartFile;

public class FileUtil {
	static HashMap<String, String> extMap = new HashMap<String, String>();
	static {
		extMap.put("image", "gif,jpg,jpeg,png,bmp");
		extMap.put("flash", "swf,flv");
		extMap.put("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb");
		extMap.put("file", "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");
	}
	public static String[] processFile(MultipartFile[] multiFiles,HttpServletRequest request,ModelMap map) {
		String []fileUrls=new String[multiFiles.length];
		long maxSize = 1000000;
		String savePath=request.getSession().getServletContext().getRealPath("/")
		+ "attached/";
	//	String saveUrl = request.getContextPath() + "/attached/";
		String saveUrl = "/attached/";

		
		String dirName="image";
		savePath += dirName + "/";
		saveUrl += dirName + "/";
		File saveDirFile = new File(savePath);
		if (!saveDirFile.exists()) {
			saveDirFile.mkdirs();
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		String ymd = sdf.format(new Date());
		savePath += ymd + "/";
		saveUrl += ymd + "/";
		File dirFile = new File(savePath);
		if (!dirFile.exists()) {
			dirFile.mkdirs();
		}
		for (int i=0;i<multiFiles.length;i++ ) {
			MultipartFile item=multiFiles[i];
			String fileName = item.getOriginalFilename();
			System.out.println("fileName=" + fileName);
			long fileSize = item.getSize();

			// ????????С
			if (item.getSize() > maxSize) {
				printError(map, "????????С?????????");
				
			}

			// ???)???
			String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1)
					.toLowerCase();
			if (!Arrays.<String> asList(extMap.get(dirName).split(","))
					.contains(fileExt)) {

				printError(map, "??????)???????????)???\n?????" + extMap.get(dirName)
						+ "?????");
				
			}

			SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
			String newFileName = df.format(new Date()) + "_"
					+ new Random().nextInt(1000) + "." + fileExt;
			try {
				File uploadedFile = new File(savePath, newFileName);
				item.transferTo(uploadedFile);
				
				fileUrls[i]=saveUrl+newFileName;
			} catch (Exception e) {
				printError(map, "??????????");
				
			}

		

		}
		return fileUrls;
	}
	private static void printError(ModelMap map, String message) {

		map.put("error", 1);
		map.put("message", message);

	}


}

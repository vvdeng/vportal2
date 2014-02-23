package com.vvdeng.portal.web.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class KindEditorController {
	// 定义允许上传的文件扩展名
	static HashMap<String, String> extMap = new HashMap<String, String>();
	static {
		extMap.put("image", "gif,jpg,jpeg,png,bmp");
		extMap.put("flash", "swf,flv");
		extMap.put("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb");
		extMap.put("file", "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");
	}

	@RequestMapping("/kindeditor/demo.xhtml")
	public String demo() {
		System.out.println("print");
		return "kindeditor/demo";
	}

	@RequestMapping("/kindeditor/content.xhtml")
	public String content(@RequestParam("content")
	String content, ModelMap map) {
		System.out.println(content);
		map.put("content", content);
		return "kindeditor/demo";
	}

	@RequestMapping("/kindeditor/uploadFile.json")
	public String uploadFiles(HttpServletRequest request, ModelMap map) {

		String savePath = request.getSession().getServletContext().getRealPath(
				"/")
				+ "attached/";

		// 文件保存目录URL
		String saveUrl = request.getContextPath() + "/attached/";

		// 最大文件大小
		long maxSize = 1000000;

		if (!ServletFileUpload.isMultipartContent(request)) {
			printError(map, "请选择文件。");
			return "json_uploadFile";
		}
		// 检查目录
		File uploadDir = new File(savePath);
		if (!uploadDir.isDirectory()) {
			printError(map, "上传目录不存在。");
			return "json_uploadFile";
		}
		// 检查目录写权限
		if (!uploadDir.canWrite()) {
			printError(map, "上传目录没有写权限。");
			return "json_uploadFile";
		}

		String dirName = request.getParameter("dir");
		if (dirName == null) {
			dirName = "image";
		}
		if (!extMap.containsKey(dirName)) {
			printError(map, "目录名不正确。");
			return "json_uploadFile";
		}
		// 创建文件夹
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

		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setHeaderEncoding("UTF-8");

		List items = null;
		try {
			items = upload.parseRequest(request);

		} catch (FileUploadException e1) {

			printError(map, "文件解析出错。");
			return "json_uploadFile";
		}

		Iterator itr = items.iterator();
		while (itr.hasNext()) {
			FileItem item = (FileItem) itr.next();
			String fileName = item.getName();

			long fileSize = item.getSize();

			if (!item.isFormField()) {
				// 检查文件大小
				if (item.getSize() > maxSize) {
					printError(map, "上传文件大小超过限制。");
					return "json_uploadFile";
				}

				// 检查扩展名
				String fileExt = fileName.substring(
						fileName.lastIndexOf(".") + 1).toLowerCase();
				if (!Arrays.<String> asList(extMap.get(dirName).split(","))
						.contains(fileExt)) {

					printError(map, "上传文件扩展名是不允许的扩展名。\n只允许"
							+ extMap.get(dirName) + "格式。");
					return "json_uploadFile";
				}

				SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
				String newFileName = df.format(new Date()) + "_"
						+ new Random().nextInt(1000) + "." + fileExt;
				try {
					File uploadedFile = new File(savePath, newFileName);
					item.write(uploadedFile);
				} catch (Exception e) {
					printError(map, "上传文件失败。");
					return "json_uploadFile";
				}

				map.put("errCode", 0);
				map.put("url", saveUrl + newFileName);

			}
		}
		return "json_uploadFile";
	}

	@RequestMapping("/kindeditor/fileManager.json")
	public String fileManager(HttpServletRequest request, ModelMap map) {
		map.put("mixData", Boolean.FALSE);
		String rootPath = request.getSession().getServletContext().getRealPath(
				"/")
				+ "attached/";

		String rootUrl = request.getContextPath() + "/attached/";

		String[] fileTypes = new String[] { "gif", "jpg", "jpeg", "png", "bmp" };

		String dirName = request.getParameter("dir");
		if (dirName != null) {
			if (!Arrays.<String> asList(
					new String[] { "image", "flash", "media", "file" })
					.contains(dirName)) {
				printError(map, "目录名称不符合规范");
				return "json_fileManager";
			}
			rootPath += dirName + "/";
			rootUrl += dirName + "/";
			File saveDirFile = new File(rootPath);
			if (!saveDirFile.exists()) {
				saveDirFile.mkdirs();
			}
		}

		String path = request.getParameter("path") != null ? request
				.getParameter("path") : "";
		String currentPath = rootPath + path;
		String currentUrl = rootUrl + path;
		String currentDirPath = path;
		String moveupDirPath = "";
		if (!"".equals(path)) {
			String str = currentDirPath.substring(0,
					currentDirPath.length() - 1);
			moveupDirPath = str.lastIndexOf("/") >= 0 ? str.substring(0, str
					.lastIndexOf("/") + 1) : "";
		}

		// 排序形式，name or size or type
		String order = request.getParameter("order") != null ? request
				.getParameter("order").toLowerCase() : "name";

		// 不允许使用..移动到上一级目录
		if (path.indexOf("..") >= 0) {
			printError(map, "访问被拒绝");
			return "json_fileManager";
		}
		// 最后一个字符不是/
		if (!"".equals(path) && !path.endsWith("/")) {
			printError(map, "格式不正确");
			return "json_fileManager";
		}
		// 目录不存在或不是目录
		File currentPathFile = new File(currentPath);
		if (!currentPathFile.isDirectory()) {
			printError(map, "目录不存在");
			return "json_fileManager";
		}

		// 遍历目录取的文件信息
		List<Hashtable> fileList = new ArrayList<Hashtable>();
		if (currentPathFile.listFiles() != null) {
			for (File file : currentPathFile.listFiles()) {
				Hashtable<String, Object> hash = new Hashtable<String, Object>();
				String fileName = file.getName();
				if (file.isDirectory()) {
					hash.put("is_dir", true);
					hash.put("has_file", (file.listFiles() != null));
					hash.put("filesize", 0L);
					hash.put("is_photo", false);
					hash.put("filetype", "");
				} else if (file.isFile()) {
					String fileExt = fileName.substring(
							fileName.lastIndexOf(".") + 1).toLowerCase();
					hash.put("is_dir", false);
					hash.put("has_file", false);
					hash.put("filesize", file.length());
					hash.put("is_photo", Arrays.<String> asList(fileTypes)
							.contains(fileExt));
					hash.put("filetype", fileExt);
				}
				hash.put("filename", fileName);
				hash.put("datetime",
						new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(file
								.lastModified()));
				fileList.add(hash);
			}
		}

		if ("size".equals(order)) {
			Collections.sort(fileList, new SizeComparator());
		} else if ("type".equals(order)) {
			Collections.sort(fileList, new TypeComparator());
		} else {
			Collections.sort(fileList, new NameComparator());
		}

		map.put("moveup_dir_path", moveupDirPath);
		map.put("current_dir_path", currentDirPath);
		map.put("current_url", currentUrl);
		map.put("total_count", fileList.size());

		map.put("file_list", fileList);

		return "json_fileManager";
	}

	private void printError(ModelMap map, String message) {

		map.put("error", 1);
		map.put("message", message);

	}

	public class NameComparator implements Comparator {
		public int compare(Object a, Object b) {
			Hashtable hashA = (Hashtable) a;
			Hashtable hashB = (Hashtable) b;
			if (((Boolean) hashA.get("is_dir"))
					&& !((Boolean) hashB.get("is_dir"))) {
				return -1;
			} else if (!((Boolean) hashA.get("is_dir"))
					&& ((Boolean) hashB.get("is_dir"))) {
				return 1;
			} else {
				return ((String) hashA.get("filename"))
						.compareTo((String) hashB.get("filename"));
			}
		}
	}

	public class SizeComparator implements Comparator {
		public int compare(Object a, Object b) {
			Hashtable hashA = (Hashtable) a;
			Hashtable hashB = (Hashtable) b;
			if (((Boolean) hashA.get("is_dir"))
					&& !((Boolean) hashB.get("is_dir"))) {
				return -1;
			} else if (!((Boolean) hashA.get("is_dir"))
					&& ((Boolean) hashB.get("is_dir"))) {
				return 1;
			} else {
				if (((Long) hashA.get("filesize")) > ((Long) hashB
						.get("filesize"))) {
					return 1;
				} else if (((Long) hashA.get("filesize")) < ((Long) hashB
						.get("filesize"))) {
					return -1;
				} else {
					return 0;
				}
			}
		}
	}

	public class TypeComparator implements Comparator {
		public int compare(Object a, Object b) {
			Hashtable hashA = (Hashtable) a;
			Hashtable hashB = (Hashtable) b;
			if (((Boolean) hashA.get("is_dir"))
					&& !((Boolean) hashB.get("is_dir"))) {
				return -1;
			} else if (!((Boolean) hashA.get("is_dir"))
					&& ((Boolean) hashB.get("is_dir"))) {
				return 1;
			} else {
				return ((String) hashA.get("filetype"))
						.compareTo((String) hashB.get("filetype"));
			}
		}
	}

	@RequestMapping(value = "/kindeditor/ajaxFileUpload.json")
	public String ajaxFileUpload(@RequestParam("imgFile")
	MultipartFile[] imgFile, HttpServletRequest request, ModelMap map) {
		map.put("mixData", Boolean.FALSE);
		if (imgFile == null || imgFile.length == 0) {
			printError(map, "请选择文件。");
			return "json_uploadFile";
		}

		String savePath = request.getSession().getServletContext().getRealPath(
				"/")
				+ "attached/";

		// 文件保存目录URL
		String saveUrl = request.getContextPath() + "/attached/";

		// 最大文件大小
		long maxSize = 1000000;

		// 检查目录
		File uploadDir = new File(savePath);
		if (!uploadDir.isDirectory()) {
			printError(map, "上传目录不存在。");
			return "json_uploadFile";
		}
		// 检查目录写权限
		if (!uploadDir.canWrite()) {
			printError(map, "上传目录没有写权限。");
			return "json_uploadFile";
		}

		String dirName = request.getParameter("dir");
		if (dirName == null) {
			dirName = "image";
		}
		if (!extMap.containsKey(dirName)) {
			printError(map, "目录名不正确。");
			return "json_uploadFile";
		}
		// 创建文件夹
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

		for (MultipartFile item : imgFile) {

			String fileName = item.getOriginalFilename();
			System.out.println("fileName=" + fileName);
			long fileSize = item.getSize();

			// 检查文件大小
			if (item.getSize() > maxSize) {
				printError(map, "上传文件大小超过限制。");
				return "json_uploadFile";
			}

			// 检查扩展名
			String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1)
					.toLowerCase();
			if (!Arrays.<String> asList(extMap.get(dirName).split(","))
					.contains(fileExt)) {

				printError(map, "上传文件扩展名是不允许的扩展名。\n只允许" + extMap.get(dirName)
						+ "格式。");
				return "json_uploadFile";
			}

			SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
			String newFileName = df.format(new Date()) + "_"
					+ new Random().nextInt(1000) + "." + fileExt;
			try {
				File uploadedFile = new File(savePath, newFileName);
				item.transferTo(uploadedFile);

			} catch (Exception e) {
				printError(map, "上传文件失败。");
				return "json_uploadFile";
			}

			map.put("error", 0);
			map.put("url", saveUrl + newFileName);

		}

		return "json_ajaxFile";
	}


}

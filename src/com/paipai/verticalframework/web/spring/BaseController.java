/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??BaseController.java
 * 
 * Description??Spring Controller????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-19			????
 */
package com.paipai.verticalframework.web.spring;

import java.io.File;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.propertyeditors.CustomNumberEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.context.ContextLoader;

/**
 * Spring Controller????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class BaseController {

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		//??????????
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		dateFormat.setLenient(false);
		binder.registerCustomEditor(Date.class, new CustomDateEditor(
				dateFormat, true));

		SimpleDateFormat timestampFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm");
		timestampFormat.setLenient(false);
		binder.registerCustomEditor(Timestamp.class, new CustomDateEditor(
				timestampFormat, true));

		//??????????
		binder.registerCustomEditor(int.class, new NativeNumberEditor(
				int.class, true));
		binder.registerCustomEditor(long.class, new NativeNumberEditor(
				long.class, true));
		binder.registerCustomEditor(double.class, new NativeNumberEditor(
				double.class, true));
		binder.registerCustomEditor(float.class, new NativeNumberEditor(
				float.class, true));
		binder.registerCustomEditor(Integer.class, new CustomNumberEditor(
				Integer.class, true));
		binder.registerCustomEditor(Double.class, new CustomNumberEditor(
				Double.class, true));
		binder.registerCustomEditor(Float.class, new CustomNumberEditor(
				Float.class, true));
		binder.registerCustomEditor(BigDecimal.class, new CustomNumberEditor(
				BigDecimal.class, true));
		
		//??????????
		binder.registerCustomEditor(File.class, new CustomFileEditor());
	}
	public static <T> T getBean(String name,Class<T> t) {
		return (T)ContextLoader.getCurrentWebApplicationContext().getBean(name,t);
	}
}

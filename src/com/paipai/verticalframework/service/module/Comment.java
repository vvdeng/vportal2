/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??Comment.java					
 *			
 * Description?????????????????	 											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-10-27   Create	
 */
package com.paipai.verticalframework.service.module;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.paipai.verticalframework.service.config.support.annotation.Component;

/**
 * ???????????????
 * 
 * @author raywu
 * @version 1.1
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Documented
@Component
public @interface Comment {

	String title();

	String message();
}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 														
 * FileName??IBatisDAO.java					
 *			
 * Description??Destroy Annotation????????Spring Bean?????destroy????				 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0      raywu   2009-8-14   Create	
 */
package com.paipai.verticalframework.service.config.support.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * ???????????????IBatisDAO????
 * 
 * @author raywu
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Documented
@Component
public @interface IBatisDAO {

	String name() default "";

	String sqlMapClient() default "sqlMapClient";

	String dataSource() default "dataSource";
}

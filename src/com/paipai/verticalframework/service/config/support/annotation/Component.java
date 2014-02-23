/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??Component.java					
 *			
 * Description?????????Annotation?????Component????Annotation				 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0      raywu  2009-8-14   Create	
 */
package com.paipai.verticalframework.service.config.support.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * ???????Annotation?????Component????Annotation
 * 
 * @author raywu
 * @version 1.0
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
@Documented
public @interface Component {
}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 														
 * FileName??PaiPaiDestroy.java					
 *			
 * Description??Destroy Annotation????????Spring Bean?????destroy????				 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0      raywu   2009-8-10   Create	
 *  1.1      raywu  2009-8-13   ???????PaiPai??
 */
package com.paipai.verticalframework.service.config.support.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Destroy Annotation????????Spring Bean?????destroy????
 * 
 * @author raywu
 * @version 1.1
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Documented
public @interface Destroy {
}

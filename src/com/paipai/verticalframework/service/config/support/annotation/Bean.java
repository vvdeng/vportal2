/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??PaiPaiBean.java					
 *			
 * Description??Bean????Annotation				 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0      raywu  2009-8-10   Create	
 *  1.1      raywu  2009-8-13   ???????PaiPai??
 */
package com.paipai.verticalframework.service.config.support.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.paipai.verticalframework.service.config.support.utils.ScopeConstant;

/**
 * Bean????Annotation
 * 
 * @author raywu
 * @version 1.1
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Documented
@Component
public @interface Bean {

	String name() default "";

	String scope() default ScopeConstant.SCOPE_SINGLETON;

	boolean lazy() default false;

	String factoryMethod() default "";
}

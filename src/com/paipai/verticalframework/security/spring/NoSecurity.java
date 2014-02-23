/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??NoSecurity.class				
 *			
 * Description??????????а????????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0   raywu  2010-11-09  Create	
 */
package com.paipai.verticalframework.security.spring;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * ????????а????????
 * 
 * @author raywu
 * @version 1.0
 */
@Retention(RetentionPolicy.RUNTIME)
@Target( { ElementType.TYPE })
@Documented
public @interface NoSecurity {

}

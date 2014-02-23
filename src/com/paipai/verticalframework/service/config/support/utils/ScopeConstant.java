/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??ScopeConstant.java					
 *			
 * Description??Spring Scope????											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2009-8-10   Create	
 */
package com.paipai.verticalframework.service.config.support.utils;

/**
 * Spring Scope????
 * 
 * @author raywu
 * @version 1.0
 */
public interface ScopeConstant {

	/**
	 * Scope identifier for the standard singleton scope: "singleton". Custom
	 * scopes can be added via <code>registerScope</code>.
	 * 
	 * @see #registerScope
	 */
	String SCOPE_SINGLETON = "singleton";

	/**
	 * Scope identifier for the standard prototype scope: "prototype". Custom
	 * scopes can be added via <code>registerScope</code>.
	 * 
	 * @see #registerScope
	 */
	String SCOPE_PROTOTYPE = "prototype";
}

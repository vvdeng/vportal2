/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??LogAppender.java
 * 
 * Description????????????????
 * History??
 * ?汾??		????				????				?????????????
 * 1.0		sunniyang		Nov 16, 2010	????
 */
package com.paipai.verticalframework.auditlog.appender;

import com.paipai.verticalframework.auditlog.AuditLog;

/**
 * ?????????????????????????????????????????????????????????
 * @author sunniyang
 * @version 1.0
 * @see
 */
public interface LogAppender {

	/**
	 * ???????????
	 * @param auditLog????????
	 * @see 
	 */
	void append(AuditLog auditLog);
}

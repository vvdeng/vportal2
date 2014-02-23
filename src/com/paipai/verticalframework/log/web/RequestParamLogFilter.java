/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName：RequestParamLogFilter.java					
 *			
 * Description：自动打印请求参数Filter
 * History：
 *  版本号    作者      日期       简要介绍相关操作
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.log.web;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.paipai.verticalframework.log.Log;

/**
 * 自动打印请求参数Filter
 * 
 * @author raywu（最新修改者）
 * @version 1.0（新版本号）
 * @see 参考的JavaDoc
 */
public class RequestParamLogFilter implements Filter {

	public void init(FilterConfig config) throws ServletException {
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		String uri = "";
		if (request instanceof HttpServletRequest) {
			uri = ((HttpServletRequest) request).getRequestURI();
			String referer = ((HttpServletRequest) request)
					.getHeader("Referer");
			Log.logInfo("request(uri={0},referer={1})", uri, referer);
		}
		Map params = request.getParameterMap();
		StringBuffer buffer = new StringBuffer();
		int index = 0;
		// TODO 这里需要注意处理一下请求数据太大的情况(譬如上传文件)
		for (Object key : params.keySet()) {
			if (index > 0) {
				buffer.append(";");
			}
			buffer.append(key).append("=");
			Object value = params.get(key);
			if (value instanceof String) {
				buffer.append(value);
			}
			else if (value instanceof String[]) {
				String[] array = (String[]) value;
				for (int i = 0; i < array.length; i++) {
					if (i > 0) {
						buffer.append(",");
					}
					buffer.append(array[i]);
				}
			}
			else {
				buffer.append(value);
			}
			index++;
		}
		Log.logInfo("request(uri={0}) param[{1}]", uri, buffer.toString());
		chain.doFilter(request, response);
	}

	public void destroy() {
	}
}

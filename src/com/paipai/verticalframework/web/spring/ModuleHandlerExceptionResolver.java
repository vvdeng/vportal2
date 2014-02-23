/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??ModuleHandlerExceptionResolver.java
 * 
 * Description??????????9????
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		raywu		2010-11-19			????
 */
package com.paipai.verticalframework.web.spring;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

import com.paipai.verticalframework.core.RequestMDC;
import com.paipai.verticalframework.core.ServiceException;
import com.paipai.verticalframework.log.Log;
import com.paipai.verticalframework.service.module.Comment;
import com.paipai.verticalframework.service.module.SystemCodeConstant;

/**
 * ????????9????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class ModuleHandlerExceptionResolver extends
		SimpleMappingExceptionResolver {

	public final static int STATUS_CODE_SUCCESS = 200;
	public final static long DEFAULT_ERROR_CODE = -10;
	public final static String ERROR_CODE = "errCode";
	public final static String ERROR_TITLE = "title";
	public final static String ERROR_MESSAGE = "msg";
	private String defaultTitle;
	private String defaultMessage;
	private String pageError = "page_error";
	private String jsonError = "json_error";
	private String urltextError = "urltext_error";

	public ModuleHandlerExceptionResolver() {
		setDefaultStatusCode(HttpServletResponse.SC_OK);
	}

	public ModelAndView doResolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception exception){
		if (RequestUtils.isRequestHessian(request.getContextPath())) {
			Log.logInfo("hessian service[" + RequestMDC.getRequestURI() + "] exception happened");
			return null;
		}
		ModelMap model = null;

		if (!(exception instanceof ServiceException)) {
			ModelAndView mav = super.doResolveException(request, response,
					handler, exception);
			if (mav != null) {
				return mav;
			}
		}

		if (exception instanceof ServiceException) {
			ServiceException se = (ServiceException) exception;
			Log.logInfo("ServiceException Happen:{0}", se.getErrorCode());

			Comment commentInfo = SystemCodeConstant.getComment(se
					.getErrorCode());
			if (commentInfo != null) {
				response.setStatus(HttpServletResponse.SC_OK);
				// applyStatusCodeIfPossible(request, response,
				// HttpServletResponse.SC_OK);

				String message = SystemCodeConstant.formatMessage(se
						.getErrorCode(), se.getMessageKeyParams());
				model = new ModelMap();
				model.put(ERROR_CODE, se.getErrorCode());
				model.put(ERROR_TITLE, commentInfo.title());
				model.put(ERROR_MESSAGE, message);
			}
		}
		else {
			Log.logError("SystemException Happen", exception);
		}

		if (model == null) {
			model = new ModelMap();
			model.put(ERROR_CODE, DEFAULT_ERROR_CODE);
			model.put(ERROR_TITLE, defaultTitle);
			model.put(ERROR_MESSAGE, defaultMessage);
		}
		if (RequestUtils.isRequestJson()) {
			return new ModelAndView(this.jsonError, model);
		}
		else if (RequestUtils.isRequestUrlText()) {
			return new ModelAndView(this.urltextError, model);
		}
		else {
			return new ModelAndView(this.pageError, model);
		}
	}

	public void setDefaultTitle(String defaultTitle) {
		this.defaultTitle = defaultTitle;
	}

	public void setDefaultMessage(String defaultMessage) {
		this.defaultMessage = defaultMessage;
	}

	public void setPageError(String pageError) {
		this.pageError = pageError;
	}

	public void setJsonError(String jsonError) {
		this.jsonError = jsonError;
	}
}

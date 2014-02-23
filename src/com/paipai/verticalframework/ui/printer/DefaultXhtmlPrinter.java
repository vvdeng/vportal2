/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??DefaultPrettyPrinter.java					
 *			
 * Description??????????????????							 												
 * History??
 * ?汾??    ????           ????          ?????????????
 *  1.0   bevisdeng        2010-10-22           Create	
 */

package com.paipai.verticalframework.ui.printer;

import java.io.IOException;
import java.io.Writer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.JspFragment;
import javax.servlet.jsp.tagext.JspTag;

import com.paipai.verticalframework.ui.util.PrintHelper;

/**
 * ????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */

public class DefaultXhtmlPrinter
{
	protected PrintHelper printHelper = new PrintHelper();
	protected JspFragment jspFragment;
	protected JspContext jspContext;
	protected JspTag parentTag;

	public DefaultXhtmlPrinter(JspFragment jspFragment, JspContext jspContext)
	{
		this(jspFragment, jspContext, null);
	}

	public DefaultXhtmlPrinter(JspFragment jspFragment, JspContext jspContext,
			JspTag parentTag)
	{
		this.jspFragment = jspFragment;
		this.jspContext = jspContext;
		this.parentTag = parentTag;
	}

	public void printBody()
	{
		printHelper.closeElement();
		if (jspFragment != null)
		{
			try
			{
				jspFragment.invoke(printHelper.getWriter());
			} catch (JspException e)
			{
				throw new RuntimeException(e);
			} catch (IOException e)
			{
				throw new RuntimeException(e);
			}
		}
	}

	public void printBody(Writer writer)
	{
		printHelper.closeElement();
		if (jspFragment != null)
		{
			try
			{
				jspFragment.invoke(writer);
			} catch (JspException e)
			{
				throw new RuntimeException(e);
			} catch (IOException e)
			{
				throw new RuntimeException(e);
			}
		}
	}

	public void flushTag()
	{
		try
		{
			jspContext.getOut().print(printHelper.getBuffer());
		} catch (IOException e)
		{
			throw new RuntimeException(e);
		}

	}
	
	public String getAbsolutePath(String srcPath)
	{
		if (srcPath.startsWith("/"))
		{
			String contextPath = getContextPath();
			if (!"/".equals(contextPath))
			{
				return contextPath + srcPath;
			}
		}
		
		return srcPath;
	}

	public String getContextPath()
	{
		HttpServletRequest request = (HttpServletRequest) ((PageContext) jspContext)
				.getRequest();
		return request.getContextPath();
	}
}

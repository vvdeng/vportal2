package com.paipai.verticalframework.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.paipai.verticalframework.core.RequestMDC;

/**
 * ??????????????
 * @author raywu
 * 
 */
public class RequestMDCFilter implements Filter
{
	public void init(FilterConfig filterConfig) throws ServletException
	{
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException
	{
		try
		{
			RequestMDC.setThreadID(Thread.currentThread().getId());
			if (request instanceof HttpServletRequest)
			{
				HttpServletRequest httpServletRequest = (HttpServletRequest) request;
				RequestMDC.setProxyServerIP(httpServletRequest.getRemoteAddr());
				String requestIP = httpServletRequest.getHeader("x-real-ip");
				if (requestIP == null || requestIP.length() == 0)
				{
					requestIP = httpServletRequest.getRemoteAddr();
				}
				RequestMDC.setRequestIP(requestIP);
				String uri = httpServletRequest.getRequestURI();
				int index = uri.indexOf('?');
				if (index > 0)
				{
					uri = uri.substring(0, index);
				}
				RequestMDC.setRequestURI(httpServletRequest.getRequestURI());
				if (httpServletRequest.getSession() == null)
				{
					RequestMDC.setSessionID("0");
				} else
				{
					RequestMDC.setSessionID(httpServletRequest.getSession().getId());
				}
			}
			filterChain.doFilter(request, response);
		} finally
		{
			RequestMDC.clear();
		}
	}

	public void destroy()
	{
	}
}

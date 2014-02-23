package com.vvdeng.portal.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AdminFilter implements Filter {

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp,
			FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		HttpServletRequest hReq = (HttpServletRequest) req;
		HttpSession session = hReq.getSession();
		if (session != null && session.getAttribute("sysUser") != null) {
			chain.doFilter(req, resp);
		} else {
			System.out.println("AdminFilter not login yet");
			// ((HttpServletResponse)resp).sendRedirect("login.jhtml");
			hReq.getRequestDispatcher("/admin/needLogin.jhtml").forward(req,
					resp);

		}

	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

}

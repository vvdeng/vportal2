package com.paipai.verticalframework.security.util;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.paipai.verticalframework.security.spring.data.AccountBO;

public class PermissionChecker
{
	public static boolean checkFunction(HttpSession session, String function)
	{
		List<String> functions = (List<String>) session
				.getAttribute("functions");

		if (functions != null && functions.size() > 0)
		{
			boolean hasFunction = (functions.contains(function));
			if (hasFunction)
				return true;

			for (String f : functions)
			{
				int index = f.indexOf("*");
				if (index > 0)
				{
					String start = f.substring(0, index);
					String end = f.substring(index + 1);

					if (function.startsWith(start) && function.endsWith(end))
					{
						return true;
					}
				} else if (f.length() > 0)
				{
					if (function.startsWith(f))
					{
						return true;
					}
				}
			}
		}
		return false;
	}

	public static boolean test(String function)
	{
		List<String> functions = new ArrayList<String>();
		functions.add("chartreport!classOperatorChart.action");

		if (functions != null && functions.size() > 0)
		{
			boolean hasFunction = (functions.contains(function));
			if (hasFunction)
				return true;

			for (String f : functions)
			{
				int index = f.indexOf("*");
				if (index > 0)
				{
					String start = f.substring(0, index);
					String end = f.substring(index + 1);

					if (function.startsWith(start) && function.endsWith(end))
					{
						if (function.indexOf(end) >= index)
							return true;
					}
				}
			}
		}
		return false;
	}

	public static void main(String[] args)
	{
		System.out.println(test("chartreport!classOperatorChart.action"));
	}

	public static AccountBO getLoginAccount(HttpSession session)
	{
		return (AccountBO) session.getAttribute("loginAccount");

	}

	public static String getLoginUserName(HttpSession session)
	{
		AccountBO bo = getLoginAccount(session);
		if (bo != null && bo.getUserBO() != null)
		{
			return bo.getUserBO().getUserName();
		}
		return null;
	}
}

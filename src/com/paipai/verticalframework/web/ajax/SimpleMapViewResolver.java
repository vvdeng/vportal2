package com.paipai.verticalframework.web.ajax;

import java.util.Locale;
import java.util.Map;

import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.AbstractCachingViewResolver;

public class SimpleMapViewResolver extends AbstractCachingViewResolver
{
	private Map<String, View> viewMap;

	protected View loadView(String viewName, Locale locale) throws Exception
	{
		if (viewMap != null)
		{
			for (Map.Entry<String, View> entry : viewMap.entrySet())
			{
				if (viewName.startsWith(entry.getKey()))
				{
					return entry.getValue();
				}
			}
		}
		return null;
	}

	public void setViewMap(Map<String, View> viewMap)
	{
		this.viewMap = viewMap;
	}
}
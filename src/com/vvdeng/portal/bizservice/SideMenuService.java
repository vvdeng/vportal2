package com.vvdeng.portal.bizservice;

import org.springframework.ui.ModelMap;

import com.vvdeng.portal.web.form.SideForm;

public interface SideMenuService {
	public void tree(SideForm sideForm,ModelMap map);
}

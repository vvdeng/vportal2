package com.vvdeng.portal.bizservice;

import org.springframework.ui.ModelMap;

import com.paipai.verticalframework.service.config.support.annotation.Bean;
import com.vvdeng.portal.web.form.SideForm;

@Bean(name="editMenu")
public class SideMenuEditMenuService implements SideMenuService {
	@Override
  public void tree(SideForm sideForm,ModelMap map){
	  System.out.println("SideMenuEditMenu-->tree");
  }
}

package com.vvdeng.portal.web.vo;

import java.util.ArrayList;
import java.util.List;

import com.vvdeng.portal.entity.Menu;
import com.vvdeng.portal.entity.SysMenu;

public class MenuVo {
	private Long id;
	private String title;

	private List<MenuVo> subMenuList;

	public MenuVo() {

	}

	public MenuVo(Menu menu) {
		this.id = menu.getId();
		this.title = menu.getTitle();
		this.subMenuList = new ArrayList();
	}

	public MenuVo(SysMenu sysMenu) {
		this.id = sysMenu.getId();
		this.title = sysMenu.getTitle();
		this.subMenuList = new ArrayList();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<MenuVo> getSubMenuList() {
		return subMenuList;
	}

	public void setSubMenuList(List<MenuVo> subMenuList) {
		this.subMenuList = subMenuList;
	}

	public int getSubMenuListSize() {
		return this.subMenuList.size();
	}
}

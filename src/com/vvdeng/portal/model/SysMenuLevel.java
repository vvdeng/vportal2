package com.vvdeng.portal.model;

import java.util.HashMap;
import java.util.Map;

public enum SysMenuLevel {
	TOP(1, "顶级"), FIRST(2, "一级"),SECOND(3,"二级");
	private Integer id;
	private String desc;

	private SysMenuLevel(Integer id, String desc) {
		this.id = id;
		this.desc = desc;
	}

	public static Map toMap() {
		Map map = new HashMap();
		for(SysMenuLevel value:SysMenuLevel.values()){
			map.put(value.getId(), value.getDesc());
		}
		return map;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}
}

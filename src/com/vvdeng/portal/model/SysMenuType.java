package com.vvdeng.portal.model;

import java.util.HashMap;
import java.util.Map;

public enum SysMenuType {
	LIST(1, "列表"), TREE(2, "树形");
	private Integer id;
	private String desc;

	private SysMenuType(Integer id, String desc) {
		this.id = id;
		this.desc = desc;
	}

	public static Map toMap() {
		Map map = new HashMap();
		for(SysMenuType value:SysMenuType.values()){
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

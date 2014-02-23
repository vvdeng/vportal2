package com.vvdeng.portal.model;

import java.util.HashMap;
import java.util.Map;

public enum ConfigType {
	LOGO(1, "logo"), NEWEST(2, "newest"),LEFTUP(3,"leftUp"),RIGHTUP1(4,"rightUp1"),
	RIGHTUP2(5,"rightUp2"),MIDDLE1(6,"middle1"),MIDDLE2(7,"middle2"),MIDDLE3(8,"middle3"),
	BOTTOM(9,"bottom");
	private Integer id;
	private String desc;

	private ConfigType(Integer id, String desc) {
		this.id = id;
		this.desc = desc;
	}

	public static Map<Integer,String> toMap() {
		Map map = new HashMap();
		for(ConfigType value:ConfigType.values()){
			map.put(value.getId(), value.getDesc());
		}
		return map;
	}
	public static Map<String,Integer> toDescMap() {
		Map map = new HashMap();
		for(ConfigType value:ConfigType.values()){
			map.put(value.getDesc(), value.getId());
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

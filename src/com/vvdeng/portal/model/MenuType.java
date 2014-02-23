package com.vvdeng.portal.model;

import java.util.HashMap;
import java.util.Map;

public enum MenuType {
	TEXT_TYPE("文本模式",1),IMG_TYPE("图片模式",2);
	private MenuType (String name,Integer value){
		this.name=name;
		this.value=value;
	}
	private String name;
	private Integer value;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getValue() {
		return value;
	}
	public void setValue(Integer value) {
		this.value = value;
	}
	public static Map<Integer,String> toMap(){
		Map<Integer, String> result=new HashMap<Integer, String>();
		for (MenuType type : values()) {
			result.put(type.getValue(), type.getName());
		}
		return result;
	}
}

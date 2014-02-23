package com.vvdeng.portal.model;

import java.util.HashMap;
import java.util.Map;

import com.paipai.component.configcenter.api.conf.res.ConfItem;

public enum ConfigDataType {
	SINGLE(0),LIST(1);
	private ConfigDataType(Integer val){
		this.val=val;
	}
	private Integer val;
	public Integer getVal() {
		return val;
	}
	public void setVal(Integer val) {
		this.val = val;
	}
}

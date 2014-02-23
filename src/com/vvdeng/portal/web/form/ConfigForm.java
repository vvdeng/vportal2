package com.vvdeng.portal.web.form;

import org.springframework.web.multipart.MultipartFile;

public class ConfigForm {
	private Long id;
	private String name;
	private String val;
	private Integer type;
	private Integer dataType;
	private MultipartFile[] imageFiles;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getVal() {
		return val;
	}
	public void setVal(String val) {
		this.val = val;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getDataType() {
		return dataType;
	}
	public void setDataType(Integer dataType) {
		this.dataType = dataType;
	}
	public MultipartFile[] getImageFiles() {
		return imageFiles;
	}
	public void setImageFiles(MultipartFile[] imageFiles) {
		this.imageFiles = imageFiles;
	}
}

package com.vvdeng.portal.web.form;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

import com.paipai.verticalframework.core.vo.BasePageForm;

public class MenuForm extends BasePageForm {
	private Long id;
	private Long parentId;
	private String title;
	private String description;
	private Integer level;
	private Integer state;
	private String imgUrl;
	MultipartFile[] imgFile;
	private String operation;
	private String href;
	private Integer type;
	private Integer isParent;
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public MultipartFile[] getImgFile() {
		return imgFile;
	}

	public void setImgFile(MultipartFile[] imgFile) {
		this.imgFile = imgFile;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getIsParent() {
		return isParent;
	}

	public void setIsParent(Integer isParent) {
		this.isParent = isParent;
	}

}

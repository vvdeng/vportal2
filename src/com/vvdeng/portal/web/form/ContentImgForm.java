package com.vvdeng.portal.web.form;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

import com.paipai.verticalframework.core.vo.BasePageForm;

public class ContentImgForm extends BasePageForm {
	private Long id;
	private Long contentId;
	private String  imagePath;
	private Integer height;
	private Integer width;
	private Integer flag;
	private String info;
	private MultipartFile[] imageFile;
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getContentId() {
		return contentId;
	}

	public void setContentId(Long contentId) {
		this.contentId = contentId;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public Integer getHeight() {
		return height;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	public Integer getWidth() {
		return width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public MultipartFile[] getImageFile() {
		return imageFile;
	}

	public void setImageFile(MultipartFile[] imageFile) {
		this.imageFile = imageFile;
	}


}

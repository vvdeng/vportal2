package com.vvdeng.portal.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "news")
public class News implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String title;
	
	private String author;
	private String source;
	private String tag;
	private String mainImagePath;
	private String summary;
	private Integer state;
	private Long firstMenuId;
	private Long secondMenuId;
	private Date createTime;
	private Date lastEditTime;
	private Integer type;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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



	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}
	@Column(name="main_image_path")
	public String getMainImagePath() {
		return mainImagePath;
	}

	public void setMainImagePath(String mainImagePath) {
		this.mainImagePath = mainImagePath;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public Long getFirstMenuId() {
		return firstMenuId;
	}

	public void setFirstMenuId(Long firstMenuId) {
		this.firstMenuId = firstMenuId;
	}

	public Long getSecondMenuId() {
		return secondMenuId;
	}

	public void setSecondMenuId(Long secondMenuId) {
		this.secondMenuId = secondMenuId;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getLastEditTime() {
		return lastEditTime;
	}

	public void setLastEditTime(Date lastEditTime) {
		this.lastEditTime = lastEditTime;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

}

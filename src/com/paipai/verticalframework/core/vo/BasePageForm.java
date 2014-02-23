/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??BasePageForm.java					
 *			
 * Description?????????????漰????????????????????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0      raywu  2010-09-28   Create	
 */
package com.paipai.verticalframework.core.vo;

import com.paipai.verticalframework.core.ToStringSupport;

/**
 * ???????????漰????????????????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class BasePageForm extends ToStringSupport {

	// ????
	protected int page = 1;
	// ???С
	protected int offset = 10;
	// ??????
	protected String sortName;
	// ?????
	protected String sortMode = "desc";
	
	protected boolean selCount=true;
	
	protected String extraConditon;

	public String getSortName() {
		return sortName;
	}

	public void setSortName(String sortName) {
		this.sortName = sortName;
	}

	public String getSortMode() {
		return sortMode;
	}

	public void setSortMode(String sortMode) {
		this.sortMode = sortMode;
	}

	public boolean isSelCount() {
		return selCount;
	}

	public void setSelCount(boolean selCount) {
		this.selCount = selCount;
	}

	public String getExtraConditon() {
		return extraConditon;
	}

	public void setExtraConditon(String extraConditon) {
		this.extraConditon = extraConditon;
	}

	public int getPage() {
		return page;
	}

	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		if (offset > 0 && offset <= 200)
			this.offset = offset;
	}

	public void setPage(int page) {
		if (page <= 0) {
			page = 1;
		}
		this.page = page;
	}

	public int getFrom() {
		int from = (this.page - 1) * getOffset();
		return (from < 0 ? 0 : from);
	}

	public String getPageUrl() {
		StringBuffer buff = new StringBuffer("page=" + this.getPage());
		if (this.getSortName() != null
				&& this.getSortName().trim().length() > 0) {
			buff.append("&sortName=");
			buff.append(this.getSortName());
			if (this.getSortMode() != null
					&& this.getSortMode().trim().length() > 0) {
				buff.append("&sortMode=");
				buff.append(this.getSortMode());
			}
			else {
				this.setSortMode("DESC");
				buff.append("&sortMode=");
				buff.append(this.getSortMode());
			}
		}
		return buff.toString();
	}
}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??PageModel.java					
 *			
 * Description???????????
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0      raywu  2010-09-28   Create	
 */
package com.paipai.verticalframework.core.vo;

import java.util.Collection;

import com.paipai.verticalframework.core.ToStringSupport;

/**
 * ?????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class PageModel<T> extends ToStringSupport {

	private Page<T> page;
	private BasePageForm pageForm;

	public PageModel(Page<T> page, BasePageForm pageForm) {
		super();
		this.page = page;
		this.pageForm = pageForm;
	}

	public PageModel(Collection<T> list, BasePageForm pageForm) {
		super();
		this.page = new Page(list);
		this.pageForm = pageForm;
	}

	public Page<T> getPage() {
		return page;
	}

	public BasePageForm getPageForm() {
		return pageForm;
	}
	public int getPageNum(){
		int pageNum=page.getCount()/pageForm.getOffset();
		if(page.getCount()%pageForm.getOffset()!=0){
			pageNum++;
		}
		return pageNum;
	}

}

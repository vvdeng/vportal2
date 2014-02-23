package com.paipai.verticalframework.web.upload;

import com.paipai.verticalframework.core.ToStringSupport;

/** 
 * <??????>
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class AjaxFileData extends ToStringSupport {

	private String filename;
	private String token;

	public AjaxFileData(String filename, String token) {
		super();
		this.filename = filename;
		this.token = token;
	}

	public String getFilename() {
		return filename;
	}

	public String getToken() {
		return token;
	}

}

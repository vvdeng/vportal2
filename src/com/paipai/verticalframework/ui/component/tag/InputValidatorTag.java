/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??InputValidatorTag.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		sunniyang		Feb 28, 2011			????
 */
package com.paipai.verticalframework.ui.component.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;

import com.paipai.verticalframework.ui.component.printer.InputValidatorPrinter;
import com.paipai.verticalframework.ui.tag.form.FormItemValidatorTag;

/** 
 * ??b????????У????
 * @author sunniyang????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class InputValidatorTag extends FormItemValidatorTag {
	
	private static Integer idStep = 2012;
	private String id = "_iv_" + (idStep++);
	private String setId;
	private String tipLabel;
	
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}

	public String getSetId() {
		return setId;
	}
	
	public void setSetId(String setId) {
		this.setId = setId;
	}
	
	public String getTipLabel() {
		return tipLabel;
	}
	
	public void setTipLabel(String tipLabel) {
		this.tipLabel = tipLabel;
	}

	@Override
	public void doTag() throws JspException, IOException {
		if ((this.getFormat() != null && this.getFormat().length() != 0) && Format.valueOf(this.getFormat()) == null) {
			this.setFormat("");
		}
		InputValidatorPrinter printer = new InputValidatorPrinter(super.getJspBody(), super.getJspContext());
		printer.printValidator(id, setId, tipLabel, this.getTargetId(), this.getFormat(), this.isRequired(), 
				this.getMinLength(), this.getMaxLength(), this.getMinValue(), this.getMaxValue(), 
				this.isSingle(), this.isTrim());
	}
}

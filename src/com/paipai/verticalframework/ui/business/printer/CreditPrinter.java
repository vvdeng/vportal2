/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??CreditPrinter.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		carldong		2010-11-19			????
 */
package com.paipai.verticalframework.ui.business.printer;

import java.io.IOException;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.tagext.JspFragment;

import com.paipai.verticalframework.ui.printer.DefaultXhtmlPrinter;

/**
 * <??????>
 * 
 * @author carldong????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class CreditPrinter extends DefaultXhtmlPrinter {

	private static final String SELLER = "seller";
	private static final String BUYER = "buyer";

	public CreditPrinter(JspFragment jspFragment, JspContext jspContext) {
		super(jspFragment, jspContext);
	}

	public void printValue(long credit, String type) throws IOException {
		if (type.trim().equalsIgnoreCase(SELLER)) {
			if (credit >= 1 && credit <= 4) {
				printHelper.text("<span class=\"srank_01\"></span>");
			}
			if (credit >= 5 && credit <= 10) {
				printHelper.text("<span class=\"srank_02\"></span>");
			}
			if (credit >= 11 && credit <= 20) {
				printHelper.text("<span class=\"srank_03\"></span>");
			}
			if (credit >= 21 && credit <= 40) {
				printHelper.text("<span class=\"srank_04\"></span>");
			}
			if (credit >= 41 && credit <= 100) {
				printHelper.text("<span class=\"srank_05\"></span>");
			}
			if (credit >= 101 && credit <= 300) {
				printHelper.text("<span class=\"srank_11\"></span>");
			}
			if (credit >= 301 && credit <= 1000) {
				printHelper.text("<span class=\"srank_12\"></span>");
			}
			if (credit >= 1001 && credit <= 3000) {
				printHelper.text("<span class=\"srank_13\"></span>");
			}
			if (credit >= 3001 && credit <= 5000) {
				printHelper.text("<span class=\"srank_14\"></span>");
			}
			if (credit >= 5001 && credit <= 10000) {
				printHelper.text("<span class=\"srank_15\"></span>");
			}
			if (credit >= 10001 && credit <= 20000) {
				printHelper.text("<span class=\"srank_21\"></span>");
			}
			if (credit >= 20001 && credit <= 50000) {
				printHelper.text("<span class=\"srank_22\"></span>");
			}
			if (credit >= 50001 && credit <= 100000) {
				printHelper.text("<span class=\"srank_23\"></span>");
			}
			if (credit >= 100001 && credit <= 200000) {
				printHelper.text("<span class=\"srank_24\"></span>");
			}
			if (credit >= 200001 && credit <= 500000) {
				printHelper.text("<span class=\"srank_25\"></span>");
			}
			if (credit >= 500001 && credit <= 1000000) {
				printHelper.text("<span class=\"srank_31\"></span>");
			}
			if (credit >= 1000001 && credit <= 2000000) {
				printHelper.text("<span class=\"srank_32\"></span>");
			}
			if (credit >= 2000001 && credit <= 5000000) {
				printHelper.text("<span class=\"srank_33\"></span>");
			}
			if (credit >= 5000001 && credit <= 10000000) {
				printHelper.text("<span class=\"srank_34\"></span>");
			}
			if (credit >= 10000000) {
				printHelper.text("<span class=\"srank_35\"></span>");
			}
		}
		else if (type.trim().equalsIgnoreCase(BUYER)) {

		}
		flushTag();

	}
}

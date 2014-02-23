/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??PrintHelper.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		bevisdeng		2010-11-19			????
 */

package com.paipai.verticalframework.ui.util;

import java.io.StringWriter;
import java.io.Writer;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;

/**
 * Html??????????????
 * 
 * @author bevisdeng????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class PrintHelper {

	public PrintHelper() {
		out = new StringWriter();
	}

	public StringBuffer getBuffer() {
		return out.getBuffer();
	}

	public Writer getWriter() {
		return out;
	}

	public void closeElement() {
		closeOpenTagIfNecessary();
		elementIsEmpty = false;
	}

	/**
	 * ????????????
	 * 
	 * @param qName
	 *            :??????
	 * @see com.paipai.verticalframework.ui.constant.Tag
	 */
	public void startElement(Tag qName) {
		_startElement(qName.toString());
	}

	public void startElement(String prefix, Tag localName) {
		_startElement(prefix + ":" + localName);
	}

	private void _startElement(String name) {
		closeOpenTagIfNecessary();

		out.write("<");
		out.write(name);
		elementTagIsOpen = true;
		elementIsEmpty = true;
	}

	/**
	 * ????????????
	 * 
	 * @param qName
	 *            :??????
	 * @see com.paipai.verticalframework.ui.constant.Tag
	 */
	public void endElement(Tag qName) {
		_endElement(qName.toString());
	}

	public void endElement(String prefix, Tag localName) {
		_endElement(prefix + ":" + localName);
	}

	private void _endElement(String name) {
		if (elementIsEmpty) {
			out.write(" ");
			out.write("/");
			out.write(">");
			elementIsEmpty = false;
		} else {
			out.write("<");
			out.write("/");
			out.write(name);
			out.write(">");
		}
		elementTagIsOpen = false;
	}

	/**
	 * ????????????????????????????
	 * 
	 * @param qName
	 *            ?????????
	 * @param value
	 *            ???????
	 * @return
	 * @see com.paipai.verticalframework.ui.constant.Attr
	 */
	public void attribute(Attr qName, String value) {
		if (value != null) {
			_attribute(qName.toString(), value);
		}
	}
	public void attribute(Attr qName) {
			_attribute(qName.toString(), null);
	}
	/**
	 * ??????????????????????????趨?????????
	 * 
	 * @param qName
	 *            ?????????
	 * @param value
	 *            ???????
	 * @param defaultValue
	 *            ??????????
	 * @see com.paipai.verticalframework.ui.constant.Attr
	 */
	public void attribute(Attr qName, String value, String defaultValue) {
		if (value != null && value.trim().length() > 0) {
			_attribute(qName.toString(), value);
		} else {
			_attribute(qName.toString(), defaultValue);
		}
	}

	public void attribute(String prefix, Attr localName, String value) {
		_attribute(prefix + localName.toString(), value);
	}
	public void attribute(String qName, String value) {
		_attribute(qName, value);
	}
	private void _attribute(String qName, String value) {
		if (!elementTagIsOpen)
			throw new IllegalStateException("?????????????????????У?");
		if (null == qName) {
			throw new NullPointerException("??????????????");
		} else {
			out.write(" ");
			out.write(qName);
			if (value != null) {
				out.write("=");
				out.write("\"");
				out.write(value);
				out.write("\"");
			}
			return;
		}
	}

	/**
	 * ???????????
	 * 
	 * @param text
	 *            ?????????
	 */
	public void text(Object text) {
		if (null == text) {
			text = "";
		}
		closeOpenTagIfNecessary();
		out.write(text.toString());
		elementIsEmpty = false;
		return;

	}

	/**
	 * ?????????
	 * 
	 * @param text
	 *            ?????????
	 */
	public void script(Object text) {
		if (null == text) {
			throw new NullPointerException("??????????????");
		} else {
			closeOpenTagIfNecessary();
			out.write("<script type='text/javascript'>");
			out.write(text.toString());
			out.write("</script>");
			elementIsEmpty = false;
			return;
		}
	}
	
	public void style(Object text) {
		if (null == text) {
			throw new NullPointerException("??????????????");
		} else {
			closeOpenTagIfNecessary();
			out.write("<style type='text/css'>");
			out.write(text.toString());
			out.write("</style>");
			elementIsEmpty = false;
			return;
		}
	}

	/**
	 * ???html???
	 * 
	 * @param text
	 *            ?????????
	 */
	public void comment(Object comment) {
		if (null == comment) {
			throw new NullPointerException("Attempting to write null comment");
		} else {
			closeOpenTagIfNecessary();
			out.write("<!-- ");
			out.write(comment.toString());
			out.write(" -->");
			return;
		}
	}

	/**
	 * ?????????????
	 * 
	 */
	private void closeOpenTagIfNecessary() {
		if (elementTagIsOpen) {
			out.write(">");
			elementTagIsOpen = false;
		}
	}

	/**
	 * ????????????,positionType?0???????positionType?1?????????
	 * 
	 * @param tag
	 *            ????????
	 * @param positionType
	 *            :???λ??
	 * @see com.paipai.verticalframework.ui.constant.Tag
	 */
	public void removeElement(Tag qName, PositionType positionType) {
		String startElement = "<" + qName;
		String endElement = "</" + qName + ">";
		if (positionType == PositionType.START) {
			out.getBuffer().delete(out.getBuffer().indexOf(startElement),
					out.getBuffer().indexOf(endElement) + endElement.length());
		} else if (positionType == PositionType.END) {
			out.getBuffer().delete(
					out.getBuffer().lastIndexOf(startElement),
					out.getBuffer().lastIndexOf(endElement)
							+ endElement.length());
		}
	}

	public enum PositionType {
		START(0), END(1);
		private int value;

		private PositionType(int value) {
			this.value = value;
		}

		public int getValue() {
			return value;
		}
	}

	private StringWriter out;
	/**
	 *??????????????
	 */
	private volatile boolean elementTagIsOpen;
	/**
	 *??????????????
	 */
	private volatile boolean elementIsEmpty;
}

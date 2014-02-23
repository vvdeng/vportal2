/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName??ColumnTag.java
 * 
 * Description??<????????????????>
 * History??
 * ?汾??		????				????			?????????????
 * 1.0		carldong		2010-11-19			????
 */
package com.paipai.verticalframework.ui.component.tag.table;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.beanutils.PropertyUtils;

import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.function.UIFunction;
import com.paipai.verticalframework.ui.util.PrintHelper;

/**
 * <??????>
 * 
 * @author carldong????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
@SuppressWarnings("serial")
public class ColumnTag extends PaiPaiBodyTagSupport {

	private String property;
	private String title;
	private String className;
	private String width;
	private String style;
	private boolean sortable;
	private String onclick;
	private String escape = "html";

	public Object getCurrentBean() {
		TableTag tableTag = (TableTag) TagSupport.findAncestorWithClass(this,
				TableTag.class);
		return tableTag.getCurrentBean();
	}

	public int doStartTag() throws JspException {
		try {
			if (getCurrentBean() != null) {
				PrintHelper printHelper = new PrintHelper();
				printHelper.startElement(Tag.TD);

				if (className != null) {
					printHelper.attribute(Attr.CLASS, className);
				}
				if (width != null) {
					printHelper.attribute(Attr.WIDTH, width);
				}
				if (style != null) {
					printHelper.attribute(Attr.STYLE, style);
				}

				printHelper.text("");
				flushTag(printHelper.getBuffer());
			}
			else {
				return SKIP_BODY;
			}

		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return EVAL_BODY_BUFFERED;
	}

	@SuppressWarnings("static-access")
	public int doEndTag() throws JspException {
		try {
			PrintHelper printHelper = new PrintHelper();

			TableTag tableTag = (TableTag) TagSupport.findAncestorWithClass(
					this, TableTag.class);

			if (tableTag.getCurrentBean() != null) {
				if (tableTag.getLastBean() != tableTag.getCurrentBean()) {
					tableTag.setLastBean(this.getCurrentBean());
					tableTag.setColumnCount(0);
				}

				if (tableTag.getLastBean() == tableTag.getCurrentBean()) {
					tableTag.setColumnCount(tableTag.getColumnCount() + 1);
				}

				if (this.getBodyContent() == null) {
					if ("LOCALINDEX".equals(property)) {
						printHelper.text(tableTag.getLOCALINDEX());
					}
					else if ("GLOBALINDEX".equals(property)) {
						printHelper.text(tableTag.getGLOBALINDEX());
					}
					else {
						Object propertyValue = this.getColumnPropertyValue(
								tableTag.getCurrentBean(), property);
						String text = "";
						if (propertyValue != null) {
							text = propertyValue.toString();
						}
						if (text != null && !"no".equals(this.escape)) {
							text = UIFunction.escape(text, this.escape);
						}
						printHelper.text(propertyValue);
					}
				}
				else {
					printHelper.text(this.getBodyContent().getString());
				}
				printHelper.endElement(Tag.TD);

			}
			else {
				if (!tableTag.isShowTitle()) {
					return EVAL_PAGE;
				}
				tableTag.setColumnCount(tableTag.getColumnCount() + 1);
				printHelper.startElement(Tag.TH);

				if (!tableTag.isDataNull()
						&& tableTag.getPageModel().getPageForm() != null
						&& sortable) {

					printHelper.startElement(Tag.A);

					String sortName = tableTag.getPageModel().getPageForm()
							.getSortName();
					String sortMode = tableTag.getPageModel().getPageForm()
							.getSortMode();

					String sortStyle = "";

					if (property != null && property.equalsIgnoreCase(sortName)) {
						property = sortName;
						if (sortMode == null) {
							sortStyle = "&darr;";
							sortMode = "DESC";
						}
						else {
							if (sortMode.equalsIgnoreCase("DESC")) {
								sortStyle = "&darr;";
								sortMode = "ASC";
							}
							else if (sortMode.equalsIgnoreCase("ASC")) {
								sortStyle = "&uarr;";
								sortMode = "DESC";
							}
							else {
								sortStyle = "&darr;";
								sortMode = "DESC";
							}
						}
					}
					else {
						sortName = property;
						sortMode = "DESC";
					}

					printHelper.attribute(Attr.HREF, "javascript:"
							+ tableTag.getCallback()
							+ "({pageSize:"
							+ tableTag.getPageModel().getPageForm().getOffset()
							+ ",count:"
							+ tableTag.getPageModel().getPage().getCount()
							+ ",sortName:'"
							+ sortName
							+ "',sortMode:'"
							+ sortMode
							+ "',curPage:"
							+ tableTag.getPageModel().getPageForm().getPage()
							+ ",queryString:'"
							+ TableTag.getPageUrl(tableTag.getPageModel()
									.getPageForm().getPage(), tableTag
									.getPageModel().getPageForm().getOffset(),
									sortName, sortMode) + "'})");

					printHelper.text(title);
					printHelper.text(sortStyle);
					printHelper.endElement(Tag.A);

				}
				else {

					if (onclick != null && onclick.length() > 0) {
						printHelper.startElement(Tag.A);
						printHelper.attribute(Attr.ONCLICK, "javascrip:"
								+ onclick);
						printHelper.attribute(Attr.ONMOUSEOVER,
								"this.style.cursor='hand';");
						printHelper.text(title);
						printHelper.endElement(Tag.A);
					}
					else {
						printHelper.text(title);
					}
				}
				printHelper.endElement(Tag.TH);
			}
			flushTag(printHelper.getBuffer());
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		finally {
			doFinally();
		}
		return EVAL_PAGE;
	}

	public static Object getColumnPropertyValue(Object bean, String property) {
		if (property == null || "".equals(property)) {
			return "";
		}
		try {
			return PropertyUtils.getProperty(bean, property);
		}
		catch (Exception e) {

			return "";
		}
	}

	public void doFinally() {
		title = null;
		property = null;
		className = null;
		width = null;
		style = null;
	}

	public void setSortable(boolean sortable) {
		this.sortable = sortable;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}

	public void setEscape(String escape) {
		this.escape = escape;
	}
}

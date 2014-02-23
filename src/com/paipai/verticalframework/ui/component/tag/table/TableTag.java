/**
 * Copyright (C) 1998-2008 TENCENT Inc.All Rights Reserved.
 * 
 * FileName：TableTag.java
 * 
 * Description：<简要描述本文件的内容>
 * History：
 * 版本号		作者				日期			简要介绍相关操作
 * 1.0		carldong		2010-11-19			创建
 * 2.0      carldong        2010-12-27          查询不到数据时也显示表头信息
 */
package com.paipai.verticalframework.ui.component.tag.table;

import java.util.Collection;
import java.util.Iterator;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

import com.paipai.verticalframework.core.vo.PageModel;
import com.paipai.verticalframework.ui.constant.Attr;
import com.paipai.verticalframework.ui.constant.Tag;
import com.paipai.verticalframework.ui.util.PrintHelper;

/**
 * <类描述>
 * 
 * @author carldong（最新修改者）
 * @version 1.0（新版本号）
 * @see 参考的JavaDoc
 */
@SuppressWarnings("serial")
public class TableTag extends PaiPaiBodyTagSupport {

	private String id;
	private String var;
	private Object model;
	private String defaultMsg = "无数据!";
	private String pageType = TableConstants.PAGE_FOOTER;

	private String callback = "callback";
	private boolean showTitle = true;

	private Iterator it;// 要迭代的对象
	private Object currentBean;
	private Object lastBean;

	private int LOCALINDEX;
	private int GLOBALINDEX;

	private PageModel pageModel;

	private boolean isDataNull = false;
	private int columnCount = 0;

	/**
	 * 标签开始时调用此方法：生成分页头与表头信息
	 * 
	 * @return 返回值：<br>
	 *         SKIP_BODY,跳出标签体 <br>
	 *         EVAL_BODY_INCLUDE,包含标签体，继续执行。
	 */
	public int doStartTag() {
		PrintHelper printHelper = new PrintHelper();

		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.CLASS, "model_table");

		if (model instanceof PageModel) {
			pageModel = (PageModel) model;
		}

		else if (model instanceof Collection) {
			pageModel = new PageModel((Collection) model, null);
		}

		if (isDataList() && pageModel.getPageForm() != null) {
			if (pageType.equalsIgnoreCase(TableConstants.PAGE_HEADER)
					|| pageType.equalsIgnoreCase(TableConstants.PAGE_ALL)) {
				this.printPage(printHelper, pageModel.getPage().getCount(),
						pageModel.getPageForm().getOffset(), pageModel
								.getPageForm().getPage(), callback, pageModel
								.getPageForm().getSortName(), pageModel
								.getPageForm().getSortMode(), "header");
			}
		}
		printHelper.startElement(Tag.TABLE);
		printHelper.attribute(Attr.ID, "" + id);
		printHelper.text("");

		if (isDataList()) {
			it = pageModel.getPage().getList().iterator();
		}
		else {
			isDataNull = true;
		}
		flushTag(printHelper.getBuffer());
		// 不输出头部
		if (!isShowTitle()) {
			setData();
		}
		return EVAL_BODY_INCLUDE;
	}

	private boolean isDataList() {
		return pageModel != null && pageModel.getPage() != null
				&& pageModel.getPage().getList() != null
				&& pageModel.getPage().getList().size() > 0;
	}

	/**
	 * 标签循环时调用此方法：循环数据，设置数据的index值
	 * 
	 * @return 返回值：<br>
	 *         SKIP_BODY,跳出标签体 <br>
	 *         EVAL_BODY_BUFFERED,标签体循环，重复执行该doAfterBody方法。
	 */
	public int doAfterBody() throws JspException {

		if (it != null && it.hasNext()) {
			setData();
			return EVAL_BODY_BUFFERED;
		}
		else {
			if (isDataNull) {
				PrintHelper printHelper = new PrintHelper();
				printHelper.startElement(Tag.TR);
				printHelper.startElement(Tag.TD);
				printHelper
						.attribute(Attr.COLSPAN, String.valueOf(columnCount));
				printHelper.text(defaultMsg);
				printHelper.endElement(Tag.TD);
				printHelper.endElement(Tag.TR);
				flushTag(printHelper.getBuffer());
			}
			return SKIP_BODY;
		}

	}

	private void setData() {
		if (it != null && it.hasNext()) {
			LOCALINDEX++;
			Object bean = it.next();
			setCurrentBean(bean);

			pageContext.setAttribute(var, bean, PageContext.PAGE_SCOPE);
			pageContext.setAttribute("LOCALINDEX", LOCALINDEX,
					PageContext.PAGE_SCOPE);
			if (pageModel != null && pageModel.getPageForm() != null) {
				if (pageModel.getPageForm().getPage() >= 1)
					GLOBALINDEX = (pageModel.getPageForm().getPage() - 1)
							* pageModel.getPageForm().getOffset() + LOCALINDEX;
				else
					GLOBALINDEX = LOCALINDEX;
				pageContext.setAttribute("GLOBALINDEX", GLOBALINDEX,
						PageContext.PAGE_SCOPE);
			}
		}
	}

	/**
	 * 标签结束时调用此方法：生成表尾，分页尾信息
	 * 
	 * @return 返回值：<br>
	 *         EVAL_PAGE,标签结束。
	 */
	public int doEndTag() {
		try {
			if (bodyContent != null)
				bodyContent.writeOut(bodyContent.getEnclosingWriter());
			PrintHelper printHelper = new PrintHelper();
			printHelper.endElement(Tag.TABLE);

			if (isDataList() && pageModel.getPageForm() != null) {
				if (pageType.equalsIgnoreCase(TableConstants.PAGE_FOOTER)
						|| pageType.equalsIgnoreCase(TableConstants.PAGE_ALL)) {
					this.printPage(printHelper, pageModel.getPage().getCount(),
							pageModel.getPageForm().getOffset(), pageModel
									.getPageForm().getPage(), callback,
							pageModel.getPageForm().getSortName(), pageModel
									.getPageForm().getSortMode(), "footer");
				}
			}

			printHelper.endElement(Tag.DIV);
			flushTag(printHelper.getBuffer());

		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			doFinally();
		}

		return EVAL_PAGE;
	}

	public static String getPageUrl(int page, long offset, String sortName,
			String sortMode) {
		StringBuffer buff = new StringBuffer("page=" + page);
		buff.append("&offset=" + offset);
		if (sortName != null && sortName.trim().length() > 0) {
			buff.append("&sortName=");
			buff.append(sortName);
			if (sortMode != null && sortMode.trim().length() > 0) {
				buff.append("&sortMode=");
				buff.append(sortMode);
			}
			else {
				sortMode = "DESC";
				buff.append("&sortMode=");
				buff.append(sortMode);
			}
		}
		return buff.toString();
	}

	private void printPage(PrintHelper printHelper, int count, int pageSize,
			int curPage, String callback, String sortName, String sortMode,
			String area) {
		if (curPage <= 0)
			curPage = 1;

		if (pageSize <= 0)
			pageSize = 20;

		int lastPage = (count % pageSize == 0) ? count / pageSize
				: (count / pageSize) + 1;

		if (lastPage == 1)
			return;

		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.CLASS, "page_wrap");
		printHelper.startElement(Tag.DIV);
		printHelper.attribute(Attr.CLASS, "paginator");

		if (curPage > 1) {
			printHelper.startElement(Tag.A);
			printHelper.attribute(Attr.CLASS, "page-prev");
			printHelper.attribute(Attr.HREF, "javascript:" + callback
					+ "({pageSize:" + pageSize + ",count:" + count
					+ ",sortName:'" + sortName + "',sortMode:'" + sortMode
					+ "',selectPage:" + curPage + ",queryString:'"
					+ getPageUrl(1, pageSize, sortName, sortMode) + "'})");
			printHelper.text("首页");
			printHelper.endElement(Tag.A);

			printHelper.startElement(Tag.A);
			printHelper.attribute(Attr.CLASS, "page-prev");

			printHelper.attribute(Attr.HREF, "javascript:" + callback
					+ "({pageSize:" + pageSize + ",count:" + count
					+ ",sortName:'" + sortName + "',sortMode:'" + sortMode
					+ "',selectPage:" + (curPage - 1) + ",queryString:'"
					+ getPageUrl((curPage - 1), pageSize, sortName, sortMode)
					+ "'})");

			printHelper.text("上一页");
			printHelper.endElement(Tag.A);

		}
		else {
			printHelper.startElement(Tag.SPAN);
			printHelper.attribute(Attr.CLASS, "page-start");
			printHelper.text("首页");
			printHelper.endElement(Tag.SPAN);

			printHelper.startElement(Tag.SPAN);
			printHelper.attribute(Attr.CLASS, "page-start");
			printHelper.text("上一页");
			printHelper.endElement(Tag.SPAN);
		}

		if (lastPage <= 5) {
			for (int i = 1; i <= lastPage; i++) {
				if (curPage == i) {
					printHelper.startElement(Tag.SPAN);
					printHelper.attribute(Attr.CLASS, "page-this");
					printHelper.text(i);
					printHelper.endElement(Tag.SPAN);
				}
				else {
					printHelper.startElement(Tag.A);

					printHelper.attribute(Attr.HREF, "javascript:" + callback
							+ "({pageSize:" + pageSize + ",count:" + count
							+ ",sortName:'" + sortName + "',sortMode:'"
							+ sortMode + "',selectPage:" + i + ",queryString:'"
							+ getPageUrl(i, pageSize, sortName, sortMode)
							+ "'})");
					printHelper.text(i);
					printHelper.endElement(Tag.A);
				}
			}
		}
		else {
			if (curPage < 3) {
				for (int i = 1; i <= 5; i++) {
					if (curPage == i) {
						printHelper.startElement(Tag.SPAN);
						printHelper.attribute(Attr.CLASS, "page-this");
						printHelper.text(i);
						printHelper.endElement(Tag.SPAN);
					}
					else {
						printHelper.startElement(Tag.A);
						printHelper.attribute(Attr.HREF, "javascript:"
								+ callback + "({pageSize:" + pageSize
								+ ",count:" + count + ",sortName:'" + sortName
								+ "',sortMode:'" + sortMode + "',selectPage:"
								+ i + ",queryString:'"
								+ getPageUrl(i, pageSize, sortName, sortMode)
								+ "'})");
						printHelper.text(i);
						printHelper.endElement(Tag.A);
					}
				}
			}
			else {
				if (curPage > lastPage - 3) {
					for (int i = lastPage - 4; i <= lastPage; i++) {
						if (curPage == i) {
							printHelper.startElement(Tag.SPAN);
							printHelper.attribute(Attr.CLASS, "page-this");
							printHelper.text(i);
							printHelper.endElement(Tag.SPAN);
						}
						else {
							printHelper.startElement(Tag.A);

							printHelper.attribute(Attr.HREF, "javascript:"
									+ callback
									+ "({pageSize:"
									+ pageSize
									+ ",count:"
									+ count
									+ ",sortName:'"
									+ sortName
									+ "',sortMode:'"
									+ sortMode
									+ "',selectPage:"
									+ i
									+ ",queryString:'"
									+ getPageUrl(i, pageSize, sortName,
											sortMode) + "'})");

							printHelper.text(i);
							printHelper.endElement(Tag.A);
						}
					}
				}
				else {
					for (int i = curPage - 2; i <= curPage + 2; i++) {
						if (curPage == i) {
							printHelper.startElement(Tag.SPAN);
							printHelper.attribute(Attr.CLASS, "page-this");
							printHelper.text(i);
							printHelper.endElement(Tag.SPAN);
						}
						else {
							printHelper.startElement(Tag.A);
							printHelper.attribute(Attr.HREF, "javascript:"
									+ callback
									+ "({pageSize:"
									+ pageSize
									+ ",count:"
									+ count
									+ ",sortName:'"
									+ sortName
									+ "',sortMode:'"
									+ sortMode
									+ "',selectPage:"
									+ i
									+ ",queryString:'"
									+ getPageUrl(i, pageSize, sortName,
											sortMode) + "'})");
							printHelper.text(i);
							printHelper.endElement(Tag.A);
						}
					}
				}
			}
		}

		if (curPage < lastPage) {

			printHelper.startElement(Tag.A);
			printHelper.attribute(Attr.CLASS, "page-next");

			printHelper.attribute(Attr.HREF, "javascript:" + callback
					+ "({pageSize:" + pageSize + ",count:" + count
					+ ",sortName:'" + sortName + "',sortMode:'" + sortMode
					+ "',selectPage:" + (curPage + 1) + ",queryString:'"
					+ getPageUrl((curPage + 1), pageSize, sortName, sortMode)
					+ "'})");
			printHelper.text("下一页");
			printHelper.endElement(Tag.A);

			printHelper.startElement(Tag.A);
			printHelper.attribute(Attr.CLASS, "page-next");

			printHelper.attribute(Attr.HREF, "javascript:" + callback
					+ "({pageSize:" + pageSize + ",count:" + count
					+ ",sortName:'" + sortName + "',sortMode:'" + sortMode
					+ "',selectPage:" + lastPage + ",queryString:'"
					+ getPageUrl(lastPage, pageSize, sortName, sortMode)
					+ "'})");

			printHelper.text("尾页");
			printHelper.endElement(Tag.A);
		}
		else {
			printHelper.startElement(Tag.SPAN);
			printHelper.attribute(Attr.CLASS, "page-end");
			printHelper.text("下一页");
			printHelper.endElement(Tag.SPAN);

			printHelper.startElement(Tag.SPAN);
			printHelper.attribute(Attr.CLASS, "page-end");
			printHelper.text("尾页");
			printHelper.endElement(Tag.SPAN);

		}
		printHelper.startElement(Tag.SPAN);
		printHelper.attribute(Attr.CLASS, "page-skip");
		printHelper.text("共" + count + "条 第" + curPage + " / " + lastPage
				+ " 页");

		printHelper.text(" 每页");
		printHelper.startElement(Tag.INPUT);
		printHelper.attribute(Attr.ID, "PageSizeText" + area);
		printHelper.attribute(Attr.TYPE, "text");
		printHelper.attribute(Attr.VALUE, "" + pageSize);
		printHelper.text("条");

		printHelper.text(" 到第");
		printHelper.startElement(Tag.INPUT);
		printHelper.attribute(Attr.ID, "PageJumpText" + area);
		printHelper.attribute(Attr.TYPE, "text");
		printHelper.text("页");

		printHelper.startElement(Tag.BUTTON);
		printHelper.attribute(Attr.VALUE, "go");

		StringBuffer urlBuff = new StringBuffer();
		if (sortName != null && sortName.trim().length() > 0) {
			urlBuff.append("'&sortName=");
			urlBuff.append(sortName);
			if (sortMode != null && sortMode.trim().length() > 0) {
				urlBuff.append("&sortMode=");
				urlBuff.append(sortMode);
			}
			else {
				sortMode = "DESC";
				urlBuff.append("&sortMode=");
				urlBuff.append(sortMode);
			}
			urlBuff.append("'");
		}
		else {
			urlBuff.append("''");
		}

		printHelper.attribute(Attr.ONCLICK,
				"javascript: var page=document.getElementById('PageJumpText"
						+ area + "').value;if(isNaN(page)||page>" + lastPage
						+ "||page < 1){ alert('请输入正确页码');return; };"

						+ "var pageSize=document.getElementById('PageSizeText"
						+ area + "').value;if(isNaN(pageSize)||pageSize>200"
						+ lastPage
						+ "||pageSize < 1){ alert('每页条数在1到200之间');return; };"

						+ "var url='offset='+pageSize+'&page='+page+"
						+ urlBuff.toString() + ";" + callback + "({pageSize:"
						+ pageSize + ",count:" + count + ",sortName:'"
						+ sortName + "',sortMode:'" + sortMode
						+ "',selectPage:" + (curPage + 1)
						+ ",queryString:url})");

		printHelper.text("确定");
		printHelper.endElement(Tag.BUTTON);
		printHelper.endElement(Tag.SPAN);
		printHelper.endElement(Tag.DIV);
		printHelper.endElement(Tag.DIV);
	}

	public void doFinally() {
		pageModel = null;
		currentBean = null;
		it = null;
		var = null;
		LOCALINDEX = 0;
		isDataNull = false;
		columnCount = 0;
		lastBean = null;
		showTitle = true;
	}

	public String getDefaultMsg() {
		return defaultMsg;
	}

	public void setDefaultMsg(String defaultMsg) {
		this.defaultMsg = defaultMsg;
	}

	public String getPageType() {
		return pageType;
	}

	public void setPageType(String pageType) {
		this.pageType = pageType;
	}

	public Object getCurrentBean() {
		return currentBean;
	}

	public int getLOCALINDEX() {
		return LOCALINDEX;
	}

	public void setLOCALINDEX(int localindex) {
		LOCALINDEX = localindex;
	}

	public void setCurrentBean(Object currentBean) {
		this.currentBean = currentBean;
	}

	public String getVar() {
		return var;
	}

	public void setVar(String var) {
		this.var = var;
	}

	public void setModel(Object model) {
		this.model = model;
	}

	public void setPageModel(PageModel pageModel) {
		this.pageModel = pageModel;
	}

	public void setCallback(String callback) {
		this.callback = callback;
	}

	public String getCallback() {
		return callback;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getGLOBALINDEX() {
		return GLOBALINDEX;
	}

	public void setGLOBALINDEX(int globalindex) {
		GLOBALINDEX = globalindex;
	}

	public PageModel getPageModel() {
		return pageModel;
	}

	public Object getModel() {
		return model;
	}

	public boolean isShowTitle() {
		return showTitle;
	}

	public void setShowTitle(boolean showTitle) {
		this.showTitle = showTitle;
	}

	public boolean isDataNull() {
		return isDataNull;
	}

	public int getColumnCount() {
		return columnCount;
	}

	public void setColumnCount(int columnCount) {
		this.columnCount = columnCount;
	}

	public Object getLastBean() {
		return lastBean;
	}

	public void setLastBean(Object lastBean) {
		this.lastBean = lastBean;
	}
}

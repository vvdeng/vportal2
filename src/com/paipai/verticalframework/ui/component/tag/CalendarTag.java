package com.paipai.verticalframework.ui.component.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.paipai.verticalframework.ui.component.printer.CalendarPrinter;

public final class CalendarTag extends SimpleTagSupport {

	private String id;
	private String name;
	private String format;
	private Object value;
	private boolean readonly;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public boolean isReadonly() {
		return readonly;
	}

	public void setReadonly(boolean readonly) {
		this.readonly = readonly;
	}

	public void doTag() throws IOException, JspException {
		CalendarPrinter print = new CalendarPrinter(getJspBody(),
				getJspContext());

		print.printCalendar(id, name, format,value,readonly);
	}

}

package com.paipai.verticalframework.ui.constant;

public enum Attr
{

	ACTION("action"), ALIGN("align"), ALT("alt"), BORDER("border"), CHECKED(
			"checked"), CLASS("class"), COLS("cols"), COLSPAN("colspan"),DIR("dir"), DISABLED(
			"disabled"), ENCTYPE("enctype"), HREF("href"), ID("id"), LANG("lang"), LANGUAGE(
			"language"), LONGDESC("longdesc"), MAXLENGTH("maxLength"), NAME(
			"name"), ONBLUR("onblur"), ONCHANGE("onchange"), ONCLICK("onclick"), ONDBLCLICK(
			"ondblclick"), ONERROR("onerror"), METHOD("method"), ONFOCUS(
			"onfocus"), ONKEYDOWN("onkeydown"), ONKEYPRESS("onkeypress"), ONKEYUP(
			"onkeyup"), ONLOAD("onload"), ONMOUSEDOWN("onmousedown"), ONMOUSEMOVE(
			"onmousemove"), ONMOUSEOVER("onmouseover"), ONSELECT("onselect"),ONSUBMIT("onsubmit"), PARA(
			"para"), REL("rel"), ROWS("rows"), READONLY("readonly"), SELECTED(
			"selected"), SIZE("size"), SRC("src"),INIT_SRC("init_src"),  STYLE("style"), TAG("tag"), TARGET(
			"target"), TITLE("title"), TYPE("type"), VALUE("value"), WIDTH(
			"width"),HEIGHT(
			"height"),ALTIMAGE("alt_image");
	private String name;

	private Attr(String name)
	{
		this.name = name;
	}

	public String toString()
	{
		return name;
	}
}
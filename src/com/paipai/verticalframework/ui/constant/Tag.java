package com.paipai.verticalframework.ui.constant;

public enum Tag {
	A("a"), ABBR("abbr"), ACRONYM("acronym"), ADDRESS("address"), APPLET(
			"applet"), BASE("base"), BLOCKQUOTE("blockquote"), BODY("body"), BR(
			"br"), BUTTON("button"), CAPTION("caption"), CITE("cite"), CODE(
			"code"), COMMENT("comment"), DD("dd"), DEL("del"), DFN("dfn"), DIR(
			"dir"), DIV("div"), DL("dl"), DT("dt"), EM("em"), HEAD("head"), FORM(
			"form"), FIELDSET("fieldset"), HTML("html"), H1("h1"), H2("h2"), H3(
			"h3"), H4("h4"), H5("h5"), H6("h6"), IFRAME("iframe"), IMG("img"), INPUT(
			"input"), LABEL("label"), LEGEND("legend"), LI("li"), LINK("link"), META(
			"meta"), NOSCRIPT("noscript"), OBJECT("object"), OL("ol"), OPTGROUP(
			"optgroup"), OPTION("option"), PARAM("param"), PRE("pre"), Q("q"), SAMP(
			"samp"), SPAN("span"), SELECT("select"), SCRIPT("script"), STRONG(
			"strong"), SUMMARY("summary"), TABLE("table"), TITLE("title"), TEXTAREA(
			"textarea"), TBODY("tbody"), TD("td"), TFOOT("tfoot"), THEAD(
			"thead"), TH("th"), TR("tr"), UL("ul"), VAR("var"),P("p");
	private final String name;

	private Tag(String name) {
		this.name = name;
	}

	public String toString() {
		return name;
	}
}
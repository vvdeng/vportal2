
$namespace("Portal.index");
Portal.index.init = function () {
	Portal.index.menuSummary();
};
Portal.index.menuSummaryAction = function () {
	var sr = $$("#region2");

	sr.find(".header li").mouseover(function () {
		var src=$$(this);
		src.siblings().removeAttr("class");
		src.attr("class","hover");
		sr.find(".content").hide();
		sr.find(".content[val='"+src.attr("val")+"']").show();
	});
};
Portal.index.menuSummary = function () {
	var sr = $$("#region2");
	$$.ajax({cache:false, url:"index/menu_summary.jhtml?mid=" + Portal.index.data.rightUp1Mid, dataType:"html", success:function (data) {
		sr.html(data);
		Portal.index.menuSummaryAction();
	}, error:function (data, b, err) {
		return false;
	}});
};


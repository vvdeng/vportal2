
/**
 * ���а�
 */
$namespace("PP.life.boss.rank");
PP.life.boss.rank.categoryFilter = function (level, id, name) {
	if (level == 1) {
		if (id == 28054 || id == 28055 || id == 28056 || id == 35737 || id == 217721 || id == 200300) {
			return true;
		} else {
			return false;
		}
	} else {
		return true;
	}
};

/******************************statitemlist.jsp  begin***********************************************/
/**
 * �������ݲ�ѯ
 */
PP.life.boss.rank.queryStateItemList = function (page) {
	if (UIForm.validate("queryForm")) {
		if (typeof (page) == "undefined") {
			$id("queryForm").action = "../rank/statitemlist.xhtml";
		} else {
			$id("queryForm").action = "../rank/statitemlist.xhtml?" + page.queryString;
		}
		UIAjax.refreshZone("queryForm");
	}
};
/**
 * ��ת���������а�ҳ��
 */
PP.life.boss.rank.goAddRank = function () {
	$id("queryForm").action = "../rank/rankmain.xhtml";
	$id("queryForm").submit();
};
/******************************statitemlist.jsp  ehd***********************************************/

/******************************listrank.jsp  begin***********************************************/
/**
 * ��ѯ���а� 
 */
PP.life.boss.rank.queryRank = function (page) {
	if (UIForm.validate("queryForm")) {
		if (typeof (page) == "undefined") {
			$id("queryForm").action = "../rank/listrank.xhtml";
		} else {
			$id("queryForm").action = "../rank/listrank.xhtml?" + page.queryString;
		}
		UIAjax.refreshZone("queryForm");
	}
};
/**
 * ɾ�����а� 
 */
PP.life.boss.rank.delRank = function (ruleId) {
	if (UIDialog.confirm("\u786e\u8ba4\u5220\u9664?")) {
		UIAjax.submit({data:{"ruleId":ruleId}, url:"../rank/deleterank.json", onSuccess:function () {
			UIDialog.alert("\u5220\u9664\u6210\u529f!");
			UIAjax.refreshZone("queryForm");
		}});
	}
};
/**
 * �˹��������а� 
 */
PP.life.boss.rank.publishRank = function (ruleId) {
	if (UIDialog.confirm("\u786e\u8ba4\u53d1\u5e03?")) {
		UIAjax.submit({data:{"ruleId":ruleId}, url:"../rank/scheduleComputeRankItem.json", onSuccess:function () {
			UIDialog.alert("\u53d1\u5e03\u6210\u529f!");
			UIAjax.refreshZone("queryForm");
		}});
	}
};
/******************************listrank.jsp  end***********************************************/

/******************************rankmain.jsp  begin***********************************************/
/**
 * ��ʼ���������а�
 */
PP.life.boss.rank.initRankMain = function (ruleid) {
	if (ruleid > 0) {
		$id("addRankForm").action = "../rank/rankitemlist.xhtml";
		UIAjax.refreshZone("addRankForm");
	}
};
/**
 * �������а�
 */
PP.life.boss.rank.addRank = function () {
	if (UIForm.validate("addRankForm")) {
		var succ = function (responseJson) {
			$id("ruleId").value = responseJson.data.rankForm.ruleId;
			$id("addRankForm").action = "../rank/rankitemlist.xhtml";
			UIAjax.refreshZone("addRankForm");
		};
		var data = {url:"../rank/addrank.json", onSuccess:succ, method:"post"};
		UIAjax.submit("addRankForm", data);
	}
};
/**
 * ��ѯĳ�����а���Ʒ��Ϣ
 */
PP.life.boss.rank.rankItemList = function (page) {
	if (typeof (page) == "undefined") {
		$id("addRankForm").action = "../rank/rankitemlist.xhtml";
	} else {
		$id("addRankForm").action = "../rank/rankitemlist.xhtml?" + page.queryString;
	}
	UIAjax.refreshZone("addRankForm");
};
/**
 * ������Ʒ��Ϣ
 */
PP.life.boss.rank.addNewItem = function () {
	var ruleId = $id("addRankForm").ruleId.value;
	var itemType = 3;
	var c1 = $id("addRankForm").c1.value;
	var c2 = $id("addRankForm").c2.value;
	var c3 = $id("addRankForm").c3.value;
	var c4 = $id("addRankForm").c4.value;
	var itemIncrement = $id("addnewForm").itemIncrement.value;
	var itemId = $id("addnewForm").itemId.value;
	var soldNumThirty = $id("addnewForm").soldNumThirty.value;
	var soldNumFourteen = $id("addnewForm").soldNumFourteen.value;
	var soldNumSeven = $id("addnewForm").soldNumSeven.value;
	var visitCount = $id("addnewForm").visitCount.value;
	var favoriteCount = $id("addnewForm").favoriteCount.value;
	var succ = function (responseJson) {
		alert("\u65b0\u589e\u5546\u54c1\u6210\u529f!");
		$id("addRankForm").action = "../rank/rankitemlist.xhtml";
		UIAjax.refreshZone("addRankForm");
	};
	var addData = {data:{ruleId:ruleId, itemType:itemType, itemIncrement:itemIncrement, itemId:itemId, soldNumThirty:soldNumThirty, soldNumFourteen:soldNumFourteen, soldNumSeven:soldNumSeven, visitCount:visitCount, favoriteCount:favoriteCount, c1:c1, c2:c2, c3:c3, c4:c4}, url:"../rank/addrankitem.json", onSuccess:succ};
	if (PP.vfui.js.form.validate("addnewForm")) {
		UIAjax.submit(addData);
		return false;
	} else {
		return true;
	}
};
/**
 * ����Ʒ�������а�
 */
PP.life.boss.rank.addRankItem = function (ruleId, itemType, itemIncrement, itemId, itemName) {
	var succ = function (responseJson) {
		$id("addRankForm").action = "../rank/rankitemlist.xhtml";
		UIAjax.refreshZone("addRankForm");
	};
	var saveData = {data:{"ruleId":ruleId, "itemType":itemType, "itemIncrement":itemIncrement, "itemId":itemId, "itemName":itemName}, url:"../rank/saverankitem.json", onSuccess:succ};
	UIAjax.submit(saveData);
};
/**
 * ����Ʒ�Ƴ����а�
 */
PP.life.boss.rank.delRankItem = function (ruleId, itemId) {
	var succ = function (responseJson) {
		$id("addRankForm").action = "../rank/rankitemlist.xhtml";
		UIAjax.refreshZone("addRankForm");
	};
	var delData = {url:"../rank/delrankitem.json", data:{"ruleId":ruleId, "itemId":itemId}, onSuccess:succ};
	UIAjax.submit(delData);
};
/**
 * �����а�������ĳ��Ʒ 
 */
PP.life.boss.rank.updateRankItemType = function (ruleId, itemId, itemType) {
	var succ = function (responseJson) {
		$id("addRankForm").action = "../rank/rankitemlist.xhtml";
		UIAjax.refreshZone("addRankForm");
	};
	var upData = {url:"../rank/saverankitem.json", data:{"ruleId":ruleId, "itemId":itemId, "itemType":itemType}, onSuccess:succ};
	UIAjax.submit(upData);
};
/**
 * �����޸����а�����Ʒ����Ϣ�Ի��� 
 */
PP.life.boss.rank.showRankItemModifyDialog = function (ruleId, itemId, itemName, itemType, itemIncrement) {
	var data = {ruleId:ruleId, itemId:itemId, itemName:itemName, itemType:itemType, itemIncrement:itemIncrement};
	UIForm.fill("modifyItemForm", data);
	UIDialog.show("modifyItem");
};
/**
 * �޸����а�����Ʒ����Ϣ
 */
PP.life.boss.rank.modifyRankItemInfo = function () {
	if (UIForm.validate("modifyItemForm")) {
		var succ = function (responseJson) {
			UIDialog.alert("\u4fee\u6539\u5546\u54c1\u4fe1\u606f\u6210\u529f!");
			$id("addRankForm").action = "../rank/rankitemlist.xhtml";
			UIAjax.refreshZone("addRankForm");
		};
		var data = {url:"../rank/saverankitem.json", onSuccess:succ, method:"post"};
		UIAjax.submit("modifyItemForm", data);
		return false;
	} else {
		return true;
	}
};
/******************************rankmain.jsp  end***********************************************/
var Rank = PP.life.boss.rank;
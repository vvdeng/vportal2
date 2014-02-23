package com.vvdeng.portal.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.paipai.verticalframework.core.vo.Page;
import com.paipai.verticalframework.core.vo.PageModel;
import com.paipai.verticalframework.service.persistent.Order;
import com.paipai.verticalframework.web.spring.BaseController;
import com.vvdeng.portal.dataservice.ConfigDataService;
import com.vvdeng.portal.dataservice.ContentImgDataService;
import com.vvdeng.portal.dataservice.MenuDataService;
import com.vvdeng.portal.dataservice.NewsDataService;
import com.vvdeng.portal.dataservice.NewsDetailDataService;
import com.vvdeng.portal.entity.Config;
import com.vvdeng.portal.entity.Menu;
import com.vvdeng.portal.entity.News;
import com.vvdeng.portal.entity.NewsDetail;
import com.vvdeng.portal.model.ConfigDataType;
import com.vvdeng.portal.model.ConfigType;
import com.vvdeng.portal.model.MenuLevel;
import com.vvdeng.portal.model.MenuType;
import com.vvdeng.portal.util.SysUtil;
import com.vvdeng.portal.web.form.ContentImgForm;
import com.vvdeng.portal.web.form.MenuForm;
import com.vvdeng.portal.web.form.NewsForm;
import com.vvdeng.portal.web.vo.MenuVo;

@Controller
public class PortalIndexController extends BaseController {
	public static final int LIST_SIZE = 5;
	public static final int IMAGE_LIST_SIZE = 100;
	public static final int CHANGE_LIST_SIZE = 4;
	private MenuDataService menuDataService;
	private NewsDataService newsDataService;
	private NewsDetailDataService newsDetailDataService;
	private ContentImgDataService contentImgDataService;
	private ConfigDataService configDataService;

	@RequestMapping("/index.jhtml")
	public String index(ModelMap map) {

		return "/index";
	}

	@RequestMapping("/channel/list.jhtml")
	public String channel(@RequestParam("cid")
	Long cid, NewsForm newsForm, ModelMap map) {
		Menu selMenu = menuDataService.findById(cid);
		if (selMenu != null) {
			map.put("selMenu", selMenu);
			if (selMenu.getLevel().equals(MenuLevel.TOP.getId())) {
				List<Menu> subMenuList = menuDataService.queryByParentId(cid);
				map.put("subMenuList", subMenuList);
				map.put("topMenu", selMenu);
				newsForm.setFirstMenuId(cid);
			} else {
				Menu topMenu = menuDataService.findById(selMenu.getParentId());
				List<Menu> subMenuList = menuDataService
						.queryByParentId(topMenu.getId());
				map.put("subMenuList", subMenuList);
				map.put("topMenu", topMenu);
				newsForm.setSecondMenuId(cid);
			}
			Order order = new Order("id", Order.DESC);
			map.put("pageModel", new PageModel<News>(newsDataService.query(
					newsForm, order), newsForm));
			System.out.println("newDataServiceCount:"
					+ newsDataService.query(newsForm, order).getCount());
		}
		if (selMenu.getType().equals(MenuType.TEXT_TYPE.getValue())) {
			return "/channel/list";
		} else {
			return "/channel/list_prod";
		}
	}

	@RequestMapping("/content/detail.jhtml")
	public String detail(@RequestParam("cid")
	Long id, ModelMap map) {
		Integer type = null;
		News news = newsDataService.findById(id);
		if (news != null) {
			type = news.getType();
			if (MenuType.IMG_TYPE.getValue().equals(type)) {
				ContentImgForm contentImgForm = new ContentImgForm();
				contentImgForm.setContentId(id);
				Order order = new Order("id", Order.DESC);
				map.put("imageList", contentImgDataService.query(
						contentImgForm, order).getList());
			}
			map.put("detail", news);
			map.put("mainInfo", newsDetailDataService.findById(id));
			Menu selMenu = menuDataService.findById(news.getSecondMenuId());
			map.put("selMenu", selMenu);
			map.put("topMenu", menuDataService.findById(news.getFirstMenuId()));
			map.put("subMenuList", menuDataService.queryByParentId(news
					.getFirstMenuId()));
		}
		if (MenuType.TEXT_TYPE.getValue().equals(type)) {
			return "/content/detail";
		} else {
			return "/content/detail_prod";
		}
	}

	@RequestMapping("/index/menu_summary.jhtml")
	public String menuSummary(@RequestParam("mid")
	Long id, ModelMap map) {
		System.out.println("menuSummary mid=" + id);
		Map<Long,Object> summaryMap=new HashMap<Long, Object>();
		MenuForm menuForm = new MenuForm();
		menuForm.setParentId(id);
		menuForm.setSelCount(false);
		Page<Menu> menuPageInfo = menuDataService.query(menuForm, null);
		if (menuPageInfo.getList().size() > 0) {
			 List<Menu> menuList=new ArrayList<Menu>(menuPageInfo.getList());
			 map.put("menuSummaryList", menuList);
			 for (Menu menu : menuList) {
				Map<String,Object> datMap=new HashMap<String,Object>();
				NewsForm newsForm=new NewsForm();
				newsForm.setSelCount(false);
				newsForm.setSecondMenuId(menu.getId());
				Page<News> newsPage=newsDataService.query(newsForm, null);
				System.out.println("menuSummary id="+menu.getId()+" count="+newsPage.getList().size());
				if(newsPage.getList().size()>0){
					
					List<News> newsList=new ArrayList(newsPage.getList());
				    datMap.put("mainImagePath", newsList.get(0).getMainImagePath());
				    datMap.put("list", newsList);
				}
				datMap.put("count", newsPage.getList().size());
				summaryMap.put(menu.getId(), datMap);
			}
		}
		map.put("summaryMap", summaryMap);
		return "/index/menu_summary";

	}

	@ModelAttribute("menuList")
	public List<Menu> menuList() {
		List<Menu> menuList = menuDataService.queryByLevel(MenuLevel.TOP
				.getId());
		return menuList;
	}

	public MenuDataService getMenuDataService() {
		return menuDataService;
	}

	@ModelAttribute("metaMap")
	public List<MenuVo> menuVoList() {
		List<Menu> menuList = menuDataService.queryByLevel(MenuLevel.TOP
				.getId());
		Map<Long, MenuVo> menuMap = new HashMap<Long, MenuVo>();
		for (Menu menu : menuList) {
			MenuVo menuVo = new MenuVo(menu);
			menuMap.put(menuVo.getId(), menuVo);
		}
		menuList = menuDataService.queryByLevel(MenuLevel.FIRST.getId());
		for (Menu menu : menuList) {
			MenuVo menuVo = new MenuVo(menu);
			MenuVo pMenuVo = menuMap.get(menu.getParentId());
			if (pMenuVo != null) {
				pMenuVo.getSubMenuList().add(menuVo);
			}
		}
		List<MenuVo> menuVoList = new ArrayList<MenuVo>();
		menuVoList.addAll(menuMap.values());
		return menuVoList;

	}

	@ModelAttribute("regionMap")
	public Map<String, Object> regionMap() {
		Map<String, Object> result = new HashMap<String, Object>();
		List<Config> configList = configDataService.queryAll();
		List<Config> tempList = null;
		NewsForm newsForm = new NewsForm();
		newsForm.setSelCount(true);
		Order order = new Order("id", Order.DESC);
		for (Config config : configList) {
			String typeName = ConfigType.toMap().get(config.getType());

			if (config.getDataType().equals(ConfigDataType.SINGLE.getVal())) {
				Long menuId = Long.parseLong(config.getVal());
				Menu selMenu = menuDataService.findById(menuId);

				if (selMenu != null) {
					if (selMenu.getType().equals(MenuType.IMG_TYPE.getValue())) {
						newsForm.setOffset(IMAGE_LIST_SIZE);
					} else {
						newsForm.setOffset(LIST_SIZE);
					}
					if (selMenu.getLevel().equals(MenuLevel.TOP.getId())) {
						newsForm.setFirstMenuId(menuId);
						newsForm.setSecondMenuId(null);
					} else {
						newsForm.setFirstMenuId(null);
						newsForm.setSecondMenuId(menuId);
					}
				}

				result.put(typeName, config);
				System.out.println("typeName=" + typeName);
				Page<News> newsPage = newsDataService.query(newsForm, order);
				result.put(typeName + "Data", newsPage);
				if (config.getType().equals(ConfigType.LEFTUP.getId())) {
					newsForm.setOffset(CHANGE_LIST_SIZE);
					newsForm.setExtraConditon("news.mainImagePath is not null");
					result.put(typeName + "ImageData", newsDataService.query(
							newsForm, order));
					newsForm.setExtraConditon(null);// 避免影响循环中下一个元素
					List<News> newsList = new ArrayList<News>(newsPage
							.getList());
					if (newsList.size() > 0) {
						News news1st = newsList.get(0);
						NewsDetail news1stDetail = newsDetailDataService
								.findById(news1st.getId());
						Map<String, Object> news1stMap = new HashMap<String, Object>();
						news1stMap.put("news", news1st);
						news1stMap.put("detail", SysUtil
								.filterImg(news1stDetail.getContent()));
						result.put(typeName + "News1st", news1stMap);
					}
				}
			} else {
				tempList = (List) result.get(typeName);
				if (tempList == null) {
					tempList = new ArrayList<Config>();
					result.put(typeName, tempList);
				}
				tempList.add(config);
			}

		}
		return result;
	}

	public void setMenuDataService(MenuDataService menuDataService) {
		this.menuDataService = menuDataService;
	}

	public NewsDataService getNewsDataService() {
		return newsDataService;
	}

	public void setNewsDataService(NewsDataService newsDataService) {
		this.newsDataService = newsDataService;
	}

	public NewsDetailDataService getNewsDetailDataService() {
		return newsDetailDataService;
	}

	public void setNewsDetailDataService(
			NewsDetailDataService newsDetailDataService) {
		this.newsDetailDataService = newsDetailDataService;
	}

	public ContentImgDataService getContentImgDataService() {
		return contentImgDataService;
	}

	public void setContentImgDataService(
			ContentImgDataService contentImgDataService) {
		this.contentImgDataService = contentImgDataService;
	}

	public ConfigDataService getConfigDataService() {
		return configDataService;
	}

	public void setConfigDataService(ConfigDataService configDataService) {
		this.configDataService = configDataService;
	}
}

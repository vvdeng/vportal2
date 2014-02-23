package com.vvdeng.portal.web.controller.admin;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.paipai.verticalframework.core.util.BeanUtils;
import com.paipai.verticalframework.core.vo.PageModel;
import com.paipai.verticalframework.service.persistent.Order;
import com.paipai.verticalframework.web.spring.BaseController;
import com.vvdeng.portal.dataservice.ContentImgDataService;
import com.vvdeng.portal.dataservice.MenuDataService;
import com.vvdeng.portal.dataservice.NewsDataService;
import com.vvdeng.portal.dataservice.NewsDetailDataService;
import com.vvdeng.portal.entity.ContentImg;
import com.vvdeng.portal.entity.Menu;
import com.vvdeng.portal.entity.News;
import com.vvdeng.portal.entity.NewsDetail;
import com.vvdeng.portal.model.MenuLevel;
import com.vvdeng.portal.util.FileUtil;
import com.vvdeng.portal.web.form.ContentImgForm;
import com.vvdeng.portal.web.form.NewsForm;
import com.vvdeng.portal.web.form.SuccessForm;
import com.vvdeng.portal.web.vo.MenuVo;

@Controller
public class NewsController extends BaseController {
	private NewsDataService newsDataService;
	private NewsDetailDataService newsDetailDataService;
	private MenuDataService menuDataService;
	private ContentImgDataService contentImgDataService;
	public static int NEWS_TAB_INDEX = 0;
	public static int IMG_TAB_INDEX = 1;

	@RequestMapping(value = "/admin/news/list.xhtml")
	public String list(NewsForm newsForm, ModelMap model) {
		Order order = new Order("id", Order.DESC);
		model.put("pageModel", new PageModel<News>(newsDataService.query(
				newsForm, order), newsForm));
		return "/admin/news/list";
	}

	@RequestMapping(method = RequestMethod.GET, value = "/admin/news/add.xhtml")
	public String addGet(ModelMap model) {
		NewsForm newsForm = new NewsForm();
		model.put("newsForm", newsForm);

		return "/admin/news/edit_get_2";
	}

	@RequestMapping(method = RequestMethod.POST, value = "/admin/news/add.xhtml")
	public String add(ModelMap model) {
		NewsForm newsForm = new NewsForm();
		model.put("newsForm", newsForm);
		return "/admin/news/add";
	}

	@RequestMapping(method = RequestMethod.GET, value = "/admin/news/edit.xhtml")
	public String editGet(@RequestParam("id")
	Long id, ModelMap model) {
		News news = newsDataService.findById(id);
		NewsForm newsForm = BeanUtils.copyTo(news, NewsForm.class);
		NewsDetail newsDetail = newsDetailDataService.findById(id);
		BeanUtils.copyTo(newsDetail, newsForm);
		ContentImgForm contentImgForm = new ContentImgForm();
		contentImgForm.setContentId(id);
		Order order = new Order("id", Order.DESC);
		model.put("newsForm", newsForm);
		model.put("imgList", contentImgDataService.query(contentImgForm, order)
				.getList());
		return "/admin/news/edit_get_2";
	}

	@RequestMapping(method = RequestMethod.POST, value = "/admin/news/edit.xhtml")
	public String edit(@RequestParam("id")
	Long id, ModelMap model) {
		News news = newsDataService.findById(id);
		model.put("news", news);
		return "/admin/news/edit";
	}

	@RequestMapping(value = "/admin/news/save.xhtml")
	public String save(NewsForm newsForm, HttpServletRequest request,
			ModelMap model) {
		MultipartFile[] files = newsForm.getMainImageFile();

		// System.out.println(" fileCount=" + files.length+"
		// fileSize="+files[0].getSize());

		String[] fileUrls = FileUtil.processFile(files, request, model);
		if (fileUrls.length > 0) {
			System.out.println("fileUrls[0]=" + fileUrls[0]);
			if (files[0].getSize() > 0) {
				newsForm.setMainImagePath(fileUrls[0]);
			}
		}
		News news = BeanUtils.copyTo(newsForm, News.class);
		Menu firstMenu = menuDataService.findById(newsForm.getFirstMenuId());
		if (firstMenu != null) {
			news.setType(firstMenu.getType());
		}
		news.setLastEditTime(new Date());
		newsDataService.save(news);
		NewsDetail newsDetail = BeanUtils.copyTo(newsForm, NewsDetail.class);
		newsDetail.setId(news.getId());
		newsDetailDataService.save(newsDetail);
		model.put("id", news.getId());
		SuccessForm successForm = new SuccessForm();
		if (newsForm.getId() == null) {
			successForm.setInfo("添加成功！");
			successForm.setLabel("查看列表");
			successForm.setBackUrl("/admin/news/list.xhtml");

		} else {
			successForm.setInfo("修改成功！");
			successForm.setLabel("查看列表");
			successForm.setBackUrl("/admin/news/list.xhtml");
		}
		model.put("successForm", successForm);
		return "/admin/success";
	}

	@RequestMapping(value = "/admin/news/saveImg.xhtml")
	public String saveImg(ContentImgForm contentImgForm,
			HttpServletRequest request, ModelMap model) {
		MultipartFile[] files = contentImgForm.getImageFile();

		System.out.println(" fileSize=" + files.length);

		String[] fileUrls = FileUtil.processFile(files, request, model);
		if (fileUrls.length > 0) {
			System.out.println("fileUrls[0]=" + fileUrls[0]);
			contentImgForm.setImagePath(fileUrls[0]);
		}
		ContentImg contentImg = BeanUtils.copyTo(contentImgForm,
				ContentImg.class);

		contentImgDataService.save(contentImg);

		model.put("contentId", contentImg.getContentId());
		SuccessForm successForm = new SuccessForm();
		successForm.setInfo("添加成功！");
		successForm.setLabel("返回编辑");
		successForm.setBackUrl("/admin/news/edit.xhtml?id="
				+ contentImg.getContentId() + "&tabIndex=" + IMG_TAB_INDEX);
		model.put("successForm", successForm);
		return "/admin/success";
	}

	@RequestMapping(value = "/admin/news/delImg.xhtml")
	public String delImg(@RequestParam("id")
	Long id, @RequestParam("contentId")
	Long contentId, ModelMap model) {
		contentImgDataService.deleteById(id);

		model.put("contentId", contentId);
		SuccessForm successForm = new SuccessForm();
		successForm.setInfo("删除成功！");
		successForm.setLabel("返回编辑");
		successForm.setBackUrl("/admin/news/edit.xhtml?id=" + contentId
				+ "&tabIndex=" + IMG_TAB_INDEX);
		model.put("successForm", successForm);
		return "/admin/success";
	}

	@RequestMapping(value = "/admin/news/setMainImg.xhtml")
	public String setMeinImg(@RequestParam("id")
	Long id, @RequestParam("contentId")
	Long contentId, ModelMap model) {
		ContentImg contentImg = contentImgDataService.findById(id);
		ContentImgForm contentImgForm = new ContentImgForm();
		contentImgForm.setContentId(contentId);
		contentImgForm.setFlag(0);// magic
		contentImgDataService.update(contentImgForm);
		contentImg.setFlag(1);// magic
		contentImgDataService.update(contentImg);
		newsDataService.updateMainImagePath(contentId, contentImg
				.getImagePath());
		model.put("contentId", contentId);
		SuccessForm successForm = new SuccessForm();
		successForm.setInfo("设置成功！");
		successForm.setLabel("返回编辑");
		successForm.setBackUrl("/admin/news/edit.xhtml?id=" + contentId
				+ "&tabIndex=" + IMG_TAB_INDEX);
		model.put("successForm", successForm);
		return "/admin/success";
	}

	@RequestMapping(method = RequestMethod.POST, value = "/admin/news/changeEditModel.xhtml")
	public String changeEditModel(NewsForm newsForm, ModelMap model) {

		model.put("newsForm", newsForm);
		return "/admin/news/edit_get";
	}

	@RequestMapping(value = "/admin/news/save.json")
	public String saveJson(NewsForm newsForm, ModelMap model) {
		News news = BeanUtils.copyTo(newsForm, News.class);
		news.setLastEditTime(new Date());
		newsDataService.save(news);
		NewsDetail newsDetail = BeanUtils.copyTo(newsForm, NewsDetail.class);
		newsDetail.setId(news.getId());
		newsDetailDataService.save(newsDetail);
		model.put("id", news.getId());

		return "json_saveNews";
	}

	@ModelAttribute("firstMenuList")
	public List<MenuVo> firstMenuVoList() {
		List<MenuVo> menuVoList = new ArrayList<MenuVo>();
		List<Menu> menuList = menuDataService.queryByLevel(MenuLevel.TOP
				.getId());
		for (Menu menu : menuList) {
			MenuVo menuVo = new MenuVo(menu);
			menuVoList.add(menuVo);
		}
		return menuVoList;

	}

	@ModelAttribute("menu")
	public Map<String, Object> menuMap() {
		Map<String, Object> result = new HashMap<String, Object>();
		List<MenuVo> firstMenuVoList = new ArrayList<MenuVo>();
		List<Menu> menuList = menuDataService.queryByLevel(MenuLevel.TOP
				.getId());
		Map<Long, MenuVo> menuMap = new HashMap<Long, MenuVo>();
		for (Menu menu : menuList) {
			MenuVo menuVo = new MenuVo(menu);
			firstMenuVoList.add(menuVo);
			menuMap.put(menuVo.getId(), menuVo);
		}
		result.put("firstMenuList", firstMenuVoList);
		menuList = menuDataService.queryByLevel(MenuLevel.FIRST.getId());
		for (Menu menu : menuList) {
			MenuVo menuVo = new MenuVo(menu);
			MenuVo pMenuVo = menuMap.get(menu.getParentId());
			if (pMenuVo != null) {
				pMenuVo.getSubMenuList().add(menuVo);
			}
			menuMap.put(menuVo.getId(), menuVo);
		}
		List<MenuVo> menuVoList = new ArrayList<MenuVo>();
		menuVoList.addAll(menuMap.values());
		result.put("menuMap", menuMap);
		result.put("menuList", menuVoList);
		return result;

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

	public MenuDataService getMenuDataService() {
		return menuDataService;
	}

	public void setMenuDataService(MenuDataService menuDataService) {
		this.menuDataService = menuDataService;
	}

	public ContentImgDataService getContentImgDataService() {
		return contentImgDataService;
	}

	public void setContentImgDataService(
			ContentImgDataService contentImgDataService) {
		this.contentImgDataService = contentImgDataService;
	}
}

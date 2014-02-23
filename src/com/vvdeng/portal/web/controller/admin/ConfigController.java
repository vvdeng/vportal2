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
import org.springframework.web.multipart.MultipartFile;

import com.paipai.component.configcenter.api.conf.res.ConfItem;
import com.paipai.verticalframework.core.util.BeanUtils;
import com.paipai.verticalframework.web.spring.BaseController;
import com.vvdeng.portal.dataservice.ConfigDataService;
import com.vvdeng.portal.dataservice.MenuDataService;
import com.vvdeng.portal.entity.Config;
import com.vvdeng.portal.entity.Menu;
import com.vvdeng.portal.entity.NewsDetail;
import com.vvdeng.portal.model.ConfigDataType;
import com.vvdeng.portal.model.ConfigType;
import com.vvdeng.portal.model.MenuLevel;
import com.vvdeng.portal.model.MenuType;
import com.vvdeng.portal.util.FileUtil;
import com.vvdeng.portal.web.form.ConfigForm;
import com.vvdeng.portal.web.form.SuccessForm;
import com.vvdeng.portal.web.vo.MenuVo;

@Controller
public class ConfigController extends BaseController {
	private ConfigDataService configDataService;
	private MenuDataService menuDataService;

	@RequestMapping("/admin/config/editIndex.xhtml")
	public String editIndex(ModelMap map) {
		return "/admin/config/editIndex";
	}

	/*
	 * @RequestMapping("/admin/config/saveLogoPic.xhtml") public String
	 * saveLogoPic(@RequestParam("mainPic")MultipartFile[]
	 * mainPics,HttpServletRequest request,ModelMap map){ String
	 * []mainPicUrls=FileUtil.processFile(mainPics, request, map);
	 * System.out.println("mainPicUrls"+mainPicUrls[0]); return
	 * "redirect:/admin/config/editIndex.xhtml"; }
	 */
	@RequestMapping("/admin/config/saveLogoPic.xhtml")
	public String saveLogoPic(ConfigForm configForm,
			HttpServletRequest request, ModelMap model) {
		MultipartFile[] files = configForm.getImageFiles();

		// System.out.println(" fileCount=" + files.length+"
		// fileSize="+files[0].getSize());

		String[] fileUrls = FileUtil.processFile(files, request, model);
		if (fileUrls.length > 0) {
			System.out.println("fileUrls[0]=" + fileUrls[0]);
			configForm.setVal(fileUrls[0]);
		}
		configForm.setType(ConfigType.LOGO.getId());
		configForm.setName(ConfigType.toMap().get(configForm.getType()));
		configForm.setDataType(ConfigDataType.LIST.getVal());
		Config config = BeanUtils.copyTo(configForm, Config.class);
		configDataService.save(config);
		SuccessForm successForm = new SuccessForm();
		if (configForm.getId() == null) {
			successForm.setInfo("添加成功！");
			successForm.setLabel("查看列表");
			successForm.setBackUrl("/admin/config/editIndex.xhtml");

		} else {
			successForm.setInfo("修改成功！");
			successForm.setLabel("查看列表");
			successForm.setBackUrl("/admin/config/editIndex.xhtml");
		}
		model.put("successForm", successForm);
		return "/admin/success";
	}

	@RequestMapping("/admin/config/saveSelChannel.xhtml")
	public String saveSelChannel(ConfigForm configForm, ModelMap model) {

		configForm.setDataType(ConfigDataType.SINGLE.getVal());
		configForm.setName(ConfigType.toMap().get(configForm.getType()));
		Config config = BeanUtils.copyTo(configForm, Config.class);
		configDataService.save(config);
		SuccessForm successForm = new SuccessForm();
		if (configForm.getId() == null) {
			successForm.setInfo("添加成功！");
			successForm.setLabel("查看列表");
			successForm.setBackUrl("/admin/config/editIndex.xhtml");

		} else {
			successForm.setInfo("修改成功！");
			successForm.setLabel("查看列表");
			successForm.setBackUrl("/admin/config/editIndex.xhtml");
		}
		model.put("successForm", successForm);
		return "/admin/success";
	}

	@ModelAttribute("config")
	public Map<String, Object> configMap() {
		Map<Integer, String> typeMap = ConfigType.toMap();
		Map<String, Object> result = new HashMap<String, Object>();
		List<Config> configList = configDataService.queryAll();
		List<Config> tempList = null;
		for (Config config : configList) {
			String configTypeDesc = typeMap.get(config.getType());
			System.out.println("cinfigTypeDesc=" + configTypeDesc
					+ " dataType=" + config.getDataType());
			if (config.getDataType().equals(ConfigDataType.SINGLE.getVal())) {
				result.put(configTypeDesc, config);
			} else {// List
				tempList = (List<Config>) result.get(configTypeDesc);
				if (tempList == null) {
					tempList = new ArrayList<Config>();
					result.put(configTypeDesc, tempList);
				}
				tempList.add(config);
			}
		}
	//	System.out.println(((Config) result.get("leftUp")).getId());
		return result;

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

	@ModelAttribute("firstMenu")
	public Map<String, Object> firstMenuVo() {
		Map<String, Object> result = new HashMap<String, Object>();
		List<MenuVo> menuVoList = new ArrayList<MenuVo>();
		List<MenuVo> textMenuVoList = new ArrayList<MenuVo>();
		List<MenuVo> imageMenuVoList = new ArrayList<MenuVo>();
		Map<Long, MenuVo> menuVoMap = new HashMap<Long, MenuVo>();
		List<Menu> menuList = menuDataService.queryByLevel(MenuLevel.TOP
				.getId());
		for (Menu menu : menuList) {
			MenuVo menuVo = new MenuVo(menu);
			if (menu.getType().equals(MenuType.TEXT_TYPE.getValue())) {
				textMenuVoList.add(menuVo);
			} else if (menu.getType().equals(MenuType.TEXT_TYPE.getValue())) {
				imageMenuVoList.add(menuVo);
			}
			menuVoList.add(menuVo);
			menuVoMap.put(menu.getId(), menuVo);
		}
		result.put("list", menuList);
		result.put("textList", textMenuVoList);
		result.put("imageList", imageMenuVoList);
		result.put("map", menuVoMap);
		return result;

	}

	@ModelAttribute("configType")
	public Map<String, Integer> configType() {
		return ConfigType.toDescMap();
	}

	public ConfigDataService getConfigDataService() {
		return configDataService;
	}

	public void setConfigDataService(ConfigDataService configDataService) {
		this.configDataService = configDataService;
	}

	public MenuDataService getMenuDataService() {
		return menuDataService;
	}

	public void setMenuDataService(MenuDataService menuDataService) {
		this.menuDataService = menuDataService;
	}
}

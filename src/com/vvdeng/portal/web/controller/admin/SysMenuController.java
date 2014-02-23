package com.vvdeng.portal.web.controller.admin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.paipai.verticalframework.core.util.BeanUtils;
import com.paipai.verticalframework.core.vo.PageModel;
import com.paipai.verticalframework.web.spring.BaseController;
import com.vvdeng.portal.dataservice.SysMenuDataService;
import com.vvdeng.portal.entity.SysMenu;
import com.vvdeng.portal.model.MenuLevel;
import com.vvdeng.portal.model.SysMenuLevel;
import com.vvdeng.portal.model.SysMenuType;
import com.vvdeng.portal.web.form.SysMenuForm;
import com.vvdeng.portal.web.vo.MenuVo;

@Controller
public class SysMenuController extends BaseController {
	private SysMenuDataService sysMenuDataService;

	@RequestMapping(value = "/admin/sys_menu/list.xhtml")
	public String list(SysMenuForm sysMenuForm, ModelMap map) {
		map.put("pageModel", new PageModel<SysMenu>(sysMenuDataService.query(
				sysMenuForm, null), sysMenuForm));
		return "/admin/sys_menu/list";
	}

	@RequestMapping(method = RequestMethod.POST, value = "/admin/sys_menu/add.xhtml")
	public String add(ModelMap model) {
		SysMenuForm sysMenuForm = new SysMenuForm();
		model.put("sysMenuForm", sysMenuForm);
		return "/admin/sys_menu/edit";
	}

	@RequestMapping(method = RequestMethod.POST, value = "/admin/sys_menu/edit.xhtml")
	public String edit(@RequestParam(value = "id", required = false)
	Long id, ModelMap model) {
		SysMenuForm sysMenuForm = null;
		if (id == null) {
			sysMenuForm = new SysMenuForm();
		} else {
			SysMenu sysMenu = sysMenuDataService.findById(id);
			sysMenuForm = BeanUtils.copyTo(sysMenu, SysMenuForm.class);
			model.put("sysMenuForm", sysMenuForm);
		}
		model.put("sysMenuForm", sysMenuForm);
		return "/admin/sys_menu/edit";
	}

	@RequestMapping(value = "/admin/sys_menu/save.json")
	public String save(SysMenuForm sysMenuForm, ModelMap model) {
		SysMenu sysMenu = BeanUtils.copyTo(sysMenuForm, SysMenu.class);

		sysMenuDataService.save(sysMenu);
		model.put("id", sysMenu.getId());

		return "json_saveSysMenu";
	}

	@ModelAttribute("sysMenuType")
	public Map sysMenuType() {
		return SysMenuType.toMap();
	}

	@ModelAttribute("sysMenuLevel")
	public Map sysMenuLevel() {
		return SysMenuLevel.toMap();
	}

	@ModelAttribute("firstSysMenuList")
	public List<MenuVo> firstMenuVoList() {
		List<MenuVo> menuVoList = new ArrayList<MenuVo>();
		List<SysMenu> sysMenuList = sysMenuDataService.queryByLevel(MenuLevel.TOP.getId());
		for (SysMenu sysMenu : sysMenuList) {
			MenuVo menuVo = new MenuVo(sysMenu);
			menuVoList.add(menuVo);
		}
		return menuVoList;

	}
	@ModelAttribute("secondSysMenuList")
	public List<MenuVo> secondMenuVoList() {
		List<MenuVo> menuVoList = new ArrayList<MenuVo>();
		List<SysMenu> sysMenuList = sysMenuDataService.queryByLevel(MenuLevel.FIRST.getId());
		for (SysMenu sysMenu : sysMenuList) {
			MenuVo menuVo = new MenuVo(sysMenu);
			menuVoList.add(menuVo);
		}
		return menuVoList;

	}
	/*	@ModelAttribute("sysMenu")
		public Map<String, Object> sysMenuMap() {
			Map<String, Object> result = new HashMap<String, Object>();
			List<MenuVo> firstSysMenuVoList = new ArrayList<MenuVo>();
			List<SysMenu> menuList = sysMenuDataService.listByLevel(Level.FIRST
					.getValue());
			Map<Long, MenuVo> menuMap = new HashMap<Long, MenuVo>();
			for (SysMenu sysMenu : menuList) {
				MenuVo menuVo = new MenuVo(sysMenu);
				firstSysMenuVoList.add(menuVo);
				menuMap.put(menuVo.getId(), menuVo);
			}
			result.put("firstSysMenuList", firstSysMenuVoList);
			menuList = sysMenuDataService.listByLevel(Level.SECOND.getValue());
			for (SysMenu sysMenu : menuList) {
				MenuVo menuVo = new MenuVo(sysMenu);
				MenuVo pMenuVo = menuMap.get(sysMenu.getParentId());
				if (pMenuVo != null) {
					pMenuVo.getSubMenuList().add(menuVo);
				}
				menuMap.put(menuVo.getId(), menuVo);
			}
			List<MenuVo> menuVoList = new ArrayList<MenuVo>();
			menuVoList.addAll(menuMap.values());
			result.put("sysMenuMap", menuMap);
			result.put("sysMenuList", menuVoList);
			return result;

		}
	*/
	public SysMenuDataService getSysMenuDataService() {
		return sysMenuDataService;
	}

	public void setSysMenuDataService(SysMenuDataService sysMenuDataService) {
		this.sysMenuDataService = sysMenuDataService;
	}

}

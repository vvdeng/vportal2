package com.vvdeng.portal.web.controller.admin;

import java.util.ArrayList;
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
import com.paipai.verticalframework.web.spring.BaseController;
import com.vvdeng.portal.dataservice.MenuDataService;
import com.vvdeng.portal.entity.Menu;
import com.vvdeng.portal.model.MenuLevel;
import com.vvdeng.portal.model.MenuType;
import com.vvdeng.portal.util.FileUtil;
import com.vvdeng.portal.web.form.MenuForm;
import com.vvdeng.portal.web.form.SuccessForm;
import com.vvdeng.portal.web.vo.MenuVo;

@Controller
public class MenuController extends BaseController {
	private MenuDataService menuDataService;

	@RequestMapping(value = "/admin/menu/list.xhtml")
	public String list(MenuForm menuForm, ModelMap map) {
		map.put("pageModel", new PageModel<Menu>(menuDataService.query(
				menuForm, null), menuForm));
		return "/admin/menu/list";
	}

	@RequestMapping(method = RequestMethod.GET, value = "/admin/menu/add.xhtml")
	public String addGet(ModelMap model) {
		MenuForm menuForm = new MenuForm();
		model.put("menuForm", menuForm);
		return "/admin/menu/edit_get";
	}

	@RequestMapping(method = RequestMethod.POST, value = "/admin/menu/add.xhtml")
	public String add(ModelMap model) {
		MenuForm menuForm = new MenuForm();
		model.put("menuForm", menuForm);
		return "/admin/menu/edit";
	}

	@RequestMapping(method = RequestMethod.GET, value = "/admin/menu/edit.xhtml")
	public String editGet(@RequestParam("id")
	Long id, ModelMap model) {
		Menu menu = menuDataService.findById(id);
		MenuForm menuForm = BeanUtils.copyTo(menu, MenuForm.class);
		model.put("menuForm", menuForm);
		model.put("menuForm", menuForm);
		return "/admin/menu/edit_get";
	}

	@RequestMapping(method = RequestMethod.POST, value = "/admin/menu/edit.xhtml")
	public String edit(@RequestParam(value = "id", required = false)
	Long id, ModelMap model) {
		MenuForm menuForm = null;
		if (id == null) {
			menuForm = new MenuForm();
		} else {
			Menu menu = menuDataService.findById(id);
			menuForm = BeanUtils.copyTo(menu, MenuForm.class);
			model.put("menuForm", menuForm);
		}
		model.put("menuForm", menuForm);
		return "/admin/menu/edit";
	}

	@RequestMapping(value = "/admin/menu/save.xhtml")
	public String saveGet(MenuForm menuForm,HttpServletRequest request, ModelMap model) {
	
		MultipartFile[] files = menuForm.getImgFile();
	
		System.out.println( " fileSize="
				+ files.length);
	
		String[] fileUrls=FileUtil.processFile(files,request,model);
		if(fileUrls.length>0){
			System.out.println("fileUrls[0]="+fileUrls[0]);
			menuForm.setImgUrl(fileUrls[0]);
		}
		Menu menu = BeanUtils.copyTo(menuForm, Menu.class);
		menu.setLevel((menuForm.getParentId() == 0) ? MenuLevel.TOP.getId()
				: MenuLevel.FIRST.getId());
		menuDataService.save(menu);
		model.put("id", menu.getId());
		SuccessForm successForm = new SuccessForm();
		if (menuForm.getId() == null) {
			successForm.setInfo("添加成功！");
			successForm.setLabel("查看列表");
			successForm.setBackUrl("/admin/menu/list.xhtml");

		} else {
			successForm.setInfo("修改成功！");
			successForm.setLabel("查看列表");
			successForm.setBackUrl("/admin/menu/list.xhtml");
		}
		model.put("successForm", successForm);
		return "/admin/success";
	}

	@RequestMapping(value = "/admin/menu/save.json")
	public String save(MenuForm menuForm, ModelMap model) {
		

		Menu menu = BeanUtils.copyTo(menuForm, Menu.class);
		menu.setLevel((menuForm.getParentId() == 0) ? MenuLevel.TOP.getId()
				: MenuLevel.FIRST.getId());
		menuDataService.save(menu);
		model.put("id", menu.getId());

		return "json_saveMenu";
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
	public Map<String,Object> firstMenuVo() {
		Map<String,Object> result=new HashMap<String, Object>();
		List<MenuVo> menuVoList = new ArrayList<MenuVo>();
		Map<Long,MenuVo> menuVoMap=new HashMap<Long, MenuVo>();
		List<Menu> menuList = menuDataService.queryByLevel(MenuLevel.TOP
				.getId());
		for (Menu menu : menuList) {
			MenuVo menuVo = new MenuVo(menu);
			menuVoList.add(menuVo);
			menuVoMap.put(menu.getId(), menuVo);
		}
		result.put("list", menuList);
		result.put("map", menuVoMap);
		return result;

	}
	@ModelAttribute("menuTypeMap")
	public Map<Integer,String> munuTypeMap()
	{
	   return MenuType.toMap();
	}
	public MenuDataService getMenuDataService() {
		return menuDataService;
	}

	public void setMenuDataService(MenuDataService menuDataService) {
		this.menuDataService = menuDataService;
	}
}




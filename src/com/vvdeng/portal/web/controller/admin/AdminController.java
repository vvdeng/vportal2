package com.vvdeng.portal.web.controller.admin;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.paipai.verticalframework.web.spring.BaseController;
import com.vvdeng.portal.bizservice.SideMenuService;
import com.vvdeng.portal.dataservice.SysMenuDataService;
import com.vvdeng.portal.entity.SysMenu;
import com.vvdeng.portal.model.MenuLevel;
import com.vvdeng.portal.model.SysMenuType;
import com.vvdeng.portal.util.EmptyUtil;
import com.vvdeng.portal.web.form.SideForm;
import com.vvdeng.portal.web.form.SysUserForm;

@Controller
public class AdminController extends BaseController {
	private SysMenuDataService sysMenuDataService;

	@RequestMapping("/admin/index.xhtml")
	public String index() {
		return "/admin/base";
	}

	@RequestMapping(method = RequestMethod.GET, value = "/admin/login.jhtml")
	public String loginPage() {
		
		return "/admin/login";
	}

	@RequestMapping(method = RequestMethod.POST, value = "/admin/login.jhtml")
	public String login(SysUserForm sysUserForm, HttpSession session,ModelMap model) {
		System.out.println("uName=" + sysUserForm.getName() + " uPwd="
				+ sysUserForm.getPwd());
		if ("admin".equals(sysUserForm.getName())
				&& "admin".equals(sysUserForm.getPwd())) {
			System.out.println("SessionVefityCode:"+session.getAttribute("verifyCode")+" msg="+session.getAttribute("msg"));
			session.setAttribute("sysUser", sysUserForm);
			
			return "redirect:/admin/index.xhtml";
		} else {
			model.put("errMsg", "用户名或密码不正确");
			return "/admin/login";
		}
	}
	@RequestMapping("/admin/needLogin.jhtml")
	public String needLogin() {

		
		return "/admin/need_login";

	}
	@RequestMapping("/admin/logout.jhtml")
	public String logout(HttpSession session) {

		session.invalidate();
		return "redirect:/admin/needLogin.jhtml";

	}

	@RequestMapping("/admin/head.xhtml")
	public String head(ModelMap map) {
		List<SysMenu> topSysMenuList = sysMenuDataService
				.queryByLevel(MenuLevel.TOP.getId());
		map.put("topSysMenuList", topSysMenuList);
		System.out.println("topSysMenuList size=" + topSysMenuList.size());
		return "/admin/head";
	}

	@RequestMapping("/admin/side.xhtml")
	public String side(SideForm sideForm, ModelMap map) {

		processSide(sideForm, map);
		map.put("sideForm", sideForm);
		return "/admin/side";
	}

	@RequestMapping("/admin/main.xhtml")
	public String main() {
		return "/admin/main";
	}

	@RequestMapping("/admin/welcome.xhtml")
	public String welcome() {
		return "/admin/welcome";
	}

	public SysMenuDataService getSysMenuDataService() {
		return sysMenuDataService;
	}

	public void setSysMenuDataService(SysMenuDataService sysMenuDataService) {
		this.sysMenuDataService = sysMenuDataService;
	}

	private void processSide(SideForm sideForm, ModelMap map) {
		if (sideForm.getOperation() == null
				|| sideForm.getOperation().isEmpty()
				|| sideForm.getOperation().equals(SysMenu.DEFAULT_OPERATION)) {
			if (sideForm.getType() == null
					|| sideForm.getType().equals(SysMenuType.LIST.getId())) {
				List<SysMenu> sysMenuList = sysMenuDataService
						.queryByParentId(sideForm.getId());
				map.put("menuList", sysMenuList);
				map.put("defaultHref", EmptyUtil.isNull(sysMenuList) ? ""
						: sysMenuList.get(0).getHref());

			}
		} else {
			SideMenuService sideMenuEditMenu = getBean("editMenu",
					SideMenuService.class);
			sideMenuEditMenu.tree(sideForm, map);

		}

	}

}

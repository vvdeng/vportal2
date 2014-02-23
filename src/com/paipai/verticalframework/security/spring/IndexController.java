/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																	
 * FileName??IndexController.class				
 *			
 * Description?????/?????????	 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0   raywu  2010-11-09  Create	
 */
package com.paipai.verticalframework.security.spring;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.paipai.boss.common.util.OaKeyHandle;
import com.paipai.verticalframework.security.constants.SecurityConstants;
import com.paipai.verticalframework.security.spring.data.AccountBO;
import com.paipai.verticalframework.security.spring.data.PrivilegeBO;
import com.paipai.verticalframework.security.util.SecurityUtil;
import com.paipai.verticalframework.web.spring.BaseController;

/**
 * ???/?????????
 * 
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
@NoSecurity
@Controller
public class IndexController extends BaseController {

	/**
	 * ????????
	 */
	@RequestMapping(value = "/login.xhtml")
	public String login(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		SecurityUtil.logout(
				request, response);
		model.put("adminUrl", SecurityUtil.getAdminUrl());
		model.put("systemId", SecurityUtil.getSystemId());
		return "/main/login";
	}

	/**
	 * ???????
	 */
	@RequestMapping(value = "/loginForward.action")
	public String loginForward(LoginForwardForm form,
			HttpServletRequest request, HttpServletResponse response) {
		AccountBO accountBO = decryptAccountBO(form.getAccountBO());
		if (accountBO != null) {
			List<String> functions = decryptFunctions(form.getFunctions());
			SecurityUtil.loginSuccess(request, response, accountBO, functions);

			return "redirect:/index.xhtml";
		}
		else {
			return "redirect:/login.xhtml";
		}
	}

	/**
	 * ???
	 */
	@RequestMapping(value = "/index.xhtml")
	public String index() {
		return "/main/index";
	}

	/**
	 * ??????
	 */
	@RequestMapping(value = "/top.xhtml")
	public String top() {
		return "/main/top";
	}

	/**
	 * ????????
	 */
	@RequestMapping(value = "/center.xhtml")
	public String center() {
		return "/main/center";
	}

	/**
	 * ????????
	 */
	@RequestMapping(value = "/menu.xhtml")
	public String menu(HttpSession session, ModelMap model) {
		model.put("privileges", session.getAttribute("privileges"));
		return "/main/menu";
	}

	/**
	 * ?????????
	 */
	@RequestMapping(value = "/nav.xhtml")
	public String nav() {
		return "/main/nav";
	}

	/**
	 * ???????
	 */
	@RequestMapping(value = "/welcome.xhtml")
	public String welcome() {
		return "/main/welcome";
	}

	private AccountBO decryptAccountBO(AccountBO accountBO) {
		if (accountBO.getUserBO() != null) {
			accountBO.getUserBO().setUserName(
					OaKeyHandle.decrypt(accountBO.getUserBO().getUserName(),
							SecurityConstants.DecryptWord, false));
		}

		List<PrivilegeBO> privilegeList = accountBO.getPrivileges();
		if (privilegeList != null) {
			for (PrivilegeBO bo : privilegeList) {
				bo.setMenuUrl(OaKeyHandle.decrypt(bo.getMenuUrl(),
						SecurityConstants.DecryptWord, false));
				bo.setPrivilegeName(OaKeyHandle.decrypt(bo.getPrivilegeName(),
						SecurityConstants.DecryptWord, false));
			}
		}

		return accountBO;
	}

	private List<String> decryptFunctions(List<String> functions) {
		List<String> decryptedFunctions = new ArrayList<String>();

		if (functions != null) {
			for (String function : functions) {
				String decrptedFunction = OaKeyHandle.decrypt(function,
						SecurityConstants.DecryptWord, false);
				decryptedFunctions.add(decrptedFunction);

			}
		}
		return decryptedFunctions;
	}
}

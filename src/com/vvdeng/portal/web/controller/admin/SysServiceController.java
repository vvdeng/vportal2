package com.vvdeng.portal.web.controller.admin;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.font.FontRenderContext;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.paipai.verticalframework.core.util.BeanUtils;
import com.paipai.verticalframework.web.spring.BaseController;
import com.vvdeng.portal.entity.SysMenu;
import com.vvdeng.portal.util.SysUtil;
import com.vvdeng.portal.web.form.SysMenuForm;

@Controller
public class SysServiceController extends BaseController {
	@ResponseBody
	@RequestMapping("/code.jhtml")
	public byte[] code(HttpSession session) {
		int verifyCode = SysUtil.genCode();
		byte[] result = SysUtil.genCodeImage(verifyCode);
		session.setAttribute("verifyCode", String.format("%04d",verifyCode));
		System.out.println(" code int="+verifyCode+" str="+session.getAttribute("verifyCode"));
		return result;
	}

	@RequestMapping(value = "/checkCode.json")
	public String checkCode(String code, HttpSession session,ModelMap model) {
		String sessionCode=(String)session.getAttribute("verifyCode");
		System.out.println("sessionCode="+sessionCode+" code="+code);
		if(code!=null&&code.equals(sessionCode)){
			model.put("errCode",0 );
		}
		else{
		model.put("errCode",1 );
		model.put("msg", "验证码错误");
		}
		return "json_saveSysMenu";
	}
}


package com.paipai.verticalframework.web.ajax;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;


public class UrlTextView extends AbstractView {

	protected void renderMergedOutputModel(Map map, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String errCode = (String) map.get("errCode");
		if (errCode == null) {
			errCode = "0";
		}
		String msg = (String) map.get("msg");
		if (msg == null) {
			msg = "success";
		}
		String result = (String) map.get("result");
		
		StringBuffer buffer = new StringBuffer();
		buffer.append("recode=");
		buffer.append(errCode);
		buffer.append("&errmsg=");
		buffer.append(msg);
		if (result != null) {
			buffer.append("&");
			buffer.append(result);
		}
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/plain; charset=UTF-8");

		response.getOutputStream().write("retcode=0&errmsg=success".getBytes());
		response.getOutputStream().flush();
	}
}

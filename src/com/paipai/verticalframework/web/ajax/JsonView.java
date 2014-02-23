package com.paipai.verticalframework.web.ajax;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.springframework.web.servlet.view.AbstractView;

import com.paipai.verticalframework.util.dataparse.json.JsonSpread;

public class JsonView extends AbstractView {

	/*
	 * protected void renderMergedOutputModel(Map map, HttpServletRequest
	 * request, HttpServletResponse response) throws Exception {
	 * 
	 * JSONObject json = new JSONObject(); JsonData jsonData = new JsonData();
	 * 
	 * if (map.get("errCode") != null) {
	 * jsonData.setErrCode(map.get("errCode").toString());
	 *  } json.put("errCode", jsonData.getErrCode());
	 * 
	 * if (map.get("msg") != null) { jsonData.setMsg(map.get("msg").toString());
	 *  } json.put("msg",jsonData.getMsg()); Map result = new HashMap(); for
	 * (Object key : map.keySet()) { if (key != null &&
	 * !key.toString().startsWith(
	 * "org.springframework.validation.BindingResult")) { result.put(key,
	 * map.get(key)); } }
	 * if(map.get("mixData")==null||Boolean.TRUE==(Boolean)map.get("mixData")){
	 * JSONObject dataJson = new JSONObject(); dataJson.putAll(result);
	 * json.put("data", dataJson); } else{ json.putAll(result); }
	 * 
	 * 
	 * System.out.println("result=="+result);
	 * System.out.println("jsonString="+json.toJSONString());
	 * response.setCharacterEncoding("UTF-8");
	 * response.setContentType("text/plain; charset=UTF-8");
	 * response.getOutputStream().write(json.toJSONString().getBytes("utf-8"));
	 * response.getOutputStream().flush(); }
	 */
	protected void renderMergedOutputModel(Map map, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		JsonData jsonData = new JsonData();

		if (map.get("errCode") != null) {
			jsonData.setErrCode(map.get("errCode").toString());

		}

		if (map.get("msg") != null) {
			jsonData.setMsg(map.get("msg").toString());

		}
		Map result = new HashMap();
		for (Object key : map.keySet()) {
			if (key != null
					&& !key.toString().startsWith(
							"org.springframework.validation.BindingResult")) {
				result.put(key, map.get(key));
			}
		}
		jsonData.setData(result);
		String jsonString = null;
		if (map.get("mixData") == null
				|| Boolean.TRUE == (Boolean) map.get("mixData")) {
			jsonString = JsonSpread.toJSONString(jsonData);
		} else {
			jsonString = JsonSpread.toJSONString(result);
		}

		System.out.println("result==" + result);
		System.out.println("jsonString=" + jsonString);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/plain; charset=UTF-8");
		response.getOutputStream().write(jsonString.getBytes("utf-8"));
		response.getOutputStream().flush();
	}

	public static void main(String[] args) {
		Map m = new HashMap();
		m.put("1", "2");
		m.put("2", "2");
		System.out.println(JsonSpread.toJSONString(m));
	}

}

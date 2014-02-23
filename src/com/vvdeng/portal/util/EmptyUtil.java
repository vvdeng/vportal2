package com.vvdeng.portal.util;

import java.util.List;



public class EmptyUtil {
	public static boolean isNull(String s) {
		return s == null || s.isEmpty();
	}

	public static boolean isNull(Long l) {
		return l == null;
	}

	public static boolean isNull(Integer i) {
		return i == null;
	}
	public static boolean isNull(List l){
		return l==null||l.size()==0;
	}
}

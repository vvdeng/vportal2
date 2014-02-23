package com.paipai.verticalframework.service.persistent.hibernate.hql;

import org.apache.commons.lang.StringUtils;

import com.paipai.verticalframework.service.persistent.hibernate.hql.IEffect;

/**
 * @author powerruan
 *
 */
public abstract class StringEffect implements IEffect<String> {
	public static final StringEffect EMPTY_NULL = new StringEffect() {
		protected boolean isMatchNullCondition(String source) {
			return StringUtils.isEmpty(source);
		}
	};

	public static final StringEffect SPECIAL_NULL = new StringEffect() {
		protected boolean isMatchNullCondition(String source) {
			return "0".equalsIgnoreCase(source);
		}
	};

	public String doEffect(String source) {
		if (isMatchNullCondition(source)) {
			return null;
		}
		return source;
	}

	protected abstract boolean isMatchNullCondition(String paramString);
}

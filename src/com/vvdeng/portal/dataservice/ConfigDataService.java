package com.vvdeng.portal.dataservice;

import java.util.List;

import com.paipai.verticalframework.core.vo.Page;
import com.paipai.verticalframework.service.config.support.annotation.HibernateService;
import com.paipai.verticalframework.service.persistent.Order;
import com.paipai.verticalframework.service.persistent.hibernate.BaseHibernatePersistentService;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;
import com.paipai.verticalframework.service.persistent.hibernate.hql.IXHqlCompiler;
import com.paipai.verticalframework.service.persistent.hibernate.hql.ast.XHqlCompilerImpl;
import com.vvdeng.portal.entity.Config;
import com.vvdeng.portal.entity.Menu;
import com.vvdeng.portal.web.form.MenuForm;

@HibernateService
public class ConfigDataService extends BaseHibernatePersistentService<Config> {
	private IXHqlCompiler compiler = new XHqlCompilerImpl();

	public List<Menu> queryByType(Integer type) {
		String hql = "from " + Config.class.getName()
				+ " config where config.type=:p0";
		return (List<Menu>) super.queryListByHql(hql, type);
	}

}

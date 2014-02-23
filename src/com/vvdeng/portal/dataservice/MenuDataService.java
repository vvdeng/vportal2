package com.vvdeng.portal.dataservice;

import java.util.List;

import com.paipai.verticalframework.core.vo.Page;
import com.paipai.verticalframework.service.config.support.annotation.HibernateService;
import com.paipai.verticalframework.service.persistent.Order;
import com.paipai.verticalframework.service.persistent.hibernate.BaseHibernatePersistentService;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;
import com.paipai.verticalframework.service.persistent.hibernate.hql.IXHqlCompiler;
import com.paipai.verticalframework.service.persistent.hibernate.hql.ast.XHqlCompilerImpl;
import com.vvdeng.portal.entity.Menu;
import com.vvdeng.portal.web.form.MenuForm;

@HibernateService
public class MenuDataService extends BaseHibernatePersistentService<Menu> {
	private IXHqlCompiler compiler = new XHqlCompilerImpl();

	public List<Menu> queryByLevel(Integer level) {
		String hql = "from " + Menu.class.getName()
				+ " menu where menu.level=:p0";
		return (List<Menu>) super.queryListByHql(hql, level);
	}
	public List<Menu> queryByParentId(Long parentId){
		String hql= "from " + Menu.class.getName()
				+ " menu where menu.parentId=:p0";
		return (List<Menu>) super.queryListByHql(hql, parentId);
	}
	@SuppressWarnings("unchecked")
	public Page<Menu> query(MenuForm menuForm, Order order) {
		String hqlStr = "from " + Menu.class.getName()
				+ " menu where menu.title = :title and menu.parentId=:parentId ";

		Hql hql = this.compiler.compile(hqlStr, menuForm, order);
		System.out.println("query hql=" + hql);
		return queryPageByHql(hql, menuForm.getFrom(), menuForm.getOffset());
	}
}

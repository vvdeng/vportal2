package com.vvdeng.portal.dataservice;

import java.util.List;

import com.paipai.verticalframework.core.vo.Page;
import com.paipai.verticalframework.service.config.support.annotation.HibernateService;
import com.paipai.verticalframework.service.persistent.Order;
import com.paipai.verticalframework.service.persistent.hibernate.BaseHibernatePersistentService;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;
import com.paipai.verticalframework.service.persistent.hibernate.hql.IXHqlCompiler;
import com.paipai.verticalframework.service.persistent.hibernate.hql.ast.XHqlCompilerImpl;
import com.vvdeng.portal.entity.SysMenu;
import com.vvdeng.portal.web.form.SysMenuForm;

@HibernateService
public class SysMenuDataService extends BaseHibernatePersistentService<SysMenu> {
	private IXHqlCompiler compiler = new XHqlCompilerImpl();

	public List<SysMenu> queryByLevel(Integer level) {
		String hql = "from " + SysMenu.class.getName()
				+ " sysMenu where sysMenu.level=:p0";
		return (List<SysMenu>) super.queryListByHql(hql, level);
	}
	public List<SysMenu> queryByParentId(Long parentId) {
		String hql = "from " + SysMenu.class.getName()
				+ " sysMenu where sysMenu.parentId=:p0";
		return (List<SysMenu>) super.queryListByHql(hql, parentId);
	}
	@SuppressWarnings("unchecked")
	public Page<SysMenu> query(SysMenuForm sysMenuForm, Order order) {
		String hqlStr = "from " + SysMenu.class.getName()
				+ " sysMenu where sysMenu.title = :title and sysMenu.parentId=:parentId ";

		Hql hql = this.compiler.compile(hqlStr, sysMenuForm, order);
		System.out.println("query hql=" + hql);
		return queryPageByHql(hql, sysMenuForm.getFrom(), sysMenuForm.getOffset());
	}
}

package com.vvdeng.portal.dataservice;

import com.paipai.verticalframework.core.vo.Page;
import com.paipai.verticalframework.service.config.support.annotation.HibernateService;
import com.paipai.verticalframework.service.persistent.Order;
import com.paipai.verticalframework.service.persistent.hibernate.BaseHibernatePersistentService;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;
import com.paipai.verticalframework.service.persistent.hibernate.hql.IXHqlCompiler;
import com.paipai.verticalframework.service.persistent.hibernate.hql.ast.XHqlCompilerImpl;
import com.vvdeng.portal.entity.News;
import com.vvdeng.portal.web.form.NewsForm;

@HibernateService
public class NewsDataService extends BaseHibernatePersistentService<News> {

	private IXHqlCompiler compiler = new XHqlCompilerImpl();

	@SuppressWarnings("unchecked")
	public Page<News> query(NewsForm newsForm, Order order) {
		String hqlStr = "from "
				+ News.class.getName()
				+ " news where news.id = :id and news.firstMenuId=:firstMenuId and news.secondMenuId=:secondMenuId ";

		Hql hql = this.compiler.compile(hqlStr, newsForm, order);
		System.out.println("query hql=" + hql);
		return queryPageByHql(hql, newsForm);
	}

	public int updateMainImagePath(Long id, String mainImagePath) {
		String hqlStr = "update " + News.class.getName()
				+ " news set mainImagePath='" + mainImagePath
				+ "' where news.id=" + id;
		Hql hql = new Hql(hqlStr);
		return update(hql);
	}

}

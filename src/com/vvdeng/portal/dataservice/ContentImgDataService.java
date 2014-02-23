package com.vvdeng.portal.dataservice;

import com.paipai.verticalframework.core.vo.Page;
import com.paipai.verticalframework.service.config.support.annotation.HibernateService;
import com.paipai.verticalframework.service.persistent.Order;
import com.paipai.verticalframework.service.persistent.hibernate.BaseHibernatePersistentService;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;
import com.paipai.verticalframework.service.persistent.hibernate.hql.IXHqlCompiler;
import com.paipai.verticalframework.service.persistent.hibernate.hql.ast.XHqlCompilerImpl;
import com.vvdeng.portal.entity.ContentImg;
import com.vvdeng.portal.entity.News;
import com.vvdeng.portal.web.form.ContentImgForm;
import com.vvdeng.portal.web.form.NewsForm;

@HibernateService
public class ContentImgDataService extends BaseHibernatePersistentService<ContentImg> {
	
	private IXHqlCompiler compiler = new XHqlCompilerImpl();

	@SuppressWarnings("unchecked")
	public Page<ContentImg> query(ContentImgForm contentImgForm,
			Order order)
	{
		String hqlStr = "from " + ContentImg.class.getName()
				+ " contentImg where contentImg.id = :id and contentImg.contentId=:contentId ";

		Hql hql = this.compiler.compile(hqlStr, contentImgForm, order);
		System.out.println("query hql="+hql);
		return queryPageByHql(hql, contentImgForm.getFrom(), contentImgForm.getOffset());
	}
	public int update(ContentImgForm contentImgForm){
		StringBuilder querySb=new StringBuilder();
		if(contentImgForm!=null&&contentImgForm.getContentId()!=null){
			querySb.append(" and contentImg.contentId="+contentImgForm.getContentId());
		}
		if(contentImgForm!=null&&contentImgForm.getId()!=null){
			querySb.append(" and contentImg.id="+contentImgForm.getId());
		}		
		String hqlStr ="update "+ContentImg.class.getName()+" contentImg set contentImg.flag="+contentImgForm.getFlag();//+" where contentImg.id=:id and contentImg.contentId=:contentId";
		if(querySb.length()>0){
			hqlStr+=querySb.replace(0, 4, "where ");
		}
	    Hql	hql=new Hql(hqlStr);

		return update(hql);
	}

}

/**
 * Copyright (C) 1998-2009 TENCENT Inc.All Rights Reserved.		
 * 																
 * FileName??BaseHibernatePersistentService.java					
 *			
 * Description??Hibernate????÷??????											 
 * History??
 *  ?汾??    ????      ????       ?????????????
 *  1.0     raywu   2010-11-04  Create	
 */
package com.paipai.verticalframework.service.persistent.hibernate;

import java.io.Serializable;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.paipai.verticalframework.core.util.GenericsUtils;
import com.paipai.verticalframework.core.vo.BasePageForm;
import com.paipai.verticalframework.core.vo.Page;
import com.paipai.verticalframework.log.Log;
import com.paipai.verticalframework.service.persistent.BasePersistentService;
import com.paipai.verticalframework.service.persistent.ConstraintViolationServiceException;
import com.paipai.verticalframework.service.persistent.Order;
import com.paipai.verticalframework.service.persistent.hibernate.hql.Hql;
import com.paipai.verticalframework.service.persistent.hibernate.hql.OrderBy;

/**
 * Hibernate????÷??????
 * 
 * @author raywu (ayufox@gmail.com)
 * @param <T>
 */
public abstract class BaseHibernatePersistentService<T> extends
		HibernateDaoSupport implements BasePersistentService<T> {

	/**
	 * T??????
	 * 
	 * @return Class
	 */
	protected Class getTargetClass() {
		return GenericsUtils.getGenericClass(getClass());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#delete(java.lang.Object)
	 */
	public void delete(T t) {
		getHibernateTemplate().delete(t);
		Log.logKey("Delete", "Data[" + t + "]");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#deleteWithCheck(java.lang.Object)
	 */
	public void deleteWithCheck(T t) throws ConstraintViolationServiceException {
		try {
			delete(t);
			flush();
			Log.logKey("Delete", "Data[" + t + "]");
		} catch (DataIntegrityViolationException e) {
			throw new ConstraintViolationServiceException(e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#deleteById(java.io.Serializable)
	 */
	public void deleteById(final Serializable id) {
		T t = findById(id);
		if (t != null) {
			getHibernateTemplate().delete(t);
			Log.logKey("Delete", "Data[type=" + getTargetClass().getName()
					+ ",id=" + id + "]");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#deleteByIds(java.io.Serializable[])
	 */
	public void deleteByIds(Serializable[] ids) {
		for (Serializable id : ids) {
			deleteById(id);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#deleteByIdWithCheck(java.io.Serializable)
	 */
	public void deleteByIdWithCheck(Serializable id)
			throws ConstraintViolationServiceException {
		try {
			deleteById(id);
			flush();
		} catch (DataIntegrityViolationException e) {
			throw new ConstraintViolationServiceException(e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#findById(java.io.Serializable)
	 */
	public T findById(Serializable id) {
		if (id == null) {
			return null;
		}
		return (T) getHibernateTemplate().get(getTargetClass(), id);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#queryByIds(java.util.Collection)
	 */
	public List<T> queryByIds(Collection<Serializable> ids) {
		if (ids.size() == 0) {
			return Collections.EMPTY_LIST;
		}
		String hql = "from " + getTargetClass().getName()
				+ " o where o.id in (:p0)";
		return queryListByHql(hql, ids);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#save(java.lang.Object)
	 */
	public void save(T t) {
		save(t, false);
	}

	/**
	 * @param t
	 * @param force
	 */
	public void save(T t, boolean force) {
		if (force) {
			getHibernateTemplate().save(t);
			Log.logKey("Save", "Data[" + t + "]");
		} else {
			getHibernateTemplate().saveOrUpdate(t);
			Log.logKey("SaveOrUpdate", "Data[" + t + "]");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#saveWithCheck(java.lang.Object)
	 */
	public void saveWithCheck(T t) throws ConstraintViolationServiceException {
		try {
			save(t);
			flush();
		} catch (DataIntegrityViolationException e) {
			throw new ConstraintViolationServiceException(e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#update(java.lang.Object)
	 */
	public void update(T t) {
		getHibernateTemplate().update(t);
		Log.logKey("Update", "Data[" + t + "]");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#updateWithCheck(java.lang.Object)
	 */
	public void updateWithCheck(T t) throws ConstraintViolationServiceException {
		try {
			update(t);
			flush();
		} catch (DataIntegrityViolationException e) {
			throw new ConstraintViolationServiceException(e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#flush()
	 */
	public void flush() {
		getHibernateTemplate().flush();
	}

	/**
	 * ??????????????HQL????????????????????÷???
	 * 
	 * @return String
	 */
	protected String getFindAllHql() {
		return "from " + getTargetClass().getName() + " o ";
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#queryAll()
	 */
	public List<T> queryAll() {
		return getHibernateTemplate().executeFind(
				new HibernateQueryListCallback(new Hql(getFindAllHql())));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#queryAll(int,
	 *      int)
	 */
	public Page<T> queryAll(int from, int offset) {
		return new Page(findCountByHql(new Hql(getFindAllHql())),
				queryListByHql(new Hql(getFindAllHql()), from, offset));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#queryAll(com.paipai.framework.persistent.Order)
	 */
	public List<T> queryAll(Order order) {
		String hql = getFindAllHql() + " " + new OrderBy(order).buildOrder("o");
		return queryListByHql(hql);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.paipai.framework.persistent.BasePersistentService#queryAll(int,
	 *      int, com.paipai.framework.persistent.Order)
	 */
	public Page<T> queryAll(int from, int offset, Order order) {
		String hql = "from " + getTargetClass().getName();
		return queryPageByHql(hql, from, offset);
	}

	/**
	 * ?????????
	 * 
	 * @return int
	 */
	public int findAllCount() {
		return findCountByHql(new Hql(getFindAllHql()));
	}

	/**
	 * ???hql??????б???
	 * 
	 * @param hql
	 *            ??????hql???
	 * @param from
	 *            ???????±?
	 * @param offset
	 *            ????????
	 * @return List
	 */
	protected List queryListByHql(Hql hql, int from, int offset) {
		return getHibernateTemplate().executeFind(
				new HibernateQueryListCallback(hql, from, offset));
	}

	/**
	 * ???hql??????б???
	 * 
	 * @param hqlstr
	 *            hql???
	 * @param from
	 *            ???????±?
	 * @param offset
	 *            ????????
	 * @return List
	 */
	protected List queryListByHql(String hqlstr, int from, int offset) {
		return queryListByHql(new Hql(hqlstr), from, offset);
	}

	/**
	 * ???hql??????б???
	 * 
	 * @param hql
	 *            ??????hql???
	 * @return List
	 */
	protected List queryListByHql(Hql hql) {

		return getHibernateTemplate().executeFind(
				new HibernateQueryListCallback(hql));
	}

	/**
	 * ???hql??????б???
	 * 
	 * @param hqlstr
	 *            hql???
	 * @param values
	 *            ??????hql????е?p0??p1 ....????
	 * @return List
	 */
	protected List queryListByHql(String hqlstr, Object... values) {
		return queryListByHql(Hql.createIndexHql(hqlstr, values));
	}

	/**
	 * ???hql??????б???
	 * 
	 * @param hqlstr
	 *            hql???
	 * @return List
	 */
	protected List queryListByHql(String hqlstr) {
		return queryListByHql(new Hql(hqlstr));
	}

	/**
	 * ???hql???????????
	 * 
	 * @param hql
	 *            ??????hql???
	 * @param from
	 *            ???????±?
	 * @param offset
	 *            ????????
	 * @return Page
	 */
	protected Page queryPageByHql(Hql hql, int from, int offset) {
		return new Page(findCountByHql(hql), queryListByHql(hql, from, offset));
	}

	protected Page queryPageByHql(Hql hql, BasePageForm form) {
		Page result = null;
		int from = form.getFrom();
		int offset = form.getOffset();
		Hql newHql=hql;
		if (form.getExtraConditon() != null) {
	
			String hqlStr = hql.getHql();
			
			if (hqlStr.indexOf("where") > 0) {
				
				hqlStr=hqlStr.replace("where", "where " + form.getExtraConditon()
						+ " and ");
			}else{
				hqlStr+=" where "+form.getExtraConditon();
			}
			newHql=new Hql(hqlStr,hql.getParameters());
			System.out.println("extraConditon="+form.getExtraConditon()+" after extraConditon hql="+newHql.getHql());
		}
		if (form.isSelCount()) {
			result = new Page(findCountByHql(newHql), queryListByHql(newHql, from,
					offset));
		} else {
			result = new Page(-1, queryListByHql(newHql, from, offset));
		}
		return result;
	}

	/**
	 * ???hql???????????
	 * 
	 * @param hqlstr
	 *            hql???
	 * @param from
	 *            ???????±?
	 * @param offset
	 *            ????????
	 * @param values
	 *            ??????hql????е?p0??p1 ....????
	 * @return Page
	 */
	protected Page queryPageByHql(String hqlstr, int from, int offset,
			Object... values) {
		return queryPageByHql(Hql.createIndexHql(hqlstr, values), from, offset);
	}

	/**
	 * ???hql???????????
	 * 
	 * @param hqlstr
	 *            hql???
	 * @param from
	 *            ???????±?
	 * @param offset
	 *            ????????
	 * @return Page
	 */
	protected Page queryPageByHql(String hqlstr, int from, int offset) {
		return queryPageByHql(new Hql(hqlstr), from, offset);
	}

	/**
	 * ???hql??????????
	 * 
	 * @param hqlstr
	 *            hql???
	 * @return Object
	 */
	protected Object findUniqueByHql(Hql hql) {
		return getHibernateTemplate().execute(
				new HibernateQueryUniqueCallback(hql));
	}

	/**
	 * ???hql??????????
	 * 
	 * @param hqlstr
	 *            hql???
	 * @param values
	 *            ??????hql????е?p0??p1 ....????
	 * @return Page
	 */
	protected Object findUniqueByHql(String hqlstr, Object... values) {
		return findUniqueByHql(Hql.createIndexHql(hqlstr, values));
	}

	/**
	 * ???hql??????????
	 * 
	 * @param hqlstr
	 *            hql???
	 * @return Object
	 */
	protected Object findUniqueByHql(String hqlstr) {
		return findUniqueByHql(new Hql(hqlstr));
	}

	/**
	 * ???hql??????????
	 * 
	 * @param hql
	 *            ??????hql???
	 * @return int
	 */
	protected int findCountByHql(Hql hql) {
		Long count = (Long) getHibernateTemplate().execute(
				new HibernateQueryUniqueCallback(new Hql("select count(*) "
						+ hql.getHql(), hql.getParameters())));
		return count.intValue();
	}

	/**
	 * ???hql??????????
	 * 
	 * @param hqlstr
	 *            hql???
	 * @return int
	 */
	protected int findCountByHql(String hqlstr) {
		return findCountByHql(new Hql(hqlstr));
	}

	/**
	 * ???hql??????????
	 * 
	 * @param hqlstr
	 *            hql???
	 * @param values
	 *            ??????hql????е?p0??p1 ....????
	 * @return int
	 */
	protected int findCountByHql(String hqlstr, Object... values) {
		return findCountByHql(Hql.createIndexHql(hqlstr, values));
	}

	/**
	 * ??????
	 * 
	 * @param hqlstr
	 *            hql???
	 * @param values
	 *            ??????hql????е?p0??p1 ....????
	 * @return int
	 */
	protected int doBatchUpdate(String hqlstr, Object... values) {
		return doBatchUpdate(Hql.createIndexHql(hqlstr, values));
	}

	/**
	 * ??????
	 * 
	 * @param hqlstr
	 *            hql???
	 * @return int
	 */
	protected int doBatchUpdate(String hqlstr) {
		return (Integer) doBatchUpdate(hqlstr, new Object[0]);
	}

	/**
	 * ??????
	 * 
	 * @param hql
	 *            ??????hql???
	 * @return int
	 */
	protected int doBatchUpdate(Hql hql) {
		int result = (Integer) getHibernateTemplate().execute(
				new HibernateDoBatchUpdateCallback(hql));
		Log.logKey("BatchUpdate", hql);

		return result;
	}

	public int update(Hql hql) {
		int result = (Integer) getHibernateTemplate().execute(
				new HibernateUpdateCallback(hql));
		Log.logKey("update", hql);
		return result;
	}

	/**
	 * ???Hibernate???
	 * 
	 * @param callback
	 *            ?????
	 * @return Object
	 */
	protected Object doCallback(HibernateCallback callback) {
		return getHibernateTemplate().execute(callback);
	}

	/**
	 * ???sql???
	 * 
	 * @param sql
	 *            sql???
	 * @return Object
	 */
	protected Object executeSQL(final String sql) {
		return doCallback(new JdbcStatementCallback(sql) {

			/*
			 * (non-Javadoc)
			 * 
			 * @see com.konceptusa.framework.core.dao.JdbcStatementCallback#doInJdbc(java.sql.PreparedStatement)
			 */
			public Object doInJdbc(PreparedStatement pstm) throws SQLException {
				return pstm.executeUpdate();
			}
		});
	}

	/**
	 * ??д洢???
	 * 
	 * @param sql
	 *            ?洢???
	 * @return Object
	 */
	protected Object executeProcs(final String sql) {
		return doCallback(new JdbcProcsStatemenetCallback(sql) {

			public Object doInJdbc(CallableStatement pstm) throws SQLException {
				return pstm.executeUpdate();
			}
		});
	}
}

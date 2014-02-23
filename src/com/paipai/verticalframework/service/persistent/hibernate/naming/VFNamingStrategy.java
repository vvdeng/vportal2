package com.paipai.verticalframework.service.persistent.hibernate.naming;

import org.hibernate.cfg.ImprovedNamingStrategy;
import org.hibernate.util.StringHelper;

/** 
 * <??????>
 * @author raywu????????????
 * @version 1.0???°汾???
 * @see ?ο???JavaDoc
 */
public class VFNamingStrategy extends ImprovedNamingStrategy {
	private String addTablePrefix;
	private String addColumnPrefix;

	public void setAddTablePrefix(String addTablePrefix) {
		this.addTablePrefix = addTablePrefix;
	}

	public void setAddColumnPrefix(String addColumnPrefix) {
		this.addColumnPrefix = addColumnPrefix;
	}

    public String classToTableName(String className)
    {
    	if (this.addTablePrefix != null) {
    		className = this.addTablePrefix + className;
    	}
        return addUnderscores(StringHelper.unqualify(className));
    }

    public String propertyToColumnName(String propertyName)
    {
    	if (this.addColumnPrefix != null) {
    		propertyName = this.addColumnPrefix + propertyName;
    	}
        return addUnderscores(StringHelper.unqualify(propertyName));
    }

    public String tableName(String tableName)
    {
        return tableName;
    }

    public String columnName(String columnName)
    {
        return columnName;
    }
}

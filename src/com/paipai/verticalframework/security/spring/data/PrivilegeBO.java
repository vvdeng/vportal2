package com.paipai.verticalframework.security.spring.data;

import java.io.Serializable;




/**
 * @author samsonxie
 *
 */
public class PrivilegeBO    implements Serializable
{
    private String systemId;
	private long privilegeId = -1;
	private String privilegeName;

	private long parentId;
	
	private String menuUrl;
	private int pLevel = -1;

	private int viewType = -1; // 1 :left menu; 2:top menu; 3: sub function menu
	
	private String subMenuUrls;
	
	private boolean checked;//??????????????
	
	
	
	public boolean isChecked()
    {
        return checked;
    }
    public void setChecked(boolean checked)
    {
        this.checked = checked;
    }
    public int getViewType()
	{
		return viewType;
	}
	public void setViewType(int viewType)
	{
		this.viewType = viewType;
	}
    public String getSystemId()
    {
        return systemId;
    }
    public void setSystemId(String systemId)
    {
        this.systemId = systemId;
    }
    public long getPrivilegeId()
    {
        return privilegeId;
    }
    public void setPrivilegeId(long privilegeId)
    {
        this.privilegeId = privilegeId;
    }
    public String getPrivilegeName()
    {
        return privilegeName;
    }
    public void setPrivilegeName(String privilegeName)
    {
        this.privilegeName = privilegeName;
    }

    public long getParentId()
    {
        return parentId;
    }
    public void setParentId(long parentId)
    {
        this.parentId = parentId;
    }
    public String getMenuUrl()
    {
        return menuUrl;
    }
    public void setMenuUrl(String menuUrl)
    {
        this.menuUrl = menuUrl;
    }
    public int getPLevel()
    {
        return pLevel;
    }
    public void setPLevel(int level)
    {
        pLevel = level;
    }
    public String getSubMenuUrls()
    {
        return subMenuUrls;
    }
    public void setSubMenuUrls(String subMenuUrls)
    {
        this.subMenuUrls = subMenuUrls;
    }
	
}

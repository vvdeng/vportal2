package com.paipai.verticalframework.web.ajax;

import java.util.ArrayList;
import java.util.List;

public class Object1 {  
    private String name;  
    private String password;  
    private ArrayList l;
    public Object1() {
    	l=new ArrayList();
    	l.add(1);
    	l.add(2);
    	name="ddd";
    	password="abc";
    }  
    public Object1(String name, String password) {  
        super();  
        this.name = name;  
        this.password = password;  
    }  
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
    public String getPassword() {  
        return password;  
    }  
    public void setPassword(String password) {  
        this.password = password;  
    }  
} 
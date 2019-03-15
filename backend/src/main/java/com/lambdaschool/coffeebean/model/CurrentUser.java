package com.lambdaschool.coffeebean.model;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;


public class CurrentUser extends User
{
    private long currentuserid;
    private String customerName;
    List<? extends SimpleGrantedAuthority> authority;

    public CurrentUser(String username, String password, List<? extends SimpleGrantedAuthority> authority, String customerName, long currentuserid)
    {
        super(username, password, authority);
        this.customerName = customerName;
        this.currentuserid = currentuserid;
        this.authority = authority;
    }

    public long getCurrentuserid()
    {
        return currentuserid;
    }

    public void setCurrentuserid(long currentuserid)
    {
        this.currentuserid = currentuserid;
    }

    public String getCustomerName()
    {
        return customerName;
    }

    public void setCustomerName(String customerName)
    {
        this.customerName = customerName;
    }

    public List<? extends SimpleGrantedAuthority> getAuthorities2()
    {
        return authority;
    }

    public void setAuthorities(List<? extends SimpleGrantedAuthority> authority)
    {
        this.authority = authority;
    }
}

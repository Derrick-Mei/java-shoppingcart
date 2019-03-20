package com.lambdaschool.coffeebean.model;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;


public class CurrentUser extends User
{
    private long currentuserid;
    private String customerName, email;
    List<? extends SimpleGrantedAuthority> authority;

    public CurrentUser(String username, String password, List<? extends SimpleGrantedAuthority> authority, String customerName, long currentuserid, String email)
    {
        super(username, password, authority);
        this.customerName = customerName;
        this.currentuserid = currentuserid;
        this.authority = authority;
        this.email = email;
    }

    public long getCurrentuserid()
    {
        return currentuserid;
    }

    public String getCustomerName()
    {
        return customerName;
    }

    public List<? extends SimpleGrantedAuthority> getAuthorities2()
    {
        return authority;
    }

    public String getEmail()
    {
        return email;
    }

}

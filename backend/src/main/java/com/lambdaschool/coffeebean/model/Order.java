package com.lambdaschool.coffeebean.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderid;

    private String shippingaddress;

    private String paymentdetails;

    //yyyy-mm-dd HH:MM:SS
    private Date shipdatetime;

    private boolean shippedstatus = false;

    //*** ManyToOne with user ***
    @ManyToOne
    @JoinColumn(name = "userid")
    @JsonIgnoreProperties({"productsincart", "orderhistory", "totalorderhistory"})
    private User user;

    // *** ManyToMany with product - orderproducts - owner ***
    @ManyToMany
    @JoinTable(name = "orderproducts",
        joinColumns = {@JoinColumn(name = "orderid")},
        inverseJoinColumns = {@JoinColumn(name = "productid")})
    @JsonIgnoreProperties({"potentialusers", "productorders", "productusers", "suppliers"})
    private Set<Product> orderproducts;

    public Order()
    {
    }

    public long getOrderid()
    {
        return orderid;
    }

    public void setOrderid(long orderid)
    {
        this.orderid = orderid;
    }

    public String getShippingaddress()
    {
        return shippingaddress;
    }

    public void setShippingaddress(String shippingaddress)
    {
        this.shippingaddress = shippingaddress;
    }

    public String getPaymentdetails()
    {
        return paymentdetails;
    }

    public void setPaymentdetails(String paymentdetails)
    {
        this.paymentdetails = paymentdetails;
    }

    public boolean isShippedstatus()
    {
        return shippedstatus;
    }

    public void setShippedstatus(boolean shippedstatus)
    {
        this.shippedstatus = shippedstatus;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    public Set<Product> getOrderproducts()
    {
        return orderproducts;
    }

    public void setOrderproducts(Set<Product> orderproducts)
    {
        this.orderproducts = orderproducts;
    }

    public Date getShipdatetime()
    {
        return shipdatetime;
    }

    public void setShipdatetime(Date shipdatetime)
    {
        this.shipdatetime = shipdatetime;
    }
}

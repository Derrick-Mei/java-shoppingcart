package com.lambdaschool.coffeebean.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Entity
public class User
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userid;

//    @Column(unique = true)
    private String username;

    @JsonIgnore
    private String password;

    private String role;

    // ==================================================================

    private String customername;

    private String billingaddress;

    private String shippingaddress;

    private  String customerphone;

//    @Column(unique = true)
    private String email;

    private String paymentmethod;

    // *** OneToMany with Order ***
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonIgnoreProperties("user")
    private Set<Order> orders;

    //*** ManyToMany with Product - cart - owner of table ***
    @ManyToMany
    @JoinTable(name = "cart",
            joinColumns = {@JoinColumn(name = "userid")},
            inverseJoinColumns = {@JoinColumn(name = "productid")})
    @JsonIgnoreProperties("potentialusers")
    private Set<Product> productsincart;


    //*** ManyToMany with Product - totalorderhistory - owner of table ***
    @ManyToMany
    @JoinTable(name = "totalorderhistory",
            joinColumns = {@JoinColumn(name = "userid")},
            inverseJoinColumns = {@JoinColumn(name = "productid")})
    @JsonIgnoreProperties("productusers")
    private Set<Product> totalorderhistory;

    // ================================================================
    public User()
    {
    }

    public long getUserid()
    {
        return userid;
    }

    public void setUserid(long userid)
    {
        this.userid = userid;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public String getRole()
    {
        return role;
    }

    public void setRole(String role)
    {
        this.role = role;
    }

    public List<SimpleGrantedAuthority> getAuthority()
    {
        String myRole = "ROLE_" + this.role.toUpperCase();
        return Arrays.asList(new SimpleGrantedAuthority(myRole));
    }

    // ====================================================================


    public String getCustomername()
    {
        return customername;
    }

    public void setCustomername(String customername)
    {
        this.customername = customername;
    }

    public String getBillingaddress()
    {
        return billingaddress;
    }

    public void setBillingaddress(String billingaddress)
    {
        this.billingaddress = billingaddress;
    }

    public String getShippingaddress()
    {
        return shippingaddress;
    }

    public void setShippingaddress(String shippingaddress)
    {
        this.shippingaddress = shippingaddress;
    }

    public String getCustomerphone()
    {
        return customerphone;
    }

    public void setCustomerphone(String customerphone)
    {
        this.customerphone = customerphone;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getPaymentmethod()
    {
        return paymentmethod;
    }

    public void setPaymentmethod(String paymentmethod)
    {
        this.paymentmethod = paymentmethod;
    }

    public Set<Order> getOrders()
    {
        return orders;
    }

    public void setOrders(Set<Order> orders)
    {
        this.orders = orders;
    }

    public Set<Product> getProductsincart()
    {
        return productsincart;
    }

    public void setProductsincart(Set<Product> productsincart)
    {
        this.productsincart = productsincart;
    }

    public Set<Product> getTotalorderhistory()
    {
        return totalorderhistory;
    }

    public void setTotalorderhistory(Set<Product> totalorderhistory)
    {
        this.totalorderhistory = totalorderhistory;
    }

}
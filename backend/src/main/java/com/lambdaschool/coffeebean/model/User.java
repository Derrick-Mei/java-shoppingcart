package com.lambdaschool.coffeebean.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Entity
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userid;

    @Column(length = 250, unique = true)
    private String username;

    //    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    // set default privilege to be user
    private String role = "user";

    private String rawPassword;

    // ==================================================================

    //    @JsonIgnore
    private String customername;

    //    @JsonIgnore
    private String billingaddress;

    //    @JsonIgnore
    private String shippingaddress;

    //    @JsonIgnore
    private String customerphone;

    //    @JsonIgnore
    @Column(length = 250, unique = true)
    private String email;

    //    @JsonIgnore
    private String paymentmethod;

    // Used for SendGrid
    private boolean receiveEmails = false;

    // *** OneToMany with Order ***
//    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonIgnoreProperties({"user", "orderproducts"})
    private Set<Order> orderhistory;

    //*** ManyToMany with Product - cart - owner of table ***
//    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "cart",
            joinColumns = {@JoinColumn(name = "userid")},
            inverseJoinColumns = {@JoinColumn(name = "productid")})
    @JsonIgnoreProperties({"potentialusers", "productorders", "productusers", "suppliers"})
    private Set<Product> productsincart;


    //*** ManyToMany with Product - totalorderhistory - owner of table ***
//    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "totalorderhistory",
            joinColumns = {@JoinColumn(name = "userid")},
            inverseJoinColumns = {@JoinColumn(name = "productid")})
    @JsonIgnoreProperties({"potentialusers", "productorders", "productusers", "suppliers"})
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
//        this.password = password;
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(password);

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
        return Collections.singletonList(new SimpleGrantedAuthority(myRole));
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

    public Set<Order> getOrderhistory()
    {
        return orderhistory;
    }

    public void setOrderhistory(Set<Order> orderhistory)
    {
        this.orderhistory = orderhistory;
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

    // for changing password
    public String getRawPassword()
    {
        return rawPassword;
    }

    public void setRawPassword(String rawPassword)
    {
        this.rawPassword = rawPassword;
    }

    //For SendGrid

    public boolean isReceiveEmails()
    {
        return receiveEmails;
    }

    public void setReceiveEmails(boolean receiveEmails)
    {
        this.receiveEmails = receiveEmails;
    }
}
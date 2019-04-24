//package com.lambdaschool.coffeebean.model;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//
//import javax.persistence.*;
//import java.util.Set;
//
//@Entity
//@Table(name = "customers")
//public class Customer
//{
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long customerid;
//
//    private String customername;
//
//    private String billingaddress;
//
//    private String shippingaddress;
//
//    private  String customerphone;
//
//    @Column(unique = true)
//    private String email;
//
//    private String paymentmethod;
//
//    // *** OneToMany with Order ***
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
//    @JsonIgnoreProperties("customer")
//    private Set<Order> orders;
//
//    //*** ManyToMany with Product - cart - owner of table ***
//    @ManyToMany
//    @JoinTable(name = "cart",
//        joinColumns = {@JoinColumn(name = "customerid")},
//        inverseJoinColumns = {@JoinColumn(name = "productid")})
//    @JsonIgnoreProperties("potentialcustomers")
//    private Set<Product> productsincart;
//
//
//    //*** ManyToMany with Product - orderhistory - owner of table ***
//    @ManyToMany
//    @JoinTable(name = "orderhistory",
//            joinColumns = {@JoinColumn(name = "customerid")},
//            inverseJoinColumns = {@JoinColumn(name = "productid")})
//    @JsonIgnoreProperties("productcustomers")
//    private Set<Product> orderhistory;
//
//    public Customer()
//    {
//    }
//
//    public long getCustomerid()
//    {
//        return customerid;
//    }
//
//    public void setCustomerid(long customerid)
//    {
//        this.customerid = customerid;
//    }
//
//    public String getCustomername()
//    {
//        return customername;
//    }
//
//    public void setCustomername(String customername)
//    {
//        this.customername = customername;
//    }
//
//    public String getBillingaddress()
//    {
//        return billingaddress;
//    }
//
//    public void setBillingaddress(String billingaddress)
//    {
//        this.billingaddress = billingaddress;
//    }
//
//    public String getShippingaddress()
//    {
//        return shippingaddress;
//    }
//
//    public void setShippingaddress(String shippingaddress)
//    {
//        this.shippingaddress = shippingaddress;
//    }
//
//    public String getCustomerphone()
//    {
//        return customerphone;
//    }
//
//    public void setCustomerphone(String customerphone)
//    {
//        this.customerphone = customerphone;
//    }
//
//    public String getEmail()
//    {
//        return email;
//    }
//
//    public void setEmail(String email)
//    {
//        this.email = email;
//    }
//
//    public String getPaymentmethod()
//    {
//        return paymentmethod;
//    }
//
//    public void setPaymentmethod(String paymentmethod)
//    {
//        this.paymentmethod = paymentmethod;
//    }
//
//    public Set<Order> getOrders()
//    {
//        return orders;
//    }
//
//    public void setOrders(Set<Order> orders)
//    {
//        this.orders = orders;
//    }
//
//    public Set<Product> getProductsincart()
//    {
//        return productsincart;
//    }
//
//    public void setProductsincart(Set<Product> productsincart)
//    {
//        this.productsincart = productsincart;
//    }
//
//    public Set<Product> getOrderhistory()
//    {
//        return orderhistory;
//    }
//
//    public void setOrderhistory(Set<Product> orderhistory)
//    {
//        this.orderhistory = orderhistory;
//    }
//}

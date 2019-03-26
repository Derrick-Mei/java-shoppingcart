package com.lambdaschool.coffeebean.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "suppliers")
public class Supplier
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long supplierid;

    private String suppliername;

    private String supplierphone;

    // *** ManyToMany with product - supplierproduct - owner ***
    @ManyToMany
    @JoinTable(name = "supplierproduct",
            joinColumns = {@JoinColumn(name = "supplierid")},
            inverseJoinColumns = {@JoinColumn(name = "productid")})
    @JsonIgnoreProperties({"potentialusers", "productorders", "productusers", "suppliers"})
    private Set<Product> productsfromsupplier;

    public Supplier()
    {
    }

    public long getSupplierid()
    {
        return supplierid;
    }

    public void setSupplierid(long supplierid)
    {
        this.supplierid = supplierid;
    }

    public String getSuppliername()
    {
        return suppliername;
    }

    public void setSuppliername(String suppliername)
    {
        this.suppliername = suppliername;
    }

    public String getSupplierphone()
    {
        return supplierphone;
    }

    public void setSupplierphone(String supplierphone)
    {
        this.supplierphone = supplierphone;
    }

    public Set<Product> getProductsfromsupplier()
    {
        return productsfromsupplier;
    }

    public void setProductsfromsupplier(Set<Product> productsfromsupplier)
    {
        this.productsfromsupplier = productsfromsupplier;
    }
}

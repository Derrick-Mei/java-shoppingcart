package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.Product;
import com.lambdaschool.coffeebean.repository.Productrepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Api(value = "Some value... by DKM", description = "Product Controller by DKM")
@RestController
@RequestMapping(path = "/products", produces = MediaType.APPLICATION_JSON_VALUE)
public class Productcontroller
{
    @Autowired
    Productrepository productrepos;

    @ApiOperation(value = "find all orders - DKM", response = Product.class)
    @GetMapping("")
    public List<Product> findAllOrders()
    {
        return productrepos.findAll();
    }

    @GetMapping("/{productid}")
    public Product findProductByProductId(@PathVariable long productid)
    {
        return productrepos.findById(productid).get();
    }

    @PostMapping("")
    public Product addToProducts(@RequestBody Product newProduct)
    {
        return productrepos.save(newProduct);
    }

    @PutMapping("/{productid}")
    public Object modifyProductById(@RequestBody Product updatedProduct, @PathVariable long productid)
    {
        Optional<Product> foundProduct = productrepos.findById(productid);
        if (foundProduct.isPresent())
        {
            if (updatedProduct.getPotentialusers() == null) updatedProduct.setPotentialusers(foundProduct.get().getPotentialusers());
            if (updatedProduct.getProductorders() == null) updatedProduct.setProductorders(foundProduct.get().getProductorders());
            if (updatedProduct.getProductusers() == null) updatedProduct.setProductusers(foundProduct.get().getProductusers());
            if (updatedProduct.getProductname() == null) updatedProduct.setProductname(foundProduct.get().getProductname());
            if (updatedProduct.getDescription() == null) updatedProduct.setDescription(foundProduct.get().getDescription());
            if (updatedProduct.getExpiration() == null) updatedProduct.setExpiration(foundProduct.get().getExpiration());
            if (updatedProduct.getSuppliers() == null) updatedProduct.setSuppliers(foundProduct.get().getSuppliers());
            if (updatedProduct.getQuantity() == null) updatedProduct.setQuantity(foundProduct.get().getQuantity());
            if (updatedProduct.getImage() == null) updatedProduct.setImage(foundProduct.get().getImage());
            if (updatedProduct.getPrice() == null) updatedProduct.setPrice(foundProduct.get().getPrice());

            updatedProduct.setProductid(productid);
            return productrepos.save(updatedProduct);
        }
        else
        {
            return "Product with id: " + productid + " could not be found.";
        }
    }

    @DeleteMapping("/{productid}")
    public Object deleteProductById(@PathVariable long productid)
    {
        Optional<Product> foundProduct = productrepos.findById(productid);
        if (foundProduct.isPresent())
        {
            productrepos.deleteById(productid);
            return foundProduct.get();
        }
        else
        {
            return "Product with id: " + productid + " could not be found.";
        }
    }

}
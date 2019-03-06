package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.Product;
import com.lambdaschool.coffeebean.repository.Productrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/products", produces = MediaType.APPLICATION_JSON_VALUE)
public class Productcontroller
{
    @Autowired
    Productrepository productrepos;

    @GetMapping("")
    public List<Product> findAllOrders()
    {
        return productrepos.findAll();
    }
}
package com.lambdaschool.coffeebean.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.lambdaschool.coffeebean.model.Product;
import com.lambdaschool.coffeebean.repository.Productrepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Api(value = "Some value... by DKM", description = "Shop Controller by DKM")
@RestController
@RequestMapping(path = "/shop", produces = MediaType.APPLICATION_JSON_VALUE)
public class Shopcontroller
{
    @Autowired
    Productrepository productrepos;

    @JsonView(View.UserOnly.class)
    @ApiOperation(value = "find all products - DKM", response = Product.class)
    @GetMapping("")
    public List<Product> getAllProducts()
    {
        return productrepos.findAll();
    }

    @JsonView(View.UserOnly.class)
    @GetMapping("/{page}")
    public List<Product> get10Products(@PathVariable int page)
    {
        int start = (page - 1) * 10;
        return productrepos.get10Products(start);
    }

    @JsonView(View.UserOnly.class)
    @GetMapping("/naturalsearch/{searchString}/page/{page}")
    public List<Product> naturalSearchForProductByName(@PathVariable String searchString, @PathVariable int page)
    {
        int start = (page - 1) * 10;
        return productrepos.naturalSearchForProductByName(searchString, start);
    }


    @JsonView(View.UserOnly.class)
    @GetMapping("/criteria/{searchString}/page/{page}")
    public List<Product> dynamicQueryWithStringsLike(@PathVariable String searchString, @PathVariable int page)
    {
        String[] searchArray = searchString.split(" ");
        Set<String> searchSet = new HashSet<>(Arrays.asList(searchArray));

        int start = (page - 1) * 10;

        return productrepos.dynamicQueryWithStringsLike(searchSet, start);
    }
}

package com.lambdaschool.coffeebean.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.lambdaschool.coffeebean.model.Product;
import com.lambdaschool.coffeebean.repository.Productrepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "Some value... by DKM", description = "Shop Controller by DKM")
@RestController
@RequestMapping(path = "/shop", produces = MediaType.APPLICATION_JSON_VALUE)
public class Shopcontroller
{
    @Autowired
    Productrepository productrepos;

    @JsonView(View.UserOnly.class)
    @ApiOperation(value = "find all products - DKM", response = Product.class)
    @ApiResponses(value =
            {
                    @ApiResponse(code = 200, message = "Successfully received customer - DKM"),
                    @ApiResponse(code = 401, message = "You are not authorized to the view the resource - DKM"),
                    @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden - DKM"),
                    @ApiResponse(code = 404, message = "The resource you were trying to reach is not found - DKM")
            })
    @GetMapping("")
    public List<Product> getAllProducts()
    {
        return productrepos.findAll();
    }

    @JsonView(View.UserOnly.class)
    @GetMapping("/{page}")
    public List<Product> get10Products(@PathVariable int page)
    {
        int start = (page -1) * 10;
        return productrepos.get10Products(start);
    }

    @JsonView(View.UserOnly.class)
    @GetMapping("/naturalsearch/{searchString}/page/{page}")
    public List<Product> naturalSearchForProductByName(@PathVariable String searchString, @PathVariable int page)
    {
        int start = (page -1) * 10;
        return productrepos.naturalSearchForProductByName(searchString, start);
    }

    @JsonView(View.UserOnly.class)
    @GetMapping("/likesearch/{searchString}/page/{page}")
    public List<Product> likeSearchForProductByName(@PathVariable String searchString, @PathVariable int page)
    {
        int start = (page -1) * 10;
        String[] searchArray = searchString.split(" ");

        String likeString = "`%" + searchArray[0] + "%`";

        for (int i = 1; i < searchArray.length; i++)
        {
            likeString += " OR p.productname LIKE `%" + searchArray[i] + "%`";
        }

        searchString = "%" + searchString + "%";


        return productrepos.likeSearchForProductByName(searchString, start);
    }


}

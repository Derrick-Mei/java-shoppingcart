package com.lambdaschool.coffeebean.repository;

import com.lambdaschool.coffeebean.CriteriaAPIProducts.ProductrepositoryCustom;
import com.lambdaschool.coffeebean.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface Productrepository extends JpaRepository<Product, Long>, ProductrepositoryCustom
{
    @Query(value = "SELECT * FROM products LIMIT :start, 10", nativeQuery = true)
    public List<Product> get10Products(int start);


    @Query(value = "SELECT * FROM products WHERE MATCH(productname) AGAINST(:searchString) LIMIT :start, 10;", nativeQuery = true)
    public List<Product> naturalSearchForProductByName(@PathVariable String searchString, @PathVariable int start);


    @Query(value = "SELECT * FROM products p WHERE p.productname :searchString LIMIT :start, 10;", nativeQuery = true)
    public List<Product> likeSearchForProductByName(@PathVariable String searchString, @PathVariable int start);



}

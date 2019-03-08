package com.lambdaschool.coffeebean.repository;

import com.lambdaschool.coffeebean.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Productrepository extends JpaRepository<Product, Long>
{
    @Query(value = "SELECT * FROM products LIMIT :start, 10",nativeQuery = true)
    public List<Product> get10Products(int start);
}

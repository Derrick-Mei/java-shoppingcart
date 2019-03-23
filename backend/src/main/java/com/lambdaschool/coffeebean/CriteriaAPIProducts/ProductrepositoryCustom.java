package com.lambdaschool.coffeebean.CriteriaAPIProducts;

import com.lambdaschool.coffeebean.model.Product;

import java.util.List;
import java.util.Set;

public interface ProductrepositoryCustom
{
    List<Product> findProductsByStringsLike(Set<String> searchArray);
}

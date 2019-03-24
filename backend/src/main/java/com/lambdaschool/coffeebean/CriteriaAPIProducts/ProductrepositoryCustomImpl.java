package com.lambdaschool.coffeebean.CriteriaAPIProducts;

import com.lambdaschool.coffeebean.model.Product;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class ProductrepositoryCustomImpl implements ProductrepositoryCustom
{
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Product> dynamicQueryWithStringsLike(Set<String> searchSet, int start)
    {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> query = cb.createQuery(Product.class);
        Root<Product> product = query.from(Product.class);

        Path<String> productPath = product.get("productname");

        List<Predicate> predicates = new ArrayList<>();
        for (String word : searchSet )
        {
            word = "%" + word + "%";
            predicates.add(cb.like(productPath, word));
        }

        query.select(product)
                .where(cb.and(predicates.toArray(new Predicate[predicates.size()])));

        return entityManager.createQuery(query)
                .setFirstResult(start)
                .setMaxResults(10)
                .getResultList();
    }
}

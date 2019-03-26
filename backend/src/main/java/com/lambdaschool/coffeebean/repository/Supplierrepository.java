package com.lambdaschool.coffeebean.repository;

import com.lambdaschool.coffeebean.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface Supplierrepository extends JpaRepository<Supplier, Long>
{
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO supplierproduct (supplierid, productid) VALUES (:supplierid, :productid)", nativeQuery = true)
    public void addSupplierToProduct(long supplierid, long productid);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM supplierproduct WHERE supplierid=:supplierid AND productid=:productid", nativeQuery = true)
    public void deleteSupplierFromProduct(long supplierid, long productid);
}

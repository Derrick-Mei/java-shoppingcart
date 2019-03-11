package com.lambdaschool.coffeebean.repository;

import com.lambdaschool.coffeebean.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface Orderrepository extends JpaRepository<Order, Long>
{
    @Query(value = "SELECT * FROM orders WHERE shippedstatus = 0", nativeQuery = true)
    public List<Order> findUnshippedOrders();

    @Query(value = "SELECT * FROM orders WHERE shippedstatus = 1", nativeQuery = true)
    public List<Order> findShippedOrders();

    @Transactional
    @Modifying
    @Query(value = "UPDATE orders SET shipdatetime = NULL WHERE (orderid = :orderid)", nativeQuery = true)
    public void setShipDateToNull(long orderid);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO orderproducts (orderid, productid, quantityinorder) VALUES (:orderid, :productid, :quantity);", nativeQuery = true)
    void addToOrderProducts(long orderid, long productid, int quantity);
}

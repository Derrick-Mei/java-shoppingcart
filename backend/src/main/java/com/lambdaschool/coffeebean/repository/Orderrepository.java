package com.lambdaschool.coffeebean.repository;

import com.lambdaschool.coffeebean.model.Order;
import com.lambdaschool.coffeebean.model.OrderItem;
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

    @Query(value =
            "SELECT op.orderid, p.productname, p.description, p.image, p.price, op.quantityinorder, p.productid, o.orderdatetime " +
            "FROM orderproducts op INNER JOIN products p ON op.productid=p.productid INNER JOIN orders o ON o.orderid=op.orderid " +
                    "WHERE op.orderid=:orderid", nativeQuery = true)
    List<OrderItem> getOrderItemsByOrderid(long orderid);

    @Query(value =
            "SELECT op.orderid, p.productname, p.description, p.image, p.price, op.quantityinorder, p.productid, o.orderdatetime " +
                    "FROM orderproducts op " +
                    "INNER JOIN products p ON op.productid=p.productid " +
                    "INNER JOIN orders o ON o.orderid=op.orderid " +
                    "WHERE o.userid=:userid", nativeQuery = true)
    List<OrderItem> getOrderItemsByUserid(long userid);
}

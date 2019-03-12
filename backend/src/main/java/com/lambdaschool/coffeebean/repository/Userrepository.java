package com.lambdaschool.coffeebean.repository;

import com.lambdaschool.coffeebean.model.CartItems;
import com.lambdaschool.coffeebean.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface Userrepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findByEmail(String email);

    @Query(value = "SELECT * FROM cart WHERE userid = :userid", nativeQuery = true)
    List<Object> getItemsInCartById(long userid);

    @Query(value = "SELECT p.productid, p.productname, p.description, p.image, p.price, c.quantityincart FROM cart c INNER JOIN products p ON c.productid=p.productid WHERE c.userid=:userid", nativeQuery = true)
    List<CartItems> getCartItemsInCartById(long userid);

//    @Query(value = "SELECT p.productid, p.productname, p.description, p.image, p.price, c.quantityincart FROM cart c INNER JOIN products p ON c.productid=p.productid INNER JOIN user u ON c.userid=u.userid WHERE u.username=:username;", nativeQuery = true)
//    List<CartItems> getCartItemsInCartByUsername(String username);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO cart (userid, productid, quantityincart) VALUES (:userid, :productid, :quantity)", nativeQuery = true)
    void postItemToCart(long userid, long productid, int quantity);

    @Query(value = "SELECT p.productid, p.productname, p.description, p.image, p.price, c.quantityincart FROM cart c INNER JOIN products p ON c.productid=p.productid WHERE c.userid=:userid AND c.productid=:productid", nativeQuery = true)
    public CartItems searchCart(long userid, long productid);

    @Transactional
    @Modifying
    @Query(value = "UPDATE cart SET quantityincart = :quantity WHERE (userid = :userid) and (productid = :productid);", nativeQuery = true)
    void  modifyQuantityInCart(long userid, long productid, int quantity);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM cart WHERE userid=:userid AND productid=:productid", nativeQuery = true)
    void deleteOneItemFromCart(long userid, long productid);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM cart WHERE userid=:userid", nativeQuery = true)
    void deleteAllItemsFromCart(long userid);
}

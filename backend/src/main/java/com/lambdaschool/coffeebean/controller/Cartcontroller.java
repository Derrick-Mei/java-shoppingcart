package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.CartItems;
import com.lambdaschool.coffeebean.model.Order;
import com.lambdaschool.coffeebean.model.User;
import com.lambdaschool.coffeebean.repository.Orderrepository;
import com.lambdaschool.coffeebean.repository.Userrepository;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@Api(value = "Some value... by DKM", description = "Cart Controller by DKM")
@RestController
@RequestMapping(path = "/cart", produces = MediaType.APPLICATION_JSON_VALUE)
public class Cartcontroller
{
    @Autowired
    Userrepository userrepos;

    @Autowired
    Orderrepository orderrepos;


    @GetMapping("/user/{userid}")
    public User findUserByUserid(@PathVariable long userid)
    {
        return userrepos.findById(userid).get();
    }

    @GetMapping("/user/username/{username}")
    public User findUserByUsername(@PathVariable String username)
    {
        return userrepos.findByUsername(username);
    }

    // ==================== CART ==============================

    // deprecated as it only returns id's and not actual objects
//    @GetMapping("/{userid}/cart/deprecated")
//    public List<Object> getItemsInCart(@PathVariable long userid)
//    {
//        return userrepos.getItemsInCartById(userid);
//    }

    @GetMapping("/{userid}")
    public List<CartItems> getCartItemsInCartById(@PathVariable long userid)
    {
        return userrepos.getCartItemsInCartById(userid);
    }

    @PostMapping("/addtocart/{userid}/{productid}/{quantity}")
    public String postItemToCart(@PathVariable long userid, @PathVariable long productid, @PathVariable int quantity)
    {
//        userrepos.postItemToCart(userid, productid, quantity);
//        return "You have added " + quantity + " of " + productid + " to " + userid + "'s cart";
        CartItems foundCartItems = userrepos.searchCart(userid, productid);
        if (foundCartItems == null )
        {
            userrepos.postItemToCart(userid, productid, quantity);
            return "You have added " + quantity + "quantity of " + productid + " to " + userid + "'s cart";
        }
        else
        {
            int previousQuantity = foundCartItems.getQuantityincart();
            int total = previousQuantity + quantity;
            userrepos.modifyQuantityInCart(userid, productid, quantity+previousQuantity);
            return "You have added " + quantity + " quantity of " + productid + " to " + userid + "'s cart. " +
                    "There are now " + total + " of " + productid +  " in " + userid + "'s cart.";
        }
    }

    @PutMapping("/modifyquantityincart/{userid}/{productid}/{quantity}")
    public String modifyQuantityInCart(@PathVariable long userid,
                                       @PathVariable long productid,
                                       @PathVariable int quantity) {
        if (userrepos.searchCart(userid, productid) == null )
        {
            userrepos.postItemToCart(userid, productid, quantity);
            return "You have added " + quantity + " of " + productid + " to " + userid + "'s cart";
        }
        else
        {
            userrepos.modifyQuantityInCart(userid, productid, quantity);
            return "There are now " + quantity + " of " + productid +  " in " + userid + "'s cart.";
        }
    }

    @DeleteMapping("/remove/{userid}/{productid}")
    public String deleteOneItemFromCart(@PathVariable long userid, @PathVariable long productid)
    {
        userrepos.deleteOneItemFromCart(userid, productid);
        return "You have deleted " + productid + " from " + userid;
    }

    @DeleteMapping("/deleteall/{userid}")
    public String deleteAllItemsFromCart(@PathVariable long userid)
    {
        userrepos.deleteAllItemsFromCart(userid);
        return "You have deleted all items in cart from user " + userid;
    }

    // ============ Add To Order ================

    @PostMapping("/buy/{userid}")
    public Order buyItemsInCart(@RequestBody Order newOrder, @PathVariable long userid) {
        userrepos.deleteAllItemsFromCart(userid);

        return orderrepos.save(newOrder);
    }
}

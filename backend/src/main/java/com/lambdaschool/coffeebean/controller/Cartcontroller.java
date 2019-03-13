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

//    @PreAuthorize("#c = Object thing")
    @GetMapping("/user/{userid}")
    public User findUserByUserid(@PathVariable long userid)
    {
        return userrepos.findById(userid).get();

//        Object id = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        if (!id.equals(userid))
//        {
//            return id;
////        return userrepos.findById(userid).get();
//
//        }
//        else return null;
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



//    @GetMapping("/cartbyusername/{username}")
//    public List<CartItems> getCartItemsInCartByUsername(@PathVariable String username)
//    {
//        return userrepos.getCartItemsInCartByUsername(username);
//    }



    @PostMapping("/addtocart/{userid}/{productid}/{quantity}")
    public String postItemToCart(@PathVariable long userid, @PathVariable long productid, @PathVariable int quantity)
    {
        CartItems foundCartItems = userrepos.searchCart(userid, productid);
        if (foundCartItems != null )
        {
            int previousQuantity = foundCartItems.getQuantityincart();
            int total = previousQuantity + quantity;
            userrepos.modifyQuantityInCart(userid, productid, total);
            return "You have added  " + quantity + "  quantity of " + productid + " to " + userid + "'s cart. " +
                    "There are now " + total + " of " + foundCartItems.getProductname() +  " in " + userid + "'s cart.";
        }
        else
        {
            userrepos.postItemToCart(userid, productid, quantity);
            return "You have added " + quantity + "quantity of " + productid + " to " + userid + "'s cart";
        }
    }

    @PutMapping("/modifyquantityincart/{userid}/{productid}/{quantity}")
    public String modifyQuantityInCart(@PathVariable long userid,
                                       @PathVariable long productid,
                                       @PathVariable int quantity) {
        CartItems foundCartItems = userrepos.searchCart(userid, productid);
        if (foundCartItems != null )
        {
            int previousQuantity = foundCartItems.getQuantityincart();
            userrepos.modifyQuantityInCart(userid, productid, quantity);
            return "There were " + previousQuantity + ", but now there are " + quantity + " of " + foundCartItems.getProductname() +  " in " + userid + "'s cart.";
        }
        else
        {
            return userid + " does not have productid: " + productid + "in their cart.";
        }
    }

    @DeleteMapping("/remove/{userid}/{productid}")
    public String deleteOneItemFromCart(@PathVariable long userid, @PathVariable long productid)
    {
        userrepos.deleteOneItemFromCart(userid, productid);
        return "You have deleted " + productid + " from " + userid;
    }

    @DeleteMapping("/modifytozero/{userid}/{productid}")
    public String modifyToZero(@PathVariable long userid, @PathVariable long productid)
    {
        userrepos.modifyQuantityInCart(userid, productid, 0);
        return "There are now 0 of " + productid +  " in " + userid + "'s cart.";
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

        List<CartItems> currentCart = userrepos.getCartItemsInCartById(userid);

        userrepos.deleteAllItemsFromCart(userid);

        Order currentOrder = orderrepos.save(newOrder);

        long currentOrderId = currentOrder.getOrderid();

        currentCart.forEach( item -> {
            orderrepos.addToOrderProducts(currentOrderId, item.getProductid(), item.getQuantityincart());
        });

        return currentOrder;
    }
}

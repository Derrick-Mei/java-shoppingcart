package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.CartItems;
import com.lambdaschool.coffeebean.model.CurrentUser;
import com.lambdaschool.coffeebean.model.Order;
import com.lambdaschool.coffeebean.repository.Orderrepository;
import com.lambdaschool.coffeebean.repository.Productrepository;
import com.lambdaschool.coffeebean.repository.Userrepository;
import com.lambdaschool.coffeebean.service.CheckIsAdmin;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin
@Api(value = "Some value... by DKM", description = "Cart Controller by DKM")
@RestController
@RequestMapping(path = "/cart", produces = MediaType.APPLICATION_JSON_VALUE)
public class Cartcontroller extends CheckIsAdmin
{
    @Autowired
    Userrepository userrepos;

    @Autowired
    Orderrepository orderrepos;

    @Autowired
    Productrepository productrepos;

    // ==================== CART ==============================

    @GetMapping("/{userid}")
    public Object getCartItemsInCartById(@PathVariable long userid)
    {
        CurrentUser currentuser = (CurrentUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long currentUserId = currentuser.getCurrentuserid();

        boolean isAdmin = testIsAdmin(currentuser);

        if (currentUserId == userid || isAdmin)
        {
            return userrepos.getCartItemsInCartById(userid);

        } else
        {
            return doesUsernameMatch(currentUserId, userid, false);
        }
    }


    @PostMapping("/addtocart/{userid}/{productid}/{quantity}")
    public HashMap<String, Object> postItemToCart(@PathVariable long userid, @PathVariable long productid, @PathVariable int quantity)
    {
        CurrentUser currentuser = (CurrentUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long currentUserId = currentuser.getCurrentuserid();

        boolean isAdmin = testIsAdmin(currentuser);
        HashMap<String, Object> returnObject = new HashMap<>();

        if (currentUserId == userid || isAdmin)
        {
            CartItems foundCartItems = userrepos.searchCart(userid, productid);
            if (foundCartItems != null)
            {
                int previousQuantity = foundCartItems.getQuantityincart();
                int total = previousQuantity + quantity;
                userrepos.modifyQuantityInCart(userid, productid, total);

                returnObject.put("userId", userid);
                returnObject.put("previouslyExisted", true);
                returnObject.put("productName", foundCartItems.getProductname());
                returnObject.put("previousQuantity", previousQuantity);
                returnObject.put("quantityToBeAdded", quantity);
                returnObject.put("totalQuantity", total);
            } else
            {
                userrepos.postItemToCart(userid, productid, quantity);
                returnObject.put("userId", userid);
                returnObject.put("prevouslyExisted", false);
                returnObject.put("quantityToBeAdded", quantity);
            }
            return returnObject;
        } else
        {
            return doesUsernameMatch(currentUserId, userid, false);
        }
    }

    @PutMapping("/modifyquantityincart/{userid}/{productid}/{quantity}")
    public Object modifyQuantityInCart(@PathVariable long userid,
                                       @PathVariable long productid,
                                       @PathVariable int quantity)
    {
        CurrentUser currentuser = (CurrentUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long currentUserId = currentuser.getCurrentuserid();

        boolean isAdmin = testIsAdmin(currentuser);

        if (currentUserId == userid || isAdmin)
        {
            CartItems foundCartItems = userrepos.searchCart(userid, productid);
            if (foundCartItems != null)
            {
                int previousQuantity = foundCartItems.getQuantityincart();
                userrepos.modifyQuantityInCart(userid, productid, quantity);
                return "There were " + previousQuantity + ", but now there are " + quantity + " of " + foundCartItems.getProductname() + " in " + userid + "'s cart.";
            } else
            {
                return userid + " does not have productid: " + productid + "in their cart.";
            }

        } else
        {
            return doesUsernameMatch(currentUserId, userid, false);
        }

    }

    @DeleteMapping("/remove/{userid}/{productid}")
    public Object deleteOneItemFromCart(@PathVariable long userid, @PathVariable long productid)
    {
        CurrentUser currentuser = (CurrentUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long currentUserId = currentuser.getCurrentuserid();

        boolean isAdmin = testIsAdmin(currentuser);

        if (currentUserId == userid || isAdmin)
        {
            userrepos.deleteOneItemFromCart(userid, productid);
            return "You have deleted product: " + productid + " from user: " + userid;

        } else
        {
            return doesUsernameMatch(currentUserId, userid, false);
        }

    }

    @DeleteMapping("/modifytozero/{userid}/{productid}")
    public Object modifyToZero(@PathVariable long userid, @PathVariable long productid)
    {
        CurrentUser currentuser = (CurrentUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long currentUserId = currentuser.getCurrentuserid();

        boolean isAdmin = testIsAdmin(currentuser);

        if (currentUserId == userid || isAdmin)
        {
            userrepos.modifyQuantityInCart(userid, productid, 0);
            return "There are now 0 of " + productid + " in " + userid + "'s cart.";

        } else
        {
            return doesUsernameMatch(currentUserId, userid, false);
        }


    }

    @DeleteMapping("/deleteall/{userid}")
    public Object deleteAllItemsFromCart(@PathVariable long userid)
    {
        CurrentUser currentuser = (CurrentUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long currentUserId = currentuser.getCurrentuserid();

        boolean isAdmin = testIsAdmin(currentuser);

        if (currentUserId == userid || isAdmin)
        {
            userrepos.deleteAllItemsFromCart(userid);
            return "You have deleted all items in cart from user " + userid;

        } else
        {
            return doesUsernameMatch(currentUserId, userid, false);
        }


    }

    // ============ BUY ================

    // 1. get CurrentUserId from getPrincipal()
    // 2. delete items from cart'
    // 3. save order with the limited data
    // 4. return actual order from database with correct information
    @PostMapping("/buy")
    public Order buyItemsInCart(@RequestBody Order newOrder)
    {
        CurrentUser currentuser = (CurrentUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long currentUserId = currentuser.getCurrentuserid();

        List<CartItems> currentCart = userrepos.getCartItemsInCartById(currentUserId);

        userrepos.deleteAllItemsFromCart(currentUserId);

        newOrder.setUser(userrepos.findById(currentUserId).get());

        Order currentOrder = orderrepos.save(newOrder);

        long currentOrderId = currentOrder.getOrderid();

        currentCart.forEach(item ->
        {
            orderrepos.addToOrderProducts(currentOrderId, item.getProductid(), item.getQuantityincart());
            productrepos.removeOrderedQtyFromInventory(item.getProductid(), item.getQuantityincart());
        });

        return orderrepos.findById(currentOrderId).get();
    }

}

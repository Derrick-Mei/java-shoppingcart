package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.CartItems;
import com.lambdaschool.coffeebean.model.User;
import com.lambdaschool.coffeebean.repository.Userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin({"http://localhost:2019", "http://localhost:7777"})
@RestController
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class Usercontroller
{

    @Autowired
    // private UserService userService;
    private Userrepository userrepos;

    @GetMapping("")
    public List<User> listAllUsers()
    {
        return userrepos.findAll();
    }

    @PostMapping("/addadmin")
    public Object addNewUser(@RequestBody User newuser) throws URISyntaxException
    {
        String email = newuser.getEmail();

        if (userrepos.findByUsername(newuser.getUsername()) != null)
        {
            if (email != null && userrepos.findByEmail(email) != null)
            {
                return "{ username unique constraint : " + newuser.getUsername() + " already exists,\nemail unique constraint : " + newuser.getEmail() + " already exists }";
            }
            return "{username unique constraint : " + newuser.getUsername() + " already exists}";
        }
        else if (email != null && userrepos.findByEmail(email) != null)
        {
            return "{ email unique constraint : " + newuser.getEmail() + " already exists }";
        }
        else
        {
            // set role to user for security concern.  Just in case a new user wants to set their own role to admin.
            newuser.setRole("admin");
            return userrepos.save(newuser);
        }
    }

    @DeleteMapping("/{id}")
    public String deleteUserById(@PathVariable long id)
    {
        var foundUser = userrepos.findById(id);
        if (foundUser.isPresent())
        {
            userrepos.deleteById(id);

            return "{" + "\"userid\":"   + foundUser.get().getUserid() +
                    ",\"usename\":" + "\"" + foundUser.get().getUsername() + "\"" +
                    ",\"role\":" + foundUser.get().getAuthority() + "}";
        }
        else
        {
            return null;
        }
    }

    // ==================== CART ==============================

    // deprecated as it only returns id's and not actual objects
//    @GetMapping("/{userid}/cart/deprecated")
//    public List<Object> getItemsInCart(@PathVariable long userid)
//    {
//        return userrepos.getItemsInCartById(userid);
//    }

    @GetMapping("/{userid}/cart")
    public List<CartItems> getCartItemsInCartById(@PathVariable long userid)
    {
        return userrepos.getCartItemsInCartById(userid);
    }

    @PostMapping("/addtocart/{userid}/{productid}/{quantity}")
    public String postItemToCart(@PathVariable long userid, @PathVariable long productid, @PathVariable int quantity)
    {
        userrepos.postItemToCart(userid, productid, quantity);
        return "You have added " + productid + " to " + userid;
    }

    @DeleteMapping("/cart/remove/{userid}/{productid}")
    public String deleteOneItemFromCart(@PathVariable long userid, @PathVariable long productid)
    {
        userrepos.deleteOneItemFromCart(userid, productid);
        return "You have deleted " + productid + " from " + userid;
    }

    @DeleteMapping("/cart/deleteall/{userid}")
    public String deleteAllItemsFromCart(@PathVariable long userid)
    {
        userrepos.deleteAllItemsFromCart(userid);
        return "You have deleted all items in cart from user " + userid;
    }

}
package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.CurrentUser;
import com.lambdaschool.coffeebean.model.OrderItem;
import com.lambdaschool.coffeebean.model.User;
import com.lambdaschool.coffeebean.repository.Orderrepository;
import com.lambdaschool.coffeebean.repository.Userrepository;
import com.lambdaschool.coffeebean.service.CheckIsAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/customer", produces = MediaType.APPLICATION_JSON_VALUE)
public class CustomerController extends CheckIsAdmin
{
    @Autowired
    Userrepository userrepos;

    @Autowired
    Orderrepository orderrepos;

    @GetMapping("/userid/{userid}")
    public Object findUserByUserid(@PathVariable long userid)
    {
        CurrentUser currentuser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long currentUserId = currentuser.getCurrentuserid();

        boolean isAdmin = testIsAdmin(currentuser);

        if (currentUserId == userid || isAdmin)
        {
            return userrepos.findById(userid).get();

        }
        else
        {
            return doesUsernameMatch(currentUserId, userid, false);
        }
    }

    @GetMapping("/username/{username}")
    public Object findUserByUsername(@PathVariable String username)
    {
        {
            CurrentUser currentuser = (CurrentUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String currentUsername = currentuser.getUsername();

            Boolean isAdmin = testIsAdmin(currentuser);

            if (currentUsername.equalsIgnoreCase(username) || isAdmin)
            {
                return userrepos.findByUsername(username);

            }
            else
            {
                HashMap<String, Object> returnObject = new HashMap<>()
                {{
                    put("YourUsername", currentUsername);
                    put("SearchedUsername", username);
                    put("UsernameMatches", false);
                }};
                return returnObject;
            }
        }
    }

    @PutMapping("/update")
    public Object updateUser(@RequestBody User updatedUser)
    {
        CurrentUser currentuser = (CurrentUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long currentUserId = currentuser.getCurrentuserid();

        User foundUser = userrepos.findById(currentUserId).get();

        String currentEncryptedPassword = foundUser.getPassword();
        String unencryptedCurrentPassword = updatedUser.getRawPassword();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        Map returnObject = new HashMap();

        if (passwordEncoder.matches(unencryptedCurrentPassword, currentEncryptedPassword))
        {
            if (updatedUser.getUsername()!=null && userrepos.findByUsername(updatedUser.getUsername())!=null) returnObject.put("usernameExists", true);
            if (updatedUser.getEmail()!=null && userrepos.findByEmail(updatedUser.getEmail())!=null) returnObject.put("emailExists", true);
            if (!returnObject.isEmpty()) return returnObject;

            // User - personal details field - can be user changed
            if (updatedUser.getShippingaddress()==null) updatedUser.setShippingaddress(foundUser.getShippingaddress());
            if (updatedUser.getBillingaddress()==null) updatedUser.setBillingaddress(foundUser.getBillingaddress());
            if (updatedUser.getCustomerphone()==null) updatedUser.setCustomerphone(foundUser.getCustomerphone());
            if (updatedUser.getPaymentmethod()==null) updatedUser.setPaymentmethod(foundUser.getPaymentmethod());
            if (updatedUser.getCustomername()==null) updatedUser.setCustomername(foundUser.getCustomername());
            if (updatedUser.getUsername()==null) updatedUser.setUsername(foundUser.getUsername());
            if (updatedUser.getPassword()==null) updatedUser.setPassword(foundUser.getPassword());
            if (updatedUser.getEmail()==null) updatedUser.setEmail(foundUser.getEmail());
            if (updatedUser.getRole()==null) updatedUser.setRole(foundUser.getRole());

            // fields user can't change
            updatedUser.setUserid(currentUserId);
            updatedUser.setOrderhistory(foundUser.getOrderhistory());
            updatedUser.setProductsincart(foundUser.getProductsincart());
            updatedUser.setTotalorderhistory(foundUser.getTotalorderhistory());
            updatedUser.setRawPassword(null);

            return userrepos.save(updatedUser);
        }
        else
        {
            returnObject.put("passwordMatches",false);
            return returnObject;
        }
    }

    // ================ ORDERS =========================
    @GetMapping("/orders/orderid/{orderid}")
    public List<OrderItem> findOrderItemsByOrderid(@PathVariable long orderid)
    {
        return orderrepos.getOrderItemsByOrderid(orderid);
    }

    @GetMapping("/orders/userid/{userid}")
    public List<OrderItem> getOrderItemsByUserid(@PathVariable long userid)
    {
        return orderrepos.getOrderItemsByUserid(userid);
    }

}

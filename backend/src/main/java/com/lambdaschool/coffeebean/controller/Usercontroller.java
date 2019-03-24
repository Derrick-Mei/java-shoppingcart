package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.CurrentUser;
import com.lambdaschool.coffeebean.model.User;
import com.lambdaschool.coffeebean.repository.Userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

}
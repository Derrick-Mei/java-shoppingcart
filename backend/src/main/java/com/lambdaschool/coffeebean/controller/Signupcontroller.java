package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.User;
import com.lambdaschool.coffeebean.repository.Userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;

@RestController
@RequestMapping(value = "/signup", produces = MediaType.APPLICATION_JSON_VALUE)
public class Signupcontroller
{

    @Autowired
    // private UserService userService;
    private Userrepository userrepos;

    @PostMapping("")
    public Object addNewUser(@RequestBody User newuser) throws URISyntaxException
    {
        if (userrepos.findByUsername(newuser.getUsername()) != null)
        {
            if (newuser.getEmail() != null & userrepos.findByEmail(newuser.getEmail()) != null)
            {
                return "{ username unique constraint : " + newuser.getUsername() + " already exists,\nemail unique constraint : " + newuser.getEmail() + " already exists }";
            }
            return "{username unique constraint : " + newuser.getUsername() + " already exists}";
        }
        else if (userrepos.findByEmail(newuser.getEmail()) != null & newuser.getEmail() != null)
        {
            return "{ email unique constraint : " + newuser.getEmail() + " already exists }";
        }
        else
        {
            // set role to user for security concern.  Just in case a new user wants to set their own role to admin.
            newuser.setRole("user");
            return userrepos.save(newuser);
        }
    }

}
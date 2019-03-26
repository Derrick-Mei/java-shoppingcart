package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.User;
import com.lambdaschool.coffeebean.repository.Userrepository;
import com.lambdaschool.coffeebean.service.CheckIsAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;

@RestController
@RequestMapping(value = "/signup", produces = MediaType.APPLICATION_JSON_VALUE)
public class Signupcontroller extends CheckIsAdmin
{

    @Autowired
    // private UserService userService;
    private Userrepository userrepos;

    @PostMapping("")
    public Object addNewUser(@RequestBody User newuser) throws URISyntaxException
    {
        Object returnObject = isUsernameAndEmailUnique(newuser, userrepos);
        if (returnObject != null) return returnObject;

        newuser.setRole("user");
        return userrepos.save(newuser);
    }
}
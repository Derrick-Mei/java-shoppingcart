package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.SendGrid.EmailModel;
import com.lambdaschool.coffeebean.SendGrid.SendGridService2;
import com.lambdaschool.coffeebean.model.User;
import com.lambdaschool.coffeebean.repository.Userrepository;
import com.lambdaschool.coffeebean.service.CheckIsAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;

@RestController
@RequestMapping(value = "/signup", produces = MediaType.APPLICATION_JSON_VALUE)
public class Signupcontroller extends CheckIsAdmin
{

    @Autowired
    // private UserService userService;
    private Userrepository userrepos;

    @Autowired
    SendGridService2 emailService;

    @PostMapping("")
    public Object addNewUser(@RequestBody User newuser) throws URISyntaxException, IOException
    {
        String email = newuser.getEmail();
        HashMap<String, Object> returnObject = new HashMap<>();

        if (userrepos.findByUsername(newuser.getUsername()) != null) returnObject.put("usernameAlreadyExists", true);
        if (email != null && userrepos.findByEmail(email) != null) returnObject.put("emailAlreadyExists", true);
        if (newuser.getPassword() == null) returnObject.put("passwordError", "passwordRequired");
        if (!returnObject.isEmpty()) return returnObject;

        EmailModel ets = new EmailModel("meanmeancoffebean2019@gmail.com", newuser.getEmail(), "Thanks for joining the mean team", "welcome message");
        emailService.sendEmail(ets);

        newuser.setRole("user");
        return userrepos.save(newuser);
    }
}
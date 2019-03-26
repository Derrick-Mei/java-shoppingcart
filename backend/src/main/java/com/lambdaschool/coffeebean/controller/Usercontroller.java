package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.User;
import com.lambdaschool.coffeebean.repository.Userrepository;
import com.lambdaschool.coffeebean.service.CheckIsAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class Usercontroller extends CheckIsAdmin
{

    @Autowired
    // private UserService userService;
    private Userrepository userrepos;

    @GetMapping("")
    public List<User> listAllUsers()
    {
        return userrepos.findAll();
    }

    @GetMapping("/{userid}")
    public User findUserByUserid(@PathVariable long userid)
    {
        return userrepos.findById(userid).get();
    }

    @PostMapping("/addadmin")
    public Object addNewUser(@RequestBody User newuser) throws URISyntaxException
    {
        Object uniqueConstraint = isUsernameAndEmailUnique(newuser, userrepos);
        if (uniqueConstraint != null) return uniqueConstraint;

        newuser.setRole("admin");
        return userrepos.save(newuser);
    }

    @DeleteMapping("/{id}")
    public HashMap deleteUserById(@PathVariable long id)
    {
        var foundUser = userrepos.findById(id);
        if (foundUser.isPresent())
        {
            userrepos.deleteById(id);

            HashMap<String, Object> returnObject = new HashMap<>()
            {{
                put("userId", foundUser.get().getUserid());
                put("username", foundUser.get().getUsername());
                put("role", foundUser.get().getAuthority());
                put("deleted", true);
            }};

            return returnObject;
        }
        else
        {
            HashMap<String, Object> returnObject = new HashMap<>()
            {{
                put("deleted", false);
                put("error", "userid: " + id + " does not exist.");
            }};
            return returnObject;
        }
    }
}
package com.lambdaschool.coffeebean.service;

import com.lambdaschool.coffeebean.model.CurrentUser;
import com.lambdaschool.coffeebean.model.User;
import com.lambdaschool.coffeebean.repository.Userrepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;

public class CheckIsAdmin
{
    protected boolean testIsAdmin(CurrentUser currentuser)
    {
        List<? extends SimpleGrantedAuthority> authorities = currentuser.getAuthorities2();
        boolean isAdmin = false;

        for (SimpleGrantedAuthority authority : authorities)
        {
            if (authority.getAuthority().equalsIgnoreCase("ROLE_ADMIN")) isAdmin = true;
        }

        return isAdmin;
    }

    protected HashMap<String, Object> doesUsernameMatch(Long currentUserId, Long userId, boolean matches)
    {
        return new HashMap<>()
        {{
            put("YourUserId", currentUserId);
            put("SearchedUserId", userId);
            put("UserIdMatches", matches);
        }};
    }

    protected static Object isUsernameAndEmailUnique(@RequestBody User newuser, Userrepository userrepos)
    {
        String email = newuser.getEmail();
        HashMap<String, Object> returnObject = new HashMap<>();

        if (userrepos.findByUsername(newuser.getUsername()) != null) returnObject.put("usernameAlreadyExists", true);
        if (email != null && userrepos.findByEmail(email) != null) returnObject.put("emailAlreadyExists", true);
        if (!returnObject.isEmpty()) return returnObject;
        return null;
    }
}

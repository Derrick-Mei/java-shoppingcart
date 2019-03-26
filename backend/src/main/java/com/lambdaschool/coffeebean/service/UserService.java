package com.lambdaschool.coffeebean.service;

import com.lambdaschool.coffeebean.model.User;

import java.util.List;

public interface UserService
{
    User save(User user);

    List<User> findAll();

    void delete(long id);
}
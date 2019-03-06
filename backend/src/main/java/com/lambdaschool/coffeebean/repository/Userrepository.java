package com.lambdaschool.coffeebean.repository;

import com.lambdaschool.coffeebean.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Userrepository extends JpaRepository<User, Long>
{
    User findByUsername(String username);

    User findByEmail(String email);

    @Query(value = "SELECT * FROM cart WHERE userid = :userid", nativeQuery = true)
    List<Object> getItemsInCartById(long userid);
}

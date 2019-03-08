package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.Order;
import com.lambdaschool.coffeebean.repository.Orderrepository;
import com.lambdaschool.coffeebean.repository.Userrepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Api(value = "Some value... by DKM", description = "Order Controller by DKM")
@RestController
@RequestMapping(path = "/orders", produces = MediaType.APPLICATION_JSON_VALUE)
public class Ordercontroller {
    @Autowired
    Orderrepository orderrepos;

    @Autowired
    Userrepository userrepos;

    @ApiOperation(value = "find all orders - DKM", response = Order.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully received customer - DKM"),
            @ApiResponse(code = 401, message = "You are not authorized to the view the resource - DKM"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden - DKM"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found - DKM") })
    @GetMapping("")
    public List<Order> findAllOrders() {
        return orderrepos.findAll();
    }

    @GetMapping("/unshipped")
    public List<Order> findUnshippedOrders() {
        return orderrepos.findUnshippedOrders();
    }

    @GetMapping("/shipped")
    public List<Order> findShippedOrders() {
        return orderrepos.findShippedOrders();
    }

    @PutMapping("/updateshippingstatus/{orderid}/{status}")
    public Order updateShippingStatus(@PathVariable long orderid, @PathVariable boolean status) {
        Optional<Order> foundOrder = orderrepos.findById(orderid);

        if (foundOrder.isPresent()) {
            foundOrder.get().setShippedstatus(status);
            if (status == true)
                foundOrder.get().setShipdatetime(new Date());
            if (status == false)
                foundOrder.get().setShipdatetime(null);
            return orderrepos.save(foundOrder.get());
        } else {
            return null;
        }

    }

    // @PutMapping("/updateshiptime/{orderid}")
    // public Order updateShipTime(@PathVariable long orderid)
    // {
    // Optional<Order> foundOrder = orderrepos.findById(orderid);
    //
    // if (foundOrder.isPresent())
    // {
    // foundOrder.get().setShipdatetime(new Date());
    // return orderrepos.save(foundOrder.get());
    // }
    // else
    // {
    // return null;
    // }
    // }

    // ============ Add To Order ================

    @PostMapping("/buy/{userid}")
    public Order buyItemsInCart(@RequestBody Order newOrder, @PathVariable long userid) {
        userrepos.deleteAllItemsFromCart(userid);

        return orderrepos.save(newOrder);
    }
}
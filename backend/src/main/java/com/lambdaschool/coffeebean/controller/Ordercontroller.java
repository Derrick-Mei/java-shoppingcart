package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.Order;
import com.lambdaschool.coffeebean.repository.Orderrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/orders", produces = MediaType.APPLICATION_JSON_VALUE)
public class Ordercontroller
{
    @Autowired
    Orderrepository orderrepos;

    @GetMapping("")
    public List<Order> findAllOrders()
    {
        return orderrepos.findAll();
    }

    @GetMapping("/unshipped")
    public List<Order> findUnshippedOrders()
    {
        return orderrepos.findUnshippedOrders();
    }

    @GetMapping("/shipped")
    public List<Order> findShippedOrders()
    {
        return orderrepos.findShippedOrders();
    }

    @PutMapping("/updateshippingstatus/{orderid}/{status}")
    public Order updateShippingStatus(@PathVariable long orderid, @PathVariable boolean status)
    {
        Optional<Order> foundOrder = orderrepos.findById(orderid);

        if (foundOrder.isPresent())
        {
            foundOrder.get().setShippedstatus(status);
            if (status == true) foundOrder.get().setShipdatetime(new Date());
            if (status == false) foundOrder.get().setShipdatetime(null);
            return orderrepos.save(foundOrder.get());
        }
        else
        {
            return null;
        }

    }

//    @PutMapping("/updateshiptime/{orderid}")
//    public Order updateShipTime(@PathVariable long orderid)
//    {
//        Optional<Order> foundOrder = orderrepos.findById(orderid);
//
//        if (foundOrder.isPresent())
//        {
//            foundOrder.get().setShipdatetime(new Date());
//            return orderrepos.save(foundOrder.get());
//        }
//        else
//        {
//            return null;
//        }
//    }
}
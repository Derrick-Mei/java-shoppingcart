package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.Order;
import com.lambdaschool.coffeebean.repository.Orderrepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@Api(value = "Some value... by DKM", description = "Order Controller by DKM")
@RestController
@RequestMapping(path = "/orders", produces = MediaType.APPLICATION_JSON_VALUE)
public class Ordercontroller
{
    private final
    Orderrepository orderrepos;

    public Ordercontroller(Orderrepository orderrepos)
    {
        this.orderrepos = orderrepos;
    }

    @ApiOperation(value = "find all orders - DKM", response = Order.class)
    @GetMapping("")
    public List<Order> findAllOrders()
    {
        return orderrepos.findAll();
    }

    @GetMapping("/{orderid}")
    public Order findOrderByOrderId(@PathVariable long orderid)
    {
        return orderrepos.findById(orderid).get();
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
            if (status)
                foundOrder.get().setShipdatetime(new Date());
            if (!status)
                foundOrder.get().setShipdatetime(null);
            return orderrepos.save(foundOrder.get());
        } else
        {
            return null;
        }

    }
}
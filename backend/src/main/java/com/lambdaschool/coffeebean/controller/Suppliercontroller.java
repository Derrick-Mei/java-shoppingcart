package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.Supplier;
import com.lambdaschool.coffeebean.repository.Supplierrepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Api(value = "Some value... by DKM", description = "Supplier Controller by DKM")
@RestController
@RequestMapping(path = "/suppliers", produces = MediaType.APPLICATION_JSON_VALUE)
public class Suppliercontroller
{
    @Autowired
    Supplierrepository suppplierrepos;

    @ApiOperation(value = "find all orders - DKM", response = Supplier.class)
    @ApiResponses(value =
            {
                    @ApiResponse(code = 200, message = "Successfully received customer - DKM"),
                    @ApiResponse(code = 401, message = "You are not authorized to the view the resource - DKM"),
                    @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden - DKM"),
                    @ApiResponse(code = 404, message = "The resource you were trying to reach is not found - DKM")
            })
    @GetMapping("")
    public List<Supplier> findAllOrders()
    {
        return suppplierrepos.findAll();
    }

    @PostMapping("")
    public Supplier addSupplier(@RequestBody Supplier newSupplier)
    {
        return suppplierrepos.save(newSupplier);
    }

    @PutMapping("/{supplierid}")
    public Object updateSupplierBySupplierID(@PathVariable long supplierid, @RequestBody Supplier updatedSupplier)
    {
        Optional<Supplier> foundSupplier = suppplierrepos.findById(supplierid);

        if (foundSupplier.isPresent())
        {
            updatedSupplier.setSupplierid(supplierid);
            if (updatedSupplier.getSuppliername() == null) updatedSupplier.setSuppliername(foundSupplier.get().getSuppliername());
            if (updatedSupplier.getSupplierphone() == null) updatedSupplier.setSupplierphone(foundSupplier.get().getSupplierphone());
            if (updatedSupplier.getProductsfromsupplier().isEmpty()) updatedSupplier.setProductsfromsupplier(foundSupplier.get().getProductsfromsupplier());
            return suppplierrepos.save(updatedSupplier);
        }
        else
        {
            return "Supplier with id: " + supplierid + " is not found.";
        }
    }

    @DeleteMapping("/{supplierid}")
    public Object deleteSupplierById(@PathVariable long supplierid)
    {
        Optional<Supplier> foundSupplier = suppplierrepos.findById(supplierid);
        if (foundSupplier.isPresent())
        {
            suppplierrepos.deleteById(supplierid);
            return foundSupplier.get();
        }
        else
        {
            return "Supplier with id: " + supplierid + " is not found.";
        }
    }

}

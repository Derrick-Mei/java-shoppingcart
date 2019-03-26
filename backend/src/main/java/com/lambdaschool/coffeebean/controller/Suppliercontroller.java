package com.lambdaschool.coffeebean.controller;

import com.lambdaschool.coffeebean.model.Supplier;
import com.lambdaschool.coffeebean.repository.Supplierrepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
    @GetMapping("")
    public List<Supplier> findAllOrders()
    {
        return suppplierrepos.findAll();
    }

    @GetMapping("/{supplierid}")
    public Supplier getSupplierById(@PathVariable long supplierid)
    {
        return suppplierrepos.findById(supplierid).get();
    }

    @PostMapping("")
    public Supplier addSupplier(@RequestBody Supplier newSupplier)
    {
        return suppplierrepos.save(newSupplier);
    }

    @PostMapping("/supplierid/{supplierid}/productid/{productid}")
    public Supplier addSupplierToProduct(@PathVariable long supplierid, @PathVariable long productid)
    {
        suppplierrepos.addSupplierToProduct(supplierid, productid);
        return suppplierrepos.findById(supplierid).get();
    }

    @PutMapping("/{supplierid}")
    public Object updateSupplierBySupplierID(@PathVariable long supplierid, @RequestBody Supplier updatedSupplier)
    {
        Optional<Supplier> foundSupplier = suppplierrepos.findById(supplierid);

        if (foundSupplier.isPresent())
        {
            updatedSupplier.setSupplierid(supplierid);
            if (updatedSupplier.getSuppliername() == null)
                updatedSupplier.setSuppliername(foundSupplier.get().getSuppliername());
            if (updatedSupplier.getSupplierphone() == null)
                updatedSupplier.setSupplierphone(foundSupplier.get().getSupplierphone());
            if (updatedSupplier.getProductsfromsupplier().isEmpty())
                updatedSupplier.setProductsfromsupplier(foundSupplier.get().getProductsfromsupplier());
            return suppplierrepos.save(updatedSupplier);
        } else
        {
            return "Supplier with id: " + supplierid + " is not found.";
        }
    }

    @DeleteMapping("/supplierid/{supplierid}/productid/{productid}")
    public Supplier deleteSupplierFromProduct(@PathVariable long supplierid, @PathVariable long productid)
    {
        Supplier foundSupplier = suppplierrepos.findById(supplierid).get();
        suppplierrepos.deleteSupplierFromProduct(supplierid, productid);
        return foundSupplier;
    }

    @DeleteMapping("/{supplierid}")
    public Object deleteSupplierById(@PathVariable long supplierid)
    {
        Optional<Supplier> foundSupplier = suppplierrepos.findById(supplierid);
        if (foundSupplier.isPresent())
        {
            suppplierrepos.deleteById(supplierid);
            return foundSupplier.get();
        } else
        {
            return "Supplier with id: " + supplierid + " is not found.";
        }
    }

}

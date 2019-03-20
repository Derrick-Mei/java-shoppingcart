package com.lambdaschool.coffeebean.Stripe;

import com.lambdaschool.coffeebean.Stripe.ChargeRequest.Currency;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

//@Log
@RestController
@RequestMapping(path = "/charge", produces = MediaType.APPLICATION_JSON_VALUE)
public class ChargeController {

    @Autowired
    StripeService paymentsService;

    @PostMapping("")
    public Map<String, String> charge(@RequestBody ChargeRequest chargeRequest) throws StripeException {
        chargeRequest.setDescription("Mean Mean Coffee Bean's");
        chargeRequest.setCurrency(Currency.USD);
        Charge charge = paymentsService.charge(chargeRequest);

        HashMap<String, String> map = new HashMap<>();
        map.put("id", charge.getId());
        map.put("status", charge.getStatus());
        map.put("chargeId", charge.getId());
        map.put("balance_transaction", charge.getBalanceTransaction());
        return map;

//
//        model.addAttribute("id", charge.getId());
//        model.addAttribute("status", charge.getStatus());
//        model.addAttribute("chargeId", charge.getId());
//        model.addAttribute("balance_transaction", charge.getBalanceTransaction());
//        return String.valueOf(model);
    }

    @ExceptionHandler(StripeException.class)
    public Map<String, String> handleError(StripeException ex) {
        HashMap<String, String> errormap = new HashMap<>();
        errormap.put("statusCode", ex.getStatusCode().toString());
        errormap.put("error", ex.getMessage());
//        model.addAttribute("error", ex.getMessage());
        return errormap;
    }
}
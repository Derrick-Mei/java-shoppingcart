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
public class ChargeController
{

    @Autowired
    StripeService paymentsService;

    @PostMapping("")
    public Map<String, Object> charge(@RequestBody ChargeRequest chargeRequest) throws StripeException
    {
        chargeRequest.setDescription("Mean Mean Coffee Beans");
        chargeRequest.setCurrency(Currency.USD);
        Charge charge = paymentsService.charge(chargeRequest);

        HashMap<String, Object> map = new HashMap<>();
        map.put("id", charge.getId());
        map.put("status", charge.getStatus());
        map.put("chargeId", charge.getId());
        map.put("balance_transaction", charge.getBalanceTransaction());
        map.put("shippingDetails", charge.getShipping());
        map.put("billingDetails", charge.getBillingDetails());
        return map;
    }

    @ExceptionHandler(StripeException.class)
    public Map<String, Object> handleError(StripeException ex)
    {
        HashMap<String, Object> errormap = new HashMap<>();
        errormap.put("statusCode", ex.getStatusCode());
        errormap.put("error", ex.getMessage());
        errormap.put("stripeError", ex.getStripeError());
        errormap.put("requestId", ex.getRequestId());
        return errormap;
    }
}
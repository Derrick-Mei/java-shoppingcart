package com.lambdaschool.coffeebean.model;

import java.util.Date;

public interface OrderItem
{
    Long getOrderid();

    Long getProductid();

    String getProductname();

    String getDescription();

    String getImage();

    double getPrice();

    int getQuantityinorder();

    Date getOrderdatetime();
}

package com.lambdaschool.coffeebean.model;

public interface OrderItem
{
    Long getOrderid();

    String getProductname();

    String getDescription();

    String getImage();

    double getPrice();

    int getQuantityinorder();

}

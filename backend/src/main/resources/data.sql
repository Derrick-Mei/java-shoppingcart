-- ALTER TABLE `coffeebean`.`user`
-- CHANGE COLUMN `email` `email` VARCHAR(250) NULL DEFAULT NULL ,
-- CHANGE COLUMN `username` `username` VARCHAR(250) NULL DEFAULT NULL ;
--
-- ALTER TABLE `coffeebean`.`user`
-- ADD UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
-- ADD UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE;

INSERT INTO orders (orderid, paymentdetails, shipdatetime, shippedstatus, shippingaddress, userid) VALUES (1, 'Mastercard1', '2019-01-20 20:50:50', true, 'string address1', 3);
INSERT INTO orders (orderid, paymentdetails, shipdatetime, shippedstatus, shippingaddress, userid) VALUES (2, 'Mastercard2', null, false, 'string address1', 3);
INSERT INTO orders (orderid, paymentdetails, shipdatetime, shippedstatus, shippingaddress, userid) VALUES (3, 'Mastercard3', '2019-01-20 20:50:50', true, 'string address1', 4);
INSERT INTO orders (orderid, paymentdetails, shipdatetime, shippedstatus, shippingaddress, userid) VALUES (4, 'Mastercard4', null, false, 'string address1', 3);
INSERT INTO orders (orderid, paymentdetails, shipdatetime, shippedstatus, shippingaddress, userid) VALUES (5, 'Mastercard5', '2019-01-20 20:50:50', true, 'string address1', 3);
INSERT INTO orders (orderid, paymentdetails, shipdatetime, shippedstatus, shippingaddress, userid) VALUES (6, 'Mastercard6', null, false, 'string address1', 4);

INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (1, 'description1', '2020-01-01', 'imageurl1.com', 10.50, 'productname1', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (2, 'description2', '2020-01-01', 'imageurl2.com', 11.50, 'productname2', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (3, 'description3', '2020-01-01', 'imageurl3.com', 12.50, 'productname3', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (4, 'description4', '2020-01-01', 'imageurl4.com', 13.50, 'productname4', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (5, 'description5', '2020-01-01', 'imageurl5.com', 14.50, 'productname5', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (6, 'description6', '2020-01-01', 'imageurl6.com', 15.50, 'productname6', 10);

INSERT INTO suppliers (supplierid, suppliername, supplierphone) VALUES (1, 'supplier1', '111-111-1111');
INSERT INTO suppliers (supplierid, suppliername, supplierphone) VALUES (2, 'supplier2', '111-111-1111');
INSERT INTO suppliers (supplierid, suppliername, supplierphone) VALUES (3, 'supplier3', '111-111-1111');

INSERT INTO user (userid, role, username, password, email) VALUES (1, 'admin', 'username1', 'password', 'email1@email.com');
INSERT INTO user (userid, role, username, password, email) VALUES (2, 'admin', 'username2', 'password', 'email2@email.com');

INSERT INTO user (userid, role, username, password, email, customername, billingaddress, customerphone, paymentmethod, shippingaddress)
VALUES (3, 'user', 'username3', 'password', 'email3@email.com', 'name3', 'billingaddress3', '111-111-1111', 'paymethod3', 'shippingaddress3');
INSERT INTO user (userid, role, username, password, email, customername, billingaddress, customerphone, paymentmethod, shippingaddress)
VALUES (4, 'user', 'username4', 'password', 'email4@email.com', 'name4', 'billingaddress4', '111-111-1111', 'paymethod4', 'shippingaddress4');


INSERT INTO cart (userid, productid) VALUES (3, 1);
INSERT INTO cart (userid, productid) VALUES (3, 2);
INSERT INTO cart (userid, productid) VALUES (3, 3);
INSERT INTO cart (userid, productid) VALUES (4, 2);
INSERT INTO cart (userid, productid) VALUES (4, 5);
INSERT INTO cart (userid, productid) VALUES (4, 1);

INSERT INTO totalorderhistory (userid, productid) VALUES (3, 1);
INSERT INTO totalorderhistory (userid, productid) VALUES (3, 2);
INSERT INTO totalorderhistory (userid, productid) VALUES (3, 3);
INSERT INTO totalorderhistory (userid, productid) VALUES (4, 2);
INSERT INTO totalorderhistory (userid, productid) VALUES (4, 5);
INSERT INTO totalorderhistory (userid, productid) VALUES (4, 1);

INSERT INTO orderproducts (orderid, productid) VALUES (1, 1);
INSERT INTO orderproducts (orderid, productid) VALUES (1, 2);
INSERT INTO orderproducts (orderid, productid) VALUES (1, 4);
INSERT INTO orderproducts (orderid, productid) VALUES (2, 1);
INSERT INTO orderproducts (orderid, productid) VALUES (2, 3);
INSERT INTO orderproducts (orderid, productid) VALUES (2, 5);

INSERT INTO supplierproduct (supplierid, productid) VALUES (1, 1);
INSERT INTO supplierproduct (supplierid, productid) VALUES (1, 2);
INSERT INTO supplierproduct (supplierid, productid) VALUES (1, 3);
INSERT INTO supplierproduct (supplierid, productid) VALUES (2, 1);
INSERT INTO supplierproduct (supplierid, productid) VALUES (2, 4);
INSERT INTO supplierproduct (supplierid, productid) VALUES (3, 1);
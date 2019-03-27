ALTER TABLE cart ADD COLUMN quantityincart INT NULL AFTER productid;

ALTER TABLE orderproducts ADD COLUMN quantityinorder INT NULL AFTER productid;

ALTER TABLE products ADD FULLTEXT(productname);

-- totalorderhistory quantity is optional stretch goal

-- order products need quantity


INSERT INTO orders (orderid, paymentdetails, shipdatetime, shippedstatus, shippingaddress, userid, orderdatetime) VALUES (1, 'Mastercard1', '2019-01-20 20:50:50', true, 'string address1', 3, '2019-01-20 20:50:50');
INSERT INTO orders (orderid, paymentdetails, shipdatetime, shippedstatus, shippingaddress, userid, orderdatetime) VALUES (2, 'Mastercard2', '2019-01-20 20:50:50', false, 'string address1', 3, '2019-01-20 20:50:50');
-- INSERT INTO orders (orderid, paymentdetails, shipdatetime, shippedstatus, shippingaddress, userid) VALUES (3, 'Mastercard3', '2019-01-20 20:50:50', true, 'string address1', 4);
-- INSERT INTO orders (orderid, paymentdetails, shipdatetime, shippedstatus, shippingaddress, userid) VALUES (4, 'Mastercard4', '2019-01-20 20:50:50', false, 'string address1', 3);
-- INSERT INTO orders (orderid, paymentdetails, shipdatetime, shippedstatus, shippingaddress, userid) VALUES (5, 'Mastercard5', '2019-01-20 20:50:50', true, 'string address1', 3);
-- INSERT INTO orders (orderid, paymentdetails, shipdatetime, shippedstatus, shippingaddress, userid) VALUES (6, 'Mastercard6', '2019-01-20 20:50:50', false, 'string address1', 4);

INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (1, 'description1', '2020-01-01', 'brazil-coffee-beans', 10.50, 'brazil coffee', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (2, 'description2', '2020-01-01', 'assorted-bean-pack-1', 11.50, 'assorted bean pack', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (3, 'description3', '2020-01-01', 'black-bean', 12.50, 'black bean', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (4, 'description4', '2020-01-01', 'black-bean', 13.50, 'red coffee of hell', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (5, 'description5', '2020-01-01', 'black-bean', 14.50, 'Ethiopia Sidamo', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (6, 'description6', '2020-01-01', 'black-bean', 15.50, 'Sumatra', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (7, 'description7', '2020-01-01', 'black-bean', 15.50, 'Sulawesi', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (8, 'description8', '2020-01-01', 'black-bean', 15.50, 'Verona', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (9, 'description9', '2020-01-01', 'black-bean', 15.50, 'Veranda', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (10, 'description10', '2020-01-01', 'black-bean', 15.50, 'Lemonade Blueberry Beans', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (11, 'description11', '2020-01-01', 'black-bean', 15.50, 'French', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (12, 'description12', '2020-01-01', 'black-bean', 15.50, 'Italian', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (13, 'description13', '2020-01-01', 'black-bean', 15.50, 'Dark roast', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (14, 'description14', '2020-01-01', 'black-bean', 15.50, 'Very Dark Roast', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (15, 'description15', '2020-01-01', 'black-bean', 15.50, 'Black', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (16, 'description16', '2020-01-01', 'black-bean', 15.50, 'mediocre cheap beans', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (17, 'description16', '2020-01-01', 'black-bean', 150.50, 'Kopi Luwak', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (18, 'description18', '2020-01-01', 'black-bean', 15.50, 'Dark Matter name', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (19, 'description19', '2020-01-01', 'black-bean', 15.50, 'Unicorn blood', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (20, 'description20', '2020-01-01', 'black-bean', 15.50, 'Juice of Tree', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (21, 'description21', '2020-01-01', 'black-bean', 15.50, 'Death', 10);
INSERT INTO products (productid, description, expiration, image, price, productname, quantity) VALUES (22, 'description22', '2020-01-01', 'black-bean', 15.50, 'Random name', 10);

INSERT INTO suppliers (supplierid, suppliername, supplierphone) VALUES (1, 'supplier1', '111-111-1111');
INSERT INTO suppliers (supplierid, suppliername, supplierphone) VALUES (2, 'supplier2', '111-111-1111');
INSERT INTO suppliers (supplierid, suppliername, supplierphone) VALUES (3, 'supplier3', '111-111-1111');

INSERT INTO user (userid, role, username, password, email, receive_emails) VALUES (1, 'admin', 'username1', '$2a$10$nRfvJ7epiIt8SJ9SIiiIdePm7GcV/mP6kJ.e7X3TeGh2swehrYnw2', 'email1@email.com', false);
INSERT INTO user (userid, role, username, password, email, receive_emails) VALUES (2, 'admin', 'username2', '$2a$10$nRfvJ7epiIt8SJ9SIiiIdePm7GcV/mP6kJ.e7X3TeGh2swehrYnw2', 'email2@email.com', false);

INSERT INTO user (userid, role, username, password, email, customername, billingaddress, customerphone, paymentmethod, shippingaddress, receive_emails)
VALUES (3, 'user', 'username3', '$2a$10$nRfvJ7epiIt8SJ9SIiiIdePm7GcV/mP6kJ.e7X3TeGh2swehrYnw2', 'email3@email.com', 'name3', 'billingaddress3', '111-111-1111', 'paymethod3', 'shippingaddress3', true);
INSERT INTO user (userid, role, username, password, email, customername, billingaddress, customerphone, paymentmethod, shippingaddress, receive_emails)
VALUES (4, 'user', 'username4', '$2a$10$nRfvJ7epiIt8SJ9SIiiIdePm7GcV/mP6kJ.e7X3TeGh2swehrYnw2', 'email4@email.com', 'name4', 'billingaddress4', '111-111-1111', 'paymethod4', 'shippingaddress4', true);


INSERT INTO cart (userid, productid, quantityincart) VALUES (3, 1, 2);
INSERT INTO cart (userid, productid, quantityincart) VALUES (3, 2, 3);
INSERT INTO cart (userid, productid, quantityincart) VALUES (3, 4, 4);
INSERT INTO cart (userid, productid, quantityincart) VALUES (4, 2, 5);
INSERT INTO cart (userid, productid, quantityincart) VALUES (4, 5, 6);
INSERT INTO cart (userid, productid, quantityincart) VALUES (4, 1, 7);

-- INSERT INTO totalorderhistory (userid, productid) VALUES (3, 1);
-- INSERT INTO totalorderhistory (userid, productid) VALUES (3, 2);
-- INSERT INTO totalorderhistory (userid, productid) VALUES (3, 3);
-- INSERT INTO totalorderhistory (userid, productid) VALUES (4, 2);
-- INSERT INTO totalorderhistory (userid, productid) VALUES (4, 5);
-- INSERT INTO totalorderhistory (userid, productid) VALUES (4, 1);

INSERT INTO orderproducts (orderid, productid, quantityinorder) VALUES (1, 1, 8);
INSERT INTO orderproducts (orderid, productid, quantityinorder) VALUES (1, 2, 8);
INSERT INTO orderproducts (orderid, productid, quantityinorder) VALUES (1, 4, 8);
INSERT INTO orderproducts (orderid, productid, quantityinorder) VALUES (2, 1, 8);
INSERT INTO orderproducts (orderid, productid, quantityinorder) VALUES (2, 3, 8);
INSERT INTO orderproducts (orderid, productid, quantityinorder) VALUES (2, 5, 8);

INSERT INTO supplierproduct (supplierid, productid) VALUES (1, 1);
INSERT INTO supplierproduct (supplierid, productid) VALUES (1, 2);
INSERT INTO supplierproduct (supplierid, productid) VALUES (1, 3);
INSERT INTO supplierproduct (supplierid, productid) VALUES (2, 1);
INSERT INTO supplierproduct (supplierid, productid) VALUES (2, 4);
INSERT INTO supplierproduct (supplierid, productid) VALUES (3, 1);
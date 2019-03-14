# Admin Routes

## User Controller - Protected
1. GET - /users - find all users
2. GET - /users/addadmin - add admin user
3. DELETE - /users/{userid} - delete a user by userid

## Order Controller
1. GET - /orders - get all orders
2. GET - /orders/unshipped - get all unshipped orders
3. GET - /orders/shipped - get all shipped orders
4. PUT - /orders/updatshippingstatus/{orderid}/{status} - update shipping status
5.  order product needs 3rd column

## Supplier Controller
1. GET - /suppliers - get all suppliers
2. POST - /suppliers - add supplier
3. PUT - /suppliers/{supplierid} - edit supplier
4. DELETE - /suppliers/{suppliereid} - delete supplier by supplierid
5. POST -  /suppliers/{supplierid}/{productid} - add supplier to product in supplierproduct join table
6. DELETE - /suppliers/{supplierid}/{productid} - delete supplier to product in supplierproduct join table

## Product Controller
1. GET - /products - get all products
2. ** POST - /products - add product
3. ** PUT - /products/{productid} - edit product
4. ** DELETE /products/{producteid} - delete product by productid




# User Routes

## Cart Controller
1. GET - /cart/{userid} - get 1 user by userid
2. GET - /cart/user/username/{username} - get 1 user by username ** change to /cart/username/{username}

3. GET - /cart/items/{userid} - get users cart by id
4. POST - /cart/addtocart/{userid}/{productid}/{quantity} - add to cart, if exists add to quantity
5. PUT - /cart/modifyquantityincart/{userid}/{productid}/{quantity} - modify quantity in cart
6. DELETE - /cart/remove/{userid}/{productid} - delete item from cart
7. DELETE - /cart/modifytozero/{userid}/{productid} - modify quantity of item in cart to 0
8. DELETE - /cart/deleteall/{userid} - delete all items from cart

9. POST - /cart/buy/{userid} - buy items in cart

10. totalorder history needs 3rd column



# Unprotected Routes

## Signup Controller
1. GET - /signup - signup new users

## Shop Controller
1. GET - /shop - get all items without sensitive relational data
2. GET - /shop/{pagenumber} - get 10 items of page number without sensitive relational data
3. GET - /shop/{itemname}/{pagenumber} - get 10 items of page number of item's with name like itemname.

Triple join example
SELECT p.productid, p.productname, p.description, p.image, p.price, c.quantityincart, u.username, u.userid FROM cart c INNER JOIN products p ON c.productid=p.productid INNER JOIN user u ON u.userid=c.userid WHERE u.userid = 3;
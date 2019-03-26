# Admin ONLY Routes

## User Controller - Protected
1. GET -    /users - find all users
2. GET -    /users/{userid} - get user by userid
3. POST -   /users/addadmin - add admin user
4. DELETE - /users/{userid} - delete a user by userid

## Order Controller
1. GET - /orders - get all orders
2. GET - /orders/{orderid} - get order by orderid
3. GET - /orders/unshipped - get all unshipped orders
4. GET - /orders/shipped - get all shipped orders
5. PUT - /orders/updatshippingstatus/{orderid}/{status} - update shipping status

## Supplier Controller
1. GET -    /suppliers - get all suppliers
2. GET -    /suppliers/{supplierid} - get supplier by id
3. POST -   /suppliers - add supplier
4. POST -   /suppliers/supplierid/{supplierid}/productid/{productid} - add supplier to product in supplierproduct join table
5. PUT -    /suppliers/{supplierid} - edit supplier
6. DELETE - /suppliers/{suppliereid} - delete supplier by supplierid
7. DELETE - /suppliers/supplierid/{supplierid}/productid/{productid} - delete supplier to product in supplierproduct join table

## Product Controller
1. GET -  /products - get all products
2. GET -  /products/{productid} - get product by productid
3. PUT -  /products/{productid} - edit product
4. POST - /products - save new product
5. DELETE /products/{producteid} - delete product by productid




# User OR Admin Routes

## Cart Controller
1. GET -    /cart/{userid} - get users cart by id
2. POST -   /cart/addtocart/{userid}/{productid}/{quantity} - add to cart, if exists add to quantity
3. PUT -    /cart/modifyquantityincart/{userid}/{productid}/{quantity} - modify quantity in cart
4. DELETE - /cart/remove/{userid}/{productid} - delete item from cart
5. DELETE - /cart/modifytozero/{userid}/{productid} - modify quantity of item in cart to 0
6. DELETE - /cart/deleteall/{userid} - delete all items from cart
7. POST -   /cart/buy - buy items in cart

## Customer Controller
1. GET - /customer/userid/{userid} - get 1 user by userid
2. GET - /customer/username/{username} - get 1 user by username ** change to /cart/username/{username}
3. PUT - /customer/update - update customer

4. GET - /customer/orders/orderid/{orderid} - get order by orderid
5. GET - /customer/orders/userid/{userid} - get all orderitems from userid



# Unprotected Routes

## Signup Controller
1. GET - /signup - signup new users

## Shop Controller
1. GET - /shop - get all items without sensitive relational data
2. GET - /shop/{page} - get 10 items of page number without sensitive relational data
3. GET - /shop/naturalsearch/{search string}/page/{page} - get 10 items of page number of item's with name like itemname using MySQL's algorithm
4. GET - /shop/criteria/{search string}/page/{page} - get 10 items of page number of item's with name like itemname using criteria builder to have multiple wildcard LIKE
# User 

## POST :add new user 

http://localhost:4000/user/

{
    "id":"9746464356",
    "full_name":"full_name",
    "house_name":"chennamala",
    "street_name":"bb", 
    "pincode":"686507",
    "district":1, 
    "block":2
}




## PATCH : edit user details 

http://localhost:4000/user/9746464356

{
    "full_name":"full_name",
    "house_name":"chennamala",
    "street_name":"bb", 
    "pincode":"686507",
    "district":1, 
    "block":2
}

## GET userdetails
http://localhost:4000/user/9746464356

## GET - all users
http://localhost:4000/user/

json array will get as response 





# Products 

## 1. GET - all products 

localhost:4000/products/


## 1. GET - products with district and block

localhost:4000/products/products-with-location/
{
    "district":1, 
    "block":1
}



## 2. GET - get single  products

localhost:4000/products/wwjas

## 3. POST - create a new product 

localhost:4000/products/

{
    "name":"kannappi",
    "description": "desc",
    "category": 1,
    "price": 10,
    "grade": 1,
    "show_or_hide": 1,
    "stock": 1,
    "district": 1,
    "block": 1 ,
    "image_url":"bla"
}


## 4. PATCH - edit a product 

localhost:4000/products/bla

{
    "name":"kannappi222",
    "description": "des22c",
    "category": 1,
    "price": 10,
    "grade": 1,
    "show_or_hide": 1,
    "stock": 1,
    "district": 1,
    "block": 1 ,
    "image_url":"bla"
}


## 4. DELETE - to delete a product 

localhost:4000/products/bla


# Cart 

## GET - get all carts

localhost:4000/cart/

get response as jsonarray

## GET - get specific cart with userID carts

localhost:4000/cart/9746464356

## POST - to add new item to cart 

localhost:4000/cart/

To add new item to cart only 

{
  "product_id":"bla", 
  "quantity":1, 
  "user_id":"9746464356", 
  "ordered_or_not":1
}


## PATCH - to edit items in the cart 

used to change count . 

we can send phone number as id 


localhost:4000/cart/9746464356

{
  "product_id":"ww", 
  "quantity":11, 
  "user_id":"9746464356", 
  "ordered_or_not":1
}


## DELETE - to delete item with cart ID 

Here we need to send cart id not user id 

localhost:4000/cart/9746464356165242237244717


# Orders 
## POST - to post new order
post orders 

order is placed only if the item is in the cart 

`IMPORTANT : do the logic in the frontend , if the cart is empty do not show order button  `

localhost:4000/orders/

{
  "user_id":"9746464356", 
  "slot":"1",
  "total_amount":10,
  "status":1,
  "payment_id":"test_payment"
}



## GET - to get orders for users with their phone number 

localhost:4000/orders/9746464356
## GET - to get all orders to deliver
localhost:4000/orders/




# delivery

## GET - get delivery with body block and district 

localhost:4000/delivery/

{
    "district":1,
    "block":2
}



## GET - get delivery with body block and district 

localhost:4000/delivery/

{
    "district":1,
    "block":2
}

## GET - get delivery with body district 

localhost:4000/delivery/districtwise/

{
    "district":1
}


## PATCH - to post delivered from delivery boy 

localhost:4000/delivery/delivered/orderId


## PATCH - to post delivered from delivery boy 

localhost:4000/delivery/cancel/orderId

## To get all order details with order id . 

use order_details_table_id fot it 

localhost:4000/delivery/get-product-with-order-id/9746464356165245350983064

## To get all orders includes ordered , delivered, canceled

localhost:4000/delivery/get-delivered-not-delivered-and-cancelled/
{
    "district":1,
    "block":2,
    "status":1
}

where use status : 
// 1- order placed
// 2- delivered
// 3- canceled

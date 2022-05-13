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

## 2. GET - get single  products

localhost:4000/products/wwjas

## 3. POST - create a new product 

localhost:4000/products/

{
    "id":"bla",
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
    "id":"bla",
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


## DELETE - to delete item with cRT ID 

Here we need to send cart id not user id 

localhost:4000/cart/9746464356165242237244717
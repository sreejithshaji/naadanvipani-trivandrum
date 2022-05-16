
const express = require( 'express');
const router  = express.Router();
const {pool} = require('./db-functions/db')



function randomIdGenerator(userId){    
    const getUnixTime =  Math.floor(new Date().getTime() / 1000);
    const randomNumber = Math.floor(Math.random()*(90000-1+1)+1)

    // console.log(userId+''+getUnixTime+''+randomNumber);
    
    return userId+''+getUnixTime+''+randomNumber;
}



router.get('/' , (req , res , next ) =>{

    // to get delivery with block and district 

    const { district, block } = req.body;

    const query = `SELECT order_details.id, order_details.user_id, order_details.total_amount, order_details.provider, order_details.slot, order_details.status, order_details.timeslot, order_details.payment_id, order_details.created_at, order_details.modified_at,
        users.full_name
        FROM public.order_details 
        JOIN users ON users.id=order_details.user_id
        WHERE order_details.status=1 AND users.district=${district} AND users.block=${block}
        ;`
    

    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else {
            res.status(201).send(results.rows)
        }
        
    })
});
router.get('/districtwise/' , (req , res , next ) =>{
    
    // gets all orders to deliver 

    const { district } = req.body;

    const query = `SELECT order_details.id, order_details.user_id, order_details.total_amount, order_details.provider, order_details.slot, order_details.status, order_details.timeslot, order_details.payment_id, order_details.created_at, order_details.modified_at,
        users.full_name
        FROM public.order_details 
        JOIN users ON users.id=order_details.user_id
        WHERE order_details.status=1 AND district=${district}
        ;`
    
    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else {
            res.status(201).send(results.rows)
        }
        
    })
});
router.get('/get-delivered-not-delivered-and-cancelled/' , (req , res , next ) =>{
    
    // gets all orders to deliver 

    // 1- order placed
    // 2- delivered
    // 3- canceled

    const { district, status } = req.body;

    const query = `SELECT order_details.id, order_details.user_id, order_details.total_amount, order_details.provider, order_details.slot, order_details.status, order_details.timeslot, order_details.payment_id, order_details.created_at, order_details.modified_at,
        users.full_name
        FROM public.order_details 
        JOIN users ON users.id=order_details.user_id
        WHERE district=${district} AND status='${status}'
        ;`
    
    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else {
            res.status(201).send(results.rows)
        }
        
    })
});




router.get('/get-product-with-order-id/:orderDetailsTableorderId' , async (req , res , next ) =>{
    
    // gets all products with order id 
    const orderDetailsTableorderId = req.params.orderDetailsTableorderId;

    
    const query = `SELECT id, product_id, order_details_id, quantity, slot, user_id, created_at, modified_at
                FROM public.order_items WHERE order_details_id='${orderDetailsTableorderId}' ;`;

    pool.query( query, (error, results) => {
                    if (error) 
                    {
                        res.status(400).send(`error: ${error}`) 
                    }
                    else {
                        res.status(201).send(results.rows)
                    }
    })


          
});









router.patch('/delivered/:orderId' , (req , res , next ) =>{
    
    // gets all orders to deliver 

    const orderId = req.params.orderId;

    // const { district } = req.body;

    const query = `UPDATE public.order_details
	SET status=2 , modified_at=CURRENT_TIMESTAMP
	WHERE id='${orderId}';`
    
    

    
    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else {
            res.status(201).send("delivered order with id : ", orderId  );
        }
        
    })
});


router.patch('/cancel/:orderId' , (req , res , next ) =>{
    
    // gets all orders to deliver 

    const orderId = req.params.orderId;

    // const { district } = req.body;

    const query = `UPDATE public.order_details
	SET status=3 , modified_at=CURRENT_TIMESTAMP
	WHERE id='${orderId}'; `

    
    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else {
            res.status(201).send("cancelled order with id : ", orderId  );
        }
        
    })
});

module.exports = router;


// order confirmed and not delivered status=1
// order delivered status=2

// order canelled status=3
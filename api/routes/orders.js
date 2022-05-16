
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
    
    // gets all orders to deliver 

    // const { district , block } = req.body;

    const query = `SELECT order_details.id, order_details.user_id, order_details.total_amount, order_details.provider, order_details.slot, order_details.status, order_details.timeslot, order_details.payment_id, order_details.created_at, order_details.modified_at,
        users.full_name, users.block, users.district
        FROM public.order_details 
        JOIN users ON users.id=order_details.user_id
        WHERE order_details.status=1 
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















router.get('/:userId' , (req , res , next ) =>{

    const userId = req.params.userId;
    
    const query = `SELECT id, user_id, total_amount, provider, slot, status, timeslot, payment_id, created_at, modified_at
	FROM public.order_details WHERE status=1 AND user_id='${userId}' ;`

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



router.post('/' , (req , res , next ) =>{

    const { user_id, slot, total_amount, status, payment_id } = req.body;
    console.log("details : ", user_id, slot, total_amount, status, payment_id )
    // here we first read from cart 

    // const query = `SELECT id, product_id, quantity, slot, user_id, created_at, modified_at
	// FROM public.order_items;`


    const DeleteFromCart =(order_id) =>{
        const query = ` DELETE FROM public.cart_item
	                    WHERE user_id='${user_id}';`

    
        pool.query(query,  (error, results) => {
            if (error) 
            {
                res.status(400).send(`error: ${error}`) 
            }
            else 
            {
                // if(successCount!=0)
                // {
                    console.log("yea baby!!");
                    res.status(201).send(`order placed with id : ${order_id} `)
                // }

                // res.status(201).send(results.rows)
                
            }
            
        })

    }

    const fetchCart = (order_id)=>{
        // Fetch from cart
        const query = `SELECT cart_item.id, cart_item.product_id, cart_item.quantity, cart_item.user_id, cart_item.ordered_or_not, cart_item.created_at, cart_item.modified_at,
        product.name, product.price, product.image_url
        FROM public.cart_item JOIN product ON cart_item.product_id=product.id WHERE cart_item.user_id='${user_id}' ;`
        pool.query(query,  (error, results) => {
            if (error) 
            {
                res.status(400).send(`error: ${error}`) 
            }
            else 
            {
                var successCount=0;
                results.rows.forEach(element => {
                    var countRet = MoveItemsTo_order_itemsTable(element, slot, order_id);
                    successCount+=countRet;
                });

                // if(successCount!=0)
                // {
                    // console.log("yea baby!!");
                    // res.status(201).send(`order placed with id : ${order_id} `)
                // }

                // res.status(201).send(results.rows)
                DeleteFromCart(user_id , order_id );
            }
            
        })
        // Fetch from cart
    }
    




    const MoveItemsTo_order_itemsTable = (each_rows, slot, order_id)=>{
        var count=0;
        console.log("MoveItemsTo_order_itemsTable : ", each_rows);
        const id = randomIdGenerator(user_id)

        const query = `INSERT INTO public.order_items(
            id, product_id, order_details_id, quantity, slot, user_id, created_at)
            VALUES ('${id}', '${each_rows.product_id}' , '${order_id}' , ${each_rows.quantity}, '${slot}', '${user_id}', CURRENT_TIMESTAMP);`
            
        pool.query(query,  (error, results) => {
                if (error) 
                {
                    res.status(400).send(`error: ${error}`) 
                }
                else {
                    count++;
                }
                
        })

        console.log("MoveItemsTo_order_itemsTable returns count :  ", count);

        return count;
    }



    

    const AddItemsTo_order_detailsTable = () =>{
        

        
        const id = randomIdGenerator(user_id)

        console.log("order post called ");

        const query=`INSERT INTO public.order_details(
            id, user_id, total_amount, provider, slot, status, timeslot, payment_id, created_at)
            VALUES ('${id}','${user_id}' , ${total_amount} ,NULL , ${slot}, ${status}, NULL, '${payment_id}', CURRENT_TIMESTAMP);`;

        pool.query(query,  (error, results) => {
                if (error) 
                {
                    res.status(400).send(`error in AddItemsTo_order_detailsTable function : ${error}`) 
                }
                else {
                    console.log(" added items to order table  ");
                    fetchCart(id);
                }
                
        })

    }

    AddItemsTo_order_detailsTable();



});


router.patch('/' , (req , res , next ) =>{

    // const query = `SELECT id, product_id, quantity, slot, user_id, created_at, modified_at
	// FROM public.order_items;`


    // pool.query(query, (error, results) => {
    //     if (error) 
    //     {
    //         res.status(400).send(`error: ${error}`) 
    //     }
    //     else {
            res.status(201).send(results.rows)
    //     }
        
    // })

});









module.exports = router;
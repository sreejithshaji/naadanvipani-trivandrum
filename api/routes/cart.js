
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

    const query = `SELECT cart_item.id, cart_item.product_id, cart_item.quantity, cart_item.user_id, cart_item.ordered_or_not, cart_item.created_at, cart_item.modified_at,
	product.name, product.price, product.image_url
	FROM public.cart_item JOIN product ON cart_item.product_id=product.id  ;`


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

    
    const query = `SELECT cart_item.id, cart_item.product_id, cart_item.quantity, cart_item.user_id, cart_item.ordered_or_not, cart_item.created_at, cart_item.modified_at,
	product.name, product.price, product.image_url
	FROM public.cart_item JOIN product ON cart_item.product_id=product.id WHERE cart_item.user_id='${userId}' ;`


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




router.post('/' , async (req , res , next ) =>{

    const { product_id, quantity, user_id, ordered_or_not } = req.body;


    // only add items to cart if it does not exists . Else not added 
    const getCartItems = (userId) =>{            
        const query = `SELECT cart_item.id, cart_item.product_id, cart_item.quantity, cart_item.user_id, cart_item.ordered_or_not, cart_item.created_at, cart_item.modified_at,
        product.name, product.price, product.image_url
        FROM public.cart_item JOIN product ON cart_item.product_id=product.id WHERE cart_item.user_id='${userId}' ;`


        pool.query(query, (error, results) => {
            if (error) 
            {
                res.status(400).send(`error: ${error}`) 
            }
            else {
                res.status(201).send(results.rows)
            }
            
        })

    }



    const patchCart = (existance)=>{
        if(existance)
        {
            const query = `UPDATE public.cart_item
            SET quantity=${quantity}, modified_at=CURRENT_TIMESTAMP
            WHERE user_id='${user_id}' AND product_id='${product_id}' ;`;

            pool.query(query, (error, results) => {
                if (error) 
                {
                    res.status(400).send(`error: ${error}`) ;
                }
                else {
                    // res.status(201).send(`post called at cart: edited with ID: ${user_id}`)
                    getCartItems(user_id)
                }
            })

        }
        else
        {
            res.status(400).send(` cart item does not exists for user: ${user_id}`)
        }
    }


    const addToCart= (existance) =>{
        if(existance)
        {
            patchCart(existance)
            // res.status(400).send(`cart item already exists for user: ${user_id}`)
        }
        else{

            const cart_id = randomIdGenerator(user_id);
            
            console.log(cart_id ,product_id, quantity, user_id, ordered_or_not )

            
            const query = `INSERT INTO public.cart_item(
                id, product_id, quantity, user_id, ordered_or_not, created_at)
                VALUES ('${cart_id}', '${product_id}', ${quantity}, '${user_id}', ${ordered_or_not}, CURRENT_TIMESTAMP);`;
                

            pool.query(query, (error, results) => {
                if (error) 
                {
                    res.status(400).send(`error: ${error}`) 
                }
                else{
                    // res.status(201).send(`cart item added with ID: ${cart_id}`)
                    getCartItems(user_id)
                }
                
            })
        }
    }

    const checkExistance=()=>{

        const query = `select exists(select 1 from public.cart_item where user_id='${user_id}' and product_id='${product_id}' )`;

        pool.query(query, (error, results) => {
            if (error) 
            {
                res.status(400).send(`error: ${error}`) ;
            }
            else {
                
                var res_row1= results.rows[0];

                var alreadyExists = res_row1.exists;
                addToCart( alreadyExists );
            }
        })
    }
    
    await checkExistance();




});




router.patch('/:userId' , async (req , res , next ) =>{
    // first we check if the item exists .
    // if it exists we patch the item 
    // else not patched

    const userId = req.params.userId;

    const { product_id, quantity, user_id } = req.body;

    const patchCart = (existance)=>{
        if(existance)
        {
            const query = `UPDATE public.cart_item
            SET quantity=${quantity}, modified_at=CURRENT_TIMESTAMP
            WHERE user_id='${userId}' AND product_id='${product_id}' ;`;

            pool.query(query, (error, results) => {
                if (error) 
                {
                    res.status(400).send(`error: ${error}`) ;
                }
                else {
                    res.status(201).send(`cart item edited with ID: ${userId}`)
                }
            })

        }
        else
        {
            res.status(400).send(`cart item does not exists for user: ${user_id}`)
        }
    }
    
    const checkExistance=()=>{

        const query = `select exists(select 1 from public.cart_item where user_id='${user_id}' AND product_id='${product_id}'  )`;

        pool.query(query, (error, results) => {
            if (error) 
            {
                res.status(400).send(`error: ${error}`) ;
            }
            else {
                
                var res_row1= results.rows[0];
                
                var alreadyExists = res_row1.exists;
                patchCart( alreadyExists );
            }
        })
    }
    
    await checkExistance();




});





router.delete('/:cartId' , (req , res , next ) =>{



    const getCartItems = (userId) =>{            
        const query = `SELECT cart_item.id, cart_item.product_id, cart_item.quantity, cart_item.user_id, cart_item.ordered_or_not, cart_item.created_at, cart_item.modified_at,
        product.name, product.price, product.image_url
        FROM public.cart_item JOIN product ON cart_item.product_id=product.id WHERE cart_item.user_id='${userId}' ;`


        pool.query(query, (error, results) => {
            if (error) 
            {
                res.status(400).send(`error: ${error}`) 
            }
            else {
                res.status(201).send(results.rows)
            }  
        })
    }

    const cartId = req.params.cartId;
    
    const {  user_id } = req.body;

    const query = `DELETE FROM public.cart_item
	WHERE id='${cartId}' ;`


    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else {
            // res.status(201).send(`cart item deleted with id: ${cartId}`)
            getCartItems(user_id)
        }
        
    })

});

module.exports = router;
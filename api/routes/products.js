
const express = require( 'express');
const router  = express.Router();
const {pool} = require('./db-functions/db')




function randomIdGenerator(parameter_to_add){    
    
    parameter_to_add = parameter_to_add.replace(/\s/g, '');

    const getUnixTime =  Math.floor(new Date().getTime() / 1000);
    const randomNumber = Math.floor(Math.random()*(90000-1+1)+1)

    // console.log(parameter_to_add+''+getUnixTime+''+randomNumber);
    
    return parameter_to_add+''+getUnixTime+''+randomNumber;
}





router.get('/' , (req , res , next ) =>{


    const query = `SELECT id, name, description, category, price, quantity, grade, discount_id, show_or_hide, stock, district, block, created_at, modified_at, image_url
	FROM public.product;`

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

router.post('/products-with-location/' , (req , res , next ) =>{

    const { district, block } = req.body;
    // console.log(district, block)

    const query = `SELECT id, name, description, category, price, quantity, grade, discount_id, show_or_hide, stock, district, block, created_at, modified_at, image_url
	FROM public.product WHERE district=${district} ;`

    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else {
            console.log(results.rows)
            res.status(201).send(results.rows)
        }
        
    })

});


router.get('/:productId' , (req , res , next ) =>{
    const productId = req.params.productId;

    const query = `SELECT id, name, description, category, price, quantity, grade, discount_id, show_or_hide, stock, district, block, created_at, image_url, modified_at
	FROM public.product WHERE id='${productId}' ;`

    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else {
            res.status(201).send(results.rows[0])
        }
        
    })

    // res.status(200).json({
    //     "message":"products : get product id is "+ productId
    // })
});




router.post('/' , (req , res , next ) =>{

    const { name, description, category, price, grade, show_or_hide, stock, district, block, image_url  } = req.body;

    console.log( name, description, category, price, grade,  show_or_hide, stock, district, block, image_url );
    // const query =`INSERT INTO public.product(id, name, description, category, price, quantity, grade, discount_id, show_or_hide, stock, district, block, created_at)
    //     VALUES ( ${id}, '${name}', '${description}', '${category}', ${price}, ${quantity}, ${grade},  ${discount_id}, ${show_or_hide}, ${stock}, ${district}, ${block}, CURRENT_TIMESTAMP);`;

    const id = randomIdGenerator(name)

    const query= `INSERT INTO public.product(
        id, name, description, category, price, grade, show_or_hide, stock, district, block, image_url, created_at)
        VALUES ('${id}', '${name}', '${description}', '${category}', ${price}, ${grade}, ${show_or_hide}, ${stock}, ${district}, ${block}, '${image_url}', CURRENT_TIMESTAMP);`;
        
    pool.query(query, (error, results) => {
            if (error) 
            {
                res.status(400).send(`error: ${error}`) 
            }
            else{
                res.status(201).send(`Product added with ID: ${id}`)
            }      
    })
});



router.patch('/:productId' , (req , res , next ) =>{

    const productId = req.params.productId;
    
    const { id, name, description, category, price, grade, show_or_hide, stock, district, block, image_url  } = req.body;

    console.log( id, name, description, category, price, grade,  show_or_hide, stock, district, block, image_url );
    // const query =`INSERT INTO public.product(id, name, description, category, price, quantity, grade, discount_id, show_or_hide, stock, district, block, created_at)
    //     VALUES ( ${id}, '${name}', '${description}', '${category}', ${price}, ${quantity}, ${grade},  ${discount_id}, ${show_or_hide}, ${stock}, ${district}, ${block}, CURRENT_TIMESTAMP);`;

    const query= `UPDATE public.product
	SET name= '${name}', description='${description}', category='${category}', price=${price},  grade=${grade}, show_or_hide=${show_or_hide}, stock=${stock}, district=${district}, block=${block}, image_url='${image_url}' ,modified_at=CURRENT_TIMESTAMP
	WHERE id='${productId}';`;
        
        pool.query(query, (error, results) => {
            if (error) 
            {
                res.status(400).send(`error: ${error}`) 
            }
            else{
                res.status(201).send(`Product edited with ID: ${id}`)
            }
            
        })    

});



router.delete('/:productId' , (req , res , next ) =>{

    const productId = req.params.productId;

    const query = `DELETE FROM public.product WHERE id='${productId}';`;

    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else{
            
            res.status(200).json({
                "message":`deleted product with id ${productId}`
            })
        }
        
    })  


});



module.exports = router;
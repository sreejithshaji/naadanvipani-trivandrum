const express = require( 'express');
const router  = express.Router();
const {pool} = require('./db-functions/db')



router.get('/' , (req , res , next ) =>{


    const query = `SELECT id, full_name, house_name, street_name, pincode, district, block, created_at, modified_at
	FROM public.users;`

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


router.get('/:userID' , (req , res , next ) =>{
    const userID = req.params.userID;
    const query = `SELECT id, full_name, house_name, street_name, pincode, district, block, created_at, modified_at
	FROM public.users WHERE id='${userID}' ;`
    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else{
            res.status(201).send(results.rows[0])
        }
        
    })

});



router.post('/' , async (req , res , next ) =>{
    
    const { id, full_name , house_name, street_name, pincode, district, block  } = req.body

    console.log( id, full_name , house_name, street_name, pincode, district, block  )

    const query = `INSERT INTO public.users(
        id, full_name, house_name, street_name, pincode, district, block , created_at)
        VALUES (${id}, '${full_name}', '${house_name}', '${street_name}', '${pincode}', ${district}, ${block}, CURRENT_TIMESTAMP );`;

    

    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else{
            res.status(201).send(`User added with ID: ${id}`)
        }
        
    })

});




router.patch('/:userID' , (req , res , next ) =>{

    const userID = req.params.userID;

    const { id, full_name , house_name, street_name, pincode, district, block  } = req.body

    console.log( id, full_name , house_name, street_name, pincode, district, block  )
    
    const query =`UPDATE public.users
                SET full_name='${full_name}', house_name='${house_name}', street_name='${street_name}', pincode='${pincode}', district=${district}, block=${block}, modified_at=CURRENT_TIMESTAMP
                WHERE id='${userID}';`


    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else{
            res.status(201).send(`User patched with ID: ${userID}`)
        }
        
    })
});



router.delete('/:userID' , (req , res , next ) =>{

    const userID = req.params.userID;

    const query =`DELETE FROM public.users WHERE id='${userID}';`;

    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else{
            res.status(201).send(`User deleted with ID: ${userID}`)
        }
    })
});



module.exports = router;
const express = require( 'express');
const router  = express.Router();
const {pool} = require('./db-functions/db')



router.get('/' , (req , res , next ) =>{


    const query = `SELECT id, full_name, house_name, street_name, pincode, district, block, created_at, modified_at, delivery_point
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
    const query = `SELECT id, full_name, house_name, street_name, pincode, district, block, created_at, modified_at, delivery_point
	FROM public.users WHERE id='${userID}' ;`
    // console.log("called user ")
    pool.query(query, (error, results) => {
        if (error) 
        {
            res.status(400).send(`error: ${error}`) 
        }
        else{
            // console.log("results.rowslength : ", results.rows.length );
            if (results.rows.length >0)
            {
                res.status(201).send(results.rows[0])
            }
            else {
                res.status(201).send({"full_name":"notfound"})
            }
            
        }
        
    })

});




router.post('/' , async (req , res , next ) =>{
    
    const { id, full_name , house_name, street_name, pincode, district, block, delivery_point  } = req.body

    // if (checkExistance(id)){
    //     console.log(" already user exists : ",id);
    //     res.status(201).send({"already exists":true})
    // }
    // else{

    //     console.log( id, full_name , house_name, street_name, pincode, district, block  )

    //     const query = `INSERT INTO public.users(
    //         id, full_name, house_name, street_name, pincode, district, block , created_at)
    //         VALUES (${id}, '${full_name}', '${house_name}', '${street_name}', '${pincode}', ${district}, ${block}, CURRENT_TIMESTAMP );`;

    //     pool.query(query, (error, results) => {
    //         if (error) 
    //         {
    //             res.status(400).send(`error: ${error}`) 
    //         }
    //         else{
                
    //             res.status(201).send(req.body)
    //         }
            
    //     })
    // }

    // -----------------------------

    const patchUser = (existance) =>{
        if(existance)
        {
            // const userID = id;
            const { id, full_name , house_name, street_name, pincode, district, block ,delivery_point } = req.body
            console.log( id, full_name , house_name, street_name, pincode, district, block, delivery_point  )
            const query =`UPDATE public.users
                        SET full_name='${full_name}', house_name='${house_name}', street_name='${street_name}', pincode='${pincode}', district=${district}, block=${block}, delivery_point=${delivery_point} ,modified_at=CURRENT_TIMESTAMP
                        WHERE id='${id}';`

            pool.query(query, (error, results) => {
                if (error) 
                {
                    res.status(400).send(`error: ${error}`) 
                }
                else{
                    res.status(201).send(`User patched with ID: ${id}`)
                }
                
            })

        }
        else
        {
            res.status(400).send(`user does not exists for user: ${id}`)
        }   
    }


    const addUser = (existance) =>{
        if(existance)
        {
            patchUser(existance)
        }
        else{
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
                    res.status(201).send(req.body)
                }
                
            })
        }
        
    }

    const checkExistance=(user_id)=>{
        const query = `select exists(select 1 from public.users where id='${user_id}' )`;    
        pool.query(query, (error, results) => {
            if (error) 
            {
                res.status(400).send(`error: ${error}`) ;
            }
            else 
            {   
                console.log(" user exists ")
                var res_row1= results.rows[0];
                var alreadyExists = res_row1.exists;
                console.log("existance : ", alreadyExists)
                addUser(alreadyExists);
            }
        })
    }

    await checkExistance(id);


});




router.patch('/:userID' , (req , res , next ) =>{

    const userID = req.params.userID;

    const { id, full_name , house_name, street_name, pincode, district, block, delivery_point  } = req.body

    console.log( id, full_name , house_name, street_name, pincode, district, block,delivery_point  )
    
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
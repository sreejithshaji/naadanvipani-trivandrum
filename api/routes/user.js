
const Pool = require('pg').Pool

  

const express = require( 'express');
const router  = express.Router();



router.get('/' , (req , res , next ) =>{
    res.status(200).json({
        "message":"get request called at user.js"
    })
});


router.get('/:productId' , (req , res , next ) =>{
    const poductId = req.params.productId;
    res.status(200).json({
        "message":"products : get user id is "+ poductId
    })
});




router.post('/' , async (req , res , next ) =>{

    // SELECT id, full_name, house_name, street_name, pincode, district, block FROM public.users;

    const pool = new Pool({
        user: 'abcduser',
        host: 'postgres-runner',
        database: 'abcduser',
        password: 'abcdpsw',
        port: 5432,
    })
    
    const client = await pool.connect();
    
    const { id, full_name , house_name, street_name, pincode, district, block  } = req.body

    const query = `INSERT INTO public.users( id, full_name, house_name, street_name, pincode, district, block, created_at, modified_at) 
    VALUES (${id}, ${full_name} , ${house_name}, ${street_name}, ${pincode}, ${district}, ${block});`;


    // pool.query(query, (error, results) => {
    //     if (error) 
    //     {
    //         throw error
    //     }
    //     res.status(201).send(`User added with ID: ${result.insertId}`)
    // })

    

    res.status(200).json({
        "message":"post request called at products.js",
        "data":`${id} ,${full_name} ${house_name}  `
    })

});





router.patch('/:productId' , (req , res , next ) =>{
    res.status(200).json({
        "message":"patch request called at products.js"
    })
});



router.delete('/:productId' , (req , res , next ) =>{
    res.status(200).json({
        "message":"delete request called at products.js"
    })
});



module.exports = router;
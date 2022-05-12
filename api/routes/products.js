
const express = require( 'express');
const router  = express.Router();
// the above lines will give us the ability to 
// handle many routing features

// the router.get will handle the get requests in the products.js ,
router.get('/' , (req , res , next ) =>{
    res.status(200).json({
        "message":"get request called at products.js"
    })
});


// the below router `router.get('/:productId' ...`
// will cath the get requests with a productId given to it 
// this is used to return product details of the productId
router.get('/:productId' , (req , res , next ) =>{
    const poductId = req.params.productId;

    res.status(200).json({
        "message":"products : get product id is "+ poductId
    })
});



// the router.post will handle the post requests in the products.js ,
router.post('/' , (req , res , next ) =>{
    // used to add new product
    res.status(200).json({
        "message":"post request called at products.js"
    })
});

// the router.patch will handle the patch requests in the products.js ,
router.patch('/:productId' , (req , res , next ) =>{
    // used to edit a product details 
    res.status(200).json({
        "message":"patch request called at products.js"
    })
});

// the router.delete will handle the delete requests in the products.js ,
router.delete('/:productId' , (req , res , next ) =>{
    res.status(200).json({
        "message":"delete request called at products.js"
    })
});



module.exports = router;
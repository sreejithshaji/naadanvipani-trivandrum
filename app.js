







const express = require('express');
const app = express()

// use is the middleware that we use .
//  So all the calls (incoming requsets) to app.js will go to this use method
app.use( (req , res , next ) =>{
    // req is the incoming request 
    // res is the response we want to return 
    // next is the function to be run when there is an incoming request 
    // here next calls the middleware function

    //  now lets try it will work or not by adding a response with status 200

    res.status(200).json({
        'message':'hello world a'
    })
})

// module.exports = app; =  this line will export the app function 
// so that we cana access it or import it from other function
// or other codes 

module.exports = app;

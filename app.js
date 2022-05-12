

const express = require('express');
const app = express()




// cors and body parser START


const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())
// cors and body parser END





const productRoutes = require('./api/routes/products');
app.use('/products' ,  productRoutes );

const userRoutes = require('./api/routes/user');
app.use('/user' ,  userRoutes );



module.exports = app;

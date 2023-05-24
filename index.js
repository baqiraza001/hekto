require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

//controllers
const userController = require("./controllers/users")
const productController = require("./controllers/products")
const categoriesController = require("./controllers/categories")
const brandsController = require("./controllers/brands")

//app.use
app.use(express.json());
app.use(cors());
app.use('/api/users', userController);
app.use('/api/products', productController);
app.use('/api/categories', categoriesController);
app.use('/api/brands', brandsController);

mongoose.connect(process.env.MONGODB_CONNECTION_URI).then(() => {
    console.log('database connected successfully')
}).catch( error => {
    console.log(error)
})


app.all('*', (req, res) => {
    res.send('Page Not Found')
});

app.listen(5000, function() {
    console.log('server is listening at 5000')
})

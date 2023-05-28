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
const reviewsController = require("./controllers/reviews")
const configurationController = require("./controllers/configuration")

//app.use
app.use(express.json());
app.use(cors());
app.use('/content', express.static('content/'));
app.use('/api/users', userController);
app.use('/api/products', productController);
app.use('/api/categories', categoriesController);
app.use('/api/brands', brandsController);
app.use('/api/reviews', reviewsController);
app.use('/api/configuration', configurationController);

mongoose.connect(process.env.MONGODB_CONNECTION_URI).then(() => {
    console.log('database connected successfully')
}).catch(error => {
    console.log(error)
})


app.all('*', (req, res) => {
    res.send('Page Not Found')
});

app.use((err, req, res, next) => {
    if (err)
        res.status(400).json({ error: err.message });
    else
        next();
})

app.listen(5000, function () {
    console.log('server is listening at 5000')
})

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

//controllers
const userController = require("./controllers/users")

//app.use
app.use(express.json());
app.use(cors());
app.use('/api/users', userController);

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

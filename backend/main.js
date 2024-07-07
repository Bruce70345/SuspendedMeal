require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const request = require('request');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/freeMeals', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    });

app.get('/api', (req, res) => {
    res.send('Hello from Express!');
});


// 引入路由
const userRoutes = require('./routes/usersRoute');
const productRoutes = require('./routes/productsRoute');
const signRoutes = require('./routes/signRoute');

// 使用路由
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sign', signRoutes);



app.listen(1000, () => {
    console.log('Server is running on port 1000');
});
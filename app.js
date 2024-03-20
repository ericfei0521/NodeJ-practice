const path = require('path');

const errorControllers = require('./controllers/errors');
const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
// const User = require('./models/user');

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next) => {
//     User.findById('65cb30538e95f26efd7c92d1')
//         .then((user) => {
//             req.user = new User(user.name, user.email, user.cart, user._id);
//             next();
//         })
//         .catch((err) => {
//             console.log(err);
//             next();
//         });
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorControllers.get404page);

// mongoConnect(() => {
//     app.listen(3000);
// });
mongoose
    .connect(
        `mongodb+srv://techpit001:${env.parsed.MONGO_PWD}@cluster0.4oejlpu.mongodb.net/shop?retryWrites=true&w=majority`
    )
    .then((result) => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

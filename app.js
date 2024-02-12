const path = require('path');

const errorControllers = require('./controllers/errors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { mongoConnect } = require('./util/database');

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    // User.findByPk('eric001')
    //     .then((user) => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch((err) => console.log(err));
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorControllers.get404page);
console.log(mongoConnect);

mongoConnect(() => {
    app.listen(3000);
});

const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const dotenv = require('dotenv');

const route = require('./routes/index.route');
const db = require('./config/db/index.db');

const app = express();
dotenv.config();
db.connect();

const port = process.env.PORT||3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

route(app);

app.listen(port, () => {
    console.log("App is listening port ", port)
})

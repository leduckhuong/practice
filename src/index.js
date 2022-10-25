const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

const route = require('./routes/index.route');

const app = express();
dotenv.config();

const port = process.env.port||3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

route(app);

app.listen(port, () => {
    console.log("App is listening port ", port)
})

const express = require('express');

const app = express();
const port = process.env.port||3000;

app.get('/', (req, res) => {
    res.send('oce')
})

app.listen(port, () => {
    console.log("App is listening port ", port)
})

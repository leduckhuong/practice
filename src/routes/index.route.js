const login = require('./branchs/login.branch');

module.exports = function route(app) {
    app.use('/login', login);
    app.get('/', (req, res) => {
        res.render('index');
    })
}
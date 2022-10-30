const login = require('./branchs/login.branch');
const register = require('./branchs/register.branch');
const user = require('./branchs/user.branch');

module.exports = function route(app) {
    app.use('/user', user);
    app.use('/login', login);
    app.use('/register', register);
    app.get('/',(req, res) => {
        res.render('index');
    })
}
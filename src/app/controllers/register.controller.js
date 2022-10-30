const UserModel = require('../models/User.model');
class Register {
    // [GET] /register
    index(req, res, next) {
        res.render('partials/authentication/register');
    }
}
module.exports = new Register();
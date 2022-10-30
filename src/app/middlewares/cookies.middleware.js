const UserModel = require("../models/User.model");

class Cookies {
    check(req, res, next) {
        if(!req.signedCookies['user-id']){
            res.redirect('/login');
            return;
        }
        const user = UserModel.findById(req.signedCookies['user-id']);
        if(!user) {
            res.redirect('/login');
            return;
        }
        next();
    }
}

module.exports = new Cookies();
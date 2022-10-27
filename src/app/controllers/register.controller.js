const User = require('../models/User.model');
const CryptoJS = require("crypto-js");
class Register {
    index(req, res, next) {
        res.render('partials/authentication/register');
    }
    register(req, res, next) {
        const password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        const data = {
            ...req.body,
            password
        }
        const user = new User(data);
        user.save()
            .then((data) => {
                res.send(data);
            })
            .catch(err => next(err))
    }
}
module.exports = new Register();
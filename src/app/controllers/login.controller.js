const User = require('../models/User.model');
const CryptoJS = require("crypto-js");
class Login {
    index(req, res, next) {
        res.render('partials/authentication/login');
    }
    login(req, res, next) {
        const password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString();
        const data = {
            ...req.body,
            password
        }
        const user = new User(data);
        user.save()
            .then(() => {
                res.send(password);
            })
            .catch(err => next(err))
    }
}
module.exports = new Login();
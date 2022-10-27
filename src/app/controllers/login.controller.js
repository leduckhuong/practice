const User = require('../models/User.model');
const CryptoJS = require("crypto-js");
class Login {
    index(req, res, next) {
        res.render('partials/authentication/login');
    }
    login(req, res, next) {
        User.findOne({account: req.body.account})
            .then(user => {
                const cipher = user.password.toString();
                const bytes = CryptoJS.AES.decrypt(cipher, process.env.SECRET_KEY);
                const password = bytes.toString(CryptoJS.enc.Utf8);
                if(req.body.password === password) 
                res.send(password)
            })
            .catch(err => next(err))
    }
}
module.exports = new Login();
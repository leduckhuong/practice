const CryptoJS = require("crypto-js");
const UserModel = require('../models/User.model');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
class Login {
    // [GET] /login
    index(req, res, next) {
        let userAccount = req.cookies['user-account'];
        res.render('partials/authentication/login', {
            userAccount
        });
    }
    // [POST] /login
    register(req, res, next) {
        const password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        const data = {
            ...req.body,
            password
        }
        const user = new UserModel(data);
        user.save()
            .then(() => {
                res.cookie('user-account',req.body.account, {
                    expires: new Date(Date.now() + 3*60000)
                });
                res.redirect('/login')
            })
            .catch(err => next(err))
    }
}
module.exports = new Login();
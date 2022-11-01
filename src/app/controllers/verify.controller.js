const CryptoJS = require("crypto-js");
const UserModel = require("../models/User.model");

class Verify {
    //[POST] /verify/processing-login
    login(req, res, next) {
        UserModel.findOne({account: req.body.account})
            .then(user => {
                const cipher = user.password.toString();
                const bytes = CryptoJS.AES.decrypt(cipher, process.env.SECRET_KEY);
                const password = bytes.toString(CryptoJS.enc.Utf8);
                if(req.body.password === password) {
                    res.cookie('user-id', user._id.toString(), {
                        signed: true, 
                        expires: new Date(Date.now() + 3600000)
                    });
                    res.redirect('/user');
                } else {
                    res.render('partials/authentication/login', {
                        fail:'error'
                    })
                };
            })
            .catch(() => {
                res.render('partials/authentication/login', {
                    fail:'error'
                })
            })
    }
}

module.exports = new Verify();
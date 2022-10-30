const UserModel = require("../models/User.model");
const CryptoJS = require("crypto-js");

class User {
    // [POST] /user
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
                    res.render('index', {
                        isUser: true,
                        user
                    })
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
    // [GET] /user/:_id
    profile(req, res, next) {
        UserModel.findById({_id: req.params._id})
            .then(user => {
                res.render('partials/user/user', {
                    isUser: true,
                    user
                })
            })
            .catch(err => next(err))
    }
    // [PUT] /user/:_id
    update(req, res, next) {
        const data = req.body;
        data.avatar = '/' + req.file.path.split('\\').slice(2).join('/');
        UserModel.updateOne({ _id: req.params._id}, data)
            .then(() => res.redirect('back'))
            .catch(err => next(err))
    }
}
module.exports = new User();
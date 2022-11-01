const UserModel = require("../models/User.model");

class User {
    // [GET] /user
    index(req, res, next) {
        UserModel.findOne({_id: req.signedCookies['user-id']})
        .then(user => {
            res.render('index', {
                isUser: true,
                user
            });
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
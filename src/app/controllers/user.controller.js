const UserModel = require("../models/User.model");

class User {
    index(req, res, next) {
        UserModel.findById({_id: req.params._id})
            .then(user => {
                res.render('partials/user/user', {
                    isUser: true,
                    user
                })
            })
            .catch(err => next(err))
    }
    update(req, res, next) {
        const data = req.body;
        data.avatar = '/' + req.file.path.split('\\').slice(2).join('/');
        UserModel.updateOne({ _id: req.params._id}, data)
            .then(() => res.redirect('back'))
            .catch(err => next(err))
    }
}
module.exports = new User();
class User {
    index(req, res, next) {
        res.render('partials/user/user', {
            isLogin: true
        })
    }
}
module.exports = new User();
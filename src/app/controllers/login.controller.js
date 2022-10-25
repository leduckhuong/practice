class Login {
    index(req, res, next) {
        res.render('partials/authentication/login');
    }
}
module.exports = new Login();
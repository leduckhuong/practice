class Index {
    //[GET] /
    index(req, res) {
        res.render('index');
    }
    //[POST] /
    logout(req, res) {
        res.clearCookie('user-id', {
            signed: true
        })
        res.redirect('login');
    }
}

module.exports = new Index();

module.exports = function route(app) {
    app.get('/', (req, res) => {
        res.render('index');
    })
}
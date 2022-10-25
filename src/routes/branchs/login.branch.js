const router = require('express').Router();
const login = require('../../app/controllers/login.controller');

router.get('/', login.index);

module.exports = router;
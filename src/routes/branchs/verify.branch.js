const router = require('express').Router();
const verify = require('../../app/controllers/verify.controller');

router.post('/processing-login', verify.login);

module.exports = router;
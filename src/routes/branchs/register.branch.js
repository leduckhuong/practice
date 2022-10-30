const router = require('express').Router();
const register = require('../../app/controllers/register.controller');

router.get('/', register.index);

module.exports = router;
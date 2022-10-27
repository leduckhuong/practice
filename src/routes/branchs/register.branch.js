const router = require('express').Router();
const register = require('../../app/controllers/register.controller');

router.get('/', register.index);
router.post('/', register.register);

module.exports = router;
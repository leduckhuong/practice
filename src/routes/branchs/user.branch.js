const router = require('express').Router();
const user = require('../../app/controllers/user.controller');

router.get('/:_id', user.index);

module.exports = router;
const router = require('express').Router();
const index = require('../../app/controllers/index.controller');

router.post('/', index.logout);
router.get('/', index.index);

module.exports = router;
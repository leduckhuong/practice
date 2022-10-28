const router = require('express').Router();
const user = require('../../app/controllers/user.controller');
const uploadMiddleware = require('../../app/middlewares/upload.middleware');

router.get('/:_id', user.index);
router.post('/:_id', uploadMiddleware.single('avatar'), user.update);

module.exports = router;
const router = require('express').Router();
const user = require('../../app/controllers/user.controller');

const cookiesMiddleware = require('../../app/middlewares/cookies.middleware');
const uploadMiddleware = require('../../app/middlewares/upload.middleware');

router.get('/:_id', cookiesMiddleware.check, user.profile);
router.put('/:_id', uploadMiddleware.single('avatar'), user.update);
router.get('/', user.index);

module.exports = router;
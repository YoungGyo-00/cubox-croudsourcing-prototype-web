const express = require('express');
const { checkPermission } = require('../middlewares/user');

const Controller = require('../controllers/user');
const router = express.Router();

router.get('/:nickName', Controller.GetUserInfo);
/* router.patch('/:nickName', Controller.PatchUserInfo); */
router.delete('/:nickName', checkPermission, Controller.DeleteUser);

module.exports = router; 
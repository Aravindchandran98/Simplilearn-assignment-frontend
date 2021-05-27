const express = require('express');
const authController = require('../../../controllers/authController');
const statisticController = require('../../../controllers/statisticController');
const auth = require('../../../helpers/auth');
const router = express.Router({});

router.post('/register', authController.userRegister);
router.post('/login', authController.userLogin);
router.get('/statistics', auth.checkToken, statisticController.getDashboardData);

module.exports = router;

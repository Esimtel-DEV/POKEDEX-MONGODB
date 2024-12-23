const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validate');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register',
    [
        body('username').isLength({ min: 3 }),
        body('password').isLength({ min: 6 }),
        validateRequest
    ],
    authController.register
);

router.post('/login',
    [
        body('username').exists(),
        body('password').exists(),
        validateRequest
    ],
    authController.login
);

module.exports = router;
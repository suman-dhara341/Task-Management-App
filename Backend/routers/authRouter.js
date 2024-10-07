
const express = require('express')
const router = express.Router()

const Register = require('../controllers/Register')
const Login = require('../controllers/Login')


router.route('/Register').post(Register)
router.route('/Login').post(Login)


module.exports = router;
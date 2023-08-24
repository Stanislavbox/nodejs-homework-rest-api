const express = require("express");

const ctrl = require("../controllers/users")

const { validateBody } = require("../middlewares")

const {schemas} = require("../models/user")

const router = express.Router();

// singnup
router.post('/register', validateBody(schemas.registerSchema), ctrl.register)
// singin
router.post('/login', validateBody(schemas.loginSchema), ctrl.login)

module.exports = router;

const express = require("express");
const path = require("path");
const authController = require('../controllers/auth');

const router = express.Router();

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/logout", authController.logout)
router.get("/updateRole", authController.updateRole)

// router.get("/test", authController.test)

module.exports = router;
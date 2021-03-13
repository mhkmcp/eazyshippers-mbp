const express = require("express");
const path = require("path");
// const mysql = require("mysql");

const subscriptionController = require('../controllers/subscription');

const router = express.Router();

router.get("/all", subscriptionController.all);
router.post("/add", subscriptionController.add);
router.get("/to-profile", subscriptionController.toProfile);

module.exports = router;
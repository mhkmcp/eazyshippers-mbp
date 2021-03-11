const express = require("express");
const path = require("path");
const mysql = require("mysql");

const subscriptionController = require('../controllers/subscription');

const router = express.Router();

// router.get("/packages", subscriptionController.packages);

module.exports = router;
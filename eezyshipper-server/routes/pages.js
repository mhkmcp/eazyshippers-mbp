const express = require("express");
const path = require("path");
const mysql = require("mysql");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendStatus(200);
    // res.render('index');
})

router.get("/register", (req, res) => {
    res.sendStatus(200);
    // res.render('register');
})
router.get("/login", (req, res) => {
    res.sendStatus(200);
    // res.render('login');
})

module.exports = router;
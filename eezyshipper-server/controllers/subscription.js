const mysql = require('mysql');

// const jwt = require('jsonwebtoken');
// const bcrypt = require("bcryptjs");
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


exports.packages = (req, res) => {
    db.query("SELECT * FROM subscription_package", (error, results) => {
        if (error) { console.log(error) }
        if (results.length > 0) {
            // console.log("Packs: ", results);
            res.sendStatus(200, {
                message: "All Packages",
            });
        }
    })
}


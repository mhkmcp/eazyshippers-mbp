const mysql = require('mysql');

const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


exports.register = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    console.log(firstName, lastName, email, password);

    // const { firstName, lastName, email, password } = req.body;


    db.query("SELECT email FROM user WHERE email = ?", [email], async (error, results) => {
        if (error) {
            console.log("Register Err", error);
        }
        if (results.length > 0) {
            res.sendStatus(409, {
                message: "The Email is already in use"
            });
        } else {

            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            db.query("INSERT INTO user SET ?", { firstName: firstName, lastName: lastName, email: email, password: hashedPassword }, (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Results: ", results);
                    res.sendStatus(201, {
                        message: "User Registered Successfully"
                    });
                }
            })
        }
    })
}



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.sendStatus(400, {
                message: "Please provide an email and password"
            })
        }

        db.query("SELECT * FROM user WHERE email = ? ", [email], async (error, results) => {
            if (error) {
                console.log("Error qsl: ", error);
            }

            if (!results || !(await bcrypt.compare(password, results[0].password))) {

                res.sendStatus(401, {
                    message: "Email or Password is incorrect"
                })
            } else {
                const id = results[0].id;
                const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })

                console.log("The token is: ", token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.sendStatus(200);

            }
        })
    } catch (error) {
        console.log(error);
    }
}
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
    const country = req.body.country;
    const password = req.body.password;
    let address_line_1 = "";
    let address_line_2 = "";
    let city = "";

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

            // Build ES ID
            try {
                let esId;
                db.query("SELECT MAX(es_id) as ES_ID FROM user", async (error, results) => {
                    if (error) { console.log(error) }
                    if (results.length < 1) {
                        esId = "ES0000001";
                    }
                    const lastEsId = results[0]['ES_ID'];
                    let ln = lastEsId.length;
                    let lastEsIdNo = parseInt(lastEsId.toString().slice(2, ln));
                    lastEsIdNo = lastEsIdNo + 1
                    esId = lastEsIdNo.toString()
                    while (esId.length < 7) {
                        esId = "0" + esId;
                    }
                    esId = "ES" + esId;
                    console.log("ES_ID: ", esId);
                    // return esId;
                    db.query("INSERT INTO user SET ?",
                        {
                            firstName: firstName, lastName: lastName, email: email,
                            country: country, es_id: esId, password: hashedPassword
                        },
                        (error, results) => {
                            if (error) {
                                console.log(error)
                            } else {
                                res.sendStatus(201, {
                                    message: "Customer Registered Successfully"
                                });
                            }
                        })


                })

            } catch (ex) {
                console.log("ES ID NOT FOUND! ", ex);
            }
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

exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/')
}

exports.update = async (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

}
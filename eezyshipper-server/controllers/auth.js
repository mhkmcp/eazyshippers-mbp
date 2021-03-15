const mysql = require('mysql');

const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { default: knex } = require('knex');
require('dotenv').config()

// const db = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });

const knexapp = knex({
    client: 'mysql',
    connection: {
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
})


exports.register = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const country = req.body.country;
    const password = req.body.password;

    // console.log(firstName, lastName, email, password);

    let hashedPassword;

    let esId = "";
    knexapp("user").max("es_id as ES_ID").then(async (result2) => {
        hashedPassword = await bcrypt.hash(password, 8);
        let lastEsId = result2[0]['ES_ID'];

        if (result2.length == 0) {
            console.log("Not Found ES_ID: ", err2);
            esId = "ES0000001";
        }

        else {
            if (lastEsId) {
                let ln = lastEsId.length;
                let lastEsIdNo = parseInt(lastEsId.toString().slice(2, ln));
                lastEsIdNo = lastEsIdNo + 1
                esId = lastEsIdNo.toString()
                while (esId.length < 7) {
                    esId = "0" + esId;
                }
                esId = "ES" + esId;
            } else {
                esId = "ES0000001";
            }
        }

        knexapp("user").insert([{
            first_name: firstName, last_name: lastName, email: email,
            country: country, es_id: esId, password: hashedPassword
        }]).then((result) => {
            // res.sendStatus(201, {
            //     user: result[0],
            //     message: "User Registered Successfully"
            // })
            // console.log(knexapp("user").where({ 'id': result }));
            res.json({
                status: 201,
                user: result,
                message: "User Registered Successfully"
            })
        }).catch((er3) => {
            // res.sendStatus(409, {
            //     message: "Email Already in use!"
            // })
            res.json({
                status: 409,
                message: "Email Already in use!"
            })
        })
    });
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.json({
                status: 400,
                message: "Please provide your email and password"
            })
            // res.sendStatus(400, {
            //     message: "Please provide your email and password"
            // })
        }

        knexapp("user").where("email", email).then(async (results) => {
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                // res.sendStatus(401, {
                //     message: "Email or Password is incorrect"
                // })
                res.json({
                    status: 401,
                    message: "Email or Password is incorrect"
                })

            } else {
                console.log("Logged In User: ", results[0]);
                const id = results[0].id;
                const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })
                // console.log("The token is: ", token);
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.cookie('user_id', results[0].id);

                // res.sendStatus(200, {
                //     user: results[0]
                // });
                res.json({
                    status: 200,
                    user: results[0]
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.logout = async (req, res) => {
    console.log(res.cookie('user_id'));
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/')
}

exports.verify = async (req, res) => {
    const user_id = req.body.id;
    knexapp("user")
        .where('id', user_id)
        .update(
            {
                'is_verified': 1
            }).then((result) => {
                console.log("Result: ", result);
                res.json({
                    status: 200,
                    message: "User is Verified"
                })
                // if (result) {
                // res.sendStatus(200, {
                //     message: "Role Updated!"
                // })
                // }
            }).catch((err) => {
                console.log("Error: ", err);
            })

}

exports.updateProfile = async (req, res) => {
    const document = req.body.document;
    const document_name = document.name;
    // console.log(document, document_name);
}

exports.updateRole = async (req, res) => {
    const role = "admin";
    knexapp("user")
        .where('id', 7)
        .update(
            {
                'role': role
            }).then((result) => {
                console.log("Result: ", result);
                if (result) {
                    res.sendStatus(200, {
                        message: "Role Updated!"
                    })
                }
            }).catch((err) => {
                console.log("Error: ", err);
            })
}
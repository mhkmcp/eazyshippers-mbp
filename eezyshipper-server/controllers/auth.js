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
            const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            })

            knexapp("user").where({ 'id': result[0] })
                .select('id', 'es_id', 'first_name', 'last_name', 'email', 'role', 'is_verified', 'is_active')
                .then(result2 => {
                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieOptions);
                    res.cookie('user_id', result2[0].id);
                    console.log(result2[0]);

                    console.log(token);

                    res.json({
                        token: token,
                        status: 201,
                        user: result2[0],
                        message: "User Registered Successfully"
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }).catch((er3) => {
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
                // console.log("Logged In User: ", results[0]);
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

                res.json({
                    status: 200,
                    token: token,
                    user: {
                        id: results[0].id,
                        es_id: results[0].es_id,
                        first_name: results[0].first_name,
                        last_name: results[0].last_name,
                        email: results[0].email,
                        is_verified: results[0].is_verified,
                        role: results[0].role
                    }
                })
            }
        })
    } catch (error) {
        res.json({
            status: 400,
            message: "Login Failed!"
        })
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
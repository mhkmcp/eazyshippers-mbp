const mysql = require('mysql');
const { default: knex } = require('knex');

// const jwt = require('jsonwebtoken');
// const bcrypt = require("bcryptjs");
require('dotenv').config()

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

exports.all = (req, res) => {
    knexapp("package").then((results) => {
        // console.log("Result: ", results);
        res.sendStatus(200, {
            message: "Success!"
        })
    })
        .catch(err => {
            console.log("Error: ", err);
        })
}

exports.add = (req, res) => {
    const name = req.body.firstName;

    knexapp("package").insert([{
        name: name
    }]).then((result) => {
        console.log(result);
        res.sendStatus(201, {
            message: "Package Inserted Successfully!"
        })
    }).catch((err) => {
        console.log("Error: ", err);
        res.sendStatus(409, {
            message: "Error insertion Package"
        })
    });
}


exports.toProfile = (req, res) => {
    const user_id = 1;
    const package_id = 2;

    knexapp("user")
        .where('id', user_id)
        .update(
            {
                'subscription_package_id': package_id
            }).then((result) => {
                if (result) {
                    res.sendStatus(200, {
                        message: "Subscription Updated!"
                    })
                }
            }).catch((err) => {
                console.log("Error: ", err);
            })
}


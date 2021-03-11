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

    knexapp("warehouse").where("is_active", 1).then((results) => {
        console.log("Result: ", results);
        res.sendStatus(200, {
            message: "Success!"
        })
    })
        .catch(err => {
            console.log("Error: ", err);
        })
}

exports.add = (req, res) => {
    const full_name = req.body.firstName;
    const address_line_1 = req.body.lastName;
    const state = req.body.email;
    const country = req.body.country;

    console.log(full_name, address_line_1, state, country);

    knexapp("warehouse").insert([{
        full_name: full_name, address_line_1: address_line_1,
        state: state, country: country
    }]).then((result) => {
        console.log(result);
        res.sendStatus(201, {
            message: "Warehouse Inserted Successfully!"
        })
    }).catch((er3) => {
        console.log("Error: ", er3);
        res.sendStatus(409, {
            message: "Error insertion Warehouse"
        })
    });
}

exports.address = (req, res) => {
    const country = "Bangladesh";

    knexapp("warehouse").where({ "is_active": 1, "country": country }).then((results) => {
        console.log("Result: ", results);
        res.sendStatus(200, {
            message: "Success!"
        })
    })
        .catch(err => {
            console.log("Error: ", err);
        })
}


// exports.packages = (req, res) => {
//     db.query("SELECT * FROM subscription_package", (error, results) => {
//         if (error) { console.log(error) }
//         if (results.length > 0) {
//             // console.log("Packs: ", results);
//             res.sendStatus(200, {
//                 message: "All Packages",
//             });
//         }
//     })
// }


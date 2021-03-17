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
        console.log("All Result: ", results);
        res.json({
            warehouses: results
        })
    })
        .catch(err => {
            console.log("Error: ", err);
        })
}

exports.add = (req, res) => {
    const full_name = req.body.fullName;
    const address_line_1 = req.body.addressLine1;
    const address_line_2 = req.body.addressLine2;
    const post_code = req.body.postCode;
    const phone = req.body.phone;
    const state = req.body.state;
    const city = req.body.city;
    const country = req.body.country;
    const country_code = req.body.countryCode;

    // console.log("Req Data: ", req.body);

    knexapp("warehouse").insert([{
        full_name: full_name, address_line_1: address_line_1,
        address_line_2: address_line_2, phone: phone, post_code: post_code,
        state: state, city: city, country: country, country_code: country_code
    }]).then((result) => {
        // console.log("Add Result: ", result);
        res.json({
            status: 201,
            message: "Warehouse Inserted Successfully!"
        })
    }).catch((er3) => {
        // console.log("Error: ", er3);
        res.json({
            status: 409,
            message: "Warehouse Insert Failed!"
        })
    });
}

exports.address = (req, res) => {
    const country = "Bangladesh";

    knexapp("warehouse").where({ "is_active": 1, "country": country }).then((results) => {
        // console.log("Result: ", results);
        res.json({
            status: 200,
            address: results
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


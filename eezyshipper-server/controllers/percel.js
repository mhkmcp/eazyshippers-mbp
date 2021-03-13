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

    knexapp("percel").then((results) => {
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
    const user_id = req.body.user_id;
    const timestamp = req.body.timestamp;
    const shopped_from = req.body.from;
    const destination = req.body.destination;
    const no_of_package = req.body.no_of_package;
    const total_weight = req.body.total_weight;
    const eta = req.body.eta;
    const status = req.body.status;
    const payment_id = req.body.payment_id;


    let esId = "";
    knexapp("percel").max("transaction_id as EZ_ID").then(async (result2) => {
        let lastEsId = result2[0]['EZ_ID'];

        if (result2.length == 0) {
            console.log("Not Found EZ_ID: ", err2);
            esId = "ez0000001";
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
                esId = "ez" + esId;
            } else {
                esId = "ez0000001";
            }
        }

        knexapp("percel").insert([{
            user_id: user_id, timestamp: timestamp, shopped_from: shopped_from,
            destination: destination, no_of_package: no_of_package, total_weight: total_weight,
            eta: eta, status: status, payment_id: payment_id, transaction_id: esId
        }]).then((result) => {
            console.log(result);
            res.sendStatus(201, {
                message: "percel Inserted Successfully!"
            })
        }).catch((er3) => {
            console.log("Error: ", er3);
            res.sendStatus(409, {
                message: "Error insertion percel"
            })
        });
    })
}

exports.updateStatus = (req, res) => {
    const id = req.body.id;
    const prevStatus = req.body.status.toLowerCase();

    let nextStatus = "";

    if (prevStatus == "click to pay") {
        nextStatus = "Received at Warehouse";
    } 
    else if (prevStatus == "received at warehouse") {
        nextStatus = "Being ezShipped";
    }
     else if (prevStatus == "being ezshipped") {
        nextStatus = "Kenya Customs";
    } 
    else if (prevStatus == "kenya customs") {
        nextStatus = "Delivered";
    }

    knexapp("percel")
        .where("id", id)
        .update({ 'status': nextStatus, 'eta': new Date().toLocaleDateString() }).then((results) => {
            console.log("Result: ", results);
            res.sendStatus(200, {
                message: "Success!"
            })
        })
        .catch(err => {
            console.log("Error: ", err);
        })
}
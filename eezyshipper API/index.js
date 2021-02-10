const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConnection = mysql.createConnection({
    //properties...
})

app.get('/', (req, res) => {
  res.send(JSON.stringify({"OkMessage": "Successfully Connected to API"}));
})

app.listen(process.env.PORT || 5000);
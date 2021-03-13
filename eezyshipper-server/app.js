const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
// dotenv provide global variable process.env

const port = 9000;

const app = express();

// const db = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory))

// Parse URL Encoded bodies as sent by HTML forms
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'hbs');

// db.connect((err) => {
//     if (err) {
//         console.log("DB Connection Error")
//     } else {
//         console.log("DB Success!");
//     }
// })

// Define Routes 

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));
app.use("/subscribe", require("./routes/subscription"));
app.use("/warehouse", require("./routes/warehouse"));
app.use("/percel", require("./routes/percel"));


app.listen(port, () => {
    console.log("Eezyshipper Running On: ", port)
})
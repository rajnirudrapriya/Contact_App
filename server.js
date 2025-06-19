const express = require('express');
const app = express();
require('dotenv').config();
const { connectDb } = require("./config/db");
const routing = require("./router/contactRouter");
const { engine } = require('express-handlebars');
let PORT = process.env.PORT;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

connectDb();

app.use(express.urlencoded({ extended: true }));
app.use("/api", routing);
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('home', { title: "homepage", css: "home" });
});

// ❌ REMOVE THIS PART 👇
// app.listen(PORT, err => {
//     if (err) throw err;
//     console.log("Server is running on port 5000");
// });

// ✅ ADD THIS INSTEAD 👇
module.exports = app;

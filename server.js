const express = require('express');
const app = express();
require('dotenv').config();
const { connectDb } = require("./config/db");
const routing = require("./router/contactRouter");
const { engine } = require('express-handlebars');

// Template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static("public"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use("/api", routing);

// DB Connect
connectDb();

// Home Route
app.get('/', (req, res) => {
  res.render('home', { title: "homepage", css: "home" });
});

// ✅ DO NOT USE app.listen()

// ✅ Instead, export the app
module.exports = app;

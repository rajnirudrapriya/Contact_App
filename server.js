const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const { connectDb } = require("./config/db");
const routing = require("./router/contactRouter");
const { engine } = require('express-handlebars');

// Connect to MongoDB
connectDb();

// Setup Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // ✅ IMPORTANT: tells Express where to find your .handlebars files

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // ✅ For CSS and static files

// Routes
app.use("/api", routing);

app.get("/", (req, res) => {
  res.render("home", { title: "homepage", css: "home" }); // ✅ This renders views/home.handlebars
});

module.exports = app;

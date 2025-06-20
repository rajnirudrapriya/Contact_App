const express = require('express');
const app = express();
require('dotenv').config();
const { connectDb } = require("./config/db");
const routing = require("./router/contactRouter");
const { engine } = require('express-handlebars');

let PORT = process.env.PORT || 5000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

connectDb();

app.use(express.urlencoded({ extended: true }));
app.use("/api", routing);
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('home', { title: "homepage", css: "home" });
});

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server is running on port ${PORT}`);
});

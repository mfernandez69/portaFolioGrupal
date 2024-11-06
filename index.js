const express = require('express');
const exphbs = require('express-handlebars');

// creamos servidor de apps

const app = express();

// politica de cache
//app.enable("view cache");

// configuracion de handlebars

app.engine("handlebars", exphbs.engine())

app.set("view engine", "handlebars");

app.get("/", (req, res)=>{
    res.render("mysite");
});

const mysite = require("./routes/mysite");
const { title } = require('process');
app.use("/main", mysite);

app.use(express.static("public"));

app.listen(3000);
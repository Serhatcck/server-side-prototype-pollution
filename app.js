const express = require('express');
const app = express();
const path = require('path');


app.set('view engine', 'ejs');

//db binding
const con = require('./services/mysql_db.js')
app.use(function(req,res,next){
    req.sqlCon = con
    next()
})

//public folder
app.use("/public", express.static(path.join(__dirname, 'public')));


//json
app.use(express.json())

//sessions
const sessions = require('express-session');

app.use(sessions({
    secret: "secretkey",
    saveUninitialized:true,
    cookie: { maxAge: (1000 * 60 * 60 * 24) },
    resave: false
}));

//Routes
app.use('/', require('./routes/routes'));
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))
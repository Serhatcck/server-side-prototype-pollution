const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const registerView = (req, res) => {
    res.render("register", {});
}

const loginView = (req, res) => {
    res.render("login", {

    });
}

const registerUser = (req, res) => {
    const user = new UserModel.User(req.body);
    bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(user.passwd, salt, (err, hash) => {
            if (err) throw err;
            user.passwd = hash;
            UserModel.create(req.sqlCon, user, function (err) {
                if (err) throw err;
                UserModel.getWithEmail(req.sqlCon, user, async function (err, rows) {
                    if (err) throw err;
                    if (typeof (rows) != "undefined" && rows.length > 0) {
                        session = req.session;
                        session.login = true;
                        session.userId = rows[0].userId
                        session.email = rows[0].email
                        session.name = rows[0].name
                        session.surname = rows[0].name
                        return res.status(200).json({
                            "status": true, "message": "Successful"
                        })
                    } else {
                        return res.status(401).json({
                            errors: [{ "user": "User Not Found" }],
                        })
                    }

                })
            })

        })
    );

}

const loginUser = (req, res) => {
    const user = new UserModel.User(req.body)
    UserModel.getWithEmail(req.sqlCon, user, async function (err, rows) {
        if (typeof (rows) != "undefined" && rows.length > 0) {
            if (await bcrypt.compare(user.passwd, rows[0].passwd)) {
                session = req.session;
                session.login = true;
                session.userId = rows[0].userId
                session.email = rows[0].email
                session.name = rows[0].name
                session.surname = rows[0].name
                res.statusCode = 200
                res.send({ "status": true, "message": "Login successful" })
            } else {
                return res.status(401).json({
                    errors: [{ "user": "User Not Found" }],
                })
            }
        } else {
            return res.status(401).json({
                errors: [{ "user": "User Not Found" }],
            })
        }

    })

}

const logoutUser = (req,res) => {
    req.session.destroy();
    res.redirect('/')
}
module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser,
    logoutUser
}